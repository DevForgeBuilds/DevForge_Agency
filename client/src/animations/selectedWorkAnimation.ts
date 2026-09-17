// // // // import gsap from 'gsap';
// // // // import {
// // // //     ScrollTrigger,
// // // // } from 'gsap/ScrollTrigger';


// // // // gsap.registerPlugin(
// // // //     ScrollTrigger
// // // // );


// // // // /* ============================================================
// // // //    DEVFORGE — SELECTED WORK
// // // //    AWARD STYLE SCROLL ANIMATION
// // // // ============================================================ */

// // // // export const initSelectedWorkAnimation = (
// // // //     section: HTMLElement
// // // // ) => {

// // // //     const ctx = gsap.context(() => {

// // // //         const projects =
// // // //             gsap.utils.toArray<HTMLElement>(
// // // //                 '.selected-work__project',
// // // //                 section
// // // //             );


// // // //         const navItems =
// // // //             gsap.utils.toArray<HTMLElement>(
// // // //                 '[data-project-nav]',
// // // //                 section
// // // //             );


// // // //         const projectCount =
// // // //             projects.length;


// // // //         if (!projectCount) {
// // // //             return;
// // // //         }


// // // //         /* =====================================================
// // // //            ELEMENTS
// // // //         ===================================================== */

// // // //         const counter =
// // // //             section.querySelector(
// // // //                 '.selected-work__counter strong'
// // // //             );


// // // //         const intro =
// // // //             section.querySelector(
// // // //                 '.selected-work__intro'
// // // //             );


// // // //         const bottom =
// // // //             section.querySelector(
// // // //                 '.selected-work__bottom'
// // // //             );


// // // //         /* =====================================================
// // // //            PROJECT ELEMENTS
// // // //         ===================================================== */

// // // //         const getImage = (
// // // //             project: HTMLElement
// // // //         ) =>
// // // //             project.querySelector<HTMLElement>(
// // // //                 '.selected-work__visual-image'
// // // //             );


// // // //         const getInfo = (
// // // //             project: HTMLElement
// // // //         ) =>
// // // //             project.querySelector<HTMLElement>(
// // // //                 '.selected-work__project-info'
// // // //             );


// // // //         const getTitle = (
// // // //             project: HTMLElement
// // // //         ) =>
// // // //             project.querySelector<HTMLElement>(
// // // //                 '.selected-work__project-title'
// // // //             );


// // // //         const getMeta = (
// // // //             project: HTMLElement
// // // //         ) =>
// // // //             project.querySelector<HTMLElement>(
// // // //                 '.selected-work__project-meta'
// // // //             );


// // // //         const getView = (
// // // //             project: HTMLElement
// // // //         ) =>
// // // //             project.querySelector<HTMLElement>(
// // // //                 '.selected-work__view-project'
// // // //             );


// // // //         /* =====================================================
// // // //            INITIAL STATE
// // // //         ===================================================== */

// // // //         let currentIndex = 0;

// // // //         let isTransitioning = false;


// // // //         projects.forEach(
// // // //             (
// // // //                 project,
// // // //                 index
// // // //             ) => {

// // // //                 if (index === 0) {

// // // //                     gsap.set(
// // // //                         project,
// // // //                         {
// // // //                             display:
// // // //                                 'block',

// // // //                             visibility:
// // // //                                 'visible',

// // // //                             opacity:
// // // //                                 1,

// // // //                             clipPath:
// // // //                                 'inset(0% 0% 0% 0%)',
// // // //                         }
// // // //                     );

// // // //                 } else {

// // // //                     gsap.set(
// // // //                         project,
// // // //                         {
// // // //                             display:
// // // //                                 'none',

// // // //                             visibility:
// // // //                                 'hidden',

// // // //                             opacity:
// // // //                                 0,
// // // //                         }
// // // //                     );

// // // //                 }

// // // //             }
// // // //         );


// // // //         /* =====================================================
// // // //            NAV STATE
// // // //         ===================================================== */

// // // //         const updateNav = (
// // // //             index: number
// // // //         ) => {

// // // //             navItems.forEach(
// // // //                 (
// // // //                     item,
// // // //                     itemIndex
// // // //                 ) => {

// // // //                     item.classList.toggle(
// // // //                         'is-active',
// // // //                         itemIndex === index
// // // //                     );

// // // //                 }
// // // //             );

// // // //         };


// // // //         /* =====================================================
// // // //            COUNTER
// // // //         ===================================================== */

// // // //         const updateCounter = (
// // // //             index: number
// // // //         ) => {

// // // //             if (!counter) {
// // // //                 return;
// // // //             }


// // // //             counter.textContent =
// // // //                 String(
// // // //                     index + 1
// // // //                 ).padStart(
// // // //                     2,
// // // //                     '0'
// // // //                 );

// // // //         };


// // // //         /* =====================================================
// // // //            SHOW PROJECT
// // // //         ===================================================== */

// // // //         const showProject = (
// // // //             nextIndex: number,
// // // //             direction: number
// // // //         ) => {

// // // //             if (
// // // //                 nextIndex === currentIndex ||
// // // //                 isTransitioning
// // // //             ) {
// // // //                 return;
// // // //             }


// // // //             if (
// // // //                 nextIndex < 0 ||
// // // //                 nextIndex >= projectCount
// // // //             ) {
// // // //                 return;
// // // //             }


// // // //             const current =
// // // //                 projects[currentIndex];


// // // //             const next =
// // // //                 projects[nextIndex];


// // // //             if (
// // // //                 !current ||
// // // //                 !next
// // // //             ) {
// // // //                 return;
// // // //             }


// // // //             isTransitioning =
// // // //                 true;


// // // //             const currentImage =
// // // //                 getImage(current);


// // // //             const nextImage =
// // // //                 getImage(next);


// // // //             const currentInfo =
// // // //                 getInfo(current);


// // // //             const nextInfo =
// // // //                 getInfo(next);


// // // //             const currentTitle =
// // // //                 getTitle(current);


// // // //             const nextTitle =
// // // //                 getTitle(next);


// // // //             const currentMeta =
// // // //                 getMeta(current);


// // // //             const nextMeta =
// // // //                 getMeta(next);


// // // //             const currentView =
// // // //                 getView(current);


// // // //             const nextView =
// // // //                 getView(next);


// // // //             /* =================================================
// // // //                PREPARE NEXT
// // // //             ================================================= */

// // // //             gsap.set(
// // // //                 next,
// // // //                 {
// // // //                     display:
// // // //                         'block',

// // // //                     visibility:
// // // //                         'visible',

// // // //                     opacity:
// // // //                         1,

// // // //                     clipPath:
// // // //                         direction > 0
// // // //                             ? 'inset(100% 0% 0% 0%)'
// // // //                             : 'inset(0% 0% 100% 0%)',
// // // //                 }
// // // //             );


// // // //             gsap.set(
// // // //                 [
// // // //                     nextInfo,
// // // //                     nextTitle,
// // // //                     nextMeta,
// // // //                     nextView,
// // // //                 ].filter(Boolean),
// // // //                 {
// // // //                     opacity:
// // // //                         0,

// // // //                     y:
// // // //                         direction > 0
// // // //                             ? 35
// // // //                             : -35,
// // // //                 }
// // // //             );


// // // //             if (nextImage) {

// // // //                 gsap.set(
// // // //                     nextImage,
// // // //                     {
// // // //                         scale:
// // // //                             1.08,

// // // //                         opacity:
// // // //                             0.6,
// // // //                     }
// // // //                 );

// // // //             }


// // // //             /* =================================================
// // // //                TRANSITION TIMELINE
// // // //             ================================================= */

// // // //             const timeline =
// // // //                 gsap.timeline({

// // // //                     defaults: {
// // // //                         ease:
// // // //                             'power3.inOut',
// // // //                     },

// // // //                     onComplete: () => {

// // // //                         gsap.set(
// // // //                             current,
// // // //                             {
// // // //                                 display:
// // // //                                     'none',

// // // //                                 visibility:
// // // //                                     'hidden',

