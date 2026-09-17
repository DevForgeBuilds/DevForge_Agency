import './ProjectHero.css';

import type { Project } from '../../../types/project';


interface ProjectHeroProps {
    project: Project;
}


const ProjectHero = ({
    project,
}: ProjectHeroProps) => {

    return (

        <section
            className="project-hero"
            aria-labelledby="project-hero-title"
        >

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="project-hero__grid"
                aria-hidden="true"
            />

            <div
                className="project-hero__glow"
                aria-hidden="true"
            />


            {/* =================================================
                TOP META
            ================================================= */}

            <header className="project-hero__top">

                <div className="project-hero__index">

                    <span className="project-hero__dot" />

                    <span>
                        PROJECT / {project.id}
                    </span>

                </div>


                <span className="project-hero__system">
                    DEVFORGE / PROJECT ARCHIVE
                </span>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <div className="project-hero__main">

                {/* -------------------------------------------------
                    LEFT — PROJECT INFORMATION
                ------------------------------------------------- */}

                <div className="project-hero__content">

                    <div className="project-hero__category">

                        <span>
                            {project.category}
                        </span>

                        <span>
                            / {project.year}
                        </span>

                    </div>


                    <h1
                        id="project-hero-title"
                        className="project-hero__title"
                    >
                        {project.title}
                    </h1>


                    <p className="project-hero__description">
                        {project.description}
                    </p>


                    {/* ---------------------------------------------
                        PROJECT META
                    --------------------------------------------- */}

                    <div className="project-hero__meta">

                        {project.client && (

                            <div className="project-hero__meta-item">

                                <span>
                                    CLIENT
                                </span>

                                <strong>
                                    {project.client}
                                </strong>

                            </div>

                        )}


                        {project.role && (

                            <div className="project-hero__meta-item">

                                <span>
                                    ROLE
                                </span>

                                <strong>
                                    {project.role}
                                </strong>

                            </div>

                        )}


                        {project.duration && (

                            <div className="project-hero__meta-item">

                                <span>
                                    DURATION
                                </span>

                                <strong>
                                    {project.duration}
                                </strong>

                            </div>

                        )}

                    </div>


                    {/* ---------------------------------------------
                        ACTIONS
                    --------------------------------------------- */}

                    <div className="project-hero__actions">

                        {project.liveUrl && (

                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    project-hero__button
                                    project-hero__button--primary
                                "
                            >

                                <span>
                                    VISIT WEBSITE
                                </span>

                                <span>
                                    ↗
                                </span>

                            </a>

                        )}


                        {project.githubUrl && (

                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    project-hero__button
                                    project-hero__button--secondary
                                "
                            >

                                <span>
                                    SOURCE CODE
                                </span>

                                <span>
                                    ↗
                                </span>

                            </a>

                        )}

                    </div>

                </div>


                {/* -------------------------------------------------
                    RIGHT — PROJECT VISUAL
                ------------------------------------------------- */}

                <div className="project-hero__visual">

                    <div className="project-hero__visual-frame">

                        <div className="project-hero__browser-bar">

                            <div className="project-hero__browser-dots">

                                <span />
                                <span />
                                <span />

                            </div>


                            <span className="project-hero__browser-url">
                                {project.slug}.devforge
                            </span>


                            <span className="project-hero__browser-status">
                                LIVE
                            </span>

                        </div>


                        <div className="project-hero__image-wrap">

                            <img
                                src={project.coverImage}
                                alt={`${project.title} project preview`}
                                className="project-hero__image"
                            />

                            <div
                                className="project-hero__image-overlay"
                                aria-hidden="true"
                            />

                        </div>

                    </div>


                    {/* -------------------------------------------------
                        FLOATING LABELS
                    ------------------------------------------------- */}

                    <div className="project-hero__float project-hero__float--top">

                        <span>
                            DIGITAL PRODUCT
                        </span>

                        <strong>
                            001
                        </strong>

                    </div>


                    <div className="project-hero__float project-hero__float--bottom">

                        <span>
                            BUILT BY
                        </span>

                        <strong>
                            DEVFORGE
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM META
            ================================================= */}

            <footer className="project-hero__footer">

                <div>

                    <span>
                        SCROLL TO EXPLORE
                    </span>

                    <span className="project-hero__scroll-arrow">
                        ↓
                    </span>

                </div>


                <div>
                    {project.category}
                </div>


                <div>
                    {String(project.year)}
                </div>

            </footer>

        </section>

    );
};


export default ProjectHero;