import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   CONTACT ANIMATION
============================================================ */

export const initContactAnimation = (
    section: HTMLElement
) => {

    const ctx = gsap.context(() => {

        /* =====================================================
           ELEMENTS
        ===================================================== */

        const hero =
            section.querySelector<HTMLElement>(
                '.contact-hero'
            );

        const eyebrow =
            section.querySelector<HTMLElement>(
                '.contact-eyebrow'
            );

        const title =
            section.querySelector<HTMLElement>(
                '.contact-title'
            );

        const scrollHint =
            section.querySelector<HTMLElement>(
                '.contact-scroll-hint'
            );

        const idea =
            section.querySelector<HTMLElement>(
                '.contact-idea'
            );

        const ideaLabel =
            section.querySelector<HTMLElement>(
                '.contact-idea-label'
            );

        const ideaMain =
            section.querySelector<HTMLElement>(
                '.contact-idea-main'
            );

        const collab =
            section.querySelector<HTMLElement>(
                '.contact-collab'
            );

        const collabWords =
            section.querySelectorAll<HTMLElement>(
                '.contact-collab-word'
            );

        const collabSymbol =
            section.querySelector<HTMLElement>(
                '.contact-collab-symbol'
            );

        const collabLine =
            section.querySelector<HTMLElement>(
                '.contact-collab-line'
            );

        const formScreen =
            section.querySelector<HTMLElement>(
                '.contact-form-screen'
            );

        const formIntro =
            section.querySelector<HTMLElement>(
                '.contact-form-intro'
            );

        const builder =
            section.querySelector<HTMLElement>(
                '.contact-builder'
            );

        const brief =
            section.querySelector<HTMLElement>(
                '.contact-brief'
            );

        const final =
            section.querySelector<HTMLElement>(
                '.contact-final'
            );

        const footer =
            section.querySelector<HTMLElement>(
                '.contact-footer'
            );


        /* =====================================================
           GUARD
        ===================================================== */

        if (
            !hero ||
            !formScreen ||
            !builder ||
            !brief
        ) {
            return;
        }


        /* =====================================================
           INITIAL STATES
        ===================================================== */

        gsap.set(
            [
                eyebrow,
                title,
                scrollHint,
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35,
            }
        );


        gsap.set(
            [
                ideaLabel,
                ideaMain,
            ].filter(Boolean),
            {
                opacity: 0,
                y: 45,
            }
        );


        gsap.set(
            [
                ...Array.from(collabWords),
                collabSymbol,
                collabLine,
            ].filter(Boolean),
            {
                opacity: 0,
                y: 30,
            }
        );


        gsap.set(
            formScreen,
            {
                opacity: 0,
                y: 70,
            }
        );


        gsap.set(
            [
                formIntro,
                builder,
                brief,
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35,
            }
        );


        if (final) {

            gsap.set(
                final,
                {
                    opacity: 0,
                    y: 50,
                }
            );
        }


        if (footer) {

            gsap.set(
                footer,
                {
                    opacity: 0,
                    y: 20,
                }
            );
        }


        /* =====================================================
           HERO
        ===================================================== */

        ScrollTrigger.create({

            trigger: hero,

            start: 'top 82%',

            end: 'bottom 30%',

            toggleActions:
                'play none none reverse',

            invalidateOnRefresh: true,

            onEnter: () => {

                const tl =
                    gsap.timeline();

                tl.to(
                    eyebrow,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .45,

                        ease:
                            'power3.out',
                    }
                );

                tl.to(
                    title,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .9,

                        ease:
                            'power4.out',
                    },
                    '-=.2'
                );

                tl.to(
                    scrollHint,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .45,

                        ease:
                            'power3.out',
                    },
                    '-=.3'
                );
            },

            onLeaveBack: () => {

                gsap.set(
                    [
                        eyebrow,
                        title,
                        scrollHint,
                    ].filter(Boolean),
                    {
                        opacity: 0,
                        y: 35,
                    }
                );
            },
        });


        /* =====================================================
           IDEA
        ===================================================== */

        if (idea) {

            ScrollTrigger.create({

                trigger: idea,

                start: 'top 70%',

                end: 'bottom 25%',

                toggleActions:
                    'play none none reverse',

                invalidateOnRefresh: true,

                onEnter: () => {

                    const tl =
                        gsap.timeline();

                    tl.to(
                        ideaLabel,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .5,

                            ease:
                                'power3.out',
                        }
                    );

                    tl.to(
                        ideaMain,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .8,

                            ease:
                                'power4.out',
                        },
                        '-=.25'
                    );
                },

                onLeaveBack: () => {

                    gsap.set(
                        [
                            ideaLabel,
                            ideaMain,
                        ].filter(Boolean),
                        {
                            opacity: 0,
                            y: 45,
                        }
                    );
                },
            });
        }


        /* =====================================================
           COLLAB
        ===================================================== */

        if (collab) {

            ScrollTrigger.create({

                trigger: collab,

                start: 'top 72%',

                end: 'bottom 25%',

                toggleActions:
                    'play none none reverse',

                invalidateOnRefresh: true,

                onEnter: () => {

                    const tl =
                        gsap.timeline();

                    tl.to(
                        collabWords,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .55,

                            stagger: .12,

                            ease:
                                'power3.out',
                        }
                    );

                    tl.to(
                        collabSymbol,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .4,

                            ease:
                                'power3.out',
                        },
                        '-=.3'
                    );

                    tl.to(
                        collabLine,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .6,

                            ease:
                                'power3.out',
                        },
                        '-=.25'
                    );
                },

                onLeaveBack: () => {

                    gsap.set(
                        [
                            ...Array.from(
                                collabWords
                            ),
                            collabSymbol,
                            collabLine,
                        ].filter(Boolean),
                        {
                            opacity: 0,
                            y: 30,
                        }
                    );
                },
            });
        }


        /* =====================================================
           FORM SCREEN
        ===================================================== */

        ScrollTrigger.create({

            trigger: formScreen,

            start: 'top 78%',

            end: 'bottom 25%',

            toggleActions:
                'play none none reverse',

            invalidateOnRefresh: true,

            onEnter: () => {

                const tl =
                    gsap.timeline();

                tl.to(
                    formScreen,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .7,

                        ease:
                            'power4.out',
                    }
                );

                tl.to(
                    formIntro,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .65,

                        ease:
                            'power3.out',
                    },
                    '-=.3'
                );

                tl.to(
                    builder,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .7,

                        ease:
                            'power4.out',
                    },
                    '-=.25'
                );

                tl.to(
                    brief,
                    {
                        opacity: 1,
                        y: 0,

                        duration: .7,

                        ease:
                            'power4.out',
                    },
                    '-=.5'
                );
            },

            onLeaveBack: () => {

                gsap.set(
                    formScreen,
                    {
                        opacity: 0,
                        y: 70,
                    }
                );

                gsap.set(
                    [
                        formIntro,
                        builder,
                        brief,
                    ].filter(Boolean),
                    {
                        opacity: 0,
                        y: 35,
                    }
                );
            },
        });


        /* =====================================================
           FINAL
        ===================================================== */

        if (final) {

            ScrollTrigger.create({

                trigger: final,

                start: 'top 75%',

                end: 'bottom 25%',

                toggleActions:
                    'play none none reverse',

                invalidateOnRefresh: true,

                onEnter: () => {

                    gsap.to(
                        final,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .8,

                            ease:
                                'power4.out',
                        }
                    );
                },

                onLeaveBack: () => {

                    gsap.set(
                        final,
                        {
                            opacity: 0,
                            y: 50,
                        }
                    );
                },
            });
        }


        /* =====================================================
           FOOTER
        ===================================================== */

        if (footer) {

            ScrollTrigger.create({

                trigger: footer,

                start: 'top 90%',

                end: 'bottom bottom',

                toggleActions:
                    'play none none reverse',

                invalidateOnRefresh: true,

                onEnter: () => {

                    gsap.to(
                        footer,
                        {
                            opacity: 1,
                            y: 0,

                            duration: .5,

                            ease:
                                'power3.out',
                        }
                    );
                },

                onLeaveBack: () => {

                    gsap.set(
                        footer,
                        {
                            opacity: 0,
                            y: 20,
                        }
                    );
                },
            });
        }


        /* =====================================================
           LIVE BRIEF HOVER / MICRO MOTION
        ===================================================== */

        if (brief) {

            const radar =
                brief.querySelector(
                    '.contact-radar'
                );

            if (radar) {

                gsap.to(
                    radar,
                    {
                        rotation: 360,

                        duration: 12,

                        repeat: -1,

                        ease: 'none',

                    }
                );
            }
        }


        /* =====================================================
           REFRESH
        ===================================================== */

        requestAnimationFrame(() => {

            ScrollTrigger.refresh();

        });

    }, section);


    /* ========================================================
       CLEANUP
    ======================================================== */

    return () => {

        ctx.revert();

    };
};