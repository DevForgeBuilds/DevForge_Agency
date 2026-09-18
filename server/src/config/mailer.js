import nodemailer from 'nodemailer';

let transporter = null;

/**
 * Lazily creates (and caches) the SMTP transporter.
 * Returns null if SMTP env vars are not configured.
 */
export const getTransporter = () => {
    if (transporter) {
        return transporter;
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.warn(
            '[Mailer] SMTP env vars missing — emails will be skipped. See .env.example'
        );
        return null;
    }

    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    return transporter;
};

export const verifyMailer = async () => {
    const t = getTransporter();

    if (!t) return false;

    try {
        await t.verify();
        console.log('[Mailer] SMTP connection verified ✔');
        return true;
    } catch (error) {
        console.error(
            '[Mailer] SMTP verification failed:',
            error.message
        );
        return false;
    }
};