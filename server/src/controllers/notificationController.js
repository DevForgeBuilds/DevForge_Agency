import Notification from '../models/Notification.js';
import asyncHandler from '../middleware/asyncHandler.js';

// GET /api/admin/notifications
export const getNotifications = asyncHandler(async (req, res) => {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
        Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
        100
    );
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.unread === 'true') {
        filter.isRead = false;
    }

    if (req.query.type) {
        filter.type = req.query.type;
    }

    const [notifications, total, unreadCount] = await Promise.all([
        Notification.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Notification.countDocuments(filter),

        Notification.countDocuments({
            isRead: false,
        }),
    ]);

    res.json({
        success: true,
        count: notifications.length,
        total,
        unreadCount,
        page,
        pages: Math.ceil(total / limit),
        data: notifications,
    });
});

// PATCH /api/admin/notifications/:id/read
export const markNotificationRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        {
            isRead: true,
            readAt: new Date(),
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification not found',
        });
    }

    res.json({
        success: true,
        data: notification,
    });
});

// PATCH /api/admin/notifications/read-all
export const markAllNotificationsRead = asyncHandler(async (_req, res) => {
    const result = await Notification.updateMany(
        {
            isRead: false,
        },
        {
            $set: {
                isRead: true,
                readAt: new Date(),
            },
        }
    );

    res.json({
        success: true,
        message: 'All notifications marked as read',
        modifiedCount: result.modifiedCount,
    });
});

// DELETE /api/admin/notifications/:id
export const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findByIdAndDelete(
        req.params.id
    );

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification not found',
        });
    }

    res.json({
        success: true,
        message: 'Notification deleted',
    });
});

// DELETE /api/admin/notifications/read/all
export const deleteReadNotifications = asyncHandler(async (_req, res) => {
    const result = await Notification.deleteMany({
        isRead: true,
    });

    res.json({
        success: true,
        message: 'Read notifications deleted',
        deletedCount: result.deletedCount,
    });
});