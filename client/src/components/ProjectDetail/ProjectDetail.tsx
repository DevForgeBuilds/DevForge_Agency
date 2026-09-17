import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

import type { Project } from '../../types/project';

// Individual project sections
import ProjectHero from './ProjectHero/ProjectHero';
import ProjectOverview from './ProjectOverview/ProjectOverview';
import ProjectChallenge from './ProjectChallenge/ProjectChallenge';
import ProjectProcess from './ProjectProcess/ProjectProcess';
import ProjectShowcase from './ProjectShowcase/ProjectShowcase';
import ProjectTechStack from './ProjectTechStack/ProjectTechStack';
import ProjectFeatures from './ProjectFeatures/ProjectFeatures';
import ProjectOutcome from './ProjectOutcome/ProjectOutcome';
import ProjectLive from './ProjectLive/ProjectLive';
import ProjectNext from './ProjectNext/ProjectNext';


interface ProjectDetailProps {
    project: Project;
    nextProject?: Project;
}


const ProjectDetail = ({
    project,
    nextProject,
}: ProjectDetailProps) => {

    const navigate = useNavigate();

    const sectionRef =
        useRef<HTMLDivElement | null>(null);


    /* ========================================================
       PAGE INIT
    ======================================================== */

    useEffect(() => {

        if (!sectionRef.current) {
            return;
        }

        /*
         * Project detail page animation
         * can be connected here.
         */

    }, []);


    /* ========================================================
       MAIN
    ======================================================== */

    return (

        <main
            ref={sectionRef}
            className="project-detail"
            data-project={project.slug}
        >

            <div className="project-detail__back">
                <button
                    type="button"
                    onClick={() => navigate('/#selected-work')}
                    aria-label="Back to selected work"
                >
                    <span>←</span>
                    <span>BACK TO WORK</span>
                </button>
            </div>

            {/* =================================================
                01 — HERO
            ================================================= */}

            <ProjectHero
                project={project}
            />


            {/* =================================================
                02 — OVERVIEW
            ================================================= */}

            <ProjectOverview
                project={project}
            />


            {/* =================================================
                03 — CHALLENGE
            ================================================= */}

            <ProjectChallenge
                project={project}
            />


            {/* =================================================
                04 — PROCESS
            ================================================= */}

            <ProjectProcess
                project={project}
            />


            {/* =================================================
                05 — SHOWCASE
            ================================================= */}

            <ProjectShowcase
                project={project}
            />


            {/* =================================================
                06 — TECHNOLOGY
            ================================================= */}

            <ProjectTechStack
                project={project}
            />


            {/* =================================================
                07 — FEATURES
            ================================================= */}

            <ProjectFeatures
                project={project}
            />


            {/* =================================================
                08 — OUTCOME
            ================================================= */}

            <ProjectOutcome
                project={project}
            />


            {/* =================================================
                09 — LIVE PROJECT
            ================================================= */}

            <ProjectLive
                project={project}
            />


            {/* =================================================
                10 — NEXT PROJECT
            ================================================= */}

            <ProjectNext
                project={project}
                nextProject={nextProject}
            />

        </main>

    );
};


export default ProjectDetail;