import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises'; // We use the promise version

// 1. Configure OUTSIDE the function so it doesn't run every time
cloudinary.config({ 
    cloud_name: process.env.CLOUDENAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API__SECRET
});

async function image_uplode_to_cloudnary(file_path) { 
    
  try {
    // 2. Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file_path, {
        folder: "portfolio", // Fixed spelling from 'protfolio'
        // Removed fixed width/height so Certificates remain readable.
        // You can resize on the frontend using the URL.
    });

    console.log('Upload success:', uploadResult.secure_url);
    return uploadResult.secure_url;

  } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw error; // 3. Re-throw error so the controller knows it failed!

  } finally {
      // 4. The FINALLY block runs whether the upload succeeded OR failed.
      // This ensures the temp file is ALWAYS deleted.
      try {
          await fs.unlink(file_path);
          console.log('Local file deleted successfully');
      } catch (unlinkError) {
          console.error('Error deleting local file:', unlinkError);
      }
  }
};

export default image_uplode_to_cloudnary;