import { validationResult } from "express-validator";
import Inquiry from "../models/Inquiry.js";
import Notification from "../models/Notification.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateProjectId from "../utils/generateProjectId.js";
import { sendInquiryEmails } from "../utils/sendEmail.js";

// @route   POST /api/inquiries
// @desc    Create a new project inquiry
// @access  Public
export const createInquiry = asyncHandler(
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        const {
            name,
            company,
            email,
            phone,
            service,
            serviceOther,
            timeline,
            website,
            message,
        } = req.body;

        let projectId = generateProjectId();
        let attempts = 0;

        while (
            (await Inquiry.exists({ projectId })) &&
            attempts < 5
        ) {
            projectId = generateProjectId();
            attempts += 1;
        }

        const inquiry = await Inquiry.create({
            projectId,
            name,
            company,
            email,
            phone,
            service,
            serviceOther,
            timeline,
            website,
            message,

            meta: {
                ip: req.ip,
                userAgent:
                    req.headers["user-agent"] || "",
            },
        });

        /*
         * Create admin notification.
         * Notification error થવાથી inquiry submission fail નહીં થાય.
         */
        Notification.create({
            title: "New inquiry received",
            message:
                `${inquiry.name} sent an inquiry for ` +
                `${inquiry.service}`,
            type: "inquiry",
            resource: "inquiries",
            resourceId: inquiry._id,
            link: "/admin?section=inquiries",
        }).catch((error) => {
            console.error(
                "[Inquiry] Notification creation error:",
                error.message
            );
        });

        /*
         * Send inquiry emails.
         * Email error થવાથી inquiry submission fail નહીં થાય.
         */
        sendInquiryEmails(inquiry).catch(
            (error) => {
                console.error(
                    "[Inquiry] Email dispatch error:",
                    error.message
                );
            }
        );

        res.status(201).json({
            success: true,
            message: "Inquiry received.",

            data: {
                projectId: inquiry.projectId,
                name: inquiry.name,
                email: inquiry.email,
                phone: inquiry.phone,
                createdAt: inquiry.createdAt,
            },
        });
    }
);

// @route   GET /api/inquiries
// @desc    List inquiries
// @access  Private
export const getInquiries = asyncHandler(
    async (req, res) => {
        const page = Math.max(
            parseInt(req.query.page, 10) || 1,
            1
        );

        const limit = Math.min(
            parseInt(req.query.limit, 10) || 20,
            100
        );

        const skip = (page - 1) * limit;
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.service) {
            filter.service = req.query.service;
        }

        const [items, total] =
            await Promise.all([
                Inquiry.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                Inquiry.countDocuments(filter),
            ]);

        res.json({
            success: true,
            count: items.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: items,
        });
    }
);

// @route   GET /api/inquiries/:id
// @desc    Get one inquiry
// @access  Private
export const getInquiryById = asyncHandler(
    async (req, res) => {
        const inquiry =
            await Inquiry.findById(
                req.params.id
            );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }

        res.json({
            success: true,
            data: inquiry,
        });
    }
);

// @route   PATCH /api/inquiries/:id
// @desc    Update status, notes and follow-up
// @access  Private
export const updateInquiryStatus = asyncHandler(
    async (req, res) => {
        const {
            status,
            notes,
            followUpAt,
        } = req.body;

        const allowedStatuses = [
            "new",
            "contacted",
            "in-progress",
            "closed",
        ];

        if (
            !status ||
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    `Status must be one of: ${
                        allowedStatuses.join(", ")
                    }`,
            });
        }

        const updateData = {
            status,
        };

        if (notes !== undefined) {
            updateData.notes = notes;
        }

        if (followUpAt !== undefined) {
            updateData.followUpAt =
                followUpAt || null;
        }

        const inquiry =
            await Inquiry.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }

        res.json({
            success: true,
            message: "Inquiry updated successfully",
            data: inquiry,
        });
    }
);

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry
// @access  Private
export const deleteInquiry = asyncHandler(
    async (req, res) => {
        const inquiry =
            await Inquiry.findByIdAndDelete(
                req.params.id
            );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found",
            });
        }

        res.json({
            success: true,
            message: "Inquiry deleted",
        });
    }
);