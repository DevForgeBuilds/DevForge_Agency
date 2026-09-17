import './ProjectNext.css';

import type { Project } from '../../../types/project';


interface ProjectNextProps {
    project: Project;
    nextProject?: Project;
}


const ProjectNext = ({
    project,
    nextProject,
}: ProjectNextProps) => {

    return (

        <section
            className="project-next"
            aria-labelledby="project-next-title"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-next__meta">

                <div className="project-next__index">

                    <span className="project-next__dot" />

                    <span>
                        09 / NEXT PROJECT
                    </span>

                </div>


                <span>
                    DEVFORGE / WORK
                </span>

            </div>


            {/* =================================================
                NEXT PROJECT
            ================================================= */}

            {nextProject ? (

                <div className="project-next__project">

                    <div className="project-next__project-meta">

                        <span>
                            UP NEXT
                        </span>


                        <span>
                            {nextProject.category}
                        </span>

                    </div>


                    <a
                        href={`/projects/${nextProject.slug}`}
                        className="project-next__project-link"
                    >

                        <div className="project-next__project-number">
                            10
                        </div>


                        <div className="project-next__project-content">

                            <span>
                                {nextProject.year}
                            </span>


                            <h2>
                                {nextProject.title}
                            </h2>


                            <p>
                                {nextProject.description}
                            </p>

                        </div>


                        <div className="project-next__project-arrow">
                            ↗
                        </div>

                    </a>

                </div>

            ) : (

                <div className="project-next__project project-next__project--empty">

                    <span>
                        MORE PROJECTS
                    </span>


                    <h2>
                        EXPLORE
                        <br />
                        <span>
                            OUR WORK.
                        </span>
                    </h2>

                </div>

            )}


            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="project-next__navigation">

                <a
                    href="/projects"
                    className="project-next__back"
                >

                    <span>
                        ←
                    </span>

                    <span>
                        BACK TO ALL PROJECTS
                    </span>

                </a>


                <div className="project-next__current">

                    <span>
                        CURRENT PROJECT
                    </span>


                    <strong>
                        {project.title}
                    </strong>

                </div>

            </div>


            {/* =================================================
                FINAL CTA
            ================================================= */}

            <div className="project-next__cta">

                <div className="project-next__cta-meta">

                    <span>
                        DEVFORGE / 2026
                    </span>


                    <span>
                        10 / 10
                    </span>

                </div>


                <h2
                    id="project-next-title"
                    className="project-next__cta-title"
                >
                    HAVE AN
                    <br />
                    <span>
                        IDEA?
                    </span>
                </h2>


                <p>
                    Let's turn your next ambitious idea
                    into something worth building.
                </p>


                <a
                    href="/contact"
                    className="project-next__cta-button"
                >

                    <span>
                        START A PROJECT
                    </span>


                    <span>
                        ↗
                    </span>

                </a>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="project-next__footer">

                <span>
                    DEVFORGE
                </span>


                <span>
                    BUILD · CODE · LAUNCH
                </span>


                <span>
                    BACK TO TOP ↑
                </span>

            </div>

        </section>

    );
};


export default ProjectNext;