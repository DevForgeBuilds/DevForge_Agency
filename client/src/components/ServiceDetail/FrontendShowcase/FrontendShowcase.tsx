import { useEffect, useRef, useState } from 'react';
import './FrontendShowcase.css';

interface FrontendShowcaseProps {
    serviceSlug?: string;
}

interface UIState {
    number: string;
    label: string;
}

const UI_STATES: UIState[] = [
    {
        number: '01',
        label: 'STRUCTURE',
    },
    {
        number: '02',
        label: 'INTERACTION',
    },
    {
        number: '03',
        label: 'MOTION',
    },
    {
        number: '04',
        label: 'RESPONSIVE',
    },
    {
        number: '05',
        label: 'PERFORMANCE',
    },
];


const FrontendShowcase = ({
    serviceSlug = 'frontend-engineering',
}: FrontendShowcaseProps) => {

    const sectionRef =
        useRef<HTMLElement | null>(null);

    const [activeState, setActiveState] =
        useState(0);


    /* ========================================================
       SCROLL ACTIVATION
    ======================================================== */

    useEffect(() => {

        const section =
            sectionRef.current;

        if (!section) {
            return;
        }


        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (entry.isIntersecting) {

                        section.classList.add(
                            'is-active'
                        );

                    }

                },
                {
                    threshold: 0.2,
                }
            );


        observer.observe(section);


        return () => {
            observer.disconnect();
        };

    }, []);


    /* ========================================================
       UI STATE LOOP
    ======================================================== */

    useEffect(() => {

        const interval =
            window.setInterval(() => {

                setActiveState(
                    current =>
                        (current + 1) %
                        UI_STATES.length
                );

            }, 1800);


        return () => {
            window.clearInterval(interval);
        };

    }, []);


    return (
        <section
            ref={sectionRef}
            className="frontend-showcase"
            data-service={serviceSlug}
        >

            {/* ==================================================
                META
            ================================================== */}

            <div className="frontend-showcase__meta">

                <span className="frontend-showcase__number">
                    04
                </span>

                <span>
                    FRONTEND / ENGINEERING
                </span>

                <span className="frontend-showcase__line" />

                <span>
                    EXPERIENCE / 2026
                </span>

            </div>


            {/* ==================================================
                INTRO
            ================================================== */}

            <div className="frontend-showcase__intro">

                <div className="frontend-showcase__eyebrow">

                    <i />

                    <span>
                        INTERACTION SYSTEM
                    </span>

                </div>


                <h2 className="frontend-showcase__title">

                    <span>
                        MAKE
                    </span>

                    <span>
                        INTERFACES
                    </span>

                    ALIVE.

                </h2>


                <p>
                    Frontend engineering turns a static
                    interface into a responsive experience
                    where components, interaction, motion
                    and performance work together.
                </p>

            </div>


            {/* ==================================================
                STAGE
            ================================================== */}

            <div className="frontend-showcase__stage">

                <div className="frontend-browser">

                    {/* ==================================================
                        BROWSER TOP
                    ================================================== */}

                    <div className="frontend-browser__top">

                        <div className="frontend-browser__dots">

                            <span />
                            <span />
                            <span />

                        </div>


                        <div className="frontend-browser__address">

                            devforge.local / frontend

                        </div>


                        <div className="frontend-browser__status">

                            LIVE

                        </div>

                    </div>


                    {/* ==================================================
                        BROWSER BODY
                    ================================================== */}

                    <div className="frontend-browser__body">

                        {/* NAV */}

                        <nav className="frontend-ui-nav">

                            <strong className="frontend-ui-nav__brand">

                                DF

                            </strong>


                            <div className="frontend-ui-nav__links">

                                <span>
                                    WORK
                                </span>

                                <span>
                                    SYSTEMS
                                </span>

                                <span>
                                    CONTACT
                                </span>

                            </div>

                        </nav>


                        {/* ==================================================
                            UI HERO
                        ================================================== */}

                        <div className="frontend-ui-hero">

                            <div className="frontend-ui-hero__copy">

                                <span className="frontend-ui-hero__eyebrow">

                                    STATE /{' '}
                                    {UI_STATES[
                                        activeState
                                    ].label}

                                </span>


                                <h3>

                                    BUILD

                                    <br />

                                    <em>
                                        BETTER
                                    </em>

                                    <br />

                                    INTERFACES.

                                </h3>


                                <p>
                                    Components respond.
                                    Interfaces move.
                                    Experiences adapt.
                                </p>

                            </div>


                            {/* ==================================================
                                VISUAL
                            ================================================== */}

                            <div className="frontend-ui-visual">

                                {/* BACK CARD */}

                                <div className="frontend-ui-card frontend-ui-card--back">

                                    <div className="frontend-ui-card__top">

                                        <span>
                                            COMPONENT
                                        </span>

                                        <span>
                                            03
                                        </span>

                                    </div>


                                    <div className="frontend-ui-card__line" />


                                    <div className="frontend-ui-card__visual">

                                        UI

                                    </div>


                                    <div className="frontend-ui-card__rows">

                                        <span />
                                        <span />
                                        <span />

                                    </div>

                                </div>


                                {/* MIDDLE CARD */}

                                <div className="frontend-ui-card frontend-ui-card--middle">

                                    <div className="frontend-ui-card__top">

                                        <span>
                                            INTERACTION
                                        </span>

                                        <span>
                                            02
                                        </span>

                                    </div>


                                    <div className="frontend-ui-card__line" />


                                    <div className="frontend-ui-card__visual">

                                        UX

                                    </div>


                                    <div className="frontend-ui-card__rows">

                                        <span />
                                        <span />
                                        <span />

                                    </div>

                                </div>


                                {/* FRONT CARD */}

                                <div className="frontend-ui-card frontend-ui-card--front">

                                    <div className="frontend-ui-card__top">

                                        <span>
                                            COMPONENT
                                        </span>

                                        <span>
                                            01
                                        </span>

                                    </div>


                                    <div className="frontend-ui-card__line" />


                                    <div className="frontend-ui-card__visual">

                                        DF

                                    </div>


                                    <div className="frontend-ui-card__rows">

                                        <span />
                                        <span />
                                        <span />

                                    </div>

                                </div>


                                {/* CURSOR */}

                                <div className="frontend-cursor">

                                    ↗

                                </div>


                                {/* INTERACTION */}

                                <div className="frontend-interaction">

                                    <i />

                                    {UI_STATES[
                                        activeState
                                    ].label}

                                </div>

                            </div>

                        </div>


                        {/* ==================================================
                            STATE
                        ================================================== */}

                        <div className="frontend-state">

                            <i />

                            <span>
                                FRONTEND SYSTEM /
                                {UI_STATES[
                                    activeState
                                ].number}
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM
            ================================================== */}

            <div className="frontend-showcase__bottom">

                <div className="frontend-showcase__bottom-label">

                    ENGINEERING LAYER

                    <strong>
                        COMPONENTS / MOTION / UX / PERFORMANCE
                    </strong>

                </div>


                <div className="frontend-showcase__status">

                    <i />

                    <span>
                        INTERFACE ACTIVE
                    </span>

                </div>


                <div className="frontend-showcase__counter">

                    STATE

                    <strong>
                        {' '}
                        {UI_STATES[
                            activeState
                        ].number}
                    </strong>

                    {' / 05'}

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="frontend-showcase__statement">

                <span>
                    FRONTEND / 04
                </span>


                <strong>

                    STATIC BECOMES
                    <br />

                    <em>
                        INTERACTIVE.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="frontend-showcase__footer">

                <span>
                    DEVFORGE / 04
                </span>

                <span>
                    FRONTEND ENGINEERING
                </span>

            </footer>

        </section>
    );
};


export default FrontendShowcase;