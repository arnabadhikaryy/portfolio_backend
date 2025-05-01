

import basicmodel from "../../models/basic_schema.js";

async function getAllBasicDetails(req, res) {
    try {
        const data = await basicmodel.find();

        if (!data || data.length === 0) {
            return res.status(404).send({
                status: false,
                message: "No basic details found",
            });
        }

        return res.send({
            status: true,
            message: "Basic details fetched successfully",
            data: data,
        });
    } catch (error) {
        console.error("Error fetching basic details:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to fetch basic details",
            error: error.message,
        });
    }
}

export default getAllBasicDetails;
