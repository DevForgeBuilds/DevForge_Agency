import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const blueprintRef = useRef<HTMLDivElement | null>(null);
    const particlesRef = useRef<HTMLDivElement | null>(null);
    const processRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const hero = heroRef.current;
        const title = titleRef.current;
        const cursor = cursorRef.current;
        const blueprint = blueprintRef.current;
        const particles = particlesRef.current;
        const process = processRef.current;

        if (
            !hero ||
            !title ||
            !cursor ||
            !blueprint ||
            !particles
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            /* =====================================================
               ELEMENTS
            ===================================================== */

            const words =
                title.querySelectorAll<HTMLElement>(
                    '.hero__word'
                );

            const letters =
                title.querySelectorAll<HTMLElement>(
                    '.hero__letter'
                );

            /* =====================================================
               INTRO ANIMATION
            ===================================================== */

            gsap.set(words, {
                yPercent: 115,
                opacity: 0,
            });

            gsap.set(
                [
                    '.hero__eyebrow',
                    '.hero__description',
                    '.hero__actions',
                    '.hero__meta',
                ],
                {
                    opacity: 0,
                    y: 24,
                }
            );

            gsap.set(blueprint, {
                opacity: 0,
                scale: 0.84,
                x: 50,
                rotate: -2,
            });

            gsap.set(process, {
                y: 40,
                opacity: 0,
            });

            const intro = gsap.timeline({
                delay: 0.15,
            });

            intro
                .to(words, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.15,
                    stagger: 0.12,
                    ease: 'power4.out',
                })
                .to(
                    '.hero__eyebrow',
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                    },
                    '-=0.7'
                )
                .to(
                    '.hero__description',
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.55,
                        ease: 'power3.out',
                    },
                    '-=0.3'
                )
                .to(
                    '.hero__actions',
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                    },
                    '-=0.3'
                )
                .to(
                    '.hero__meta',
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        ease: 'power3.out',
                    },
                    '-=0.25'
                )
                .to(
                    blueprint,
                    {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        rotate: 0,
                        duration: 1.15,
                        ease: 'power4.out',
                    },
                    '-=0.75'
                );

            /* =====================================================
               POINTER STATE
            ===================================================== */

            const pointer = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                targetX: window.innerWidth / 2,
                targetY: window.innerHeight / 2,
                active: false,
            };

            let waveTime = 0;
            let animationFrame = 0;

            /* =====================================================
               CURSOR MOVE
            ===================================================== */

            const handlePointerMove = (
                event: PointerEvent
            ) => {
                pointer.targetX = event.clientX;
                pointer.targetY = event.clientY;

                pointer.active = true;
            };

            const handlePointerEnter = () => {
                pointer.active = true;
            };

            const handlePointerLeave = () => {
                pointer.active = false;
            };

            hero.addEventListener(
                'pointermove',
                handlePointerMove
            );

            hero.addEventListener(
                'pointerenter',
                handlePointerEnter
            );

            hero.addEventListener(
                'pointerleave',
                handlePointerLeave
            );

            /* =====================================================
               LIQUID WAVE ENGINE
            ===================================================== */

            const animateLiquidWave = () => {
                pointer.x +=
                    (pointer.targetX - pointer.x) *
                    0.11;

                pointer.y +=
                    (pointer.targetY - pointer.y) *
                    0.11;

                waveTime += 0.045;

                /* ---------------------------------------------
                   Cursor glow
                --------------------------------------------- */

                const heroRect =
                    hero.getBoundingClientRect();

                const localX =
                    pointer.x - heroRect.left;

                const localY =
                    pointer.y - heroRect.top;

                gsap.set(cursor, {
                    x:
                        localX -
                        heroRect.width / 2,
                    y:
                        localY -
                        heroRect.height / 2,
                });

                /* ---------------------------------------------
                   Blueprint parallax
                --------------------------------------------- */

                const normalizedX =
                    (localX / heroRect.width - 0.5) * 2;

                const normalizedY =
                    (localY / heroRect.height - 0.5) * 2;

                gsap.set(blueprint, {
                    x: normalizedX * -18,
                    y: normalizedY * -12,
                    rotateX: normalizedY * -2.5,
                    rotateY: normalizedX * 3,
                });

                /* ---------------------------------------------
                   Background grid parallax
                --------------------------------------------- */

                const grid =
                    hero.querySelector<HTMLElement>(
                        '.hero__grid'
                    );

                if (grid) {
                    gsap.set(grid, {
                        x: normalizedX * -8,
                        y: normalizedY * -6,
                    });
                }

                /* ---------------------------------------------
                   TEXT LIQUID RIPPLE
                --------------------------------------------- */

                letters.forEach((letter) => {
                    const rect =
                        letter.getBoundingClientRect();

                    const centerX =
                        rect.left +
                        rect.width / 2;

                    const centerY =
                        rect.top +
                        rect.height / 2;

                    const dx =
                        centerX - pointer.x;

                    const dy =
                        centerY - pointer.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    /*
                     * Bigger = wider water field.
                     */
                    const radius = 245;

                    if (
                        pointer.active &&
                        distance < radius
                    ) {
                        /*
                         * Smooth radial influence.
                         */
                        const normalizedDistance =
                            distance / radius;

                        const influence =
                            Math.pow(
                                1 -
                                normalizedDistance,
                                2
                            );

                        /*
                         * The ripple travels outward.
                         */
                        const phase =
                            distance * 0.052 -
                            waveTime * 5.5;

                        /*
                         * Main vertical wave.
                         */
                        const verticalWave =
                            Math.sin(phase) *
                            influence *
                            25;

                        /*
                         * Secondary horizontal wave.
                         */
                        const horizontalWave =
                            Math.cos(
                                phase * 0.72
                            ) *
                            influence *
                            9;

                        /*
                         * Slight circular movement.
                         */
                        const orbitalX =
                            Math.cos(
                                phase * 0.5
                            ) *
                            influence *
                            4;

                        /*
                         * Rotation follows the wave.
                         */
                        const rotation =
                            Math.sin(
                                phase
                            ) *
                            influence *
                            5.5;

                        /*
                         * Liquid stretching.
                         */
                        const scaleX =
                            1 +
                            Math.cos(
                                phase * 0.8
                            ) *
                            influence *
                            0.055;

                        const scaleY =
                            1 +
                            Math.sin(
                                phase + 1
                            ) *
                            influence *
                            0.09;

                        /*
                         * Fade tiny distortion on
                         * very distant letters.
                         */
                        const opacity =
                            1 -
                            influence * 0.03;

                        gsap.set(letter, {
                            x:
                                horizontalWave +
                                orbitalX,
                            y: verticalWave,
                            rotation,
                            scaleX,
                            scaleY,
                            opacity,
                        });
                    } else {
                        /*
                         * Smooth return.
                         */
                        gsap.to(letter, {
                            x: 0,
                            y: 0,
                            rotation: 0,
                            scaleX: 1,
                            scaleY: 1,
                            opacity: 1,
                            duration: 0.55,
                            ease: 'power3.out',
                            overwrite: true,
                        });
                    }
                });

                /* ---------------------------------------------
                   PARTICLES
                --------------------------------------------- */

                const particleNodes =
                    particles.querySelectorAll<HTMLElement>(
                        '.hero__particle'
                    );

                particleNodes.forEach(
                    (particle, index) => {
                        const depth =
                            3 +
                            (index % 5) * 3;

                        const px =
                            normalizedX * depth;

                        const py =
                            normalizedY * depth;

                        gsap.set(particle, {
                            x: px,
                            y: py,
                        });
                    }
                );

                animationFrame =
                    requestAnimationFrame(
                        animateLiquidWave
                    );
            };

            animationFrame =
                requestAnimationFrame(
                    animateLiquidWave
                );

            /* =====================================================
               CLICK RIPPLE
            ===================================================== */

            const handleClick = (
                event: MouseEvent
            ) => {
                const rect =
                    hero.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const ripple =
                    document.createElement(
                        'span'
                    );

                ripple.className =
                    'hero__click-ripple';

                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                hero.appendChild(ripple);

                gsap.fromTo(
                    ripple,
                    {
                        width: 0,
                        height: 0,
                        opacity: 0.7,
                    },
                    {
                        width: 420,
                        height: 420,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        onComplete: () => {
                            ripple.remove();
                        },
                    }
                );
            };

            hero.addEventListener(
                'click',
                handleClick
            );

            /* =====================================================
               SCROLL TRANSITION
            ===================================================== */

            const scrollTrigger =
                ScrollTrigger.create({
                    trigger: hero,
                    start: 'top top',
                    end: '+=110%',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,

                    onUpdate: (self) => {
                        const progress =
                            self.progress;

                        /*
                         * Typography moves upward
                         * and becomes tighter.
                         */
                        gsap.set(
                            '.hero__title-inner',
                            {
                                y:
                                    -progress *
                                    165,
                                scale:
                                    1 -
                                    progress *
                                    0.2,
                            }
                        );

                        /*
                         * Blueprint exits toward
                         * the right.
                         */
                        gsap.set(
                            '.hero__blueprint',
                            {
                                x:
                                    progress *
                                    130,
                                rotate:
                                    progress * 5,
                                scale:
                                    1 -
                                    progress *
                                    0.17,
                                opacity:
                                    1 -
                                    progress *
                                    0.85,
                            }
                        );

                        /*
                         * Copy fades.
                         */
                        gsap.set(
                            '.hero__copy',
                            {
                                y:
                                    -progress *
                                    80,
                                opacity:
                                    1 -
                                    progress *
                                    0.85,
                            }
                        );

                        /*
                         * Process strip enters.
                         */
                        gsap.set(
                            process,
                            {
                                y:
                                    40 -
                                    progress *
                                    40,
                                opacity:
                                    progress,
                            }
                        );

                        hero.style.setProperty(
                            '--hero-progress',
                            String(progress)
                        );
                    },
                });

            /* =====================================================
               CLEANUP
            ===================================================== */

            return () => {
                cancelAnimationFrame(
                    animationFrame
                );

                hero.removeEventListener(
                    'pointermove',
                    handlePointerMove
                );

                hero.removeEventListener(
                    'pointerenter',
                    handlePointerEnter
                );

                hero.removeEventListener(
                    'pointerleave',
                    handlePointerLeave
                );

                hero.removeEventListener(
                    'click',
                    handleClick
                );

                scrollTrigger.kill();
            };
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="hero"
        >
            {/* =================================================
                BACKGROUND GRID
            ================================================= */}

            <div
                className="hero__grid"
                aria-hidden="true"
            />

            {/* =================================================
                CURSOR / LIQUID FIELD
            ================================================= */}

            <div
                ref={cursorRef}
                className="hero__cursor-field"
                aria-hidden="true"
            >
                <span className="hero__cursor-core" />

                <span className="hero__cursor-ring hero__cursor-ring--1" />
                <span className="hero__cursor-ring hero__cursor-ring--2" />
                <span className="hero__cursor-ring hero__cursor-ring--3" />
            </div>

            {/* =================================================
                PARTICLES
            ================================================= */}

            <div
                ref={particlesRef}
                className="hero__particles"
                aria-hidden="true"
            >
                {Array.from({
                    length: 42,
                }).map((_, index) => (
                    <span
                        key={index}
                        className="hero__particle"
                        style={{
                            left: `${12 +
                                ((index * 19) %
                                    76)
                                }%`,
                            top: `${10 +
                                ((index * 29) %
                                    76)
                                }%`,
                            animationDelay: `${index * -0.17
                                }s`,
                        }}
                    />
                ))}
            </div>

            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <div className="hero__container">
                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div className="hero__copy">
                    <div className="hero__eyebrow">
                        <span className="hero__eyebrow-dot" />

                        Creative Development Studio
                    </div>

                    {/* =================================================
                        LIQUID TYPOGRAPHY
                    ================================================= */}

                    <div
                        ref={titleRef}
                        className="hero__title"
                    >
                        <div className="hero__title-inner">
                            {/* WE FORGE */}

                            <span className="hero__word">
                                {'WE FORGE'
                                    .split('')
                                    .map(
                                        (
                                            char,
                                            index
                                        ) => (
                                            <span
                                                key={`forge-${index}`}
                                                className="hero__letter"
                                            >
                                                {char ===
                                                    ' '
                                                    ? '\u00A0'
                                                    : char}
                                            </span>
                                        )
                                    )}
                            </span>

                            {/* DIGITAL */}

                            <span className="hero__word hero__word--green">
                                {'DIGITAL'
                                    .split('')
                                    .map(
                                        (
                                            char,
                                            index
                                        ) => (
                                            <span
                                                key={`digital-${index}`}
                                                className="hero__letter"
                                            >
                                                {char}
                                            </span>
                                        )
                                    )}
                            </span>

                            {/* PRODUCTS */}

                            <span className="hero__word">
                                {'PRODUCTS'
                                    .split('')
                                    .map(
                                        (
                                            char,
                                            index
                                        ) => (
                                            <span
                                                key={`products-${index}`}
                                                className="hero__letter"
                                            >
                                                {char}
                                            </span>
                                        )
                                    )}

                                <span className="hero__dot">
                                    .
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p className="hero__description">
                        We design, build and launch
                        digital products that turn
                        ambitious ideas into meaningful
                        experiences.
                    </p>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="hero__actions">
                        <a
                            href="#contact"
                            className="hero__primary"
                        >
                            Start a project

                            <span>
                                ↗
                            </span>
                        </a>

                        <a
                            href="#selected-work"
                            className="hero__secondary"
                        >
                            View our work

                            <span>
                                →
                            </span>
                        </a>
                    </div>

                    {/* =================================================
                        META
                    ================================================= */}

                    <div className="hero__meta">
                        <span>
                            BUILD
                        </span>

                        <i />

                        <span>
                            CODE
                        </span>

                        <i />

                        <span>
                            LAUNCH
                        </span>

                        <strong>
                            01 / 05
                        </strong>
                    </div>
                </div>

                {/* =================================================
                    BLUEPRINT
                ================================================= */}

                <div
                    ref={blueprintRef}
                    className="hero__blueprint"
                >
                    <div className="hero__blueprint-label">
                        SYSTEM / 001
                    </div>

                    <div className="hero__blueprint-coordinate">
                        <span>●</span>

                        CURSOR X
                        <b>0642</b>

                        <br />

                        <span>●</span>

                        CURSOR Y
                        <b>0318</b>

                        <br />

                        <em>—</em>
                    </div>

                    <div className="hero__blueprint-grid" />

                    <svg
                        className="hero__df-svg"
                        viewBox="0 0 500 500"
                        fill="none"
                        aria-hidden="true"
                    >
                        {/* =========================
        D — FRAGMENTED
    ========================= */}

                        <path
                            className="df-segment df-segment--1"
                            d="M85 75V425"
                        />

                        <path
                            className="df-segment df-segment--2"
                            d="M85 75H195"
                        />

                        <path
                            className="df-segment df-segment--3"
                            d="M195 75C285 75 335 140 335 250"
                        />

                        <path
                            className="df-segment df-segment--4"
                            d="M335 250C335 360 285 425 195 425H85"
                        />

                        {/* D inner broken construction */}

                        <path
                            className="df-detail"
                            d="M125 120V380"
                        />

                        <path
                            className="df-detail"
                            d="M125 120H190"
                        />

                        <path
                            className="df-detail"
                            d="M190 120C245 120 285 170 285 250"
                        />

                        <path
                            className="df-detail"
                            d="M285 250C285 330 245 380 190 380H125"
                        />


                        {/* =========================
        F — FRAGMENTED
    ========================= */}

                        <path
                            className="df-segment df-segment--5"
                            d="M285 75H425"
                        />

                        <path
                            className="df-segment df-segment--6"
                            d="M285 75V425"
                        />

                        <path
                            className="df-segment df-segment--7"
                            d="M285 250H405"
                        />

                        {/* F broken details */}

                        <path
                            className="df-detail"
                            d="M325 115H425"
                        />

                        <path
                            className="df-detail"
                            d="M325 250H395"
                        />


                        {/* =========================
        FLOATING FRAGMENTS
    ========================= */}

                        <path
                            className="df-fragment df-fragment--1"
                            d="M55 145H72"
                        />

                        <path
                            className="df-fragment df-fragment--2"
                            d="M55 355H72"
                        />

                        <path
                            className="df-fragment df-fragment--3"
                            d="M350 110L365 100"
                        />

                        <path
                            className="df-fragment df-fragment--4"
                            d="M350 390L365 400"
                        />

                        <path
                            className="df-fragment df-fragment--5"
                            d="M420 215H442"
                        />

                        <path
                            className="df-fragment df-fragment--6"
                            d="M420 285H442"
                        />


                        {/* =========================
        TECHNICAL NODES
    ========================= */}

                        <circle className="df-node" cx="85" cy="75" r="5" />
                        <circle className="df-node" cx="85" cy="425" r="5" />

                        <circle className="df-node" cx="195" cy="75" r="4" />
                        <circle className="df-node" cx="335" cy="250" r="5" />
                        <circle className="df-node" cx="195" cy="425" r="4" />

                        <circle className="df-node" cx="285" cy="75" r="5" />
                        <circle className="df-node" cx="425" cy="75" r="4" />

                        <circle className="df-node" cx="285" cy="250" r="5" />
                        <circle className="df-node" cx="405" cy="250" r="4" />
                        <circle className="df-node" cx="285" cy="425" r="5" />


                        {/* =========================
        CENTER TARGET
    ========================= */}

                        <circle
                            className="df-target"
                            cx="250"
                            cy="250"
                            r="8"
                        />

                        <circle
                            className="df-target-inner"
                            cx="250"
                            cy="250"
                            r="2"
                        />

                        <path
                            className="df-crosshair"
                            d="
            M250 232V242
            M250 258V268
            M232 250H242
            M258 250H268
        "
                        />
                    </svg>

                    {/* Blueprint status */}

                    <div className="hero__blueprint-status">
                        <span>
                            ●
                        </span>

                        CURSOR ACTIVE

                        <b>
                            MOVE TO EXPLORE
                        </b>
                    </div>

                    <div className="hero__blueprint-side">
                        DEVFORGE
                        <br />
                        DIGITAL SYSTEM
                    </div>
                </div>

                {/* =================================================
                    SCROLL INDICATOR
                ================================================= */}

                <div className="hero__scroll">
                    <span>
                        SCROLL TO EXPLORE
                    </span>

                    <b>
                        ↓
                    </b>
                </div>
            </div>

            {/* =================================================
                PROCESS STRIP
            ================================================= */}

            <div
                ref={processRef}
                className="hero__process"
            >
                <div className="hero__process-label">
                    <span />

                    OUR PROCESS
                </div>

                <div className="hero__process-items">
                    <div>
                        <strong>
                            01
                        </strong>

                        <b>
                            IDEA
                        </b>

                        <span>
                            Strategy
                        </span>
                    </div>

                    <i>
                        →
                    </i>

                    <div>
                        <strong>
                            02
                        </strong>

                        <b>
                            DESIGN
                        </b>

                        <span>
                            Experience
                        </span>
                    </div>

                    <i>
                        →
                    </i>

                    <div>
                        <strong>
                            03
                        </strong>

                        <b>
                            CODE
                        </b>

                        <span>
                            Development
                        </span>
                    </div>

                    <i>
                        →
                    </i>

                    <div>
                        <strong>
                            04
                        </strong>

                        <b>
                            LAUNCH
                        </b>

                        <span>
                            Growth
                        </span>
                    </div>

                    <div className="hero__process-cta">
                        <span>
                            ↗
                        </span>

                        LET'S BUILD
                        <br />
                        TOGETHER
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;