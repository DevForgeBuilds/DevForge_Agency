import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   SERVICE DETAIL ANIMATION
============================================================ */

export const initServiceDetailAnimation = (
    root: HTMLElement
) => {

    const ctx = gsap.context(() => {

        /* =====================================================
           HERO ELEMENTS
        ===================================================== */

        const title =
            root.querySelector<HTMLElement>(
                '.service-detail__title'
            );

        const description =
            root.querySelector<HTMLElement>(
                '.service-detail__description'
            );

        const visual =
            root.querySelector<HTMLElement>(
                '.service-detail__hero-visual'
            );

        const browser =
            root.querySelector<HTMLElement>(
                '.service-detail__visual-browser'
            );

        const code =
            root.querySelector<HTMLElement>(
                '.service-detail__visual-code'
            );

        const orbit =
            root.querySelector<HTMLElement>(
                '.service-detail__visual-orbit'
            );


        /* =====================================================
           HERO INTRO
           
           Timeline based instead of multiple delayed tweens.
           This prevents stale independent animations when the
           component is mounted/unmounted again.
        ===================================================== */

        const heroTimeline =
            gsap.timeline({
                defaults: {
                    overwrite: 'auto',
                },
            });


        if (title) {

            gsap.set(
                title,
                {
                    y: 100,
                    opacity: 0,
                }
            );

            heroTimeline.to(
                title,
                {
                    y: 0,
                    opacity: 1,

                    duration: 1.1,

                    ease:
                        'power4.out',
                }
            );

        }


        if (description) {

            gsap.set(
                description,
                {
                    y: 35,
                    opacity: 0,
                }
            );

            heroTimeline.to(
                description,
                {
                    y: 0,
                    opacity: 1,

                    duration: 0.9,

                    ease:
                        'power3.out',
                },
                '-=0.85'
            );

        }


        if (visual) {

            gsap.set(
                visual,
                {
                    scale: 0.88,
                    opacity: 0,
                    rotate: 3,
                }
            );

            heroTimeline.to(
                visual,
                {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,

                    duration: 1.2,

                    ease:
                        'power4.out',
                },
                '-=0.95'
            );

        }


        if (browser) {

            gsap.set(
                browser,
                {
                    y: 60,
                    rotate: -6,
                }
            );

            heroTimeline.to(
                browser,
                {
                    y: 0,
                    rotate: 0,

                    duration: 1.3,

                    ease:
                        'power4.out',
                },
                '-=0.85'
            );

        }


        if (code) {

            gsap.set(
                code,
                {
                    x: -40,
                    opacity: 0,
                }
            );

            heroTimeline.to(
                code,
                {
                    x: 0,
                    opacity: 1,

                    duration: 0.9,

                    ease:
                        'power3.out',
                },
                '-=0.9'
            );

        }


        if (orbit) {

            gsap.set(
                orbit,
                {
                    scale: 0,
                    opacity: 0,
                }
            );

            heroTimeline.to(
                orbit,
                {
                    scale: 1,
                    opacity: 1,

                    duration: 1,

                    ease:
                        'back.out(1.7)',
                },
                '-=0.8'
            );

        }


        /* =====================================================
           HERO PARALLAX
           
           Separate ScrollTriggers intentionally control the
           three visual layers.
           
           No once:true -> works again in both directions.
        ===================================================== */

        if (browser) {

            gsap.to(
                browser,
                {
                    y: -90,
                    rotate: 3,

                    ease: 'none',

                    scrollTrigger: {

                        trigger:
                            root,

                        start:
                            'top top',

                        end:
                            '70% top',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                    },
                }
            );

        }


        if (code) {

            gsap.to(
                code,
                {
                    y: -150,
                    x: -40,
                    opacity: 0.35,

                    ease: 'none',

                    scrollTrigger: {

                        trigger:
                            root,

                        start:
                            'top top',

                        end:
                            '70% top',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                    },
                }
            );

        }


        if (orbit) {

            gsap.to(
                orbit,
                {
                    y: -120,
                    rotate: 180,

                    ease: 'none',

                    scrollTrigger: {

                        trigger:
                            root,

                        start:
                            'top top',

                        end:
                            '70% top',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                    },
                }
            );

        }


        /* =====================================================
           STATEMENT
        ===================================================== */

        const statement =
            root.querySelector<HTMLElement>(
                '.service-detail__statement'
            );

        if (statement) {

            gsap.fromTo(
                statement,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,

                    ease: 'none',

                    scrollTrigger: {

                        trigger:
                            statement,

                        start:
                            'top 80%',

                        end:
                            'top 40%',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                    },
                }
            );

        }


        /* =====================================================
           STATEMENT SECTION
        ===================================================== */

        const statementSection =
            root.querySelector<HTMLElement>(
                '.service-statement'
            );

        const statementLines =
            Array.from(
                root.querySelectorAll<HTMLElement>(
                    '.statement-line'
                )
            );

        const statementIntro =
            root.querySelector<HTMLElement>(
                '.service-statement__intro'
            );

        const statementDescription =
            root.querySelector<HTMLElement>(
                '.service-statement__description'
            );


        if (statementSection) {

            gsap.set(
                statementLines,
                {
                    yPercent: 110,
                    opacity: 0,
                }
            );


            if (statementIntro) {

                gsap.set(
                    statementIntro,
                    {
                        y: 25,
                        opacity: 0,
                    }
                );

            }


            if (statementDescription) {

                gsap.set(
                    statementDescription,
                    {
                        y: 35,
                        opacity: 0,
                    }
                );

            }


            const statementTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            statementSection,

                        start:
                            'top 78%',

                        end:
                            'top 28%',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                        toggleActions:
                            'play none none reverse',

                    },

                });


            if (statementIntro) {

                statementTimeline.to(
                    statementIntro,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.5,

                        ease:
                            'power3.out',
                    }
                );

            }


            if (statementLines.length) {

                statementTimeline.to(
                    statementLines,
                    {
                        yPercent: 0,
                        opacity: 1,

                        duration:
                            1,

                        stagger:
                            0.12,

                        ease:
                            'power4.out',
                    },
                    '-=0.25'
                );

            }


            if (statementDescription) {

                statementTimeline.to(
                    statementDescription,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.6,

                        ease:
                            'power3.out',
                    },
                    '-=0.5'
                );

            }

        }


        /* =====================================================
           PROCESS — HORIZONTAL SCROLL
        ===================================================== */

        const processSection =
            root.querySelector<HTMLElement>(
                '.service-process'
            );

        const processTrack =
            root.querySelector<HTMLElement>(
                '.service-process__track'
            );

        const processViewport =
            root.querySelector<HTMLElement>(
                '.service-process__viewport'
            );

        const processProgress =
            root.querySelector<HTMLElement>(
                '.service-process__progress-line i'
            );


        if (
            processSection &&
            processTrack &&
            processViewport &&
            window.innerWidth > 600
        ) {

            const getScrollAmount =
                () => {

                    return Math.max(
                        0,

                        processTrack.scrollWidth -
                        processViewport.clientWidth
                    );

                };


            const processTrigger =
                gsap.to(
                    processTrack,
                    {
                        x:
                            () =>
                                -getScrollAmount(),

                        ease:
                            'none',

                        scrollTrigger: {

                            trigger:
                                processSection,

                            start:
                                'center 50%',

                            end:
                                () =>
                                    `+=${Math.max(
                                        1,
                                        getScrollAmount()
                                    )}`,

                            pin:
                                true,

                            scrub:
                                1,

                            anticipatePin:
                                1,

                            invalidateOnRefresh:
                                true,

                            onUpdate:
                                (
                                    self
                                ) => {

                                    if (
                                        processProgress
                                    ) {

                                        processProgress.style.width =
                                            `${Math.max(
                                                16.66,
                                                self.progress *
                                                100
                                            )}%`;

                                    }

                                },

                        },

                    }
                );

        }


        /* =====================================================
           SIGNATURE CODE → WEBSITE EXPERIENCE
        ===================================================== */

        const experienceSection =
            root.querySelector<HTMLElement>(
                '.service-experience'
            );

        const experienceCode =
            root.querySelector<HTMLElement>(
                '.experience-code'
            );

        const experienceBrowser =
            root.querySelector<HTMLElement>(
                '.experience-browser'
            );

        const experienceConnector =
            root.querySelector<HTMLElement>(
                '.experience-connector i'
            );

        const experienceCounter =
            root.querySelector<HTMLElement>(
                '.service-experience__counter strong'
            );

        const experienceCodeLines =
            Array.from(
                root.querySelectorAll<HTMLElement>(
                    '.code-line'
                )
            );

        const builtNav =
            root.querySelector<HTMLElement>(
                '.built-nav'
            );

        const builtHero =
            root.querySelector<HTMLElement>(
                '.built-hero'
            );

        const builtCircle =
            root.querySelector<HTMLElement>(
                '.built-hero__circle'
            );


        if (
            experienceSection &&
            experienceCode &&
            experienceBrowser
        ) {

            gsap.set(
                experienceCode,
                {
                    x: -80,
                    opacity: 0,
                }
            );


            gsap.set(
                experienceBrowser,
                {
                    x: 100,
                    opacity: 0,
                    scale: 0.94,
                }
            );


            gsap.set(
                experienceCodeLines,
                {
                    x: -20,
                    opacity: 0,
                }
            );


            if (builtNav) {

                gsap.set(
                    builtNav,
                    {
                        y: -20,
                        opacity: 0,
                    }
                );

            }


            if (builtHero) {

                gsap.set(
                    builtHero,
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.94,
                    }
                );

            }


            if (builtCircle) {

                gsap.set(
                    builtCircle,
                    {
                        scale: 0,
                        rotate: -90,
                    }
                );

            }


            const experienceTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            experienceSection,

                        start:
                            'top top',

                        end:
                            '+=1800',

                        pin:
                            true,

                        scrub:
                            1,

                        anticipatePin:
                            1,

                        invalidateOnRefresh:
                            true,

                        toggleActions:
                            'play none none reverse',

                        onUpdate:
                            (
                                self
                            ) => {

                                if (
                                    experienceCounter
                                ) {

                                    experienceCounter.textContent =
                                        String(
                                            Math.min(
                                                100,
                                                Math.round(
                                                    self.progress *
                                                    100
                                                )
                                            )
                                        ).padStart(
                                            2,
                                            '0'
                                        );

                                }

                            },

                    },

                });


            /* -----------------------------------------------
               CODE
            ----------------------------------------------- */

            experienceTimeline.to(
                experienceCode,
                {
                    x: 0,
                    opacity: 1,

                    duration:
                        0.8,

                    ease:
                        'power4.out',
                }
            );


            /* -----------------------------------------------
               CODE LINES
            ----------------------------------------------- */

            if (
                experienceCodeLines.length
            ) {

                experienceTimeline.to(
                    experienceCodeLines,
                    {
                        x: 0,
                        opacity: 1,

                        duration:
                            0.8,

                        stagger:
                            0.12,

                        ease:
                            'power3.out',
                    },
                    '-=0.4'
                );

            }


            /* -----------------------------------------------
               CONNECTOR
            ----------------------------------------------- */

            if (
                experienceConnector
            ) {

                gsap.set(
                    experienceConnector,
                    {
                        width: '0%',
                    }
                );


                experienceTimeline.to(
                    experienceConnector,
                    {
                        width: '100%',

                        duration:
                            0.7,

                        ease:
                            'power2.inOut',
                    },
                    '-=0.2'
                );

            }


            /* -----------------------------------------------
               BROWSER
            ----------------------------------------------- */

            experienceTimeline.to(
                experienceBrowser,
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,

                    duration:
                        1,

                    ease:
                        'power4.out',
                },
                '-=0.3'
            );


            /* -----------------------------------------------
               WEBSITE NAV
            ----------------------------------------------- */

            if (builtNav) {

                experienceTimeline.to(
                    builtNav,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.5,

                        ease:
                            'power3.out',
                    }
                );

            }


            /* -----------------------------------------------
               WEBSITE HERO
            ----------------------------------------------- */

            if (builtHero) {

                experienceTimeline.to(
                    builtHero,
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,

                        duration:
                            1,

                        ease:
                            'power4.out',
                    },
                    '-=0.25'
                );

            }


            /* -----------------------------------------------
               FINAL CIRCLE
            ----------------------------------------------- */

            if (builtCircle) {

                experienceTimeline.to(
                    builtCircle,
                    {
                        scale: 1,
                        rotate: 0,

                        duration:
                            0.8,

                        ease:
                            'back.out(1.7)',
                    },
                    '-=0.5'
                );

            }

        }


        /* =====================================================
           TOOLCHAIN
        ===================================================== */

        const toolchainSection =
            root.querySelector<HTMLElement>(
                '.service-toolchain'
            );

        const toolchainItems =
            Array.from(
                root.querySelectorAll<HTMLElement>(
                    '.toolchain-item'
                )
            );

        const toolchainDetail =
            root.querySelector<HTMLElement>(
                '.toolchain-detail'
            );

        const toolchainStatement =
            root.querySelector<HTMLElement>(
                '.service-toolchain__statement'
            );


        if (toolchainSection) {

            gsap.set(
                toolchainItems,
                {
                    x: -35,
                    opacity: 0,
                }
            );


            if (toolchainDetail) {

                gsap.set(
                    toolchainDetail,
                    {
                        x: 40,
                        opacity: 0,
                    }
                );

            }


            if (toolchainStatement) {

                gsap.set(
                    toolchainStatement,
                    {
                        y: 50,
                        opacity: 0,
                    }
                );

            }


            const toolchainTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            toolchainSection,

                        start:
                            'top 75%',

                        end:
                            'top 30%',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                        toggleActions:
                            'play none none reverse',

                    },

                });


            if (toolchainItems.length) {

                toolchainTimeline.to(
                    toolchainItems,
                    {
                        x: 0,
                        opacity: 1,

                        stagger:
                            0.1,

                        duration:
                            0.7,

                        ease:
                            'power4.out',
                    }
                );

            }


            if (toolchainDetail) {

                toolchainTimeline.to(
                    toolchainDetail,
                    {
                        x: 0,
                        opacity: 1,

                        duration:
                            0.8,

                        ease:
                            'power4.out',
                    },
                    '-=0.45'
                );

            }


            if (toolchainStatement) {

                toolchainTimeline.to(
                    toolchainStatement,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.7,

                        ease:
                            'power3.out',
                    },
                    '-=0.3'
                );

            }

        }


        /* =====================================================
           ENGAGEMENT
        ===================================================== */

        const engagementSection =
            root.querySelector<HTMLElement>(
                '.service-engagement'
            );

        const engagementHeader =
            root.querySelector<HTMLElement>(
                '.service-engagement__header'
            );

        const engagementClock =
            root.querySelector<HTMLElement>(
                '.engagement-clock'
            );

        const engagementDetail =
            root.querySelector<HTMLElement>(
                '.engagement-detail'
            );

        const engagementStatement =
            root.querySelector<HTMLElement>(
                '.service-engagement__statement'
            );


        if (engagementSection) {

            if (engagementHeader) {

                gsap.set(
                    engagementHeader,
                    {
                        y: 50,
                        opacity: 0,
                    }
                );

            }


            if (engagementClock) {

                gsap.set(
                    engagementClock,
                    {
                        scale: 0.85,
                        opacity: 0,
                        rotate: -8,
                    }
                );

            }


            if (engagementDetail) {

                gsap.set(
                    engagementDetail,
                    {
                        x: 45,
                        opacity: 0,
                    }
                );

            }


            if (engagementStatement) {

                gsap.set(
                    engagementStatement,
                    {
                        y: 50,
                        opacity: 0,
                    }
                );

            }


            const engagementTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            engagementSection,

                        start:
                            'top 75%',

                        end:
                            'top 30%',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                        toggleActions:
                            'play none none reverse',

                    },

                });


            if (engagementHeader) {

                engagementTimeline.to(
                    engagementHeader,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.7,

                        ease:
                            'power4.out',
                    }
                );

            }


            if (engagementClock) {

                engagementTimeline.to(
                    engagementClock,
                    {
                        scale: 1,
                        opacity: 1,
                        rotate: 0,

                        duration:
                            1,

                        ease:
                            'power4.out',
                    },
                    '-=0.35'
                );

            }


            if (engagementDetail) {

                engagementTimeline.to(
                    engagementDetail,
                    {
                        x: 0,
                        opacity: 1,

                        duration:
                            0.8,

                        ease:
                            'power4.out',
                    },
                    '-=0.55'
                );

            }


            if (engagementStatement) {

                engagementTimeline.to(
                    engagementStatement,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.7,

                        ease:
                            'power3.out',
                    },
                    '-=0.25'
                );

            }

        }


        /* =====================================================
           RELATED WORK
        ===================================================== */

        const relatedWorkSection =
            root.querySelector<HTMLElement>(
                '.related-work'
            );

        const relatedWorkHeader =
            root.querySelector<HTMLElement>(
                '.related-work__header'
            );

        const relatedWorkTabs =
            Array.from(
                root.querySelectorAll<HTMLElement>(
                    '.related-project-tab'
                )
            );

        const relatedWorkProject =
            root.querySelector<HTMLElement>(
                '.related-work__project'
            );


        if (relatedWorkSection) {

            if (relatedWorkHeader) {

                gsap.set(
                    relatedWorkHeader,
                    {
                        y: 50,
                        opacity: 0,
                    }
                );

            }


            gsap.set(
                relatedWorkTabs,
                {
                    y: 25,
                    opacity: 0,
                }
            );


            if (relatedWorkProject) {

                gsap.set(
                    relatedWorkProject,
                    {
                        y: 45,
                        opacity: 0,
                    }
                );

            }


            const relatedTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            relatedWorkSection,

                        start:
                            'top 75%',

                        end:
                            'top 30%',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                        toggleActions:
                            'play none none reverse',

                    },

                });


            if (relatedWorkHeader) {

                relatedTimeline.to(
                    relatedWorkHeader,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.7,

                        ease:
                            'power4.out',
                    }
                );

            }


            if (relatedWorkTabs.length) {

                relatedTimeline.to(
                    relatedWorkTabs,
                    {
                        y: 0,
                        opacity: 1,

                        stagger:
                            0.1,

                        duration:
                            0.6,

                        ease:
                            'power4.out',
                    },
                    '-=0.35'
                );

            }


            if (relatedWorkProject) {

                relatedTimeline.to(
                    relatedWorkProject,
                    {
                        y: 0,
                        opacity: 1,

                        duration:
                            0.8,

                        ease:
                            'power4.out',
                    },
                    '-=0.3'
                );

            }

        }


        /* =====================================================
           FINAL CTA
        ===================================================== */

        const ctaSection =
            root.querySelector<HTMLElement>(
                '.service-cta'
            );

        const ctaTop =
            root.querySelector<HTMLElement>(
                '.service-cta__top'
            );

        const ctaTitle =
            root.querySelector<HTMLElement>(
                '.service-cta__title'
            );

        const ctaDescription =
            root.querySelector<HTMLElement>(
                '.service-cta__description'
            );

        const ctaButton =
            root.querySelector<HTMLElement>(
                '.service-cta__button'
            );

        const ctaBottom =
            root.querySelector<HTMLElement>(
                '.service-cta__bottom'
            );


        if (ctaSection) {

            if (ctaTop) {

                gsap.set(
                    ctaTop,
                    {
                        opacity: 0,
                        y: 20,
                    }
                );

            }


            if (ctaTitle) {

                gsap.set(
                    ctaTitle,
                    {
                        opacity: 0,
                        y: 70,
                        scale: 0.96,
                    }
                );

            }


            if (ctaDescription) {

                gsap.set(
                    ctaDescription,
                    {
                        opacity: 0,
                        y: 30,
                    }
                );

            }


            if (ctaButton) {

                gsap.set(
                    ctaButton,
                    {
                        opacity: 0,
                        scale: 0.7,
                        rotate: -20,
                    }
                );

            }


            if (ctaBottom) {

                gsap.set(
                    ctaBottom,
                    {
                        opacity: 0,
                        y: 20,
                    }
                );

            }


            const ctaTimeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            ctaSection,

                        start:
                            'top 80%',

                        end:
                            'top 25%',

                        scrub:
                            1,

                        invalidateOnRefresh:
                            true,

                        toggleActions:
                            'play none none reverse',

                    },

                });


            if (ctaTop) {

                ctaTimeline.to(
                    ctaTop,
                    {
                        opacity: 1,
                        y: 0,

                        duration:
                            0.5,

                        ease:
                            'power3.out',
                    }
                );

            }


            if (ctaTitle) {

                ctaTimeline.to(
                    ctaTitle,
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

            }


            if (ctaDescription) {

                ctaTimeline.to(
                    ctaDescription,
                    {
                        opacity: 1,
                        y: 0,

                        duration:
                            0.6,

                        ease:
                            'power3.out',
                    },
                    '-=0.5'
                );

            }


            if (ctaButton) {

                ctaTimeline.to(
                    ctaButton,
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,

                        duration:
                            0.8,

                        ease:
                            'back.out(1.7)',
                    },
                    '-=0.45'
                );

            }


            if (ctaBottom) {

                ctaTimeline.to(
                    ctaBottom,
                    {
                        opacity: 1,
                        y: 0,

                        duration:
                            0.5,

                        ease:
                            'power3.out',
                    },
                    '-=0.35'
                );

            }

        }


        /* =====================================================
           REFRESH
           
           Important for pinned sections and dynamic widths.
        ===================================================== */

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });


    }, root);


    /* =========================================================
       CLEANUP
       
       ctx.revert() removes every GSAP animation/ScrollTrigger
       created inside this context.
    ========================================================= */

    return () => {

        ctx.revert();

    };
};