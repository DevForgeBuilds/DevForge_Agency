import mongoose from 'mongoose';

const projectHistorySchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            default: null,
        },
        title: { type: String, required: true, trim: true },
        service: { type: String, default: '', trim: true },
        status: {
            type: String,
            enum: ['planning', 'ongoing', 'completed', 'on-hold', 'cancelled'],
            default: 'planning',
        },
        startDate: { type: Date, default: null },
        dueDate: { type: Date, default: null },
        completedAt: { type: Date, default: null },
        budget: { type: Number, min: 0, default: 0 },
        projectUrl: { type: String, default: '', trim: true },
        notes: { type: String, default: '', trim: true },
    },
    { timestamps: true }
);

const clientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        phone: { type: String, default: '', trim: true },
        company: { type: String, default: '', trim: true },

        // Current/main project (kept for compatibility with the existing admin UI)
        project: { type: String, default: '', trim: true },

        // Stores every past and current project belonging to this client
        projectHistory: {
            type: [projectHistorySchema],
            default: [],
        },

        status: {
            type: String,
            enum: ['lead', 'active', 'completed', 'inactive'],
            default: 'lead',
        },
        notes: { type: String, default: '', trim: true },
        followUpAt: { type: Date, default: null },
    },
    { timestamps: true }
);

clientSchema.index({ email: 1 });
clientSchema.index({ status: 1, followUpAt: 1 });

export default mongoose.model('Client', clientSchema);
