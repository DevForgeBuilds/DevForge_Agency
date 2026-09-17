import Service from "../models/Service.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @route   GET /api/services
// @desc    Get active services for public website
// @access  Public
export const getServices = asyncHandler(
    async (req, res) => {
        const services = await Service.find({
            isActive: true,
        })
            .sort({
                order: 1,
                number: 1,
                createdAt: 1,
            })
            .select("-__v");

        res.json({
            success: true,
            count: services.length,
            data: services,
        });
    }
);

// @route   GET /api/services/admin/all
// @desc    Get all services for admin
// @access  Private
export const getAllServicesAdmin = asyncHandler(
    async (req, res) => {
        const services = await Service.find()
            .sort({
                order: 1,
                number: 1,
                createdAt: 1,
            })
            .select("-__v");

        res.json({
            success: true,
            count: services.length,
            data: services,
        });
    }
);

// @route   GET /api/services/:slug
// @desc    Get service by slug
// @access  Public
export const getServiceBySlug = asyncHandler(
    async (req, res) => {
        const service = await Service.findOne({
            slug: req.params.slug,
            isActive: true,
        }).select("-__v");

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        res.json({
            success: true,
            data: service,
        });
    }
);

// @route   POST /api/services
// @desc    Create new service
// @access  Private
export const createService = asyncHandler(
    async (req, res) => {
        const serviceData = {
            ...req.body,

            slug: req.body.slug
                ?.trim()
                .toLowerCase()
                .replace(/\s+/g, "-"),

            order:
                Number(req.body.order) || 0,

            isActive:
                req.body.isActive !== false,
        };

        const service =
            await Service.create(serviceData);

        res.status(201).json({
            success: true,
            message:
                "Service created successfully",
            data: service,
        });
    }
);

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private
export const updateService = asyncHandler(
    async (req, res) => {
        const updateData = {
            ...req.body,
        };

        if (updateData.slug) {
            updateData.slug =
                updateData.slug
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-");
        }

        if (updateData.order !== undefined) {
            updateData.order =
                Number(updateData.order) || 0;
        }

        const service =
            await Service.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        res.json({
            success: true,
            message:
                "Service updated successfully",
            data: service,
        });
    }
);

// @route   PUT /api/services/order/update
// @desc    Update order of multiple services
// @access  Private
export const updateServiceOrder =
    asyncHandler(async (req, res) => {
        const { services } = req.body;

        if (
            !Array.isArray(services) ||
            services.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Services order list is required",
            });
        }

        await Promise.all(
            services.map((service, index) =>
                Service.findByIdAndUpdate(
                    service.id,
                    {
                        order:
                            service.order ??
                            index + 1,
                    },
                    {
                        runValidators: true,
                    }
                )
            )
        );

        const updatedServices =
            await Service.find()
                .sort({
                    order: 1,
                    number: 1,
                })
                .select("-__v");

        res.json({
            success: true,
            message:
                "Service order updated successfully",
            data: updatedServices,
        });
    });

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private
export const deleteService = asyncHandler(
    async (req, res) => {
        const service =
            await Service.findByIdAndDelete(
                req.params.id
            );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        res.json({
            success: true,
            message:
                "Service deleted successfully",
        });
    }
);