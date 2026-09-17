import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   STUDIO ANIMATION
============================================================ */

export const initStudioAnimation = (
    section: HTMLElement
) => {

    const ctx = gsap.context(() => {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const meta =
            section.querySelector<HTMLElement>(
                '.studio-section__meta'
            );


        const statement =
            section.querySelector<HTMLElement>(
                '.studio-section__statement'
            );


        const words =
            Array.from(
                section.querySelectorAll<HTMLElement>(
                    '.studio-word'
                )
            );


        const intro =
            section.querySelector<HTMLElement>(
                '.studio-section__intro'
            );


        const belief =
            section.querySelector<HTMLElement>(
                '.studio-belief'
            );


        const beliefTitle =
            section.querySelector<HTMLElement>(
                '.studio-belief__main h3'
            );


        const beliefText =
            section.querySelector<HTMLElement>(
                '.studio-belief__main p'
            );


        const values =
            Array.from(
                section.querySelectorAll<HTMLElement>(
                    '.studio-value'
                )
            );


        const manifesto =
            section.querySelector<HTMLElement>(
                '.studio-manifesto'
            );


        const manifestoTitle =
            section.querySelector<HTMLElement>(
                '.studio-manifesto h3'
            );


        /* =====================================================
           IMPORTANT
           
           Do NOT require studio-identity here.
           Current Studio.tsx does not render that element.
        ===================================================== */

        if (
            !meta ||
            !statement ||
            !belief ||
            !manifesto
        ) {
            return;
        }


        /* =====================================================
           INITIAL STATES
        ===================================================== */

        gsap.set(
            meta,
            {
                opacity: 0,
                y: 24,
            }
        );


        if (words.length) {

            gsap.set(
                words,
                {
                    opacity: 0,
                    y: 70,

                    rotateX: 30,

                    transformOrigin:
                        'left bottom',

                    transformPerspective:
                        900,
                }
            );

        }


        if (intro) {

            gsap.set(
                intro,
                {
                    opacity: 0,
                    y: 32,
                }
            );

        }


        gsap.set(
            belief,
            {
                opacity: 0,
                y: 55,
            }
        );


        if (beliefTitle) {

            gsap.set(
                beliefTitle,
                {
                    opacity: 0,
                    y: 60,
                }
            );

        }


        if (beliefText) {

            gsap.set(
                beliefText,
                {
                    opacity: 0,
                    y: 26,
                }
            );

        }


        if (values.length) {

            gsap.set(
                values,
                {
                    opacity: 0,
                    y: 42,
                }
            );

        }


        gsap.set(
            manifesto,
            {
                opacity: 0,
                y: 60,
            }
        );


        if (manifestoTitle) {

            gsap.set(
                manifestoTitle,
                {
                    opacity: 0,
                    y: 65,
                }
            );

        }


        /* =====================================================
           01 — META
        ===================================================== */

        gsap.to(
            meta,
            {
                opacity: 1,
                y: 0,

                duration:
                    0.7,

                ease:
                    'power3.out',

                scrollTrigger: {

                    trigger:
                        meta,

                    start:
                        'top 84%',

                    toggleActions:
                        'play none none reverse',

                    invalidateOnRefresh:
                        true,

                },

            }
        );


        /* =====================================================
           02 — MAIN TITLE
        ===================================================== */

        if (words.length) {

            gsap.to(
                words,
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,

                    duration:
                        0.85,

                    stagger:
                        0.11,

                    ease:
                        'power4.out',

                    scrollTrigger: {

                        trigger:
                            statement,

                        start:
                            'top 72%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                    },

                }
            );

        }


        /* =====================================================
           03 — INTRO
        ===================================================== */

        if (intro) {

            gsap.to(
                intro,
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.7,

                    ease:
                        'power3.out',

                    scrollTrigger: {

                        trigger:
                            intro,

                        start:
                            'top 82%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                    },

                }
            );

        }


        /* =====================================================
           IMPORTANT:
           
           ForgeCollision has its OWN ScrollTrigger.
           
           We intentionally DO NOT animate it here.
           Otherwise two animation systems can fight over
           the same section.
        ===================================================== */


        /* =====================================================
           04 — BELIEF
        ===================================================== */

        gsap.to(
            belief,
            {
                opacity: 1,
                y: 0,

                duration:
                    0.75,

                ease:
                    'power3.out',

                scrollTrigger: {

                    trigger:
                        belief,

                    start:
                        'top 78%',

                    toggleActions:
                        'play none none reverse',

                    invalidateOnRefresh:
                        true,

                },

            }
        );


        /* =====================================================
           BELIEF CONTENT
        ===================================================== */

        if (
            beliefTitle ||
            beliefText
        ) {

            const beliefTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            belief,

                        start:
                            'top 70%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                    },

                });


            if (beliefTitle) {

                beliefTimeline.to(
                    beliefTitle,
                    {
                        opacity: 1,
                        y: 0,

                        duration:
                            0.8,

                        ease:
                            'power4.out',
                    }
                );

            }


            if (beliefText) {

                beliefTimeline.to(
                    beliefText,
                    {
                        opacity: 1,
                        y: 0,

                        duration:
                            0.6,

                        ease:
                            'power3.out',
                    },
                    '-=0.38'
                );

            }

        }


        /* =====================================================
           05 — VALUES
        ===================================================== */

        if (values.length) {

            gsap.to(
                values,
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.65,

                    stagger:
                        0.12,

                    ease:
                        'power3.out',

                    scrollTrigger: {

                        trigger:
                            values[0],

                        start:
                            'top 82%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                    },

                }
            );

        }


        /* =====================================================
           06 — VALUE HOVER
        ===================================================== */

        values.forEach(
            (value) => {

                const arrow =
                    value.querySelector<HTMLElement>(
                        '.studio-value__arrow'
                    );


                if (!arrow) {
                    return;
                }


                const enter =
                    () => {

                        gsap.to(
                            arrow,
                            {
                                x: 5,
                                y: -5,

                                duration:
                                    0.3,

                                ease:
                                    'power3.out',

                                overwrite:
                                    'auto',
                            }
                        );

                    };


                const leave =
                    () => {

                        gsap.to(
                            arrow,
                            {
                                x: 0,
                                y: 0,

                                duration:
                                    0.4,

                                ease:
                                    'power3.out',

                                overwrite:
                                    'auto',
                            }
                        );

                    };


                value.addEventListener(
                    'mouseenter',
                    enter
                );


                value.addEventListener(
                    'mouseleave',
                    leave
                );

            }
        );


        /* =====================================================
           07 — MANIFESTO
        ===================================================== */

        gsap.to(
            manifesto,
            {
                opacity: 1,
                y: 0,

                duration:
                    0.8,

                ease:
                    'power3.out',

                scrollTrigger: {

                    trigger:
                        manifesto,

                    start:
                        'top 80%',

                    toggleActions:
                        'play none none reverse',

                    invalidateOnRefresh:
                        true,

                },

            }
        );


        /* =====================================================
           MANIFESTO TITLE
        ===================================================== */

        if (manifestoTitle) {

            gsap.to(
                manifestoTitle,
                {
                    opacity: 1,
                    y: 0,

                    duration:
                        0.9,

                    ease:
                        'power4.out',

                    scrollTrigger: {

                        trigger:
                            manifestoTitle,

                        start:
                            'top 84%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                    },

                }
            );

        }


        /* =====================================================
           REFRESH
        ===================================================== */

        requestAnimationFrame(
            () => {

                ScrollTrigger.refresh();

            }
        );


    }, section);


    /* =========================================================
       CLEANUP
    ========================================================= */

    return () => {

        ctx.revert();

    };

};