// // // //                                 opacity:
// // // //                                     0,

// // // //                                 clearProps:
// // // //                                     'clipPath',
// // // //                             }
// // // //                         );


// // // //                         gsap.set(
// // // //                             next,
// // // //                             {
// // // //                                 clearProps:
// // // //                                     'clipPath',
// // // //                             }
// // // //                         );


// // // //                         currentIndex =
// // // //                             nextIndex;


// // // //                         isTransitioning =
// // // //                             false;


// // // //                         updateCounter(
// // // //                             nextIndex
// // // //                         );


// // // //                         updateNav(
// // // //                             nextIndex
// // // //                         );

// // // //                     },

// // // //                 });


// // // //             /* =================================================
// // // //                CURRENT OUT
// // // //             ================================================= */

// // // //             timeline.to(
// // // //                 [
// // // //                     currentTitle,
// // // //                     currentInfo,
// // // //                 ].filter(Boolean),
// // // //                 {
// // // //                     y:
// // // //                         direction > 0
// // // //                             ? -30
// // // //                             : 30,

// // // //                     opacity:
// // // //                         0,

// // // //                     duration:
// // // //                         0.35,

// // // //                     stagger:
// // // //                         0.03,
// // // //                 },
// // // //                 0
// // // //             );


// // // //             if (currentImage) {

// // // //                 timeline.to(
// // // //                     currentImage,
// // // //                     {
// // // //                         scale:
// // // //                             0.96,

// // // //                         duration:
// // // //                             0.55,
// // // //                     },
// // // //                     0
// // // //                 );

// // // //             }


// // // //             /* =================================================
// // // //                NEXT REVEAL
// // // //             ================================================= */

// // // //             timeline.to(
// // // //                 next,
// // // //                 {
// // // //                     clipPath:
// // // //                         'inset(0% 0% 0% 0%)',

// // // //                     duration:
// // // //                         0.8,

// // // //                 },
// // // //                 0.12
// // // //             );


// // // //             if (nextImage) {

// // // //                 timeline.to(
// // // //                     nextImage,
// // // //                     {
// // // //                         scale:
// // // //                             1,

// // // //                         opacity:
// // // //                             1,

// // // //                         duration:
// // // //                             0.85,

// // // //                     },
// // // //                     0.12
// // // //                 );

// // // //             }


// // // //             /* =================================================
// // // //                NEXT CONTENT
// // // //             ================================================= */

// // // //             timeline.to(
// // // //                 [
// // // //                     nextMeta,
// // // //                     nextTitle,
// // // //                     nextInfo,
// // // //                     nextView,
// // // //                 ].filter(Boolean),
// // // //                 {
// // // //                     y:
// // // //                         0,

// // // //                     opacity:
// // // //                         1,

// // // //                     duration:
// // // //                         0.55,

// // // //                     stagger:
// // // //                         0.07,

// // // //                     ease:
// // // //                         'power3.out',

// // // //                 },
// // // //                 0.42
// // // //             );

// // // //         };


// // // //         /* =====================================================
// // // //            INITIAL UI
// // // //         ===================================================== */

// // // //         updateCounter(0);

// // // //         updateNav(0);


// // // //         /* =====================================================
// // // //            INTRO ENTRANCE
// // // //         ===================================================== */

// // // //         if (intro) {

// // // //             gsap.fromTo(
// // // //                 intro,
// // // //                 {
// // // //                     opacity:
// // // //                         0,

// // // //                     y:
// // // //                         60,
// // // //                 },
// // // //                 {
// // // //                     opacity:
// // // //                         1,

// // // //                     y:
// // // //                         0,

// // // //                     duration:
// // // //                         1,

// // // //                     ease:
// // // //                         'power3.out',

// // // //                     scrollTrigger: {

// // // //                         trigger:
// // // //                             section,

// // // //                         start:
// // // //                             'top 85%',

// // // //                         once:
// // // //                             true,

// // // //                     },

// // // //                 }
// // // //             );

// // // //         }


// // // //         /* =====================================================
// // // //            BOTTOM ENTRANCE
// // // //         ===================================================== */

// // // //         if (bottom) {

// // // //             gsap.fromTo(
// // // //                 bottom,
// // // //                 {
// // // //                     opacity:
// // // //                         0,

// // // //                     y:
// // // //                         30,
// // // //                 },
// // // //                 {
// // // //                     opacity:
// // // //                         1,

// // // //                     y:
// // // //                         0,

// // // //                     duration:
// // // //                         0.8,

// // // //                     ease:
// // // //                         'power3.out',

// // // //                     scrollTrigger: {

// // // //                         trigger:
// // // //                             section,

// // // //                         start:
// // // //                             'top 75%',

// // // //                         once:
// // // //                             true,

// // // //                     },

// // // //                 }
// // // //             );

// // // //         }


// // // //         /* =====================================================
// // // //            MAIN PIN
// // // //         ===================================================== */

// // // //         const scrollDistance =
// // // //             Math.max(
// // // //                 projectCount - 1,
// // // //                 1
// // // //             ) *
// // // //             window.innerHeight *
// // // //             1.4;


// // // //         const mainTrigger =
// // // //             ScrollTrigger.create({

// // // //                 trigger:
// // // //                     section,

// // // //                 start:
// // // //                     'top top',

// // // //                 end:
// // // //                     `+=${scrollDistance}`,

// // // //                 pin:
// // // //                     true,

// // // //                 pinSpacing:
// // // //                     true,

// // // //                 anticipatePin:
// // // //                     1,

// // // //                 invalidateOnRefresh:
// // // //                     true,

// // // //                 onUpdate:
// // // //                     (self) => {

// // // //                         /*
// // // //                         ==========================================
// // // //                         ONE PROJECT
// // // //                         ==========================================

// // // //                         There is nothing to transition.
// // // //                         Section simply remains pinned.
// // // //                         */

// // // //                         if (
// // // //                             projectCount <= 1
// // // //                         ) {
// // // //                             return;
// // // //                         }


// // // //                         /*
// // // //                         ==========================================
// // // //                         MULTIPLE PROJECTS
// // // //                         ==========================================
// // // //                         */

// // // //                         const rawIndex =
// // // //                             self.progress *
// // // //                             (
// // // //                                 projectCount - 1
// // // //                             );


// // // //                         const targetIndex =
// // // //                             Math.round(
// // // //                                 rawIndex
// // // //                             );


// // // //                         if (
// // // //                             targetIndex !==
// // // //                             currentIndex
// // // //                         ) {

// // // //                             showProject(
// // // //                                 targetIndex,
// // // //                                 targetIndex >
// // // //                                     currentIndex
// // // //                                     ? 1
// // // //                                     : -1
// // // //                             );

// // // //                         }

// // // //                     },

// // // //             });


// // // //         /* =====================================================
// // // //            NAVIGATION CLICK
// // // //         ===================================================== */

// // // //         navItems.forEach(
// // // //             (
// // // //                 item,
// // // //                 index
// // // //             ) => {

// // // //                 item.addEventListener(
// // // //                     'click',
// // // //                     (
// // // //                         event
// // // //                     ) => {

// // // //                         /*
// // // //                          * These are actual React Router links.
// // // //                          * Don't prevent navigation.
// // // //                          */

// // // //                         if (
// // // //                             index !== currentIndex
// // // //                         ) {

// // // //                             /*
// // // //                              * Navigation remains a normal
// // // //                              * project-detail link.
// // // //                              */

// // // //                         }

// // // //                     }
// // // //                 );

// // // //             }
// // // //         );


// // // //         /* =====================================================
// // // //            IMAGE HOVER
// // // //         ===================================================== */

// // // //         projects.forEach(
// // // //             (
// // // //                 project
// // // //             ) => {

// // // //                 const visual =
// // // //                     project.querySelector<HTMLElement>(
// // // //                         '.selected-work__visual'
// // // //                     );


// // // //                 const image =
// // // //                     getImage(
// // // //                         project
// // // //                     );


// // // //                 if (
// // // //                     !visual ||
// // // //                     !image
// // // //                 ) {
// // // //                     return;
// // // //                 }


