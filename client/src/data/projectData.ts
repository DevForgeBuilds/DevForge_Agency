import type { Project } from '../types/project';


/* ============================================================
   DEVFORGE — PROJECT DATA
   TEMPORARY DEMO DATA
============================================================ */

export const projects: Project[] = [

    /* ========================================================
       PROJECT 001 — NEXORA
    ======================================================== */

    {
        id: '001',

        title: 'NEXORA',

        slug: 'nexora',

        description:
            'A modern digital platform designed to simplify property management through a clean interface, intuitive workflows and a scalable technical foundation.',

        category: 'WEB DEVELOPMENT',

        year: 2026,

        client: 'NEXORA',

        role: 'DESIGN + DEVELOPMENT',

        duration: '8 WEEKS',

        coverImage:
            'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=2200&q=85',

        liveUrl:
            'https://nexora.example.com',

        githubUrl:
            'https://github.com/devforge/nexora',

        overview:
            'Nexora is a modern property management platform focused on making complex workflows simple, fast and accessible. The experience combines a structured dashboard with a responsive interface designed for everyday use.',

        challenge:
            'The existing workflow was difficult to navigate and required users to move between multiple disconnected interfaces. The goal was to create one clear digital experience that reduced complexity while remaining flexible enough to scale with the product.',

        process: [

            {
                number: '01',
                title: 'DISCOVER',
                description:
                    'Understand the product, users, requirements and the problems that need to be solved.',
            },

            {
                number: '02',
                title: 'DESIGN',
                description:
                    'Create the visual direction, interface system and user experience around the product goals.',
            },

            {
                number: '03',
                title: 'DEVELOP',
                description:
                    'Turn the approved experience into a responsive and scalable digital product.',
            },

            {
                number: '04',
                title: 'REFINE',
                description:
                    'Test interactions, improve performance and polish the smallest details.',
            },

            {
                number: '05',
                title: 'LAUNCH',
                description:
                    'Prepare the final product for deployment and deliver a production-ready experience.',
            },

        ],

        screenshots: [

            {
                id: 'nexora-01',

                image:
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2200&q=85',

                title:
                    'MAIN DASHBOARD',

                caption:
                    'A clean overview of the core property management workflow.',
            },

            {
                id: 'nexora-02',

                image:
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=85',

                title:
                    'PROPERTY VIEW',

                caption:
                    'Detailed property information organised into a focused interface.',
            },

            {
                id: 'nexora-03',

                image:
                    'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=2200&q=85',

                title:
                    'ANALYTICS',

                caption:
                    'Clear data visualisation designed for faster decision making.',
            },

            {
                id: 'nexora-04',

                image:
                    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2200&q=85',

                title:
                    'MOBILE EXPERIENCE',

                caption:
                    'A responsive experience adapted for smaller screens.',
            },

        ],

        technologies: [

            {
                name: 'React',
                category: 'FRONTEND',
            },

            {
                name: 'TypeScript',
                category: 'LANGUAGE',
            },

            {
                name: 'Vite',
                category: 'BUILD TOOL',
            },

            {
                name: 'Node.js',
                category: 'BACKEND',
            },

            {
                name: 'MongoDB',
                category: 'DATABASE',
            },

            {
                name: 'GSAP',
                category: 'MOTION',
            },

            {
                name: 'Figma',
                category: 'DESIGN',
            },

            {
                name: 'Vercel',
                category: 'DEPLOYMENT',
            },

        ],

        features: [

            {
                number: '01',
                title: 'RESPONSIVE EXPERIENCE',
                description:
                    'The interface adapts across desktop, tablet and mobile devices without compromising usability.',
            },

            {
                number: '02',
                title: 'DASHBOARD SYSTEM',
                description:
                    'A structured dashboard brings important information and actions into one central workspace.',
            },

            {
                number: '03',
                title: 'DATA VISUALISATION',
                description:
                    'Important information is presented through clear visual patterns that make complex data easier to understand.',
            },

            {
                number: '04',
                title: 'SMOOTH INTERACTIONS',
                description:
                    'Thoughtful motion and micro-interactions make the experience feel responsive without becoming distracting.',
            },

            {
                number: '05',
                title: 'SCALABLE ARCHITECTURE',
                description:
                    'The product foundation is structured to support additional features and future growth.',
            },

        ],

        results: [

            {
                value: '01',
                label: 'UNIFIED EXPERIENCE',
                description:
                    'Multiple workflows brought together into one focused interface.',
            },

            {
                value: '02',
                label: 'RESPONSIVE',
                description:
                    'Designed to work consistently across modern screen sizes.',
            },

            {
                value: '03',
                label: 'SCALABLE',
                description:
                    'Built with a foundation ready for future product expansion.',
            },

        ],

        credits: [

            {
                role: 'DESIGN',
                name: 'DEVFORGE',
            },

            {
                role: 'DEVELOPMENT',
                name: 'DEVFORGE',
            },

            {
                role: 'CLIENT',
                name: 'NEXORA',
            },

        ],

        published: true,
    },


    /* ========================================================
       PROJECT 002 — AURORA
    ======================================================== */

    {
        id: '002',

        title: 'AURORA',

        slug: 'aurora',

        description:
            'A premium digital experience created for a next-generation creative brand with a strong visual identity and immersive interactions.',

        category: 'DIGITAL EXPERIENCE',

        year: 2026,

        client: 'AURORA',

        role: 'DESIGN + DEVELOPMENT',

        duration: '6 WEEKS',

        coverImage:
            'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=2200&q=85',

        liveUrl:
            'https://aurora.example.com',

        githubUrl:
            'https://github.com/devforge/aurora',

        overview:
            'Aurora is a visual-first digital experience designed around strong typography, immersive imagery and carefully controlled motion.',

        challenge:
            'The challenge was to create a memorable experience without sacrificing clarity, performance or usability.',

        process: [

            {
                number: '01',
                title: 'RESEARCH',
                description:
                    'Define the visual language, audience and experience goals.',
            },

            {
                number: '02',
                title: 'DIRECTION',
                description:
                    'Establish the typography, layout system and art direction.',
            },

            {
                number: '03',
                title: 'BUILD',
                description:
                    'Translate the visual system into a responsive digital experience.',
            },

            {
                number: '04',
                title: 'MOTION',
                description:
                    'Introduce purposeful transitions and interaction details.',
            },

            {
                number: '05',
                title: 'LAUNCH',
                description:
                    'Optimise, test and prepare the final experience for production.',
            },

        ],

        screenshots: [

            {
                id: 'aurora-01',

                image:
                    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85',

                title:
                    'LANDING EXPERIENCE',

                caption:
                    'An immersive landing experience built around bold visual composition.',
            },

            {
                id: 'aurora-02',

                image:
                    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=2200&q=85',

                title:
                    'EDITORIAL SYSTEM',

                caption:
                    'A flexible editorial layout designed for visual storytelling.',
            },

            {
                id: 'aurora-03',

                image:
                    'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2200&q=85',

                title:
                    'WORKSPACE',

                caption:
                    'A refined workspace interface balancing information and visual hierarchy.',
            },

            {
                id: 'aurora-04',

                image:
                    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2200&q=85',

                title:
                    'RESPONSIVE VIEW',

                caption:
                    'The experience adapted across smaller screens.',
            },

        ],

        technologies: [

            {
                name: 'React',
                category: 'FRONTEND',
            },

            {
                name: 'TypeScript',
                category: 'LANGUAGE',
            },

            {
                name: 'GSAP',
                category: 'MOTION',
            },

            {
                name: 'Vite',
                category: 'BUILD TOOL',
            },

            {
                name: 'Figma',
                category: 'DESIGN',
            },

            {
                name: 'Vercel',
                category: 'DEPLOYMENT',
            },

        ],

        features: [

            {
                number: '01',
                title: 'IMMERSIVE VISUALS',
                description:
                    'Large-scale imagery and typography create a strong visual identity.',
            },

            {
                number: '02',
                title: 'EDITORIAL LAYOUT',
                description:
                    'A flexible composition system supports different types of content.',
            },

            {
                number: '03',
                title: 'MOTION SYSTEM',
                description:
                    'Purposeful transitions create continuity throughout the experience.',
            },

            {
                number: '04',
                title: 'RESPONSIVE DESIGN',
                description:
                    'The experience remains consistent across different screen sizes.',
            },

        ],

        results: [

            {
                value: '01',
                label: 'STRONGER IDENTITY',
                description:
                    'A distinct visual system created around the brand direction.',
            },

            {
                value: '02',
                label: 'ENGAGEMENT',
                description:
                    'Motion and visual storytelling create a more engaging experience.',
            },

            {
                value: '03',
                label: 'RESPONSIVE',
                description:
                    'A consistent experience across desktop and mobile.',
            },

        ],

        credits: [

            {
                role: 'DESIGN',
                name: 'DEVFORGE',
            },

            {
                role: 'DEVELOPMENT',
                name: 'DEVFORGE',
            },

            {
                role: 'CLIENT',
                name: 'AURORA',
            },

        ],

        published: true,
    },


    /* ========================================================
       PROJECT 003 — VANTA
    ======================================================== */

    {
        id: '003',

        title: 'VANTA',

        slug: 'vanta',

        description:
            'A dark, modern product interface designed to present complex digital tools through a focused and highly structured experience.',

        category: 'PRODUCT DESIGN',

        year: 2026,

        client: 'VANTA',

        role: 'UI + DEVELOPMENT',

        duration: '7 WEEKS',

        coverImage:
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2200&q=85',

        liveUrl:
            'https://vanta.example.com',

        githubUrl:
            'https://github.com/devforge/vanta',

        overview:
            'Vanta is a modern product interface concept focused on clarity, productivity and a strong digital-first visual language.',

        challenge:
            'The product contained a large amount of information that needed to remain accessible without overwhelming the user.',

        process: [

            {
                number: '01',
                title: 'MAP',
                description:
                    'Map the product structure, information architecture and user flows.',
            },

            {
                number: '02',
                title: 'SYSTEM',
                description:
                    'Build a reusable interface and component system.',
            },

            {
                number: '03',
                title: 'INTERFACE',
                description:
                    'Create focused screens with clear hierarchy and interaction patterns.',
            },

            {
                number: '04',
                title: 'MOTION',
                description:
                    'Add subtle feedback and transitions to improve usability.',
            },

            {
                number: '05',
                title: 'SHIP',
                description:
                    'Optimise the product and prepare the final production build.',
            },

        ],

        screenshots: [

            {
                id: 'vanta-01',

                image:
                    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=2200&q=85',

                title:
                    'PRODUCT DASHBOARD',

                caption:
                    'A focused dashboard designed around important product information.',
            },

            {
                id: 'vanta-02',

                image:
                    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2200&q=85',

                title:
                    'TEAM WORKSPACE',

                caption:
                    'A collaborative workspace designed for modern product teams.',
            },

            {
                id: 'vanta-03',

                image:
                    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85',

                title:
                    'PROJECT VIEW',

                caption:
                    'Project information presented through a clean structured interface.',
            },

            {
                id: 'vanta-04',

                image:
                    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=85',

                title:
                    'TEAM EXPERIENCE',

                caption:
                    'A responsive interface designed for collaborative workflows.',
            },

        ],

        technologies: [

            {
                name: 'React',
                category: 'FRONTEND',
            },

            {
                name: 'TypeScript',
                category: 'LANGUAGE',
            },

            {
                name: 'Node.js',
                category: 'BACKEND',
            },

            {
                name: 'MongoDB',
                category: 'DATABASE',
            },

            {
                name: 'GSAP',
                category: 'MOTION',
            },

            {
                name: 'Figma',
                category: 'DESIGN',
            },

        ],

        features: [

            {
                number: '01',
                title: 'MODULAR UI',
                description:
                    'Reusable interface patterns keep the product consistent and scalable.',
            },

            {
                number: '02',
                title: 'DASHBOARD',
                description:
                    'Important product information is organised into a focused workspace.',
            },

            {
                number: '03',
                title: 'COLLABORATION',
                description:
                    'Core workflows are structured around modern team collaboration.',
            },

            {
                number: '04',
                title: 'RESPONSIVE',
                description:
                    'The product adapts across desktop, tablet and mobile.',
            },

        ],

        results: [

            {
                value: '01',
                label: 'SIMPLIFIED',
                description:
                    'Complex product information presented through a clearer interface.',
            },

            {
                value: '02',
                label: 'MODULAR',
                description:
                    'A reusable foundation designed for future product expansion.',
            },

            {
                value: '03',
                label: 'FAST',
                description:
                    'A lightweight experience focused on performance and usability.',
            },

        ],

        credits: [

            {
                role: 'DESIGN',
                name: 'DEVFORGE',
            },

            {
                role: 'DEVELOPMENT',
                name: 'DEVFORGE',
            },

            {
                role: 'CLIENT',
                name: 'VANTA',
            },

        ],

        published: true,
    },

];