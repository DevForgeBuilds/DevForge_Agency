import {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    useLocation,
    useNavigate,
} from 'react-router-dom';

import './Navbar.css';

import {
    initNavbarAnimation,
} from '../../animations/navbarAnimation';

import devforgeMiniLogo from '../../assets/devforge-mini-logo.png';

/* ============================================================
   NAVIGATION
============================================================ */

const navItems = [
    {
        number: '01',
        label: 'STUDIO',
        target: 'studio',
    },
    {
        number: '02',
        label: 'SERVICES',
        target: 'services',
    },
    {
        number: '03',
        label: 'WORK',
        target: 'selected-work',
    },
    {
        number: '04',
        label: 'RAW / FORGED',
        target: 'raw-forged',
    },
    {
        number: '05',
        label: 'THE FORGE',
        target: 'the-forge',
    },
    {
        number: '06',
        label: 'CONTACT',
        target: 'contact',
    },
];


/* ============================================================
   NAVBAR
============================================================ */

const Navbar = () => {

    const navigate =
        useNavigate();

    const location =
        useLocation();


    /* ========================================================
       REFS
    ======================================================== */

    const navbarRef =
        useRef<HTMLElement | null>(null);

    const mobileTriggerRef =
        useRef<HTMLButtonElement | null>(null);

    const mobileNavigationRef =
        useRef<HTMLDivElement | null>(null);


    /* ========================================================
       STATE
    ======================================================== */

    const [
        activeSection,
        setActiveSection,
    ] = useState('hero');

    const [
        menuOpen,
        setMenuOpen,
    ] = useState(false);


    /* ========================================================
       PAGE
    ======================================================== */

    const isHomePage =
        location.pathname === '/';


    /* ========================================================
       NAVBAR ADAPTIVE COLOR ENGINE
       
       IMPORTANT:
       This remains connected to navbarAnimation.ts.
       Do not replace with static colors.
    ======================================================== */

    useEffect(() => {

        const navbar =
            navbarRef.current;

        if (!navbar) {
            return;
        }


        return initNavbarAnimation(
            navbar,
            setActiveSection
        );

    }, [
        location.pathname,
    ]);


    /* ========================================================
       CLOSE MENU WHEN ROUTE CHANGES
    ======================================================== */

    useEffect(() => {

        setMenuOpen(false);

    }, [
        location.pathname,
    ]);


    /* ========================================================
       HASH → ACTIVE SECTION
    ======================================================== */

    useEffect(() => {

        if (!isHomePage) {

            setActiveSection(
                'hero'
            );

            return;

        }


        const hash =
            location.hash
                .replace(
                    '#',
                    ''
                )
                .trim();


        if (!hash) {

            setActiveSection(
                'hero'
            );

            return;

        }


        const exists =
            navItems.some(
                item =>
                    item.target ===
                    hash
            );


        if (exists) {

            setActiveSection(
                hash
            );

        }

    }, [
        isHomePage,
        location.hash,
    ]);


    /* ========================================================
       MOBILE INERT
       
       When closed:
       - menu becomes inert
       - keyboard cannot focus hidden links
       - avoids aria-hidden/focus issue
    ======================================================== */

    useEffect(() => {

        const mobileNavigation =
            mobileNavigationRef.current;

        if (!mobileNavigation) {
            return;
        }


        mobileNavigation.inert =
            !menuOpen;

    }, [
        menuOpen,
    ]);


    /* ========================================================
       BODY SCROLL LOCK
    ======================================================== */

    useEffect(() => {

        document.body.classList.toggle(
            'nav-menu-open',
            menuOpen
        );


        return () => {

            document.body.classList.remove(
                'nav-menu-open'
            );

        };

    }, [
        menuOpen,
    ]);


    /* ========================================================
       ESCAPE
    ======================================================== */

    useEffect(() => {

        if (!menuOpen) {
            return;
        }


        const handleKeyDown =
            (
                event: KeyboardEvent
            ) => {

                if (
                    event.key !==
                    'Escape'
                ) {
                    return;
                }


                setMenuOpen(
                    false
                );


                requestAnimationFrame(
                    () => {

                        mobileTriggerRef
                            .current
                            ?.focus();

                    }
                );

            };


        window.addEventListener(
            'keydown',
            handleKeyDown
        );


        return () => {

            window.removeEventListener(
                'keydown',
                handleKeyDown
            );

        };

    }, [
        menuOpen,
    ]);


    /* ========================================================
       SCROLL TO SECTION
    ======================================================== */

    const scrollToSection =
        (
            target: string
        ) => {

            const section =
                document.getElementById(
                    target
                );


            if (!section) {

                return false;

            }


            const navbarHeight =
                navbarRef.current
                    ?.getBoundingClientRect()
                    .height ??
                78;


            const rect =
                section.getBoundingClientRect();


            const absoluteTop =
                window.scrollY +
                rect.top -
                navbarHeight -
                18;


            window.scrollTo({

                top:
                    Math.max(
                        0,
                        absoluteTop
                    ),

                behavior:
                    'smooth',

            });


            return true;

        };


    /* ========================================================
       NAVIGATION
    ======================================================== */

    const navigateTo =
        (
            target: string
        ) => {

            /*
             * Always close mobile menu first.
             */

            setMenuOpen(
                false
            );


            /* =================================================
               HOME
            ================================================= */

            if (
                isHomePage
            ) {

                const didScroll =
                    scrollToSection(
                        target
                    );


                /*
                 * Keep URL hash synchronized.
                 */

                window.history.replaceState(
                    null,
                    '',
                    `/#${target}`
                );


                if (
                    didScroll
                ) {

                    setActiveSection(
                        target
                    );

                }


                return;

            }


            /* =================================================
               OTHER PAGE → HOME SECTION
            ================================================= */

            navigate(
                `/#${target}`
            );

        };


    /* ========================================================
       HOME
    ======================================================== */

    const goHome =
        () => {

            setMenuOpen(
                false
            );


            if (
                isHomePage
            ) {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        'smooth',

                });


                window.history.replaceState(
                    null,
                    '',
                    '/'
                );


                setActiveSection(
                    'hero'
                );


                return;

            }


            navigate(
                '/'
            );

        };


    /* ========================================================
       HASH SCROLL AFTER ROUTE
    ======================================================== */

    useEffect(() => {

        if (!isHomePage) {
            return;
        }


        const hash =
            location.hash
                .replace(
                    '#',
                    ''
                )
                .trim();


        if (!hash) {
            return;
        }


        let attempts =
            0;

        let frame =
            0;


        const tryScroll =
            () => {

                attempts += 1;


                const didScroll =
                    scrollToSection(
                        hash
                    );


                if (
                    didScroll
                ) {

                    setActiveSection(
                        hash
                    );

                    return;

                }


                if (
                    attempts <
                    30
                ) {

                    frame =
                        requestAnimationFrame(
                            tryScroll
                        );

                }

            };


        frame =
            requestAnimationFrame(
                tryScroll
            );


        return () => {

            cancelAnimationFrame(
                frame
            );

        };

    }, [
        isHomePage,
        location.hash,
    ]);


    /* ========================================================
       ACTIVE NUMBER
    ======================================================== */

    const activeIndex =
        navItems.findIndex(
            item =>
                item.target ===
                activeSection
        );


    const activeNumber =
        activeIndex >= 0
            ? activeIndex + 1
            : 1;


    /* ========================================================
       RENDER
    ======================================================== */

    return (
        <>
            {/* ==================================================
                DESKTOP / TABLET NAVBAR
            ================================================== */}

            <header
                ref={
                    navbarRef
                }
                className={`
                    df-adaptive-nav
                    ${menuOpen
                        ? 'menu-open'
                        : ''
                    }
                `}
            >

                <div className="df-nav-inner">

                    {/* ==================================================
                        LOGO
                    ================================================== */}

                    {/* <button
                        type="button"
                        className="df-nav-logo"
                        onClick={
                            goHome
                        }
                        aria-label="DevForge Home"
                    >

                        <span className="df-logo-d">
                            D
                        </span>

                        <span className="df-logo-f">
                            F
                        </span>

                        <span className="df-logo-slash">
                            /
                        </span>

                    </button> */}
                    <button
                        type="button"
                        className="df-nav-logo"
                        onClick={goHome}
                        aria-label="DevForge Home"
                    >
                        <img
                            src={devforgeMiniLogo}
                            alt="DevForge"
                            className="df-mini-logo"
                        />
                    </button>

                    {/* ==================================================
                        DESKTOP NAVIGATION
                    ================================================== */}

                    <nav
                        className="df-nav-links"
                        aria-label="Main Navigation"
                    >

                        {navItems.map(
                            item => {

                                const isActive =
                                    isHomePage &&
                                    activeSection ===
                                    item.target;


                                return (
                                    <button
                                        key={
                                            item.target
                                        }
                                        type="button"
                                        className={`
                                            df-nav-link
                                            ${isActive
                                                ? 'active'
                                                : ''
                                            }
                                        `}
                                        onClick={() =>
                                            navigateTo(
                                                item.target
                                            )
                                        }
                                    >

                                        <span className="df-nav-number">
                                            {
                                                item.number
                                            }
                                        </span>

                                        <span className="df-nav-label">
                                            {
                                                item.label
                                            }
                                        </span>

                                        <span
                                            className="df-nav-marker"
                                            aria-hidden="true"
                                        />

                                    </button>
                                );

                            }
                        )}

                    </nav>


                    {/* ==================================================
                        RIGHT SIDE
                    ================================================== */}

                    <div className="df-nav-right">

                        <span
                            className="df-nav-section-count"
                            aria-label={
                                `Section ${activeNumber} of 6`
                            }
                        >

                            {
                                String(
                                    activeNumber
                                ).padStart(
                                    2,
                                    '0'
                                )
                            }

                            <em aria-hidden="true">
                                /
                            </em>

                            06

                        </span>


                        <button
                            type="button"
                            className="df-nav-cta"
                            onClick={() =>
                                navigateTo(
                                    'contact'
                                )
                            }
                        >

                            <span>
                                START A PROJECT
                            </span>

                            <strong
                                aria-hidden="true"
                            >
                                ↗
                            </strong>

                        </button>

                    </div>


                    {/* ==================================================
                        MOBILE TRIGGER
                    ================================================== */}

                    <button
                        ref={
                            mobileTriggerRef
                        }
                        type="button"
                        className={`
                            df-nav-mobile-trigger
                            ${menuOpen
                                ? 'active'
                                : ''
                            }
                        `}
                        onClick={() =>
                            setMenuOpen(
                                value =>
                                    !value
                            )
                        }
                        aria-label={
                            menuOpen
                                ? 'Close Menu'
                                : 'Open Menu'
                        }
                        aria-expanded={
                            menuOpen
                        }
                        aria-controls="df-mobile-navigation"
                    >

                        <span>
                            {
                                menuOpen
                                    ? 'CLOSE'
                                    : 'MENU'
                            }
                        </span>

                        <i
                            aria-hidden="true"
                        />

                        <i
                            aria-hidden="true"
                        />

                    </button>

                </div>


                {/* ==================================================
                    ACCENT LINE
                ================================================== */}

                <div
                    className="df-nav-accent"
                    aria-hidden="true"
                >

                    <span />

                </div>

            </header>


            {/* ==================================================
                MOBILE NAVIGATION
            ================================================== */}

            <div
                ref={
                    mobileNavigationRef
                }
                id="df-mobile-navigation"
                className={`
                    df-adaptive-mobile
                    ${menuOpen
                        ? 'open'
                        : ''
                    }
                `}
                aria-label="Mobile Navigation"
            >

                {/* ==================================================
                    MOBILE HEADER
                ================================================== */}

                <div className="df-mobile-header">

                    <span>
                        DEVFORGE
                    </span>

                    <span>
                        NAV / 2026
                    </span>

                </div>


                {/* ==================================================
                    MOBILE MAIN
                ================================================== */}

                <main
                    className="df-mobile-main"
                >

                    <div
                        className="df-mobile-intro"
                    >

                        <span>
                            NAVIGATION
                        </span>

                        <span>

                            {
                                String(
                                    activeNumber
                                ).padStart(
                                    2,
                                    '0'
                                )
                            }

                            /06

                        </span>

                    </div>


                    <nav
                        aria-label="Mobile Navigation"
                    >

                        {navItems.map(
                            item => {

                                const isActive =
                                    isHomePage &&
                                    activeSection ===
                                    item.target;


                                return (
                                    <button
                                        key={
                                            item.target
                                        }
                                        type="button"
                                        className={
                                            isActive
                                                ? 'active'
                                                : ''
                                        }
                                        onClick={() =>
                                            navigateTo(
                                                item.target
                                            )
                                        }
                                    >

                                        <span className="mobile-number">
                                            {
                                                item.number
                                            }
                                        </span>

                                        <strong>
                                            {
                                                item.label
                                            }
                                        </strong>

                                        <b
                                            aria-hidden="true"
                                        >
                                            ↗
                                        </b>

                                    </button>
                                );

                            }
                        )}

                    </nav>

                </main>


                {/* ==================================================
                    MOBILE FOOTER
                ================================================== */}

                <div className="df-mobile-footer">

                    <span>
                        BUILD
                    </span>

                    <span>
                        CODE
                    </span>

                    <span>
                        LAUNCH
                    </span>

                    <span>
                        DEVFORGE / 2026
                    </span>

                </div>

            </div>
        </>
    );
};


export default Navbar;