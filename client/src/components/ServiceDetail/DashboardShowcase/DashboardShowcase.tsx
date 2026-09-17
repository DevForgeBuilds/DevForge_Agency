import { useEffect, useRef, useState } from 'react';
import './DashboardShowcase.css';

interface DashboardShowcaseProps {
    serviceSlug?: string;
}

interface NavItem {
    label: string;
}

interface ActivityItem {
    icon: string;
    name: string;
    time: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'OVERVIEW' },
    { label: 'ANALYTICS' },
    { label: 'PROJECTS' },
    { label: 'SETTINGS' },
];

const KPI_DATA = [
    {
        label: 'TOTAL REVENUE',
        value: '$84.2K',
        change: '+18.4%',
    },
    {
        label: 'ACTIVE USERS',
        value: '12.8K',
        change: '+12.7%',
    },
    {
        label: 'PROJECTS',
        value: '284',
        change: '+24.2%',
    },
    {
        label: 'CONVERSION',
        value: '8.42%',
        change: '+4.8%',
    },
];

const BAR_HEIGHTS = [
    '38%',
    '52%',
    '44%',
    '68%',
    '57%',
    '76%',
    '63%',
    '88%',
    '72%',
    '94%',
    '81%',
    '100%',
];

const ACTIVITY_DATA: ActivityItem[] = [
    {
        icon: '01',
        name: 'New project created',
        time: '02m',
    },
    {
        icon: '02',
        name: 'Payment received',
        time: '08m',
    },
    {
        icon: '03',
        name: 'User upgraded',
        time: '14m',
    },
    {
        icon: '04',
        name: 'Report generated',
        time: '21m',
    },
];

const PROJECT_ROWS = [
    {
        project: 'NOVA SYSTEM',
        client: 'ACME',
        status: 'ACTIVE',
        value: '$12.4K',
    },
    {
        project: 'ORBIT PLATFORM',
        client: 'ORBIT',
        status: 'ACTIVE',
        value: '$18.8K',
    },
    {
        project: 'FRAMEWORK X',
        client: 'FRAME',
        status: 'REVIEW',
        value: '$9.6K',
    },
];


