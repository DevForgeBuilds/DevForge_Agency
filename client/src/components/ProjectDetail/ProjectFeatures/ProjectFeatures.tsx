import './ProjectFeatures.css';

import type { Project } from '../../../types/project';


interface ProjectFeaturesProps {
    project: Project;
}


const ProjectFeatures = ({
    project,
}: ProjectFeaturesProps) => {

    if (
        !project.features ||
        project.features.length === 0
    ) {
        return null;
    }


    return (

        <section
            className="project-features"
            aria-labelledby="project-features-title"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-features__meta">

                <div className="project-features__index">

                    <span className="project-features__dot" />

                    <span>
                        06 / KEY FEATURES
                    </span>

                </div>


                <span>
                    {String(project.features.length).padStart(2, '0')} FEATURES
                </span>

            </div>


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="project-features__intro">

                <div>

                    <span className="project-features__eyebrow">
                        WHAT WE BUILT
                    </span>


                    <h2
                        id="project-features-title"
                        className="project-features__title"
                    >
                        MADE
                        <br />
                        <span>
                            TO WORK.
                        </span>
                    </h2>

                </div>


                <p>
                    Every feature has a purpose. The final
                    experience brings together thoughtful
                    interactions, useful functionality and
                    a strong visual system.
                </p>

            </div>


            {/* =================================================
                FEATURE LIST
            ================================================= */}

            <div className="project-features__list">

                {project.features.map(
                    (
                        feature,
                        index
                    ) => (

                        <article
                            key={`${feature.number}-${feature.title}`}
                            className="project-feature"
                        >

                            {/* ---------------------------------
                                NUMBER
                            --------------------------------- */}

                            <div className="project-feature__number">

                                <span>
                                    {feature.number}
                                </span>

                            </div>


                            {/* ---------------------------------
                                TITLE
                            --------------------------------- */}

                            <div className="project-feature__title">

                                <h3>
                                    {feature.title}
                                </h3>

                            </div>


                            {/* ---------------------------------
                                DESCRIPTION
                            --------------------------------- */}

                            <div className="project-feature__description">

                                <p>
                                    {feature.description}
                                </p>

                            </div>


                            {/* ---------------------------------
                                INDEX
                            --------------------------------- */}

                            <div className="project-feature__index">

                                <span>
                                    FEATURE
                                </span>

                                <strong>
                                    {String(index + 1).padStart(2, '0')}
                                </strong>

                            </div>


                            {/* ---------------------------------
                                ARROW
                            --------------------------------- */}

                            <span
                                className="project-feature__arrow"
                                aria-hidden="true"
                            >
                                ↗
                            </span>

                        </article>

                    )
                )}

            </div>


            {/* =================================================
                STATEMENT
            ================================================= */}

            <div className="project-features__statement">

                <span>
                    DEVFORGE / ENGINEERING
                </span>


                <h3>
                    FUNCTION
                    <span>.</span>
                    <br />
                    FORM
                    <span>.</span>
                    <br />
                    EXPERIENCE
                    <span>.</span>
                </h3>


                <span>
                    {project.title}
                </span>

            </div>

        </section>

    );
};


export default ProjectFeatures;