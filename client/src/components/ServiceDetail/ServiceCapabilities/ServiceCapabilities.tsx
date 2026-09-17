import { useState } from 'react';
import './ServiceCapabilities.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceCapabilitiesProps {
    service: ServiceData;
}


const ServiceCapabilities = ({
    service,
}: ServiceCapabilitiesProps) => {

    const [activeIndex, setActiveIndex] =
        useState<number | null>(0);


    return (
        <section
            className="service-capabilities"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="service-capabilities__header">

                <div className="service-capabilities__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        CAPABILITIES
                    </span>

                </div>


                <h2>

                    {service.capabilities.title}

                </h2>


                <p>

                    {service.capabilities.description}

                </p>

            </div>


            {/* ==================================================
                CONTENT
            ================================================== */}

            <div className="service-capabilities__content">

                {/* ==================================================
                    CAPABILITY LIST
                ================================================== */}

                <div className="service-capabilities__list">

                    {service.capabilities.items.map(
                        (item, index) => {

                            const isActive =
                                activeIndex === index;


                            return (

                                <button
                                    key={item}
                                    type="button"
                                    className={`capability-row ${isActive
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
                                        setActiveIndex(
                                            isActive
                                                ? null
                                                : index
                                        )
                                    }
                                >

                                    {/* NUMBER */}

                                    <span className="capability-row__number">

                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}

                                    </span>


                                    {/* MAIN */}

                                    <span className="capability-row__main">

                                        <span className="capability-row__title">

                                            {item}

                                        </span>


                                        <span className="capability-row__description">

                                            {getCapabilityDescription(
                                                service.slug,
                                                item
                                            )}

                                        </span>


                                        <span className="capability-row__stack">

                                            {getCapabilityStack(
                                                service.slug
                                            )}

                                        </span>

                                    </span>


                                    {/* ARROW */}

                                    <span className="capability-row__arrow">

                                        ↗

                                    </span>

                                </button>

                            );
                        }
                    )}

                </div>


                {/* ==================================================
                    VISUAL
                ================================================== */}

                <div className="service-capabilities__visual">

                    {/* TOP */}

                    <div className="capability-visual__top">

                        <span>
                            SYSTEM / {service.number}
                        </span>

                        <span>
                            {service.label}
                        </span>

                    </div>


                    {/* STAGE */}

                    <div className="capability-visual__stage">

                        {/* GRID */}

                        <div className="capability-visual__grid" />


                        {/* ORBITS */}

                        <div className="capability-visual__orbit orbit-one" />

                        <div className="capability-visual__orbit orbit-two" />


                        {/* CORE */}

                        <div
                            className={`capability-visual__core capability-visual__core--${activeIndex !== null
                                ? (activeIndex % 4) + 1
                                : 1
                                }`}
                        >

                            <span className="capability-visual__symbol">

                                DF / {service.number}

                            </span>


                            <span className="capability-visual__df">

                                DF

                            </span>

                        </div>

                    </div>


                    {/* BOTTOM */}

                    <div className="capability-visual__bottom">

                        <span>
                            CAPABILITY SYSTEM
                        </span>

                        <strong>
                            {activeIndex !== null
                                ? service.capabilities.items[
                                activeIndex
                                ]
                                : service.title}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="service-capabilities__footer">

                <span>
                    DEVFORGE / {service.number}
                </span>

                <span>
                    {service.title}
                </span>

            </div>

        </section>
    );
};


/* ============================================================
   CAPABILITY DESCRIPTION
============================================================ */

function getCapabilityDescription(
    slug: string,
    capability: string
): string {

    const descriptions: Record<
        string,
        Record<string, string>
    > = {

        'web-ui-design': {

            'Wireframing':
                'Define structure and hierarchy before visual design.',

            'UI Design':
                'Create polished interfaces with a distinctive visual language.',

            'UX Structure':
                'Organize flows and interactions around user intent.',

            'Design Systems':
                'Build reusable components and consistent visual rules.',

            'Typography':
                'Use type hierarchy to create clarity and character.',

            'Responsive Design':
                'Design layouts that adapt naturally across devices.',

            'Interaction Design':
                'Shape meaningful interactions between users and interfaces.',

            'Visual Direction':
                'Create a recognizable visual identity for the experience.',
        },


        'web-development': {

            'Responsive Development':
                'Build layouts that perform across every screen size.',

            'Frontend Architecture':
                'Create maintainable and scalable frontend structures.',

            'Performance Optimization':
                'Reduce unnecessary work and improve loading behaviour.',

            'SEO Foundations':
                'Build the technical foundation required for discoverability.',

            'Interactive Animations':
                'Engineer motion that adds depth without hurting performance.',

            'Accessibility':
                'Make the experience usable for a wider range of users.',

            'API Integration':
                'Connect the frontend with the required external systems.',

            'Production Deployment':
                'Prepare and ship the finished experience to production.',
        },


        'full-stack-mern': {

            'React Applications':
                'Build scalable interfaces using reusable React architecture.',

            'REST APIs':
                'Connect application layers through structured API endpoints.',

            'Node.js Backend':
                'Create server-side application logic and services.',

            'Express.js':
                'Structure backend routes, middleware and controllers.',

            'MongoDB':
                'Store and manage application data through a flexible database.',

            'Authentication':
                'Protect application access through secure authentication flows.',

            'CRUD Systems':
                'Create complete create, read, update and delete workflows.',

            'Database Architecture':
                'Structure data around the needs of the product.',

            'API Integration':
                'Connect frontend and backend systems into one flow.',

            'Deployment':
                'Prepare the complete product for production.',
        },


        'frontend-engineering': {

            'React Architecture':
                'Structure frontend applications around scalable components.',

            'Component Systems':
                'Create reusable building blocks for the interface.',

            'State Management':
                'Control application state and interaction predictably.',

            'Responsive UI':
                'Engineer interfaces that adapt across devices.',

            'Motion Systems':
                'Build intentional animation and transition systems.',

            'Interaction Design':
                'Turn static interfaces into responsive experiences.',

            'Performance':
                'Optimize rendering and interaction behaviour.',

            'Accessibility':
                'Engineer interfaces with inclusive interaction in mind.',

            'Reusable Components':
                'Build modular components that can evolve with the product.',
        },


        'backend-api-systems': {

            'REST APIs':
                'Design predictable endpoints for application communication.',

            'Node.js Services':
                'Build server-side services around product requirements.',

            'Express.js':
                'Organize backend routing and request handling.',

            'Database Architecture':
                'Design reliable data structures and relationships.',

            'Authentication':
                'Verify users and protect application access.',

            'Authorization':
                'Control access based on user roles and permissions.',

            'Validation':
                'Ensure incoming data follows expected rules.',

            'Error Handling':
                'Create predictable responses when systems fail.',

            'API Integration':
                'Connect external and internal systems together.',

            'Security Foundations':
                'Build essential protection into the application layer.',
        },


        'admin-dashboards': {

            'Dashboard UI':
                'Create focused interfaces for managing business operations.',

            'Data Visualization':
                'Turn complex information into understandable visual patterns.',

            'Tables':
                'Present structured records clearly and efficiently.',

            'Charts':
                'Expose trends and important metrics visually.',

            'Search':
                'Help users quickly find the information they need.',

            'Filters':
                'Allow users to narrow large datasets efficiently.',

            'Sorting':
                'Organize information around useful business priorities.',

            'CRUD Workflows':
                'Manage records through complete operational workflows.',

            'Authentication':
                'Protect dashboard access and user sessions.',

            'Role-based Access':
                'Show the right controls to the right users.',

            'Responsive Management UI':
                'Keep operational interfaces usable across screen sizes.',
        },
    };


    return (
        descriptions[slug]?.[capability] ??
        'A focused capability designed around the requirements of the service.'
    );
}


/* ============================================================
   CAPABILITY STACK
============================================================ */

function getCapabilityStack(
    slug: string
): string {

    const stacks: Record<string, string> = {

        'web-ui-design':
            'LAYOUT · TYPE · UI',

        'web-development':
            'WEB · PERFORMANCE · SEO',

        'full-stack-mern':
            'REACT · NODE · MONGO',

        'frontend-engineering':
            'REACT · MOTION · UX',

        'backend-api-systems':
            'NODE · API · DATABASE',

        'admin-dashboards':
            'DATA · CONTROL · WORKFLOW',
    };


    return (
        stacks[slug] ??
        'DEVFORGE · BUILD · CODE'
    );
}


export default ServiceCapabilities;