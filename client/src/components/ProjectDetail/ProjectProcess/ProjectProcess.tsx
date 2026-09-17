import './ProjectProcess.css';

import type { Project } from '../../../types/project';


interface ProjectProcessProps {
    project: Project;
}


const ProjectProcess = ({
    project,
}: ProjectProcessProps) => {

    if (
        !project.process ||
        project.process.length === 0
    ) {
        return null;
    }


    return (

        <section
            className="project-process"
            aria-labelledby="project-process-title"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-process__meta">

                <div className="project-process__index">

                    <span className="project-process__dot" />

                    <span>
                        03 / OUR PROCESS
                    </span>

                </div>


                <span>
                    {String(project.process.length).padStart(2, '0')} STEPS
                </span>

            </div>


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="project-process__intro">

                <div className="project-process__eyebrow">
                    HOW WE BUILT IT
                </div>


                <h2
                    id="project-process-title"
                    className="project-process__title"
                >
                    FROM
                    <br />
                    <span>
                        IDEA
                    </span>
                    <br />
                    TO
                    <br />
                    IMPACT.
                </h2>


                <p className="project-process__intro-copy">
                    Every project follows a clear direction —
                    from understanding the problem to building,
                    refining and launching the final experience.
                </p>

            </div>


            {/* =================================================
                PROCESS TRACK
            ================================================= */}

            <div className="project-process__track">

                <div
                    className="project-process__line"
                    aria-hidden="true"
                />


                <div className="project-process__steps">

                    {project.process.map(
                        (step, index) => (

                            <article
                                key={`${step.number}-${step.title}`}
                                className="project-process__step"
                                data-step={index + 1}
                            >

                                {/* ---------------------------------
                                    STEP NUMBER
                                --------------------------------- */}

                                <div className="project-process__step-top">

                                    <span className="project-process__step-number">
                                        {step.number}
                                    </span>


                                    <span className="project-process__step-marker" />

                                </div>


                                {/* ---------------------------------
                                    CONTENT
                                --------------------------------- */}

                                <div className="project-process__step-content">

                                    <h3>
                                        {step.title}
                                    </h3>


                                    <p>
                                        {step.description}
                                    </p>

                                </div>


                                {/* ---------------------------------
                                    INDEX
                                --------------------------------- */}

                                <span className="project-process__step-index">
                                    {String(index + 1).padStart(2, '0')} / {String(project.process?.length).padStart(2, '0')}
                                </span>

                            </article>

                        )
                    )}

                </div>

            </div>


            {/* =================================================
                BOTTOM
            ================================================= */}

            <div className="project-process__bottom">

                <span>
                    DEVFORGE / METHOD
                </span>


                <span>
                    THINK
                    <i />
                    DESIGN
                    <i />
                    BUILD
                    <i />
                    LAUNCH
                </span>


                <span>
                    ↓
                </span>

            </div>

        </section>

    );
};


export default ProjectProcess;