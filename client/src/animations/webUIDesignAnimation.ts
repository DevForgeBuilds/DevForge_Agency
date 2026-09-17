import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initWebUIDesignAnimation = (
    root: HTMLElement
) => {

    const wireframe =
        root.querySelector(
            '.webui-wireframe'
        ) as HTMLElement | null;

    const wireBlocks =
        root.querySelectorAll(
            '.wire-block'
        );

    const transform =
        root.querySelector(
            '.webui-showcase__transform'
        ) as HTMLElement | null;

    const interfacePanel =
        root.querySelector(
            '.webui-interface'
        ) as HTMLElement | null;

    const interfaceCopy =
        root.querySelector(
            '.webui-interface__copy'
        ) as HTMLElement | null;

    const interfaceShape =
        root.querySelector(
            '.webui-interface__shape'
        ) as HTMLElement | null;

    const interfaceStatus =
        root.querySelector(
            '.webui-interface__status'
        ) as HTMLElement | null;

    const statement =
        root.querySelector(
            '.webui-showcase__statement'
        ) as HTMLElement | null;


    if (
        !wireframe ||
        !transform ||
        !interfacePanel ||
        !interfaceCopy ||
        !interfaceShape ||
        !interfaceStatus ||
        !statement
    ) {
        return () => {};
    }


    const context =
        gsap.context(() => {

            /* =================================================
               INITIAL STATE
            ================================================= */

            gsap.set(
                wireframe,
                {
                    x: -130,
                    opacity: 0,
                    rotateY: -12,
                    transformPerspective: 1200,
                }
            );


            gsap.set(
                wireBlocks,
                {
                    opacity: 0,
                    scale: .8,
                }
            );


            gsap.set(
                transform,
                {
                    opacity: 0,
                    scale: .5,
                }
            );


            gsap.set(
                interfacePanel,
                {
                    x: 150,
                    opacity: 0,
                    scale: .82,
                    rotateY: 15,
                    transformPerspective: 1200,
                }
            );


            gsap.set(
                interfaceCopy,
                {
                    y: 55,
                    opacity: 0,
                }
            );


            gsap.set(
                interfaceShape,
                {
                    scale: .35,
                    opacity: 0,
                    rotation: -35,
                }
            );


            gsap.set(
                interfaceStatus,
                {
                    y: 15,
                    opacity: 0,
                }
            );


            gsap.set(
                statement,
                {
                    y: 60,
                    opacity: 0,
                }
            );


            /* =================================================
               MASTER TIMELINE
            ================================================= */

            const timeline =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            root,

                        start:
                            'top top',

                        end:
                            '+=2200',

                        pin:
                            true,

                        scrub:
                            1.15,

                        anticipatePin:
                            1,

                        invalidateOnRefresh:
                            true,

                        pinSpacing:
                            true,
                    },

                });


            /* =================================================
               01 — WIREFRAME ENTER
            ================================================= */

            timeline.to(
                wireframe,
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power4.out',
                }
            );


            /* =================================================
               02 — WIREFRAME BUILDS
            ================================================= */

            timeline.to(
                wireBlocks,
                {
                    opacity: 1,
                    scale: 1,
                    duration: .55,
                    stagger: .1,
                    ease: 'back.out(1.4)',
                },
                '-=.45'
            );


            /* =================================================
               03 — TRANSFORM
            ================================================= */

            timeline.to(
                transform,
                {
                    opacity: 1,
                    scale: 1,
                    duration: .55,
                    ease: 'back.out(1.7)',
                },
                '-=.15'
            );


            /* =================================================
               04 — WIREFRAME MOVES OUT
            ================================================= */

            timeline.to(
                wireframe,
                {
                    x: -170,
                    opacity: .25,
                    scale: .88,
                    duration: .9,
                    ease: 'power3.inOut',
                }
            );


            /* =================================================
               05 — UI ENTERS
            ================================================= */

            timeline.to(
                interfacePanel,
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 1.15,
                    ease: 'power4.out',
                },
                '-=.25'
            );


            /* =================================================
               06 — UI CONTENT
            ================================================= */

            timeline.to(
                interfaceCopy,
                {
                    y: 0,
                    opacity: 1,
                    duration: .8,
                    ease: 'power4.out',
                },
                '-=.45'
            );


            /* =================================================
               07 — SIGNATURE SHAPE
            ================================================= */

            timeline.to(
                interfaceShape,
                {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: .9,
                    ease: 'back.out(1.5)',
                },
                '-=.5'
            );


            /* =================================================
               08 — STATUS
            ================================================= */

            timeline.to(
                interfaceStatus,
                {
                    y: 0,
                    opacity: 1,
                    duration: .5,
                    ease: 'power3.out',
                },
                '-=.35'
            );


            /* =================================================
               09 — UI SETTLE
            ================================================= */

            timeline.to(
                interfacePanel,
                {
                    scale: 1.035,
                    duration: .55,
                    ease: 'power2.inOut',
                }
            );


            timeline.to(
                interfacePanel,
                {
                    scale: 1,
                    duration: .55,
                    ease: 'power2.inOut',
                }
            );


            /* =================================================
               10 — FINAL STATEMENT
            ================================================= */

            timeline.to(
                statement,
                {
                    y: 0,
                    opacity: 1,
                    duration: .8,
                    ease: 'power4.out',
                },
                '-=.25'
            );


            /* =================================================
               CONTINUOUS SHAPE ROTATION
            ================================================= */

            gsap.to(
                interfaceShape,
                {
                    rotation: 360,
                    duration: 18,
                    ease: 'none',
                    repeat: -1,
                }
            );

        }, root);


    return () => {

        context.revert();

    };
};