import { useEffect, useRef } from 'react';
import './Studio.css';

import { initStudioAnimation } from '../../animations/studioAnimation';
import ForgeCollision from './ForgeCollision';


const Studio = () => {

    const sectionRef =
        useRef<HTMLElement | null>(null);


    useEffect(() => {

        const section =
            sectionRef.current;

        if (!section) {
            return;
        }

        return initStudioAnimation(section);

    }, []);


    return (
        <section
            ref={sectionRef}
            id="studio"
            className="studio-section studio-two-worlds"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <header className="studio-section__meta">

                <div className="studio-section__index">

                    <span
                        className="studio-section__dot"
                        aria-hidden="true"
                    />

                    <span>
                        03 / THE STUDIO
                    </span>

                </div>


                <span className="studio-section__location">
                    DEVFORGE / DIGITAL STUDIO
                </span>

            </header>


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="studio-two-worlds__intro">

                <span className="studio-two-worlds__eyebrow">
                    WHO WE ARE
                </span>


                <h2 className="studio-two-worlds__title">

                    <span>
                        TWO WORLDS.
                    </span>

                    <span className="studio-two-worlds__title-accent">
                        ONE FORGE.
                    </span>

                </h2>


                <p className="studio-two-worlds__description">
                    We bring engineering and creative craft
                    together to turn ambitious ideas into
                    digital products.
                </p>

            </div>


            {/* =================================================
                DEV / FORGE WORLDS
            ================================================= */}

            <div className="studio-worlds">

                {/* =================================================
                    DEV
                ================================================= */}

                <article className="studio-world studio-world--dev">

                    <div className="studio-world__header">

                        <span className="studio-world__index">
                            01
                        </span>

                        <span className="studio-world__label">
                            THE LOGIC
                        </span>

                        <span className="studio-world__status">
                            DEV
                        </span>

                    </div>


                    <div className="studio-world__main">

                        <div className="studio-world__symbol">
                            D
                        </div>


                        <div className="studio-world__content">

                            <h3>
                                DEV
                            </h3>

                            <p>
                                Ideas become structure.
                            </p>

                        </div>

                    </div>


                    <div className="studio-world__grid">

                        <div>
                            <span>01</span>
                            <strong>CODE</strong>
                        </div>

                        <div>
                            <span>02</span>
                            <strong>SYSTEMS</strong>
                        </div>

                        <div>
                            <span>03</span>
                            <strong>LOGIC</strong>
                        </div>

                        <div>
                            <span>04</span>
                            <strong>ENGINEERING</strong>
                        </div>

                    </div>


                    <div className="studio-world__footer">

                        <span>
                            STRUCTURE / PERFORMANCE
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </article>


                {/* =================================================
                    CENTER
                ================================================= */}

                <div
                    className="studio-worlds__center"
                    aria-hidden="true"
                >

                    <div className="studio-worlds__line" />

                    <div className="studio-worlds__plus">
                        +
                    </div>

                    <span>
                        COLLISION
                    </span>

                </div>


                {/* =================================================
                    FORGE
                ================================================= */}

                <article className="studio-world studio-world--forge">

                    <div className="studio-world__header">

                        <span className="studio-world__index">
                            02
                        </span>

                        <span className="studio-world__label">
                            THE CRAFT
                        </span>

                        <span className="studio-world__status">
                            FORGE
                        </span>

                    </div>


                    <div className="studio-world__main">

                        <div className="studio-world__symbol">
                            F
                        </div>


                        <div className="studio-world__content">

                            <h3>
                                FORGE
                            </h3>

                            <p>
                                Structure becomes experience.
                            </p>

                        </div>

                    </div>


                    <div className="studio-world__grid">

                        <div>
                            <span>01</span>
                            <strong>DESIGN</strong>
                        </div>

                        <div>
                            <span>02</span>
                            <strong>MOTION</strong>
                        </div>

                        <div>
                            <span>03</span>
                            <strong>CRAFT</strong>
                        </div>

                        <div>
                            <span>04</span>
                            <strong>EXPERIENCE</strong>
                        </div>

                    </div>


                    <div className="studio-world__footer">

                        <span>
                            CRAFT / EXPERIENCE
                        </span>

                        <span>
                            →
                        </span>

                    </div>

                </article>

            </div>


            {/* =================================================
                COLLISION
            ================================================= */}

            <div className="studio-two-worlds__collision">

                <div className="studio-two-worlds__collision-meta">

                    <span>
                        03 / THE COLLISION
                    </span>

                    <span>
                        DEV × FORGE
                    </span>

                </div>


                <div className="studio-two-worlds__collision-title">

                    <span>
                        WHERE
                    </span>

                    <span>
                        WORLDS
                    </span>

                    <span className="studio-two-worlds__collision-accent">
                        COLLIDE.
                    </span>

                </div>


                <ForgeCollision />


                <div className="studio-two-worlds__result">

                    <span>
                        RESULT
                    </span>

                    <strong>
                        DIGITAL PRODUCT.
                    </strong>

                </div>

            </div>


            {/* =================================================
                BELIEF
            ================================================= */}

            <div className="studio-belief">

                <div className="studio-belief__side">

                    <span>
                        OUR BELIEF
                    </span>

                    <span>
                        03 / 04
                    </span>

                </div>


                <div className="studio-belief__main">

                    <div className="studio-belief__eyebrow">
                        PRINCIPLE / 03
                    </div>


                    <h3>
                        MORE THAN
                        <span>
                            {' '}JUST CODE.
                        </span>
                    </h3>


                    <p>
                        Great digital products need creativity,
                        strategy, thoughtful design and technology
                        working together.
                    </p>

                </div>

            </div>


            {/* =================================================
                FINAL STATEMENT
            ================================================= */}

            <div className="studio-two-worlds__final">

                <span>
                    THE DEVFORGE METHOD
                </span>


                <h3>

                    <span>
                        THINK.
                    </span>

                    <span>
                        FORGE.
                    </span>

                    <span className="studio-two-worlds__final-accent">
                        LAUNCH.
                    </span>

                </h3>


                <p>
                    Different disciplines.
                    One digital direction.
                </p>

            </div>


            {/* =================================================
                MANIFESTO
            ================================================= */}

            <div className="studio-manifesto">

                <span className="studio-manifesto__small">
                    THE DEVFORGE PROMISE
                </span>


                <h3>

                    FORGE IDEAS.
                    <br />

                    <span>
                        BUILD DIGITAL.
                    </span>

                </h3>


                <div className="studio-manifesto__footer">

                    <span>
                        DEVFORGE / 2026
                    </span>

                    <span>
                        DESIGN · DEVELOPMENT · MOTION
                    </span>

                    <span>
                        ↓
                    </span>

                </div>

            </div>

        </section>
    );
};


export default Studio;