import { useEffect, useRef } from 'react';
import './Services.css';

import { initServiceAnimation } from '../../animations/serviceAnimation';

import { useNavigate } from 'react-router-dom';

import {
    useServices,
} from '../../lib/services';

import type {
    ServiceSummary,
} from '../../lib/services';


/* ============================================================
   FALLBACK SERVICES
   ------------------------------------------------------------
   Used only when API data is unavailable.
   Original UI content is preserved.
============================================================ */

const FALLBACK_SERVICES: ServiceSummary[] = [
    {
        number: '01',
        slug: 'web-ui-design',
        title: 'WEB / UI DESIGN',
        shortTitle: 'DESIGN',
        description:
            'Distinctive digital interfaces and web experiences designed around clarity, character and conversion.',
        label: 'DESIGN SYSTEM',
        heroMeta: [
            'LAYOUT',
            'TYPE',
            'UI',
        ],
    },

    {
        number: '02',
        slug: 'web-development',
        title: 'WEB DEVELOPMENT',
        shortTitle: 'WEB',
        description:
            'Fast, responsive and carefully engineered websites built to feel as good as they perform.',
        label: 'DEVELOPMENT',
        heroMeta: [
            'WEB',
            'PERFORMANCE',
            'SEO',
        ],
    },

    {
        number: '03',
        slug: 'full-stack-mern',
        title: 'FULL-STACK (MERN) APPLICATIONS',
        shortTitle: 'MERN',
        description:
            'Complete digital products connecting thoughtful interfaces with powerful backend systems.',
        label: 'FULL PRODUCT',
        heroMeta: [
            'REACT',
            'NODE',
            'MONGO',
        ],
    },

    {
        number: '04',
        slug: 'frontend-engineering',
        title: 'FRONTEND ENGINEERING',
        shortTitle: 'FRONTEND',
        description:
            'Interactive frontend experiences built with modern technologies, smooth motion and clean architecture.',
        label: 'ENGINEERING',
        heroMeta: [
            'REACT',
            'MOTION',
            'UX',
        ],
    },

    {
        number: '05',
        slug: 'backend-api-systems',
        title: 'BACKEND & API SYSTEMS',
        shortTitle: 'BACKEND',
        description:
            'Reliable server-side systems, APIs and data architecture designed to power real products.',
        label: 'SYSTEMS',
        heroMeta: [
            'NODE',
            'API',
            'DATABASE',
        ],
    },

    {
        number: '06',
        slug: 'admin-dashboards',
        title: 'ADMIN DASHBOARDS',
        shortTitle: 'DASHBOARD',
        description:
            'Focused management interfaces that turn complex business data into simple, useful workflows.',
        label: 'BUSINESS TOOLS',
        heroMeta: [
            'DATA',
            'CONTROL',
            'WORKFLOW',
        ],
    },
];


/* ============================================================
   SERVICES
============================================================ */

