import { useEffect, useMemo, useRef, useState } from 'react';
import './ServiceDetailMinimal.css';

interface ServiceDetailMinimalProps {
    serviceSlug: string;
}

interface ServiceConfig {
    number: string;
    title: string;
    label: string;
    description: string;
    intro: string;
    capabilities: string[];
    process: {
        number: string;
        title: string;
        description: string;
    }[];
    experience: string[];
    tools: string[];
    deliverables: string[];
    engagement: string[];
    related: string[];
    faq: {
        question: string;
        answer: string;
    }[];
}

const SERVICE_DATA: Record<string, ServiceConfig> = {

    'web-ui-design': {

        number: '01',

        title: 'WEB / UI DESIGN',

        label: 'DESIGN SYSTEM',

        description:
            'Distinctive digital interfaces and web experiences designed around clarity, character and conversion.',

        intro:
            'We design digital experiences where visual identity, structure and usability work as one coherent system.',

        capabilities: [
            'Interface Design',
            'Design Systems',
            'UX Structure',
            'Typography',
            'Responsive Layouts',
            'Interaction Design',
        ],

        process: [
            {
                number: '01',
                title: 'DISCOVER',
                description:
                    'Understand the product, audience, goals and visual direction before defining the interface.',
            },
            {
                number: '02',
                title: 'STRUCTURE',
                description:
                    'Shape information architecture, layouts and interaction patterns into a clear system.',
            },
            {
                number: '03',
                title: 'DESIGN',
                description:
                    'Build the visual language through typography, spacing, components and responsive states.',
            },
            {
                number: '04',
                title: 'REFINE',
                description:
                    'Polish every important detail until the experience feels intentional and complete.',
            },
        ],

        experience: [
            'Clear visual hierarchy',
            'Responsive-first thinking',
            'Consistent component language',
            'Purposeful interaction',
        ],

        tools: [
            'Figma',
            'FigJam',
            'Design Systems',
            'Prototyping',
            'Typography',
            'Motion Planning',
        ],

        deliverables: [
            'UX Structure',
            'High-fidelity UI',
            'Responsive layouts',
            'Design system',
            'Interactive prototypes',
        ],

        engagement: [
            'Project based',
            'Design sprint',
            'Product design',
            'Design partnership',
        ],

        related: [
            'Web Development',
            'Frontend Engineering',
            'Admin Dashboards',
        ],

        faq: [
            {
                question: 'Do you design responsive interfaces?',
                answer:
                    'Yes. Interfaces are planned across desktop, tablet and mobile states from the beginning.',
            },
            {
                question: 'Can you create a design system?',
                answer:
                    'Yes. Components, typography, spacing and reusable visual rules can be structured into a complete design system.',
            },
            {
                question: 'Can the design be developed afterward?',
                answer:
                    'Yes. The design can move directly into development through the DevForge workflow.',
            },
        ],
    },


    'web-development': {

        number: '02',

        title: 'WEB DEVELOPMENT',

        label: 'DEVELOPMENT',

        description:
            'Fast, responsive and carefully engineered websites built to feel as good as they perform.',

        intro:
            'We turn structured designs into fast, responsive and production-ready websites built around performance and usability.',

        capabilities: [
            'Responsive Development',
            'Component Architecture',
            'Performance',
            'SEO',
            'Accessibility',
            'Deployment',
        ],

        process: [
            {
                number: '01',
                title: 'PLAN',
                description:
                    'Translate the requirements and interface into a practical technical structure.',
            },
            {
                number: '02',
                title: 'BUILD',
                description:
                    'Develop reusable components and responsive layouts with clean architecture.',
            },
            {
                number: '03',
                title: 'OPTIMIZE',
                description:
                    'Improve loading, responsiveness, accessibility and search visibility.',
            },
            {
                number: '04',
                title: 'LAUNCH',
                description:
                    'Test the complete experience and move the final build into production.',
            },
        ],

        experience: [
            'Fast page loading',
            'Responsive behavior',
            'Clean component architecture',
            'SEO-ready structure',
        ],

        tools: [
            'React',
            'TypeScript',
            'Vite',
            'GSAP',
            'CSS',
            'Git',
        ],

        deliverables: [
            'Production website',
            'Responsive layouts',
            'Reusable components',
            'SEO structure',
            'Deployment setup',
        ],

        engagement: [
            'Website build',
            'Existing site rebuild',
            'Landing page',
            'Performance upgrade',
        ],

        related: [
            'Web / UI Design',
            'Frontend Engineering',
            'Full-Stack MERN',
        ],

        faq: [
            {
                question: 'Are websites responsive?',
                answer:
                    'Yes. The experience is built to work across desktop, tablet and mobile screens.',
            },
            {
                question: 'Do you handle deployment?',
                answer:
                    'Yes. Deployment and production setup can be included in the project.',
            },
            {
                question: 'Can you work from an existing design?',
                answer:
                    'Yes. Existing Figma or other design files can be converted into a production-ready website.',
            },
        ],
    },


    'full-stack-mern': {

        number: '03',

        title: 'FULL-STACK MERN',

        label: 'FULL PRODUCT',

        description:
            'Complete digital products connecting thoughtful interfaces with powerful backend systems.',

        intro:
            'We build complete products where frontend experiences, APIs, business logic and data systems operate together.',

        capabilities: [
            'React Applications',
            'Node.js APIs',
            'MongoDB',
            'Authentication',
            'Business Logic',
            'Deployment',
        ],

        process: [
            {
                number: '01',
                title: 'ARCHITECT',
                description:
                    'Define the product structure, data flow and technical architecture before implementation.',
            },
            {
                number: '02',
                title: 'ENGINEER',
                description:
                    'Build the frontend, backend and database layers as one connected system.',
            },
            {
                number: '03',
                title: 'INTEGRATE',
                description:
                    'Connect authentication, APIs, business workflows and application state.',
            },
            {
                number: '04',
                title: 'SHIP',
                description:
                    'Test, optimize and deploy the complete product for real users.',
            },
        ],

        experience: [
            'Connected product architecture',
            'Secure authentication',
            'Reusable frontend systems',
            'Scalable API structure',
        ],

        tools: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
            'JWT',
            'REST APIs',
        ],

        deliverables: [
            'Frontend application',
            'Backend API',
            'Database architecture',
            'Authentication',
            'Production deployment',
        ],

        engagement: [
            'MVP development',
            'Product build',
            'SaaS application',
            'Custom web application',
        ],

        related: [
            'Frontend Engineering',
            'Backend & API Systems',
            'Admin Dashboards',
        ],

        faq: [
            {
                question: 'Can you build the frontend and backend together?',
                answer:
                    'Yes. Full-stack projects are developed as one connected product rather than separate layers.',
            },
            {
                question: 'Do you build authentication?',
                answer:
                    'Yes. Authentication and authorization can be designed around the requirements of the application.',
            },
            {
                question: 'Can the application be deployed?',
                answer:
                    'Yes. Production deployment can be included as part of the build.',
            },
        ],
    },


    'frontend-engineering': {

        number: '04',

        title: 'FRONTEND ENGINEERING',

        label: 'ENGINEERING',

        description:
            'Interactive frontend experiences built with modern technologies, smooth motion and clean architecture.',

        intro:
            'We engineer interfaces where components, motion, responsiveness and performance behave as one system.',

        capabilities: [
            'Component Systems',
            'Interaction',
            'Motion',
            'Responsive UI',
            'Performance',
            'Accessibility',
        ],

        process: [
            {
                number: '01',
                title: 'MODEL',
                description:
                    'Break the interface into reusable components and define their states and relationships.',
            },
            {
                number: '02',
                title: 'ENGINEER',
                description:
                    'Build the frontend architecture with clean, reusable and maintainable components.',
            },
            {
                number: '03',
                title: 'ANIMATE',
                description:
                    'Introduce motion and interaction where it improves clarity and experience.',
            },
            {
                number: '04',
                title: 'OPTIMIZE',
                description:
                    'Refine rendering, responsiveness and interaction performance across devices.',
            },
        ],

        experience: [
            'Reusable components',
            'Purposeful motion',
            'Smooth interactions',
            'Performance-focused rendering',
        ],

        tools: [
            'React',
            'TypeScript',
            'GSAP',
            'CSS',
            'Vite',
            'Component Systems',
        ],

        deliverables: [
            'Frontend architecture',
            'Interactive components',
            'Motion systems',
            'Responsive implementation',
            'Performance optimization',
        ],

        engagement: [
            'Frontend build',
            'Interaction upgrade',
            'Design-to-code',
            'Frontend partnership',
        ],

        related: [
            'Web / UI Design',
            'Web Development',
            'Full-Stack MERN',
        ],

        faq: [
            {
                question: 'Can you add advanced interactions?',
                answer:
                    'Yes. Motion can be integrated into transitions, scrolling, navigation and interactive components.',
            },
            {
                question: 'Do you work with existing designs?',
                answer:
                    'Yes. Existing product designs can be translated into production-ready frontend systems.',
            },
            {
                question: 'Is performance considered during development?',
                answer:
                    'Yes. Component architecture and interaction performance are considered throughout implementation.',
            },
        ],
    },


    'backend-api-systems': {

        number: '05',

        title: 'BACKEND & API SYSTEMS',

        label: 'SYSTEMS',

        description:
            'Reliable server-side systems, APIs and data architecture designed to power real products.',

        intro:
            'We engineer the systems behind digital products — from APIs and business logic to databases and authentication.',

        capabilities: [
            'API Architecture',
            'Server Logic',
            'Authentication',
            'Database Systems',
            'Security',
            'Scalability',
        ],

        process: [
            {
                number: '01',
                title: 'MODEL',
                description:
                    'Define entities, relationships, API contracts and the structure of the system.',
            },
            {
                number: '02',
                title: 'ARCHITECT',
                description:
                    'Organize routes, services, controllers and data layers into a maintainable architecture.',
            },
            {
                number: '03',
                title: 'BUILD',
                description:
                    'Implement APIs, authentication, business logic and database operations.',
            },
            {
                number: '04',
                title: 'HARDEN',
                description:
                    'Improve validation, security, reliability and production readiness.',
            },
        ],

        experience: [
            'Structured APIs',
            'Secure authentication',
            'Reliable data flow',
            'Maintainable server architecture',
        ],

        tools: [
            'Node.js',
            'Express',
            'MongoDB',
            'REST API',
            'JWT',
            'Database Design',
        ],

        deliverables: [
            'API architecture',
            'Server implementation',
            'Database layer',
            'Authentication',
            'API documentation',
        ],

        engagement: [
            'API development',
            'Backend architecture',
            'Database implementation',
            'System modernization',
        ],

        related: [
            'Full-Stack MERN',
            'Frontend Engineering',
            'Admin Dashboards',
        ],

        faq: [
            {
                question: 'Can you build APIs for an existing frontend?',
                answer:
                    'Yes. APIs can be designed and implemented around an existing frontend or product.',
            },
            {
                question: 'Do you handle authentication?',
                answer:
                    'Yes. Authentication and authorization systems can be implemented according to the product requirements.',
            },
            {
                question: 'Can you design the database too?',
                answer:
                    'Yes. Data models and database architecture are part of the backend engineering process.',
            },
        ],
    },


    'admin-dashboards': {

        number: '06',

        title: 'ADMIN DASHBOARDS',

        label: 'BUSINESS TOOLS',

        description:
            'Focused management interfaces that turn complex business data into simple, useful workflows.',

        intro:
            'We transform operational data into focused dashboards that help teams understand, manage and act quickly.',

        capabilities: [
            'Data Visualization',
            'KPI Systems',
            'Tables',
            'Filters',
            'Role-based Access',
            'Workflow Design',
        ],

        process: [
            {
                number: '01',
                title: 'UNDERSTAND',
                description:
                    'Identify the business information, users and decisions the dashboard needs to support.',
            },
            {
                number: '02',
                title: 'STRUCTURE',
                description:
                    'Organize metrics, records, filters and workflows into a clear information hierarchy.',
            },
            {
                number: '03',
                title: 'BUILD',
                description:
                    'Develop responsive dashboard interfaces with reusable components and data states.',
            },
            {
                number: '04',
                title: 'REFINE',
                description:
                    'Simplify workflows and make important information easier to understand and act on.',
            },
        ],

        experience: [
            'Clear KPI hierarchy',
            'Useful data visualization',
            'Efficient workflows',
            'Role-aware interfaces',
        ],

        tools: [
            'React',
            'TypeScript',
            'Charts',
            'Tables',
            'REST APIs',
            'Role-based UI',
        ],

        deliverables: [
            'Dashboard interface',
            'Data visualization',
            'Management tables',
            'Filters and workflows',
            'Responsive states',
        ],

        engagement: [
            'Internal dashboard',
            'Business platform',
            'Analytics interface',
            'Operations system',
        ],

        related: [
            'Frontend Engineering',
            'Backend & API Systems',
            'Full-Stack MERN',
        ],

        faq: [
            {
                question: 'Can dashboards connect to live data?',
                answer:
                    'Yes. Dashboard interfaces can connect to APIs and live application data.',
            },
            {
                question: 'Can you build role-based dashboards?',
                answer:
                    'Yes. Different users can be given different views, permissions and workflows.',
            },
            {
                question: 'Can existing dashboards be redesigned?',
                answer:
                    'Yes. Existing business interfaces can be redesigned and rebuilt with a cleaner structure.',
            },
        ],
    },
};


