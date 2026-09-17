import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initWebDevShowcaseAnimation = (
    root: HTMLElement
) => {
    const code = root.querySelector(
        '.webdev-code'
    ) as HTMLElement | null;

    const codeLines = root.querySelectorAll(
        '.webdev-code__body > div'
    );

    const connection = root.querySelector(
        '.webdev-showcase__connection'
    ) as HTMLElement | null;

    const browser = root.querySelector(
        '.webdev-browser'
    ) as HTMLElement | null;

    const browserContent = root.querySelector(
        '.webdev-browser__content'
    ) as HTMLElement | null;

    const browserOrb = root.querySelector(
        '.webdev-browser__orb'
    ) as HTMLElement | null;

    const browserStatus = root.querySelector(
        '.webdev-browser__status'
    ) as HTMLElement | null;

    const statement = root.querySelector(
        '.webdev-showcase__statement'
    ) as HTMLElement | null;

    const browserGrid = root.querySelector(
        '.webdev-browser__grid'
    ) as HTMLElement | null;


    if (
        !code ||
        !connection ||
        !browser ||
        !browserContent ||
        !browserOrb ||
        !browserStatus ||
        !statement
    ) {
        return () => {};
    }


    /* ========================================================
       CONTEXT
    ======================================================== */

    const context = gsap.context(() => {

        /* ====================================================
           INITIAL STATE
        ==================================================== */

        gsap.set(code, {
            x: -140,
            opacity: 0,
            rotateY: -12,
        });


        gsap.set(codeLines, {
            x: -35,
            opacity: 0,
        });


        gsap.set(connection, {
            opacity: 0,
            scale: 0.5,
        });


        gsap.set(browser, {
            x: 180,
            opacity: 0,
            scale: 0.82,
            rotateY: 18,
            transformPerspective: 1200,
        });


        gsap.set(browserContent, {
            y: 70,
            opacity: 0,
        });


        gsap.set(browserOrb, {
            scale: 0.35,
            opacity: 0,
            rotation: -45,
        });


        gsap.set(browserStatus, {
            y: 20,
            opacity: 0,
        });


        gsap.set(statement, {
            y: 80,
            opacity: 0,
        });


        if (browserGrid) {
            gsap.set(browserGrid, {
                opacity: 0,
                scale: 1.15,
            });
        }


        /* ====================================================
           MASTER TIMELINE
        ==================================================== */

        const timeline = gsap.timeline({
            defaults: {
                ease: 'power3.out',
            },

            scrollTrigger: {
                trigger: root,

                start: 'top top',

                end: '+=2200',

                pin: true,

                scrub: 1.15,

                anticipatePin: 1,

                invalidateOnRefresh: true,

                pinSpacing: true,
            },
        });


        /* ====================================================
           PHASE 01
           CODE ENTERS
        ==================================================== */

        timeline.to(code, {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power4.out',
        });


        /* ====================================================
           PHASE 02
           CODE LINES BUILD
        ==================================================== */

        timeline.to(
            codeLines,
            {
                x: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.13,
                ease: 'power3.out',
            },
            '-=0.45'
        );


        /* ====================================================
           PHASE 03
           COMPILE
        ==================================================== */

        timeline.to(
            connection,
            {
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: 'back.out(1.8)',
            },
            '-=0.15'
        );


        /* ====================================================
           PHASE 04
           CODE MOVES AWAY
        ==================================================== */

        timeline.to(
            code,
            {
                x: -170,
                opacity: 0.25,
                scale: 0.88,
                duration: 0.9,
                ease: 'power3.inOut',
            }
        );


        /* ====================================================
           PHASE 05
           CONNECTION EXPANDS
        ==================================================== */

        timeline.to(
            connection,
            {
                scale: 1.2,
                duration: 0.45,
                ease: 'power2.inOut',
            },
            '-=0.55'
        );


        /* ====================================================
           PHASE 06
           BROWSER ENTERS
        ==================================================== */

        timeline.to(
            browser,
            {
                x: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1.15,
                ease: 'power4.out',
            },
            '-=0.25'
        );


        /* ====================================================
           PHASE 07
           BROWSER GRID
        ==================================================== */

        if (browserGrid) {

            timeline.to(
                browserGrid,
                {
                    opacity: 0.4,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power2.out',
                },
                '-=0.65'
            );

        }


        /* ====================================================
           PHASE 08
           BROWSER CONTENT
        ==================================================== */

        timeline.to(
            browserContent,
            {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: 'power4.out',
            },
            '-=0.45'
        );


        /* ====================================================
           PHASE 09
           DF ORBIT
        ==================================================== */

        timeline.to(
            browserOrb,
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.9,
                ease: 'back.out(1.5)',
            },
            '-=0.55'
        );


        /* ====================================================
           PHASE 10
           LIVE STATUS
        ==================================================== */

        timeline.to(
            browserStatus,
            {
                y: 0,
                opacity: 1,
                duration: 0.55,
                ease: 'power3.out',
            },
            '-=0.35'
        );


        /* ====================================================
           PHASE 11
           HERO SETTLES
        ==================================================== */

        timeline.to(
            browser,
            {
                scale: 1.035,
                duration: 0.65,
                ease: 'power2.inOut',
            }
        );


        timeline.to(
            browser,
            {
                scale: 1,
                duration: 0.65,
                ease: 'power2.inOut',
            }
        );


        /* ====================================================
           PHASE 12
           FINAL STATEMENT
        ==================================================== */

        timeline.to(
            statement,
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power4.out',
            },
            '-=0.25'
        );


        /* ====================================================
           SUBTLE BROWSER FLOAT
        ==================================================== */

        gsap.to(browser, {
            y: -8,

            duration: 2.4,

            ease: 'sine.inOut',

            repeat: -1,

            yoyo: true,
        });


        /* ====================================================
           ORB CONTINUOUS ROTATION
        ==================================================== */

        gsap.to(browserOrb, {
            rotation: 360,

            duration: 16,

            ease: 'none',

            repeat: -1,
        });

    }, root);


    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {
        context.revert();
    };
};