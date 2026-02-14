import basicmodel from "../../models/basic_schema.js";
import image_uplode_to_cloudnary from "../../middlewairs/imageUplogingMiddleware.js"; // Adjust path
import fs from 'fs/promises';

const FIXED_ID = "681356ffa45cc9985cecd198";

// ==========================================
// 1. BASIC DETAILS (Name, Email, Resume, etc.)
// ==========================================

export const updateBasicDetails = async (req, res) => {
    try {
        const updates = req.body; // Contains my_name, email, skills (as string), etc.

        // 1. Parse Skills if present (FormData sends arrays as strings)
        if (updates.skills) {
            updates.skills = JSON.parse(updates.skills);
        }

        // 2. Handle Profile Images (if uploaded)
        if (req.files) {
            if (req.files.profile_pic) {
                updates.prifile_url = await image_uplode_to_cloudnary(req.files.profile_pic[0].path);
            }
            if (req.files.professional_pic) {
                updates.profational_profile_pic_url = await image_uplode_to_cloudnary(req.files.professional_pic[0].path);
            }
        }

        // 3. Update the document
        const updatedData = await basicmodel.findByIdAndUpdate(FIXED_ID, 
            { $set: updates }, // $set updates only the fields provided
            { new: true }
        );

        res.status(200).json({ status: true, message: "Basic details updated", data: updatedData });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


// ==========================================
// 2. EDUCATION MANAGEMENT (Array Operations)
// ==========================================

// --- ADD Education (Push to Array) ---
export const addEducation = async (req, res) => {
    try {
        const { title, discriotion, start_year, end_year } = req.body;
        console.log('req.body', req.body);
        let certificate_url = "";

        // Upload Certificate if provided
        if (req.file) {
            certificate_url = await image_uplode_to_cloudnary(req.file.path);
        }

        const newEducation = {
            title,
            discriotion,
            start_year,
            end_year,
            certificate_url
        };

        // $push adds the new object to the 'education' array
        const updatedUser = await basicmodel.findByIdAndUpdate(FIXED_ID,
            { $push: { education: newEducation } },
            { new: true }
        );

        res.status(200).json({ status: true, message: "Education added", data: updatedUser.education });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// --- EDIT Education (Update specific item in Array) ---
export const editEducation = async (req, res) => {
    try {
        const { eduId, title, discriotion, start_year, end_year } = req.body; // eduId is required!
        
        // Construct update object dynamically
        const updateFields = {};
        if (title) updateFields["education.$.title"] = title;
        if (discriotion) updateFields["education.$.discriotion"] = discriotion;
        if (start_year) updateFields["education.$.start_year"] = start_year;
        if (end_year) updateFields["education.$.end_year"] = end_year;

        // Handle File Update
        if (req.file) {
            const newUrl = await image_uplode_to_cloudnary(req.file.path);
            updateFields["education.$.certificate_url"] = newUrl;
        }

        // Use the positional operator ($) to update the item that matches the ID
        const updatedUser = await basicmodel.findOneAndUpdate(
            { _id: FIXED_ID, "education._id": eduId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ status: false, message: "Education item not found" });

        res.status(200).json({ status: true, message: "Education updated", data: updatedUser.education });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// --- DELETE Education (Pull from Array) ---
export const deleteEducation = async (req, res) => {
    try {
        const { eduId } = req.body; // Expecting { "eduId": "..." }

        // $pull removes items from array that match the condition
        const updatedUser = await basicmodel.findByIdAndUpdate(FIXED_ID,
            { $pull: { education: { _id: eduId } } },
            { new: true }
        );

        res.status(200).json({ status: true, message: "Education deleted", data: updatedUser.education });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


// ==========================================
// 3. PROJECT MANAGEMENT (Array Operations)
// ==========================================

// --- ADD Project ---
export const addProject = async (req, res) => {
    try {
        const { title, discriotion, project_link, technologies_used } = req.body;
        let project_snap_url = "";

        if (req.file) {
            project_snap_url = await image_uplode_to_cloudnary(req.file.path);
        }

        const newProject = {
            title,
            discriotion,
            project_link,
            technologies_used,
            project_snap_url
        };

        const updatedUser = await basicmodel.findByIdAndUpdate(FIXED_ID,
            { $push: { projects: newProject } },
            { new: true }
        );

        res.status(200).json({ status: true, message: "Project added", data: updatedUser.projects });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// --- EDIT Project ---
export const editProject = async (req, res) => {
    try {
        const { projectId, title, discriotion, project_link, technologies_used } = req.body;

        const updateFields = {};
        if (title) updateFields["projects.$.title"] = title;
        if (discriotion) updateFields["projects.$.discriotion"] = discriotion;
        if (project_link) updateFields["projects.$.project_link"] = project_link;
        if (technologies_used) updateFields["projects.$.technologies_used"] = technologies_used;

        if (req.file) {
            const newUrl = await image_uplode_to_cloudnary(req.file.path);
            updateFields["projects.$.project_snap_url"] = newUrl;
        }

        const updatedUser = await basicmodel.findOneAndUpdate(
            { _id: FIXED_ID, "projects._id": projectId },
            { $set: updateFields },
            { new: true }
        );

        res.status(200).json({ status: true, message: "Project updated", data: updatedUser.projects });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// --- DELETE Project ---
export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.body;

        const updatedUser = await basicmodel.findByIdAndUpdate(FIXED_ID,
            { $pull: { projects: { _id: projectId } } },
            { new: true }
        );

        res.status(200).json({ status: true, message: "Project deleted", data: updatedUser.projects });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



// --- GET All Portfolio Data ---
export const getPortfolioData = async (req, res) => {
    try {
        // Find the single document by your FIXED_ID
        const portfolioData = await basicmodel.findById(FIXED_ID);

        if (!portfolioData) {
            return res.status(404).json({
                status: false,
                message: "Portfolio data not found. Please initialize the database."
            });
        }

        return res.status(200).json({
            status: true,
            message: "Data fetched successfully",
            data: portfolioData
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({
            status: false,
            message: "Server Error",
            error: error.message
        });
    }
};