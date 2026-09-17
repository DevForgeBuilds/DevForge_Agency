import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ForgeCollision.css';

gsap.registerPlugin(ScrollTrigger);

const SPARKS = [
    { a: -170, d: 100 },
    { a: -145, d: 135 },
    { a: -120, d: 95 },
    { a: -95, d: 125 },
    { a: -65, d: 105 },
    { a: -40, d: 135 },
    { a: -18, d: 100 },
    { a: 18, d: 115 },
    { a: 42, d: 140 },
    { a: 68, d: 100 },
    { a: 94, d: 130 },
    { a: 120, d: 100 },
    { a: 145, d: 135 },
    { a: 170, d: 100 },
];

const ForgeCollision = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    const devRef = useRef<HTMLDivElement | null>(null);
    const forgeRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useRef<HTMLDivElement | null>(null);

    const impactRef = useRef<HTMLDivElement | null>(null);
    const flashRef = useRef<HTMLDivElement | null>(null);
    const sparksRef = useRef<HTMLDivElement | null>(null);

    const productRef = useRef<HTMLDivElement | null>(null);
    const wireSvgRef = useRef<SVGSVGElement | null>(null);

    const labelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const dev = devRef.current;
            const forge = forgeRef.current;
            const merged = mergedRef.current;
            const impact = impactRef.current;
            const flash = flashRef.current;
            const sparks = sparksRef.current;
            const product = productRef.current;
            const svg = wireSvgRef.current;
            const label = labelRef.current;

            if (
                !dev ||
                !forge ||
                !merged ||
                !impact ||
                !flash ||
                !sparks ||
                !product ||
                !svg ||
                !label
            ) {
                return;
            }

            const lines = Array.from(
                svg.querySelectorAll<SVGElement>('.forge-wire')
            );

            const accents = Array.from(
                svg.querySelectorAll<SVGElement>(
                    '.forge-wire--accent'
                )
            );

            const floatingElements = Array.from(
                product.querySelectorAll<HTMLElement>(
                    '.forge-product__floating'
                )
            );

            const sparkElements = Array.from(
                sparks.querySelectorAll<HTMLElement>(
                    '.forge-spark'
                )
            );

            /*
             * ------------------------------------------------------
             * SVG DRAW SETUP
             * ------------------------------------------------------
             */

            lines.forEach((line) => {
                const geometry = line as SVGGeometryElement;

                if (
                    typeof geometry.getTotalLength ===
                    'function'
                ) {
                    try {
                        const length =
                            geometry.getTotalLength();

                        gsap.set(line, {
                            opacity: 1,
                            strokeDasharray:
                                `${length} ${length}`,
                            strokeDashoffset: length,
                        });
                    } catch {
                        gsap.set(line, {
                            opacity: 1,
                        });
                    }
                } else {
                    gsap.set(line, {
                        opacity: 1,
                    });
                }
            });

            /*
             * ------------------------------------------------------
             * INITIAL
             * ------------------------------------------------------
             */

            gsap.set(dev, {
                x: '-65vw',
                opacity: 0,
            });

            gsap.set(forge, {
                x: '65vw',
                opacity: 0,
            });

            gsap.set(merged, {
                scale: 0.65,
                opacity: 0,
            });

            gsap.set(impact, {
                scale: 0,
                opacity: 0,
            });

            gsap.set(flash, {
                scale: 0,
                opacity: 0,
            });

            gsap.set(sparkElements, {
                scale: 0,
                opacity: 0,
                x: 0,
                y: 0,
            });

            gsap.set(product, {
                opacity: 0,
                scale: 0.72,
                y: 40,
                rotateX: 8,
                rotateY: -7,
                transformOrigin: '50% 50%',
            });

            gsap.set(floatingElements, {
                opacity: 0,
                scale: 0.65,
            });

            gsap.set(label, {
                opacity: 0,
                y: 25,
            });

            /*
             * ------------------------------------------------------
             * MAIN TIMELINE
             * ------------------------------------------------------
             */

            const tl = gsap.timeline({
                paused: true,
            });

            /*
             * DEV ENTER
             */

            tl.to(dev, {
                x: '-42vw',
                opacity: 1,
                duration: 0.72,
                ease: 'power4.out',
            });

            /*
             * FORGE ENTER
             */

            tl.to(
                forge,
                {
                    x: '42vw',
                    opacity: 1,
                    duration: 0.72,
                    ease: 'power4.out',
                },
                '<'
            );

            /*
             * HOLD
             */

            tl.to({}, {
                duration: 0.2,
            });

            /*
             * APPROACH
             */

            tl.to(dev, {
                x: '-15vw',
                duration: 0.65,
                ease: 'power4.inOut',
            });

            tl.to(
                forge,
                {
                    x: '15vw',
                    duration: 0.65,
                    ease: 'power4.inOut',
                },
                '<'
            );

            /*
             * FINAL APPROACH
             */

            tl.to(dev, {
                x: '-3vw',
                scale: 0.97,
                duration: 0.3,
                ease: 'power4.in',
            });

            tl.to(
                forge,
                {
                    x: '3vw',
                    scale: 0.97,
                    duration: 0.3,
                    ease: 'power4.in',
                },
                '<'
            );

            /*
             * IMPACT
             */

            tl.to(dev, {
                x: 0,
                opacity: 0,
                duration: 0.12,
                ease: 'power3.in',
            });

            tl.to(
                forge,
                {
                    x: 0,
                    opacity: 0,
                    duration: 0.12,
                    ease: 'power3.in',
                },
                '<'
            );

            /*
             * FLASH
             */

            tl.to(
                flash,
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.05,
                },
                '<'
            );

            tl.to(
                impact,
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.05,
                },
                '<'
            );

            /*
             * MERGED
             */

            tl.to(
                merged,
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.22,
                    ease: 'back.out(1.7)',
                },
                '<'
            );

            /*
             * FLASH OUT
             */

            tl.to(
                flash,
                {
                    scale: 4,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                }
            );

            tl.to(
                impact,
                {
                    scale: 5,
                    opacity: 0,
                    duration: 0.28,
                    ease: 'power3.out',
                },
                '<'
            );

            /*
             * SPARKS
             */

            sparkElements.forEach((spark, index) => {
                const data = SPARKS[index];
                if (!data) return;

                const radians =
                    data.a * Math.PI / 180;

                const x =
                    Math.cos(radians) * data.d;

                const y =
                    Math.sin(radians) * data.d;

                tl.to(
                    spark,
                    {
                        x,
                        y,
                        scale: 1,
                        opacity: 1,
                        duration: 0.08,
                        ease: 'power3.out',
                    },
                    '<'
                );

                tl.to(
                    spark,
                    {
                        x: x * 1.35,
                        y: y * 1.35,
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power3.out',
                    },
                    '<0.05'
                );
            });

            /*
             * MERGED HOLD
             */

            tl.to(merged, {
                scale: 1.04,
                duration: 0.16,
                ease: 'power2.out',
            });

            /*
             * MERGED OUT
             */

            tl.to(merged, {
                scale: 1.15,
                opacity: 0,
                duration: 0.22,
                ease: 'power3.in',
            });

            /*
             * ------------------------------------------------------
             * PRODUCT UI ENTER
             * ------------------------------------------------------
             */

            tl.to(product, {
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.65,
                ease: 'power4.out',
            });

            /*
             * ------------------------------------------------------
             * DRAW WIREFRAME
             * ------------------------------------------------------
             */

            if (lines.length) {
                tl.to(
                    lines,
                    {
                        strokeDashoffset: 0,
                        duration: 1.15,
                        stagger: {
                            each: 0.025,
                            from: 'start',
                        },
                        ease: 'power2.out',
                    },
                    '-=0.15'
                );
            }

            /*
             * ------------------------------------------------------
             * ACCENT REVEAL
             * ------------------------------------------------------
             */

            tl.fromTo(
                accents,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration: 0.35,
                    stagger: 0.04,
                    ease: 'power3.out',
                },
                '-=0.3'
            );

            /*
             * ------------------------------------------------------
             * FLOATING MODULES
             * ------------------------------------------------------
             */

            if (floatingElements.length) {
                tl.to(
                    floatingElements,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'back.out(1.5)',
                    },
                    '-=0.35'
                );
            }

            /*
             * ------------------------------------------------------
             * PRODUCT PULSE
             * ------------------------------------------------------
             */

            tl.to(product, {
                scale: 1.018,
                duration: 0.16,
                ease: 'power2.out',
            });

            tl.to(product, {
                scale: 1,
                duration: 0.3,
                ease: 'power3.out',
            });

            /*
             * ------------------------------------------------------
             * LABEL
             * ------------------------------------------------------
             */

            tl.to(
                label,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: 'power3.out',
                },
                '-=0.15'
            );

            /*
             * ------------------------------------------------------
             * FINAL GUARANTEED STATE
             * ------------------------------------------------------
             */

            tl.set(product, {
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
            });

            tl.set(lines, {
                opacity: 1,
                strokeDashoffset: 0,
            });

            tl.set(accents, {
                opacity: 1,
            });

            tl.to({}, {
                duration: 0.8,
            });

            /*
             * ------------------------------------------------------
             * SCROLL
             * ------------------------------------------------------
             */

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: '+=260%',
                pin: true,
                pinSpacing: true,
                scrub: 0.75,
                animation: tl,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                fastScrollEnd: false,
                preventOverlaps: true,
            });

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });

        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="forge-collision"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <div className="forge-collision__meta">

                <span>
                    03 / THE FORGE
                </span>

                <span>
                    DEV × FORGE / 001
                </span>

                <span>
                    DIGITAL PRODUCT
                </span>

            </div>


            {/* =================================================
                MAIN STAGE
            ================================================= */}

            <div className="forge-collision__stage">

                {/* DEV */}

                <div
                    ref={devRef}
                    className="
                        forge-collision__word
                        forge-collision__word--dev
                    "
                >
                    DEV
                </div>


                {/* FORGE */}

                <div
                    ref={forgeRef}
                    className="
                        forge-collision__word
                        forge-collision__word--forge
                    "
                >
                    FORGE
                </div>


                {/* MERGED */}

                <div
                    ref={mergedRef}
                    className="
                        forge-collision__merged
                    "
                >
                    <span>DEV</span>
                    <span>FORGE</span>
                </div>


                {/* IMPACT */}

                <div
                    ref={impactRef}
                    className="forge-collision__impact"
                />


                <div
                    ref={flashRef}
                    className="forge-collision__flash"
                />


                {/* SPARKS */}

                <div
                    ref={sparksRef}
                    className="forge-collision__sparks"
                >
                    {SPARKS.map((_, index) => (
                        <span
                            key={index}
                            className="forge-spark"
                        />
                    ))}
                </div>


                {/* =================================================
                    PRODUCT WIREFRAME
                ================================================= */}

                <div
                    ref={productRef}
                    className="forge-product"
                >

                    {/* FLOATING LEFT NODE */}

                    <div
                        className="
                            forge-product__floating
                            forge-product__floating--left
                        "
                    >

                        <div className="forge-floating-node">

                            <div className="forge-node-grid" />

                            <div className="forge-node-core">
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>

                            <small>
                                SYSTEM / 01
                            </small>

                        </div>

                    </div>


                    {/* FLOATING RIGHT CODE */}

                    <div
                        className="
                            forge-product__floating
                            forge-product__floating--right
                        "
                    >

                        <div className="forge-code-panel">

                            <div className="forge-code-panel__head">
                                <span />
                                <span />
                                <span />

                                <b>
                                    FORGE / CORE
                                </b>
                            </div>

                            <div className="forge-code-lines">

                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />

                            </div>

                            <div className="forge-code-status">
                                <span />
                                SYSTEM ONLINE
                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        SVG
                    ================================================= */}

                    <svg
                        ref={wireSvgRef}
                        className="
                            forge-product__svg
                        "
                        viewBox="0 0 1200 720"
                        fill="none"
                        aria-hidden="true"
                    >

                        {/* Outer Frame */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--frame
                            "
                            x="55"
                            y="45"
                            width="1090"
                            height="590"
                            rx="18"
                        />


                        {/* Top Bar */}

                        <line
                            className="forge-wire"
                            x1="55"
                            y1="115"
                            x2="1145"
                            y2="115"
                        />


                        {/* Browser dots */}

                        <circle
                            className="
                                forge-wire
                                forge-wire--red
                            "
                            cx="88"
                            cy="80"
                            r="8"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--orange
                            "
                            cx="114"
                            cy="80"
                            r="8"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            cx="140"
                            cy="80"
                            r="8"
                        />


                        {/* URL */}

                        <rect
                            className="forge-wire"
                            x="430"
                            y="64"
                            width="330"
                            height="32"
                            rx="16"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            cx="455"
                            cy="80"
                            r="5"
                        />


                        {/* Sidebar */}

                        <line
                            className="forge-wire"
                            x1="255"
                            y1="115"
                            x2="255"
                            y2="635"
                        />


                        {/* Logo */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--accent
                            "
                            x="85"
                            y="145"
                            width="120"
                            height="38"
                            rx="19"
                        />


                        {/* Sidebar heading */}

                        <line
                            className="forge-wire"
                            x1="85"
                            y1="215"
                            x2="180"
                            y2="215"
                        />


                        {/* Navigation */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            x="72"
                            y="235"
                            width="158"
                            height="42"
                            rx="6"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="256"
                            x2="180"
                            y2="256"
                        />


                        <line
                            className="forge-wire"
                            x1="100"
                            y1="300"
                            x2="190"
                            y2="300"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="335"
                            x2="170"
                            y2="335"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="370"
                            x2="195"
                            y2="370"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="405"
                            x2="165"
                            y2="405"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="440"
                            x2="185"
                            y2="440"
                        />


                        {/* Sidebar system */}

                        <rect
                            className="forge-wire"
                            x="82"
                            y="500"
                            width="145"
                            height="95"
                            rx="7"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            cx="104"
                            cy="525"
                            r="5"
                        />

                        <line
                            className="forge-wire"
                            x1="120"
                            y1="525"
                            x2="195"
                            y2="525"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="550"
                            x2="205"
                            y2="550"
                        />

                        <line
                            className="forge-wire"
                            x1="100"
                            y1="570"
                            x2="180"
                            y2="570"
                        />


                        {/* =================================================
                            HERO AREA
                        ================================================= */}

                        <line
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            x1="300"
                            y1="155"
                            x2="410"
                            y2="155"
                        />


                        <rect
                            className="forge-wire"
                            x="300"
                            y="185"
                            width="390"
                            height="24"
                            rx="4"
                        />

                        <rect
                            className="forge-wire"
                            x="300"
                            y="220"
                            width="315"
                            height="15"
                            rx="3"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            x="300"
                            y="265"
                            width="155"
                            height="45"
                            rx="22"
                        />


                        <rect
                            className="forge-wire"
                            x="470"
                            y="265"
                            width="145"
                            height="45"
                            rx="22"
                        />


                        {/* =================================================
                            PERFORMANCE
                        ================================================= */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            x="735"
                            y="145"
                            width="350"
                            height="190"
                            rx="10"
                        />


                        <line
                            className="forge-wire"
                            x1="760"
                            y1="175"
                            x2="875"
                            y2="175"
                        />


                        {/* Donut */}

                        <circle
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            cx="825"
                            cy="245"
                            r="50"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            cx="825"
                            cy="245"
                            r="37"
                        />


                        {/* Graph */}

                        <line
                            className="forge-wire"
                            x1="905"
                            y1="205"
                            x2="1050"
                            y2="205"
                        />

                        <line
                            className="forge-wire"
                            x1="905"
                            y1="245"
                            x2="1050"
                            y2="245"
                        />

                        <line
                            className="forge-wire"
                            x1="905"
                            y1="285"
                            x2="1050"
                            y2="285"
                        />

                        <polyline
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            points="
                                905 275
                                930 260
                                950 268
                                972 235
                                994 245
                                1018 215
                                1050 190
                            "
                        />


                        {/* =================================================
                            CATEGORY CARDS
                        ================================================= */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            x="300"
                            y="355"
                            width="180"
                            height="115"
                            rx="8"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--purple
                            "
                            x="495"
                            y="355"
                            width="180"
                            height="115"
                            rx="8"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--orange
                            "
                            x="690"
                            y="355"
                            width="180"
                            height="115"
                            rx="8"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            x="885"
                            y="355"
                            width="200"
                            height="115"
                            rx="8"
                        />


                        {/* Card icons */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            x="320"
                            y="380"
                            width="32"
                            height="32"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--purple
                            "
                            x="515"
                            y="380"
                            width="32"
                            height="32"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--orange
                            "
                            cx="725"
                            cy="396"
                            r="16"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            x="910"
                            y="380"
                            width="32"
                            height="32"
                            transform="rotate(45 926 396)"
                        />


                        {/* Card text */}

                        <line
                            className="forge-wire"
                            x1="370"
                            y1="390"
                            x2="445"
                            y2="390"
                        />

                        <line
                            className="forge-wire"
                            x1="370"
                            y1="410"
                            x2="430"
                            y2="410"
                        />

                        <line
                            className="forge-wire"
                            x1="565"
                            y1="390"
                            x2="640"
                            y2="390"
                        />

                        <line
                            className="forge-wire"
                            x1="565"
                            y1="410"
                            x2="625"
                            y2="410"
                        />

                        <line
                            className="forge-wire"
                            x1="750"
                            y1="390"
                            x2="835"
                            y2="390"
                        />

                        <line
                            className="forge-wire"
                            x1="750"
                            y1="410"
                            x2="810"
                            y2="410"
                        />

                        <line
                            className="forge-wire"
                            x1="955"
                            y1="390"
                            x2="1050"
                            y2="390"
                        />

                        <line
                            className="forge-wire"
                            x1="955"
                            y1="410"
                            x2="1025"
                            y2="410"
                        />


                        {/* =================================================
                            PROJECT TABLE
                        ================================================= */}

                        <rect
                            className="forge-wire"
                            x="300"
                            y="500"
                            width="570"
                            height="105"
                            rx="8"
                        />

                        <line
                            className="forge-wire"
                            x1="300"
                            y1="535"
                            x2="870"
                            y2="535"
                        />

                        <line
                            className="forge-wire"
                            x1="300"
                            y1="570"
                            x2="870"
                            y2="570"
                        />


                        <line
                            className="forge-wire"
                            x1="325"
                            y1="555"
                            x2="450"
                            y2="555"
                        />

                        <line
                            className="forge-wire"
                            x1="325"
                            y1="590"
                            x2="470"
                            y2="590"
                        />


                        <rect
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            x="700"
                            y="548"
                            width="110"
                            height="8"
                            rx="4"
                        />

                        <rect
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            x="700"
                            y="583"
                            width="75"
                            height="8"
                            rx="4"
                        />


                        {/* =================================================
                            TEAM ACTIVITY
                        ================================================= */}

                        <rect
                            className="
                                forge-wire
                                forge-wire--purple
                            "
                            x="890"
                            y="500"
                            width="195"
                            height="105"
                            rx="8"
                        />


                        <circle
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            cx="920"
                            cy="530"
                            r="12"
                        />

                        <line
                            className="forge-wire"
                            x1="945"
                            y1="525"
                            x2="1050"
                            y2="525"
                        />


                        <circle
                            className="
                                forge-wire
                                forge-wire--orange
                            "
                            cx="920"
                            cy="562"
                            r="12"
                        />

                        <line
                            className="forge-wire"
                            x1="945"
                            y1="557"
                            x2="1035"
                            y2="557"
                        />


                        <circle
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            cx="920"
                            cy="590"
                            r="6"
                        />


                        {/* =================================================
                            BOTTOM ORBIT
                        ================================================= */}

                        <ellipse
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            cx="620"
                            cy="650"
                            rx="190"
                            ry="22"
                        />

                        <ellipse
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            cx="620"
                            cy="650"
                            rx="115"
                            ry="12"
                        />

                        <line
                            className="
                                forge-wire
                                forge-wire--cyan
                            "
                            x1="620"
                            y1="620"
                            x2="620"
                            y2="675"
                        />

                        <circle
                            className="
                                forge-wire
                                forge-wire--lime
                            "
                            cx="620"
                            cy="650"
                            r="5"
                        />

                    </svg>


                    {/* Product label */}

                    <div className="forge-product__tag">
                        <span />
                        DIGITAL PRODUCT / FORGED
                    </div>

                </div>


                {/* =================================================
                    LABEL
                ================================================= */}

                <div
                    ref={labelRef}
                    className="forge-collision__label"
                >
                    <span>
                        01 / FORGED
                    </span>

                    <strong>
                        IDEA → INTERFACE
                    </strong>
                </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="forge-collision__footer">

                <span>
                    DEVFORGE SYSTEM
                </span>

                <span>
                    DESIGN · CODE · MOTION
                </span>

                <span>
                    SCROLL TO FORGE
                </span>

            </div>

        </section>
    );
};

export default ForgeCollision;