const DashboardShowcase = ({
    serviceSlug = 'admin-dashboards',
}: DashboardShowcaseProps) => {

    const sectionRef =
        useRef<HTMLElement | null>(null);

    const [activeNav, setActiveNav] =
        useState(0);


    /* ========================================================
       SCROLL ACTIVATION
    ======================================================== */

    useEffect(() => {

        const section =
            sectionRef.current;

        if (!section) {
            return;
        }


        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (entry.isIntersecting) {

                        section.classList.add(
                            'is-active'
                        );

                    }

                },
                {
                    threshold: 0.2,
                }
            );


        observer.observe(section);


        return () => {
            observer.disconnect();
        };

    }, []);


    return (
        <section
            ref={sectionRef}
            className="dashboard-showcase"
            data-service={serviceSlug}
        >

            {/* ==================================================
                META
            ================================================== */}

            <div className="dashboard-showcase__meta">

                <span className="dashboard-showcase__number">
                    06
                </span>

                <span>
                    ADMIN / DASHBOARDS
                </span>

                <span className="dashboard-showcase__line" />

                <span>
                    CONTROL / 2026
                </span>

            </div>


            {/* ==================================================
                INTRO
            ================================================== */}

            <div className="dashboard-showcase__intro">

                <div className="dashboard-showcase__eyebrow">

                    <i />

                    <span>
                        BUSINESS CONTROL SYSTEM
                    </span>

                </div>


                <h2 className="dashboard-showcase__title">

                    <span>
                        TURN
                    </span>

                    <span>
                        DATA
                    </span>

                    INTO

                    <br />

                    CONTROL.

                </h2>


                <p>
                    Focused management interfaces that
                    transform complex business data into
                    clear metrics, useful insights and
                    actionable workflows.
                </p>

            </div>


            {/* ==================================================
                DASHBOARD STAGE
            ================================================== */}

            <div className="dashboard-showcase__stage">

                <div className="dashboard-window">

                    {/* ==================================================
                        SIDEBAR
                    ================================================== */}

                    <aside className="dashboard-sidebar">

                        <div className="dashboard-sidebar__brand">

                            <span>
                                DF
                            </span>

                            ADMIN

                        </div>


                        <nav className="dashboard-sidebar__nav">

                            {NAV_ITEMS.map(
                                (item, index) => {

                                    const isActive =
                                        activeNav === index;


                                    return (
                                        <button
                                            key={item.label}
                                            type="button"
                                            className={`dashboard-sidebar__item ${isActive
                                                ? 'is-active'
                                                : ''
                                                }`}
                                            onClick={() =>
                                                setActiveNav(index)
                                            }
                                        >

                                            <span />

                                            {item.label}

                                        </button>
                                    );

                                }
                            )}

                        </nav>

                    </aside>


                    {/* ==================================================
                        MAIN
                    ================================================== */}

                    <main className="dashboard-main">

                        {/* ==================================================
                            TOP
                        ================================================== */}

                        <div className="dashboard-main__top">

                            <h3 className="dashboard-main__title">

                                Overview

                            </h3>


                            <div className="dashboard-main__status">

                                <i />

                                SYSTEM ONLINE

                            </div>

                        </div>


                        {/* ==================================================
                            KPI
                        ================================================== */}

                        <div className="dashboard-kpis">

                            {KPI_DATA.map(
                                (kpi) => (

                                    <article
                                        key={kpi.label}
                                        className="dashboard-kpi"
                                    >

                                        <span className="dashboard-kpi__label">

                                            {kpi.label}

                                        </span>


                                        <strong>
                                            {kpi.value}
                                        </strong>


                                        <span className="dashboard-kpi__change">

                                            ↑ {kpi.change}

                                        </span>

                                    </article>

                                )
                            )}

                        </div>


                        {/* ==================================================
                            CONTENT
                        ================================================== */}

                        <div className="dashboard-content">

                            {/* ==================================================
                                CHART
                            ================================================== */}

                            <section className="dashboard-panel">

                                <div className="dashboard-panel__header">

                                    <span>
                                        PERFORMANCE
                                    </span>

                                    <strong>
                                        LAST 30 DAYS
                                    </strong>

                                </div>


                                <div className="dashboard-chart">

                                    {BAR_HEIGHTS.map(
                                        (height, index) => (

                                            <span
                                                key={index}
                                                className="dashboard-chart__bar"
                                                style={{
                                                    '--bar-height':
                                                        height,
                                                } as React.CSSProperties}
                                            />

                                        )
                                    )}

                                </div>

                            </section>


                            {/* ==================================================
                                ACTIVITY
                            ================================================== */}

                            <section className="dashboard-panel">

                                <div className="dashboard-panel__header">

                                    <span>
                                        RECENT ACTIVITY
                                    </span>

                                    <strong>
                                        LIVE
                                    </strong>

                                </div>


                                <div className="dashboard-activity">

                                    {ACTIVITY_DATA.map(
                                        (item) => (

                                            <div
                                                key={item.name}
                                                className="dashboard-activity__item"
                                            >

                                                <span className="dashboard-activity__icon">

                                                    {item.icon}

                                                </span>


                                                <span className="dashboard-activity__name">

                                                    {item.name}

                                                </span>


                                                <span className="dashboard-activity__time">

                                                    {item.time}

                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        </div>


                        {/* ==================================================
                            PROJECT TABLE
                        ================================================== */}

                        <section className="dashboard-table">

                            <div className="dashboard-panel__header">

                                <span>
                                    ACTIVE PROJECTS
                                </span>

                                <strong>
                                    VIEW ALL ↗
                                </strong>

                            </div>


                            <div className="dashboard-table__header">

                                <span>
                                    PROJECT
                                </span>

                                <span>
                                    CLIENT
                                </span>

                                <span>
                                    STATUS
                                </span>

                                <span>
                                    VALUE
                                </span>

                            </div>


                            {PROJECT_ROWS.map(
                                (row) => (

                                    <div
                                        key={row.project}
                                        className="dashboard-table__row"
                                    >

                                        <strong>
                                            {row.project}
                                        </strong>

                                        <span>
                                            {row.client}
                                        </span>

                                        <span className="dashboard-table__status">

                                            {row.status}

                                        </span>

                                        <span>
                                            {row.value}
                                        </span>

                                    </div>

                                )
                            )}

                        </section>

                    </main>


                    {/* ==================================================
                        DATA POINTER
                    ================================================== */}

                    <div className="dashboard-pointer">

                        ↗

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM META
            ================================================== */}

            <div className="dashboard-showcase__bottom">

                <div className="dashboard-showcase__bottom-label">

                    CONTROL LAYER

                    <strong>
                        DATA / METRICS / ANALYTICS / ACTIONS
                    </strong>

                </div>


                <div className="dashboard-showcase__status">

                    <i />

                    <span>
                        DASHBOARD ACTIVE
                    </span>

                </div>


                <div className="dashboard-showcase__counter">

                    VIEW

                    <strong>
                        {' '}
                        {String(activeNav + 1).padStart(2, '0')}
                    </strong>

                    {' / 04'}

                </div>

            </div>


            {/* ==================================================
                STATEMENT
            ================================================== */}

            <div className="dashboard-showcase__statement">

                <span>
                    ADMIN DASHBOARDS / 06
                </span>


                <strong>

                    COMPLEX DATA.
                    <br />

                    <em>
                        SIMPLE CONTROL.
                    </em>

                </strong>

            </div>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="dashboard-showcase__footer">

                <span>
                    DEVFORGE / 06
                </span>

                <span>
                    ADMIN DASHBOARDS
                </span>

            </footer>

        </section>
    );
};


export default DashboardShowcase;