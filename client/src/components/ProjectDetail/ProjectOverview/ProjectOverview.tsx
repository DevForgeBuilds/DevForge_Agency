import './ProjectOverview.css';

import type { Project } from '../../../types/project';


interface ProjectOverviewProps {
    project: Project;
}


const ProjectOverview = ({
    project,
}: ProjectOverviewProps) => {

    if (!project.overview) {
        return null;
    }


    return (

        <section
            className="project-overview"
            aria-labelledby="project-overview-title"
        >

            {/* =================================================
                SECTION META
            ================================================= */}

            <div className="project-overview__meta">

                <div className="project-overview__index">

                    <span className="project-overview__dot" />

                    <span>
                        01 / OVERVIEW
                    </span>

                </div>


                <span>
                    PROJECT / {project.id}
                </span>

            </div>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="project-overview__content">

                <div className="project-overview__label">

                    <span>
                        THE PROJECT
                    </span>

                </div>


                <div className="project-overview__main">

                    <h2
                        id="project-overview-title"
                        className="project-overview__title"
                    >
                        BUILT TO
                        <br />
                        <span>
                            MAKE AN IMPACT.
                        </span>
                    </h2>


                    <div className="project-overview__copy">

                        <p>
                            {project.overview}
                        </p>


                        <div className="project-overview__line" />

                    </div>

                </div>

            </div>


            {/* =================================================
                PROJECT INFORMATION
            ================================================= */}

            <div className="project-overview__details">

                <div className="project-overview__details-header">

                    <span>
                        PROJECT INFORMATION
                    </span>

                    <span>
                        / {project.category}
                    </span>

                </div>


                <div className="project-overview__details-grid">

                    <div className="project-overview__detail">

                        <span>
                            PROJECT
                        </span>

                        <strong>
                            {project.title}
                        </strong>

                    </div>


                    <div className="project-overview__detail">

                        <span>
                            CATEGORY
                        </span>

                        <strong>
                            {project.category}
                        </strong>

                    </div>


                    <div className="project-overview__detail">

                        <span>
                            YEAR
                        </span>

                        <strong>
                            {project.year}
                        </strong>

                    </div>


                    {project.client && (

                        <div className="project-overview__detail">

                            <span>
                                CLIENT
                            </span>

                            <strong>
                                {project.client}
                            </strong>

                        </div>

                    )}


                    {project.role && (

                        <div className="project-overview__detail">

                            <span>
                                ROLE
                            </span>

                            <strong>
                                {project.role}
                            </strong>

                        </div>

                    )}


                    {project.duration && (

                        <div className="project-overview__detail">

                            <span>
                                DURATION
                            </span>

                            <strong>
                                {project.duration}
                            </strong>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                BOTTOM STATEMENT
            ================================================= */}

            <div className="project-overview__statement">

                <span>
                    DEVFORGE / CASE STUDY
                </span>


                <p>
                    From initial concept to final launch,
                    every part of the experience was designed
                    with purpose.
                </p>

            </div>

        </section>

    );
};


export default ProjectOverview;