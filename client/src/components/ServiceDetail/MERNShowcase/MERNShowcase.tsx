import { useEffect, useRef, useState } from 'react';
import './MERNShowcase.css';

interface MERNShowcaseProps {
    serviceSlug?: string;
}

interface MERNNode {
    number: string;
    name: string;
    role: string;
    icon: string;
}

const MERN_NODES: MERNNode[] = [
    {
        number: '01',
        name: 'REACT',
        role: 'FRONTEND',
        icon: 'UI',
    },
    {
        number: '02',
        name: 'API',
        role: 'REQUEST',
        icon: '↗',
    },
    {
        number: '03',
        name: 'NODE',
        role: 'SERVER',
        icon: 'JS',
    },
    {
        number: '04',
        name: 'MONGO',
        role: 'DATABASE',
        icon: 'DB',
    },
    {
        number: '05',
        name: 'PRODUCT',
        role: 'LIVE APP',
        icon: 'DF',
    },
];

const MERNShowcase = ({
    serviceSlug = 'full-stack-mern',
}: MERNShowcaseProps) => {

    const sectionRef =
        useRef<HTMLElement | null>(null);

    const [activeIndex, setActiveIndex] =
        useState(0);

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
                    threshold: 0.25,
                }
            );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };

    }, []);


    useEffect(() => {

        const interval =
            window.setInterval(() => {

                setActiveIndex(
                    (current) =>
                        (current + 1) %
                        MERN_NODES.length
                );

            }, 1800);


        return () => {
            window.clearInterval(interval);
        };

    }, []);


    return (
        <section
            ref={sectionRef}
            className="mern-showcase"
            data-service={serviceSlug}
        >

            {/* ==================================================
                TOP META
            ================================================== */}

            <div className="mern-showcase__meta">

                <span className="mern-showcase__number">
                    03
                </span>

                <span>
                    FULL-STACK / MERN
                </span>

                <span className="mern-showcase__line" />

                <span>
                    SYSTEM / 2026
                </span>

            </div>


            {/* ==================================================
                INTRO
            ================================================== */}

            <div className="mern-showcase__intro">

                <div className="mern-showcase__eyebrow">

                    <i />

                    <span>
                        PRODUCT ARCHITECTURE
                    </span>

                </div>


                <h2 className="mern-showcase__title">

                    <span>
                        ONE
                    </span>

                    <span>
                        CONNECTED
                    </span>

                    PRODUCT.

                </h2>


                <p>
                    A full-stack application is more than
                    a frontend and backend sitting together.
                    Every layer needs to communicate as one
                    coherent system.
                </p>

            </div>


            {/* ==================================================
                SYSTEM STAGE
            ================================================== */}

            <div className="mern-showcase__stage">

                <div className="mern-flow">

                    {/* CONNECTOR */}

                    <div className="mern-flow__connector" />


                    {/* DATA PACKET */}

                    <div className="mern-flow__packet" />


                    {/* REQUEST LABEL */}

                    <span className="mern-flow__label mern-flow__label--request">

                        API REQUEST

                    </span>


                    {/* RESPONSE LABEL */}

                    <span className="mern-flow__label mern-flow__label--response">

                        DATA RESPONSE

                    </span>


                    {/* NODES */}

                    {MERN_NODES.map(
                        (node, index) => {

                            const isActive =
                                activeIndex === index;


                            return (
                                <article
                                    key={node.name}
                                    className={`mern-node ${isActive
                                        ? 'is-active'
                                        : ''
                                        }`}
                                    onMouseEnter={() =>
                                        setActiveIndex(index)
                                    }
                                >

                                    <span className="mern-node__number">

                                        {node.number}

                                    </span>


                                    <div className="mern-node__icon">

                                        {node.icon}

                                    </div>


                                    <div>

                                        <div className="mern-node__name">

                                            {node.name}

                                        </div>


                                        <div className="mern-node__role">

                                            {node.role}

                                        </div>

                                    </div>

                                </article>
                            );

                        }
                    )}

                </div>

            </div>


            {/* ==================================================
                BOTTOM INFO
            ================================================== */}

            <div className="mern-showcase__bottom">

                <div className="mern-showcase__bottom-label">

                    SYSTEM LAYER

                    <strong>
                        FRONTEND / API / SERVER / DATA
                    </strong>

                </div>


                <div className="mern-showcase__status">

                    <i />

                    <span>
                        SYSTEM CONNECTED
                    </span>

                </div>


                <div className="mern-showcase__counter">

                    NODE

                    <strong>
                        {' '}
                        {String(
                            activeIndex + 1
                        ).padStart(2, '0')}
                    </strong>

                    {' / 05'}

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="mern-showcase__statement">

                <span>
                    FULL-STACK / 03
                </span>


                <strong>

                    EVERY LAYER
                    <br />

                    <em>
                        WORKS TOGETHER.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="mern-showcase__footer">

                <span>
                    DEVFORGE / 03
                </span>

                <span>
                    FULL-STACK (MERN) APPLICATIONS
                </span>

            </footer>

        </section>
    );
};

export default MERNShowcase;