// // // //                 visual.addEventListener(
// // // //                     'mouseenter',
// // // //                     () => {

// // // //                         gsap.to(
// // // //                             image,
// // // //                             {
// // // //                                 scale:
// // // //                                     1.06,

// // // //                                 duration:
// // // //                                     0.8,

// // // //                                 ease:
// // // //                                     'power3.out',
// // // //                             }
// // // //                         );

// // // //                     }
// // // //                 );


// // // //                 visual.addEventListener(
// // // //                     'mouseleave',
// // // //                     () => {

// // // //                         gsap.to(
// // // //                             image,
// // // //                             {
// // // //                                 scale:
// // // //                                     1.025,

// // // //                                 duration:
// // // //                                     0.8,

// // // //                                 ease:
// // // //                                     'power3.out',
// // // //                             }
// // // //                         );

// // // //                     }
// // // //                 );

// // // //             }
// // // //         );


// // // //         /* =====================================================
// // // //            REDUCED MOTION
// // // //         ===================================================== */

// // // //         const reducedMotion =
// // // //             window.matchMedia(
// // // //                 '(prefers-reduced-motion: reduce)'
// // // //             ).matches;


// // // //         if (
// // // //             reducedMotion
// // // //         ) {

// // // //             mainTrigger.kill();


// // // //             projects.forEach(
// // // //                 (
// // // //                     project,
// // // //                     index
// // // //                 ) => {

// // // //                     gsap.set(
// // // //                         project,
// // // //                         {
// // // //                             display:
// // // //                                 index === 0
// // // //                                     ? 'block'
// // // //                                     : 'none',

// // // //                             visibility:
// // // //                                 index === 0
// // // //                                     ? 'visible'
// // // //                                     : 'hidden',

// // // //                             opacity:
// // // //                                 index === 0
// // // //                                     ? 1
// // // //                                     : 0,

// // // //                             clearProps:
// // // //                                 'all',
// // // //                         }
// // // //                     );

// // // //                 }
// // // //             );

// // // //         }


// // // //         /* =====================================================
// // // //            REFRESH
// // // //         ===================================================== */

// // // //         const refresh =
// // // //             window.setTimeout(
// // // //                 () => {

// // // //                     ScrollTrigger.refresh();

// // // //                 },
// // // //                 300
// // // //             );


// // // //         /* =====================================================
// // // //            IMAGE LOAD REFRESH
// // // //         ===================================================== */

// // // //         const images =
// // // //             section.querySelectorAll('img');


// // // //         images.forEach(
// // // //             (
// // // //                 image
// // // //             ) => {

// // // //                 if (
// // // //                     !image.complete
// // // //                 ) {

// // // //                     image.addEventListener(
// // // //                         'load',
// // // //                         () => {

// // // //                             ScrollTrigger.refresh();

// // // //                         },
// // // //                         {
// // // //                             once: true,
// // // //                         }
// // // //                     );

// // // //                 }

// // // //             }
// // // //         );


// // // //         /* =====================================================
// // // //            CLEANUP TIMER
// // // //         ===================================================== */

// // // //         return () => {

// // // //             window.clearTimeout(
// // // //                 refresh
// // // //             );

// // // //         };

// // // //     }, section);


// // // //     return () => {

// // // //         ctx.revert();

// // // //     };

// // // // };
// // // import gsap from 'gsap';
// // // import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // // gsap.registerPlugin(ScrollTrigger);

// // // /* DEVFORGE — stable sequential Selected Work animation */
// // // export const initSelectedWorkAnimation = (section: HTMLElement) => {
// // //     const ctx = gsap.context(() => {
// // //         const projects = gsap.utils.toArray<HTMLElement>(
// // //             '.selected-work__project', section
// // //         );
// // //         const navItems = gsap.utils.toArray<HTMLElement>(
// // //             '[data-project-nav]', section
// // //         );
// // //         const counter = section.querySelector<HTMLElement>(
// // //             '.selected-work__counter strong'
// // //         );
// // //         const intro = section.querySelector<HTMLElement>(
// // //             '.selected-work__intro'
// // //         );
// // //         const bottom = section.querySelector<HTMLElement>(
// // //             '.selected-work__bottom'
// // //         );

// // //         if (!projects.length) return;

// // //         const updateActiveProject = (activeIndex: number) => {
// // //             if (counter) {
// // //                 counter.textContent = String(activeIndex + 1).padStart(2, '0');
// // //             }
// // //             navItems.forEach((item, index) => {
// // //                 item.classList.toggle('is-active', index === activeIndex);
// // //             });
// // //         };

// // //         projects.forEach((project, index) => {
// // //             // Keep every project in normal page flow. No pin, no blank spacer.
// // //             gsap.set(project, {
// // //                 display: 'block',
// // //                 visibility: 'visible',
// // //                 opacity: 1,
// // //                 clipPath: 'none',
// // //                 marginBottom: index === projects.length - 1
// // //                     ? '0'
// // //                     : 'clamp(5rem, 10vw, 10rem)',
// // //             });

// // //             const meta = project.querySelector<HTMLElement>(
// // //                 '.selected-work__project-meta'
// // //             );
// // //             const visual = project.querySelector<HTMLElement>(
// // //                 '.selected-work__visual'
// // //             );
// // //             const image = project.querySelector<HTMLElement>(
// // //                 '.selected-work__visual-image'
// // //             );
// // //             const info = project.querySelector<HTMLElement>(
// // //                 '.selected-work__project-info'
// // //             );
// // //             const viewLink = project.querySelector<HTMLElement>(
// // //                 '.selected-work__view-project'
// // //             );
// // //             const revealItems = [meta, visual, info, viewLink].filter(
// // //                 (item): item is HTMLElement => Boolean(item)
// // //             );

// // //             gsap.fromTo(revealItems,
// // //                 { opacity: 0, y: 42 },
// // //                 {
// // //                     opacity: 1,
// // //                     y: 0,
// // //                     duration: 0.85,
// // //                     stagger: 0.08,
// // //                     ease: 'power3.out',
// // //                     scrollTrigger: {
// // //                         trigger: project,
// // //                         start: 'top 82%',
// // //                         once: true,
// // //                     },
// // //                 }
// // //             );

// // //             if (image) {
// // //                 gsap.fromTo(image,
// // //                     { scale: 1.035 },
// // //                     {
// // //                         scale: 1,
// // //                         ease: 'none',
// // //                         scrollTrigger: {
// // //                             trigger: visual || project,
// // //                             start: 'top bottom',
// // //                             end: 'bottom top',
// // //                             scrub: 0.5,
// // //                         },
// // //                     }
// // //                 );
// // //             }

// // //             ScrollTrigger.create({
// // //                 trigger: project,
// // //                 start: 'top 55%',
// // //                 end: 'bottom 45%',
// // //                 onEnter: () => updateActiveProject(index),
// // //                 onEnterBack: () => updateActiveProject(index),
// // //             });
// // //         });

// // //         if (intro) {
// // //             gsap.fromTo(intro,
// // //                 { opacity: 0, y: 50 },
// // //                 {
// // //                     opacity: 1,
// // //                     y: 0,
// // //                     duration: 0.9,
// // //                     ease: 'power3.out',
// // //                     scrollTrigger: {
// // //                         trigger: section,
// // //                         start: 'top 85%',
// // //                         once: true,
// // //                     },
// // //                 }
// // //             );
// // //         }

// // //         if (bottom) {
// // //             gsap.fromTo(bottom,
// // //                 { opacity: 0, y: 30 },
// // //                 {
// // //                     opacity: 1,
// // //                     y: 0,
// // //                     duration: 0.8,
// // //                     ease: 'power3.out',
// // //                     scrollTrigger: {
// // //                         trigger: bottom,
// // //                         start: 'top 90%',
// // //                         once: true,
// // //                     },
// // //                 }
// // //             );
// // //         }

// // //         updateActiveProject(0);

