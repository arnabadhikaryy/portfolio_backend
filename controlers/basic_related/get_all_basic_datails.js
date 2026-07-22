import basicmodel from "../../models/basic_schema.js";

async function getBasicDetails(req, res) {
    try {
        console.log("getBasicDetails function called");
        // 1. Extract user_id from the request body
        const { user_id } = req.body;

        // 2. Validate that user_id was provided
        if (!user_id) {
            return res.status(400).send({
                status: false,
                message: "user_id is required in the request body",
            });
        }

        // 3. Find the document matching the user_id
        // Using findOne() since user_id is unique in your schema
        const data = await basicmodel.findOne({ user_id: user_id });

        // 4. Handle the case where no matching data is found
        if (!data) {
            return res.status(404).send({
                status: false,
                message: "No basic details found for the provided user_id",
            });
        }

        // 5. Send successful response
        return res.status(200).send({
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

export default getBasicDetails;