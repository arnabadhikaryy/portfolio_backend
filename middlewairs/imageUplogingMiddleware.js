import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

cloudinary.config({ 
    cloud_name: process.env.CLOUDENAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API__SECRET
});

async function image_uplode_to_cloudnary(file_path) { 
    try {
        const uploadResult = await cloudinary.uploader.upload(file_path, {
            folder: "portfolio",
            resource_type: "auto" // auto-detects image vs pdf vs video
        });

        console.log('Upload success:', uploadResult.secure_url);
        return uploadResult.secure_url;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error; 
    } finally {
        try {
            await fs.unlink(file_path);
            console.log('Local file deleted successfully');
        } catch (unlinkError) {
            console.error('Error deleting local file:', unlinkError);
        }
    }
};

export default image_uplode_to_cloudnary;