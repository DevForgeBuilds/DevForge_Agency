// import express from "express";
// import Project from "../models/Project.js";

// const router = express.Router();


// // =============================================================
// // GET ALL ACTIVE PROJECTS
// // GET /api/projects
// // =============================================================

// router.get("/", async (req, res, next) => {
//     try {
//         const projects = await Project.find({
//             isActive: true,
//         })
//             .sort({
//                 featured: -1,
//                 createdAt: -1,
//             })
//             .lean();

//         res.json({
//             success: true,
//             count: projects.length,
//             data: projects,
//         });

//     } catch (error) {
//         next(error);
//     }
// });


// // =============================================================
// // GET SINGLE PROJECT BY SLUG
// // GET /api/projects/:slug
// // =============================================================

// router.get("/:slug", async (req, res, next) => {
//     try {
//         const project = await Project.findOne({
//             slug: req.params.slug,
//             isActive: true,
//         }).lean();

//         if (!project) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Project not found",
//             });
//         }

//         res.json({
//             success: true,
//             data: project,
//         });

//     } catch (error) {
//         next(error);
//     }
// });


// export default router;
import express from "express";
import Project from "../models/Project.js";

const router = express.Router();


// =============================================================
// GET ALL ACTIVE PROJECTS
// GET /api/projects
// =============================================================

router.get("/", async (req, res, next) => {
    try {
        const projects = await Project.find({
            isActive: true,
        })
            .sort({
                order: 1,
                featured: -1,
                createdAt: -1,
            })
            .lean();

        res.json({
            success: true,
            count: projects.length,
            data: projects,
        });

    } catch (error) {
        next(error);
    }
});


// =============================================================
// GET SINGLE PROJECT BY SLUG
// GET /api/projects/:slug
// =============================================================

router.get("/:slug", async (req, res, next) => {
    try {
        const project = await Project.findOne({
            slug: req.params.slug,
            isActive: true,
        }).lean();

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.json({
            success: true,
            data: project,
        });

    } catch (error) {
        next(error);
    }
});


export default router;