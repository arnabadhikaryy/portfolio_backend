

import basicmodel from "../../models/basic_schema.js";
import 'dotenv/config'


async function addSkillToBasicDetails(req, res) {
    const { skill_name, confidance, icon_url } = req.body;

    const _id = process.env.BASIC_DETAILS_DATABASE_ID;

    if (!_id || !skill_name || confidance == null || !icon_url) {
        return res.send({
            status: false,
            message: "skill_name, confidance, iconMissing required fields (_url)",
        });
    }

    try {
        const updatedDoc = await basicmodel.findByIdAndUpdate(
            _id,
            {
                $push: {
                    skills: {
                        skill_name,
                        confidance,
                        icon_url
                    }
                }
            },
            { new: true } // Return updated document
        );

        if (!updatedDoc) {
            return res.send({
                status: false,
                message: "Basic details document not found",
            });
        }

        res.send({
            status: true,
            message: "Skill added successfully",
            data: updatedDoc,
        });
    } catch (error) {
        console.error("Error adding skill:", error);
        res.send({
            status: false,
            message: "Failed to add skill",
            error: error.message,
        });
    }
}

export default addSkillToBasicDetails;
