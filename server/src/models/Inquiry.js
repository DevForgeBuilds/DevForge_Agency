import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        company: {
            type: String,
            trim: true,
            default: "",
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please provide a valid email",
            ],
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            match: [
                /^\+?[0-9\s()-]{7,18}$/,
                "Please provide a valid phone number",
            ],
        },

        service: {
            type: String,
            required: [true, "Service is required"],
        },

        serviceOther: {
            type: String,
            trim: true,
            default: "",
        },

        timeline: {
            type: String,
            default: "",
        },

        website: {
            type: String,
            trim: true,
            default: "",
        },

        message: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "new",
                "contacted",
                "in-progress",
                "closed",
            ],
            default: "new",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },

        followUpAt: {
            type: Date,
            default: null,
        },

        meta: {
            ip: {
                type: String,
                default: "",
            },

            userAgent: {
                type: String,
                default: "",
            },
        },
    },
    {
        timestamps: true,
    }
);

inquirySchema.index({
    email: 1,
    createdAt: -1,
});

inquirySchema.index({
    phone: 1,
    createdAt: -1,
});

const Inquiry = mongoose.model(
    "Inquiry",
    inquirySchema
);

export default Inquiry;