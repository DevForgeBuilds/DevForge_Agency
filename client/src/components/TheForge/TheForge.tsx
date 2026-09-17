import { useEffect, useRef } from 'react';
import { initForgeAnimation } from '../../animations/forgeAnimation';
import './TheForge.css';

const FORGE_STAGES = [
    {
        number: '01',
        tag: 'STRATEGY',
        title: 'IDEA',
        description:
            'We find the signal inside the idea and turn it into a clear direction.',
        meta: 'DISCOVER / DEFINE',
    },
    {
        number: '02',
        tag: 'EXPERIENCE',
        title: 'DESIGN',
        description:
            'We shape the idea into an experience that feels simple, intentional and useful.',
        meta: 'SHAPE / CONNECT',
    },
    {
        number: '03',
        tag: 'DEVELOPMENT',
        title: 'CODE',
        description:
            'We engineer the experience into something fast, scalable and real.',
        meta: 'BUILD / ENGINEER',
    },
    {
        number: '04',
        tag: 'DELIVERY',
        title: 'LAUNCH',
        description:
            'We put the finished product into the world and make sure it is ready to move.',
        meta: 'DEPLOY / GROW',
    },
];

const TheForge = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        return initForgeAnimation(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="the-forge"
            className="forge-section"
        >
            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="forge-section__ambient"
                aria-hidden="true"
            />

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="forge-header">

                <div className="forge-header__meta">

                    <div className="forge-header__index">
                        <span className="forge-header__dot" />
                        <span>02 / THE FORGE</span>
                    </div>

                    <span className="forge-header__location">
                        DEVFORGE / DIGITAL STUDIO
                    </span>

                </div>


                <div className="forge-header__main">

                    <div className="forge-header__label">
                        OUR PROCESS
                    </div>

                    <h2 className="forge-header__title">
                        <span>WE FORGE</span>

                        <span className="forge-header__title-accent">
                            DIGITAL
                        </span>

                        <span>PRODUCTS.</span>
                    </h2>

                </div>


                <div className="forge-header__bottom">

                    <p>
                        From the first signal to the final launch,
                        every product moves through four deliberate
                        stages.
                    </p>

                    <div className="forge-header__code">
                        <span>PROCESS_01</span>
                        <span>BUILD / CODE / LAUNCH</span>
                    </div>

                </div>

            </header>


            {/* =================================================
                PROCESS
            ================================================= */}

            <div className="forge-process">

                {/* Vertical rail */}

                <div
                    className="forge-process__rail"
                    aria-hidden="true"
                >
                    <span className="forge-process__rail-base" />
                    <span className="forge-process__rail-progress" />
                </div>


                {/* Stages */}

                <div className="forge-stages">

                    {FORGE_STAGES.map(
                        (stage, index) => (
                            <article
                                key={stage.number}
                                className={`forge-stage forge-stage--${index + 1}`}
                                data-stage={index}
                            >

                                {/* Stage number */}

                                <div className="forge-stage__number">
                                    {stage.number}
                                </div>


                                {/* Node */}

                                <div
                                    className="forge-stage__node"
                                    aria-hidden="true"
                                >
                                    <span />
                                </div>


                                {/* Content */}

                                <div className="forge-stage__content">

                                    <div className="forge-stage__topline">

                                        <span className="forge-stage__tag">
                                            {stage.tag}
                                        </span>

                                        <span className="forge-stage__meta">
                                            {stage.meta}
                                        </span>

                                    </div>


                                    <h3>
                                        {stage.title}
                                        <span>.</span>
                                    </h3>


                                    <p>
                                        {stage.description}
                                    </p>


                                    <div className="forge-stage__footer">

                                        <span>
                                            0{index + 1}
                                        </span>

                                        <i />

                                        <span>
                                            DEVFORGE
                                        </span>

                                    </div>

                                </div>


                                {/* Side visual */}

                                <div
                                    className="forge-stage__visual"
                                    aria-hidden="true"
                                >

                                    <span className="forge-stage__visual-grid" />

                                    <span className="forge-stage__visual-ring" />

                                    <span className="forge-stage__visual-cross forge-stage__visual-cross--h" />

                                    <span className="forge-stage__visual-cross forge-stage__visual-cross--v" />

                                    <span className="forge-stage__visual-point" />

                                </div>

                            </article>
                        )
                    )}

                </div>

            </div>


            {/* =================================================
                END STATEMENT
            ================================================= */}

            <footer className="forge-footer">

                <div className="forge-footer__label">
                    <span>DF / 02</span>
                    <span>THE FORGE</span>
                </div>


                <div className="forge-footer__statement">
                    <span>ONE IDEA.</span>
                    <strong>FOUR MOVES.</strong>
                    <span>ONE DIGITAL PRODUCT.</span>
                </div>


                <div className="forge-footer__next">
                    <span>NEXT / WORK</span>
                    <span>↓</span>
                </div>

            </footer>

        </section>
    );
};

export default TheForge;