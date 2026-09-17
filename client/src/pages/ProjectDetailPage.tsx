import {
    useEffect,
    useState,
} from 'react';

import {
    useParams,
    Link,
} from 'react-router-dom';

import ProjectDetail from '../components/ProjectDetail/ProjectDetail';

import type { Project } from '../types/project';

import {
    getProjectBySlug,
    getProjects,
} from '../lib/projects';

import './ProjectDetailPage.css';


const ProjectDetailPage = () => {

    const { slug } = useParams<{
        slug: string;
    }>();


    const [project, setProject] =
        useState<Project | null>(null);

    const [nextProject, setNextProject] =
        useState<Project | undefined>(undefined);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(false);


    useEffect(() => {

        let cancelled = false;


        const loadProject = async () => {

            if (!slug) {

                setError(true);
                setLoading(false);

                return;
            }


            try {

                setLoading(true);
                setError(false);


                /*
                 * Load current project
                 */

                const currentProject =
                    await getProjectBySlug(slug);


                if (cancelled) {
                    return;
                }


                setProject(currentProject);


                /*
                 * Load all projects
                 * for NEXT PROJECT navigation
                 */

                try {

                    const allProjects =
                        await getProjects();


                    if (cancelled) {
                        return;
                    }


                    const publishedProjects =
                        allProjects.filter(
                            (item) =>
                                item.published
                        );


                    const currentIndex =
                        publishedProjects.findIndex(
                            (item) =>
                                item.slug ===
                                currentProject.slug
                        );


                    if (
                        currentIndex !== -1 &&
                        publishedProjects.length > 1
                    ) {

                        const nextIndex =
                            (
                                currentIndex + 1
                            ) %
                            publishedProjects.length;


                        setNextProject(
                            publishedProjects[nextIndex]
                        );

                    } else {

                        setNextProject(
                            undefined
                        );

                    }

                } catch {

                    /*
                     * Next project is optional.
                     * Current project should still render.
                     */

                    setNextProject(
                        undefined
                    );
                }


            } catch {

                if (!cancelled) {

                    setProject(null);
                    setError(true);

                }

            } finally {

                if (!cancelled) {

                    setLoading(false);

                }

            }

        };


        loadProject();


        return () => {

            cancelled = true;

        };

    }, [slug]);


    /* ========================================================
       LOADING
    ======================================================== */

    if (loading) {

        return (

            <main className="project-detail-page project-detail-page--loading">

                <div className="project-detail-page__state">

                    <span>
                        PROJECT / LOADING
                    </span>

                    <h1>
                        LOADING
                        <br />
                        PROJECT...
                    </h1>

                </div>

            </main>

        );

    }


    /* ========================================================
       NOT FOUND
    ======================================================== */

    if (error || !project) {

        return (

            <main className="project-detail-page project-detail-page--not-found">

                <div className="project-detail-page__state">

                    <span>
                        PROJECT / 404
                    </span>

                    <h1>
                        PROJECT
                        <br />
                        NOT FOUND.
                    </h1>

                    <p>
                        The project you're looking for
                        doesn't exist or is no longer available.
                    </p>


                    <Link
                        to="/projects"
                        className="project-detail-page__back"
                    >
                        BACK TO PROJECTS
                        <span>
                            ↗
                        </span>
                    </Link>

                </div>

            </main>

        );

    }


    /* ========================================================
       PROJECT
    ======================================================== */

    return (

        <ProjectDetail
            project={project}
            nextProject={nextProject}
        />

    );

};


export default ProjectDetailPage;