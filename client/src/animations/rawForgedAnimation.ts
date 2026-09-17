// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);


// /* ============================================================
//    RAW / FORGED ANIMATION
// ============================================================ */

// export const initRawForgedAnimation = (
//     section: HTMLElement
// ) => {

//     const ctx = gsap.context(() => {

//         /* =====================================================
//            SCREENS
//         ===================================================== */

//         const screens =
//             Array.from(
//                 section.querySelectorAll<HTMLElement>(
//                     '.raw-screen'
//                 )
//             );

//         if (screens.length < 6) {
//             return;
//         }


//         const idea =
//             screens[0];

//         const processScreens =
//             screens.slice(1, 5);

//         const forged =
//             screens[5];


//         /* =====================================================
//            IDEA
//         ===================================================== */

//         const ideaLabel =
//             idea.querySelector<HTMLElement>(
//                 '.raw-screen__label'
//             );

//         const ideaSmall =
//             idea.querySelector<HTMLElement>(
//                 '.raw-screen__small'
//             );

//         const ideaHeading =
//             idea.querySelector<HTMLElement>(
//                 'h2'
//             );

//         const ideaHeadingParts =
//             ideaHeading
//                 ? Array.from(
//                     ideaHeading.children
//                 ) as HTMLElement[]
//                 : [];


//         /* =====================================================
//            PROCESS
//         ===================================================== */

//         const processTop =
//             processScreens.map(
//                 screen =>
//                     screen.querySelector<HTMLElement>(
//                         '.raw-process__top'
//                     )
//             );

//         const processWords =
//             processScreens.map(
//                 screen =>
//                     screen.querySelector<HTMLElement>(
//                         '.raw-process__word'
//                     )
//             );

//         const processLines =
//             processScreens.map(
//                 screen =>
//                     screen.querySelector<HTMLElement>(
//                         '.raw-process__line span'
//                     )
//             );

//         const processDescriptions =
//             processScreens.map(
//                 screen =>
//                     screen.querySelector<HTMLElement>(
//                         '.raw-process__description'
//                     )
//             );


//         /* =====================================================
//            FORGED
//         ===================================================== */

//         const forgedLabel =
//             forged.querySelector<HTMLElement>(
//                 '.forged__label'
//             );

//         const forgedEyebrow =
//             forged.querySelector<HTMLElement>(
//                 '.forged__eyebrow'
//             );

//         const forgedArrow =
//             forged.querySelector<HTMLElement>(
//                 '.forged__arrow'
//             );

//         const forgedHeading =
//             forged.querySelector<HTMLElement>(
//                 'h2'
//             );

//         const forgedDescription =
//             forged.querySelector<HTMLElement>(
//                 'p'
//             );


//         /* =====================================================
//            HELPERS
//         ===================================================== */

//         const setScreen =
//             (
//                 screen: HTMLElement,
//                 visible: boolean
//             ) => {

//                 gsap.set(
//                     screen,
//                     {
//                         autoAlpha:
//                             visible
//                                 ? 1
//                                 : 0,
//                     }
//                 );

//             };


//         const allAnimatedElements = [
//             ideaLabel,
//             ideaSmall,
//             ...ideaHeadingParts,
//             ...processTop,
//             ...processWords,
//             ...processLines,
//             ...processDescriptions,
//             forgedLabel,
//             forgedEyebrow,
//             forgedArrow,
//             forgedHeading,
//             forgedDescription,
//         ].filter(
//             (
//                 element
//             ): element is HTMLElement =>
//                 Boolean(element)
//         );


//         /* =====================================================
//            INITIAL SCREEN STATE
           
//            IMPORTANT:
//            Every screen starts from a deterministic state.
//            This is what makes the animation repeatable.
//         ===================================================== */

//         screens.forEach(
//             (
//                 screen,
//                 index
//             ) => {

//                 setScreen(
//                     screen,
//                     index === 0
//                 );

//             }
//         );


//         /* =====================================================
//            INITIAL ELEMENT STATE
//         ===================================================== */

//         if (ideaLabel) {

