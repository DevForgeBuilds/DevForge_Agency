import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { protect } from '../middleware/auth.js';
import { activityLogger } from '../middleware/activityLogger.js';

const router = Router();
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
const uploadDirectory = path.join(currentDirectory, '../../uploads');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadDirectory),
    filename: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const safeName = path
            .basename(file.originalname, extension)
            .replace(/[^a-zA-Z0-9-_]/g, '-')
            .toLowerCase();

        callback(null, `${Date.now()}-${safeName}${extension}`);
    },
});

const imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const adminTypes = [
    ...imageTypes,
    'image/gif',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/quicktime',
];

const createUploader = (allowedTypes, fileSize) =>
    multer({
        storage,
        limits: { fileSize },
        fileFilter: (_req, file, callback) => {
            if (allowedTypes.includes(file.mimetype)) callback(null, true);
            else callback(new Error('This file type is not allowed'));
        },
    });

const reviewUpload = createUploader(imageTypes, 5 * 1024 * 1024);
const adminUpload = createUploader(adminTypes, 100 * 1024 * 1024);

const sendUploadResponse = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'Please select a file',
        });
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        url,
        data: {
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            url,
        },
    });
};

// Public client-review photo upload. Images only, maximum 5 MB.
router.post('/review', reviewUpload.single('file'), sendUploadResponse);

// Protected admin image/video upload. Successful uploads are logged.
router.post(
    '/',
    protect,
    activityLogger,
    adminUpload.single('file'),
    sendUploadResponse
);

export default router;
