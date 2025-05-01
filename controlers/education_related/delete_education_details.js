import educationModel from "../../models/education_schema.js";

async function deleteEducationDetails(req, res) {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).send({
            status: false,
            message: "Education _id is required",
        });
    }

    try {
        const deletedData = await educationModel.findByIdAndDelete(_id);

        if (!deletedData) {
            return res.status(404).send({
                status: false,
                message: "Education detail not found with the given _id",
            });
        }

        return res.status(200).send({
            status: true,
            message: "Education detail deleted successfully",
            data: deletedData,
        });

    } catch (error) {
        console.error("Error deleting education detail:", error);
        return res.status(500).send({
            status: false,
            message: "An error occurred while deleting education detail",
            error: error.message,
        });
    }
}

export default deleteEducationDetails;