//             gsap.set(
//                 ideaLabel,
//                 {
//                     opacity: 0,
//                     x: -20,
//                 }
//             );

//         }


//         if (ideaSmall) {

//             gsap.set(
//                 ideaSmall,
//                 {
//                     opacity: 0,
//                     y: 20,
//                 }
//             );

//         }


//         gsap.set(
//             ideaHeadingParts,
//             {
//                 opacity: 0,
//                 y: 100,
//             }
//         );


//         processTop.forEach(
//             element => {

//                 if (!element) return;

//                 gsap.set(
//                     element,
//                     {
//                         opacity: 0,
//                         y: 20,
//                     }
//                 );

//             }
//         );


//         processWords.forEach(
//             element => {

//                 if (!element) return;

//                 gsap.set(
//                     element,
//                     {
//                         opacity: 0,
//                         scale: 0.85,
//                         y: 80,
//                     }
//                 );

//             }
//         );


//         processLines.forEach(
//             element => {

//                 if (!element) return;

//                 gsap.set(
//                     element,
//                     {
//                         scaleX: 0,
//                         transformOrigin:
//                             'left center',
//                     }
//                 );

//             }
//         );


//         processDescriptions.forEach(
//             element => {

//                 if (!element) return;

//                 gsap.set(
//                     element,
//                     {
//                         opacity: 0,
//                         y: 20,
//                     }
//                 );

//             }
//         );


//         if (forgedLabel) {

//             gsap.set(
//                 forgedLabel,
//                 {
//                     opacity: 0,
//                     x: -20,
//                 }
//             );

//         }


//         if (forgedEyebrow) {

//             gsap.set(
//                 forgedEyebrow,
//                 {
//                     opacity: 0,
//                     y: 20,
//                 }
//             );

//         }


//         if (forgedArrow) {

//             gsap.set(
//                 forgedArrow,
//                 {
//                     opacity: 0,
//                     scale: 0,
//                 }
//             );

//         }


//         if (forgedHeading) {

//             gsap.set(
//                 forgedHeading,
//                 {
//                     opacity: 0,
//                     scale: 0.75,
//                     y: 100,
//                 }
//             );

//         }


//         if (forgedDescription) {

//             gsap.set(
//                 forgedDescription,
//                 {
//                     opacity: 0,
//                     y: 30,
//                 }
//             );

//         }


//         /* =====================================================
//            MASTER TIMELINE
           
//            scrub controls everything.
//            No independent ScrollTriggers are created inside.
//         ===================================================== */

//         const timeline =
//             gsap.timeline({

//                 paused: true,

//                 defaults: {
//                     overwrite: 'auto',
//                 },

//                 scrollTrigger: {

//                     trigger:
//                         section,

//                     start:
//                         'top top',

//                     end:
//                         '+=850%',

//                     pin:
//                         true,

//                     scrub:
//                         1,

//                     anticipatePin:
//                         1,

//                     invalidateOnRefresh:
//                         true,

//                     /*
//                      * IMPORTANT:
//                      * Do NOT use once:true.
//                      *
//                      * This animation must work again
//                      * when the user scrolls back through it.
//                      */

//                     toggleActions:
//                         'play none none reverse',
//                 },

//             });


//         /* =====================================================
//            01 — RAW IDEA
//         ===================================================== */

//         timeline.to(
//             ideaLabel ?? {},
//             {
//                 opacity: 1,
//                 x: 0,

//                 duration: 0.5,

//                 ease:
//                     'power3.out',
//             }
//         );


//         timeline.to(
//             ideaSmall ?? {},
//             {
//                 opacity: 1,
//                 y: 0,

//                 duration: 0.6,

//                 ease:
//                     'power3.out',
//             }
//         );


//         timeline.to(
//             ideaHeadingParts,
//             {
//                 opacity: 1,
//                 y: 0,

//                 duration: 1.2,

//                 stagger: 0.15,

//                 ease:
//                     'power4.out',
//             },
//             '-=0.2'
//         );


//         /* =====================================================
//            RAW IDEA HOLD
//         ===================================================== */

