
import basicmodel from '../models/basic_schema.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

// Your Cloudinary Config (ensure this is set up)
cloudinary.config({ 
    cloud_name: process.env.CLOUDENAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API__SECRET
});

const FIXED_ID = process.env.BASIC_DETAILS_DATABASE_ID; // Your fixed document ID

async function uploadResume(req, res) {
    try {
        // 1. Check if file exists in request
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "No PDF file uploaded"
            });
        }

       // console.log("Starting PDF upload...");

        // 2. Upload to Cloudinary
        // Note: resource_type: "auto" is crucial for PDFs so Cloudinary treats it correctly
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "portfolio/resumes",
            resource_type: "auto", 
            // Optional: Generate a unique public_id based on date so you don't overwrite old ones immediately
            public_id: `resume_${Date.now()}` 
        });

        console.log("Cloudinary uploadResult:", uploadResult);

        // 3. Update Database
        const updatedUser = await basicmodel.findByIdAndUpdate(
            FIXED_ID,
            { resume_url: uploadResult.secure_url },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                status: false,
                message: "User details not found"
            });
        }

        // 4. Send Success Response
        return res.status(200).json({
            status: true,
            message: "Resume uploaded successfully",
            data: updatedUser
        });

    } catch (error) {
        console.error("Resume Upload Error:", error);
        return res.status(500).json({
            status: false,
            message: "Failed to upload resume",
            error: error.message
        });

    } finally {
        // 5. Cleanup: Delete local file from server
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
                console.log("Local PDF deleted.");
            } catch (err) {
                console.error("Error deleting local file:", err);
            }
        }
    }
}

export default uploadResume;