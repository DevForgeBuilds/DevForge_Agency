import './ServiceProcess.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceProcessProps {
    service: ServiceData;
}


const ServiceProcess = ({
    service,
}: ServiceProcessProps) => {

    return (
        <section
            className="service-process"
            data-service={service.slug}
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="service-process__header">

                <div className="service-process__eyebrow">

                    <span>
                        {service.number}
                    </span>

                    <span>
                        PROCESS
                    </span>

                </div>


                <div className="service-process__heading">

                    <span>
                        FROM
                    </span>

                    <strong>
                        IDEA
                    </strong>

                    <span>
                        TO EXECUTION.
                    </span>

                </div>


                <p>
                    A focused process designed around
                    the requirements of {service.title.toLowerCase()}.
                </p>

            </div>


            {/* ==================================================
                VIEWPORT
            ================================================== */}

            <div className="service-process__viewport">

                {/* ==================================================
                    TRACK
                ================================================== */}

                <div className="service-process__track">

                    {service.process.map(
                        (step, index) => (

                            <article
                                key={`${step.number}-${step.title}`}
                                className="process-step"
                            >

                                {/* ==================================================
                                    NUMBER
                                ================================================== */}

                                <span className="process-step__number">

                                    {step.number}

                                </span>


                                {/* ==================================================
                                    CONTENT
                                ================================================== */}

                                <div className="process-step__content">

                                    <span className="process-step__kicker">

                                        {service.label}
                                        {' / '}
                                        STEP {step.number}

                                    </span>


                                    <h3>

                                        {step.title}

                                    </h3>


                                    <p>

                                        {step.description}

                                    </p>


                                    <span className="process-step__detail">

                                        {getProcessDetail(
                                            service.slug,
                                            index
                                        )}

                                    </span>

                                </div>


                                {/* ==================================================
                                    VISUAL
                                ================================================== */}

                                <div className="process-step__visual">

                                    <span className="process-step__visual-index">

                                        {service.number}
                                        {' / '}
                                        {step.number}

                                    </span>


                                    <div className="process-step__visual-ring ring-one" />

                                    <div className="process-step__visual-ring ring-two" />


                                    <div className="process-step__visual-core">

                                        <span />

                                        <strong>
                                            {step.number}
                                        </strong>

                                    </div>

                                </div>

                            </article>

                        )
                    )}

                </div>

            </div>


            {/* ==================================================
                PROGRESS
            ================================================== */}

            <div className="service-process__progress">

                <span>
                    01
                </span>


                <div className="service-process__progress-line">

                    <i />

                </div>


                <span>
                    {String(
                        service.process.length
                    ).padStart(2, '0')}
                </span>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <div className="service-process__footer">

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
   PROCESS DETAIL
============================================================ */

function getProcessDetail(
    slug: string,
    index: number
): string {

    const details: Record<
        string,
        string[]
    > = {

        'web-ui-design': [
            'RESEARCH / DIRECTION',
            'ARCHITECTURE / WIREFRAME',
            'VISUAL SYSTEM / UI',
            'POLISH / HANDOFF',
        ],

        'web-development': [
            'REQUIREMENTS / ARCHITECTURE',
            'IMPLEMENTATION / COMPONENTS',
            'PERFORMANCE / SEO',
            'DEPLOYMENT / PRODUCTION',
        ],

        'full-stack-mern': [
            'PRODUCT / ARCHITECTURE',
            'FRONTEND / BACKEND',
            'API / DATABASE / AUTH',
            'TESTING / DEPLOYMENT',
        ],

        'frontend-engineering': [
            'COMPONENT / ARCHITECTURE',
            'STATE / RESPONSIVE UI',
            'INTERACTION / MOTION',
            'PERFORMANCE / REFINEMENT',
        ],

        'backend-api-systems': [
            'SYSTEM / DATA MODEL',
            'API / SERVER LOGIC',
            'AUTH / VALIDATION',
            'INTEGRATION / DEPLOYMENT',
        ],

        'admin-dashboards': [
            'DATA / USER FLOWS',
            'INFORMATION / STRUCTURE',
            'METRICS / VISUALIZATION',
            'CONTROL / WORKFLOW',
        ],
    };


    return (
        details[slug]?.[index] ??
        'DEVFORGE / EXECUTION'
    );
}


export default ServiceProcess;