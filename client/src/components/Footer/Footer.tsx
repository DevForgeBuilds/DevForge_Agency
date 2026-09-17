// import './Footer.css';
// import { useEffect, useRef } from 'react';
// import { initFooterAnimation } from '../../animations/footerAnimation';

// const Footer = () => {
//     const footerRef = useRef<HTMLElement | null>(null);

//     useEffect(() => {
//         if (!footerRef.current) return;

//         return initFooterAnimation(footerRef.current);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth',
//         });
//     };

//     return (
//         <footer
//             ref={footerRef}
//             id="footer"
//             className="forge-terminal"
//         >

//             {/* =================================================
//                 BACKGROUND
//             ================================================= */}

//             <div
//                 className="forge-terminal__grid"
//                 aria-hidden="true"
//             />

//             <div
//                 className="forge-terminal__glow"
//                 aria-hidden="true"
//             />


//             {/* =================================================
//                 HEADER
//             ================================================= */}

//             <div className="forge-terminal__meta">

//                 <span>
//                     08 / FINAL_OUTPUT
//                 </span>

//                 <span>
//                     DEVFORGE_OS
//                 </span>

//             </div>


//             {/* =================================================
//                 TERMINAL
//             ================================================= */}

//             <div className="forge-terminal__wrap">

//                 <div className="forge-terminal__window">

//                     {/* Window header */}

//                     <div className="forge-terminal__bar">

//                         <div className="forge-terminal__dots">
//                             <span />
//                             <span />
//                             <span />
//                         </div>

//                         <span className="forge-terminal__filename">
//                             devforge.forge
//                         </span>

//                         <span className="forge-terminal__status">
//                             ● ONLINE
//                         </span>

//                     </div>


//                     {/* Terminal body */}

//                     <div className="forge-terminal__body">

//                         {/* Line 01 */}

//                         <div className="forge-terminal__line">

//                             <span className="forge-terminal__number">
//                                 01
//                             </span>

//                             <span className="forge-terminal__prompt">
//                                 &gt;
//                             </span>

//                             <span>
//                                 system.status()
//                             </span>

//                         </div>


//                         {/* Status */}

//                         <div className="forge-terminal__output">

//                             <div>
//                                 <span>BUILD</span>

//                                 <strong>
//                                     [██████████] 100%
//                                 </strong>
//                             </div>

//                             <div>
//                                 <span>CODE</span>

//                                 <strong>
//                                     [██████████] 100%
//                                 </strong>
//                             </div>

//                             <div>
//                                 <span>LAUNCH</span>

//                                 <strong>
//                                     [██████████] 100%
//                                 </strong>
//                             </div>

//                         </div>


//                         {/* Line 02 */}

//                         <div className="forge-terminal__line forge-terminal__line-gap">

//                             <span className="forge-terminal__number">
//                                 02
//                             </span>

//                             <span className="forge-terminal__prompt">
//                                 &gt;
//                             </span>

//                             <span>
//                                 system.shutdown()
//                             </span>

//                         </div>


//                         {/* Error */}

//                         <div className="forge-terminal__error">

//                             <span>
//                                 ERROR:
//                             </span>

//                             <p>
//                                 FORGE IS STILL ACTIVE.
//                             </p>

//                         </div>


//                         {/* Line 03 */}

//                         <div className="forge-terminal__line forge-terminal__line-gap">

//                             <span className="forge-terminal__number">
//                                 03
//                             </span>

//                             <span className="forge-terminal__prompt">
//                                 &gt;
//                             </span>

//                             <span>
//                                 forge.next()
//                             </span>

//                         </div>


//                         {/* Main message */}

//                         <div className="forge-terminal__message">

//                             <span className="forge-terminal__message-muted">
//                                 SYSTEM MESSAGE
//                             </span>

//                             <h2>
//                                 KEEP
//                                 <br />
//                                 <span>
//                                     FORGING.
//                                 </span>
//                             </h2>

//                         </div>


//                         {/* Cursor */}

//                         <div className="forge-terminal__cursor-line">

//                             <span>
//                                 &gt;
//                             </span>

//                             <span className="forge-terminal__cursor">
//                                 _
//                             </span>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         TERMINAL FOOTER
//                     ================================================= */}

//                     <div className="forge-terminal__window-footer">

//                         <span>
//                             STATUS: ACTIVE
//                         </span>

//                         <span>
//                             BUILD / CODE / LAUNCH
//                         </span>

//                     </div>

//                 </div>


//                 {/* =================================================
//                     LOGO BELOW TERMINAL
//                 ================================================= */}

//                 <button
//                     type="button"
//                     className="forge-terminal__brand"
//                     onClick={scrollToTop}
//                     aria-label="Back to top"
//                 >

