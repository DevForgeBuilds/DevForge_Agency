import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initWebDevShowcaseAnimation = (
    root: HTMLElement
) => {

    const code =
        root.querySelector(
            '.webdev-code'
        );

    const codeLines =
        root.querySelectorAll(
            '.webdev-code__body > div'
        );

    const connection =
        root.querySelector(
            '.webdev-showcase__connection'
        );

    const browser =
        root.querySelector(
            '.webdev-browser'
        );

    const browserContent =
        root.querySelector(
            '.webdev-browser__content'
        );

    const browserOrb =
        root.querySelector(
            '.webdev-browser__orb'
        );

    const browserStatus =
        root.querySelector(
            '.webdev-browser__status'
        );

    const statement =
        root.querySelector(
            '.webdev-showcase__statement'
        );


    if (
        !code ||
        !connection ||
        !browser
    ) {
        return () => {};
    }


    /* ========================================================
       INITIAL STATE
    ======================================================== */

    gsap.set(
        code,
        {
            x: -80,
            opacity: 0,
        }
    );


    gsap.set(
        codeLines,
        {
            opacity: 0,
            x: -20,
        }
    );


    gsap.set(
        connection,
        {
            opacity: 0,
            scale: .5,
        }
    );


    gsap.set(
        browser,
        {
            x: 100,
            opacity: 0,
            scale: .92,
            rotateY: 12,
        }
    );


    gsap.set(
        browserContent,
        {
            y: 35,
            opacity: 0,
        }
    );


    gsap.set(
        browserOrb,
        {
            scale: .4,
            opacity: 0,
        }
    );


    gsap.set(
        browserStatus,
        {
            opacity: 0,
            y: 15,
        }
    );


    gsap.set(
        statement,
        {
            y: 50,
            opacity: 0,
        }
    );


    /* ========================================================
       MASTER TIMELINE
    ======================================================== */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    root,

                start:
                    'top 72%',

                end:
                    'bottom 55%',

                scrub:
                    1,

            },

        });


    /* ========================================================
       01 — CODE ENTERS
    ======================================================== */

    timeline.to(
        code,
        {
            x: 0,
            opacity: 1,
            duration: .8,
            ease: 'power4.out',
        }
    );


    /* ========================================================
       02 — CODE BUILDS
    ======================================================== */

    timeline.to(
        codeLines,
        {
            x: 0,
            opacity: 1,
            duration: .45,
            stagger: .12,
            ease: 'power3.out',
        },
        '-=.35'
    );


    /* ========================================================
       03 — COMPILE CONNECTION
    ======================================================== */

    timeline.to(
        connection,
        {
            opacity: 1,
            scale: 1,
            duration: .5,
            ease: 'back.out(2)',
        },
        '-=.2'
    );


    /* ========================================================
       04 — BROWSER ENTERS
    ======================================================== */

    timeline.to(
        browser,
        {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power4.out',
        },
        '-=.3'
    );


    /* ========================================================
       05 — LIVE EXPERIENCE
    ======================================================== */

    timeline.to(
        browserContent,
        {
            y: 0,
            opacity: 1,
            duration: .7,
            ease: 'power3.out',
        },
        '-=.45'
    );


    timeline.to(
        browserOrb,
        {
            scale: 1,
            opacity: 1,
            duration: .7,
            ease: 'back.out(1.5)',
        },
        '-=.4'
    );


    /* ========================================================
       06 — LIVE STATUS
    ======================================================== */

    timeline.to(
        browserStatus,
        {
            opacity: 1,
            y: 0,
            duration: .45,
            ease: 'power3.out',
        },
        '-=.35'
    );


    /* ========================================================
       07 — FINAL STATEMENT
    ======================================================== */

    timeline.to(
        statement,
        {
            y: 0,
            opacity: 1,
            duration: .7,
            ease: 'power3.out',
        },
        '-=.2'
    );


    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {

        ScrollTrigger.getAll()
            .forEach((trigger) => {

                if (
                    trigger.trigger === root
                ) {
                    trigger.kill();
                }

            });
    };
};