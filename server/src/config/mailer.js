
import { Resend } from 'resend';

let mailer = null;

/**
 * Lazily creates and caches a Resend-compatible mailer.
 * Returns null when required environment variables are missing.
 */
export const getTransporter = () => {
    if (mailer) {
        return mailer;
    }

    const { RESEND_API_KEY, ADMIN_EMAIL, EMAIL_FROM } = process.env;

    if (!RESEND_API_KEY || !ADMIN_EMAIL || !EMAIL_FROM) {
        console.warn(
            '[Mailer] Resend env vars missing - emails will be skipped.'
        );
        return null;
    }

    const resend = new Resend(RESEND_API_KEY);

    mailer = {
        sendMail: async ({
            from,
            to,
            subject,
            html,
            text,
            replyTo,
        }) => {
            const { data, error } = await resend.emails.send({
                from: from || EMAIL_FROM,
                to: Array.isArray(to) ? to : [to || ADMIN_EMAIL],
                subject,
                html,
                text,
                replyTo,
            });

            if (error) {
                throw new Error(error.message || 'Resend email failed');
            }

            return data;
        },
    };

    return mailer;
};

/**
 * Resend uses an HTTPS API, so no SMTP connection verification is required.
 */
export const verifyMailer = async () => {
    const configured =
        Boolean(process.env.RESEND_API_KEY) &&
        Boolean(process.env.ADMIN_EMAIL) &&
        Boolean(process.env.EMAIL_FROM);

    if (!configured) {
        console.warn(
            '[Mailer] Resend env vars missing - emails will be skipped.'
        );
        return false;
    }

    console.log('[Mailer] Resend API configured');
    return true;
};