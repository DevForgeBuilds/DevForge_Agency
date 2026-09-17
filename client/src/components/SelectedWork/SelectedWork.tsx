import './SelectedWork.css';

import {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Link,
} from 'react-router-dom';

import {
    projects as fallbackProjects,
} from '../../data/projectData';

import {
    getProjects,
} from '../../lib/projects';

import type {
    Project,
} from '../../types/project';

import {
    initSelectedWorkAnimation,
} from '../../animations/selectedWorkAnimation';


const SelectedWork = () => {

    const sectionRef =
        useRef<HTMLElement | null>(null);

    const [projects, setProjects] =
        useState<Project[]>(fallbackProjects);

    const [projectsLoaded, setProjectsLoaded] =
        useState(false);


    /*
    ============================================================
    ONLY PUBLISHED PROJECTS
    ============================================================
    */

    const publishedProjects =
        projects.filter(
            (project) =>
                project.published
        );

    useEffect(() => {

        let mounted = true;

        const loadProjects = async () => {

            try {

                const apiProjects =
                    await getProjects();

                if (!mounted) {
                    return;
                }

                setProjects(apiProjects);
                setProjectsLoaded(true);

            } catch (error) {

                console.error(
                    '[SelectedWork] Failed to load projects:',
                    error
                );

                if (mounted) {
                    setProjectsLoaded(true);
                }
            }
        };

        loadProjects();

        return () => {
            mounted = false;
        };

    }, []);
    /*
    ============================================================
    SECTION ANIMATION
    ============================================================
    */

    useEffect(() => {

        if (!sectionRef.current) {
            return;
        }

        if (!projectsLoaded) {
            return;
        }

        return initSelectedWorkAnimation(
            sectionRef.current
        );

    }, [projectsLoaded]);


    /*
    ============================================================
    EMPTY STATE
    ============================================================
    */

    if (
        publishedProjects.length === 0
    ) {

        return (

            <section
                id="selected-work"
                ref={sectionRef}
                className="
                    selected-work
                    selected-work--empty
                "
            >

                <div className="selected-work__empty">

                    <span>
                        04 / SELECTED WORK
                    </span>


                    <h2>
                        WORK
                        <br />
                        IN THE
                        <span>
                            FORGE.
                        </span>
                    </h2>


                    <p>
                        New digital experiences are
                        currently being forged.
                    </p>

                </div>

            </section>

        );

    }


    return (

        <section
            id="selected-work"
            ref={sectionRef}
            className="selected-work"
        >

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="selected-work__grid"
                aria-hidden="true"
            />


            <div
                className="selected-work__glow"
                aria-hidden="true"
            />


            {/* =================================================
                TOP META
            ================================================= */}

            <header className="selected-work__top">

                <div className="selected-work__section-id">

                    <span className="selected-work__dot" />

                    <span>
                        04 / SELECTED WORK
                    </span>

                </div>


                <div className="selected-work__top-right">

                    <span>
                        DEVFORGE / WORK ARCHIVE
                    </span>


                    <span>
                        {String(
                            publishedProjects.length
                        ).padStart(2, '0')}{' '}
                        PROJECTS
                    </span>

                </div>

            </header>


            {/* =================================================
                MAIN INTRO
            ================================================= */}

            <div className="selected-work__intro">

                <div className="selected-work__intro-left">

                    <span className="selected-work__eyebrow">
                        THE BUILDS
                    </span>


                    <h2 className="selected-work__heading">

                        SELECTED

                        <span>
                            WORK.
                        </span>

                    </h2>


                    <div className="selected-work__intro-line" />


                    <p className="selected-work__intro-copy">

                        A selection of digital products,
                        interfaces and experiences forged
                        with purpose and precision.

                    </p>


                    <Link
                        to="/projects"
                        className="selected-work__archive-link"
                    >

                        <span className="selected-work__archive-arrow">
                            ↗
                        </span>


                        <span>
                            EXPLORE ALL
                            <br />
                            PROJECTS
                        </span>

                    </Link>

                </div>


                {/* =================================================
                    PROJECT COUNTER
                ================================================= */}

                <div className="selected-work__counter">

                    <span>
                        CURRENT
                    </span>


                    <strong>
                        01
                    </strong>


                    <span>
                        /
                        {' '}
                        {String(
                            publishedProjects.length
                        ).padStart(2, '0')}
                    </span>

                </div>

            </div>


            {/* =================================================
                FEATURED PROJECT
            ================================================= */}

            <div className="selected-work__featured">

                {publishedProjects.map(
                    (project, index) => {

                        const screenshot =
                            project.screenshots?.[0];


                        const image =
                            screenshot?.image ||
                            project.coverImage;


                        return (

                            <article
                                key={project.slug}
                                className={`
                                    selected-work__project
                                    ${index === 0
                                        ? 'is-active'
                                        : ''
                                    }
                                `}
                                data-project-index={index}
                            >

                                {/* ---------------------------------
                                    PROJECT META
                                --------------------------------- */}

                                <div className="selected-work__project-meta">

                                    <span>
                                        {String(
                                            index + 1
                                        ).padStart(2, '0')}
                                        {' '}
                                        /
                                        {' '}
                                        {String(
                                            publishedProjects.length
                                        ).padStart(2, '0')}
                                    </span>


                                    <span>
                                        {project.category}
                                    </span>

                                </div>


                                {/* ---------------------------------
                                    VISUAL
                                --------------------------------- */}

                                <Link
                                    to={`/projects/${project.slug}`}
                                    className="selected-work__visual-link"
                                    aria-label={`View ${project.title} project`}
                                >

                                    <div className="selected-work__visual">

                                        <div className="selected-work__visual-image-wrap">

                                            <img
                                                src={image}
                                                alt={`${project.title} project preview`}
                                                className="selected-work__visual-image"
                                                loading={
                                                    index === 0
                                                        ? 'eager'
                                                        : 'lazy'
                                                }
                                            />

                                        </div>


                                        <div
                                            className="selected-work__visual-overlay"
                                            aria-hidden="true"
                                        />


                                        <div className="selected-work__visual-index">

                                            <span>
                                                PROJECT
                                            </span>

                                            <strong>
                                                {String(
                                                    index + 1
                                                ).padStart(2, '0')}
                                            </strong>

                                        </div>


                                        <span className="selected-work__visual-arrow">
                                            ↗
                                        </span>

                                    </div>

                                </Link>


                                {/* ---------------------------------
                                    PROJECT INFORMATION
                                --------------------------------- */}

                                <div className="selected-work__project-info">

                                    <div className="selected-work__project-title-wrap">

                                        <span>
                                            {project.year}
                                        </span>


                                        <Link
                                            to={`/projects/${project.slug}`}
                                            className="selected-work__project-title"
                                        >
                                            {project.title}
                                        </Link>


                                        <p>
                                            {project.description}
                                        </p>

                                    </div>


                                    <div className="selected-work__project-details">

                                        <div>

                                            <span>
                                                TYPE
                                            </span>

                                            <strong>
                                                {project.category}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                ROLE
                                            </span>

                                            <strong>
                                                {project.role}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                STACK
                                            </span>

                                            <strong>
                                                {project.technologies
                                                    ?.slice(0, 3)
                                                    .map(
                                                        (
                                                            technology,
                                                            technologyIndex
                                                        ) => (
                                                            <span
                                                                key={
                                                                    technology.name
                                                                }
                                                                className="
                                                                    selected-work__tech
                                                                "
                                                            >
                                                                {
                                                                    technology.name
                                                                }

                                                                {technologyIndex <
                                                                    Math.min(
                                                                        project.technologies.length,
                                                                        3
                                                                    ) -
                                                                    1
                                                                    ? ' · '
                                                                    : ''}
                                                            </span>
                                                        )
                                                    )}
                                            </strong>

                                        </div>

                                    </div>

                                </div>


                                {/* ---------------------------------
                                    VIEW PROJECT
                                --------------------------------- */}

                                <Link
                                    to={`/projects/${project.slug}`}
                                    className="selected-work__view-project"
                                >

                                    <span>
                                        VIEW PROJECT
                                    </span>


                                    <span>
                                        ↗
                                    </span>

                                </Link>

                            </article>

                        );

                    }
                )}

            </div>


            {/* =================================================
                PROJECT NAVIGATION
            ================================================= */}

            <div className="selected-work__project-nav">

                <div className="selected-work__project-nav-label">

                    <span>
                        SELECT PROJECT
                    </span>


                    <span>
                        SCROLL TO EXPLORE
                    </span>

                </div>


                <div className="selected-work__project-nav-items">

                    {publishedProjects.map(
                        (project, index) => (

                            <Link
                                key={project.slug}
                                to={`/projects/${project.slug}`}
                                className={`
                                    selected-work__project-nav-item
                                    ${index === 0
                                        ? 'is-active'
                                        : ''
                                    }
                                `}
                                data-project-nav={index}
                            >

                                <span>
                                    {String(
                                        index + 1
                                    ).padStart(2, '0')}
                                </span>


                                <strong>
                                    {project.title}
                                </strong>


                                <span>
                                    ↗
                                </span>

                            </Link>

                        )
                    )}

                </div>

            </div>


            {/* =================================================
                BOTTOM STATEMENT
            ================================================= */}

            <footer className="selected-work__bottom">

                <div>

                    <span>
                        DF / WORK ARCHIVE
                    </span>


                    <span>
                        {String(
                            publishedProjects.length
                        ).padStart(2, '0')}
                        {' '}
                        SELECTED PROJECTS
                    </span>

                </div>


                <strong>
                    BUILD.
                    {' '}
                    SHIP.
                    {' '}
                    REPEAT.
                </strong>


                <Link
                    to="/projects"
                    className="selected-work__more"
                >

                    <span>
                        MORE WORK
                    </span>

                    <i>
                        ↗
                    </i>

                </Link>

            </footer>

        </section>

    );
};


export default SelectedWork;