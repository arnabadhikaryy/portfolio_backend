import basicmodel from "../../models/basic_schema.js";
import 'dotenv/config'

async function addSkillToBasicDetails(req, res) {
    // 1. Extract user_id from request body
    const { user_id, skill_name, confidance, icon_url } = req.body;

    // 2. Validate required fields
    if (!user_id) {
        return res.status(400).send({
            status: false,
            message: "user_id is required in the request body",
        });
    }

    if (!skill_name || confidance == null || !icon_url) {
        return res.status(400).send({
            status: false,
            message: "skill_name, confidance, and icon_url are required",
        });
    }

    try {
        // 3. Find and update document using user_id
        const updatedDoc = await basicmodel.findOneAndUpdate(
            { user_id: user_id }, // Find by user_id
            {
                $push: {
                    skills: {
                        skill_name,
                        confidance,
                        icon_url
                    }
                }
            },
            { 
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        // 4. Handle case where document is not found
        if (!updatedDoc) {
            return res.status(404).send({
                status: false,
                message: "No basic details found for the provided user_id",
            });
        }

        // 5. Send success response
        res.status(200).send({
            status: true,
            message: "Skill added successfully",
            data: updatedDoc,
        });

    } catch (error) {
        console.error("Error adding skill:", error);
        res.status(500).send({
            status: false,
            message: "Failed to add skill",
            error: error.message,
        });
    }
}

export default addSkillToBasicDetails;