// // //         const refresh = () => ScrollTrigger.refresh();
// // //         window.addEventListener('load', refresh, { once: true });
// // //         section.querySelectorAll('img').forEach((image) => {
// // //             if (!image.complete) {
// // //                 image.addEventListener('load', refresh, { once: true });
// // //             }
// // //         });
// // //     }, section);

// // //     return () => ctx.revert();
// // // };

// // // export default initSelectedWorkAnimation;
// // import gsap from 'gsap';
// // import {
// //     ScrollTrigger,
// // } from 'gsap/ScrollTrigger';


// // gsap.registerPlugin(
// //     ScrollTrigger
// // );


// // /* ============================================================
// //    DEVFORGE — SELECTED WORK
// //    AWARD STYLE SCROLL ANIMATION
// // ============================================================ */

// // export const initSelectedWorkAnimation = (
// //     section: HTMLElement
// // ) => {

// //     const ctx = gsap.context(() => {

// //         const projects =
// //             gsap.utils.toArray<HTMLElement>(
// //                 '.selected-work__project',
// //                 section
// //             );


// //         const navItems =
// //             gsap.utils.toArray<HTMLElement>(
// //                 '[data-project-nav]',
// //                 section
// //             );


// //         const projectCount =
// //             projects.length;


// //         if (!projectCount) {
// //             return;
// //         }


// //         /* =====================================================
// //            ELEMENTS
// //         ===================================================== */

// //         const counter =
// //             section.querySelector(
// //                 '.selected-work__counter strong'
// //             );


// //         const intro =
// //             section.querySelector(
// //                 '.selected-work__intro'
// //             );


// //         const bottom =
// //             section.querySelector(
// //                 '.selected-work__bottom'
// //             );


// //         /* =====================================================
// //            PROJECT ELEMENTS
// //         ===================================================== */

// //         const getImage = (
// //             project: HTMLElement
// //         ) =>
// //             project.querySelector<HTMLElement>(
// //                 '.selected-work__visual-image'
// //             );


// //         const getInfo = (
// //             project: HTMLElement
// //         ) =>
// //             project.querySelector<HTMLElement>(
// //                 '.selected-work__project-info'
// //             );


// //         const getTitle = (
// //             project: HTMLElement
// //         ) =>
// //             project.querySelector<HTMLElement>(
// //                 '.selected-work__project-title'
// //             );


// //         const getMeta = (
// //             project: HTMLElement
// //         ) =>
// //             project.querySelector<HTMLElement>(
// //                 '.selected-work__project-meta'
// //             );


// //         const getView = (
// //             project: HTMLElement
// //         ) =>
// //             project.querySelector<HTMLElement>(
// //                 '.selected-work__view-project'
// //             );


// //         /* =====================================================
// //            INITIAL STATE
// //         ===================================================== */

// //         let currentIndex = 0;

// //         let isTransitioning = false;

// //         let pendingIndex: number | null = null;


// //         projects.forEach(
// //             (
// //                 project,
// //                 index
// //             ) => {

// //                 if (index === 0) {

// //                     gsap.set(
// //                         project,
// //                         {
// //                             display:
// //                                 'block',

// //                             visibility:
// //                                 'visible',

// //                             opacity:
// //                                 1,

// //                             clipPath:
// //                                 'inset(0% 0% 0% 0%)',
// //                         }
// //                     );

// //                 } else {

// //                     gsap.set(
// //                         project,
// //                         {
// //                             display:
// //                                 'none',

// //                             visibility:
// //                                 'hidden',

// //                             opacity:
// //                                 0,
// //                         }
// //                     );

// //                 }

// //             }
// //         );


// //         /* =====================================================
// //            NAV STATE
// //         ===================================================== */

// //         const updateNav = (
// //             index: number
// //         ) => {

// //             navItems.forEach(
// //                 (
// //                     item,
// //                     itemIndex
// //                 ) => {

// //                     item.classList.toggle(
// //                         'is-active',
// //                         itemIndex === index
// //                     );

// //                 }
// //             );

// //         };


// //         /* =====================================================
// //            COUNTER
// //         ===================================================== */

// //         const updateCounter = (
// //             index: number
// //         ) => {

// //             if (!counter) {
// //                 return;
// //             }


// //             counter.textContent =
// //                 String(
// //                     index + 1
// //                 ).padStart(
// //                     2,
// //                     '0'
// //                 );

// //         };


// //         /* =====================================================
// //            SHOW PROJECT
// //         ===================================================== */

// //         const showProject = (
// //             nextIndex: number,
// //             direction: number
// //         ) => {

// //             if (nextIndex === currentIndex) {
// //                 return;
// //             }


// //             if (isTransitioning) {

// //                 pendingIndex = nextIndex;

// //                 return;

// //             }


// //             if (
// //                 nextIndex < 0 ||
// //                 nextIndex >= projectCount
// //             ) {
// //                 return;
// //             }


// //             const current =
// //                 projects[currentIndex];


// //             const next =
// //                 projects[nextIndex];


// //             if (
// //                 !current ||
// //                 !next
// //             ) {
// //                 return;
// //             }


// //             isTransitioning =
// //                 true;


// //             const currentImage =
// //                 getImage(current);


// //             const nextImage =
// //                 getImage(next);


// //             const currentInfo =
// //                 getInfo(current);


// //             const nextInfo =
// //                 getInfo(next);


// //             const currentTitle =
// //                 getTitle(current);


// //             const nextTitle =
// //                 getTitle(next);


// //             const nextMeta =
// //                 getMeta(next);


// //             const nextView =
// //                 getView(next);


// //             /* =================================================
// //                PREPARE NEXT
// //             ================================================= */

// //             gsap.set(
// //                 next,
// //                 {
// //                     display:
// //                         'block',

// //                     visibility:
// //                         'visible',

// //                     opacity:
// //                         1,

// //                     position:
// //                         'absolute',

// //                     inset:
// //                         0,

// //                     width:
// //                         '100%',

// //                     clipPath:
// //                         direction > 0
// //                             ? 'inset(100% 0% 0% 0%)'
// //                             : 'inset(0% 0% 100% 0%)',
// //                 }
// //             );


// //             gsap.set(
// //                 [
// //                     nextInfo,
// //                     nextTitle,
// //                     nextMeta,
// //                     nextView,
// //                 ].filter(Boolean),
// //                 {
// //                     opacity:
// //                         0,

// //                     y:
// //                         direction > 0
// //                             ? 35
// //                             : -35,
// //                 }
// //             );


// //             if (nextImage) {

// //                 gsap.set(
// //                     nextImage,
// //                     {
// //                         scale:
// //                             1.08,

// //                         opacity:
// //                             0.6,
// //                     }
// //                 );

// //             }


// //             /* =================================================
// //                TRANSITION TIMELINE
// //             ================================================= */

// //             const timeline =
// //                 gsap.timeline({

// //                     defaults: {
// //                         ease:
// //                             'power3.inOut',
// //                     },

// //                     onComplete: () => {

// //                         gsap.set(
// //                             current,
// //                             {
// //                                 display:
// //                                     'none',

// //                                 visibility:
// //                                     'hidden',

// //                                 opacity:
// //                                     0,

// //                                 clearProps:
// //                                     'clipPath',
// //                             }
// //                         );


// //                         gsap.set(
// //                             next,
// //                             {
// //                                 position:
// //                                     'relative',

// //                                 inset:
// //                                     'auto',

// //                                 width:
// //                                     '100%',

// //                                 clearProps:
// //                                     'clipPath',
// //                             }
// //                         );


// //                         currentIndex =
// //                             nextIndex;


// //                         isTransitioning =
// //                             false;


// //                         updateCounter(
// //                             nextIndex
// //                         );


// //                         updateNav(
// //                             nextIndex
// //                         );


// //                         const queuedIndex = pendingIndex;

// //                         pendingIndex = null;


// //                         if (
// //                             queuedIndex !== null &&
// //                             queuedIndex !== currentIndex
// //                         ) {

// //                             showProject(
// //                                 queuedIndex,
// //                                 queuedIndex > currentIndex ? 1 : -1
// //                             );

// //                         }

// //                     },

