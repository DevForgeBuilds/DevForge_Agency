import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   BELIEFS ANIMATION
   Reversible GSAP / ScrollTrigger Timeline
============================================================ */

export const initBeliefsAnimation = (
    section: HTMLElement
) => {

    const ctx =
        gsap.context(() => {

            /* =================================================
               SCREENS
            ================================================= */

            const screens =
                Array.from(
                    section.querySelectorAll<HTMLElement>(
                        '.belief-screen'
                    )
                );


            if (!screens.length) {
                return;
            }


            const intro =
                section.querySelector<HTMLElement>(
                    '.beliefs-screen--intro'
                );

            const split =
                section.querySelector<HTMLElement>(
                    '.beliefs-screen--split'
                );

            const merge =
                section.querySelector<HTMLElement>(
                    '.beliefs-screen--merge'
                );

            const experience =
                section.querySelector<HTMLElement>(
                    '.beliefs-screen--experience'
                );

            const principles =
                section.querySelector<HTMLElement>(
                    '.beliefs-screen--principles'
                );

            const finalScreen =
                section.querySelector<HTMLElement>(
                    '.beliefs-screen--final'
                );


            if (
                !intro ||
                !split ||
                !merge ||
                !experience ||
                !principles ||
                !finalScreen
            ) {
                return;
            }


            /* =================================================
               INTRO ELEMENTS
            ================================================= */

            const eyebrow =
                intro.querySelector<HTMLElement>(
                    '.belief-eyebrow'
                );

            const heading =
                intro.querySelector<HTMLElement>(
                    '.belief-main-heading'
                );

            const headingLines =
                heading
                    ? Array.from(
                        heading.querySelectorAll<HTMLElement>(
                            ':scope > span'
                        )
                    )
                    : [];


            /* =================================================
               SPLIT ELEMENTS
            ================================================= */

            const design =
                split.querySelector<HTMLElement>(
                    '.belief-half--design'
                );

            const code =
                split.querySelector<HTMLElement>(
                    '.belief-half--code'
                );

            const divider =
                split.querySelector<HTMLElement>(
                    '.belief-center-line'
                );


            /* =================================================
               MERGE ELEMENTS
            ================================================= */

            const mergeSmall =
                merge.querySelector<HTMLElement>(
                    '.belief-merge-small'
                );

            const mergeTitle =
                merge.querySelector<HTMLElement>(
                    'h3'
                );

            const formula =
                merge.querySelector<HTMLElement>(
                    '.belief-formula'
                );


            /* =================================================
               EXPERIENCE
            ================================================= */

            const experienceLabel =
                experience.querySelector<HTMLElement>(
                    '.belief-transition-label'
                );

            const experienceWord =
                experience.querySelector<HTMLElement>(
                    '.belief-experience-word'
                );

            const arrow =
                experience.querySelector<HTMLElement>(
                    '.belief-transition-arrow'
                );

            const productWord =
                experience.querySelector<HTMLElement>(
                    '.belief-product-word'
                );


            /* =================================================
               PRINCIPLES
            ================================================= */

            const principleHead =
                principles.querySelector<HTMLElement>(
                    '.belief-principles-head'
                );

            const principleItems =
                Array.from(
                    principles.querySelectorAll<HTMLElement>(
                        '.belief-principle'
                    )
                );


            /* =================================================
               FINAL
            ================================================= */

            const finalLabel =
                finalScreen.querySelector<HTMLElement>(
                    '.belief-final-label'
                );

            const finalText =
                finalScreen.querySelector<HTMLElement>(
                    '.belief-final-text'
                );

            const finalParts =
                finalText
                    ? Array.from(
                        finalText.children
                    ) as HTMLElement[]
                    : [];

            const finalMeta =
                finalScreen.querySelector<HTMLElement>(
                    '.belief-final-meta'
                );


            /* =================================================
               INITIAL SCREEN STATE
               
               IMPORTANT:
               Only intro is visible at timeline position 0.
            ================================================= */

            gsap.set(
                screens,
                {
                    autoAlpha: 0,
                }
            );


            gsap.set(
                intro,
                {
                    autoAlpha: 1,
                }
            );


            /* =================================================
               INITIAL ELEMENT STATES
            ================================================= */

            gsap.set(
                eyebrow || [],
                {
                    opacity: 0,
                    y: 25,
                }
            );


            gsap.set(
                headingLines,
                {
                    opacity: 0,
                    y: 90,
                }
            );


            gsap.set(
                design || [],
                {
                    x: -80,
                    opacity: 0,
                }
            );


            gsap.set(
                code || [],
                {
                    x: 80,
                    opacity: 0,
                }
            );


            gsap.set(
                divider || [],
                {
                    scaleY: 0,
                    transformOrigin:
                        'center center',
                }
            );


            gsap.set(
                mergeSmall || [],
                {
                    opacity: 0,
                    y: 25,
                }
            );


            gsap.set(
                mergeTitle || [],
                {
                    opacity: 0,
                    y: 70,
                    scale: 0.94,
                }
            );


            gsap.set(
                formula || [],
                {
                    opacity: 0,
                    y: 25,
                    scale: 0.8,
                }
            );


            gsap.set(
                experienceLabel || [],
                {
                    opacity: 0,
                    y: 20,
                }
            );


            gsap.set(
                experienceWord || [],
                {
                    opacity: 0,
                    y: 90,
                    scale: 0.9,
                }
            );


            gsap.set(
                arrow || [],
                {
                    opacity: 0,
                    scale: 0,
                }
            );


            gsap.set(
                productWord || [],
                {
                    opacity: 0,
                    y: 90,
                    scale: 0.9,
                }
            );


            gsap.set(
                principleHead || [],
                {
                    opacity: 0,
                    y: 25,
                }
            );


            gsap.set(
                principleItems,
                {
                    opacity: 0,
                    y: 35,
                }
            );


            gsap.set(
                finalLabel || [],
                {
                    opacity: 0,
                    y: 20,
                }
            );


            gsap.set(
                finalParts,
                {
                    opacity: 0,
                    y: 70,
                }
            );


            gsap.set(
                finalMeta || [],
                {
                    opacity: 0,
                    y: 20,
                }
            );


            /* =================================================
               MASTER TIMELINE
            ================================================= */

            const master =
                gsap.timeline({
                    defaults: {
                        overwrite: 'auto',
                    },

                    scrollTrigger: {

                        trigger:
                            section,

                        start:
                            'top top',

                        end:
                            '+=800%',

                        pin:
                            true,

                        scrub:
                            1,

                        anticipatePin:
                            1,

                        invalidateOnRefresh:
                            true,

                        /*
                         * Prevent unnecessary callbacks /
                         * stale states during fast scrolling.
                         */
                        fastScrollEnd:
                            false,

                        /*
                         * Recalculate correctly after
                         * resize / layout changes.
                         */
                        refreshPriority:
                            0,
                    },
                });


            /* =================================================
               SCREEN 01
               WHAT WE BELIEVE
            ================================================= */

            master.to(
                eyebrow || {},
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.6,

                    ease:
                        'power3.out',
                }
            );


            master.to(
                headingLines,
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        1.2,

                    stagger:
                        0.18,

                    ease:
                        'power4.out',
                },

                '-=0.3'
            );


            /* =================================================
               READ TIME
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        1.4,
                }
            );


            /* =================================================
               EXIT INTRO
            ================================================= */

            master.to(
                headingLines,
                {
                    opacity: 0,
                    y: -60,

                    duration:
                        0.65,

                    stagger:
                        0.05,

                    ease:
                        'power3.in',
                }
            );


            master.to(
                eyebrow || {},
                {
                    opacity: 0,
                    y: -20,

                    duration:
                        0.35,
                },

                '<'
            );


            /* =================================================
               SCREEN 01 → SCREEN 02
               
               NO CALL()
               NO MANUAL VISIBILITY STATE
               
               Fully reversible.
            ================================================= */

            master.to(
                intro,
                {
                    autoAlpha:
                        0,

                    duration:
                        0.001,

                }
            );


            master.to(
                split,
                {
                    autoAlpha:
                        1,

                    duration:
                        0.001,

                },
                '<'
            );


            /* =================================================
               SCREEN 02
               DESIGN / CODE
            ================================================= */

            master.to(
                design || {},
                {
                    opacity: 1,
                    x: 0,

                    duration:
                        1,

                    ease:
                        'power3.out',
                }
            );


            master.to(
                code || {},
                {
                    opacity: 1,
                    x: 0,

                    duration:
                        1,

                    ease:
                        'power3.out',
                },

                '<0.1'
            );


            master.to(
                divider || {},
                {
                    scaleY: 1,

                    duration:
                        0.9,

                    ease:
                        'power3.inOut',
                },

                '<0.25'
            );


            /* =================================================
               HOLD
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        1.5,
                }
            );


            /* =================================================
               DESIGN + CODE MOVE AWAY
            ================================================= */

            master.to(
                design || {},
                {
                    xPercent:
                        -10,

                    opacity:
                        0.35,

                    duration:
                        0.8,

                    ease:
                        'power3.inOut',
                }
            );


            master.to(
                code || {},
                {
                    xPercent:
                        10,

                    opacity:
                        0.35,

                    duration:
                        0.8,

                    ease:
                        'power3.inOut',
                },

                '<'
            );


            /* =================================================
               SCREEN 02 → SCREEN 03
            ================================================= */

            master.to(
                split,
                {
                    autoAlpha:
                        0,

                    duration:
                        0.001,
                }
            );


            master.to(
                merge,
                {
                    autoAlpha:
                        1,

                    duration:
                        0.001,
                },

                '<'
            );


            /* =================================================
               SCREEN 03
               NEED BOTH
            ================================================= */

            master.to(
                mergeSmall || {},
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.55,

                    ease:
                        'power3.out',
                }
            );


            master.to(
                mergeTitle || {},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,

                    duration:
                        1,

                    ease:
                        'power4.out',
                },

                '-=0.2'
            );


            master.to(
                formula || {},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,

                    duration:
                        0.7,

                    ease:
                        'back.out(1.6)',
                },

                '-=0.3'
            );


            /* =================================================
               HOLD
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        1.6,
                }
            );


            /* =================================================
               EXIT MERGE
            ================================================= */

            master.to(
                mergeTitle || {},
                {
                    opacity: 0,
                    y: -60,

                    duration:
                        0.65,

                    ease:
                        'power3.in',
                }
            );


            master.to(
                formula || {},
                {
                    opacity: 0,
                    y: -30,

                    duration:
                        0.45,
                },

                '<'
            );


            master.to(
                mergeSmall || {},
                {
                    opacity: 0,

                    duration:
                        0.35,
                },

                '<'
            );


            /* =================================================
               SCREEN 03 → SCREEN 04
            ================================================= */

            master.to(
                merge,
                {
                    autoAlpha:
                        0,

                    duration:
                        0.001,
                }
            );


            master.to(
                experience,
                {
                    autoAlpha:
                        1,

                    duration:
                        0.001,
                },

                '<'
            );


            /* =================================================
               SCREEN 04
               EXPERIENCE → PRODUCT
            ================================================= */

            master.to(
                experienceLabel || {},
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.5,

                    ease:
                        'power3.out',
                }
            );


            master.to(
                experienceWord || {},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,

                    duration:
                        1,

                    ease:
                        'power4.out',
                },

                '-=0.2'
            );


            master.to(
                arrow || {},
                {
                    opacity: 1,
                    scale: 1,

                    duration:
                        0.5,

                    ease:
                        'back.out(2)',
                },

                '-=0.35'
            );


            /* =================================================
               EXPERIENCE HOLD
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        1.2,
                }
            );


            /* =================================================
               EXPERIENCE OUT
            ================================================= */

            master.to(
                experienceWord || {},
                {
                    opacity: 0,
                    y: -70,
                    scale: 0.9,

                    duration:
                        0.8,

                    ease:
                        'power3.inOut',
                }
            );


            master.to(
                arrow || {},
                {
                    opacity: 0,
                    scale: 0.5,

                    duration:
                        0.4,
                },

                '<'
            );


            /* =================================================
               PRODUCT IN
            ================================================= */

            master.to(
                productWord || {},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,

                    duration:
                        1,

                    ease:
                        'power4.out',
                },

                '-=0.25'
            );


            /* =================================================
               PRODUCT HOLD
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        1.5,
                }
            );


            /* =================================================
               EXIT EXPERIENCE
            ================================================= */

            master.to(
                experienceLabel || {},
                {
                    opacity: 0,
                    y: -20,

                    duration:
                        0.35,
                }
            );


            master.to(
                productWord || {},
                {
                    opacity: 0,
                    y: -60,

                    duration:
                        0.65,

                    ease:
                        'power3.in',
                },

                '<'
            );


            /* =================================================
               SCREEN 04 → SCREEN 05
            ================================================= */

            master.to(
                experience,
                {
                    autoAlpha:
                        0,

                    duration:
                        0.001,
                }
            );


            master.to(
                principles,
                {
                    autoAlpha:
                        1,

                    duration:
                        0.001,
                },

                '<'
            );


            /* =================================================
               SCREEN 05
               PRINCIPLES
            ================================================= */

            master.to(
                principleHead || {},
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.6,

                    ease:
                        'power3.out',
                }
            );


            master.to(
                principleItems,
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.65,

                    stagger:
                        0.3,

                    ease:
                        'power3.out',
                },

                '-=0.15'
            );


            /* =================================================
               LONG HOLD
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        2.2,
                }
            );


            /* =================================================
               EXIT PRINCIPLES
            ================================================= */

            master.to(
                principleItems,
                {
                    opacity: 0,
                    y: -35,

                    duration:
                        0.55,

                    stagger:
                        0.06,

                    ease:
                        'power3.in',
                }
            );


            master.to(
                principleHead || {},
                {
                    opacity: 0,
                    y: -20,

                    duration:
                        0.35,
                },

                '<'
            );


            /* =================================================
               SCREEN 05 → SCREEN 06
            ================================================= */

            master.to(
                principles,
                {
                    autoAlpha:
                        0,

                    duration:
                        0.001,
                }
            );


            master.to(
                finalScreen,
                {
                    autoAlpha:
                        1,

                    duration:
                        0.001,
                },

                '<'
            );


            /* =================================================
               SCREEN 06
               FINAL
            ================================================= */

            master.to(
                finalLabel || {},
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.5,

                    ease:
                        'power3.out',
                }
            );


            master.to(
                finalParts,
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.9,

                    stagger:
                        0.18,

                    ease:
                        'power4.out',
                },

                '-=0.15'
            );


            master.to(
                finalMeta || {},
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.45,

                    ease:
                        'power3.out',
                },

                '-=0.3'
            );


            /* =================================================
               FINAL HOLD
            ================================================= */

            master.to(
                {},
                {
                    duration:
                        1.5,
                }
            );


            /* =================================================
               INITIAL REFRESH
            ================================================= */

            requestAnimationFrame(() => {

                ScrollTrigger.refresh();

            });


        }, section);


    /* ========================================================
       CLEANUP
       
       ctx.revert() automatically:
       - kills ScrollTrigger
       - kills timeline
       - restores GSAP-set properties
       - removes inline transforms
       - removes inline opacity
       ======================================================== */

    return () => {

        ctx.revert();

    };
};