//         timeline.to(
//             {},
//             {
//                 duration: 1.6,
//             }
//         );


//         /* =====================================================
//            RAW IDEA EXIT
//         ===================================================== */

//         timeline.to(
//             ideaHeadingParts,
//             {
//                 opacity: 0,
//                 y: -70,

//                 duration: 0.7,

//                 stagger: 0.05,

//                 ease:
//                     'power3.in',
//             }
//         );


//         timeline.to(
//             ideaSmall ?? {},
//             {
//                 opacity: 0,
//                 y: -20,

//                 duration: 0.35,

//                 ease:
//                     'power3.in',
//             },
//             '<'
//         );


//         timeline.to(
//             ideaLabel ?? {},
//             {
//                 opacity: 0,

//                 duration: 0.3,

//                 ease:
//                     'power3.in',
//             },
//             '<'
//         );


//         /* =====================================================
//            02–05 — PROCESS
//         ===================================================== */

//         processScreens.forEach(
//             (
//                 screen,
//                 index
//             ) => {

//                 const top =
//                     processTop[index];

//                 const word =
//                     processWords[index];

//                 const line =
//                     processLines[index];

//                 const description =
//                     processDescriptions[index];


//                 /* =================================================
//                    SCREEN SWITCH
                   
//                    Timeline-controlled.
//                    When reversed, the same callback is not needed
//                    to restore the screen state.
//                 ================================================= */

//                 timeline.set(
//                     screens,
//                     {
//                         autoAlpha: 0,
//                     }
//                 );


//                 timeline.set(
//                     screen,
//                     {
//                         autoAlpha: 1,
//                     }
//                 );


//                 /* =================================================
//                    TOP
//                 ================================================= */

//                 timeline.to(
//                     top ?? {},
//                     {
//                         opacity: 1,
//                         y: 0,

//                         duration: 0.45,

//                         ease:
//                             'power3.out',
//                     }
//                 );


//                 /* =================================================
//                    WORD
//                 ================================================= */

//                 timeline.to(
//                     word ?? {},
//                     {
//                         opacity: 1,

//                         scale: 1,

//                         y: 0,

//                         duration: 1,

//                         ease:
//                             'power4.out',
//                     },
//                     '-=0.15'
//                 );


//                 /* =================================================
//                    LINE
//                 ================================================= */

//                 timeline.to(
//                     line ?? {},
//                     {
//                         scaleX: 1,

//                         duration: 0.7,

//                         ease:
//                             'power3.inOut',
//                     },
//                     '-=0.35'
//                 );


//                 /* =================================================
//                    DESCRIPTION
//                 ================================================= */

//                 timeline.to(
//                     description ?? {},
//                     {
//                         opacity: 1,

//                         y: 0,

//                         duration: 0.5,

//                         ease:
//                             'power3.out',
//                     },
//                     '-=0.2'
//                 );


//                 /* =================================================
//                    HOLD
//                 ================================================= */

//                 timeline.to(
//                     {},
//                     {
//                         duration: 1.25,
//                     }
//                 );


//                 /* =================================================
//                    EXIT
//                 ================================================= */

//                 timeline.to(
//                     [
//                         top,
//                         word,
//                         description,
//                     ].filter(
//                         Boolean
//                     ),
//                     {
//                         opacity: 0,

//                         y: -45,

//                         duration: 0.55,

//                         ease:
//                             'power3.in',
//                     }
//                 );


//                 /*
//                  * Reset the line as part of the same timeline.
//                  * This is important when reversing.
//                  */

//                 timeline.to(
//                     line ?? {},
//                     {
//                         scaleX: 0,

//                         duration: 0.3,

//                         ease:
//                             'power2.inOut',
//                     },
//                     '<'
//                 );

//             }
//         );


//         /* =====================================================
//            FINAL PROCESS → FORGED
//         ===================================================== */

//         timeline.set(
//             screens,
//             {
//                 autoAlpha: 0,
//             }
//         );