// //                 });


// //             /* =================================================
// //                CURRENT OUT
// //             ================================================= */

// //             timeline.to(
// //                 [
// //                     currentTitle,
// //                     currentInfo,
// //                 ].filter(Boolean),
// //                 {
// //                     y:
// //                         direction > 0
// //                             ? -30
// //                             : 30,

// //                     opacity:
// //                         0,

// //                     duration:
// //                         0.35,

// //                     stagger:
// //                         0.03,
// //                 },
// //                 0
// //             );


// //             if (currentImage) {

// //                 timeline.to(
// //                     currentImage,
// //                     {
// //                         scale:
// //                             0.96,

// //                         duration:
// //                             0.55,
// //                     },
// //                     0
// //                 );

// //             }


// //             /* =================================================
// //                NEXT REVEAL
// //             ================================================= */

// //             timeline.to(
// //                 next,
// //                 {
// //                     clipPath:
// //                         'inset(0% 0% 0% 0%)',

// //                     duration:
// //                         0.8,

// //                 },
// //                 0.12
// //             );


// //             if (nextImage) {

// //                 timeline.to(
// //                     nextImage,
// //                     {
// //                         scale:
// //                             1,

// //                         opacity:
// //                             1,

// //                         duration:
// //                             0.85,

// //                     },
// //                     0.12
// //                 );

// //             }


// //             /* =================================================
// //                NEXT CONTENT
// //             ================================================= */

// //             timeline.to(
// //                 [
// //                     nextMeta,
// //                     nextTitle,
// //                     nextInfo,
// //                     nextView,
// //                 ].filter(Boolean),
// //                 {
// //                     y:
// //                         0,

// //                     opacity:
// //                         1,

// //                     duration:
// //                         0.55,

// //                     stagger:
// //                         0.07,

// //                     ease:
// //                         'power3.out',

// //                 },
// //                 0.42
// //             );

// //         };


// //         /* =====================================================
// //            INITIAL UI
// //         ===================================================== */

// //         updateCounter(0);

// //         updateNav(0);


// //         /* =====================================================
// //            INTRO ENTRANCE
// //         ===================================================== */

// //         if (intro) {

// //             gsap.fromTo(
// //                 intro,
// //                 {
// //                     opacity:
// //                         0,

// //                     y:
// //                         60,
// //                 },
// //                 {
// //                     opacity:
// //                         1,

// //                     y:
// //                         0,

// //                     duration:
// //                         1,

// //                     ease:
// //                         'power3.out',

// //                     scrollTrigger: {

// //                         trigger:
// //                             section,

// //                         start:
// //                             'top 85%',

// //                         once:
// //                             true,

// //                     },

// //                 }
// //             );

// //         }


// //         /* =====================================================
// //            BOTTOM ENTRANCE
// //         ===================================================== */

// //         if (bottom) {

// //             gsap.fromTo(
// //                 bottom,
// //                 {
// //                     opacity:
// //                         0,

// //                     y:
// //                         30,
// //                 },
// //                 {
// //                     opacity:
// //                         1,

// //                     y:
// //                         0,

// //                     duration:
// //                         0.8,

// //                     ease:
// //                         'power3.out',

// //                     scrollTrigger: {

// //                         trigger:
// //                             section,

// //                         start:
// //                             'top 75%',

// //                         once:
// //                             true,

// //                     },

// //                 }
// //             );

// //         }


// //         /* =====================================================
// //            PROJECT SWITCH SCROLL

// //            The original reveal animation is preserved, but the
// //            full section is no longer pinned. Pinning a section
// //            taller than the viewport created the blank area and
// //            unstable 01/02 switching.
// //         ===================================================== */


// //         const mainTrigger =
// //             ScrollTrigger.create({

// //                 trigger:
// //                     section,

// //                 start:
// //                     'top 80%',

// //                 end:
// //                     'bottom 20%',

// //                 invalidateOnRefresh:
// //                     true,

// //                 onUpdate:
// //                     (self) => {

// //                         /*
// //                         ==========================================
// //                         ONE PROJECT
// //                         ==========================================

// //                         There is nothing to transition.
// //                         Section simply remains pinned.
// //                         */

// //                         if (
// //                             projectCount <= 1
// //                         ) {
// //                             return;
// //                         }


// //                         /*
// //                         ==========================================
// //                         MULTIPLE PROJECTS
// //                         ==========================================
// //                         */

// //                         const rawIndex =
// //                             self.progress *
// //                             (
// //                                 projectCount - 1
// //                             );


// //                         const targetIndex =
// //                             Math.round(
// //                                 rawIndex
// //                             );


// //                         if (
// //                             targetIndex !==
// //                             currentIndex
// //                         ) {

// //                             showProject(
// //                                 targetIndex,
// //                                 targetIndex >
// //                                     currentIndex
// //                                     ? 1
// //                                     : -1
// //                             );

// //                         }

// //                     },

// //             });


// //         /* =====================================================
// //            NAVIGATION CLICK
// //         ===================================================== */

// //         navItems.forEach(
// //             (
// //                 item,
// //                 index
// //             ) => {

// //                 item.addEventListener(
// //                     'click',
// //                     (
// //                         event
// //                     ) => {

// //                         /*
// //                          * These are actual React Router links.
// //                          * Don't prevent navigation.
// //                          */

// //                         if (
// //                             index !== currentIndex
// //                         ) {

// //                             /*
// //                              * Navigation remains a normal
// //                              * project-detail link.
// //                              */

// //                         }

// //                     }
// //                 );

// //             }
// //         );


// //         /* =====================================================
// //            IMAGE HOVER
// //         ===================================================== */

// //         projects.forEach(
// //             (
// //                 project
// //             ) => {

// //                 const visual =
// //                     project.querySelector<HTMLElement>(
// //                         '.selected-work__visual'
// //                     );


// //                 const image =
// //                     getImage(
// //                         project
// //                     );


// //                 if (
// //                     !visual ||
// //                     !image
// //                 ) {
// //                     return;
// //                 }


// //                 visual.addEventListener(
// //                     'mouseenter',
// //                     () => {

// //                         gsap.to(
// //                             image,
// //                             {
// //                                 scale:
// //                                     1.06,

// //                                 duration:
// //                                     0.8,

// //                                 ease:
// //                                     'power3.out',
// //                             }
// //                         );

// //                     }
// //                 );


// //                 visual.addEventListener(
// //                     'mouseleave',
// //                     () => {

// //                         gsap.to(
// //                             image,
// //                             {
// //                                 scale:
// //                                     1.025,

// //                                 duration:
// //                                     0.8,

// //                                 ease:
// //                                     'power3.out',
// //                             }
// //                         );

// //                     }
// //                 );

// //             }
// //         );


// //         /* =====================================================
// //            REDUCED MOTION
// //         ===================================================== */

// //         const reducedMotion =
// //             window.matchMedia(
// //                 '(prefers-reduced-motion: reduce)'
// //             ).matches;


// //         if (
// //             reducedMotion
// //         ) {

// //             mainTrigger.kill();


// //             projects.forEach(
// //                 (
// //                     project,
// //                     index
// //                 ) => {

// //                     gsap.set(
// //                         project,
// //                         {
// //                             display:
// //                                 index === 0
// //                                     ? 'block'
// //                                     : 'none',

// //                             visibility:
// //                                 index === 0
// //                                     ? 'visible'
// //                                     : 'hidden',

// //                             opacity:
// //                                 index === 0
// //                                     ? 1
// //                                     : 0,

// //                             clearProps:
// //                                 'all',
// //                         }
// //                     );

// //                 }
// //             );

// //         }


// //         /* =====================================================
// //            REFRESH
// //         ===================================================== */

// //         const refresh =
// //             window.setTimeout(
// //                 () => {

// //                     ScrollTrigger.refresh();

// //                 },
// //                 300
// //             );


// //         /* =====================================================
// //            IMAGE LOAD REFRESH
// //         ===================================================== */

// //         const images =
// //             section.querySelectorAll('img');


// //         images.forEach(
// //             (
// //                 image
// //             ) => {