const Services = () => {

    const navigate = useNavigate();

    const sectionRef =
        useRef<HTMLElement | null>(null);


    /* ========================================================
       API SERVICES
    ======================================================== */

    const {
        services: apiServices,
        loading,
    } = useServices();


    /*
     * API services are preferred.
     *
     * Fallback is used while API has no usable data.
     * This keeps the original DevForge section functional
     * even if the backend is temporarily unavailable.
     */
    const services =
        apiServices.length > 0
            ? apiServices
            : FALLBACK_SERVICES;


    /* ========================================================
       SERVICE ANIMATION
    ======================================================== */

    useEffect(() => {

        if (!sectionRef.current) {
            return;
        }

        return initServiceAnimation(
            sectionRef.current
        );

    }, []);


    /* ========================================================
       RENDER
    ======================================================== */

    return (

        <section
            ref={sectionRef}
            id="services"
            className="services-section"
        >

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="services-section__grid"
                aria-hidden="true"
            />

            <div
                className="services-section__glow"
                aria-hidden="true"
            />


            {/* =================================================
                TOP META
            ================================================= */}

            <header className="services-section__top">

                <div className="services-section__index">

                    <span
                        className="services-section__status"
                    />

                    <span>
                        04 / SERVICES
                    </span>

                </div>


                <div className="services-section__top-meta">

                    <span>
                        DIGITAL SYSTEMS
                    </span>

                    <span>
                        DEVFORGE / 2026
                    </span>

                </div>

            </header>


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="services-section__intro">

                <div className="services-section__intro-label">

                    <span>
                        WHAT
                    </span>

                    <span>
                        WE
                    </span>

                    <span>
                        BUILD.
                    </span>

                </div>


                <div className="services-section__intro-copy">

                    <span
                        className="services-section__eyebrow"
                    >
                        CAPABILITIES / {String(services.length).padStart(2, '0')}
                    </span>

                    <p>
                        From first interface to complete digital
                        systems, we design and build products
                        with purpose.
                    </p>

                </div>

            </div>


            {/* =================================================
                SERVICES LIST
            ================================================= */}

            <div className="services-section__content">

                <div className="services-section__list">

                    {services.map((service, index) => (

                        <article
                            key={service.slug}
                            className="service-item"
                            data-service-index={index}
                            data-service={service.shortTitle}
                            role="link"
                            tabIndex={0}

                            onClick={() => {
                                navigate(
                                    `/services/${service.slug}`
                                );
                            }}

                            onKeyDown={(event) => {

                                if (
                                    event.key === 'Enter' ||
                                    event.key === ' '
                                ) {

                                    event.preventDefault();

                                    navigate(
                                        `/services/${service.slug}`
                                    );

                                }

                            }}
                        >

                            {/* ---------------------------------
                                NUMBER
                            --------------------------------- */}

                            <div className="service-item__number">

                                {service.number}

                            </div>


                            {/* ---------------------------------
                                MAIN SERVICE
                            --------------------------------- */}

                            <div className="service-item__main">

                                <div className="service-item__title-row">

                                    <h3 className="service-item__title">

                                        {service.title}

                                    </h3>

                                    <span className="service-item__arrow">

                                        ↗

                                    </span>

                                </div>


                                <div className="service-item__details">

                                    <span className="service-item__category">

                                        {service.label}

                                    </span>


                                    <span className="service-item__description">

                                        {service.description}

                                    </span>

                                </div>

                            </div>


                            {/* ---------------------------------
                                TECH META
                            --------------------------------- */}

                            <div className="service-item__meta">

                                {service.heroMeta.join(' · ')}

                            </div>


                            {/* ---------------------------------
                                HOVER LINE
                            --------------------------------- */}

                            <span
                                className="service-item__hover-line"
                                aria-hidden="true"
                            />

                        </article>

                    ))}

                </div>


                {/* =================================================
                    FLOATING PREVIEW
                    -------------------------------------------------
                    Original preview scenes intentionally preserved.
                ================================================= */}

                <div
                    className="service-preview"
                    aria-hidden="true"
                >

                    {/* -----------------------------------------
                        PREVIEW HEADER
                    ----------------------------------------- */}

                    <div className="service-preview__header">

                        <div className="service-preview__id">

                            <span className="service-preview__dot" />

                            <span className="service-preview__number">
                                01
                            </span>

                        </div>

                        <span className="service-preview__type">
                            PREVIEW
                        </span>

                    </div>


                    {/* =================================================
                        VISUAL AREA
                    ================================================= */}

                    <div className="service-preview__visual">


                        {/* =================================================
                            01 — WEB / UI DESIGN
                        ================================================= */}

                        <div
                            className="
                                service-preview__scene
                                service-preview__scene--design
                            "
                        >

                            <div className="preview-design__browser">

                                <div className="preview-design__browser-top">

                                    <div className="preview-design__dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <span className="preview-design__url">
                                        devforge.studio
                                    </span>

                                    <span className="preview-design__counter">
                                        01
                                    </span>

                                </div>


                                <div className="preview-design__nav">

                                    <strong>
                                        DF
                                    </strong>

                                    <div>
                                        <span>WORK</span>
                                        <span>STUDIO</span>
                                        <span>CONTACT</span>
                                    </div>

                                    <b>
                                        ↗
                                    </b>

                                </div>


                                <div className="preview-design__hero">

                                    <div className="preview-design__hero-copy">

                                        <small>
                                            DIGITAL EXPERIENCE
                                        </small>

                                        <h4>
                                            BUILD
                                            <br />
                                            DIFFERENT.
                                        </h4>

                                        <div className="preview-design__hero-line" />

                                    </div>


                                    <div className="preview-design__orb">

                                        <span>
                                            DF
                                        </span>

                                    </div>

                                </div>


                                <div className="preview-design__bottom">

                                    <span>
                                        SCROLL TO EXPLORE
                                    </span>

                                    <div>
                                        <i />
                                        <i />
                                        <i />
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            02 — WEB DEVELOPMENT
                        ================================================= */}

                        <div
                            className="
                                service-preview__scene
                                service-preview__scene--web
                            "
                        >

                            <div className="preview-web__browser">

                                <div className="preview-web__top">

                                    <div className="preview-web__dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <div className="preview-web__address">
                                        localhost:3000
                                    </div>

                                    <span>
                                        ⌁
                                    </span>

                                </div>


                                <div className="preview-web__body">

                                    <div className="preview-web__code">

                                        <div className="preview-web__code-head">

                                            <span>
                                                App.tsx
                                            </span>

                                            <b>
                                                LIVE
                                            </b>

                                        </div>


                                        <div className="preview-web__code-lines">

                                            <span>
                                                <i>01</i>
                                                <em>&lt;App</em>{' '}
                                                <strong>/&gt;</strong>
                                            </span>

                                            <span>
                                                <i>02</i>
                                                <em>const</em>{' '}
                                                app = build();
                                            </span>

                                            <span>
                                                <i>03</i>
                                                <em>return</em>{' '}
                                                product;
                                            </span>

                                            <span>
                                                <i>04</i>
                                            </span>

                                            <span>
                                                <i>05</i>
                                                <em>export default</em>{' '}
                                                App;
                                            </span>

                                        </div>

                                    </div>


                                    <div className="preview-web__live">

                                        <span className="preview-web__live-label">
                                            LIVE PREVIEW
                                        </span>

                                        <div className="preview-web__live-ui">

                                            <div />

                                            <strong>
                                                DIGITAL
                                            </strong>

                                            <b>
                                                EXPERIENCE
                                            </b>

                                            <small />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            03 — FULL-STACK MERN
                        ================================================= */}

                        <div
                            className="
                                service-preview__scene
                                service-preview__scene--mern
                            "
                        >

                            <div className="preview-mern__header">

                                <span>
                                    SYSTEM ARCHITECTURE
                                </span>

                                <b>
                                    FULL-STACK
                                </b>

                            </div>


                            <div className="preview-mern__system">

                                <div className="preview-mern__node preview-mern__node--react">

                                    <small>
                                        01
                                    </small>

                                    <strong>
                                        REACT
                                    </strong>

                                    <span>
                                        CLIENT
                                    </span>

                                </div>


                                <div className="preview-mern__flow preview-mern__flow--one">

                                    <i />

                                    <b>
                                        HTTP
                                    </b>

                                </div>


                                <div className="preview-mern__node preview-mern__node--node">

                                    <small>
                                        02
                                    </small>

                                    <strong>
                                        NODE
                                    </strong>

                                    <span>
                                        SERVER
                                    </span>

                                </div>


                                <div className="preview-mern__flow preview-mern__flow--two">

                                    <i />

                                    <b>
                                        API
                                    </b>

                                </div>


                                <div className="preview-mern__node preview-mern__node--mongo">

                                    <small>
                                        03
                                    </small>

                                    <strong>
                                        MONGO
                                    </strong>

                                    <span>
                                        DATABASE
                                    </span>

                                </div>

                            </div>


                            <div className="preview-mern__footer">

                                <span>
                                    FRONTEND
                                </span>

                                <span>
                                    API
                                </span>

                                <span>
                                    DATABASE
                                </span>

                            </div>

                        </div>


                        {/* =================================================
                            04 — FRONTEND ENGINEERING
                        ================================================= */}

                        <div
                            className="
                                service-preview__scene
                                service-preview__scene--frontend
                            "
                        >

                            <div className="preview-frontend__interface">

                                <div className="preview-frontend__nav">

                                    <strong>
                                        PRODUCT
                                    </strong>

                                    <div>
                                        <span>01</span>
                                        <span>02</span>
                                        <span>03</span>
                                    </div>

                                    <b>
                                        +
                                    </b>

                                </div>


                                <div className="preview-frontend__hero">

                                    <small>
                                        INTERACTIVE SYSTEM
                                    </small>

                                    <h4>
                                        MOVE
                                        <br />
                                        WITH
                                        <em>
                                            INTENT.
                                        </em>
                                    </h4>

                                </div>


                                <div className="preview-frontend__cards">

                                    <div>
                                        <span>01</span>
                                        <strong>UI</strong>
                                    </div>

                                    <div>
                                        <span>02</span>
                                        <strong>UX</strong>
                                    </div>

                                    <div className="is-active">
                                        <span>03</span>
                                        <strong>FX</strong>
                                    </div>

                                </div>


                                <div className="preview-frontend__cursor">
                                    +
                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            05 — BACKEND & API SYSTEMS
                        ================================================= */}

                        <div
                            className="
                                service-preview__scene
                                service-preview__scene--backend
                            "
                        >

                            <div className="preview-backend__header">

                                <span>
                                    API / SYSTEM
                                </span>

                                <b>
                                    ONLINE
                                </b>

                            </div>


                            <div className="preview-backend__routes">

                                <div className="preview-backend__route">
                                    <span>GET</span>
                                    <strong>/users</strong>
                                    <i>200</i>
                                </div>

                                <div className="preview-backend__route">
                                    <span>POST</span>
                                    <strong>/auth/login</strong>
                                    <i>201</i>
                                </div>

                                <div className="preview-backend__route">
                                    <span>GET</span>
                                    <strong>/projects</strong>
                                    <i>200</i>
                                </div>

                                <div className="preview-backend__route">
                                    <span>PUT</span>
                                    <strong>/settings</strong>
                                    <i>200</i>
                                </div>

                            </div>


                            <div className="preview-backend__architecture">

                                <div>
                                    <small>
                                        REQUEST
                                    </small>

                                    <strong>
                                        CLIENT
                                    </strong>
                                </div>

                                <span>
                                    →
                                </span>

                                <div className="is-core">

                                    <small>
                                        LOGIC
                                    </small>

                                    <strong>
                                        API
                                    </strong>

                                </div>

                                <span>
                                    →
                                </span>

                                <div>

                                    <small>
                                        DATA
                                    </small>

                                    <strong>
                                        DB
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            06 — ADMIN DASHBOARDS
                        ================================================= */}

                        <div
                            className="
                                service-preview__scene
                                service-preview__scene--dashboard
                            "
                        >

                            <div className="preview-dashboard__app">

                                <aside className="preview-dashboard__sidebar">

                                    <strong>
                                        DF
                                    </strong>

                                    <span className="is-active" />
                                    <span />
                                    <span />
                                    <span />

                                    <i />

                                </aside>


                                <main className="preview-dashboard__main">

                                    <div className="preview-dashboard__top">

                                        <div>

                                            <small>
                                                OVERVIEW
                                            </small>

                                            <strong>
                                                Dashboard
                                            </strong>

                                        </div>

                                        <span>
                                            •••
                                        </span>

                                    </div>


                                    <div className="preview-dashboard__stats">

                                        <div>

                                            <small>
                                                REVENUE
                                            </small>

                                            <strong>
                                                ₹84.2K
                                            </strong>

                                            <span>
                                                +18.4%
                                            </span>

                                        </div>


                                        <div>

                                            <small>
                                                ORDERS
                                            </small>

                                            <strong>
                                                1,284
                                            </strong>

                                            <span>
                                                +12.8%
                                            </span>

                                        </div>

                                    </div>


                                    <div className="preview-dashboard__chart">

                                        <div className="preview-dashboard__chart-label">
                                            ACTIVITY
                                        </div>


                                        <div className="preview-dashboard__bars">

                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                            <i />

                                        </div>


                                        <div className="preview-dashboard__chart-line" />

                                    </div>

                                </main>

                            </div>

                        </div>

                    </div>


                    {/* -----------------------------------------
                        PREVIEW FOOTER
                    ----------------------------------------- */}

                    <div className="service-preview__footer">

                        <div>

                            <span className="service-preview__label">
                                CURRENT
                            </span>

                            <strong className="service-preview__title">
                                WEB / UI DESIGN
                            </strong>

                        </div>

                        <span className="service-preview__index">
                            01 / 06
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM STATEMENT
            ================================================= */}

            <footer className="services-section__bottom">

                <div className="services-section__bottom-left">

                    <span>
                        DF / CAPABILITIES
                    </span>

                    <span>
                        BUILD · CODE · LAUNCH
                    </span>

                </div>


                <div className="services-section__bottom-center">

                    <span>
                        FROM INTERFACE
                    </span>

                    <strong>
                        TO DIGITAL PRODUCT.
                    </strong>

                </div>


                <div className="services-section__bottom-right">

                    <span>
                        {String(services.length).padStart(2, '0')} SERVICES
                    </span>

                    <span className="services-section__scroll">

                        SCROLL

                        <i />

                    </span>

                </div>

            </footer>

        </section>
    );
};


export default Services;