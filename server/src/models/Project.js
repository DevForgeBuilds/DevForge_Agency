import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        // =====================================================
        // BASIC PROJECT INFO
        // =====================================================

        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        client: {
            type: String,
            trim: true,
            default: "",
        },

        category: {
            type: String,
            trim: true,
            default: "",
        },

        year: {
            type: String,
            trim: true,
            default: "",
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        role: {
            type: String,
            trim: true,
            default: "",
        },

        duration: {
            type: String,
            trim: true,
            default: "",
        },


        // =====================================================
        // HERO / MEDIA
        // =====================================================

        image: {
            type: String,
            default: "",
        },

        video: {
            type: String,
            default: "",
        },

        gallery: [
            {
                id: {
                    type: String,
                    trim: true,
                },

                image: {
                    type: String,
                    default: "",
                },

                title: {
                    type: String,
                    trim: true,
                    default: "",
                },

                caption: {
                    type: String,
                    trim: true,
                    default: "",
                },
            },
        ],


        // =====================================================
        // LINKS
        // =====================================================

        projectUrl: {
            type: String,
            trim: true,
            default: "",
        },

        githubUrl: {
            type: String,
            trim: true,
            default: "",
        },


        // =====================================================
        // PROJECT STORY
        // =====================================================

        overview: {
            type: String,
            trim: true,
            default: "",
        },

        challenge: {
            type: String,
            trim: true,
            default: "",
        },


        // =====================================================
        // PROCESS
        // =====================================================

        process: [
            {
                number: {
                    type: String,
                    trim: true,
                    default: "",
                },

                title: {
                    type: String,
                    trim: true,
                    default: "",
                },

                description: {
                    type: String,
                    trim: true,
                    default: "",
                },
            },
        ],


        // =====================================================
        // TECHNOLOGIES
        // =====================================================

        technologies: [
            {
                name: {
                    type: String,
                    trim: true,
                    default: "",
                },

                category: {
                    type: String,
                    trim: true,
                    default: "",
                },

                icon: {
                    type: String,
                    trim: true,
                    default: "",
                },
            },
        ],


        // =====================================================
        // FEATURES
        // =====================================================

        features: [
            {
                number: {
                    type: String,
                    trim: true,
                    default: "",
                },

                title: {
                    type: String,
                    trim: true,
                    default: "",
                },

                description: {
                    type: String,
                    trim: true,
                    default: "",
                },
            },
        ],


        // =====================================================
        // OUTCOME / RESULTS
        // =====================================================

        results: [
            {
                value: {
                    type: String,
                    trim: true,
                    default: "",
                },

                label: {
                    type: String,
                    trim: true,
                    default: "",
                },

                description: {
                    type: String,
                    trim: true,
                    default: "",
                },
            },
        ],


        // =====================================================
        // CREDITS
        // =====================================================

        credits: [
            {
                role: {
                    type: String,
                    trim: true,
                    default: "",
                },

                name: {
                    type: String,
                    trim: true,
                    default: "",
                },
            },
        ],


        // =====================================================
        // ADMIN / PUBLISHING
        // =====================================================
        order: {
    type: Number,
    default: 0,
    min: 0,
},  

        featured: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: [
                "planning",
                "ongoing",
                "completed",
                "on-hold",
            ],
            default: "planning",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


// =============================================================
// INDEXES
// =============================================================

projectSchema.index({
    status: 1,
    createdAt: -1,
});

projectSchema.index({
    featured: 1,
    isActive: 1,
});


// =============================================================
// MODEL
// =============================================================

export default mongoose.model(
    "Project",
    projectSchema
);