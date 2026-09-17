import Admin from '../models/Admin.js';
import Inquiry from '../models/Inquiry.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Review from '../models/Review.js';
import Client from '../models/Client.js';
import SiteSetting from '../models/SiteSetting.js';
import ActivityLog from '../models/ActivityLog.js';
import asyncHandler from '../middleware/asyncHandler.js';

const MODELS = { services: Service, projects: Project, reviews: Review, clients: Client };

const requireSuperAdmin = (req, res) => {
    if (req.admin?.role !== 'super-admin') {
        res.status(403).json({
            success: false,
            message: 'Only a Super Admin can manage admin accounts',
        });
        return false;
    }
    return true;
};

export const dashboard = asyncHandler(async (_req, res) => {
    const [inquiries, newLeads, projects, ongoingProjects, completedProjects, services, reviews, clients, recent, monthlyRaw] = await Promise.all([
        Inquiry.countDocuments(), Inquiry.countDocuments({ status: 'new' }), Project.countDocuments(),
        Project.countDocuments({ status: 'ongoing' }), Project.countDocuments({ status: 'completed' }),
        Service.countDocuments(), Review.countDocuments({ status: 'pending' }), Client.countDocuments(),
        Inquiry.find().sort({ createdAt: -1 }).limit(5),
        Inquiry.aggregate([
            { $match: { createdAt: { $gte: new Date(Date.now() - 180 * 86400000) } } },
            { $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]),
    ]);

    const monthlyMap = new Map(monthlyRaw.map((item) => [item._id, item.count]));
    const monthly = Array.from({ length: 6 }, (_, index) => {
        const date = new Date();
        date.setUTCDate(1);
        date.setUTCMonth(date.getUTCMonth() - (5 - index));
        const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
        return { key, label: date.toLocaleString('en', { month: 'short', timeZone: 'UTC' }), count: monthlyMap.get(key) || 0 };
    });

    res.json({ success: true, data: { counts: { inquiries, newLeads, projects, ongoingProjects, completedProjects, services, pendingReviews: reviews, clients }, recent, monthly } });
});

export const listResource = asyncHandler(async (req, res) => {
    const Model = MODELS[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: 'Resource not found' });
    const sort =
    req.params.resource === 'projects' ||
    req.params.resource === 'services'
        ? { order: 1, createdAt: -1 }
        : { createdAt: -1 };

const data = await Model.find().sort(sort);
    res.json({ success: true, count: data.length, data });
});

export const createResource = asyncHandler(async (req, res) => {
    const Model = MODELS[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: 'Resource not found' });
    const data = await Model.create(req.body);
    res.status(201).json({ success: true, data });
});

export const updateResource = asyncHandler(async (req, res) => {
    const Model = MODELS[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: 'Resource not found' });
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data });
});

export const deleteResource = asyncHandler(async (req, res) => {
    const Model = MODELS[req.params.resource];
    if (!Model) return res.status(404).json({ success: false, message: 'Resource not found' });
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Deleted' });
});

// @route POST /api/admin/clients/:clientId/projects
export const addClientProject = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' });

    const { title, service, status, startDate, dueDate, completedAt, budget, projectUrl, notes, project } = req.body;
    if (!title?.trim()) return res.status(400).json({ success: false, message: 'Project title is required' });

    client.projectHistory.push({
        title: title.trim(), service, status, startDate: startDate || null,
        dueDate: dueDate || null, completedAt: completedAt || null,
        budget: budget === '' || budget === undefined ? 0 : Number(budget),
        projectUrl, notes, project: project || null,
    });
    await client.save();
    res.status(201).json({ success: true, data: client });
});

// @route PUT /api/admin/clients/:clientId/projects/:projectId
export const updateClientProject = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' });

    const projectItem = client.projectHistory.id(req.params.projectId);
    if (!projectItem) return res.status(404).json({ success: false, message: 'Project history item not found' });

    const allowedFields = ['title', 'service', 'status', 'startDate', 'dueDate', 'completedAt', 'budget', 'projectUrl', 'notes', 'project'];
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            if (['startDate', 'dueDate', 'completedAt', 'project'].includes(field)) projectItem[field] = req.body[field] || null;
            else if (field === 'budget') projectItem[field] = req.body[field] === '' ? 0 : Number(req.body[field]);
            else projectItem[field] = req.body[field];
        }
    }

    await client.save();
    res.json({ success: true, data: client });
});

// @route DELETE /api/admin/clients/:clientId/projects/:projectId
export const deleteClientProject = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' });

    const projectItem = client.projectHistory.id(req.params.projectId);
    if (!projectItem) return res.status(404).json({ success: false, message: 'Project history item not found' });

    projectItem.deleteOne();
    await client.save();
    res.json({ success: true, message: 'Project history deleted', data: client });
});

// @route GET /api/admin/admins
export const getAdmins = asyncHandler(async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;

    const data = await Admin.find()
        .select('name email phone role lastLogin createdAt updatedAt')
        .sort({ createdAt: -1 });

    res.json({ success: true, count: data.length, data });
});

