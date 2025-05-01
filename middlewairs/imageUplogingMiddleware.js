import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';



async function image_uplode_to_cloudnary(file_path) {   // (file_path = req.file.path)

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDENAME, 
        api_key: process.env.API_KEY, 
        api_secret:  process.env.API__SECRET
    });
    
    // Upload an image
  try {
    const uploadResult = await cloudinary.uploader
  .upload(
      file_path, {
          folder:"protfolio",
          width:250,
          height:250
      }
  )
  console.log('uploadResult is:_ ',uploadResult);
   let profileURL=uploadResult.secure_url;   

   //temporiry file deleting

fs.unlink(file_path, (err) => {
    if (err) {
      console.error('An error occurred:', err);
    }
    console.log('File deleted successfully!');
  });

   return profileURL;

  }
  catch(error) {
      console.log(error);
  };

};

export default image_uplode_to_cloudnary;