import { useState } from 'react';
import './ServiceEngagement.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceEngagementProps {
    service: ServiceData;
}


interface EngagementPhase {
    number: string;
    label: string;
    title: string;
    description: string;
}


const ServiceEngagement = ({
    service,
}: ServiceEngagementProps) => {

    const phases =
        getEngagementPhases(service.slug);


    const [activeIndex, setActiveIndex] =
        useState(0);


    const activePhase =
        phases[activeIndex] ??
        phases[0];


    if (!activePhase) {
        return null;
    }


    return (
        <section
            className="service-engagement"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="service-engagement__header">

                <div className="service-engagement__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        ENGAGEMENT
                    </span>

                </div>


                <h2>

                    HOW WE
                    <br />

                    <span>
                        WORK.
                    </span>

                </h2>


                <p>
                    A focused collaboration model designed
                    around the requirements of your
                    {` ${service.title.toLowerCase()}.`}
                </p>

            </header>


            {/* ==================================================
                MAIN
            ================================================== */}

            <div className="service-engagement__main">

                {/* ==================================================
                    CLOCK
                ================================================== */}

                <div className="engagement-clock">

                    {/* ORBITS */}

                    <div className="engagement-clock__orbit orbit-a" />

                    <div className="engagement-clock__orbit orbit-b" />

                    <div className="engagement-clock__orbit orbit-c" />


                    {/* CENTER */}

                    <div className="engagement-clock__center">

                        <span>
                            DEVFORGE
                        </span>

                        <strong>
                            {service.number}
                        </strong>

                        <small>
                            {activePhase.label}
                        </small>

                    </div>


                    {/* NODES */}

                    {phases.map(
                        (phase, index) => {

                            const angle =
                                (360 / phases.length) *
                                index;


                            const isActive =
                                activeIndex === index;


                            return (
                                <button
                                    key={phase.number}
                                    type="button"
                                    className={`engagement-node ${isActive
                                        ? 'is-active'
                                        : ''
                                        }`}
                                    style={{
                                        '--node-angle':
                                            `${angle}deg`,
                                    } as React.CSSProperties}
                                    onMouseEnter={() =>
                                        setActiveIndex(index)
                                    }
                                    onFocus={() =>
                                        setActiveIndex(index)
                                    }
                                    onClick={() =>
                                        setActiveIndex(index)
                                    }
                                    aria-label={
                                        phase.title
                                    }
                                >

                                    <span className="engagement-node__point" />


                                    <span className="engagement-node__label">

                                        {phase.label}

                                    </span>


                                    <span className="engagement-node__number">

                                        {phase.number}

                                    </span>

                                </button>
                            );
                        }
                    )}

                </div>


                {/* ==================================================
                    DETAIL
                ================================================== */}

                <div className="engagement-detail">

                    {/* TOP */}

                    <div className="engagement-detail__top">

                        <span>
                            PHASE / {activePhase.number}
                        </span>

                        <span>
                            {String(
                                activeIndex + 1
                            ).padStart(2, '0')}
                            {' / '}
                            {String(
                                phases.length
                            ).padStart(2, '0')}
                        </span>

                    </div>


                    {/* KICKER */}

                    <span className="engagement-detail__kicker">

                        {activePhase.label}

                    </span>


                    {/* TITLE */}

                    <h3>

                        {activePhase.title}

                    </h3>


                    {/* DESCRIPTION */}

                    <p>

                        {activePhase.description}

                    </p>


                    {/* PROGRESS */}

                    <div className="engagement-detail__progress">

                        <span>
                            01
                        </span>


                        <div>

                            <i
                                style={{
                                    width:
                                        `${((activeIndex + 1) / phases.length) * 100}%`,
                                }}
                            />

                        </div>


                        <span>
                            {String(
                                phases.length
                            ).padStart(2, '0')}
                        </span>

                    </div>

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="service-engagement__statement">

                <span>
                    ENGAGEMENT / {service.number}
                </span>


                <strong>

                    CLEAR PROCESS.
                    <br />

                    <em>
                        BETTER WORK.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="service-engagement__footer">

                <span>
                    DEVFORGE / {service.number}
                </span>

                <span>
                    {service.title}
                </span>

            </footer>

        </section>
    );
};


/* ============================================================
   SERVICE-SPECIFIC ENGAGEMENT PHASES
============================================================ */

