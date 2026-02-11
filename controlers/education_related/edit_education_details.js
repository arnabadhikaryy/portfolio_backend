
import educationModel from "../../models/education_schema.js";
import image_uplode_to_cloudnary from "../../middlewairs/imageUplogingMiddleware.js";

async function editEducationDetails(req, res) {

    const { title, discriotion, id } = req.body;

    try {
        // 1. Find the existing record in the database
        const educationItem = await educationModel.findById(id);

        if (!educationItem) {
            return res.status(404).send({
                status: false,
                message: 'Education detail not found',
            });
        }

        // 2. Update text fields only if new values are provided
        if (title) {
            educationItem.title = title;
        }
        if (discriotion) {
            educationItem.discriotion = discriotion; // Keeping your variable name
        }

        // 3. Handle Image Update 
        // Only run this if the user uploaded a NEW file
        if (req.file) {
            try {
                // Upload new image
                const newCertificateUrl = await image_uplode_to_cloudnary(req.file.path);
                // Replace the old URL with the new one
                educationItem.certificate_url = newCertificateUrl;
            } catch (err) {
                return res.status(500).send({
                    status: false,
                    message: 'Failed to upload new image to Cloudinary',
                    error: err.message,
                });
            }
        }

        // 4. Save the updated document
        const updatedData = await educationItem.save();

        return res.status(200).send({
            status: true,
            message: 'Education details updated successfully',
            data: updatedData,
        });

    } catch (error) {
        console.error('Error updating education details:', error);
        return res.status(500).send({
            status: false,
            message: 'Failed to update education details',
            error: error.message,
        });
    }
}

export default editEducationDetails;