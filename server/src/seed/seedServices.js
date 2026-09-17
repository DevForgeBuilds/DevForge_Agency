import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';
import Service from '../models/Service.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
    await connectDB();

    const filePath = path.join(__dirname, 'services.json');
    const services = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    console.log(`[Seed] Loaded ${services.length} services from services.json`);

    let created = 0;
    let updated = 0;

    for (const service of services) {
        const result = await Service.findOneAndUpdate(
            { key: service.key },
            { $set: service },
            { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
        );

        if (result.createdAt.getTime() === result.updatedAt.getTime()) {
            created += 1;
        } else {
            updated += 1;
        }
    }

    console.log(`[Seed] Done. Created: ${created}, Updated: ${updated}`);
    process.exit(0);
};

run().catch((err) => {
    console.error('[Seed] Failed:', err);
    process.exit(1);
});
