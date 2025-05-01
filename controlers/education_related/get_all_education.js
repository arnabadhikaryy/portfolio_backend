
import educationModel from "../../models/education_schema.js";

async function getAllEducationDetails(req, res) {
    try {
        const educationData = await educationModel.find({}); // Fetch all documents

        return res.status(200).send({
            status: true,
            message: "All education details fetched successfully",
            data: educationData,
        });

    } catch (error) {
        console.error("Error fetching education details:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to fetch education details",
            error: error.message,
        });
    }
}

export default getAllEducationDetails;
