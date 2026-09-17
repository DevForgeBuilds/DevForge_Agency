import { useState } from 'react';
import './RelatedWork.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface RelatedWorkProps {
    service: ServiceData;
}


interface RelatedProject {
    number: string;
    title: string;
    category: string;
    description: string;
    accent: 'green' | 'lime' | 'dark';
}


const RelatedWork = ({
    service,
}: RelatedWorkProps) => {

    const projects =
        getRelatedProjects(service.slug);


    const [activeIndex, setActiveIndex] =
        useState(0);


    const activeProject =
        projects[activeIndex] ??
        projects[0];


    if (!activeProject) {
        return null;
    }


    return (
        <section
            className="related-work"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="related-work__header">

                <div className="related-work__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        RELATED WORK
                    </span>

                </div>


                <h2>

                    WORK
                    <br />

                    <span>
                        IN CONTEXT.
                    </span>

                </h2>


                <p>
                    A selection of work that shows how
                    this service translates into real
                    digital products and experiences.
                </p>

            </header>


            {/* ==================================================
                PROJECT NAV
            ================================================== */}

            <nav className="related-work__nav">

                {projects.map(
                    (project, index) => {

                        const isActive =
                            activeIndex === index;


                        return (
                            <button
                                key={project.number}
                                type="button"
                                className={`related-project-tab ${isActive
                                    ? 'is-active'
                                    : ''
                                    }`}
                                onMouseEnter={() =>
                                    setActiveIndex(index)
                                }
                                onFocus={() =>
                                    setActiveIndex(index)
                                }
                                onClick={() =>
                                    setActiveIndex(index)
                                }
                            >

                                <span>
                                    {project.number}
                                </span>


                                <strong>
                                    {project.title}
                                </strong>


                                <small>
                                    {project.category}
                                </small>


                                <i>
                                    ↗
                                </i>

                            </button>
                        );
                    }
                )}

            </nav>


            {/* ==================================================
                PROJECT
            ================================================== */}

            <div className="related-work__project">

                {/* ==================================================
                    VISUAL
                ================================================== */}

                <div
                    className={`related-work__visual related-work__visual--${activeProject.accent}`}
                >

                    <div className="related-work__visual-grid" />


                    {/* BROWSER */}

                    <div className="related-work__visual-browser">

                        <div className="project-browser__top">

                            <div>

                                <span />
                                <span />
                                <span />

                            </div>


                            <small>
                                devforge.local / {activeProject.title.toLowerCase().replace(/\s+/g, '-')}
                            </small>

                        </div>


                        <div className="project-browser__body">

                            <span>
                                {activeProject.category}
                            </span>


                            <strong>
                                {activeProject.title}
                            </strong>


                            <div className="project-browser__shape">

                                DF

                            </div>

                        </div>

                    </div>


                    {/* INDEX */}

                    <span className="related-work__visual-index">

                        PROJECT / {activeProject.number}

                    </span>

                </div>


                {/* ==================================================
                    INFO
                ================================================== */}

                <div className="related-work__info">

                    <div className="related-work__info-top">

                        <span>
                            SELECTED WORK
                        </span>

                        <span>
                            {activeProject.number}
                            {' / '}
                            {String(
                                projects.length
                            ).padStart(2, '0')}
                        </span>

                    </div>


                    <div className="related-work__info-main">

                        <span>
                            {activeProject.category}
                        </span>


                        <h3>
                            {activeProject.title}
                        </h3>


                        <p>
                            {activeProject.description}
                        </p>


                        <small>
                            {service.title}
                        </small>

                    </div>


                    {/* VIEW */}

                    <button
                        type="button"
                        className="related-work__view"
                    >

                        <span>
                            VIEW PROJECT
                        </span>


                        <strong>
                            ↗
                        </strong>

                    </button>

                </div>

            </div>


            {/* ==================================================
                BOTTOM
            ================================================== */}

            <div className="related-work__bottom">

                <span>
                    01
                </span>


                <div>

                    <i
                        style={{
                            display: 'block',
                            width:
                                `${((activeIndex + 1) / projects.length) * 100}%`,
                        }}
                    />

                </div>


                <span>
                    {String(
                        projects.length
                    ).padStart(2, '0')}
                </span>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="related-work__footer">

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
   SERVICE-SPECIFIC RELATED WORK
============================================================ */

function getRelatedProjects(
    slug: string
): RelatedProject[] {

    const projects: Record<
        string,
        RelatedProject[]
    > = {

        /* ======================================================
           WEB / UI DESIGN
        ====================================================== */

        'web-ui-design': [

            {
                number: '01',
                title: 'NOVA',
                category: 'WEB / UI',
                description:
                    'A distinctive interface system focused on visual hierarchy, typography and conversion.',
                accent: 'green',
            },

            {
                number: '02',
                title: 'ATLAS',
                category: 'PRODUCT UI',
                description:
                    'A structured product interface designed around clarity, navigation and reusable components.',
                accent: 'lime',
            },

            {
                number: '03',
                title: 'FRAME',
                category: 'DIGITAL EXPERIENCE',
                description:
                    'A visual web experience combining expressive layout, interaction and a focused design language.',
                accent: 'dark',
            },

        ],


        /* ======================================================
           WEB DEVELOPMENT
        ====================================================== */

        'web-development': [

            {
                number: '01',
                title: 'NOVA',
                category: 'MARKETING WEBSITE',
                description:
                    'A fast responsive marketing website engineered around performance, interaction and conversion.',
                accent: 'green',
            },

            {
                number: '02',
                title: 'ATLAS',
                category: 'WEB PLATFORM',
                description:
                    'A production-ready web platform combining responsive UI, structured content and smooth interactions.',
                accent: 'lime',
            },

            {
                number: '03',
                title: 'FRAME',
                category: 'CREATIVE WEBSITE',
                description:
                    'An expressive website built around strong visual direction, animation and frontend performance.',
                accent: 'dark',
            },

        ],


        /* ======================================================
           FULL-STACK MERN
        ====================================================== */

        'full-stack-mern': [

            {
                number: '01',
                title: 'NEXUS',
                category: 'FULL PRODUCT',
                description:
                    'A complete MERN application connecting frontend workflows, backend services and persistent data.',
                accent: 'green',
            },

            {
                number: '02',
                title: 'PULSE',
                category: 'SAAS APPLICATION',
                description:
                    'A product experience combining authentication, APIs, dashboards and database-driven workflows.',
                accent: 'lime',
            },

            {
                number: '03',
                title: 'CORE',
                category: 'WEB APPLICATION',
                description:
                    'A full-stack application engineered from product architecture through production deployment.',
                accent: 'dark',
            },

        ],


        /* ======================================================
           FRONTEND ENGINEERING
        ====================================================== */

        'frontend-engineering': [

            {
                number: '01',
                title: 'MOTION',
                category: 'INTERACTIVE UI',
                description:
                    'A frontend experience focused on expressive interaction, motion and responsive behaviour.',
                accent: 'green',
            },

            {
                number: '02',
                title: 'PULSE',
                category: 'REACT INTERFACE',
                description:
                    'A scalable React interface built from reusable components and structured frontend architecture.',
                accent: 'lime',
            },

            {
                number: '03',
                title: 'FRAME',
                category: 'EXPERIENCE',
                description:
                    'A polished frontend system combining component architecture, interaction and performance.',
                accent: 'dark',
            },

        ],


        /* ======================================================
           BACKEND / API
        ====================================================== */

        'backend-api-systems': [

            {
                number: '01',
                title: 'CORE',
                category: 'API SYSTEM',
                description:
                    'A reliable backend architecture powering application communication through structured APIs.',
                accent: 'green',
            },

            {
                number: '02',
                title: 'NEXUS',
                category: 'SERVER SYSTEM',
                description:
                    'A backend system connecting authentication, business logic and persistent application data.',
                accent: 'lime',
            },

            {
                number: '03',
                title: 'PULSE',
                category: 'DATA PLATFORM',
                description:
                    'A production-oriented server architecture designed around reliable data and service communication.',
                accent: 'dark',
            },

        ],


        /* ======================================================
           ADMIN DASHBOARDS
        ====================================================== */

        'admin-dashboards': [

            {
                number: '01',
                title: 'PULSE',
                category: 'ANALYTICS DASHBOARD',
                description:
                    'A focused analytics dashboard turning complex business information into useful visual insights.',
                accent: 'green',
            },

            {
                number: '02',
                title: 'NEXUS',
                category: 'ADMIN SYSTEM',
                description:
                    'A management interface built around tables, permissions, workflows and operational control.',
                accent: 'lime',
            },

            {
                number: '03',
                title: 'CORE',
                category: 'BUSINESS TOOL',
                description:
                    'A structured dashboard combining metrics, data management and role-based workflows.',
                accent: 'dark',
            },

        ],

    };


    return (
        projects[slug] ??
        projects['web-development']
    );
}


export default RelatedWork;