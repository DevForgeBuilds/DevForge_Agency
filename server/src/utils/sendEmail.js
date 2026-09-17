import { getTransporter } from '../config/mailer.js';

const escapeHtml = (str = '') =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

/**
 * Sends the "new inquiry" notification to the studio inbox (ADMIN_EMAIL)
 * and a confirmation email to the person who submitted the form.
 * Silently no-ops (with a console warning) if SMTP isn't configured —
 * a missing/failing email should never block the API from saving the lead.
 */
export const sendInquiryEmails = async (inquiry) => {
    const transporter = getTransporter();

    if (!transporter) {
        return { adminSent: false, userSent: false, reason: 'SMTP not configured' };
    }

    const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER;
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    const rows = [
        ['Project ID', inquiry.projectId],
        ['Name', inquiry.name],
        ['Company', inquiry.company || '—'],
        ['Email', inquiry.email],
        ['Service', inquiry.service],
        ['Service (other)', inquiry.serviceOther || '—'],
        ['Timeline', inquiry.timeline || '—'],
        ['Existing website', inquiry.website || '—'],
    ]
        .map(
            ([label, value]) =>
                `<tr><td style="padding:6px 12px;color:#888;font-family:monospace;">${escapeHtml(
                    label
                )}</td><td style="padding:6px 12px;font-family:monospace;">${escapeHtml(
                    value
                )}</td></tr>`
        )
        .join('');

    const adminHtml = `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;">
            <h2 style="margin-bottom:4px;">New Project Inquiry — ${escapeHtml(
                inquiry.projectId
            )}</h2>
            <p style="color:#666;">A new lead came in through the DevForge contact form.</p>
            <table style="border-collapse:collapse;width:100%;margin:16px 0;">${rows}</table>
            <p style="font-family:monospace;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:6px;">${escapeHtml(
                inquiry.message || 'No message provided.'
            )}</p>
        </div>
    `;

    const userHtml = `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;">
            <h2>Thanks, ${escapeHtml(inquiry.name.split(' ')[0] || inquiry.name)} — we got your brief.</h2>
            <p style="color:#444;line-height:1.5;">
                Your project blueprint (<strong>${escapeHtml(
                    inquiry.projectId
                )}</strong>) has been received. Someone from the DevForge team
                will get back to you shortly to talk through next steps.
            </p>
            <p style="color:#888;font-size:13px;">— DevForge · Build / Code / Launch</p>
        </div>
    `;

    const results = await Promise.allSettled([
        transporter.sendMail({
            from: fromAddress,
            to: adminEmail,
            replyTo: inquiry.email,
            subject: `New Inquiry: ${inquiry.projectId} — ${inquiry.name}`,
            html: adminHtml,
        }),
        transporter.sendMail({
            from: fromAddress,
            to: inquiry.email,
            subject: `We received your project brief — ${inquiry.projectId}`,
            html: userHtml,
        }),
    ]);

    const [adminResult, userResult] = results;

    if (adminResult.status === 'rejected') {
        console.error('[Mailer] Failed to send admin notification:', adminResult.reason);
    }

    if (userResult.status === 'rejected') {
        console.error('[Mailer] Failed to send user confirmation:', userResult.reason);
    }

    return {
        adminSent: adminResult.status === 'fulfilled',
        userSent: userResult.status === 'fulfilled',
    };
};
