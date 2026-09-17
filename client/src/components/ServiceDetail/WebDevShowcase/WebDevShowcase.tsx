import { useEffect, useRef } from 'react';
import './WebDevShowcase.css';
import { initWebDevShowcaseAnimation } from '../../../animations/webDevShowcaseAnimation';

const WebDevShowcase = () => {
    const sectionRef =
        useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        return initWebDevShowcaseAnimation(
            sectionRef.current
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="webdev-showcase"
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="webdev-showcase__header">

                <div className="webdev-showcase__eyebrow">

                    <span>05</span>

                    <span>
                        SIGNATURE EXPERIENCE
                    </span>

                </div>

                <div className="webdev-showcase__label">
                    CODE / BROWSER / LIVE
                </div>

            </div>


            {/* ==================================================
                MAIN STAGE
            ================================================== */}

            <div className="webdev-showcase__stage">

                {/* ==================================================
                    CODE PANEL
                ================================================== */}

                <div className="webdev-code">

                    <div className="webdev-code__top">

                        <div className="webdev-code__dots">
                            <i />
                            <i />
                            <i />
                        </div>

                        <span>
                            App.tsx
                        </span>

                        <small>
                            TYPESCRIPT
                        </small>

                    </div>


                    <div className="webdev-code__body">

                        <div>
                            <span>01</span>
                            <code>
                                &lt;main&gt;
                            </code>
                        </div>

                        <div>
                            <span>02</span>
                            <code>
                                &nbsp;&nbsp;&lt;Hero /&gt;
                            </code>
                        </div>

                        <div>
                            <span>03</span>
                            <code>
                                &nbsp;&nbsp;&lt;Experience /&gt;
                            </code>
                        </div>

                        <div>
                            <span>04</span>
                            <code>
                                &nbsp;&nbsp;&lt;Interaction /&gt;
                            </code>
                        </div>

                        <div>
                            <span>05</span>
                            <code>
                                &lt;/main&gt;
                            </code>
                        </div>

                        <div className="webdev-code__cursor">
                            <span>06</span>
                            <code>|</code>
                        </div>

                    </div>

                </div>


                {/* ==================================================
                    CONNECTION
                ================================================== */}

                <div className="webdev-showcase__connection">

                    <span>
                        COMPILE
                    </span>

                    <div>
                        <i />
                        <i />
                        <i />
                    </div>

                    <strong>
                        →
                    </strong>

                </div>


                {/* ==================================================
                    BROWSER
                ================================================== */}

                <div className="webdev-browser">

                    <div className="webdev-browser__top">

                        <div className="webdev-browser__dots">
                            <i />
                            <i />
                            <i />
                        </div>

                        <span>
                            devforge.local
                        </span>

                        <small>
                            LIVE
                        </small>

                    </div>


                    <div className="webdev-browser__body">

                        <div className="webdev-browser__grid" />

                        <div className="webdev-browser__content">

                            <span>
                                DIGITAL EXPERIENCE
                            </span>

                            <h3>
                                BUILD
                                <br />
                                DIFFERENT.
                            </h3>

                            <div className="webdev-browser__button">
                                EXPLORE
                                <b>↗</b>
                            </div>

                        </div>


                        <div className="webdev-browser__orb">
                            DF
                        </div>


                        <div className="webdev-browser__status">

                            <span>
                                SYSTEM
                            </span>

                            <strong>
                                LIVE
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM STATEMENT
            ================================================== */}

            <div className="webdev-showcase__statement">

                <span>
                    FROM RAW CODE
                </span>

                <strong>
                    TO A LIVING
                    <em>
                        EXPERIENCE.
                    </em>
                </strong>

            </div>

        </section>
    );
};

export default WebDevShowcase;