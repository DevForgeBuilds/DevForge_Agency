import './ServiceCTA.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceCTAProps {
    service: ServiceData;
}


const ServiceCTA = ({
    service,
}: ServiceCTAProps) => {

    const content =
        getCTAContent(service.slug);


    return (
        <section
            className="service-cta"
            data-service={service.slug}
        >

            {/* ==================================================
                GRID
            ================================================== */}

            <div className="service-cta__grid" />


            {/* ==================================================
                TOP
            ================================================== */}

            <div className="service-cta__top">

                <span>
                    {service.number} / READY TO FORGE
                </span>

                <span>
                    DEVFORGE / {service.title}
                </span>

            </div>


            {/* ==================================================
                MAIN
            ================================================== */}

            <div className="service-cta__main">

                {/* EYEBROW */}

                <div className="service-cta__eyebrow">

                    <i />

                    <span>
                        {content.eyebrow}
                    </span>

                </div>


                {/* TITLE */}

                <h2 className="service-cta__title">

                    <span>
                        READY
                    </span>

                    <span>
                        TO
                    </span>

                    <em>
                        FORGE?
                    </em>

                </h2>


                {/* DESCRIPTION */}

                <p className="service-cta__description">

                    {content.description}

                </p>


                {/* CTA */}

                <a
                    href="#contact"
                    className="service-cta__button"
                >

                    <span>
                        START A PROJECT
                    </span>

                    <strong>
                        ↗
                    </strong>

                </a>


                {/* ==================================================
                    ORBIT
                ================================================== */}

                <div className="service-cta__orbit">

                    <div className="service-cta__orbit-ring ring-one" />

                    <div className="service-cta__orbit-ring ring-two" />


                    <div className="service-cta__orbit-core">

                        <span>
                            DF
                        </span>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM PROCESS
            ================================================== */}

            <div className="service-cta__bottom">

                <span>
                    {content.process[0]}
                </span>

                <i />

                <span>
                    {content.process[1]}
                </span>

                <i />

                <span>
                    {content.process[2]}
                </span>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="service-cta__footer">

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
   SERVICE-SPECIFIC CTA CONTENT
============================================================ */

function getCTAContent(
    slug: string
): {
    eyebrow: string;
    description: string;
    process: [
        string,
        string,
        string
    ];
} {

    const content: Record<
        string,
        {
            eyebrow: string;
            description: string;
            process: [
                string,
                string,
                string
            ];
        }
    > = {

        /* ======================================================
           WEB / UI DESIGN
        ====================================================== */

        'web-ui-design': {

            eyebrow:
                'READY TO DESIGN SOMETHING DISTINCTIVE?',

            description:
                'Let’s turn your ideas into a clear, expressive interface with a visual system built around your product.',

            process: [
                'DISCOVER',
                'DESIGN',
                'FORGE',
            ],
        },


        /* ======================================================
           WEB DEVELOPMENT
        ====================================================== */

        'web-development': {

            eyebrow:
                'READY TO BUILD THE EXPERIENCE?',

            description:
                'Let’s turn your design into a fast, responsive and production-ready website built to perform.',

            process: [
                'PLAN',
                'BUILD',
                'LAUNCH',
            ],
        },


        /* ======================================================
           FULL-STACK MERN
        ====================================================== */

        'full-stack-mern': {

            eyebrow:
                'READY TO FORGE THE PRODUCT?',

            description:
                'From interface to API and database, let’s build a complete digital product around your actual requirements.',

            process: [
                'ARCHITECT',
                'ENGINEER',
                'DEPLOY',
            ],
        },


        /* ======================================================
           FRONTEND ENGINEERING
        ====================================================== */

        'frontend-engineering': {

            eyebrow:
                'READY TO ENGINEER THE EXPERIENCE?',

            description:
                'Let’s create a frontend that feels responsive, intentional and alive across every interaction.',

            process: [
                'STRUCTURE',
                'INTERACT',
                'REFINE',
            ],
        },


        /* ======================================================
           BACKEND / API
        ====================================================== */

        'backend-api-systems': {

            eyebrow:
                'READY TO POWER THE PRODUCT?',

            description:
                'Let’s design and engineer a reliable backend foundation that gives your product the systems it needs to scale.',

            process: [
                'ARCHITECT',
                'BUILD',
                'CONNECT',
            ],
        },


        /* ======================================================
           ADMIN DASHBOARDS
        ====================================================== */

        'admin-dashboards': {

            eyebrow:
                'READY TO TAKE CONTROL OF THE DATA?',

            description:
                'Let’s turn complex business information into a focused dashboard built around clarity, control and action.',

            process: [
                'MAP',
                'VISUALIZE',
                'CONTROL',
            ],
        },

    };


    return (
        content[slug] ??
        content['web-development']
    );
}


export default ServiceCTA;