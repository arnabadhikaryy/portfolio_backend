
import service from "../../models/service_schema.js";

async function getAllServiceDetails(req, res) {
    try {
        const services = await service.find();

        if (!services || services.length === 0) {
            return res.status(404).send({
                status: false,
                message: "No service details found",
            });
        }

        return res.send({
            status: true,
            message: "Service details fetched successfully",
            data: services,
        });
    } catch (error) {
        console.error("Error fetching service details:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to fetch service details",
            error: error.message,
        });
    }
}

export default getAllServiceDetails;
