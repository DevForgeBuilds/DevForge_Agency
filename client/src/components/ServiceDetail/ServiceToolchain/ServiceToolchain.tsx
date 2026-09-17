import { useState } from 'react';
import './ServiceToolchain.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceToolchainProps {
    service: ServiceData;
}


const ServiceToolchain = ({
    service,
}: ServiceToolchainProps) => {

    const [activeIndex, setActiveIndex] =
        useState(0);

    const activeGroup =
        service.toolchain[activeIndex] ??
        service.toolchain[0];


    if (!activeGroup) {
        return null;
    }


    return (
        <section
            className="service-toolchain"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="service-toolchain__header">

                <div className="service-toolchain__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        TOOLCHAIN
                    </span>

                </div>


                <h2>

                    THE RIGHT
                    <br />

                    <span>
                        TOOLS.
                    </span>

                </h2>


                <p>
                    Every service uses a focused technical
                    stack chosen around the actual problem,
                    not a one-size-fits-all toolkit.
                </p>

            </header>


            {/* ==================================================
                MAIN
            ================================================== */}

            <div className="service-toolchain__main">

                {/* ==================================================
                    TOOL LIST
                ================================================== */}

                <div className="toolchain-list">

                    {service.toolchain.map(
                        (group, index) => {

                            const isActive =
                                activeIndex === index;


                            return (
                                <button
                                    key={group.category}
                                    type="button"
                                    className={`toolchain-item ${isActive
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

                                    <span className="toolchain-item__number">

                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}

                                    </span>


                                    <span className="toolchain-item__category">

                                        {group.category}

                                    </span>


                                    <span className="toolchain-item__arrow">

                                        ↗

                                    </span>

                                </button>
                            );
                        }
                    )}

                </div>


                {/* ==================================================
                    DETAIL
                ================================================== */}

                <div className="toolchain-detail">

                    {/* TOP */}

                    <div className="toolchain-detail__top">

                        <span>
                            SYSTEM / {service.number}
                        </span>

                        <span>
                            {activeGroup.category}
                        </span>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="toolchain-detail__description">

                        {getToolchainDescription(
                            service.slug,
                            activeGroup.category
                        )}

                    </p>


                    {/* TOOLS */}

                    <div className="toolchain-detail__tools">

                        {activeGroup.tools.map(
                            (tool, index) => (

                                <div
                                    key={tool}
                                    className="tool-chip"
                                >

                                    <span>
                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}
                                    </span>

                                    <strong>
                                        {tool}
                                    </strong>

                                </div>

                            )
                        )}

                    </div>


                    {/* ==================================================
                        CORE
                    ================================================== */}

                    <div className="toolchain-core">

                        <div className="toolchain-core__rings">

                            <span />
                            <span />
                            <span />

                        </div>


                        <div className="toolchain-core__center">

                            <small>
                                {activeGroup.category}
                            </small>

                            <strong>
                                {String(
                                    activeIndex + 1
                                ).padStart(2, '0')}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="service-toolchain__statement">

                <span>
                    TOOLCHAIN / {service.number}
                </span>

                <strong>

                    THE STACK
                    <br />

                    <em>
                        SERVES THE WORK.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="service-toolchain__footer">

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
   TOOLCHAIN DESCRIPTION
============================================================ */

function getToolchainDescription(
    slug: string,
    category: string
): string {

    const descriptions: Record<
        string,
        Record<string, string>
    > = {

        'web-ui-design': {

            DESIGN:
                'Visual design tools used to shape layouts, interfaces and the overall visual direction.',

            SYSTEM:
                'A reusable foundation of typography, components and design rules that keeps the interface consistent.',

            PROTOTYPING:
                'Interactive prototypes used to validate flows, interactions and the experience before development.',
        },


        'web-development': {

            CORE:
                'The fundamental web technologies responsible for structure, styling and browser behaviour.',

            FRONTEND:
                'Modern frontend tooling used to turn designs into responsive production-ready experiences.',

            MOTION:
                'Animation and smooth-scroll tools used to create expressive interactions without losing control.',

            WORKFLOW:
                'Version control and collaboration tools that keep the development process organized and reliable.',
        },


        'full-stack-mern': {

            FRONTEND:
                'The React layer responsible for the product interface and client-side experience.',

            BACKEND:
                'Server-side technologies responsible for application logic, routes and APIs.',

            DATABASE:
                'Persistent data storage and modeling for the application.',

            AUTH:
                'Authentication and authorization technologies used to protect application access.',
        },


        'frontend-engineering': {

            CORE:
                'The primary technologies used to build scalable and maintainable frontend applications.',

            BUILD:
                'Tooling responsible for development speed, bundling and production builds.',

            MOTION:
                'Motion technologies used to create meaningful interaction and transition systems.',

            WORKFLOW:
                'Development tools used for version control, collaboration and reliable delivery.',
        },


        'backend-api-systems': {

            RUNTIME:
                'The server-side runtime responsible for executing backend application logic.',

            API:
                'Technologies used to structure endpoints and communication between application systems.',

            DATABASE:
                'Database technologies used to store, query and manage application data.',

            SECURITY:
                'Security foundations for authentication, validation and controlled application access.',
        },


        'admin-dashboards': {

            FRONTEND:
                'Frontend technologies used to build focused management and operational interfaces.',

            VISUALIZATION:
                'Tools and techniques used to transform raw information into useful visual insights.',

            DATA:
                'Technologies responsible for retrieving and managing the information displayed in the dashboard.',

            ACCESS:
                'Authentication and permission systems used to control dashboard access.',
        },

    };


    return (
        descriptions[slug]?.[category] ??
        'A focused technical stack selected around the requirements of the service.'
    );
}


export default ServiceToolchain;