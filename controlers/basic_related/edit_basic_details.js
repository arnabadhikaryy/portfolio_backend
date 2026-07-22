import basicmodel from "../../models/basic_schema.js";
import image_uplode_to_cloudnary from "../../middlewairs/imageUplogingMiddleware.js";

async function updateBasicDetails(req, res) {
   // console.log("updateBasicDetails function called");
    console.log("req.body decode: ", req.user.user_id);
    console.log("req.body: ", req.body.user_id);

    const token_user_id = req.user.user_id;
    const body_user_id = req.body.user_id;

    if (token_user_id !== body_user_id) {
        return res.status(401).json({
            status: false,
            message: "you can't update other user's account. this is not allowed"
        });
    }

    try {
        const { user_id } = req.body;
    

        if (!user_id) {
            return res.status(400).json({
                status: false,
                message: "user_id is required in the request body"
            });
        }

        // Build update object dynamically
        let updateFields = {};

        const fields = [
            "my_name", "profation", "linkdin_link", "github_link", 
            "address", "date_of_barth", "language", "pnone", 
            "email", "about_me", "my_password", "your_ui_name", 
            "exprience", "project_count"
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        });

        // Parse skills if provided
        if (req.body.skills) {
            try {
                const parsedSkills = typeof req.body.skills === 'string' 
                    ? JSON.parse(req.body.skills) 
                    : req.body.skills;
                
                if (Array.isArray(parsedSkills)) {
                    updateFields.skills = parsedSkills;
                }
            } catch (e) {
                return res.status(400).json({ 
                    status: false, 
                    message: "Invalid skills format" 
                });
            }
        }

        // Handle Image Uploads
        if (req.files) {
            if (req.files.profile_pic?.[0]) {
                updateFields.prifile_url = await image_uplode_to_cloudnary(req.files.profile_pic[0].path);
            }
            if (req.files.professional_pic?.[0]) {
                updateFields.profational_profile_pic_url = await image_uplode_to_cloudnary(req.files.professional_pic[0].path);
            }
        }

        // Perform atomic update without touching user_id field
        const updatedData = await basicmodel.findOneAndUpdate(
            { user_id: user_id },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedData) {
            return res.status(404).json({
                status: false,
                message: "No basic details found for the provided user_id."
            });
        }

        return res.status(200).json({
            status: true,
            message: "Basic details updated successfully",
            data: updatedData
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export default updateBasicDetails;