//         timeline.set(
//             forged,
//             {
//                 autoAlpha: 1,
//             }
//         );


//         /* =====================================================
//            FORGED BACKGROUND
//         ===================================================== */

//         timeline.to(
//             forged,
//             {
//                 backgroundColor:
//                     'var(--df-lime)',

//                 duration: 0.5,

//                 ease:
//                     'power2.inOut',
//             }
//         );


//         /* =====================================================
//            FORGED LABEL
//         ===================================================== */

//         timeline.to(
//             forgedLabel ?? {},
//             {
//                 opacity: 1,

//                 x: 0,

//                 duration: 0.5,

//                 ease:
//                     'power3.out',
//             }
//         );


//         /* =====================================================
//            FORGED EYEBROW
//         ===================================================== */

//         timeline.to(
//             forgedEyebrow ?? {},
//             {
//                 opacity: 1,

//                 y: 0,

//                 duration: 0.5,

//                 ease:
//                     'power3.out',
//             },
//             '-=0.15'
//         );


//         /* =====================================================
//            FORGED ARROW
//         ===================================================== */

//         timeline.to(
//             forgedArrow ?? {},
//             {
//                 opacity: 1,

//                 scale: 1,

//                 duration: 0.45,

//                 ease:
//                     'back.out(2)',
//             },
//             '-=0.2'
//         );


//         /* =====================================================
//            FORGED HEADING
//         ===================================================== */

//         timeline.to(
//             forgedHeading ?? {},
//             {
//                 opacity: 1,

//                 scale: 1,

//                 y: 0,

//                 duration: 1.3,

//                 ease:
//                     'power4.out',
//             },
//             '-=0.15'
//         );


//         /* =====================================================
//            FORGED DESCRIPTION
//         ===================================================== */

//         timeline.to(
//             forgedDescription ?? {},
//             {
//                 opacity: 1,

//                 y: 0,

//                 duration: 0.7,

//                 ease:
//                     'power3.out',
//             },
//             '-=0.3'
//         );


//         /* =====================================================
//            FINAL HOLD
//         ===================================================== */

//         timeline.to(
//             {},
//             {
//                 duration: 2,
//             }
//         );


//         /* =====================================================
//            REFRESH
//         ===================================================== */

//         requestAnimationFrame(
//             () => {

//                 ScrollTrigger.refresh();

//             }
//         );


//         /* =====================================================
//            FIRST-LOAD NORMALIZATION
           
//            Force the timeline to its exact beginning.
//            Prevents stale GSAP state after hot reload/remount.
//         ===================================================== */

//         timeline.progress(0);


//         /*
//          * Make sure only the first screen is visible after
//          * initialization.
//          */

//         screens.forEach(
//             (
//                 screen,
//                 index
//             ) => {

//                 gsap.set(
//                     screen,
//                     {
//                         autoAlpha:
//                             index === 0
//                                 ? 1
//                                 : 0,
//                     }
//                 );

//             }
//         );


//     }, section);


//     /* =========================================================
//        CLEANUP
//     ========================================================= */

//     return () => {

//         /*
//          * ctx.revert() removes the ScrollTrigger,
//          * timeline and all GSAP-created inline states.
//          */

//         ctx.revert();

//         /*
//          * Defensive cleanup in case this initializer is
//          * mounted/unmounted during a ScrollTrigger refresh.
//          */

//         ScrollTrigger.refresh();

//     };
// };
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   RAW / FORGED ANIMATION
============================================================ */