const ServiceDetailMinimal = ({
    serviceSlug,
}: ServiceDetailMinimalProps) => {

    const service =
        SERVICE_DATA[serviceSlug];

    const pageRef =
        useRef<HTMLDivElement | null>(null);

    const [openFaq, setOpenFaq] =
        useState<number | null>(null);

    const [activeProcess, setActiveProcess] =
        useState(0);

    const [scrolled, setScrolled] =
        useState(false);


    useEffect(() => {

        const handleScroll = () => {

            setScrolled(
                window.scrollY > 40
            );

        };

        window.addEventListener(
            'scroll',
            handleScroll,
            { passive: true }
        );

        return () => {

            window.removeEventListener(
                'scroll',
                handleScroll
            );

        };

    }, []);


    useEffect(() => {

        const page =
            pageRef.current;

        if (!page) {
            return;
        }

        const sections =
            page.querySelectorAll<HTMLElement>(
                '[data-reveal]'
            );

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                'is-visible'
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                }
            );


        sections.forEach(section => {

            observer.observe(section);

        });


        return () => {

            observer.disconnect();

        };

    }, [serviceSlug]);


    const serviceInitials =
        useMemo(() => {

            return service?.title
                .replace(/[^A-Z ]/gi, '')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map(word => word[0])
                .join('')
                .toUpperCase();

        }, [service]);


    if (!service) {
        return null;
    }


    return (
        <div
            ref={pageRef}
            className="service-minimal"
            data-service={serviceSlug}
        >

            {/* ==================================================
                FLOATING NAV
            ================================================== */}

            <div
                className={`service-minimal__nav ${scrolled
                    ? 'is-scrolled'
                    : ''
                    }`}
            >

                <span>
                    DEVFORGE
                </span>

                <span>
                    SERVICES / {service.number}
                </span>

                <span>
                    {serviceInitials}
                </span>

            </div>


            {/* ==================================================
                HERO
            ================================================== */}

            <header className="minimal-hero">

                <div className="minimal-hero__meta">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        {service.label}
                    </span>

                    <span>
                        2026
                    </span>

                </div>


                <div className="minimal-hero__content">

                    <div>

                        <p className="minimal-kicker">
                            DIGITAL SERVICE / DEVFORGE
                        </p>


                        <h1>
                            {service.title}
                        </h1>

                    </div>


                    <div className="minimal-hero__aside">

                        <p>
                            {service.description}
                        </p>


                        <span>
                            SCROLL TO EXPLORE ↓
                        </span>

                    </div>

                </div>


                <div className="minimal-hero__bottom">

                    <span>
                        BUILD
                    </span>

                    <span>
                        /
                    </span>

                    <span>
                        CODE
                    </span>

                    <span>
                        /
                    </span>

                    <span>
                        LAUNCH
                    </span>

                    <span className="minimal-hero__line" />

                    <span>
                        {service.number} / 06
                    </span>

                </div>

            </header>


            {/* ==================================================
                INTRO
            ================================================== */}

            <section
                className="minimal-section minimal-intro"
                data-reveal
            >

                <div className="minimal-section__index">
                    01 / APPROACH
                </div>


                <div className="minimal-intro__content">

                    <p className="minimal-label">
                        THE APPROACH
                    </p>


                    <h2>
                        WE BUILD
                        <br />
                        WITH
                        <em>
                            INTENT.
                        </em>
                    </h2>


                    <p className="minimal-intro__description">
                        {service.intro}
                    </p>

                </div>

            </section>


            {/* ==================================================
                CAPABILITIES
            ================================================== */}

            <section
                className="minimal-section minimal-capabilities"
                data-reveal
            >

                <div className="minimal-section__index">
                    02 / CAPABILITIES
                </div>


                <div className="minimal-section__body">

                    <div className="minimal-heading">

                        <p className="minimal-label">
                            WHAT WE DO
                        </p>

                        <h2>
                            BUILT FOR
                            <br />
                            THE
                            <em>
                                JOB.
                            </em>
                        </h2>

                    </div>


                    <div className="minimal-capabilities__list">

                        {service.capabilities.map(
                            (capability, index) => (

                                <div
                                    key={capability}
                                    className="minimal-capability"
                                >

                                    <span>
                                        {String(index + 1)
                                            .padStart(2, '0')}
                                    </span>

                                    <strong>
                                        {capability}
                                    </strong>

                                    <i>
                                        ↗
                                    </i>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                PROCESS
            ================================================== */}

            <section
                className="minimal-section minimal-process"
                data-reveal
            >

                <div className="minimal-section__index">
                    03 / PROCESS
                </div>


                <div className="minimal-section__body">

                    <div className="minimal-heading">

                        <p className="minimal-label">
                            HOW WE WORK
                        </p>

                        <h2>
                            FROM
                            <br />
                            IDEA TO
                            <br />
                            <em>
                                REAL.
                            </em>
                        </h2>

                    </div>


                    <div className="minimal-process__steps">

                        {service.process.map(
                            (step, index) => (

                                <button
                                    key={step.number}
                                    type="button"
                                    className={`minimal-process__step ${activeProcess === index
                                        ? 'is-active'
                                        : ''
                                        }`}
                                    onClick={() =>
                                        setActiveProcess(index)
                                    }
                                >

                                    <span>
                                        {step.number}
                                    </span>


                                    <strong>
                                        {step.title}
                                    </strong>


                                    <p>
                                        {step.description}
                                    </p>


                                    <i>
                                        {activeProcess === index
                                            ? '—'
                                            : '+'}
                                    </i>

                                </button>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                EXPERIENCE
            ================================================== */}

            <section
                className="minimal-section minimal-experience"
                data-reveal
            >

                <div className="minimal-section__index">
                    04 / EXPERIENCE
                </div>


                <div className="minimal-experience__content">

                    <p className="minimal-label">
                        THE RESULT
                    </p>


                    <h2>
                        EXPERIENCES
                        <br />
                        THAT
                        <em>
                            WORK.
                        </em>
                    </h2>


                    <div className="minimal-experience__grid">

                        {service.experience.map(
                            (item, index) => (

                                <div
                                    key={item}
                                >

                                    <span>
                                        0{index + 1}
                                    </span>

                                    <strong>
                                        {item}
                                    </strong>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                TECHNOLOGY
            ================================================== */}

            <section
                className="minimal-section minimal-toolchain"
                data-reveal
            >

                <div className="minimal-section__index">
                    05 / TOOLCHAIN
                </div>


                <div className="minimal-section__body">

                    <div className="minimal-heading">

                        <p className="minimal-label">
                            TECHNOLOGY
                        </p>

                        <h2>
                            THE RIGHT
                            <br />
                            <em>
                                TOOLS.
                            </em>
                        </h2>

                    </div>


                    <div className="minimal-tools">

                        {service.tools.map(
                            (tool, index) => (

                                <div
                                    key={tool}
                                    className="minimal-tool"
                                >

                                    <span>
                                        {String(index + 1)
                                            .padStart(2, '0')}
                                    </span>

                                    <strong>
                                        {tool}
                                    </strong>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                DELIVERABLES
            ================================================== */}

            <section
                className="minimal-section minimal-deliverables"
                data-reveal
            >

                <div className="minimal-section__index">
                    06 / DELIVERABLES
                </div>


                <div className="minimal-deliverables__content">

                    <p className="minimal-label">
                        WHAT YOU GET
                    </p>


                    <h2>
                        READY TO
                        <br />
                        <em>
                            SHIP.
                        </em>
                    </h2>


                    <div className="minimal-deliverables__list">

                        {service.deliverables.map(
                            (item, index) => (

                                <div
                                    key={item}
                                >

                                    <span>
                                        0{index + 1}
                                    </span>

                                    <strong>
                                        {item}
                                    </strong>

                                    <i>
                                        ↗
                                    </i>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                ENGAGEMENT
            ================================================== */}

            <section
                className="minimal-section minimal-engagement"
                data-reveal
            >

                <div className="minimal-section__index">
                    07 / ENGAGEMENT
                </div>


                <div className="minimal-engagement__content">

                    <div>

                        <p className="minimal-label">
                            WORK TOGETHER
                        </p>

                        <h2>
                            ONE PROJECT.
                            <br />
                            <em>
                                DONE RIGHT.
                            </em>
                        </h2>

                    </div>


                    <div className="minimal-engagement__options">

                        {service.engagement.map(
                            (item, index) => (

                                <div
                                    key={item}
                                >

                                    <span>
                                        0{index + 1}
                                    </span>

                                    <strong>
                                        {item}
                                    </strong>

                                    <i>
                                        ↗
                                    </i>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                RELATED WORK
            ================================================== */}

            <section
                className="minimal-section minimal-related"
                data-reveal
            >

                <div className="minimal-section__index">
                    08 / RELATED
                </div>


                <div className="minimal-related__content">

                    <p className="minimal-label">
                        EXPLORE MORE
                    </p>


                    <h2>
                        MORE FROM
                        <br />
                        <em>
                            DEVFORGE.
                        </em>
                    </h2>


                    <div className="minimal-related__list">

                        {service.related.map(
                            (item, index) => (

                                <div
                                    key={item}
                                >

                                    <span>
                                        0{index + 1}
                                    </span>

                                    <strong>
                                        {item}
                                    </strong>

                                    <i>
                                        ↗
                                    </i>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                FAQ
            ================================================== */}

            <section
                className="minimal-section minimal-faq"
                data-reveal
            >

                <div className="minimal-section__index">
                    09 / FAQ
                </div>


                <div className="minimal-section__body">

                    <div className="minimal-heading">

                        <p className="minimal-label">
                            QUESTIONS
                        </p>

                        <h2>
                            GOOD TO
                            <br />
                            <em>
                                KNOW.
                            </em>
                        </h2>

                    </div>


                    <div className="minimal-faq__list">

                        {service.faq.map(
                            (item, index) => {

                                const isOpen =
                                    openFaq === index;


                                return (
                                    <div
                                        key={item.question}
                                        className={`minimal-faq__item ${isOpen
                                            ? 'is-open'
                                            : ''
                                            }`}
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenFaq(
                                                    isOpen
                                                        ? null
                                                        : index
                                                )
                                            }
                                        >

                                            <span>
                                                0{index + 1}
                                            </span>

                                            <strong>
                                                {item.question}
                                            </strong>

                                            <i>
                                                {isOpen
                                                    ? '−'
                                                    : '+'}
                                            </i>

                                        </button>


                                        <div className="minimal-faq__answer">

                                            <p>
                                                {item.answer}
                                            </p>

                                        </div>

                                    </div>
                                );

                            }
                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                CTA
            ================================================== */}

            <section
                className="minimal-cta"
                data-reveal
            >

                <div className="minimal-cta__meta">

                    <span>
                        {service.number} / 06
                    </span>

                    <span>
                        DEVFORGE
                    </span>

                </div>


                <div className="minimal-cta__content">

                    <p className="minimal-label">
                        READY WHEN YOU ARE
                    </p>


                    <h2>
                        LET'S BUILD
                        <br />
                        SOMETHING
                        <br />
                        <em>
                            WORTH SHIPPING.
                        </em>
                    </h2>


                    <button
                        type="button"
                        className="minimal-cta__button"
                    >

                        START A PROJECT

                        <span>
                            ↗
                        </span>

                    </button>

                </div>


                <div className="minimal-cta__footer">

                    <span>
                        BUILD / CODE / LAUNCH
                    </span>

                    <span>
                        {service.title}
                    </span>

                    <span>
                        © 2026 DEVFORGE
                    </span>

                </div>

            </section>

        </div>
    );
};


export default ServiceDetailMinimal;