import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(
    ScrollTrigger
);


/* ============================================================
   DEVFORGE — THE FORGE ANIMATION
   Repeat-safe / Reversible / ScrollTrigger
============================================================ */

export const initForgeAnimation = (
    section: HTMLElement
) => {

    const ctx =
        gsap.context(() => {

            /* =================================================
               ELEMENTS
            ================================================= */

            const header =
                section.querySelector<HTMLElement>(
                    '.forge-header'
                );

            const process =
                section.querySelector<HTMLElement>(
                    '.forge-process'
                );

            const stages =
                Array.from(
                    section.querySelectorAll<HTMLElement>(
                        '.forge-stage'
                    )
                );

            const nodes =
                Array.from(
                    section.querySelectorAll<HTMLElement>(
                        '.forge-stage__node'
                    )
                );

            const progress =
                section.querySelector<HTMLElement>(
                    '.forge-process__rail-progress'
                );

            const footer =
                section.querySelector<HTMLElement>(
                    '.forge-footer'
                );


            /* =================================================
               SAFETY
            ================================================= */

            if (
                !header ||
                !process ||
                !progress ||
                !footer ||
                stages.length === 0
            ) {
                return;
            }


            /* =================================================
               INITIAL STATE
               
               Everything starts from a known state.
               This is important for repeat/reverse behavior.
            ================================================= */

            gsap.set(
                header,
                {
                    autoAlpha: 0,
                    y: 50,
                }
            );


            gsap.set(
                stages,
                {
                    autoAlpha: 0,
                    y: 90,
                }
            );


            gsap.set(
                nodes,
                {
                    autoAlpha: 0,
                    scale: 0.25,
                }
            );


            gsap.set(
                footer,
                {
                    autoAlpha: 0,
                    y: 35,
                }
            );


            gsap.set(
                progress,
                {
                    scaleY: 0,

                    transformOrigin:
                        'top center',
                }
            );


            /* =================================================
               HEADER
               
               Removed `once: true`.
               It can now replay when the user leaves and
               re-enters the section.
            ================================================= */

            gsap.to(
                header,
                {
                    autoAlpha: 1,

                    y: 0,

                    duration:
                        1,

                    ease:
                        'power3.out',

                    scrollTrigger: {

                        trigger:
                            header,

                        start:
                            'top 82%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,
                    },
                }
            );


            /* =================================================
               PROGRESS RAIL
            ================================================= */

            gsap.to(
                progress,
                {
                    scaleY: 1,

                    ease:
                        'none',

                    scrollTrigger: {

                        trigger:
                            process,

                        start:
                            'top 70%',

                        end:
                            'bottom 70%',

                        scrub:
                            0.7,

                        invalidateOnRefresh:
                            true,
                    },
                }
            );


            /* =================================================
               STAGES
               
               Each stage has its own reversible timeline.
               
               No:
               - onEnter
               - onEnterBack
               - onLeaveBack
               - manual killTweensOf
               
               The ScrollTrigger controls the timeline.
            ================================================= */

            stages.forEach(
                (
                    stage,
                    index
                ) => {

                    const node =
                        nodes[index];


                    if (!node) {
                        return;
                    }


                    const content =
                        stage.querySelector<HTMLElement>(
                            '.forge-stage__content'
                        );


                    const visual =
                        stage.querySelector<HTMLElement>(
                            '.forge-stage__visual'
                        );


                    /* -----------------------------------------
                       Initial child state
                    ----------------------------------------- */

                    gsap.set(
                        content || [],
                        {
                            autoAlpha: 0,
                            x: -35,
                        }
                    );


                    gsap.set(
                        visual || [],
                        {
                            autoAlpha: 0,
                            scale: 0.72,
                            rotation: -8,
                        }
                    );


                    /* -----------------------------------------
                       Stage timeline
                    ----------------------------------------- */

                    const stageTimeline =
                        gsap.timeline({
                            paused:
                                true,

                            defaults: {
                                overwrite:
                                    'auto',
                            },

                            scrollTrigger: {

                                trigger:
                                    stage,

                                start:
                                    'top 50%',

                                end:
                                    'bottom 70%',

                                toggleActions:
                                    'play none none reverse',

                                invalidateOnRefresh:
                                    true,

                                /*
                                 * Prevents stale animation state
                                 * during fast direction changes.
                                 */
                                fastScrollEnd:
                                    false,
                            },
                        });


                    /* -----------------------------------------
                       NODE
                    ----------------------------------------- */

                    stageTimeline.to(
                        node,
                        {
                            autoAlpha: 1,

                            scale: 1,

                            duration:
                                0.5,

                            ease:
                                'back.out(2)',
                        }
                    );


                    /* -----------------------------------------
                       STAGE
                    ----------------------------------------- */

                    stageTimeline.to(
                        stage,
                        {
                            autoAlpha: 1,

                            y: 0,

                            duration:
                                0.7,

                            ease:
                                'power3.out',
                        },

                        '-=0.28'
                    );


                    /* -----------------------------------------
                       CONTENT
                    ----------------------------------------- */

                    if (content) {

                        stageTimeline.to(
                            content,
                            {
                                autoAlpha: 1,

                                x: 0,

                                duration:
                                    0.55,

                                ease:
                                    'power3.out',
                            },

                            '-=0.45'
                        );

                    }


                    /* -----------------------------------------
                       VISUAL
                    ----------------------------------------- */

                    if (visual) {

                        stageTimeline.to(
                            visual,
                            {
                                autoAlpha: 1,

                                scale: 1,

                                rotation: 0,

                                duration:
                                    0.8,

                                ease:
                                    'power3.out',
                            },

                            '-=0.6'
                        );

                    }


                    /* =================================================
                       NODE PULSE
                       
                       Ambient animation.
                       It is paused until the stage becomes active.
                    ================================================= */

                    const dot =
                        node.querySelector<HTMLElement>(
                            'span'
                        );


                    if (dot) {

                        const pulse =
                            gsap.to(
                                dot,
                                {
                                    scale:
                                        1.45,

                                    duration:
                                        0.9,

                                    repeat:
                                        -1,

                                    yoyo:
                                        true,

                                    ease:
                                        'sine.inOut',

                                    paused:
                                        true,

                                    overwrite:
                                        false,
                                }
                            );


                        /*
                         * Start/stop pulse according to the same
                         * stage ScrollTrigger.
                         */

                        ScrollTrigger.create({

                            trigger:
                                stage,

                            start:
                                'center center',

                            end:
                                'center center',

                            onEnter: () => {

                                pulse.play();

                            },

                            onLeaveBack: () => {

                                pulse.pause();

                                gsap.set(
                                    dot,
                                    {
                                        scale:
                                            1,
                                    }
                                );

                            },

                            onLeave: () => {

                                pulse.pause();

                                gsap.set(
                                    dot,
                                    {
                                        scale:
                                            1,
                                    }
                                );

                            },

                            onEnterBack: () => {

                                pulse.play();

                            },

                            invalidateOnRefresh:
                                true,
                        });

                    }

                }
            );


            /* =================================================
               FOOTER
               
               Removed `once: true`.
               Footer can replay.
            ================================================= */

            gsap.to(
                footer,
                {
                    autoAlpha: 1,

                    y: 0,

                    duration:
                        0.8,

                    ease:
                        'power3.out',

                    scrollTrigger: {

                        trigger:
                            footer,

                        start:
                            'top 82%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,
                    },
                }
            );


            /* =================================================
               REFRESH
            ================================================= */

            requestAnimationFrame(
                () => {

                    ScrollTrigger.refresh();

                }
            );

        }, section);


    /* ========================================================
       CLEANUP
       
       ctx.revert() removes:
       - stage timelines
       - ScrollTriggers
       - header trigger
       - footer trigger
       - progress trigger
       - node pulse tweens
       - node pulse triggers
       - inline GSAP styles
    ======================================================== */

    return () => {

        ctx.revert();

    };
};