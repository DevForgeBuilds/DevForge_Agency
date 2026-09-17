import { useEffect, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import {
  ReactLenis,
  useLenis,
} from 'lenis/react';

import gsap from 'gsap';
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TheForge from './components/TheForge/TheForge';
import Studio from './components/Studio/Studio';
import Services from './components/Services/Services';
import SelectedWork from './components/SelectedWork/SelectedWork';
import RawForged from './components/RawForged/RawForged';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AdminPage from './pages/AdminPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { useReducedMotion } from './hooks/useReducedMotion';

import {
  PRELOADER_DURATION,
} from './animations/preloaderAnimation';

gsap.registerPlugin(ScrollTrigger);

const LenisScrollTriggerBridge = () => {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ScrollTrigger.defaults({ scroller: window });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null;
};

const RouteScrollManager = () => {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (location.hash) {
      let cancelled = false;
      let attempts = 0;
      const maxAttempts = 60;

      const scrollToTarget = () => {
        if (cancelled) return;
        attempts++;

        const target = document.getElementById(location.hash.substring(1));

        if (!target) {
          if (attempts < maxAttempts) {
            window.requestAnimationFrame(scrollToTarget);
          }
          return;
        }

        window.requestAnimationFrame(() => {
          if (cancelled) return;

          if (lenis) {
            lenis.stop();
            lenis.scrollTo(target, { offset: 0, immediate: true });
            window.requestAnimationFrame(() => {
              if (!cancelled) lenis.start();
            });
          } else {
            target.scrollIntoView({ behavior: 'instant', block: 'start' });
          }

          ScrollTrigger.refresh();
        });
      };

      const frame = window.requestAnimationFrame(scrollToTarget);
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
      };
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, lenis]);

  return null;
};

const HomePage = () => {
  const [showPreloader, setShowPreloader] = useState(() => {
    return sessionStorage.getItem('devforge-preloader-shown') !== 'true';
  });

  useEffect(() => {
    if (!showPreloader) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(
        'devforge-preloader-shown',
        'true'
      );

      setShowPreloader(false);
    }, PRELOADER_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [showPreloader]);

  /*
   * Browser refresh / tab close par next fresh page load
   * ke liye preloader ko reset karo.
   *
   * SPA navigation par beforeunload fire nahi hota,
   * isliye Back to Services / Back to Work par loader nahi aayega.
   */
  useEffect(() => {

    const handleBeforeUnload = () => {
      sessionStorage.removeItem(
        'devforge-preloader-shown'
      );
    };

    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload
      );
    };

  }, []);

  return (
    <>
      {showPreloader && <Preloader />}

      <Navbar />

      <main>
        <Hero />
        <TheForge />
        <Studio />
        <Services />
        <SelectedWork />
        {/* <Beliefs /> */}
        <RawForged />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

const ServiceDetailLayout = () => (
  <main>
    <ServiceDetailPage />
  </main>
);

// const ProjectDetailLayout = () => {
//   const { pathname } = useLocation();
//   const slug = pathname.split('/').filter(Boolean)[1];

//   return (
//     <>
//       <Navbar />
//       <main><ProjectDetail slug={slug} /></main>
//     </>
//   );
// };

const PublicApp = () => {
  const reduced = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduced ? 1 : 0.11,
        duration: 1.1,
        smoothWheel: !reduced,
      }}
    >
      <LenisScrollTriggerBridge />
      <RouteScrollManager />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:service" element={<ServiceDetailLayout />} />
        {/* <Route path="/projects/:slug" element={<ProjectDetailLayout />} /> */}
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </ReactLenis>
  );
};

const AppContent = () => {
  const { pathname } = useLocation();

  // Admin is intentionally kept outside Lenis/GSAP scrolling.
  // This gives the CMS native mouse-wheel and touchpad scrolling.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return <AdminPage />;
  }

  return <PublicApp />;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