function getEngagementPhases(
    slug: string
): EngagementPhase[] {

    const phases: Record<
        string,
        EngagementPhase[]
    > = {

        /* ======================================================
           WEB / UI DESIGN
        ====================================================== */

        'web-ui-design': [

            {
                number: '01',
                label: 'DISCOVER',
                title: 'UNDERSTAND THE DIRECTION.',
                description:
                    'We understand the product, audience, goals and visual direction before shaping the interface.',
            },

            {
                number: '02',
                label: 'STRUCTURE',
                title: 'BUILD THE FOUNDATION.',
                description:
                    'Information architecture, layout hierarchy and wireframes establish the foundation of the experience.',
            },

            {
                number: '03',
                label: 'DESIGN',
                title: 'FORGE THE VISUAL SYSTEM.',
                description:
                    'Typography, spacing, components and visual direction come together into a distinctive interface.',
            },

            {
                number: '04',
                label: 'REFINE',
                title: 'POLISH EVERY DETAIL.',
                description:
                    'Responsive states, interactions and visual details are refined before the design moves into development.',
            },

        ],


        /* ======================================================
           WEB DEVELOPMENT
        ====================================================== */

        'web-development': [

            {
                number: '01',
                label: 'DISCOVER',
                title: 'DEFINE WHAT WE BUILD.',
                description:
                    'We understand the goals, pages, functionality and technical requirements before development begins.',
            },

            {
                number: '02',
                label: 'BUILD',
                title: 'TURN DESIGN INTO CODE.',
                description:
                    'The approved direction becomes a responsive, interactive and production-ready website.',
            },

            {
                number: '03',
                label: 'OPTIMIZE',
                title: 'MAKE IT PERFORM.',
                description:
                    'Performance, accessibility, responsiveness and technical SEO are refined across the experience.',
            },

            {
                number: '04',
                label: 'LAUNCH',
                title: 'SHIP THE EXPERIENCE.',
                description:
                    'The final build is prepared, tested and deployed into its production environment.',
            },

        ],


        /* ======================================================
           FULL-STACK MERN
        ====================================================== */

        'full-stack-mern': [

            {
                number: '01',
                label: 'ARCHITECT',
                title: 'MAP THE PRODUCT.',
                description:
                    'We define application architecture, user flows, data models and technical responsibilities.',
            },

            {
                number: '02',
                label: 'ENGINEER',
                title: 'BUILD EVERY LAYER.',
                description:
                    'Frontend, backend and database systems are developed as connected parts of the same product.',
            },

            {
                number: '03',
                label: 'CONNECT',
                title: 'MAKE THE SYSTEM WORK.',
                description:
                    'APIs, authentication and persistent data connect the application into one complete product.',
            },

            {
                number: '04',
                label: 'DEPLOY',
                title: 'MOVE TO PRODUCTION.',
                description:
                    'The complete application is tested and prepared for real-world production usage.',
            },

        ],


        /* ======================================================
           FRONTEND ENGINEERING
        ====================================================== */

        'frontend-engineering': [

            {
                number: '01',
                label: 'STRUCTURE',
                title: 'BUILD THE COMPONENT SYSTEM.',
                description:
                    'The interface is broken into reusable components and organized into a scalable architecture.',
            },

            {
                number: '02',
                label: 'ENGINEER',
                title: 'MAKE THE INTERFACE WORK.',
                description:
                    'Components, states and responsive behaviours are engineered around the experience.',
            },

            {
                number: '03',
                label: 'INTERACT',
                title: 'BRING IT TO LIFE.',
                description:
                    'Motion, transitions and interactions add depth while keeping the experience purposeful.',
            },

            {
                number: '04',
                label: 'REFINE',
                title: 'MAKE EVERY INTERACTION COUNT.',
                description:
                    'Rendering, responsiveness and interaction quality are refined before final delivery.',
            },

        ],


        /* ======================================================
           BACKEND / API
        ====================================================== */

        'backend-api-systems': [

            {
                number: '01',
                label: 'ARCHITECT',
                title: 'DESIGN THE SYSTEM.',
                description:
                    'We define the data model, API structure, application responsibilities and system boundaries.',
            },

            {
                number: '02',
                label: 'BUILD',
                title: 'ENGINEER THE ENGINE.',
                description:
                    'Routes, controllers, services and database interactions become the working backend.',
            },

            {
                number: '03',
                label: 'SECURE',
                title: 'PROTECT THE SYSTEM.',
                description:
                    'Validation, authentication, authorization and reliable error handling strengthen the backend.',
            },

            {
                number: '04',
                label: 'CONNECT',
                title: 'POWER THE PRODUCT.',
                description:
                    'The backend connects with its consuming applications and moves toward production.',
            },

        ],


        /* ======================================================
           ADMIN DASHBOARDS
        ====================================================== */

        'admin-dashboards': [

            {
                number: '01',
                label: 'MAP',
                title: 'UNDERSTAND THE DATA.',
                description:
                    'We identify the important business information, users, roles and workflows.',
            },

            {
                number: '02',
                label: 'STRUCTURE',
                title: 'ORGANIZE THE CONTROL.',
                description:
                    'Navigation, tables, metrics and management views are structured around actual workflows.',
            },

            {
                number: '03',
                label: 'VISUALIZE',
                title: 'MAKE DATA CLEAR.',
                description:
                    'Important information becomes useful through charts, metrics and focused visual summaries.',
            },

            {
                number: '04',
                label: 'CONTROL',
                title: 'MAKE THE SYSTEM ACTIONABLE.',
                description:
                    'Permissions, filters, CRUD actions and operational workflows come together into one control interface.',
            },

        ],

    };


    return (
        phases[slug] ??
        phases['web-development']
    );
}


export default ServiceEngagement;