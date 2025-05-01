import educationModel from "../../models/education_schema.js";
import image_uplode_to_cloudnary from "../../middlewairs/imageUplogingMiddleware.js";

async function educationDetailsUpload(req, res) {
    const { title, discriotion } = req.body;

    // Validation
    if (!title || !discriotion) {
        return res.status(400).send({
            status: false,
            message: 'Both title and discriotion are required',
        });
    }

    // Default certificate image
    let certificateUrl = 'https://www.vhv.rs/dpng/d/614-6141651_transparent-background-education-logo-hd-png-download.png';

    // Upload custom image if provided
    if (req.file) {
        try {
            certificateUrl = await image_uplode_to_cloudnary(req.file.path);
        } catch (err) {
            return res.status(500).send({
                status: false,
                message: 'Failed to upload image to Cloudinary',
                error: err.message,
            });
        }
    }

    console.log('Certificate image URL:', certificateUrl);

    // Save education details
    const educationData = new educationModel({
        title,
        discriotion,
        certificate_url: certificateUrl,
    });

    try {
        const savedData = await educationData.save();
        return res.status(201).send({
            status: true,
            message: 'Education details saved successfully',
            data: savedData,
        });
    } catch (error) {
        console.error('Error saving education details:', error);
        return res.status(500).send({
            status: false,
            message: 'Failed to save education details',
            error: error.message,
        });
    }
}

export default educationDetailsUpload;
