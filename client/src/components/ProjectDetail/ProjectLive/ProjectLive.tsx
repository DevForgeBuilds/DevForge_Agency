import './ProjectLive.css';

import type { Project } from '../../../types/project';


interface ProjectLiveProps {
    project: Project;
}


const ProjectLive = ({
    project,
}: ProjectLiveProps) => {

    const hasLiveUrl =
        Boolean(project.liveUrl);

    const hasGithubUrl =
        Boolean(project.githubUrl);


    if (!hasLiveUrl && !hasGithubUrl) {
        return null;
    }


    return (

        <section
            className="project-live"
            aria-labelledby="project-live-title"
        >

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="project-live__grid"
                aria-hidden="true"
            />

            <div
                className="project-live__glow"
                aria-hidden="true"
            />


            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-live__meta">

                <div className="project-live__index">

                    <span className="project-live__dot" />

                    <span>
                        08 / TAKE IT LIVE
                    </span>

                </div>


                <span>
                    {project.title}
                </span>

            </div>


            {/* =================================================
                MAIN
            ================================================= */}

            <div className="project-live__main">

                <div className="project-live__eyebrow">
                    THE FINISHED PRODUCT
                </div>


                <h2
                    id="project-live-title"
                    className="project-live__title"
                >
                    SEE IT
                    <br />
                    <span>
                        IN ACTION.
                    </span>
                </h2>


                <p className="project-live__description">
                    The project is more than a case study.
                    Explore the finished experience and see
                    how the final product works in the real world.
                </p>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="project-live__actions">

                    {hasLiveUrl && (

                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                project-live__button
                                project-live__button--primary
                            "
                        >

                            <span>
                                VISIT LIVE WEBSITE
                            </span>

                            <span className="project-live__button-arrow">
                                ↗
                            </span>

                        </a>

                    )}


                    {hasGithubUrl && (

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                project-live__button
                                project-live__button--secondary
                            "
                        >

                            <span>
                                VIEW SOURCE CODE
                            </span>

                            <span className="project-live__button-arrow">
                                ↗
                            </span>

                        </a>

                    )}

                </div>

            </div>


            {/* =================================================
                LIVE STATUS CARD
            ================================================= */}

            <div className="project-live__status">

                <div className="project-live__status-top">

                    <span>
                        PROJECT STATUS
                    </span>


                    <span className="project-live__status-live">

                        <i />

                        LIVE

                    </span>

                </div>


                <div className="project-live__status-body">

                    <div className="project-live__status-title">

                        <span>
                            CURRENT BUILD
                        </span>

                        <strong>
                            {project.title}
                        </strong>

                    </div>


                    <div className="project-live__status-line">

                        <span />


                        <div>

                            <span>
                                SYSTEM
                            </span>

                            <strong>
                                PRODUCTION READY
                            </strong>

                        </div>

                    </div>


                    <div className="project-live__status-line">

                        <span />


                        <div>

                            <span>
                                YEAR
                            </span>

                            <strong>
                                {project.year}
                            </strong>

                        </div>

                    </div>


                    <div className="project-live__status-line">

                        <span />


                        <div>

                            <span>
                                CATEGORY
                            </span>

                            <strong>
                                {project.category}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM
            ================================================= */}

            <div className="project-live__footer">

                <span>
                    DEVFORGE / DEPLOYMENT
                </span>


                <span>
                    BUILT · TESTED · DEPLOYED
                </span>


                <span>
                    08 / 10
                </span>

            </div>

        </section>

    );
};


export default ProjectLive;