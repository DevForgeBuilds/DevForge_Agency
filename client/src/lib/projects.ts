import type {
    Project,
    ProjectScreenshot,
    ProjectTechnology,
} from '../types/project';


// ============================================================
// API CONFIG
// ============================================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api';


// ============================================================
// BACKEND PROJECT TYPE
// ============================================================

interface BackendProject {
    _id: string;

    title: string;

    slug: string;

    client?: string;

    category?: string;

    year?: number | string;

    description?: string;

    role?: string;

    duration?: string;

    image?: string;

    video?: string;

    gallery?: Array<
        string |
        {
            id?: string;
            image?: string;
            title?: string;
            caption?: string;
        }
    >;

    projectUrl?: string;

    githubUrl?: string;

    overview?: string;

    challenge?: string;

    process?: {
        number?: string;
        title?: string;
        description?: string;
    }[];

    technologies?: Array<
        string |
        {
            name?: string;
            category?: string;
            icon?: string;
        }
    >;

    features?: {
        number?: string;
        title?: string;
        description?: string;
    }[];

    results?: {
        value?: string;
        label?: string;
        description?: string;
    }[];

    credits?: {
        role?: string;
        name?: string;
    }[];

    featured?: boolean;

    status?: string;

    isActive?: boolean;

    createdAt?: string;

    updatedAt?: string;
}


// ============================================================
// API RESPONSE
// ============================================================

interface ProjectsResponse {
    success: boolean;
    count: number;
    data: BackendProject[];
}


interface ProjectResponse {
    success: boolean;
    data: BackendProject;
}


// ============================================================
// IMAGE URL HELPER
// ============================================================

const resolveImageUrl = (
    image?: string
): string => {

    if (!image) {
        return '';
    }

    if (
        image.startsWith('http://') ||
        image.startsWith('https://')
    ) {
        return image;
    }

    if (image.startsWith('/')) {
        return `${API_BASE_URL.replace('/api', '')}${image}`;
    }

    return image;
};


// ============================================================
// BACKEND → FRONTEND PROJECT MAPPER
// ============================================================

const mapProject = (
    item: BackendProject
): Project => {

    const screenshots: ProjectScreenshot[] =
        (item.gallery || [])
            .map(
                (galleryItem, index) => {

                    if (typeof galleryItem === 'string') {

                        return {
                            id:
                                `${item.slug}-${index + 1}`,

                            image:
                                resolveImageUrl(
                                    galleryItem
                                ),
                        };
                    }

                    return {
                        id:
                            galleryItem.id ||
                            `${item.slug}-${index + 1}`,

                        image:
                            resolveImageUrl(
                                galleryItem.image
                            ),

                        title:
                            galleryItem.title,

                        caption:
                            galleryItem.caption,
                    };
                }
            )
            .filter(
                (item) => item.image
            );


    const technologies: ProjectTechnology[] =
        (item.technologies || [])
            .map(
                (technology) => {

                    if (typeof technology === 'string') {

                        return {
                            name: technology,
                        };
                    }

                    return {
                        name:
                            technology.name || '',

                        category:
                            technology.category,

                        icon:
                            technology.icon,
                    };
                }
            )
            .filter(
                (technology) =>
                    technology.name
            );


    return {

        id:
            item._id,

        title:
            item.title,

        slug:
            item.slug,

        description:
            item.description || '',

        category:
            item.category || '',

        year:
            Number(item.year) ||
            new Date(
                item.createdAt || Date.now()
            ).getFullYear(),

        client:
            item.client || '',

        role:
            item.role || '',

        duration:
            item.duration || '',

        coverImage:
            resolveImageUrl(
                item.image
            ),

        liveUrl:
            item.projectUrl || '',

        githubUrl:
            item.githubUrl || '',

        overview:
            item.overview || '',

        challenge:
            item.challenge || '',

        process:
            (item.process || []).map(
                (step, index) => ({
                    number:
                        step.number ||
                        String(index + 1)
                            .padStart(2, '0'),

                    title:
                        step.title || '',

                    description:
                        step.description || '',
                })
            ),

        screenshots,

        technologies,

        features:
            (item.features || []).map(
                (feature, index) => ({
                    number:
                        feature.number ||
                        String(index + 1)
                            .padStart(2, '0'),

                    title:
                        feature.title || '',

                    description:
                        feature.description || '',
                })
            ),

        results:
            (item.results || []).map(
                (result) => ({
                    value:
                        result.value || '',

                    label:
                        result.label || '',

                    description:
                        result.description,
                })
            ),

        credits:
            (item.credits || []).map(
                (credit) => ({
                    role:
                        credit.role || '',

                    name:
                        credit.name || '',
                })
            ),

        published:
            item.isActive === true,
    };
};


// ============================================================
// GET ALL PROJECTS
// ============================================================

export const getProjects =
    async (): Promise<Project[]> => {

        const response =
            await fetch(
                `${API_BASE_URL}/projects`
            );


        if (!response.ok) {
            throw new Error(
                'Failed to fetch projects'
            );
        }


        const result:
            ProjectsResponse =
                await response.json();


        if (!result.success) {
            throw new Error(
                'Failed to fetch projects'
            );
        }


        return result.data.map(
            mapProject
        );
    };


// ============================================================
// GET PROJECT BY SLUG
// ============================================================

export const getProjectBySlug =
    async (
        slug: string
    ): Promise<Project> => {

        const response =
            await fetch(
                `${API_BASE_URL}/projects/${slug}`
            );


        if (!response.ok) {
            throw new Error(
                'Project not found'
            );
        }


        const result:
            ProjectResponse =
                await response.json();


        if (!result.success) {
            throw new Error(
                'Project not found'
            );
        }


        return mapProject(
            result.data
        );
    };