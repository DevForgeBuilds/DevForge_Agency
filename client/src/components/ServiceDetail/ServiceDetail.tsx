import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './ServiceDetail.css';

import {
    initServiceDetailAnimation,
} from '../../animations/serviceDetailAnimation';

import {
    useService,
} from '../../lib/services';

import type {
    ServiceData,
} from '../../data/serviceData';


/* ============================================================
   SHARED SECTIONS
============================================================ */

import ServiceStatement
    from './ServiceStatement/ServiceStatement';

import ServiceCapabilities
    from './ServiceCapabilities/ServiceCapabilities';

import ServiceProcess
    from './ServiceProcess/ServiceProcess';

import ServiceExperience
    from './ServiceExperience/ServiceExperience';

import ServiceToolchain
    from './ServiceToolchain/ServiceToolchain';

import ServiceDeliverables
    from './ServiceDeliverables/ServiceDeliverables';

import ServiceEngagement
    from './ServiceEngagement/ServiceEngagement';

import RelatedWork
    from './RelatedWork/RelatedWork';

import ServiceFAQ
    from './ServiceFAQ/ServiceFAQ';

import ServiceCTA
    from './ServiceCTA/ServiceCTA';


/* ============================================================
   SIGNATURE EXPERIENCES
============================================================ */

import WebDevShowcase
    from './WebDevShowcase/WebDevShowcase';

import WebUIDesignShowcase
    from './WebUIDesignShowcase/WebUIDesignShowcase';


/* ============================================================
   PROPS
============================================================ */

interface ServiceDetailProps {
    serviceSlug: string;
}


/* ============================================================
   SIGNATURE EXPERIENCE
============================================================ */

const ServiceSignatureExperience = ({
    service,
}: {
    service: ServiceData;
}) => {

    switch (service.slug) {

        /* ====================================================
           01 — WEB / UI DESIGN
        ==================================================== */

        case 'web-ui-design':

            return (
                <WebUIDesignShowcase />
            );


        /* ====================================================
           02 — WEB DEVELOPMENT
        ==================================================== */

        case 'web-development':

            return (
                <WebDevShowcase />
            );


        /* ====================================================
           03 — FULL-STACK MERN
           Will be added next
        ==================================================== */

        case 'full-stack-mern':

            return null;


        /* ====================================================
           04 — FRONTEND ENGINEERING
           Will be added next
        ==================================================== */

        case 'frontend-engineering':

            return null;


        /* ====================================================
           05 — BACKEND & API SYSTEMS
           Will be added next
        ==================================================== */

        case 'backend-api-systems':

            return null;


        /* ====================================================
           06 — ADMIN DASHBOARDS
           Will be added next
        ==================================================== */

        case 'admin-dashboards':

            return null;


        default:

            return null;
    }
};


/* ============================================================
   SERVICE DETAIL
============================================================ */