export const initRawForgedAnimation = (
    section: HTMLElement
) => {

    const ctx = gsap.context(() => {

        /* =====================================================
           SCREENS
        ===================================================== */

        const screens =
            Array.from(
                section.querySelectorAll<HTMLElement>(
                    '.raw-screen'
                )
            );

        if (screens.length < 6) {
            return;
        }


        const idea =
            screens[0];

        const processScreens =
            screens.slice(1, 5);

        const forged =
            screens[5];


        /* =====================================================
           IDEA
        ===================================================== */

        const ideaLabel =
            idea.querySelector<HTMLElement>(
                '.raw-screen__label'
            );

        const ideaSmall =
            idea.querySelector<HTMLElement>(
                '.raw-screen__small'
            );

        const ideaHeading =
            idea.querySelector<HTMLElement>(
                'h2'
            );

        const ideaHeadingParts =
            ideaHeading
                ? Array.from(
                    ideaHeading.children
                ) as HTMLElement[]
                : [];


        /* =====================================================
           PROCESS
        ===================================================== */

        const processTop =
            processScreens.map(
                screen =>
                    screen.querySelector<HTMLElement>(
                        '.raw-process__top'
                    )
            );

        const processWords =
            processScreens.map(
                screen =>
                    screen.querySelector<HTMLElement>(
                        '.raw-process__word'
                    )
            );

        const processLines =
            processScreens.map(
                screen =>
                    screen.querySelector<HTMLElement>(
                        '.raw-process__line span'
                    )
            );

        const processDescriptions =
            processScreens.map(
                screen =>
                    screen.querySelector<HTMLElement>(
                        '.raw-process__description'
                    )
            );


        /* =====================================================
           FORGED
        ===================================================== */

        const forgedLabel =
            forged.querySelector<HTMLElement>(
                '.forged__label'
            );

        const forgedEyebrow =
            forged.querySelector<HTMLElement>(
                '.forged__eyebrow'
            );

        const forgedArrow =
            forged.querySelector<HTMLElement>(
                '.forged__arrow'
            );

        const forgedHeading =
            forged.querySelector<HTMLElement>(
                'h2'
            );

        const forgedDescription =
            forged.querySelector<HTMLElement>(
                'p'
            );


        /* =====================================================
           HELPERS
        ===================================================== */

        const setScreen =
            (
                screen: HTMLElement,
                visible: boolean
            ) => {

                gsap.set(
                    screen,
                    {
                        autoAlpha:
                            visible
                                ? 1
                                : 0,
                    }
                );

            };


        /* =====================================================
           INITIAL SCREEN STATE
           
           IMPORTANT:
           Every screen starts from a deterministic state.
           This is what makes the animation repeatable.
        ===================================================== */

        screens.forEach(
            (
                screen,
                index
            ) => {

                setScreen(
                    screen,
                    index === 0
                );

            }
        );


        /* =====================================================
           INITIAL ELEMENT STATE
        ===================================================== */

        if (ideaLabel) {

            gsap.set(
                ideaLabel,
                {
                    opacity: 0,
                    x: -20,
                }
            );

        }


        if (ideaSmall) {

            gsap.set(
                ideaSmall,
                {
                    opacity: 0,
                    y: 20,
                }
            );

        }


        gsap.set(
            ideaHeadingParts,
            {
                opacity: 0,
                y: 100,
            }
        );


        processTop.forEach(
            element => {

                if (!element) return;

                gsap.set(
                    element,
                    {
                        opacity: 0,
                        y: 20,
                    }
                );

            }
        );


        processWords.forEach(
            element => {

                if (!element) return;

                gsap.set(
                    element,
                    {
                        opacity: 0,
                        scale: 0.85,
                        y: 80,
                    }
                );

            }
        );


        processLines.forEach(
            element => {

                if (!element) return;

                gsap.set(
                    element,
                    {
                        scaleX: 0,
                        transformOrigin:
                            'left center',
                    }
                );

            }
        );


        processDescriptions.forEach(
            element => {

                if (!element) return;

                gsap.set(
                    element,
                    {
                        opacity: 0,
                        y: 20,
                    }
                );

            }
        );


        if (forgedLabel) {

            gsap.set(
                forgedLabel,
                {
                    opacity: 0,
                    x: -20,
                }
            );

        }


        if (forgedEyebrow) {

            gsap.set(
                forgedEyebrow,
                {
                    opacity: 0,
                    y: 20,
                }
            );

        }


        if (forgedArrow) {

            gsap.set(
                forgedArrow,
                {
                    opacity: 0,
                    scale: 0,
                }
            );

        }


        if (forgedHeading) {

            gsap.set(
                forgedHeading,
                {
                    opacity: 0,
                    scale: 0.75,
                    y: 100,
                }
            );

        }


        if (forgedDescription) {

            gsap.set(
                forgedDescription,
                {
                    opacity: 0,
                    y: 30,
                }
            );

        }


        /* =====================================================
           MASTER TIMELINE
           
           scrub controls everything.
           No independent ScrollTriggers are created inside.
        ===================================================== */

        const timeline =
            gsap.timeline({

                paused: true,

                defaults: {
                    overwrite: 'auto',
                },

                scrollTrigger: {

                    trigger:
                        section,

                    start:
                        'top top',

                    end:
                        '+=650%',

                    pin:
                        true,

                    scrub:
                        0.65,

                    anticipatePin:
                        1,

                    invalidateOnRefresh:
                        true,

                    /*
                     * IMPORTANT:
                     * Do NOT use once:true.
                     *
                     * This animation must work again
                     * when the user scrolls back through it.
                     */

                    toggleActions:
                        'play none none reverse',
                },

            });


        /* =====================================================
           01 — RAW IDEA
        ===================================================== */

        timeline.to(
            ideaLabel ?? {},
            {
                opacity: 1,
                x: 0,

                duration: 0.5,

                ease:
                    'power3.out',
            }
        );


        timeline.to(
            ideaSmall ?? {},
            {
                opacity: 1,
                y: 0,

                duration: 0.6,

                ease:
                    'power3.out',
            }
        );


        timeline.to(
            ideaHeadingParts,
            {
                opacity: 1,
                y: 0,

                duration: 1.2,

                stagger: 0.15,

                ease:
                    'power4.out',
            },
            '-=0.2'
        );


        /* =====================================================
           RAW IDEA HOLD
        ===================================================== */

        timeline.to(
            {},
            {
                duration: 1,
            }
        );


        /* =====================================================
           RAW IDEA EXIT
        ===================================================== */

        timeline.to(
            ideaHeadingParts,
            {
                opacity: 0,
                y: -70,

                duration: 0.7,

                stagger: 0.05,

                ease:
                    'power3.in',
            }
        );


        timeline.to(
            ideaSmall ?? {},
            {
                opacity: 0,
                y: -20,

                duration: 0.35,

                ease:
                    'power3.in',
            },
            '<'
        );


        timeline.to(
            ideaLabel ?? {},
            {
                opacity: 0,

                duration: 0.3,

                ease:
                    'power3.in',
            },
            '<'
        );


        /* =====================================================
           02–05 — PROCESS
        ===================================================== */

        processScreens.forEach(
            (
                screen,
                index
            ) => {

                const top =
                    processTop[index];

                const word =
                    processWords[index];

                const line =
                    processLines[index];

                const description =
                    processDescriptions[index];


                /* =================================================
                   SCREEN SWITCH
                   
                   Timeline-controlled.
                   When reversed, the same callback is not needed
                   to restore the screen state.
                ================================================= */

                timeline.set(
                    screens,
                    {
                        autoAlpha: 0,
                    }
                );


                timeline.set(
                    screen,
                    {
                        autoAlpha: 1,
                    }
                );


                /* =================================================
                   TOP
                ================================================= */

                timeline.to(
                    top ?? {},
                    {
                        opacity: 1,
                        y: 0,

                        duration: 0.3,

                        ease:
                            'power3.out',
                    }
                );


                /* =================================================
                   WORD
                ================================================= */

                timeline.to(
                    word ?? {},
                    {
                        opacity: 1,

                        scale: 1,

                        y: 0,

                        duration: 0.7,

                        ease:
                            'power4.out',
                    },
                    '<'
                );


                /* =================================================
                   LINE
                ================================================= */

                timeline.to(
                    line ?? {},
                    {
                        scaleX: 1,

                        duration: 0.5,

                        ease:
                            'power3.inOut',
                    },
                    '-=0.35'
                );


                /* =================================================
                   DESCRIPTION
                ================================================= */

                timeline.to(
                    description ?? {},
                    {
                        opacity: 1,

                        y: 0,

                        duration: 0.38,

                        ease:
                            'power3.out',
                    },
                    '-=0.2'
                );


                /* =================================================
                   HOLD
                ================================================= */

                timeline.to(
                    {},
                    {
                        duration: 0.75,
                    }
                );


                /* =================================================
                   EXIT
                ================================================= */

                timeline.to(
                    [
                        top,
                        word,
                        description,
                    ].filter(
                        Boolean
                    ),
                    {
                        opacity: 0,

                        y: -45,

                        duration: 0.42,

                        ease:
                            'power3.in',
                    }
                );


                /*
                 * Reset the line as part of the same timeline.
                 * This is important when reversing.
                 */

                timeline.to(
                    line ?? {},
                    {
                        scaleX: 0,

                        duration: 0.3,

                        ease:
                            'power2.inOut',
                    },
                    '<'
                );

            }
        );


        /* =====================================================
           FINAL PROCESS → FORGED
        ===================================================== */

        timeline.set(
            screens,
            {
                autoAlpha: 0,
            }
        );


        timeline.set(
            forged,
            {
                autoAlpha: 1,
            }
        );


        /* =====================================================
           FORGED BACKGROUND
        ===================================================== */

        timeline.to(
            forged,
            {
                backgroundColor:
                    'var(--df-lime)',

                duration: 0.5,

                ease:
                    'power2.inOut',
            }
        );


        /* =====================================================
           FORGED LABEL
        ===================================================== */

        timeline.to(
            forgedLabel ?? {},
            {
                opacity: 1,

                x: 0,

                duration: 0.5,

                ease:
                    'power3.out',
            }
        );


        /* =====================================================
           FORGED EYEBROW
        ===================================================== */

        timeline.to(
            forgedEyebrow ?? {},
            {
                opacity: 1,

                y: 0,

                duration: 0.5,

                ease:
                    'power3.out',
            },
            '-=0.15'
        );


        /* =====================================================
           FORGED ARROW
        ===================================================== */

        timeline.to(
            forgedArrow ?? {},
            {
                opacity: 1,

                scale: 1,

                duration: 0.45,

                ease:
                    'back.out(2)',
            },
            '-=0.2'
        );


        /* =====================================================
           FORGED HEADING
        ===================================================== */

        timeline.to(
            forgedHeading ?? {},
            {
                opacity: 1,

                scale: 1,

                y: 0,

                duration: 1.3,

                ease:
                    'power4.out',
            },
            '-=0.15'
        );


        /* =====================================================
           FORGED DESCRIPTION
        ===================================================== */

        timeline.to(
            forgedDescription ?? {},
            {
                opacity: 1,

                y: 0,

                duration: 0.7,

                ease:
                    'power3.out',
            },
            '-=0.3'
        );


        /* =====================================================
           FINAL HOLD
        ===================================================== */

        timeline.to(
            {},
            {
                duration: 1.2,
            }
        );


        /* =====================================================
           REFRESH
        ===================================================== */

        requestAnimationFrame(
            () => {

                ScrollTrigger.refresh();

            }
        );


        /* =====================================================
           FIRST-LOAD NORMALIZATION
           
           Force the timeline to its exact beginning.
           Prevents stale GSAP state after hot reload/remount.
        ===================================================== */

        timeline.progress(0);


        /*
         * Make sure only the first screen is visible after
         * initialization.
         */

        screens.forEach(
            (
                screen,
                index
            ) => {

                gsap.set(
                    screen,
                    {
                        autoAlpha:
                            index === 0
                                ? 1
                                : 0,
                    }
                );

            }
        );


    }, section);


    /* =========================================================
       CLEANUP
    ========================================================= */

    return () => {

        /*
         * ctx.revert() removes the ScrollTrigger,
         * timeline and all GSAP-created inline states.
         */

        ctx.revert();

        /*
         * Defensive cleanup in case this initializer is
         * mounted/unmounted during a ScrollTrigger refresh.
         */

        ScrollTrigger.refresh();

    };
};
