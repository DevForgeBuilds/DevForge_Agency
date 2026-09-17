import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(
    ScrollTrigger
);


/* ============================================================
   DEVFORGE — FOOTER ANIMATION
   Repeat-safe / ScrollTrigger controlled
============================================================ */

export const initFooterAnimation = (
    footer: HTMLElement
) => {

    const ctx =
        gsap.context(() => {

            /* =================================================
               ELEMENTS
            ================================================= */

            const meta =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__meta'
                );

           const terminal =
    footer.querySelector<HTMLElement>(
        '.forge-terminal__window'
    ) ??
    footer.querySelector<HTMLElement>(
        '.forge-terminal__pipeline'
    );

            const brand =
    footer.querySelector<HTMLElement>(
        '.forge-terminal__brand'
    ) ??
    footer.querySelector<HTMLElement>(
        '.forge-terminal__pipeline-head'
    );

            const lower =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__lower'
                );

            const bottom =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__bottom'
                );

            const marquee =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__marquee-track'
                );

            const message =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__message'
                );

            const error =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__error'
                );

            const scanElements =
                Array.from(
                    footer.querySelectorAll<HTMLElement>(
                        '.forge-terminal__line, .forge-terminal__output'
                    )
                );

            const mark =
                footer.querySelector<HTMLElement>(
                    '.forge-terminal__mark'
                );


            /* =================================================
               SAFETY
            ================================================= */

            if (
                !meta ||
                !terminal ||
                !brand ||
                !lower ||
                !bottom
            ) {
                return;
            }


            /* =================================================
               INITIAL STATE
               
               Every element gets an explicit starting state.
               This prevents stale transform/opacity values
               after the animation reverses and plays again.
            ================================================= */

            gsap.set(
                meta,
                {
                    autoAlpha: 0,
                    y: 20,
                }
            );


            gsap.set(
                terminal,
                {
                    autoAlpha: 0,
                    y: 50,
                    scale: 0.97,
                }
            );


            if (scanElements.length) {
    gsap.set(
        scanElements,
        {
            autoAlpha: 0,
            x: -15,
        }
    );
}


            if (error) {

                gsap.set(
                    error,
                    {
                        autoAlpha: 0,
                        x: -15,
                    }
                );

            }


            if (message) {

                gsap.set(
                    message,
                    {
                        autoAlpha: 0,
                        y: 20,
                    }
                );

            }


            gsap.set(
                brand,
                {
                    autoAlpha: 0,
                    y: 25,
                }
            );


            gsap.set(
                lower,
                {
                    autoAlpha: 0,
                    y: 20,
                }
            );


            gsap.set(
                bottom,
                {
                    autoAlpha: 0,
                    y: 15,
                }
            );


            /* =================================================
               REVEAL TIMELINE
            ================================================= */

            const timeline =
                gsap.timeline({

                    paused:
                        true,

                    defaults: {
                        overwrite:
                            'auto',
                    },

                    scrollTrigger: {

                        trigger:
                            footer,

                        start:
                            'top 82%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                        /*
                         * Makes the trigger recalculate
                         * correctly after layout changes.
                         */
                        refreshPriority:
                            0,
                    },
                });


            /* =================================================
               01 — META
            ================================================= */

            timeline.to(
                meta,
                {
                    autoAlpha: 1,
                    y: 0,

                    duration:
                        0.4,

                    ease:
                        'power3.out',
                }
            );


            /* =================================================
               02 — TERMINAL
            ================================================= */

            timeline.to(
                terminal,
                {
                    autoAlpha: 1,

                    y: 0,

                    scale: 1,

                    duration:
                        0.9,

                    ease:
                        'power4.out',
                },

                '-=0.15'
            );


            /* =================================================
               03 — TERMINAL SCAN
            ================================================= */

            if (scanElements.length) {

                timeline.to(
                    scanElements,
                    {
                        autoAlpha: 1,

                        x: 0,

                        duration:
                            0.35,

                        stagger:
                            0.06,

                        ease:
                            'power2.out',
                    },

                    '-=0.45'
                );

            }


            /* =================================================
               04 — ERROR
            ================================================= */

            if (error) {

                timeline.to(
                    error,
                    {
                        autoAlpha: 1,

                        x: 0,

                        duration:
                            0.45,

                        ease:
                            'power3.out',
                    },

                    '-=0.15'
                );

            }


            /* =================================================
               05 — MESSAGE
            ================================================= */

            if (message) {

                timeline.to(
                    message,
                    {
                        autoAlpha: 1,

                        y: 0,

                        duration:
                            0.6,

                        ease:
                            'power3.out',
                    },

                    '-=0.2'
                );

            }


            /* =================================================
               06 — BRAND
            ================================================= */

            timeline.to(
                brand,
                {
                    autoAlpha: 1,

                    y: 0,

                    duration:
                        0.55,

                    ease:
                        'power3.out',
                },

                '-=0.1'
            );


            /* =================================================
               07 — LOWER
            ================================================= */

            timeline.to(
                lower,
                {
                    autoAlpha: 1,

                    y: 0,

                    duration:
                        0.55,

                    ease:
                        'power3.out',
                },

                '-=0.15'
            );


            /* =================================================
               08 — BOTTOM
            ================================================= */

            timeline.to(
                bottom,
                {
                    autoAlpha: 1,

                    y: 0,

                    duration:
                        0.4,

                    ease:
                        'power3.out',
                },

                '-=0.2'
            );


            /* =================================================
               MARQUEE
               
               This is an independent ambient animation.
               It is created inside the GSAP context so cleanup
               happens automatically.
            ================================================= */

            if (marquee) {

                gsap.to(
                    marquee,
                    {
                        xPercent:
                            -25,

                        duration:
                            20,

                        repeat:
                            -1,

                        ease:
                            'none',

                        overwrite:
                            false,
                    }
                );

            }


            /* =================================================
               TERMINAL MESSAGE FLOAT
            ================================================= */

            if (message) {

                gsap.to(
                    message,
                    {
                        y:
                            -4,

                        duration:
                            2.5,

                        repeat:
                            -1,

                        yoyo:
                            true,

                        ease:
                            'sine.inOut',

                        overwrite:
                            false,
                    }
                );

            }


            /* =================================================
               LOGO FLOAT
            ================================================= */

            if (mark) {

                gsap.to(
                    mark,
                    {
                        y:
                            -4,

                        duration:
                            2.5,

                        repeat:
                            -1,

                        yoyo:
                            true,

                        ease:
                            'sine.inOut',

                        overwrite:
                            false,
                    }
                );

            }


            /* =================================================
               REFRESH
            ================================================= */

            requestAnimationFrame(
                () => {

                    ScrollTrigger.refresh();

                }
            );


        }, footer);


    /* ========================================================
       CLEANUP
       
       ctx.revert() handles:
       - ScrollTrigger
       - reveal timeline
       - marquee tween
       - message float
       - logo float
       - inline GSAP styles
    ======================================================== */

    return () => {

        ctx.revert();

    };
};