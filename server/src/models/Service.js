import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        number: {
            type: String,
            default: "",
        },

        order: {
            type: Number,
            default: 0,
            min: 0,
            index: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        shortTitle: {
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

        icon: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        video: {
            type: String,
            default: "",
        },

        heroMeta: [String],

        statement: {
            eyebrow: {
                type: String,
                default: "",
            },

            title: {
                type: String,
                default: "",
            },

            emphasis: {
                type: String,
                default: "",
            },
        },

        capabilities: {
            title: {
                type: String,
                default: "",
            },

            description: {
                type: String,
                default: "",
            },

            items: [String],
        },

        process: [
            {
                number: String,
                title: String,
                description: String,
                _id: false,
            },
        ],

        experience: {
            eyebrow: {
                type: String,
                default: "",
            },

            title: {
                type: String,
                default: "",
            },

            description: {
                type: String,
                default: "",
            },
        },

        toolchain: [
            {
                category: String,
                tools: [String],
                _id: false,
            },
        ],

        deliverables: [String],

        engagement: {
            title: {
                type: String,
                default: "",
            },

            description: {
                type: String,
                default: "",
            },
        },

        relatedWork: [
            {
                title: String,
                category: String,
                description: String,
                _id: false,
            },
        ],

        faq: [
            {
                question: String,
                answer: String,
                _id: false,
            },
        ],

        cta: {
            eyebrow: {
                type: String,
                default: "",
            },

            title: {
                type: String,
                default: "",
            },

            description: {
                type: String,
                default: "",
            },
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

serviceSchema.index({
    order: 1,
    createdAt: 1,
});

const Service = mongoose.model(
    "Service",
    serviceSchema
);

export default Service;