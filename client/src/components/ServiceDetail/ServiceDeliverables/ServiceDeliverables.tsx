import { useState } from 'react';
import './ServiceDeliverables.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceDeliverablesProps {
    service: ServiceData;
}


const ServiceDeliverables = ({
    service,
}: ServiceDeliverablesProps) => {

    const [activeIndex, setActiveIndex] =
        useState(0);

    const activeDeliverable =
        service.deliverables[activeIndex] ??
        service.deliverables[0];


    if (!activeDeliverable) {
        return null;
    }


    return (
        <section
            className="service-deliverables"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="service-deliverables__header">

                <div className="service-deliverables__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        DELIVERABLES
                    </span>

                </div>


                <h2>
                    WHAT YOU
                    <br />
                    <span>
                        GET.
                    </span>
                </h2>


                <p>
                    Every engagement ends with a clear,
                    production-ready output designed around
                    the actual needs of the project.
                </p>

            </header>


            {/* ==================================================
                MANIFEST
            ================================================== */}

            <div className="service-deliverables__manifest">

                {/* ==================================================
                    LIST
                ================================================== */}

                <div className="deliverables-list">

                    {service.deliverables.map(
                        (deliverable, index) => {

                            const isActive =
                                activeIndex === index;


                            return (
                                <button
                                    key={`${deliverable}-${index}`}
                                    type="button"
                                    className={`deliverable-row ${isActive
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

                                    {/* NUMBER */}

                                    <span className="deliverable-row__number">

                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}

                                    </span>


                                    {/* TITLE */}

                                    <span className="deliverable-row__title">

                                        {deliverable}

                                    </span>


                                    {/* TAG */}

                                    <span className="deliverable-row__tag">

                                        {getDeliverableTag(
                                            service.slug,
                                            index
                                        )}

                                    </span>


                                    {/* STATUS */}

                                    <span className="deliverable-row__status">

                                        <i />

                                        READY

                                    </span>


                                    {/* ARROW */}

                                    <span className="deliverable-row__arrow">

                                        ↗

                                    </span>

                                </button>
                            );
                        }
                    )}

                </div>


                {/* ==================================================
                    DETAIL PANEL
                ================================================== */}

                <div className="deliverables-detail">

                    <div className="deliverables-detail__top">

                        <span>
                            OUTPUT / {service.number}
                        </span>

                        <span>
                            {String(
                                activeIndex + 1
                            ).padStart(2, '0')}
                            {' / '}
                            {String(
                                service.deliverables.length
                            ).padStart(2, '0')}
                        </span>

                    </div>


                    {/* LARGE NUMBER */}

                    <span className="deliverables-detail__number">

                        {String(
                            activeIndex + 1
                        ).padStart(2, '0')}

                    </span>


                    {/* CONTENT */}

                    <div className="deliverables-detail__content">

                        <span>
                            DELIVERABLE /{' '}
                            {String(
                                activeIndex + 1
                            ).padStart(2, '0')}
                        </span>


                        <h3>
                            {activeDeliverable}
                        </h3>


                        <p>
                            {getDeliverableDescription(
                                service.slug,
                                activeDeliverable
                            )}
                        </p>

                    </div>


                    {/* STATUS */}

                    <div className="deliverables-detail__status">

                        <div>

                            <span>
                                SERVICE
                            </span>

                            <strong>
                                {service.title}
                            </strong>

                        </div>


                        <div>

                            <span>
                                STATUS
                            </span>

                            <strong>
                                READY
                            </strong>

                        </div>

                    </div>


                    {/* CORNER */}

                    <div className="deliverables-detail__corner">

                        <span>
                            DF
                        </span>

                    </div>

                </div>

            </div>


            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div className="service-deliverables__summary">

                <span>
                    {String(
                        service.deliverables.length
                    ).padStart(2, '0')}
                    {' '}
                    OUTPUTS
                </span>


                <div className="summary-line">

                    <i />

                </div>


                <span>
                    PRODUCTION READY
                </span>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="service-deliverables__footer">

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
   DELIVERABLE TAGS
============================================================ */

function getDeliverableTag(
    slug: string,
    index: number
): string {

    const tags: Record<
        string,
        string[]
    > = {

        'web-ui-design': [
            'DESIGN',
            'SYSTEM',
            'UI',
            'HANDOFF',
        ],

        'web-development': [
            'WEB',
            'FRONTEND',
            'PERFORMANCE',
            'SEO',
            'LAUNCH',
        ],

        'full-stack-mern': [
            'PRODUCT',
            'FRONTEND',
            'BACKEND',
            'DATABASE',
            'AUTH',
            'DEPLOY',
        ],

        'frontend-engineering': [
            'UI',
            'COMPONENTS',
            'MOTION',
            'RESPONSIVE',
            'PERFORMANCE',
        ],

        'backend-api-systems': [
            'API',
            'SERVER',
            'DATABASE',
            'AUTH',
            'SECURITY',
        ],

        'admin-dashboards': [
            'DASHBOARD',
            'DATA',
            'UI',
            'WORKFLOW',
            'ACCESS',
        ],

    };


    return (
        tags[slug]?.[index] ??
        'OUTPUT'
    );
}


/* ============================================================
   DELIVERABLE DESCRIPTION
============================================================ */

function getDeliverableDescription(
    slug: string,
    deliverable: string
): string {

    const descriptions: Record<
        string,
        Record<string, string>
    > = {

        'web-ui-design': {

            'Wireframes':
                'Clear structural layouts that define the foundation of the digital experience.',

            'UI Screens':
                'Polished interface screens built around hierarchy, clarity and visual direction.',

            'Design System':
                'Reusable visual rules, components and patterns for a consistent interface.',

            'Responsive Layouts':
                'Layouts designed to adapt naturally across desktop, tablet and mobile.',

            'Interactive Prototype':
                'A clickable experience used to validate interactions and user flows.',

            'Developer Handoff':
                'Organized design assets and specifications prepared for development.',
        },


        'web-development': {

            'Responsive Website':
                'A production-ready website that adapts across modern screen sizes.',

            'Interactive Experience':
                'Responsive interactions and motion designed around the digital experience.',

            'Performance Optimization':
                'A refined build focused on fast loading and smooth interaction.',

            'SEO Foundations':
                'Technical foundations that help search engines understand and discover the website.',

            'Animation System':
                'Purposeful transitions and motion integrated into the frontend experience.',

            'Production Deployment':
                'The completed website prepared and shipped to its production environment.',
        },


        'full-stack-mern': {

            'Full-Stack Web Application':
                'A complete product connecting frontend, backend and database systems.',

            'React Frontend':
                'A component-driven frontend built around the product experience.',

            'REST API':
                'Structured API endpoints connecting the application layers.',

            'Database Architecture':
                'A data structure designed around the requirements of the product.',

            'Authentication System':
                'Secure user authentication and access management.',

            'CRUD Operations':
                'Complete create, read, update and delete workflows.',

            'Production Deployment':
                'The application prepared for real-world production usage.',
        },


        'frontend-engineering': {

            'React Frontend':
                'A scalable React interface built from reusable components.',

            'Component Architecture':
                'A structured component system designed for maintainability.',

            'Responsive Interface':
                'An interface engineered to work across screen sizes.',

            'Interaction System':
                'Interactive behaviour designed around the user experience.',

            'Animation System':
                'Smooth and intentional motion integrated into the interface.',

            'Performance Optimization':
                'Frontend refinements focused on responsiveness and rendering performance.',
        },


        'backend-api-systems': {

            'REST API':
                'A structured API layer for reliable communication between systems.',

            'Backend Services':
                'Server-side services responsible for application logic and processing.',

            'Database Structure':
                'A persistent data architecture designed around the application.',

            'Authentication':
                'Secure identity verification for application users.',

            'Authorization':
                'Controlled access based on user roles and permissions.',

            'API Documentation':
                'Clear documentation describing available endpoints and expected usage.',

            'Production Backend':
                'A backend system prepared for production deployment.',
        },


        'admin-dashboards': {

            'Admin Dashboard':
                'A focused management interface for everyday business operations.',

            'Analytics Views':
                'Clear visual views that surface important business information.',

            'Data Tables':
                'Structured records presented for efficient management.',

            'Charts & Metrics':
                'Visual summaries that make important trends easier to understand.',

            'Search & Filters':
                'Controls that help users quickly locate and narrow information.',

            'CRUD Workflows':
                'Complete management flows for creating and modifying records.',

            'Authentication':
                'Secure access control for dashboard users.',

            'Role-based Access':
                'Permissions that determine what different users can access and manage.',
        },

    };


    return (
        descriptions[slug]?.[deliverable] ??
        'A production-ready output designed around the requirements of this service.'
    );
}


export default ServiceDeliverables;