// //                 if (
// //                     !image.complete
// //                 ) {

// //                     image.addEventListener(
// //                         'load',
// //                         () => {

// //                             ScrollTrigger.refresh();

// //                         },
// //                         {
// //                             once: true,
// //                         }
// //                     );

// //                 }

// //             }
// //         );


// //         /* =====================================================
// //            CLEANUP TIMER
// //         ===================================================== */

// //         return () => {

// //             window.clearTimeout(
// //                 refresh
// //             );

// //         };

// //     }, section);


// //     return () => {

// //         ctx.revert();

// //     };

// // };
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// // One owner per mounted section (including React StrictMode / hot reload).
// const mountedSections = new WeakMap<HTMLElement, () => void>();

// /** Drop-in replacement; keeps the existing SelectedWork.tsx and CSS. */
// export const initSelectedWorkAnimation = (section: HTMLElement): (() => void) => {
//     mountedSections.get(section)?.();

//     const stage = section.querySelector<HTMLElement>('.selected-work__featured');
//     const projects = Array.from(section.querySelectorAll<HTMLElement>('.selected-work__project'));
//     if (!stage || projects.length === 0) return () => {};

//     const navItems = Array.from(section.querySelectorAll<HTMLElement>('[data-project-nav]'));
//     const counter = section.querySelector<HTMLElement>('.selected-work__counter strong');
//     const images = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLImageElement>('img')));
//     const media = gsap.matchMedia();
//     let disposed = false;
//     let refreshFrame = 0;

//     const scheduleRefresh = () => {
//         if (disposed || refreshFrame) return;
//         refreshFrame = requestAnimationFrame(() => {
//             refreshFrame = 0;
//             if (!disposed && section.isConnected) ScrollTrigger.refresh();
//         });
//     };

//     media.add({
//         desktop: '(min-width: 901px) and (min-height: 640px)',
//         reduceMotion: '(prefers-reduced-motion: reduce)',
//         all: 'all',
//     }, (context) => {
//         const desktop = Boolean(context.conditions?.desktop);
//         const reduceMotion = Boolean(context.conditions?.reduceMotion);
//         const originalCounter = counter?.textContent ?? '';
//         const originalMode = stage.getAttribute('data-work-mode');
//         const originalNav = navItems.map((item) => item.classList.contains('is-active'));
//         const originalProject = projects.map((project) => ({
//             active: project.classList.contains('is-active'),
//             hidden: project.getAttribute('aria-hidden'),
//             inert: project.inert,
//             pointerEvents: project.style.pointerEvents,
//         }));
//         let activeIndex = -1;

//         const restoreState = () => {
//             if (counter) counter.textContent = originalCounter;
//             if (originalMode === null) stage.removeAttribute('data-work-mode');
//             else stage.setAttribute('data-work-mode', originalMode);
//             navItems.forEach((item, index) => item.classList.toggle('is-active', originalNav[index]));
//             projects.forEach((project, index) => {
//                 const original = originalProject[index];
//                 project.classList.toggle('is-active', original.active);
//                 if (original.hidden === null) project.removeAttribute('aria-hidden');
//                 else project.setAttribute('aria-hidden', original.hidden);
//                 project.inert = original.inert;
//                 project.style.pointerEvents = original.pointerEvents;
//             });
//         };

//         const selectProject = (index: number, stacked: boolean) => {
//             if (index === activeIndex) return;
//             activeIndex = index;
//             if (counter) counter.textContent = String(index + 1).padStart(2, '0');
//             navItems.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
//             projects.forEach((project, itemIndex) => {
//                 const hidden = stacked && itemIndex !== index;
//                 project.classList.toggle('is-active', itemIndex === index);
//                 project.setAttribute('aria-hidden', String(hidden));
//                 project.inert = hidden;
//                 project.style.pointerEvents = hidden ? 'none' : 'auto';
//             });
//         };

//         // Do not animate an info parent AND its title child: their transforms
//         // otherwise compound and their opacity gets multiplied.
//         const content = (project: HTMLElement) => Array.from(project.querySelectorAll<HTMLElement>(
//             '.selected-work__project-meta, .selected-work__project-info, .selected-work__view-project'
//         ));
//         const visuals = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__visual')));
//         const titles = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__project-title')));
//         const info = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__project-info')));
//         const descriptions = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__project-title-wrap p')));

//         const hoverCleanups = projects.map((project) => {
//             const visual = project.querySelector<HTMLElement>('.selected-work__visual');
//             const image = project.querySelector<HTMLImageElement>('.selected-work__visual-image');
//             if (!visual || !image || reduceMotion) return () => {};

//             const enter = () => gsap.to(image, {
//                 scale: 1.015, duration: 0.45, ease: 'power2.out', overwrite: 'auto',
//             });
//             const leave = () => gsap.to(image, {
//                 scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto',
//             });
//             visual.addEventListener('pointerenter', enter);
//             visual.addEventListener('pointerleave', leave);
//             return () => {
//                 visual.removeEventListener('pointerenter', enter);
//                 visual.removeEventListener('pointerleave', leave);
//             };
//         });

//         // Record initial inline styles in this GSAP context for complete cleanup.
//         // Every project stays in the DOM and contributes to the measured height.
//         gsap.set(projects, {
//             display: 'block', position: 'relative', inset: 'auto', width: '100%',
//             autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)',
//             x: 0, y: 0, marginBottom: 0, pointerEvents: 'auto',
//         });
//         gsap.set(projects.flatMap(content), { autoAlpha: 1, y: 0 });
//         gsap.set(images, {
//             scale: 1, opacity: 1, objectFit: 'contain',
//             // GSAP owns the transform; a CSS hover transition must not fight it.
//             transition: 'filter 0.4s ease',
//         });

//         const topOffset = () => {
//             const header = document.querySelector<HTMLElement>('.df-adaptive-nav');
//             return Math.ceil(header?.getBoundingClientRect().height ?? 72) + 16;
//         };

//         let compactStageFits = false;
//         let fitStage = () => {};

//         // Measure and size the whole card, not just its image. The stage fits
//         // below the existing fixed navbar; no title or CTA is pinned off-screen.
//         const layout = gsap.context(() => {
//             if (!desktop || reduceMotion || projects.length < 2) return;

//             gsap.set(stage, {
//                 display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)',
//                 alignItems: 'start', position: 'relative', width: '100%',
//             });
//             gsap.set(projects, {
//                 gridArea: '1 / 1', alignSelf: 'start',
//                 backgroundColor: getComputedStyle(section).backgroundColor,
//             });
//             gsap.set(titles, {
//                 fontSize: 'clamp(2rem, 3.6vw, 4rem)', lineHeight: 0.98,
//                 letterSpacing: '-0.055em',
//             });
//             gsap.set(info, { padding: '1rem 0', gap: '2rem' });
//             gsap.set(descriptions, { marginTop: '0.65rem', lineHeight: 1.55 });
//             gsap.set(visuals, { height: 240, minHeight: 0, maxHeight: 'none', aspectRatio: 'auto' });

//             fitStage = () => {
//                 // Heights are untransformed layout measurements. They do not
//                 // change when the clip wipe plays, in either direction.
//                 const chrome = Math.max(...projects.map((project) => {
//                     const visual = project.querySelector<HTMLElement>('.selected-work__visual');
//                     return project.offsetHeight - (visual?.offsetHeight ?? 0);
//                 }));
//                 const available = window.innerHeight - topOffset() - 24;
//                 const imageHeight = Math.floor(Math.min(stage.clientWidth * 9 / 16, available - chrome));
//                 compactStageFits = imageHeight >= 160;
//                 gsap.set(visuals, { height: Math.max(160, imageHeight) });
//             };
//             fitStage();
//         }, section);

//         const reveal = (target: HTMLElement) => {
//             if (reduceMotion) return;
//             gsap.fromTo(target, { autoAlpha: 0, y: 26 }, {
//                 autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
//                 scrollTrigger: { trigger: target, start: 'top 92%', once: true },
//             });
//         };

