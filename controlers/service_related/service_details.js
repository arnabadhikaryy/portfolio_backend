import service from "../../models/service_schema.js";

async function service_details(req, res) {
    const { title, discriotion, price, icon_url } = req.body;

    // Validate input
    if (!title || !discriotion || !price || !icon_url) {
        return res.status(400).send({
            status: false,
            message: "All fields (title, discriotion, price, icon_url) are required.",
        });
    }

    const data = new service({
        title,
        discriotion,
        price,
        icon_url
    });

    try {
        const response = await data.save();
        return res.send({
            status: true,
            message: "Service details saved successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error saving service:", error);
        return res.status(500).send({
            status: false,
            message: "Failed to save service details",
            error: error.message,
        });
    }
}

export default service_details;
