import './ServiceStatement.css';

import type {
    ServiceData,
} from '../../../data/serviceData';


interface ServiceStatementProps {
    service: ServiceData;
}


const ServiceStatement = ({
    service,
}: ServiceStatementProps) => {

    return (
        <section
            className="service-statement"
            data-service={service.slug}
        >

            {/* ==================================================
                TOP META
            ================================================== */}

            <div className="service-statement__meta">

                <span className="service-statement__number">
                    {service.number}
                </span>

                <span className="service-statement__label">
                    {service.statement.eyebrow}
                </span>

                <span className="service-statement__line" />

                <span className="service-statement__side">
                    DEVFORGE / {service.title}
                </span>

            </div>


            {/* ==================================================
                CONTENT
            ================================================== */}

            <div className="service-statement__content">

                <div className="service-statement__intro">
                    SERVICE STATEMENT / {service.number}
                </div>


                <h2 className="service-statement__title">

                    <span className="statement-line statement-line--accent">

                        {service.statement.title}

                    </span>


                    <span className="statement-line statement-line--system">

                        {service.statement.emphasis}

                    </span>

                </h2>

            </div>


            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <div className="service-statement__description">

                <span className="service-statement__description-index">
                    01
                </span>

                <p>
                    {service.capabilities.description}
                </p>

            </div>


            {/* ==================================================
                BOTTOM
            ================================================== */}

            <div className="service-statement__bottom">

                <span>
                    SCROLL TO EXPLORE
                </span>

                <span className="service-statement__arrow">
                    ↓
                </span>

            </div>

        </section>
    );
};


export default ServiceStatement;