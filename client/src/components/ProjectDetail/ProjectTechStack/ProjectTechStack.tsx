import './ProjectTechStack.css';

import type { Project } from '../../../types/project';


interface ProjectTechStackProps {
    project: Project;
}


const ProjectTechStack = ({
    project,
}: ProjectTechStackProps) => {

    if (
        !project.technologies ||
        project.technologies.length === 0
    ) {
        return null;
    }


    return (

        <section
            className="project-tech"
            aria-labelledby="project-tech-title"
        >

            {/* =================================================
                TOP META
            ================================================= */}

            <div className="project-tech__meta">

                <div className="project-tech__index">

                    <span className="project-tech__dot" />

                    <span>
                        05 / TECHNOLOGY
                    </span>

                </div>


                <span>
                    {String(project.technologies.length).padStart(2, '0')} TOOLS
                </span>

            </div>


            {/* =================================================
                INTRO
            ================================================= */}

            <div className="project-tech__intro">

                <div className="project-tech__eyebrow">
                    THE TOOLBOX
                </div>


                <h2
                    id="project-tech-title"
                    className="project-tech__title"
                >
                    POWERED
                    <br />
                    <span>
                        BY TECH.
                    </span>
                </h2>


                <p className="project-tech__description">
                    The technology behind the experience —
                    selected around performance, flexibility
                    and the needs of the product.
                </p>

            </div>


            {/* =================================================
                TECHNOLOGY LIST
            ================================================= */}

            <div className="project-tech__list">

                {project.technologies.map(
                    (technology, index) => (

                        <article
                            key={`${technology.name}-${index}`}
                            className="project-tech__item"
                        >

                            <div className="project-tech__number">

                                <span>
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                            </div>


                            <div className="project-tech__name">

                                <h3>
                                    {technology.name}
                                </h3>

                            </div>


                            <div className="project-tech__category">

                                <span>
                                    {technology.category || 'TECHNOLOGY'}
                                </span>

                            </div>


                            <div className="project-tech__arrow">
                                ↗
                            </div>

                        </article>

                    )
                )}

            </div>


            {/* =================================================
                FOOTER STATEMENT
            ================================================= */}

            <div className="project-tech__footer">

                <span>
                    DEVFORGE / STACK
                </span>


                <p>
                    RIGHT TOOL.
                    <br />
                    RIGHT PURPOSE.
                    <br />
                    BETTER PRODUCT.
                </p>


                <span>
                    {project.title}
                </span>

            </div>

        </section>

    );
};


export default ProjectTechStack;