import './Beliefs.css';
import { useEffect, useRef } from 'react';
import { initBeliefsAnimation } from '../../animations/beliefsAnimation';

const BELIEFS = [
    {
        number: '01',
        title: 'CLARITY',
        description:
            'We remove the noise and make every digital experience easier to understand.',
    },
    {
        number: '02',
        title: 'CRAFT',
        description:
            'Every detail matters — from the first interaction to the final line of code.',
    },
    {
        number: '03',
        title: 'PERFORMANCE',
        description:
            'Beautiful experiences should feel fast, responsive and effortless.',
    },
    {
        number: '04',
        title: 'PURPOSE',
        description:
            'We build with intention, creating products that solve real problems.',
    },
];

const Beliefs = () => {
    const sectionRef =
        useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        return initBeliefsAnimation(
            sectionRef.current
        );
    }, []);

    return (
        <section
            id="beliefs"
            ref={sectionRef}
            className="beliefs-section"
        >

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="beliefs-grid"
                aria-hidden="true"
            />

            <div
                className="beliefs-glow"
                aria-hidden="true"
            />


            {/* =================================================
                TOP META
            ================================================= */}

            <div className="beliefs-top">

                <div className="beliefs-index">
                    <span />
                    06 / WHAT WE BELIEVE
                </div>

                <div className="beliefs-meta">
                    DESIGN / CODE / EXPERIENCE
                </div>

            </div>


            {/* =================================================
                VIEWPORT
            ================================================= */}

            <div className="beliefs-stage">

                {/* =================================================
                    01 — INTRO
                ================================================= */}

                <div className="belief-screen beliefs-screen--intro">

                    <div className="belief-eyebrow">
                        OUR PHILOSOPHY
                    </div>

                    <h2 className="belief-main-heading">

                        <span>WHAT</span>

                        <span className="belief-heading-offset">
                            WE
                        </span>

                        <span>
                            BELIEVE
                            <i>.</i>
                        </span>

                    </h2>

                    <div className="belief-screen-number">
                        01
                    </div>

                </div>


                {/* =================================================
                    02 — DESIGN / CODE
                ================================================= */}

                <div className="belief-screen beliefs-screen--split">

                    <div className="belief-half belief-half--design">

                        <span className="belief-half-label">
                            THE CREATIVE SIDE
                        </span>

                        <h3>DESIGN</h3>

                        <div className="belief-half-words">
                            <span>FEEL</span>
                            <span>FORM</span>
                            <span>FLOW</span>
                        </div>

                    </div>


                    <div
                        className="belief-center-line"
                        aria-hidden="true"
                    >
                        <span />
                    </div>


                    <div className="belief-half belief-half--code">

                        <span className="belief-half-label">
                            THE ENGINEERING SIDE
                        </span>

                        <h3>CODE</h3>

                        <div className="belief-half-words">
                            <span>FUNCTION</span>
                            <span>SYSTEM</span>
                            <span>SCALE</span>
                        </div>

                    </div>

                    <div className="belief-screen-number">
                        02
                    </div>

                </div>


                {/* =================================================
                    03 — MERGE
                ================================================= */}

                <div className="belief-screen beliefs-screen--merge">

                    <span className="belief-merge-small">
                        GREAT DIGITAL PRODUCTS
                    </span>

                    <h3>
                        NEED BOTH.
                    </h3>

                    <div className="belief-formula">
                        <span>DESIGN</span>

                        <b>×</b>

                        <span>CODE</span>
                    </div>

                    <div className="belief-screen-number">
                        03
                    </div>

                </div>


                {/* =================================================
                    04 — EXPERIENCE
                ================================================= */}

                <div className="belief-screen beliefs-screen--experience">

                    <span className="belief-transition-label">
                        THE RESULT
                    </span>

                    <h3 className="belief-experience-word">
                        EXPERIENCE
                    </h3>

                    <div className="belief-transition-arrow">
                        ↓
                    </div>

                    <h3 className="belief-product-word">
                        PRODUCT<span>.</span>
                    </h3>

                    <div className="belief-screen-number">
                        04
                    </div>

                </div>


                {/* =================================================
                    05 — PRINCIPLES
                ================================================= */}

                <div className="belief-screen beliefs-screen--principles">

                    <div className="belief-principles-head">
                        <span>
                            DF / PRINCIPLES
                        </span>

                        <span>
                            04 THINGS WE DON'T COMPROMISE
                        </span>
                    </div>

                    <div className="belief-principles-list">

                        {BELIEFS.map(
                            (belief) => (
                                <article
                                    key={
                                        belief.number
                                    }
                                    className="belief-principle"
                                >

                                    <span className="belief-principle-number">
                                        {
                                            belief.number
                                        }
                                    </span>

                                    <h3>
                                        {
                                            belief.title
                                        }
                                    </h3>

                                    <p>
                                        {
                                            belief.description
                                        }
                                    </p>

                                    <span className="belief-principle-arrow">
                                        ↗
                                    </span>

                                </article>
                            )
                        )}

                    </div>

                    <div className="belief-screen-number">
                        05
                    </div>

                </div>


                {/* =================================================
                    06 — FINAL
                ================================================= */}

                <div className="belief-screen beliefs-screen--final">

                    <div className="belief-final-label">
                        DF / PHILOSOPHY
                    </div>

                    <div className="belief-final-text">

                        <span>
                            NOT JUST
                        </span>

                        <strong>
                            FUNCTIONAL.
                        </strong>

                        <span>
                            EXCEPTIONAL.
                        </span>

                    </div>

                    <div className="belief-final-meta">
                        THINK · DESIGN · BUILD
                    </div>

                    <div className="belief-screen-number">
                        06
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Beliefs;