import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import inquiryRoutes from './routes/inquiryRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import projectRoutes from "./routes/projectRoutes.js";
import Review from './models/Review.js';
import SiteSetting from './models/SiteSetting.js';

import {
    notFound,
    errorHandler,
} from './middleware/errorHandler.js';

import {
    apiLimiter,
} from './middleware/rateLimiter.js';

const app = express();

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

const uploadsDirectory = path.join(
    currentDirectory,
    '../uploads'
);

app.set('trust proxy', 1);

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: 'cross-origin',
        },
    })
);

const allowedOrigins = (
    process.env.CLIENT_ORIGIN || ''
)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.length === 0 ||
                allowedOrigins.includes(origin)
            ) {
                return callback(null, true);
            }

            return callback(
                new Error(
                    `CORS blocked for origin: ${origin}`
                )
            );
        },

        credentials: true,
    })
);

app.use(
    express.json({
        limit: '1mb',
    })
);

app.use(
    express.urlencoded({
        extended: true,
    })
);

// Uploaded images and videos public access
app.use(
    '/uploads',
    express.static(uploadsDirectory)
);

if (process.env.NODE_ENV !== 'test') {
    app.use(
        morgan(
            process.env.NODE_ENV === 'production'
                ? 'combined'
                : 'dev'
        )
    );
}

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// API health check
app.get('/api/health', (_req, res) => {
    res.json({
        success: true,
        message: 'DevForge API is running',
        time: new Date().toISOString(),
    });
});

// Main API routes
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use('/api/auth', authRoutes);

/*
 * Notification routeને generic /api/admin route પહેલાં રાખવો જરૂરી છે.
 */
app.use(
    '/api/admin/notifications',
    notificationRoutes
);

app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);

/*
 * Public website settings
 *
 * Used by:
 * Hero
 * About
 * Navbar
 * Contact
 * Footer
 */
app.get('/api/settings', async (_req, res, next) => {
    try {
        const data =
            await SiteSetting.findOneAndUpdate(
                {
                    key: 'main',
                },
                {
                    $setOnInsert: {
                        key: 'main',
                    },
                },
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            ).select('-__v');

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
});

// Public review submission
app.post('/api/reviews', async (req, res, next) => {
    try {
        const data = await Review.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Review submitted for approval',
            data,
        });
    } catch (error) {
        next(error);
    }
});

// Display approved reviews publicly
app.get('/api/reviews', async (_req, res, next) => {
    try {
        const data = await Review.find({
            status: 'approved',
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
});

app.use(notFound);
app.use(errorHandler);

export default app;