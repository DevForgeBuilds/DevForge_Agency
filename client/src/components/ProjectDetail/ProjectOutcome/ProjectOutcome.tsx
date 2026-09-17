import './ProjectOutcome.css';

import type { Project } from '../../../types/project';


interface ProjectOutcomeProps {
    project: Project;
}


const ProjectOutcome = ({
    project,
}: ProjectOutcomeProps) => {

    if (
        !project.results ||
        project.results.length === 0
    ) {
        return null;
    }


    return (

        <section
            className="project-outcome"
            aria-labelledby="project-outcome-title"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-outcome__meta">

                <div className="project-outcome__index">

                    <span className="project-outcome__dot" />

                    <span>
                        07 / THE OUTCOME
                    </span>

                </div>


                <span>
                    PROJECT / {project.id}
                </span>

            </div>


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="project-outcome__intro">

                <div>

                    <span className="project-outcome__eyebrow">
                        THE RESULT
                    </span>


                    <h2
                        id="project-outcome-title"
                        className="project-outcome__title"
                    >
                        BUILT
                        <br />
                        <span>
                            WITH PURPOSE.
                        </span>
                    </h2>

                </div>


                <p>
                    The final product brings the original idea
                    into a focused digital experience — designed
                    to perform today and evolve tomorrow.
                </p>

            </div>


            {/* =================================================
                RESULTS
            ================================================= */}

            <div className="project-outcome__results">

                {project.results.map(
                    (result, index) => (

                        <article
                            key={`${result.label}-${index}`}
                            className="project-result"
                        >

                            <div className="project-result__top">

                                <span>
                                    {String(index + 1).padStart(2, '0')}
                                </span>


                                <span>
                                    RESULT
                                </span>

                            </div>


                            <div className="project-result__value">

                                <strong>
                                    {result.value}
                                </strong>

                            </div>


                            <div className="project-result__content">

                                <h3>
                                    {result.label}
                                </h3>


                                {result.description && (

                                    <p>
                                        {result.description}
                                    </p>

                                )}

                            </div>


                            <span
                                className="project-result__arrow"
                                aria-hidden="true"
                            >
                                ↗
                            </span>

                        </article>

                    )
                )}

            </div>


            {/* =================================================
                FINAL STATEMENT
            ================================================= */}

            <div className="project-outcome__statement">

                <div className="project-outcome__statement-meta">

                    <span>
                        DEVFORGE / OUTCOME
                    </span>

                    <span>
                        {project.title}
                    </span>

                </div>


                <h3>
                    IDEA
                    <span> → </span>
                    PRODUCT
                    <span> → </span>
                    IMPACT.
                </h3>

            </div>

        </section>

    );
};


export default ProjectOutcome;