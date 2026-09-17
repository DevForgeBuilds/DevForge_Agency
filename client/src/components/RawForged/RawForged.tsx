import './RawForged.css';
import { useEffect, useRef } from 'react';
import { initRawForgedAnimation } from '../../animations/rawForgedAnimation';

const RawForged = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        return initRawForgedAnimation(sectionRef.current);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="raw-forged"
            className="raw-forged"
        >

            {/* Background */}
            <div className="raw-forged__grid" />
            <div className="raw-forged__glow" />

            {/* Top Meta */}
            <header className="raw-forged__top">

                <div className="raw-forged__index">
                    <span />
                    06 / THE FORGE
                </div>

                <div className="raw-forged__meta">
                    IDEA / PROCESS / PRODUCT
                </div>

            </header>


            {/* =================================================
                STAGE
            ================================================= */}

            <div className="raw-forged__stage">


                {/* =================================================
                    01 — RAW IDEA
                ================================================= */}

                <div className="raw-screen raw-screen--idea">

                    <div className="raw-screen__label">
                        BEFORE THE BUILD
                    </div>

                    <div className="raw-screen__content">

                        <span className="raw-screen__small">
                            EVERY PRODUCT
                            STARTS SOMEWHERE.
                        </span>

                        <h2>
                            RAW
                            <span>IDEA.</span>
                        </h2>

                    </div>

                    <div className="raw-screen__number">
                        01
                    </div>

                </div>


                {/* =================================================
                    02 — THINK
                ================================================= */}

                <div className="raw-screen raw-screen--process">

                    <div className="raw-process__top">
                        THE PROCESS
                    </div>

                    <div className="raw-process__word">
                        THINK
                    </div>

                    <div className="raw-process__line">
                        <span />
                    </div>

                    <div className="raw-process__description">
                        Understand the idea.
                        <br />
                        Find the real problem.
                    </div>

                    <div className="raw-screen__number">
                        02
                    </div>

                </div>


                {/* =================================================
                    03 — DESIGN
                ================================================= */}

                <div className="raw-screen raw-screen--process">

                    <div className="raw-process__top">
                        THE PROCESS
                    </div>

                    <div className="raw-process__word">
                        DESIGN
                    </div>

                    <div className="raw-process__line">
                        <span />
                    </div>

                    <div className="raw-process__description">
                        Shape the experience.
                        <br />
                        Make complexity feel simple.
                    </div>

                    <div className="raw-screen__number">
                        03
                    </div>

                </div>


                {/* =================================================
                    04 — BUILD
                ================================================= */}

                <div className="raw-screen raw-screen--process">

                    <div className="raw-process__top">
                        THE PROCESS
                    </div>

                    <div className="raw-process__word">
                        BUILD
                    </div>

                    <div className="raw-process__line">
                        <span />
                    </div>

                    <div className="raw-process__description">
                        Turn design into reality.
                        <br />
                        Code with purpose.
                    </div>

                    <div className="raw-screen__number">
                        04
                    </div>

                </div>


                {/* =================================================
                    05 — REFINE
                ================================================= */}

                <div className="raw-screen raw-screen--process">

                    <div className="raw-process__top">
                        THE PROCESS
                    </div>

                    <div className="raw-process__word">
                        REFINE
                    </div>

                    <div className="raw-process__line">
                        <span />
                    </div>

                    <div className="raw-process__description">
                        Test. Improve. Polish.
                        <br />
                        Never settle for almost.
                    </div>

                    <div className="raw-screen__number">
                        05
                    </div>

                </div>


                {/* =================================================
                    06 — FORGED
                ================================================= */}

                <div className="raw-screen raw-screen--forged">

                    <div className="forged__label">
                        AFTER THE PROCESS
                    </div>

                    <div className="forged__content">

                        <span className="forged__eyebrow">
                            RAW IDEA
                        </span>

                        <div className="forged__arrow">
                            ↓
                        </div>

                        <h2>
                            FORGED
                            <span>.</span>
                        </h2>

                        <p>
                            INTO SOMETHING
                            <strong>
                                EXCEPTIONAL.
                            </strong>
                        </p>

                    </div>

                    <div className="raw-screen__number">
                        06
                    </div>

                </div>


            </div>

        </section>
    );
};

export default RawForged;