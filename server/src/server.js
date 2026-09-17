import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import { verifyMailer } from './config/mailer.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
    await connectDB();
    await verifyMailer(); // logs a warning if SMTP isn't configured, doesn't block startup

    const server = app.listen(PORT, () => {
        console.log(`[Server] DevForge API running on http://localhost:${PORT}`);
        console.log(`[Server] Env: ${process.env.NODE_ENV || 'development'}`);
    });

    process.on('unhandledRejection', (err) => {
        console.error('[Fatal] Unhandled rejection:', err);
        server.close(() => process.exit(1));
    });
};

start();
