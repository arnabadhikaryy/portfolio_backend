

import project_model from "../../models/project_schema.js";

async function getAllProjects(req, res) {
    try {
        const projects = await project_model.find({}); // Fetch all projects

        return res.status(200).send({
            status: true,
            message: "All projects fetched successfully",
            data: projects,
        });

    } catch (error) {
        console.error("Error fetching project data:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to fetch project data",
            error: error.message,
        });
    }
}

export default getAllProjects;
