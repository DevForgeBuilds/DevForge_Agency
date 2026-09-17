import { useState } from 'react';
import './ServiceFAQ.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceFAQProps {
    service: ServiceData;
}


interface FAQItem {
    question: string;
    category: string;
    answer: string;
}


const ServiceFAQ = ({
    service,
}: ServiceFAQProps) => {

    const faqItems =
        getFAQItems(service.slug);


    const [activeIndex, setActiveIndex] =
        useState(0);


    const activeFAQ =
        faqItems[activeIndex] ??
        faqItems[0];


    if (!activeFAQ) {
        return null;
    }


    return (
        <section
            className="service-faq"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="service-faq__header">

                <div className="service-faq__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        FAQ
                    </span>

                </div>


                <h2>

                    QUESTIONS
                    <br />

                    <span>
                        ANSWERED.
                    </span>

                </h2>


                <p>
                    A few practical answers about working
                    with DevForge on {service.title.toLowerCase()}.
                </p>

            </header>


            {/* ==================================================
                FAQ SYSTEM
            ================================================== */}

            <div className="service-faq__system">

                {/* ==================================================
                    FAQ LIST
                ================================================== */}

                <div className="faq-list">

                    {faqItems.map(
                        (item, index) => {

                            const isActive =
                                activeIndex === index;


                            return (
                                <button
                                    key={`${item.question}-${index}`}
                                    type="button"
                                    className={`faq-item ${isActive
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

                                    <span className="faq-item__number">

                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}

                                    </span>


                                    <span className="faq-item__question">

                                        {item.question}

                                    </span>


                                    <span className="faq-item__category">

                                        {item.category}

                                    </span>


                                    <span className="faq-item__icon">

                                        {isActive
                                            ? '−'
                                            : '+'}

                                    </span>

                                </button>
                            );
                        }
                    )}

                </div>


                {/* ==================================================
                    TERMINAL
                ================================================== */}

                <div className="faq-terminal">

                    {/* TERMINAL TOP */}

                    <div className="faq-terminal__top">

                        <div className="terminal-dots">

                            <span />
                            <span />
                            <span />

                        </div>


                        <span>
                            devforge / faq
                        </span>


                        <span>
                            ONLINE
                        </span>

                    </div>


                    {/* TERMINAL BODY */}

                    <div className="faq-terminal__body">

                        <div className="terminal-query">

                            <span>
                                &gt; QUESTION / {String(
                                    activeIndex + 1
                                ).padStart(2, '0')}
                            </span>


                            <strong>
                                {activeFAQ.question}
                            </strong>

                        </div>


                        <div className="terminal-answer">

                            <span>
                                ↳
                            </span>


                            <p>
                                {activeFAQ.answer}
                            </p>

                        </div>

                    </div>


                    {/* STATUS */}

                    <div className="terminal-status">

                        <span>
                            SERVICE / {service.number}
                        </span>


                        <strong>
                            {activeFAQ.category}
                        </strong>

                    </div>


                    {/* CURSOR */}

                    <span className="faq-terminal__cursor">
                        _
                    </span>

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="service-faq__statement">

                <span>
                    FAQ / {service.number}
                </span>


                <strong>

                    NO GUESSWORK.
                    <br />

                    <em>
                        JUST CLEAR ANSWERS.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="service-faq__footer">

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
   SERVICE-SPECIFIC FAQ
============================================================ */

function getFAQItems(
    slug: string
): FAQItem[] {

    const faq: Record<
        string,
        FAQItem[]
    > = {

        /* ======================================================
           WEB / UI DESIGN
        ====================================================== */

        'web-ui-design': [

            {
                question:
                    'DO YOU DESIGN FROM SCRATCH?',

                category:
                    'DESIGN',

                answer:
                    'Yes. We can take the project from an initial idea or rough direction through structure, visual design, responsive states and a developer-ready design system.',
            },

            {
                question:
                    'CAN YOU WORK WITH AN EXISTING BRAND?',

                category:
                    'BRAND',

                answer:
                    'Yes. Existing brand guidelines, typography and visual assets can become the foundation while we improve the digital interface and overall experience.',
            },

            {
                question:
                    'DO YOU DESIGN RESPONSIVE STATES?',

                category:
                    'RESPONSIVE',

                answer:
                    'Yes. The interface is considered across desktop, tablet and mobile so the final implementation has a clear responsive direction.',
            },

            {
                question:
                    'DO YOU PROVIDE DEVELOPER HANDOFF?',

                category:
                    'HANDOFF',

                answer:
                    'Yes. Components, layouts, typography, spacing and interaction direction can be organized so development has a clear implementation reference.',
            },

        ],


        /* ======================================================
           WEB DEVELOPMENT
        ====================================================== */

        'web-development': [

            {
                question:
                    'DO YOU BUILD RESPONSIVE WEBSITES?',

                category:
                    'RESPONSIVE',

                answer:
                    'Yes. Every website is built with responsive behaviour in mind so the experience works naturally across desktop, tablet and mobile screens.',
            },

            {
                question:
                    'CAN YOU IMPLEMENT AN EXISTING DESIGN?',

                category:
                    'IMPLEMENTATION',

                answer:
                    'Yes. We can work from an existing Figma design or design system and translate it into a polished production-ready frontend.',
            },

            {
                question:
                    'DO YOU HANDLE PERFORMANCE AND SEO?',

                category:
                    'PERFORMANCE',

                answer:
                    'Yes. Performance, semantic structure, responsive behaviour and technical SEO foundations are considered as part of the development process.',
            },

            {
                question:
                    'DO YOU HANDLE DEPLOYMENT?',

                category:
                    'LAUNCH',

                answer:
                    'Yes. The finished website can be prepared and deployed to the required production environment after final testing.',
            },

        ],


        /* ======================================================
           FULL-STACK MERN
        ====================================================== */

        'full-stack-mern': [

            {
                question:
                    'CAN YOU BUILD THE FRONTEND AND BACKEND?',

                category:
                    'FULL STACK',

                answer:
                    'Yes. The service covers the complete product layer, including React frontend development, Node.js backend systems, APIs and MongoDB data architecture.',
            },

            {
                question:
                    'DO YOU BUILD AUTHENTICATION?',

                category:
                    'AUTH',

                answer:
                    'Yes. Authentication and access-control flows can be designed around the requirements of the application.',
            },

            {
                question:
                    'CAN YOU BUILD CRUD WORKFLOWS?',

                category:
                    'CRUD',

                answer:
                    'Yes. Complete create, read, update and delete workflows can be built around the application data model and user requirements.',
            },

            {
                question:
                    'CAN YOU DEPLOY THE APPLICATION?',

                category:
                    'DEPLOYMENT',

                answer:
                    'Yes. The application can be prepared for production deployment once the frontend, backend and database workflows are tested.',
            },

        ],


        /* ======================================================
           FRONTEND ENGINEERING
        ====================================================== */

        'frontend-engineering': [

            {
                question:
                    'DO YOU WORK WITH REACT?',

                category:
                    'REACT',

                answer:
                    'Yes. React is one of the primary technologies used for building structured, reusable and scalable frontend interfaces.',
            },

            {
                question:
                    'CAN YOU BUILD CUSTOM ANIMATIONS?',

                category:
                    'MOTION',

                answer:
                    'Yes. Custom interaction and motion systems can be engineered around the visual direction of the product.',
            },

            {
                question:
                    'DO YOU BUILD REUSABLE COMPONENTS?',

                category:
                    'COMPONENTS',

                answer:
                    'Yes. Interfaces are structured into reusable components so the frontend remains maintainable as the product grows.',
            },

            {
                question:
                    'DO YOU OPTIMIZE FRONTEND PERFORMANCE?',

                category:
                    'PERFORMANCE',

                answer:
                    'Yes. Rendering behaviour, asset loading, interaction performance and responsive behaviour are refined before delivery.',
            },

        ],


        /* ======================================================
           BACKEND / API
        ====================================================== */

        'backend-api-systems': [

            {
                question:
                    'CAN YOU BUILD REST APIS?',

                category:
                    'API',

                answer:
                    'Yes. REST APIs can be designed around the application requirements with structured routes, request handling and predictable responses.',
            },

            {
                question:
                    'WHICH DATABASES DO YOU USE?',

                category:
                    'DATABASE',

                answer:
                    'MongoDB is part of the DevForge stack for suitable applications, with the database architecture designed around the actual data requirements.',
            },

            {
                question:
                    'DO YOU HANDLE AUTHENTICATION AND AUTHORIZATION?',

                category:
                    'SECURITY',

                answer:
                    'Yes. Authentication, authorization, validation and protected routes can be implemented as part of the backend system.',
            },

            {
                question:
                    'CAN YOU INTEGRATE EXTERNAL APIS?',

                category:
                    'INTEGRATION',

                answer:
                    'Yes. External services and APIs can be connected to the backend when they are required by the product.',
            },

        ],


        /* ======================================================
           ADMIN DASHBOARDS
        ====================================================== */

        'admin-dashboards': [

            {
                question:
                    'CAN YOU BUILD DATA-HEAVY DASHBOARDS?',

                category:
                    'DATA',

                answer:
                    'Yes. Dashboards can organize complex information into focused views using tables, metrics, charts and useful filtering workflows.',
            },

            {
                question:
                    'CAN USERS SEARCH AND FILTER DATA?',

                category:
                    'WORKFLOW',

                answer:
                    'Yes. Search, filtering and sorting can be implemented around the actual dataset and operational requirements.',
            },

            {
                question:
                    'CAN YOU ADD ROLE-BASED ACCESS?',

                category:
                    'ACCESS',

                answer:
                    'Yes. Different users can receive different permissions and access to dashboard functionality based on their roles.',
            },

            {
                question:
                    'CAN THE DASHBOARD MANAGE RECORDS?',

                category:
                    'CRUD',

                answer:
                    'Yes. CRUD workflows can be added when users need to create, update or remove records directly from the dashboard.',
            },

        ],

    };


    return (
        faq[slug] ??
        faq['web-development']
    );
}


export default ServiceFAQ;