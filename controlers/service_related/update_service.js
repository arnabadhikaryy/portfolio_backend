

import service from "../../models/service_schema.js";

async function updateServiceDetails(req, res) {
    const { _id, title, discriotion, price, icon_url } = req.body;

    // Check if _id is provided
    if (!_id) {
        return res.status(400).send({
            status: false,
            message: "_id is required to update the service",
        });
    }

    try {
        const updatedService = await service.findByIdAndUpdate(
            _id,
            { title, discriotion, price, icon_url },
            { new: true, runValidators: true }
        );

        if (!updatedService) {
            return res.status(404).send({
                status: false,
                message: "Service not found with the given _id",
            });
        }

        return res.send({
            status: true,
            message: "Service details updated successfully",
            data: updatedService,
        });
    } catch (error) {
        console.error("Error updating service:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to update service details",
            error: error.message,
        });
    }
}

export default updateServiceDetails;
