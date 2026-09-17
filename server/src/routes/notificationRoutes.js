import { Router } from 'express';

import { protect } from '../middleware/auth.js';

import {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    deleteReadNotifications,
} from '../controllers/notificationController.js';

const router = Router();

// All notification routes require admin login
router.use(protect);

// Get notifications
router.get('/', getNotifications);

// આ specific routes /:id route પહેલાં રાખવા જરૂરી છે
router.patch('/read-all', markAllNotificationsRead);
router.delete('/read/all', deleteReadNotifications);

// Single notification actions
router.patch('/:id/read', markNotificationRead);
router.delete('/:id', deleteNotification);

export default router;