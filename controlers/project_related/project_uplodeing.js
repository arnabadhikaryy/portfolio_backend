import project_model from "../../models/project_schema.js";
import 'dotenv/config';
import image_uplode_to_cloudnary from "../../middlewairs/imageUplogingMiddleware.js";

async function projectUpload(req, res) {
    const { title, discriotion, project_link } = req.body;

    // Validate required fields
    if (!title || !discriotion || !project_link) {
        return res.status(400).send({
            status: false,
            message: 'Missing required fields: title, discriotion, or project_link',
        });
    }

    if (!req.file) {
        return res.status(400).send({
            status: false,
            message: 'Project image file not found',
        });
    }

    try {
        // Upload image to Cloudinary
        const projectImageUrl = await image_uplode_to_cloudnary(req.file.path);
        





        console.log('Cloudinary image URL:', projectImageUrl);

        if (!projectImageUrl) {
            return res.status(500).send({
                status: false,
                message: 'Image uploading failed. Please try again.',
            });
        }

        // Create and save project data
        const newProject = new project_model({
            title,
            discriotion,
            project_link,
            project_snap_url: projectImageUrl,
        });

        const savedProject = await newProject.save();

        if (savedProject) {
            return res.status(201).send({
                status: true,
                message: 'Project uploaded successfully',
                data: savedProject,
            });
        } else {
            return res.status(500).send({
                status: false,
                message: 'Failed to save project to the database.',
            });
        }

    } catch (error) {
        console.error('Error uploading project:', error);
        return res.status(500).send({
            status: false,
            message: 'An error occurred while saving project data.',
            error: error.message,
        });
    }
}

export default projectUpload;