//         const intro = section.querySelector<HTMLElement>('.selected-work__intro');
//         if (intro) reveal(intro);

//         if (!desktop || reduceMotion || projects.length < 2 || !compactStageFits) {
//             // A tall card or a small screen must remain readable. Show ALL
//             // projects; never leave reduced-motion users with only project 01.
//             layout.revert();
//             stage.setAttribute('data-work-mode', 'flow');
//             gsap.set(stage, { display: 'block' });
//             projects.forEach((project, index) => {
//                 gsap.set(project, {
//                     display: 'block', autoAlpha: 1, position: 'relative',
//                     marginBottom: index === projects.length - 1 ? 0 : 'clamp(3rem, 6vw, 6rem)',
//                 });
//                 reveal(project);
//                 ScrollTrigger.create({
//                     trigger: project, start: 'top 55%', end: 'bottom 45%',
//                     onEnter: () => selectProject(index, false),
//                     onEnterBack: () => selectProject(index, false),
//                 });
//             });
//             selectProject(0, false);
//         } else {
//             stage.setAttribute('data-work-mode', 'pinned');
//             projects.forEach((project, index) => gsap.set(project, {
//                 zIndex: index + 1,
//                 autoAlpha: index === 0 ? 1 : 0,
//                 clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
//             }));

//             // One reversible timeline, not a new asynchronous timeline on
//             // every wheel event. Fast scrolling cannot leave a queued stale card.
//             const hold = 0.85;
//             const wipe = 1;
//             const switches: number[] = [];
//             const clock = { value: 0 };
//             const timeline = gsap.timeline({ paused: true });
//             timeline.to(clock, { value: 1, duration: hold, ease: 'none' });

//             for (let index = 1; index < projects.length; index += 1) {
//                 const previous = projects[index - 1];
//                 const next = projects[index];
//                 const image = next.querySelector<HTMLImageElement>('.selected-work__visual-image');
//                 const start = timeline.duration();
//                 switches.push(start + wipe * 0.5);

//                 timeline.set(next, { autoAlpha: 1 }, start);
//                 timeline.to(next, {
//                     clipPath: 'inset(0% 0% 0% 0%)', duration: wipe,
//                     ease: 'power2.inOut',
//                 }, start);
//                 timeline.to(content(previous), {
//                     opacity: 0, y: -18, duration: 0.3, ease: 'power2.out',
//                 }, start);
//                 timeline.fromTo(content(next), { opacity: 0, y: 22 }, {
//                     opacity: 1, y: 0, duration: 0.5, stagger: 0.06,
//                     ease: 'power3.out', immediateRender: false,
//                 }, start + 0.3);
//                 if (image) timeline.fromTo(image, { scale: 0.985 }, {
//                     scale: 1, duration: wipe, ease: 'power2.out', immediateRender: false,
//                 }, start);
//                 // Hide the old layer only AFTER the opaque new card covers it.
//                 timeline.set(previous, { autoAlpha: 0 }, start + wipe);
//                 timeline.to(clock, { value: index + 1, duration: hold, ease: 'none' });
//             }

//             const syncSelection = () => {
//                 const time = timeline.time();
//                 selectProject(switches.filter((point) => time >= point).length, true);
//             };
//             timeline.eventCallback('onUpdate', syncSelection);
//             selectProject(0, true);

//             ScrollTrigger.create({
//                 trigger: stage,
//                 // Pin only the project stage, never the entire tall section.
//                 pin: stage, pinSpacing: true, anticipatePin: 1,
//                 start: () => `top ${topOffset()}px`,
//                 end: () => `+=${Math.round(timeline.duration() * Math.max(320, window.innerHeight * 0.55))}`,
//                 animation: timeline, scrub: 0.35,
//                 onRefreshInit: fitStage,
//                 onRefresh: syncSelection,
//             });
//         }

//         const bottom = section.querySelector<HTMLElement>('.selected-work__bottom');
//         if (bottom) reveal(bottom);
//         scheduleRefresh();
//         return () => {
//             hoverCleanups.forEach((cleanup) => cleanup());
//             layout.revert();
//             restoreState();
//         };
//     }, section);

//     images.forEach((image) => {
//         if (!image.complete) {
//             image.addEventListener('load', scheduleRefresh);
//             image.addEventListener('error', scheduleRefresh);
//         }
//     });
//     void document.fonts?.ready.then(scheduleRefresh);
//     scheduleRefresh();

//     const cleanup = () => {
//         if (disposed) return;
//         disposed = true;
//         cancelAnimationFrame(refreshFrame);
//         images.forEach((image) => {
//             image.removeEventListener('load', scheduleRefresh);
//             image.removeEventListener('error', scheduleRefresh);
//         });
//         media.revert();
//         mountedSections.delete(section);
//     };
//     mountedSections.set(section, cleanup);
//     return cleanup;
// };

// export default initSelectedWorkAnimation;
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// One owner per mounted section (including React StrictMode / hot reload).
const mountedSections = new WeakMap<HTMLElement, () => void>();

