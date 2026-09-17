import { useEffect, useState } from 'react';
import './Preloader.css';

const PRELOADER_DURATION = 4000;

type Phase =
    | 'intro'
    | 'tagline'
    | 'forge'
    | 'loading'
    | 'exit';

const Preloader = () => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.body.classList.add('preloader-active');

        const timers = [
            window.setTimeout(() => {
                setPhase('tagline');
            }, 350),

            window.setTimeout(() => {
                setPhase('forge');
            }, 850),

            window.setTimeout(() => {
                setPhase('loading');
            }, 1500),

            window.setTimeout(() => {
                setPhase('exit');
            }, 3450),
        ];

        return () => {
            timers.forEach((timer) => {
                window.clearTimeout(timer);
            });

            document.body.classList.remove('preloader-active');
        };
    }, []);

    useEffect(() => {
        const start = performance.now();

        let frame = 0;

        const animate = (time: number) => {
            const elapsed = time - start;

            const rawProgress =
                elapsed / PRELOADER_DURATION;

            const eased =
                1 - Math.pow(1 - Math.min(rawProgress, 1), 3);

            setProgress(Math.round(eased * 100));

            if (elapsed < PRELOADER_DURATION) {
                frame = window.requestAnimationFrame(animate);
            }
        };

        frame = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            className={`df-loader df-loader--${phase}`}
            aria-hidden="true"
        >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="df-loader__bg" />

            <div className="df-loader__grid" />

            <div className="df-loader__grain" />

            {/* =================================================
                TOP NAV
            ================================================= */}

            <header className="df-loader__top">

                <div className="df-loader__brand">
                    <span className="df-loader__mark">
                        DF
                    </span>

                    <span>DEVFORGE®</span>
                </div>

                <div className="df-loader__center-label">
                    DIGITAL
                    <br />
                    STUDIO
                </div>

                <div className="df-loader__year">
                    2026
                </div>

            </header>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="df-loader__main">

                <div className="df-loader__eyebrow">
                    <span>01</span>
                    <span>/</span>
                    <span>08</span>
                </div>

                {/* TAGLINE */}

                <div className="df-loader__tagline">

                    <div className="df-loader__tagline-line">
                        WE DON'T JUST
                    </div>

                    <div className="df-loader__tagline-line">
                        BUILD WEBSITES.
                    </div>

                </div>

                {/* FORGE */}

                <div className="df-loader__forge">

                    <div className="df-loader__forge-mask">
                        <span>FORGE</span>
                    </div>

                </div>

                {/* STATEMENT */}

                <div className="df-loader__statement">

                    <span>IDEAS</span>

                    <span className="arrow">
                        →
                    </span>

                    <span>PRODUCTS</span>

                    <span className="arrow">
                        →
                    </span>

                    <span>IMPACT</span>

                </div>

                {/* =================================================
                    LOADING
                ================================================= */}

                <div className="df-loader__loading">

                    <div className="df-loader__status">

                        <span className="status-dot" />

                        <span>
                            {phase === 'loading'
                                ? 'CRAFTING DIGITAL EXPERIENCES'
                                : 'PREPARING EXPERIENCE'}
                        </span>

                    </div>

                    <div className="df-loader__progress">

                        <div className="progress-track">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />

                        </div>

                        <span className="progress-number">
                            {String(progress).padStart(3, '0')}%
                        </span>

                    </div>

                    <div className="df-loader__meta">

                        <span>DESIGN</span>
                        <span>/</span>
                        <span>CODE</span>
                        <span>/</span>
                        <span>LAUNCH</span>

                    </div>

                </div>

            </main>

            {/* =================================================
                BOTTOM
            ================================================= */}

            <footer className="df-loader__bottom">

                <div className="bottom-copy">
                    <span>CRAFTING</span>
                    <span>DIGITAL</span>
                    <span>EXPERIENCES</span>
                </div>

                <div className="bottom-line" />

                <div className="bottom-location">
                    INDIA
                    <span>↗</span>
                </div>

            </footer>

            {/* =================================================
                CINEMATIC EXIT
            ================================================= */}

            <div className="df-loader__curtain df-loader__curtain--left" />

            <div className="df-loader__curtain df-loader__curtain--right" />

        </div>
    );
};

export default Preloader;