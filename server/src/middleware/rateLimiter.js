import rateLimit from 'express-rate-limit';

// Applies to the whole API — generous, just to blunt abuse
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
});

// Stricter limit specifically on the public contact form, to stop spam bots
export const inquiryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message:
            'Too many inquiries submitted from this device. Please try again later or email us directly.',
    },
});

// Auth login — stop brute-force password guessing
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again later.',
    },
});
