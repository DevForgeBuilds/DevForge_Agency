import { Router } from 'express';

import { protect } from '../middleware/auth.js';
import { activityLogger } from '../middleware/activityLogger.js';

import {
    dashboard,
    listResource,
    createResource,
    updateResource,
    deleteResource,
    addClientProject,
    updateClientProject,
    deleteClientProject,
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getActivityLogs,
    getSettings,
    updateSettings,
    updateProfile,
} from '../controllers/adminController.js';

const router = Router();

router.use(protect);
router.use(activityLogger);

router.get('/dashboard', dashboard);

router.get('/activity', getActivityLogs);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);

router.put('/profile', updateProfile);

// Super Admin account management. Keep before generic resource routes.
router.get('/admins', getAdmins);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

// Client project history routes must stay before the generic resource routes.
router.post('/clients/:clientId/projects', addClientProject);
router.put('/clients/:clientId/projects/:projectId', updateClientProject);
router.delete('/clients/:clientId/projects/:projectId', deleteClientProject);

router.get('/:resource', listResource);
router.post('/:resource', createResource);
router.put('/:resource/:id', updateResource);
router.delete('/:resource/:id', deleteResource);

export default router;
