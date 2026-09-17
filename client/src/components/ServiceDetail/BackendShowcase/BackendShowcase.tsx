import { useEffect, useRef, useState } from 'react';
import './BackendShowcase.css';

interface BackendShowcaseProps {
    serviceSlug?: string;
}

interface BackendLayer {
    number: string;
    name: string;
    role: string;
    icon: string;
}

const BACKEND_LAYERS: BackendLayer[] = [
    {
        number: '01',
        name: 'ROUTE',
        role: 'REQUEST ROUTING',
        icon: '→',
    },
    {
        number: '02',
        name: 'CONTROLLER',
        role: 'REQUEST LOGIC',
        icon: 'C',
    },
    {
        number: '03',
        name: 'SERVICE',
        role: 'BUSINESS LOGIC',
        icon: 'S',
    },
    {
        number: '04',
        name: 'DATABASE',
        role: 'DATA LAYER',
        icon: 'DB',
    },
];


const BackendShowcase = ({
    serviceSlug = 'backend-api-systems',
}: BackendShowcaseProps) => {

    const sectionRef =
        useRef<HTMLElement | null>(null);

    const [activeLayer, setActiveLayer] =
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
       BACKEND LAYER LOOP
    ======================================================== */

    useEffect(() => {

        const interval =
            window.setInterval(() => {

                setActiveLayer(
                    current =>
                        (current + 1) %
                        BACKEND_LAYERS.length
                );

            }, 1600);


        return () => {
            window.clearInterval(interval);
        };

    }, []);


    return (
        <section
            ref={sectionRef}
            className="backend-showcase"
            data-service={serviceSlug}
        >

            {/* ==================================================
                META
            ================================================== */}

            <div className="backend-showcase__meta">

                <span className="backend-showcase__number">
                    05
                </span>

                <span>
                    BACKEND / API SYSTEMS
                </span>

                <span className="backend-showcase__line" />

                <span>
                    SYSTEM / 2026
                </span>

            </div>


            {/* ==================================================
                INTRO
            ================================================== */}

            <div className="backend-showcase__intro">

                <div className="backend-showcase__eyebrow">

                    <i />

                    <span>
                        SERVER ARCHITECTURE
                    </span>

                </div>


                <h2 className="backend-showcase__title">

                    <span>
                        POWER
                    </span>

                    <span>
                        WHAT
                    </span>

                    RUNS
                    <br />
                    BEHIND.

                </h2>


                <p>
                    Reliable backend systems turn requests
                    into useful responses through structured
                    routes, business logic, APIs and data.
                </p>

            </div>


            {/* ==================================================
                SYSTEM STAGE
            ================================================== */}

            <div className="backend-showcase__stage">

                <div className="backend-terminal">

                    {/* ==================================================
                        TERMINAL TOP
                    ================================================== */}

                    <div className="backend-terminal__top">

                        <div className="backend-terminal__dots">

                            <span />
                            <span />
                            <span />

                        </div>


                        <span>
                            devforge / api-server
                        </span>


                        <span className="backend-terminal__status">
                            SERVER ONLINE
                        </span>

                    </div>


                    {/* ==================================================
                        TERMINAL BODY
                    ================================================== */}

                    <div className="backend-terminal__body">

                        {/* ==================================================
                            REQUEST
                        ================================================== */}

                        <div className="backend-request">

                            <div className="backend-request__label">

                                <span>
                                    INCOMING REQUEST
                                </span>

                                <span>
                                    01
                                </span>

                            </div>


                            <span className="backend-request__method">
                                GET
                            </span>


                            <div className="backend-request__route">

                                /api/

                                <span>
                                    projects
                                </span>

                                /:id

                            </div>


                            <div className="backend-request__payload">

                                <strong>
                                    {
                                        '{'
                                    }
                                </strong>

                                <br />

                                &nbsp;&nbsp;
                                id: <strong>"DF-001"</strong>

                                <br />

                                &nbsp;&nbsp;
                                status: <strong>"active"</strong>

                                <br />

                                <strong>
                                    {'}'}
                                </strong>

                            </div>

                        </div>


                        {/* ==================================================
                            FLOW
                        ================================================== */}

                        <div className="backend-flow">

                            <span className="backend-flow__packet" />

                        </div>


                        {/* ==================================================
                            BACKEND STACK
                        ================================================== */}

                        <div className="backend-stack">

                            {BACKEND_LAYERS.map(
                                (layer, index) => {

                                    const isActive =
                                        activeLayer === index;


                                    return (
                                        <article
                                            key={layer.name}
                                            className="backend-stack__item"
                                            onMouseEnter={() =>
                                                setActiveLayer(index)
                                            }
                                        >

                                            <span className="backend-stack__number">

                                                {layer.number}

                                            </span>


                                            <span className="backend-stack__icon">

                                                {layer.icon}

                                            </span>


                                            <div>

                                                <div className="backend-stack__name">

                                                    {layer.name}

                                                </div>


                                                <div className="backend-stack__role">

                                                    {layer.role}

                                                </div>

                                            </div>


                                            <span className="backend-stack__status">

                                                {isActive
                                                    ? 'PROCESSING'
                                                    : 'READY'}

                                            </span>

                                        </article>
                                    );

                                }
                            )}

                        </div>


                        {/* ==================================================
                            RESPONSE
                        ================================================== */}

                        <div className="backend-response">

                            <i />

                            <span>
                                RESPONSE
                            </span>

                            <strong>
                                200 OK
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM
            ================================================== */}

            <div className="backend-showcase__bottom">

                <div className="backend-showcase__bottom-label">

                    SYSTEM LAYER

                    <strong>
                        ROUTE / LOGIC / DATA / RESPONSE
                    </strong>

                </div>


                <div className="backend-showcase__status">

                    <i />

                    <span>
                        API SYSTEM ACTIVE
                    </span>

                </div>


                <div className="backend-showcase__counter">

                    LAYER

                    <strong>
                        {' '}
                        {BACKEND_LAYERS[
                            activeLayer
                        ].number}
                    </strong>

                    {' / 04'}

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="backend-showcase__statement">

                <span>
                    BACKEND / 05
                </span>


                <strong>

                    REQUESTS COME IN.
                    <br />

                    <em>
                        SYSTEMS RESPOND.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="backend-showcase__footer">

                <span>
                    DEVFORGE / 05
                </span>

                <span>
                    BACKEND &amp; API SYSTEMS
                </span>

            </footer>

        </section>
    );
};


export default BackendShowcase;