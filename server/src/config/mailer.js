// // import nodemailer from 'nodemailer';

// // let transporter = null;

// // /**
// //  * Lazily creates (and caches) the SMTP transporter.
// //  * Returns null if SMTP env vars are not configured, so the rest of the
// //  * app keeps working (just logs a warning + skips email) even without
// //  * SMTP set up yet.
// //  */
// // export const getTransporter = () => {
// //     if (transporter) {
// //         return transporter;
// //     }

// //     const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

// //     if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
// //         console.warn(
// //             '[Mailer] SMTP env vars missing — emails will be skipped. See .env.example'
// //         );
// //         return null;
// //     }

// //     transporter = nodemailer.createTransport({
// //         host: SMTP_HOST,
// //         port: Number(SMTP_PORT) || 587,
// //         secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587 (STARTTLS)
// //         auth: {
// //             user: SMTP_USER,
// //             pass: SMTP_PASS,
// //         },
// //     });

// //     return transporter;
// // };

// // export const verifyMailer = async () => {
// //     const t = getTransporter();

// //     if (!t) return false;

// //     try {
// //         await t.verify();
// //         console.log('[Mailer] SMTP connection verified ✔');
// //         return true;
// //     } catch (error) {
// //         console.error('[Mailer] SMTP verification failed:', error.message);
// //         return false;
// //     }
// // };
// let transporter = null;

// /**
//  * Resend API based mailer.
//  * Uses HTTPS instead of SMTP, so it works on Render Free.
//  */
// export const getTransporter = () => {
//     if (transporter) {
//         return transporter;
//     }

//     const { RESEND_API_KEY } = process.env;

//     if (!RESEND_API_KEY) {
//         console.warn(
//             '[Mailer] RESEND_API_KEY missing — emails will be skipped.'
//         );
//         return null;
//     }

//     transporter = {
//         sendMail: async ({ from, to, replyTo, subject, html }) => {
//             const response = await fetch('https://api.resend.com/emails', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${RESEND_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     from,
//                     to: Array.isArray(to) ? to : [to],
//                     reply_to: replyTo,
//                     subject,
//                     html,
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(
//                     data?.message ||
//                         data?.error ||
//                         'Resend email request failed'
//                 );
//             }

//             return data;
//         },
//     };

//     return transporter;
// };

// export const verifyMailer = async () => {
//     const apiKey = process.env.RESEND_API_KEY;

//     if (!apiKey) {
//         console.warn('[Mailer] RESEND_API_KEY missing.');
//         return false;
//     }

//     try {
//         const response = await fetch('https://api.resend.com/domains', {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${apiKey}`,
//             },
//         });

//         if (!response.ok) {
//             const data = await response.json().catch(() => ({}));
//             throw new Error(
//                 data?.message || 'Resend API verification failed'
//             );
//         }

//         console.log('[Mailer] Resend API connection verified ✔');
//         return true;
//     } catch (error) {
//         console.error(
//             '[Mailer] Resend verification failed:',
//             error.message
//         );
//         return false;
//     }
// };
let transporter = null;

/**
 * Resend API based mailer.
 * Uses HTTPS instead of SMTP, so it works on Render Free.
 */
export const getTransporter = () => {
    if (transporter) {
        return transporter;
    }

    const { RESEND_API_KEY } = process.env;

    if (!RESEND_API_KEY) {
        console.warn(
            '[Mailer] RESEND_API_KEY missing — emails will be skipped.'
        );
        return null;
    }

    transporter = {
        sendMail: async ({ from, to, replyTo, subject, html }) => {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from,
                    to: Array.isArray(to) ? to : [to],
                    reply_to: replyTo,
                    subject,
                    html,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        data?.error ||
                        'Resend email request failed'
                );
            }

            return data;
        },
    };

    return transporter;
};

export const verifyMailer = async () => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[Mailer] RESEND_API_KEY missing.');
        return false;
    }

    console.log('[Mailer] Resend API configured ✔');
    return true;
};