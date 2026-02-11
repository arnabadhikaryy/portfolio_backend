import 'dotenv/config'

import basicmodel from "../../models/basic_schema.js";

async function deleteSkillFromBasicDetails(req, res) {
    const {  skill_name } = req.body;

    const _id = process.env.BASIC_DETAILS_DATABASE_ID;

    if (!_id ) {
        return res.status(400).send({
            status: false,
            message: "_id is required",
        });
    }

    if (!skill_name) {
        return res.status(400).send({
            status: false,
            message: "skill_name is required",
        });
    }

    try {
        // First, find the document
        const doc = await basicmodel.findById(_id);

        if (!doc) {
            return res.status(404).send({
                status: false,
                message: "Basic details document not found",
            });
        }

        // Check if the skill exists
        const skillExists = doc.skills.some(skill => skill.skill_name === skill_name);

        if (!skillExists) {
            return res.status(404).send({
                status: false,
                message: `Skill '${skill_name}' not found in skills array`,
            });
        }

        // If exists, now delete it
        const updatedDoc = await basicmodel.findByIdAndUpdate(
            _id,
            {
                $pull: {
                    skills: { skill_name: skill_name }
                }
            },
            { new: true }
        );

        return res.send({
            status: true,
            message: `Skill '${skill_name}' deleted successfully`,
            data: updatedDoc,
        });
    } catch (error) {
        console.error("Error deleting skill:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to delete skill",
            error: error.message,
        });
    }
}

export default deleteSkillFromBasicDetails;