const ServiceDetail = ({
    serviceSlug,
}: ServiceDetailProps) => {

    const navigate = useNavigate();

    const pageRef =
        useRef<HTMLDivElement | null>(null);


    /* ========================================================
       GET SERVICE DATA FROM API
    ======================================================== */

    const {
        service,
        loading,
        error,
    } = useService(serviceSlug);


    /* ========================================================
       SERVICE DETAIL ANIMATION
    ======================================================== */

    useEffect(() => {

        if (!pageRef.current || !service) {
            return;
        }


        return initServiceDetailAnimation(
            pageRef.current
        );

    }, [serviceSlug, service]);


    /* ========================================================
       LOADING
    ======================================================== */

    if (loading) {

        return (
            <div
                className="service-detail"
                data-service={serviceSlug}
            >

                <div className="service-detail__loading">

                    <span>
                        LOADING SERVICE
                    </span>

                    <i />

                </div>

            </div>
        );

    }


    /* ========================================================
       ERROR / SERVICE NOT FOUND
    ======================================================== */

    if (error || !service) {

        return (
            <div
                className="service-detail"
                data-service={serviceSlug}
            >

                <div className="service-detail__loading">

                    <span>
                        SERVICE NOT FOUND
                    </span>

                    <small>
                        {error || 'Unable to load this service.'}
                    </small>

                </div>

            </div>
        );

    }


    /* ========================================================
       RENDER
    ======================================================== */

    return (

        <div
            ref={pageRef}
            className="service-detail"
            data-service={service.slug}
        >


            <div className="service-detail__back">
                <button
                    type="button"
                    onClick={() => navigate('/#services')}
                    aria-label="Back to services"
                >
                    <span>←</span>
                    <span>BACK TO SERVICES</span>
                </button>
            </div>

            {/* ==================================================
                PAGE META
            ================================================== */}

            <header className="service-detail__top">


                {/* ==================================================
                    SERVICE INDEX
                ================================================== */}

                <div className="service-detail__index">

                    <span
                        className="service-detail__status"
                    />


                    <span>
                        SERVICES / {service.number}
                    </span>

                </div>


                {/* ==================================================
                    META
                ================================================== */}

                <div className="service-detail__meta">

                    <span>
                        DEVFORGE
                    </span>

                    <span>
                        2026
                    </span>

                </div>

            </header>


            {/* ==================================================
                HERO
            ================================================== */}

            <section className="service-detail__hero">


                {/* ==================================================
                    HERO COPY
                ================================================== */}

                <div className="service-detail__hero-copy">


                    {/* EYEBROW */}

                    <span
                        className="service-detail__eyebrow"
                    >
                        {service.label}
                        {' / '}
                        {service.number}
                    </span>


                    {/* TITLE */}

                    <h1
                        className="service-detail__title"
                    >
                        {service.title}
                    </h1>


                    {/* DESCRIPTION */}

                    <p
                        className="service-detail__description"
                    >
                        {service.description}
                    </p>


                    {/* SERVICE META */}

                    <div
                        className="service-detail__hero-meta"
                    >

                        {service.heroMeta.map(
                            (item, index) => (

                                <span
                                    key={`${item}-${index}`}
                                >

                                    {index > 0 && (
                                        <>
                                            <span>
                                                {' · '}
                                            </span>
                                        </>
                                    )}

                                    {item}

                                </span>

                            )
                        )}

                    </div>

                </div>


                {/* ==================================================
                    HERO VISUAL
                ================================================== */}

                <div
                    className="service-detail__hero-visual"
                >


                    {/* GRID */}

                    <div
                        className="service-detail__visual-grid"
                    />


                    {/* CODE */}

                    <div
                        className="service-detail__visual-code"
                    >

                        <span>
                            &lt;DevForge /&gt;
                        </span>

                        <span>
                            const experience = build();
                        </span>

                        <span>
                            return launch(experience);
                        </span>

                    </div>


                    {/* BROWSER */}

                    <div
                        className="service-detail__visual-browser"
                    >

                        <div
                            className="service-detail__browser-top"
                        >

                            <span />
                            <span />
                            <span />

                            <small>
                                localhost:3000
                            </small>

                        </div>


                        <div
                            className="service-detail__browser-content"
                        >

                            <small>
                                {service.label}
                            </small>

                            <strong>
                                {service.title}
                            </strong>

                        </div>

                    </div>


                    {/* ORBIT */}

                    <div
                        className="service-detail__visual-orbit"
                    >

                        <span>
                            DF
                        </span>

                    </div>

                </div>

            </section>


            {/* ==================================================
                SCROLL INDICATOR
            ================================================== */}

            <div
                className="service-detail__scroll"
            >

                <span>
                    SCROLL TO EXPLORE
                </span>

                <i />

            </div>


            {/* ==================================================
                SERVICE STATEMENT
            ================================================== */}

            <ServiceStatement
                service={service}
            />


            {/* ==================================================
                SIGNATURE EXPERIENCE
            ================================================== */}

            <ServiceSignatureExperience
                service={service}
            />


            {/* ==================================================
                CAPABILITIES
            ================================================== */}

            <ServiceCapabilities
                service={service}
            />


            {/* ==================================================
                PROCESS
            ================================================== */}

            <ServiceProcess
                service={service}
            />


            {/* ==================================================
                EXPERIENCE
            ================================================== */}

            <ServiceExperience
                service={service}
            />


            {/* ==================================================
                TOOLCHAIN
            ================================================== */}

            <ServiceToolchain
                service={service}
            />


            {/* ==================================================
                DELIVERABLES
            ================================================== */}

            <ServiceDeliverables
                service={service}
            />


            {/* ==================================================
                ENGAGEMENT
            ================================================== */}

            <ServiceEngagement
                service={service}
            />


            {/* ==================================================
                RELATED WORK
            ================================================== */}

            <RelatedWork
                service={service}
            />


            {/* ==================================================
                FAQ
            ================================================== */}

            <ServiceFAQ
                service={service}
            />


            {/* ==================================================
                FINAL CTA
            ================================================== */}

            <ServiceCTA
                service={service}
            />

        </div>
    );
};


export default ServiceDetail;