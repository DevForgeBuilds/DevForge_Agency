import ActivityLog from '../models/ActivityLog.js';

const ACTION_BY_METHOD = {
    POST: 'created',
    PUT: 'updated',
    PATCH: 'updated',
    DELETE: 'deleted',
};

const getResource = (req) => {
    const parts = req.baseUrl
        .replace(/^\/api\/?/, '')
        .split('/')
        .concat(req.path.split('/'))
        .filter(Boolean);

    if (parts[0] === 'admin') return parts[1] || 'admin';
    return parts[0] || 'unknown';
};

const getResourceId = (req) =>
    String(
        req.params.projectId ||
        req.params.id ||
        req.params.clientId ||
        ''
    );

/**
 * Place this middleware immediately after `protect` on protected routes.
 * It records successful POST, PUT, PATCH and DELETE requests after the
 * response finishes. Passwords and request values are never stored.
 */
export const activityLogger = (req, res, next) => {
    const defaultAction = ACTION_BY_METHOD[req.method];

    if (!defaultAction || !req.admin) {
        return next();
    }

    res.on('finish', () => {
        if (res.statusCode < 200 || res.statusCode >= 400) return;

        const resource = req.activityResource || getResource(req);
        const action = req.activityAction || `${resource}.${defaultAction}`;
        const unsafeFields = new Set([
            'password',
            'currentPassword',
            'newPassword',
            'confirmPassword',
            'token',
        ]);

        const changedFields = Object.keys(req.body || {})
            .filter((field) => !unsafeFields.has(field))
            .slice(0, 30);

        ActivityLog.create({
            admin: req.admin._id,
            adminName: req.admin.name,
            adminEmail: req.admin.email,
            action,
            method: req.method,
            path: `${req.baseUrl}${req.path}`,
            resource,
            resourceId: getResourceId(req),
            statusCode: res.statusCode,
            ip: req.ip || '',
            userAgent: req.headers['user-agent'] || '',
            details: {
                status: typeof req.body?.status === 'string' ? req.body.status : '',
                changedFields,
            },
        }).catch((error) => {
            console.error('[ActivityLog] Could not save activity:', error.message);
        });
    });

    next();
};
