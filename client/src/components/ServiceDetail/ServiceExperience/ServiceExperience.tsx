import './ServiceExperience.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceExperienceProps {
    service: ServiceData;
}


const ServiceExperience = ({
    service,
}: ServiceExperienceProps) => {

    const codeLines =
        getExperienceCode(service.slug);

    const browserContent =
        getBrowserContent(service.slug);


    return (
        <section
            className="service-experience"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="service-experience__header">

                <div className="service-experience__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        SIGNATURE EXPERIENCE
                    </span>

                </div>


                <div className="service-experience__counter">

                    <strong>
                        01
                    </strong>

                    <span>
                        / 01
                    </span>

                </div>

            </div>


            {/* ==================================================
                STAGE
            ================================================== */}

            <div className="service-experience__stage">

                {/* ==================================================
                    CODE PANEL
                ================================================== */}

                <div className="experience-code">

                    <div className="experience-code__top">

                        <span>
                            DEVFORGE / EXPERIENCE
                        </span>

                        <span>
                            LIVE
                        </span>

                    </div>


                    <div className="experience-code__body">

                        {codeLines.map(
                            (line, index) => (

                                <div
                                    key={index}
                                    className={`code-line ${line.indent
                                        ? 'code-indent'
                                        : ''
                                        }`}
                                >

                                    <i>
                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}
                                    </i>


                                    {line.type === 'tag' && (
                                        <b>
                                            {line.text}
                                        </b>
                                    )}


                                    {line.type === 'accent' && (
                                        <em>
                                            {line.text}
                                        </em>
                                    )}


                                    {line.type === 'strong' && (
                                        <strong>
                                            {line.text}
                                        </strong>
                                    )}

                                </div>

                            )
                        )}

                    </div>


                    {/* STATUS */}

                    <div className="experience-code__status">

                        <span className="status-dot" />

                        <span>
                            EXPERIENCE READY
                        </span>

                    </div>

                </div>


                {/* ==================================================
                    CONNECTOR
                ================================================== */}

                <div className="experience-connector">

                    <span />
                    <i />
                    <span />

                </div>


                {/* ==================================================
                    BROWSER
                ================================================== */}

                <div className="experience-browser">

                    {/* BROWSER TOP */}

                    <div className="experience-browser__top">

                        <div className="browser-dots">

                            <span />
                            <span />
                            <span />

                        </div>


                        <div className="browser-address">

                            devforge.local/{service.slug}

                        </div>


                        <div className="browser-status">

                            LIVE

                        </div>

                    </div>


                    {/* BROWSER BODY */}

                    <div className="experience-browser__body">

                        {/* NAV */}

                        <div className="built-nav">

                            <strong>
                                DF
                            </strong>

                            <span>
                                WORK
                            </span>

                            <span>
                                SERVICES
                            </span>

                            <span>
                                CONTACT
                            </span>

                        </div>


                        {/* HERO */}

                        <div className="built-hero">

                            <span>
                                {browserContent.eyebrow}
                            </span>


                            <h3>
                                {browserContent.title}
                            </h3>


                            <div className="built-hero__circle">

                                DF

                            </div>

                        </div>


                        {/* FOOTER */}

                        <div className="built-footer">

                            <span>
                                {service.label}
                            </span>

                            <span>
                                BUILD / CODE / LAUNCH
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM
            ================================================== */}

            <div className="service-experience__bottom">

                <div>

                    <span>
                        EXPERIENCE / {service.number}
                    </span>

                    <strong>
                        {service.experience.title}
                    </strong>

                </div>


                <div className="bottom-arrow">
                    ↗
                </div>

            </div>

        </section>
    );
};


/* ============================================================
   CODE CONTENT
============================================================ */

interface ExperienceCodeLine {
    text: string;
    type: 'tag' | 'accent' | 'strong';
    indent?: boolean;
}


function getExperienceCode(
    slug: string
): ExperienceCodeLine[] {

    const code: Record<
        string,
        ExperienceCodeLine[]
    > = {

        'web-ui-design': [

            {
                text: '<DesignSystem />',
                type: 'tag',
            },

            {
                text: 'layout',
                type: 'accent',
            },

            {
                text: 'type',
                type: 'accent',
                indent: true,
            },

            {
                text: 'components',
                type: 'accent',
                indent: true,
            },

            {
                text: 'visualDirection',
                type: 'strong',
            },

        ],


        'web-development': [

            {
                text: '<WebExperience />',
                type: 'tag',
            },

            {
                text: 'responsive',
                type: 'accent',
            },

            {
                text: 'performance',
                type: 'accent',
                indent: true,
            },

            {
                text: 'seo',
                type: 'accent',
                indent: true,
            },

            {
                text: 'launch',
                type: 'strong',
            },

        ],


        'full-stack-mern': [

            {
                text: '<FullStackApp />',
                type: 'tag',
            },

            {
                text: 'React',
                type: 'accent',
            },

            {
                text: 'Node',
                type: 'accent',
                indent: true,
            },

            {
                text: 'MongoDB',
                type: 'accent',
                indent: true,
            },

            {
                text: 'API',
                type: 'strong',
            },

        ],


        'frontend-engineering': [

            {
                text: '<Frontend />',
                type: 'tag',
            },

            {
                text: 'components',
                type: 'accent',
            },

            {
                text: 'interaction',
                type: 'accent',
                indent: true,
            },

            {
                text: 'motion',
                type: 'accent',
                indent: true,
            },

            {
                text: 'performance',
                type: 'strong',
            },

        ],


        'backend-api-systems': [

            {
                text: '<ApiSystem />',
                type: 'tag',
            },

            {
                text: 'request',
                type: 'accent',
            },

            {
                text: 'process',
                type: 'accent',
                indent: true,
            },

            {
                text: 'database',
                type: 'accent',
                indent: true,
            },

            {
                text: 'response',
                type: 'strong',
            },

        ],


        'admin-dashboards': [

            {
                text: '<Dashboard />',
                type: 'tag',
            },

            {
                text: 'data',
                type: 'accent',
            },

            {
                text: 'visualize',
                type: 'accent',
                indent: true,
            },

            {
                text: 'filter',
                type: 'accent',
                indent: true,
            },

            {
                text: 'control',
                type: 'strong',
            },

        ],

    };


    return (
        code[slug] ??
        code['web-development']
    );
}


/* ============================================================
   BROWSER CONTENT
============================================================ */

function getBrowserContent(
    slug: string
): {
    eyebrow: string;
    title: string;
} {

    const content: Record<
        string,
        {
            eyebrow: string;
            title: string;
        }
    > = {

        'web-ui-design': {

            eyebrow:
                'DISTINCTIVE DIGITAL INTERFACES',

            title:
                'DESIGN DIFFERENT.',
        },


        'web-development': {

            eyebrow:
                'FAST / RESPONSIVE / ENGINEERED',

            title:
                'BUILD DIFFERENT.',
        },


        'full-stack-mern': {

            eyebrow:
                'COMPLETE DIGITAL PRODUCT',

            title:
                'FORGE THE PRODUCT.',
        },


        'frontend-engineering': {

            eyebrow:
                'INTERACTION / MOTION / UX',

            title:
                'MAKE IT ALIVE.',
        },


        'backend-api-systems': {

            eyebrow:
                'RELIABLE DIGITAL SYSTEMS',

            title:
                'POWER THE PRODUCT.',
        },


        'admin-dashboards': {

            eyebrow:
                'DATA / CONTROL / WORKFLOW',

            title:
                'SEE THE SYSTEM.',
        },

    };


    return (
        content[slug] ??
        content['web-development']
    );
}


export default ServiceExperience;