// @route POST /api/admin/admins
export const createAdmin = asyncHandler(async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;

    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const phone = String(req.body.phone || '').trim();
    const role = req.body.role === 'super-admin' ? 'super-admin' : 'admin';

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Name, email and password are required',
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'Password must contain at least 8 characters',
        });
    }

    if (await Admin.exists({ email })) {
        return res.status(409).json({
            success: false,
            message: 'An admin with this email already exists',
        });
    }

    const admin = await Admin.create({ name, email, password, phone, role });

    res.status(201).json({
        success: true,
        data: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: admin.role,
            lastLogin: admin.lastLogin,
            createdAt: admin.createdAt,
        },
    });
});

// @route PUT /api/admin/admins/:id
export const updateAdmin = asyncHandler(async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;

    const admin = await Admin.findById(req.params.id).select('+password');
    if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (req.body.role && !['admin', 'super-admin'].includes(req.body.role)) {
        return res.status(400).json({ success: false, message: 'Invalid admin role' });
    }

    const isOwnAccount = String(admin._id) === String(req.admin._id);
    if (isOwnAccount && req.body.role && req.body.role !== admin.role) {
        return res.status(400).json({
            success: false,
            message: 'You cannot change your own role',
        });
    }

    if (req.body.email) {
        const email = String(req.body.email).trim().toLowerCase();
        const duplicate = await Admin.exists({ email, _id: { $ne: admin._id } });
        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: 'An admin with this email already exists',
            });
        }
        admin.email = email;
    }

    if (req.body.name !== undefined) admin.name = String(req.body.name).trim();
    if (req.body.phone !== undefined) admin.phone = String(req.body.phone).trim();
    if (req.body.role !== undefined) admin.role = req.body.role;

    if (req.body.password) {
        if (String(req.body.password).length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least 8 characters',
            });
        }
        admin.password = String(req.body.password);
    }

    await admin.save();

    res.json({
        success: true,
        data: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            role: admin.role,
            lastLogin: admin.lastLogin,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
        },
    });
});

// @route DELETE /api/admin/admins/:id
export const deleteAdmin = asyncHandler(async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;

    if (String(req.params.id) === String(req.admin._id)) {
        return res.status(400).json({
            success: false,
            message: 'You cannot delete your own account',
        });
    }

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (admin.role === 'super-admin') {
        const superAdminCount = await Admin.countDocuments({ role: 'super-admin' });
        if (superAdminCount <= 1) {
            return res.status(400).json({
                success: false,
                message: 'The last Super Admin cannot be deleted',
            });
        }
    }

    await admin.deleteOne();
    res.json({ success: true, message: 'Admin account deleted' });
});

// @route GET /api/admin/activity
// @access Super Admin only
export const getActivityLogs = asyncHandler(async (req, res) => {
    if (!requireSuperAdmin(req, res)) return;

    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 30, 1), 100);
    const filter = {};

    if (req.query.resource) filter.resource = String(req.query.resource);
    if (req.query.action) filter.action = String(req.query.action);
    if (req.query.admin) filter.admin = String(req.query.admin);

    if (req.query.from || req.query.to) {
        filter.createdAt = {};
        if (req.query.from) filter.createdAt.$gte = new Date(String(req.query.from));
        if (req.query.to) {
            const to = new Date(String(req.query.to));
            to.setHours(23, 59, 59, 999);
            filter.createdAt.$lte = to;
        }
    }

    const search = String(req.query.search || '').trim();
    if (search) {
        const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(escaped, 'i');
        filter.$or = [
            { adminName: pattern },
            { adminEmail: pattern },
            { action: pattern },
            { resource: pattern },
            { path: pattern },
        ];
    }

    const [data, total] = await Promise.all([
        ActivityLog.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean(),
        ActivityLog.countDocuments(filter),
    ]);

    res.json({
        success: true,
        count: data.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data,
    });
});

export const getSettings = asyncHandler(async (_req, res) => {
    const data = await SiteSetting.findOneAndUpdate({ key: 'main' }, { $setOnInsert: { key: 'main' } }, { new: true, upsert: true });
    res.json({ success: true, data });
});

export const updateSettings = asyncHandler(async (req, res) => {
    const data = await SiteSetting.findOneAndUpdate({ key: 'main' }, req.body, { new: true, upsert: true, runValidators: true });
    res.json({ success: true, data });
});

export const updateProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id).select('+password');
    if (req.body.currentPassword && req.body.newPassword) {
        if (!(await admin.comparePassword(req.body.currentPassword))) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        admin.password = req.body.newPassword;
    }
    if (req.body.name) admin.name = req.body.name;
    if (req.body.email) admin.email = req.body.email;
    if (req.body.phone !== undefined) admin.phone = req.body.phone;
    await admin.save();
    res.json({ success: true, admin: { id: admin._id, name: admin.name, email: admin.email, phone: admin.phone, role: admin.role } });
});
