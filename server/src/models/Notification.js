import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: [
                'inquiry',
                'review',
                'follow-up',
                'project',
                'system',
            ],
            default: 'system',
        },

        resource: {
            type: String,
            enum: [
                'inquiries',
                'reviews',
                'clients',
                'projects',
                'services',
                'system',
            ],
            default: 'system',
        },

        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        link: {
            type: String,
            default: '',
            trim: true,
        },

        isRead: {
            type: Boolean,
            default: false,
            index: true,
        },

        readAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

notificationSchema.index({
    isRead: 1,
    createdAt: -1,
});

const Notification = mongoose.model(
    'Notification',
    notificationSchema
);

export default Notification;