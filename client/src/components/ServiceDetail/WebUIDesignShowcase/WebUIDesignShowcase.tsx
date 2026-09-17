import { useEffect, useRef } from 'react';
import './WebUIDesignShowcase.css';

import {
    initWebUIDesignAnimation,
} from '../../../animations/webUIDesignAnimation';


const WebUIDesignShowcase = () => {

    const sectionRef =
        useRef<HTMLElement | null>(null);


    useEffect(() => {

        if (!sectionRef.current) {
            return;
        }

        return initWebUIDesignAnimation(
            sectionRef.current
        );

    }, []);


    return (
        <section
            ref={sectionRef}
            className="webui-showcase"
        >

            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="webui-showcase__header">

                <div className="webui-showcase__eyebrow">

                    <span>
                        01
                    </span>

                    <span>
                        DESIGN TRANSFORMATION
                    </span>

                </div>


                <div className="webui-showcase__label">

                    WIREFRAME / TYPE / UI

                </div>

            </header>


            {/* ==================================================
                MAIN STAGE
            ================================================== */}

            <div className="webui-showcase__stage">


                {/* ==================================================
                    WIREFRAME
                ================================================== */}

                <div className="webui-wireframe">

                    <div className="webui-wireframe__top">

                        <span>
                            WIREFRAME
                        </span>

                        <small>
                            01 / 04
                        </small>

                    </div>


                    <div className="webui-wireframe__canvas">

                        <div className="wire-block wire-logo" />

                        <div className="wire-block wire-nav" />

                        <div className="wire-block wire-hero" />

                        <div className="wire-block wire-title" />

                        <div className="wire-block wire-copy" />

                        <div className="wire-block wire-button" />

                        <div className="wire-block wire-image" />

                        <div className="wire-block wire-card card-one" />

                        <div className="wire-block wire-card card-two" />

                        <div className="wire-block wire-card card-three" />

                    </div>


                    <div className="webui-wireframe__grid" />

                </div>


                {/* ==================================================
                    TRANSFORM
                ================================================== */}

                <div className="webui-showcase__transform">

                    <span>
                        DEFINE
                    </span>

                    <div>

                        <i />
                        <i />
                        <i />

                    </div>

                    <strong>
                        →
                    </strong>

                </div>


                {/* ==================================================
                    FINAL UI
                ================================================== */}

                <div className="webui-interface">

                    <div className="webui-interface__top">

                        <div className="webui-interface__logo">
                            DF
                        </div>


                        <nav>

                            <span>
                                WORK
                            </span>

                            <span>
                                STUDIO
                            </span>

                            <span>
                                CONTACT
                            </span>

                        </nav>


                        <small>
                            01 / 04
                        </small>

                    </div>


                    <div className="webui-interface__body">

                        <div className="webui-interface__grid" />


                        <div className="webui-interface__copy">

                            <span>
                                DIGITAL DESIGN STUDIO
                            </span>

                            <h3>
                                SHAPE
                                <br />
                                THE
                                <br />
                                <em>
                                    EXPERIENCE.
                                </em>
                            </h3>

                            <p>
                                Interfaces built around
                                clarity, character and
                                conversion.
                            </p>


                            <button
                                type="button"
                            >
                                EXPLORE
                                <b>
                                    ↗
                                </b>
                            </button>

                        </div>


                        <div className="webui-interface__shape">

                            <div className="shape-inner">
                                DF
                            </div>

                        </div>


                        <div className="webui-interface__status">

                            <span>
                                DESIGN SYSTEM
                            </span>

                            <strong>
                                READY
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM STATEMENT
            ================================================== */}

            <div className="webui-showcase__statement">

                <span>
                    FROM STRUCTURE
                </span>

                <strong>
                    TO A
                    <em>
                        SIGNATURE.
                    </em>
                </strong>

            </div>

        </section>
    );
};


export default WebUIDesignShowcase;