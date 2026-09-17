import { Router } from 'express';

import {
    getServices,
    getServiceBySlug,
    createService,
    updateService,
    updateServiceOrder,
    deleteService,
    getAllServicesAdmin,
} from '../controllers/serviceController.js';

import { protect } from '../middleware/auth.js';
import { activityLogger } from '../middleware/activityLogger.js';

const router = Router();

// Admin: get active and inactive services
router.get('/admin/all', protect, getAllServicesAdmin);

// Public: get active services
router.get('/', getServices);

// Admin mutations
router.post('/', protect, activityLogger, createService);

// Keep this route before /:id.
router.put('/order/update', protect, activityLogger, updateServiceOrder);
router.put('/:id', protect, activityLogger, updateService);
router.delete('/:id', protect, activityLogger, deleteService);

// Keep the public dynamic slug route last.
router.get('/:slug', getServiceBySlug);

export default router;
