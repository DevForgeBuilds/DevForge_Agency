import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
            index: true,
        },
        adminName: { type: String, default: 'Admin', trim: true },
        adminEmail: { type: String, default: '', trim: true, lowercase: true },
        action: { type: String, required: true, trim: true, index: true },
        method: { type: String, required: true, uppercase: true },
        path: { type: String, required: true },
        resource: { type: String, default: '', trim: true, index: true },
        resourceId: { type: String, default: '', trim: true },
        statusCode: { type: Number, required: true },
        ip: { type: String, default: '' },
        userAgent: { type: String, default: '' },
        details: {
            status: { type: String, default: '' },
            changedFields: { type: [String], default: [] },
        },
    },
    { timestamps: true }
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ admin: 1, createdAt: -1 });
activityLogSchema.index({ resource: 1, createdAt: -1 });

export default mongoose.model('ActivityLog', activityLogSchema);
