import project_model from "../../models/project_schema.js";

async function delete_project(req, res) {
    const { project_link } = req.body;

    if (!project_link) {
        return res.status(400).send({
            status: false,
            message: "Project link is required",
        });
    }

    try {
        // Find and delete the project
        const deletedProject = await project_model.findOneAndDelete({ project_link });

        if (!deletedProject) {
            return res.status(404).send({
                status: false,
                message: "Project not found with the given link",
            });
        }

        return res.status(200).send({
            status: true,
            message: "Project deleted successfully",
            data: deletedProject,
        });

    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).send({
            status: false,
            message: "An error occurred while deleting the project",
            error: error.message,
        });
    }
}

export default delete_project;