/** Drop-in replacement; keeps the existing SelectedWork.tsx and CSS. */
export const initSelectedWorkAnimation = (section: HTMLElement): (() => void) => {
    mountedSections.get(section)?.();

    const stage = section.querySelector<HTMLElement>('.selected-work__featured');
    const projects = Array.from(section.querySelectorAll<HTMLElement>('.selected-work__project'));
    if (!stage || projects.length === 0) return () => {};

    const navItems = Array.from(section.querySelectorAll<HTMLElement>('[data-project-nav]'));
    const counter = section.querySelector<HTMLElement>('.selected-work__counter strong');
    const images = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLImageElement>('img')));
    const media = gsap.matchMedia();
    let disposed = false;
    let refreshFrame = 0;

    const scheduleRefresh = () => {
        if (disposed || refreshFrame) return;
        refreshFrame = requestAnimationFrame(() => {
            refreshFrame = 0;
            if (!disposed && section.isConnected) ScrollTrigger.refresh();
        });
    };

    media.add({
        desktop: '(min-height: 640px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
        all: 'all',
    }, (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        const reduceMotion = Boolean(context.conditions?.reduceMotion);
        const originalCounter = counter?.textContent ?? '';
        const originalMode = stage.getAttribute('data-work-mode');
        const originalNav = navItems.map((item) => item.classList.contains('is-active'));
        const originalProject = projects.map((project) => ({
            active: project.classList.contains('is-active'),
            hidden: project.getAttribute('aria-hidden'),
            inert: project.inert,
            pointerEvents: project.style.pointerEvents,
        }));
        let activeIndex = -1;

        const restoreState = () => {
            if (counter) counter.textContent = originalCounter;
            if (originalMode === null) stage.removeAttribute('data-work-mode');
            else stage.setAttribute('data-work-mode', originalMode);
            navItems.forEach((item, index) => item.classList.toggle('is-active', originalNav[index]));
            projects.forEach((project, index) => {
                const original = originalProject[index];
                project.classList.toggle('is-active', original.active);
                if (original.hidden === null) project.removeAttribute('aria-hidden');
                else project.setAttribute('aria-hidden', original.hidden);
                project.inert = original.inert;
                project.style.pointerEvents = original.pointerEvents;
            });
        };

        const selectProject = (index: number, stacked: boolean) => {
            if (index === activeIndex) return;
            activeIndex = index;
            if (counter) counter.textContent = String(index + 1).padStart(2, '0');
            navItems.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
            projects.forEach((project, itemIndex) => {
                const hidden = stacked && itemIndex !== index;
                project.classList.toggle('is-active', itemIndex === index);
                project.setAttribute('aria-hidden', String(hidden));
                project.inert = hidden;
                project.style.pointerEvents = hidden ? 'none' : 'auto';
            });
        };

        // Do not animate an info parent AND its title child: their transforms
        // otherwise compound and their opacity gets multiplied.
        const content = (project: HTMLElement) => Array.from(project.querySelectorAll<HTMLElement>(
            '.selected-work__project-meta, .selected-work__project-info, .selected-work__view-project'
        ));
        const visuals = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__visual')));
        const titles = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__project-title')));
        const info = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__project-info')));
        const descriptions = projects.flatMap((project) => Array.from(project.querySelectorAll<HTMLElement>('.selected-work__project-title-wrap p')));

        const hoverCleanups = projects.map((project) => {
            const visual = project.querySelector<HTMLElement>('.selected-work__visual');
            const image = project.querySelector<HTMLImageElement>('.selected-work__visual-image');
            if (!visual || !image || reduceMotion) return () => {};

            const enter = () => gsap.to(image, {
                scale: 1.015, duration: 0.45, ease: 'power2.out', overwrite: 'auto',
            });
            const leave = () => gsap.to(image, {
                scale: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto',
            });
            visual.addEventListener('pointerenter', enter);
            visual.addEventListener('pointerleave', leave);
            return () => {
                visual.removeEventListener('pointerenter', enter);
                visual.removeEventListener('pointerleave', leave);
            };
        });

        // Record initial inline styles in this GSAP context for complete cleanup.
        // Every project stays in the DOM and contributes to the measured height.
        gsap.set(projects, {
            display: 'block', position: 'relative', inset: 'auto', width: '100%',
            autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)',
            x: 0, y: 0, marginBottom: 0, pointerEvents: 'auto',
        });
        gsap.set(projects.flatMap(content), { autoAlpha: 1, y: 0 });
        gsap.set(images, {
            scale: 1, opacity: 1, objectFit: 'contain',
            // GSAP owns the transform; a CSS hover transition must not fight it.
            transition: 'filter 0.4s ease',
        });

        const topOffset = () => {
            const header = document.querySelector<HTMLElement>('.df-adaptive-nav');
            return Math.ceil(header?.getBoundingClientRect().height ?? 72) + 16;
        };

        let compactStageFits = false;
        let fitStage = () => {};

        // Measure and size the whole card, not just its image. The stage fits
        // below the existing fixed navbar; no title or CTA is pinned off-screen.
        const layout = gsap.context(() => {
            if (!desktop || reduceMotion || projects.length < 2) return;

            gsap.set(stage, {
                display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)',
                alignItems: 'start', position: 'relative', width: '100%',
            });
            gsap.set(projects, {
                gridArea: '1 / 1', alignSelf: 'start',
                backgroundColor: getComputedStyle(section).backgroundColor,
            });
            gsap.set(titles, {
                fontSize: 'clamp(2rem, 3.6vw, 4rem)', lineHeight: 0.98,
                letterSpacing: '-0.055em',
            });
            gsap.set(info, { padding: '1rem 0', gap: '2rem' });
            gsap.set(descriptions, { marginTop: '0.65rem', lineHeight: 1.55 });
            gsap.set(visuals, { height: 240, minHeight: 0, maxHeight: 'none', aspectRatio: 'auto' });

            fitStage = () => {
                // Heights are untransformed layout measurements. They do not
                // change when the clip wipe plays, in either direction.
                const chrome = Math.max(...projects.map((project) => {
                    const visual = project.querySelector<HTMLElement>('.selected-work__visual');
                    return project.offsetHeight - (visual?.offsetHeight ?? 0);
                }));
                const available = window.innerHeight - topOffset() - 24;
                const imageHeight = Math.floor(Math.min(stage.clientWidth * 9 / 16, available - chrome));
                compactStageFits = imageHeight >= 160;
                gsap.set(visuals, { height: Math.max(160, imageHeight) });
            };
            fitStage();
        }, section);

        const reveal = (target: HTMLElement) => {
            if (reduceMotion) return;
            gsap.fromTo(target, { autoAlpha: 0, y: 26 }, {
                autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: target, start: 'top 92%', once: true },
            });
        };

        const intro = section.querySelector<HTMLElement>('.selected-work__intro');
        if (intro) reveal(intro);

        if (!desktop || reduceMotion || projects.length < 2 || !compactStageFits) {
            // A tall card or a small screen must remain readable. Show ALL
            // projects; never leave reduced-motion users with only project 01.
            layout.revert();
            stage.setAttribute('data-work-mode', 'flow');
            gsap.set(stage, { display: 'block' });
            projects.forEach((project, index) => {
                gsap.set(project, {
                    display: 'block', autoAlpha: 1, position: 'relative',
                    marginBottom: index === projects.length - 1 ? 0 : 'clamp(3rem, 6vw, 6rem)',
                });
                reveal(project);
                ScrollTrigger.create({
                    trigger: project, start: 'top 55%', end: 'bottom 45%',
                    onEnter: () => selectProject(index, false),
                    onEnterBack: () => selectProject(index, false),
                });
            });
            selectProject(0, false);
        } else {
            stage.setAttribute('data-work-mode', 'pinned');
            projects.forEach((project, index) => gsap.set(project, {
                zIndex: index + 1,
                autoAlpha: index === 0 ? 1 : 0,
                clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
            }));

            // One reversible timeline, not a new asynchronous timeline on
            // every wheel event. Fast scrolling cannot leave a queued stale card.
            const hold = 0.85;
            const exitDuration = 0.28;
            const revealDuration = 0.72;
            const switches: number[] = [];
            const clock = { value: 0 };
            const timeline = gsap.timeline({ paused: true });
            timeline.to(clock, { value: 1, duration: hold, ease: 'none' });

            for (let index = 1; index < projects.length; index += 1) {
                const previous = projects[index - 1];
                const next = projects[index];
                const image = next.querySelector<HTMLImageElement>('.selected-work__visual-image');
                const start = timeline.duration();
                const swap = start + exitDuration;
                switches.push(swap);

                // Treat the entire card as one visual state. The old version
                // first closes completely, then the new version opens. This
                // prevents mixed frames such as an old image with a new title
                // or a stale project number while keeping the original wipe.
                timeline.to(previous, {
                    autoAlpha: 0,
                    clipPath: 'inset(0% 0% 100% 0%)',
                    duration: exitDuration,
                    ease: 'power2.in',
                }, start);
                timeline.set(next, {
                    autoAlpha: 1,
                    clipPath: 'inset(0% 0% 100% 0%)',
                }, swap);
                timeline.to(next, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: revealDuration,
                    ease: 'power3.inOut',
                }, swap);
                if (image) timeline.fromTo(image, { scale: 0.985 }, {
                    scale: 1,
                    duration: revealDuration,
                    ease: 'power2.out',
                    immediateRender: false,
                }, swap);
                timeline.to(clock, { value: index + 1, duration: hold, ease: 'none' });
            }

            const syncSelection = () => {
                const time = timeline.time();
                selectProject(switches.filter((point) => time >= point).length, true);
            };
            timeline.eventCallback('onUpdate', syncSelection);
            selectProject(0, true);

            ScrollTrigger.create({
                trigger: stage,
                // Pin only the project stage, never the entire tall section.
                pin: stage, pinSpacing: true, anticipatePin: 1,
                start: () => `top ${topOffset()}px`,
                end: () => `+=${Math.round(timeline.duration() * Math.max(320, window.innerHeight * 0.55))}`,
                animation: timeline, scrub: 0.35,
                onRefreshInit: fitStage,
                onRefresh: syncSelection,
            });
        }

        const bottom = section.querySelector<HTMLElement>('.selected-work__bottom');
        if (bottom) reveal(bottom);
        scheduleRefresh();
        return () => {
            hoverCleanups.forEach((cleanup) => cleanup());
            layout.revert();
            restoreState();
        };
    }, section);

    images.forEach((image) => {
        if (!image.complete) {
            image.addEventListener('load', scheduleRefresh);
            image.addEventListener('error', scheduleRefresh);
        }
    });
    void document.fonts?.ready.then(scheduleRefresh);
    scheduleRefresh();

    const cleanup = () => {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        images.forEach((image) => {
            image.removeEventListener('load', scheduleRefresh);
            image.removeEventListener('error', scheduleRefresh);
        });
        media.revert();
        mountedSections.delete(section);
    };
    mountedSections.set(section, cleanup);
    return cleanup;
};

export default initSelectedWorkAnimation;