//                     <div className="forge-terminal__mark">

//                         <span className="forge-terminal__d">
//                             D
//                         </span>

//                         <span className="forge-terminal__f">
//                             F
//                         </span>

//                         <span className="forge-terminal__spark">
//                             +
//                         </span>

//                     </div>

//                     <span className="forge-terminal__wordmark">
//                         DEVFORGE
//                     </span>

//                 </button>

//             </div>


//             {/* =================================================
//                 MARQUEE
//             ================================================= */}

//             <div className="forge-terminal__marquee">

//                 <div className="forge-terminal__marquee-track">

//                     <span>DEVFORGE</span>
//                     <i>✦</i>

//                     <span>BUILD</span>
//                     <i>✦</i>

//                     <span>CODE</span>
//                     <i>✦</i>

//                     <span>LAUNCH</span>
//                     <i>✦</i>

//                     <span>KEEP FORGING</span>
//                     <i>✦</i>

//                     <span>DEVFORGE</span>
//                     <i>✦</i>

//                     <span>BUILD</span>
//                     <i>✦</i>

//                     <span>CODE</span>
//                     <i>✦</i>

//                     <span>LAUNCH</span>
//                     <i>✦</i>

//                     <span>KEEP FORGING</span>
//                     <i>✦</i>

//                 </div>

//             </div>


//             {/* =================================================
//                 LOWER FOOTER
//             ================================================= */}

//             <div className="forge-terminal__lower">

//                 <div className="forge-terminal__social">

//                     <span className="forge-terminal__label">
//                         CONNECT
//                     </span>

//                     <div className="forge-terminal__social-links">

//                         <a
//                             href="https://github.com/DevForgeBuilds"
//                             target="_blank"
//                             rel="noreferrer"
//                         >
//                             GITHUB
//                             <span>↗</span>
//                         </a>

//                         <a
//                             href="#"
//                             target="_blank"
//                             rel="noreferrer"
//                         >
//                             LINKEDIN
//                             <span>↗</span>
//                         </a>

//                         <a
//                             href="#"
//                             target="_blank"
//                             rel="noreferrer"
//                         >
//                             INSTAGRAM
//                             <span>↗</span>
//                         </a>

//                     </div>

//                 </div>


//                 <a
//                     href="mailto:hello@devforge.dev"
//                     className="forge-terminal__email"
//                 >

//                     <span className="forge-terminal__label">
//                         START A PROJECT
//                     </span>

//                     <strong>
//                         devforge.builds@gmail.com
//                     </strong>

//                     <span className="forge-terminal__email-arrow">
//                         ↗
//                     </span>

//                 </a>

//             </div>


//             {/* =================================================
//                 BOTTOM
//             ================================================= */}

//             <div className="forge-terminal__bottom">

//                 <span>
//                     © 2026 DEVFORGE
//                 </span>

//                 <span>
//                     FORGE_PROTOCOL / ACTIVE
//                 </span>

//                 <button
//                     type="button"
//                     onClick={scrollToTop}
//                 >
//                     BACK TO TOP ↑
//                 </button>

//             </div>

//         </footer>
//     );
// };

// export default Footer;
import './Footer.css';
import { useEffect, useRef } from 'react';
import { initFooterAnimation } from '../../animations/footerAnimation';
import devforgeMiniLogo from '../../assets/devforge-mini-logo.png';
import {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
} from 'react-icons/fa6';

