import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   SERVICES ANIMATION
============================================================ */

export const initServiceAnimation = (
    section: HTMLElement
) => {

    const items =
        Array.from(
            section.querySelectorAll<HTMLElement>(
                '.service-item'
            )
        );

    const list =
        section.querySelector<HTMLElement>(
            '.services-section__list'
        );

    const preview =
        section.querySelector<HTMLElement>(
            '.service-preview'
        );

    const previewNumber =
        section.querySelector<HTMLElement>(
            '.service-preview__number'
        );

    const previewTitle =
        section.querySelector<HTMLElement>(
            '.service-preview__title'
        );

    const previewIndex =
        section.querySelector<HTMLElement>(
            '.service-preview__index'
        );

    const scenes =
        Array.from(
            section.querySelectorAll<HTMLElement>(
                '.service-preview__scene'
            )
        );


    /* ============================================================
       REQUIRED ELEMENTS
    ============================================================ */

    if (
        !list ||
        !preview ||
        !previewNumber ||
        !previewTitle ||
        !previewIndex ||
        items.length === 0
    ) {
        return () => {};
    }


    /* ============================================================
       GSAP CONTEXT
    ============================================================ */

    const ctx =
        gsap.context(() => {

            /* ====================================================
               INTRO ELEMENTS
            ==================================================== */

            const top =
                section.querySelector<HTMLElement>(
                    '.services-section__top'
                );

            const intro =
                section.querySelector<HTMLElement>(
                    '.services-section__intro'
                );

            const bottom =
                section.querySelector<HTMLElement>(
                    '.services-section__bottom'
                );


            /* ====================================================
               INITIAL REVEAL STATE
               
               Every time this initializer runs, elements are
               returned to exactly the same starting state.
            ==================================================== */

            const revealElements = [
                top,
                intro,
                ...items,
                bottom,
            ].filter(
                (
                    element
                ): element is HTMLElement =>
                    Boolean(element)
            );


            gsap.set(
                revealElements,
                {
                    opacity: 0,
                    y: 35,
                }
            );


            /* ====================================================
               INTRO REVEAL
               
               IMPORTANT:
               No once:true.
               
               This allows the section to animate again after
               leaving and re-entering it.
            ==================================================== */

            const reveal =
                gsap.timeline({

                    scrollTrigger: {

                        trigger:
                            section,

                        start:
                            'top 75%',

                        toggleActions:
                            'play none none reverse',

                        invalidateOnRefresh:
                            true,

                    },

                });


            if (top) {

                reveal.to(
                    top,
                    {
                        opacity: 1,
                        y: 0,

                        duration: 0.5,

                        ease:
                            'power3.out',
                    }
                );

            }


            if (intro) {

                reveal.to(
                    intro,
                    {
                        opacity: 1,
                        y: 0,

                        duration: 0.7,

                        ease:
                            'power3.out',
                    },
                    '-=0.25'
                );

            }


            reveal.to(
                items,
                {
                    opacity: 1,
                    y: 0,

                    duration: 0.55,

                    stagger: 0.07,

                    ease:
                        'power3.out',
                },
                '-=0.3'
            );


            if (bottom) {

                reveal.to(
                    bottom,
                    {
                        opacity: 1,
                        y: 0,

                        duration: 0.5,

                        ease:
                            'power3.out',
                    },
                    '-=0.2'
                );

            }


            /* ====================================================
               SERVICE DATA
            ==================================================== */

            const serviceData = [

                {
                    number: '01',
                    title: 'WEB / UI DESIGN',
                    index: '01 / 06',
                },

                {
                    number: '02',
                    title: 'WEB DEVELOPMENT',
                    index: '02 / 06',
                },

                {
                    number: '03',
                    title:
                        'FULL-STACK (MERN) APPLICATIONS',
                    index: '03 / 06',
                },

                {
                    number: '04',
                    title:
                        'FRONTEND ENGINEERING',
                    index: '04 / 06',
                },

                {
                    number: '05',
                    title:
                        'BACKEND & API SYSTEMS',
                    index: '05 / 06',
                },

                {
                    number: '06',
                    title:
                        'ADMIN DASHBOARDS',
                    index: '06 / 06',
                },

            ];


            /* ====================================================
               PREVIEW STATE
            ==================================================== */

            let activeIndex = -1;

            let isInsideList = false;

            let mouseX = 0;
            let mouseY = 0;

            let currentX = 0;
            let currentY = 0;

            let animationFrame = 0;


            /* ====================================================
               PREVIEW INITIAL STATE
            ==================================================== */

            gsap.set(
                preview,
                {
                    opacity: 0,
                    scale: 0.92,
                    rotation: -2,

                    pointerEvents:
                        'none',
                }
            );


            /* ====================================================
               PREVIEW POSITION LOOP
               
               The RAF remains alive only while the initializer
               exists and is completely cancelled on cleanup.
            ==================================================== */

            const updatePreviewPosition =
                () => {

                    if (
                        isInsideList
                    ) {

                        currentX +=
                            (
                                mouseX -
                                currentX
                            ) * 0.13;


                        currentY +=
                            (
                                mouseY -
                                currentY
                            ) * 0.13;


                        preview.style.left =
                            `${currentX}px`;

                        preview.style.top =
                            `${currentY}px`;

                    }


                    animationFrame =
                        requestAnimationFrame(
                            updatePreviewPosition
                        );

                };


            animationFrame =
                requestAnimationFrame(
                    updatePreviewPosition
                );


            /* ====================================================
               CURSOR POSITION
            ==================================================== */

            const handlePointerMove =
                (
                    event: PointerEvent
                ) => {

                    if (
                        !isInsideList
                    ) {
                        return;
                    }


                    const rect =
                        list.getBoundingClientRect();


                    const cardWidth =
                        preview.offsetWidth ||
                        330;


                    const cardHeight =
                        preview.offsetHeight ||
                        280;


                    const gap = 28;


                    let x =
                        event.clientX +
                        gap;


                    let y =
                        event.clientY +
                        gap;


                    /* --------------------------------------------
                       HORIZONTAL BOUNDS
                    -------------------------------------------- */

                    if (
                        x +
                        cardWidth >
                        rect.right
                    ) {

                        x =
                            event.clientX -
                            cardWidth -
                            gap;

                    }


                    /* --------------------------------------------
                       VERTICAL BOUNDS
                    -------------------------------------------- */

                    if (
                        y +
                        cardHeight >
                        rect.bottom
                    ) {

                        y =
                            event.clientY -
                            cardHeight -
                            gap;

                    }


                    /* --------------------------------------------
                       FINAL CLAMP
                    -------------------------------------------- */

                    const minX =
                        rect.left;

                    const maxX =
                        Math.max(
                            rect.left,
                            rect.right -
                            cardWidth
                        );

                    const minY =
                        rect.top;

                    const maxY =
                        Math.max(
                            rect.top,
                            rect.bottom -
                            cardHeight
                        );


                    x =
                        Math.max(
                            minX,
                            Math.min(
                                x,
                                maxX
                            )
                        );


                    y =
                        Math.max(
                            minY,
                            Math.min(
                                y,
                                maxY
                            )
                        );


                    mouseX = x;
                    mouseY = y;

                };


            /* ====================================================
               SHOW PREVIEW
            ==================================================== */

            const showPreview =
                (
                    index: number,
                    event: PointerEvent
                ) => {

                    const data =
                        serviceData[index];


                    if (!data) {
                        return;
                    }


                    isInsideList =
                        true;


                    /* --------------------------------------------
                       POSITION
                    -------------------------------------------- */

                    handlePointerMove(
                        event
                    );


                    currentX =
                        mouseX;

                    currentY =
                        mouseY;


                    preview.style.left =
                        `${currentX}px`;

                    preview.style.top =
                        `${currentY}px`;


                    /* --------------------------------------------
                       UPDATE DATA
                    -------------------------------------------- */

                    previewNumber.textContent =
                        data.number;

                    previewTitle.textContent =
                        data.title;

                    previewIndex.textContent =
                        data.index;


                    /* --------------------------------------------
                       CHANGE SCENE
                    -------------------------------------------- */

                    scenes.forEach(
                        (
                            scene
                        ) => {

                            gsap.killTweensOf(
                                scene
                            );


                            gsap.set(
                                scene,
                                {
                                    opacity: 0,
                                    scale: 0.96,

                                    visibility:
                                        'hidden',
                                }
                            );


                            scene.classList.remove(
                                'is-active'
                            );

                        }
                    );


                    const activeScene =
                        scenes[index];


                    if (activeScene) {

                        activeIndex =
                            index;


                        activeScene.classList.add(
                            'is-active'
                        );


                        gsap.fromTo(
                            activeScene,
                            {
                                opacity: 0,
                                scale: 0.92,
                            },
                            {
                                opacity: 1,
                                scale: 1,

                                duration: 0.28,

                                ease:
                                    'power3.out',

                                onStart: () => {

                                    activeScene.style.visibility =
                                        'visible';

                                },
                            }
                        );

                    }


                    /* --------------------------------------------
                       SHOW CARD
                    -------------------------------------------- */

                    const isVisible =
                        preview.classList.contains(
                            'is-visible'
                        );


                    if (!isVisible) {

                        preview.classList.add(
                            'is-visible'
                        );


                        gsap.killTweensOf(
                            preview
                        );


                        gsap.fromTo(
                            preview,
                            {
                                opacity: 0,
                                scale: 0.86,
                                rotation: -3,
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                rotation: 0,

                                duration: 0.3,

                                ease:
                                    'power3.out',
                            }
                        );

                    } else {

                        /*
                         * Do not recreate the card animation
                         * when switching between services.
                         */

                        gsap.to(
                            preview,
                            {
                                scale: 1,
                                rotation: 0,

                                duration: 0.2,

                                ease:
                                    'power2.out',

                                overwrite:
                                    'auto',
                            }
                        );

                    }

                };


            /* ====================================================
               HIDE PREVIEW
            ==================================================== */

            const hidePreview =
                () => {

                    isInsideList =
                        false;

                    activeIndex =
                        -1;


                    preview.classList.remove(
                        'is-visible'
                    );


                    gsap.killTweensOf(
                        preview
                    );


                    gsap.to(
                        preview,
                        {
                            opacity: 0,

                            scale: 0.88,

                            rotation: -3,

                            duration: 0.22,

                            ease:
                                'power2.out',

                            overwrite:
                                'auto',
                        }
                    );


                    /* --------------------------------------------
                       Hide all scenes cleanly
                    -------------------------------------------- */

                    scenes.forEach(
                        (
                            scene
                        ) => {

                            gsap.killTweensOf(
                                scene
                            );


                            gsap.to(
                                scene,
                                {
                                    opacity: 0,

                                    scale: 0.96,

                                    duration: 0.16,

                                    ease:
                                        'power2.out',

                                    overwrite:
                                        'auto',

                                    onComplete: () => {

                                        scene.style.visibility =
                                            'hidden';

                                        scene.classList.remove(
                                            'is-active'
                                        );

                                    },

                                }
                            );

                        }
                    );

                };


            /* ====================================================
               LIST ENTER
            ==================================================== */

            const handleListEnter =
                (
                    event: PointerEvent
                ) => {

                    isInsideList =
                        true;


                    handlePointerMove(
                        event
                    );

                };


            /* ====================================================
               LIST MOVE
            ==================================================== */

            const handleListMove =
                (
                    event: PointerEvent
                ) => {

                    if (
                        !isInsideList
                    ) {
                        return;
                    }


                    handlePointerMove(
                        event
                    );

                };


            /* ====================================================
               LIST LEAVE
            ==================================================== */

            const handleListLeave =
                () => {

                    hidePreview();

                };


            /* ====================================================
               ITEM EVENTS
               
               Store handlers so every listener can be removed
               during cleanup.
            ==================================================== */

            const itemHandlers:
                Array<{
                    item: HTMLElement;
                    enter: (
                        event: PointerEvent
                    ) => void;
                    move: (
                        event: PointerEvent
                    ) => void;
                }> = [];


            items.forEach(
                (
                    item,
                    index
                ) => {

                    const handleEnter =
                        (
                            event: PointerEvent
                        ) => {

                            showPreview(
                                index,
                                event
                            );

                        };


                    const handleMove =
                        (
                            event: PointerEvent
                        ) => {

                            if (
                                !isInsideList
                            ) {
                                return;
                            }


                            handlePointerMove(
                                event
                            );

                        };


                    item.addEventListener(
                        'pointerenter',
                        handleEnter
                    );


                    item.addEventListener(
                        'pointermove',
                        handleMove
                    );


                    itemHandlers.push(
                        {
                            item,
                            enter:
                                handleEnter,
                            move:
                                handleMove,
                        }
                    );

                }
            );


            /* ====================================================
               LIST EVENTS
            ==================================================== */

            list.addEventListener(
                'pointerenter',
                handleListEnter
            );

            list.addEventListener(
                'pointermove',
                handleListMove
            );

            list.addEventListener(
                'pointerleave',
                handleListLeave
            );


            /* ====================================================
               INITIAL RESET
               
               Ensures HMR / React remount doesn't leave an old
               preview state behind.
            ==================================================== */

            activeIndex = -1;

            isInsideList = false;

            preview.classList.remove(
                'is-visible'
            );


            scenes.forEach(
                (
                    scene
                ) => {

                    gsap.set(
                        scene,
                        {
                            opacity: 0,
                            scale: 0.96,
                            visibility:
                                'hidden',
                        }
                    );

                    scene.classList.remove(
                        'is-active'
                    );

                }
            );


            /* ====================================================
               REFRESH
            ==================================================== */

            requestAnimationFrame(
                () => {

                    ScrollTrigger.refresh();

                }
            );


            /* ====================================================
               CLEANUP
            ==================================================== */

            return () => {

                /* ----------------------------------------------
                   RAF
                ---------------------------------------------- */

                cancelAnimationFrame(
                    animationFrame
                );


                /* ----------------------------------------------
                   LISTENERS
                ---------------------------------------------- */

                list.removeEventListener(
                    'pointerenter',
                    handleListEnter
                );

                list.removeEventListener(
                    'pointermove',
                    handleListMove
                );

                list.removeEventListener(
                    'pointerleave',
                    handleListLeave
                );


                itemHandlers.forEach(
                    ({
                        item,
                        enter,
                        move,
                    }) => {

                        item.removeEventListener(
                            'pointerenter',
                            enter
                        );

                        item.removeEventListener(
                            'pointermove',
                            move
                        );

                    }
                );


                /* ----------------------------------------------
                   GSAP
                ---------------------------------------------- */

                gsap.killTweensOf(
                    preview
                );

                gsap.killTweensOf(
                    scenes
                );

                gsap.killTweensOf(
                    reveal
                );


                /* ----------------------------------------------
                   PREVIEW RESET
                ---------------------------------------------- */

                preview.classList.remove(
                    'is-visible'
                );

                preview.style.pointerEvents =
                    'none';

                preview.style.left = '';

                preview.style.top = '';


                scenes.forEach(
                    (
                        scene
                    ) => {

                        scene.classList.remove(
                            'is-active'
                        );

                    }
                );

            };

        }, section);


    /* =========================================================
       FINAL CLEANUP
    ========================================================= */

    return () => {

        ctx.revert();

    };
};