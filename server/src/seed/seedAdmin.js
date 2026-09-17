import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';

const run = async () => {
    await connectDB();

    const email = process.env.ADMIN_SEED_EMAIL;
    const password = process.env.ADMIN_SEED_PASSWORD;

    if (!email || !password) {
        console.error(
            '[Seed] Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in .env before running this.'
        );
        process.exit(1);
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });

    if (existing) {
        console.log(`[Seed] Admin already exists: ${email}`);
        process.exit(0);
    }

    await Admin.create({ email, password, name: 'Admin' });

    console.log(`[Seed] Admin created: ${email}`);
    console.log('[Seed] You can now log in via POST /api/auth/login');
    process.exit(0);
};

run().catch((err) => {
    console.error('[Seed] Failed:', err);
    process.exit(1);
});
