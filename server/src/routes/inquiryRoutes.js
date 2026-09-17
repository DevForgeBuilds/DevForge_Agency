import { Router } from 'express';
import { body } from 'express-validator';

import {
    createInquiry,
    getInquiries,
    getInquiryById,
    updateInquiryStatus,
    deleteInquiry,
} from '../controllers/inquiryController.js';

import { protect } from '../middleware/auth.js';
import { activityLogger } from '../middleware/activityLogger.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const inquiryValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^\+?[0-9\s()-]{7,18}$/)
        .withMessage('A valid phone number is required'),
    body('service').trim().notEmpty().withMessage('Service is required'),
    body('company').optional().trim(),
    body('serviceOther').optional().trim(),
    body('timeline').optional().trim(),
    body('website').optional().trim(),
    body('message')
        .optional()
        .trim()
        .isLength({ max: 5000 })
        .withMessage('Message cannot exceed 5000 characters'),
];

// Public contact form — public submissions are not admin activity.
router.post('/', inquiryLimiter, inquiryValidation, createInquiry);

// Admin-only routes
router.get('/', protect, getInquiries);
router.get('/:id', protect, getInquiryById);
router.patch('/:id', protect, activityLogger, updateInquiryStatus);
router.delete('/:id', protect, activityLogger, deleteInquiry);

export default router;
