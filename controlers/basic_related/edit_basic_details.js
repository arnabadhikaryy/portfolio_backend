import basicmodel from "../../models/basic_schema.js";
import image_uplode_to_cloudnary from "../../middlewairs/imageUplogingMiddleware.js";

// this is basic details database id
const FIXED_ID = process.env.BASIC_DETAILS_DATABASE_ID

async function updateBasicDetails(req, res) {
    try {
        // 1. Find the existing document
        const userDetails = await basicmodel.findById(FIXED_ID);

        if (!userDetails) {
            return res.status(404).json({
                status: false,
                message: "Basic details document not found. Please create it first."
            });
        }

        // 2. Extract text data from req.body
        const {
            my_name,
            profation,
            linkdin_link,
            github_link,
            address,
            date_of_barth,
            language,
            pnone,
            email,
            skills // This will come as a JSON string if using FormData
        } = req.body;

        // 3. Update Simple Text Fields (if provided)
        if (my_name) userDetails.my_name = my_name;
        if (profation) userDetails.profation = profation;
        if (linkdin_link) userDetails.linkdin_link = linkdin_link;
        if (github_link) userDetails.github_link = github_link;
        if (address) userDetails.address = address;
        if (date_of_barth) userDetails.date_of_barth = date_of_barth;
        if (language) userDetails.language = language;
        if (pnone) userDetails.pnone = pnone;
        if (email) userDetails.email = email;

        // 4. Handle SKILLS Update
        // When using FormData (multipart/form-data), arrays/objects are sent as JSON strings.
        // We need to parse it back into an array.
        if (skills) {
            try {
                // If it's already an object/array (JSON body), use it directly.
                // If it's a string (FormData), parse it.
                const parsedSkills = typeof skills === 'string' ? JSON.parse(skills) : skills;
                
                if (Array.isArray(parsedSkills)) {
                    userDetails.skills = parsedSkills;
                }
            } catch (e) {
                console.error("Error parsing skills:", e);
                return res.status(400).json({ status: false, message: "Invalid skills format" });
            }
        }

        // 5. Handle Image Uploads (Using Multer 'fields')
        // We assume your route uses upload.fields([{ name: 'profile_pic' }, { name: 'professional_pic' }])
        
        if (req.files) {
            // Check for 'profile_pic' field
            if (req.files.profile_pic) {
                const profileUrl = await image_uplode_to_cloudnary(req.files.profile_pic[0].path);
                userDetails.prifile_url = profileUrl;
            }

            // Check for 'professional_pic' field
            if (req.files.professional_pic) {
                const professionalUrl = await image_uplode_to_cloudnary(req.files.professional_pic[0].path);
                userDetails.profational_profile_pic_url = professionalUrl;
            }
        }

        // 6. Save Updates
        const updatedData = await userDetails.save();

        return res.status(200).json({
            status: true,
            message: "Basic details updated successfully",
            data: updatedData
        });

    } catch (error) {
        console.error("Update Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export default updateBasicDetails;