const Footer = () => {
    const footerRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        if (!footerRef.current) return;
        return initFooterAnimation(footerRef.current);
    }, []);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer ref={footerRef} id="footer" className="forge-terminal">
            <div className="forge-terminal__grid" aria-hidden="true" />
            <div className="forge-terminal__glow" aria-hidden="true" />
            <div className="forge-terminal__meta">
                <span>08 / LET&apos;S CONNECT</span><span>AHMEDABAD · INDIA</span><span>AVAILABLE FOR SELECT PROJECTS</span>
            </div>
            <div className="forge-terminal__wrap">
                <section className="forge-terminal__window">
                    {/* <div className="forge-terminal__message">
                        <span className="forge-terminal__message-muted">HAVE AN IDEA? LET&apos;S MAKE IT REAL.</span>
                        <h2>LET&apos;S BUILD<br /><span>WHAT&apos;S NEXT.</span></h2>
                        <p>Websites, digital products and scalable systems—designed with clarity and engineered to perform.</p>
                        <a className="forge-terminal__primary-cta" href="mailto:devforge.builds@gmail.com">START A PROJECT <span>↗</span></a>
                    </div> */}
                    {/* <div className="forge-terminal__directory">
                        <div className="forge-terminal__directory-column">
                            <span className="forge-terminal__label">EXPLORE</span>
                            <a href="#studio">Studio <span>01</span></a><a href="#services">Services <span>02</span></a>
                            <a href="#selected-work">Selected work <span>03</span></a><a href="#contact">Contact <span>04</span></a>
                        </div>
                       <div className="forge-terminal__directory-column">
    <span className="forge-terminal__label">
        02 / SERVICES
    </span>

    <a href="/services/web-ui-design">
        <strong>Web & UI Design</strong>
        <span>01 ↗</span>
    </a>

    <a href="/services/web-development">
        <strong>Web Development</strong>
        <span>02 ↗</span>
    </a>

    <a href="/services/full-stack-mern">
        <strong>Full-Stack MERN</strong>
        <span>03 ↗</span>
    </a>

    <a href="/services/frontend-engineering">
        <strong>Frontend Engineering</strong>
        <span>04 ↗</span>
    </a>

    <a href="/services/backend-api-systems">
        <strong>Backend & API Systems</strong>
        <span>05 ↗</span>
    </a>

    <a href="/services/admin-dashboards">
        <strong>Admin Dashboards</strong>
        <span>06 ↗</span>
    </a>
</div>
                    </div> */}
                </section>
                <button type="button" className="forge-terminal__brand" onClick={scrollToTop} aria-label="Back to top">
                    <span className="forge-terminal__mark"><img src={devforgeMiniLogo} alt="" /></span>
                    <span className="forge-terminal__wordmark"><strong>DEVFORGE</strong><small>BUILD · CODE · LAUNCH</small></span>
                    <span className="forge-terminal__brand-arrow">BACK TO TOP ↑</span>
                </button>
            </div>
            {/* <div className="forge-terminal__marquee" aria-hidden="true"><div className="forge-terminal__marquee-track">
                <span>BUILD</span><i>✦</i><span>CODE</span><i>✦</i><span>LAUNCH</span><i>✦</i><span>KEEP FORGING</span><i>✦</i>
                <span>BUILD</span><i>✦</i><span>CODE</span><i>✦</i><span>LAUNCH</span><i>✦</i><span>KEEP FORGING</span><i>✦</i>
            </div></div> */}
           <div className="forge-terminal__pipeline">
    <div className="forge-terminal__pipeline-head">
        <span>DEVFORGE PROCESS</span>
        <span>● SYSTEM ACTIVE</span>
    </div>

    <div className="forge-terminal__pipeline-track">
        <div className="forge-terminal__pipeline-line">
            <span />
        </div>

        <div className="forge-terminal__pipeline-step is-active">
            <b>01</b>
            <i />
            <strong>IDEA</strong>
            <small>STRATEGY</small>
        </div>

        <div className="forge-terminal__pipeline-step">
            <b>02</b>
            <i />
            <strong>DESIGN</strong>
            <small>EXPERIENCE</small>
        </div>

        <div className="forge-terminal__pipeline-step">
            <b>03</b>
            <i />
            <strong>BUILD</strong>
            <small>ENGINEERING</small>
        </div>

        <div className="forge-terminal__pipeline-step">
            <b>04</b>
            <i />
            <strong>LAUNCH</strong>
            <small>DEPLOYMENT</small>
        </div>
    </div>

    <div className="forge-terminal__pipeline-footer">
        <span>FROM CONCEPT</span>
        <span>BUILT WITH PURPOSE</span>
        <span>TO PRODUCTION</span>
    </div>
</div>
            <div className="forge-terminal__lower">
                <div className="forge-terminal__social-links">
    <a
        href="https://github.com/DevForgeBuilds"
        target="_blank"
        rel="noreferrer"
        aria-label="DevForge GitHub"
    >
        <FaGithub />
        <span>GITHUB</span>
        <b>↗</b>
    </a>

    <a
        href="https://www.instagram.com/devforge.builds/"
        target="_blank"
        rel="noreferrer"
        aria-label="DevForge Instagram"
    >
        <FaInstagram />
        <span>INSTAGRAM</span>
        <b>↗</b>
    </a>
</div>
                <a href="mailto:devforge.builds@gmail.com" className="forge-terminal__email"><span className="forge-terminal__label">DIRECT INQUIRIES</span><strong>devforge.builds@gmail.com</strong><span className="forge-terminal__email-arrow">↗</span></a>
            </div>
            <div className="forge-terminal__bottom"><span>© 2026 DEVFORGE</span><span>DESIGNED &amp; ENGINEERED IN INDIA</span><span>FORGE_PROTOCOL / ACTIVE</span></div>
        </footer>
    );
};
export default Footer;
