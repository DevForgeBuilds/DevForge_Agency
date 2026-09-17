import {
    useEffect,
    useState,
} from 'react';

import './ProjectShowcase.css';

import type {
    Project,
    ProjectScreenshot,
} from '../../../types/project';


interface ProjectShowcaseProps {
    project: Project;
}


const ProjectShowcase = ({
    project,
}: ProjectShowcaseProps) => {

    const screenshots =
        project.screenshots;


    const [
        activeImage,
        setActiveImage,
    ] = useState<ProjectScreenshot | null>(
        null
    );


    /* ========================================================
       LIGHTBOX KEYBOARD CONTROL
    ======================================================== */

    useEffect(() => {

        if (!activeImage) {
            return;
        }


        const handleKeyDown = (
            event: KeyboardEvent
        ) => {

            if (event.key === 'Escape') {

                setActiveImage(null);

            }

        };


        document.addEventListener(
            'keydown',
            handleKeyDown
        );


        document.body.style.overflow =
            'hidden';


        return () => {

            document.removeEventListener(
                'keydown',
                handleKeyDown
            );

            document.body.style.overflow =
                '';

        };

    }, [activeImage]);


    /* ========================================================
       EMPTY STATE
    ======================================================== */

    if (
        !screenshots ||
        screenshots.length === 0
    ) {
        return null;
    }


    return (

        <section
            className="project-showcase"
            aria-labelledby="project-showcase-title"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="project-showcase__header">

                <div className="project-showcase__meta">

                    <div className="project-showcase__index">

                        <span className="project-showcase__dot" />

                        <span>
                            04 / PROJECT SCREENS
                        </span>

                    </div>


                    <span>
                        {String(screenshots.length).padStart(2, '0')} SCREENS
                    </span>

                </div>


                <div className="project-showcase__intro">

                    <div>

                        <span className="project-showcase__eyebrow">
                            INSIDE THE EXPERIENCE
                        </span>


                        <h2
                            id="project-showcase-title"
                            className="project-showcase__title"
                        >
                            BUILT TO
                            <br />
                            <span>
                                BE SEEN.
                            </span>
                        </h2>

                    </div>


                    <p>
                        A closer look at the interfaces,
                        interactions and details that make
                        the product come together.
                    </p>

                </div>

            </header>


            {/* =================================================
                SCREENSHOT GALLERY
            ================================================= */}

            <div className="project-showcase__gallery">

                {screenshots.map(
                    (
                        screenshot,
                        index
                    ) => {

                        const isFeatured =
                            index === 0 ||
                            index % 3 === 0;


                        return (

                            <figure
                                key={screenshot.id}
                                className={`
                                    project-showcase__item
                                    ${isFeatured
                                        ? 'project-showcase__item--featured'
                                        : ''
                                    }
                                `}
                            >

                                {/* ---------------------------------
                                    IMAGE
                                --------------------------------- */}

                                <button
                                    type="button"
                                    className="project-showcase__image-button"
                                    onClick={() =>
                                        setActiveImage(
                                            screenshot
                                        )
                                    }
                                    aria-label={`
                                        View ${screenshot.title ||
                                        project.title
                                        } fullscreen
                                    `}
                                >

                                    <div className="project-showcase__image-wrap">

                                        <img
                                            src={screenshot.image}
                                            alt={
                                                screenshot.title
                                                    ? `${project.title} — ${screenshot.title}`
                                                    : `${project.title} project screenshot`
                                            }
                                            className="project-showcase__image"
                                            loading={
                                                index === 0
                                                    ? 'eager'
                                                    : 'lazy'
                                            }
                                        />


                                        <div
                                            className="project-showcase__image-overlay"
                                            aria-hidden="true"
                                        />


                                        <span className="project-showcase__view">

                                            VIEW
                                            <span>
                                                ↗
                                            </span>

                                        </span>

                                    </div>

                                </button>


                                {/* ---------------------------------
                                    CAPTION
                                --------------------------------- */}

                                <figcaption className="project-showcase__caption">

                                    <div>

                                        <span className="project-showcase__caption-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>


                                        <span className="project-showcase__caption-line" />

                                    </div>


                                    <div className="project-showcase__caption-content">

                                        <strong>
                                            {
                                                screenshot.title ||
                                                `SCREEN ${String(index + 1).padStart(2, '0')}`
                                            }
                                        </strong>


                                        {screenshot.caption && (

                                            <p>
                                                {screenshot.caption}
                                            </p>

                                        )}

                                    </div>

                                </figcaption>

                            </figure>

                        );

                    }
                )}

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="project-showcase__footer">

                <span>
                    DEVFORGE / VISUAL ARCHIVE
                </span>


                <span>
                    {project.title}
                </span>


                <span>
                    CLICK ANY SCREEN TO EXPAND
                </span>

            </footer>


            {/* =================================================
                LIGHTBOX
            ================================================= */}

            {activeImage && (

                <div
                    className="project-showcase__lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Project screenshot viewer"
                    onClick={() =>
                        setActiveImage(null)
                    }
                >

                    <div className="project-showcase__lightbox-top">

                        <span>
                            PROJECT / {project.id}
                        </span>


                        <button
                            type="button"
                            onClick={() =>
                                setActiveImage(null)
                            }
                            aria-label="Close image viewer"
                        >
                            CLOSE
                            <span>
                                ×
                            </span>
                        </button>

                    </div>


                    <div
                        className="project-showcase__lightbox-content"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <img
                            src={activeImage.image}
                            alt={
                                activeImage.title ||
                                `${project.title} project screenshot`
                            }
                        />


                        <div className="project-showcase__lightbox-caption">

                            <span>
                                SCREEN / {
                                    String(
                                        screenshots.findIndex(
                                            (item) =>
                                                item.id ===
                                                activeImage.id
                                        ) + 1
                                    ).padStart(2, '0')
                                }
                            </span>


                            <strong>
                                {
                                    activeImage.title ||
                                    project.title
                                }
                            </strong>

                        </div>

                    </div>

                </div>

            )}

        </section>

    );
};


export default ProjectShowcase;