import './ProjectChallenge.css';

import type { Project } from '../../../types/project';


interface ProjectChallengeProps {
    project: Project;
}


const ProjectChallenge = ({
    project,
}: ProjectChallengeProps) => {

    if (!project.challenge) {
        return null;
    }


    return (

        <section
            className="project-challenge"
            aria-labelledby="project-challenge-title"
        >

            {/* =================================================
                BACKGROUND DETAILS
            ================================================= */}

            <div
                className="project-challenge__grid"
                aria-hidden="true"
            />

            <div
                className="project-challenge__orb"
                aria-hidden="true"
            />


            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-challenge__meta">

                <div className="project-challenge__index">

                    <span className="project-challenge__dot" />

                    <span>
                        02 / THE CHALLENGE
                    </span>

                </div>


                <span>
                    {project.category}
                </span>

            </div>


            {/* =================================================
                MAIN
            ================================================= */}

            <div className="project-challenge__main">

                <div className="project-challenge__number">
                    02
                </div>


                <div className="project-challenge__content">

                    <div className="project-challenge__eyebrow">
                        THE PROBLEM
                    </div>


                    <h2
                        id="project-challenge-title"
                        className="project-challenge__title"
                    >
                        EVERY
                        <br />
                        <span>
                            PROBLEM
                        </span>
                        <br />
                        HAS A
                        <br />
                        BETTER WAY.
                    </h2>


                    <div className="project-challenge__copy">

                        <p>
                            {project.challenge}
                        </p>


                        <div className="project-challenge__rule">

                            <span />

                            <span>
                                PROBLEM → SOLUTION
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                BOTTOM STATEMENT
            ================================================= */}

            <div className="project-challenge__bottom">

                <span>
                    DEVFORGE / APPROACH
                </span>


                <span>
                    TURNING COMPLEXITY
                    <br />
                    INTO CLARITY.
                </span>


                <span>
                    02 / 10
                </span>

            </div>

        </section>

    );
};


export default ProjectChallenge;