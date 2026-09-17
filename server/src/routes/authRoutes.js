import { Router } from 'express';

import {
    login,
    verifyLoginOtp,
    resendLoginOtp,
    getMe,
    forgotPassword,
    resetPassword,
} from '../controllers/authController.js';

import {
    protect,
} from '../middleware/auth.js';

import {
    loginLimiter,
} from '../middleware/rateLimiter.js';

const router = Router();

// Email + password check કરીને OTP મોકલે
router.post(
    '/login',
    loginLimiter,
    login
);

// Login OTP verify કરે
router.post(
    '/verify-login-otp',
    loginLimiter,
    verifyLoginOtp
);

// નવો OTP ફરી emailમાં મોકલે
router.post(
    '/resend-login-otp',
    loginLimiter,
    resendLoginOtp
);

// Forgot-password email મોકલે
router.post(
    '/forgot-password',
    loginLimiter,
    forgotPassword
);

// નવો password set કરે
router.post(
    '/reset-password/:token',
    loginLimiter,
    resetPassword
);

// Logged-in admin details
router.get(
    '/me',
    protect,
    getMe
);

export default router;