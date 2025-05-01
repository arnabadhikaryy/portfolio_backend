import basicmodel from "../../models/basic_schema.js";

async function uploadBasicDetails(req, res) {
    const { my_name,prifile_url,profational_profile_pic_url,profation,linkdin_link,github_link,address,date_of_barth,language,pnone,email, skills
    } = req.body;

    // Basic validation
    if (!my_name || !prifile_url || !profational_profile_pic_url || !profation || !linkdin_link || !github_link || !address || !date_of_barth || !language || !pnone || !email || !skills) {
        return res.status(400).send({
            status: false,
            message: "All fields including 'skills' are required.",
        });
    }

    const basicDetails = new basicmodel({
        my_name,
        prifile_url,
        profational_profile_pic_url,
        profation,
        linkdin_link,
        github_link,
        address,
        date_of_barth,
        language,
        pnone,
        email,
        skills,
    });

    try {
        const savedData = await basicDetails.save();
        return res.send({
            status: true,
            message: "Basic details uploaded successfully",
            data: savedData,
        });
    } catch (error) {
        console.error("Error saving basic details:", error);
        return res.send({
            status: false,
            message: "Failed to upload basic details",
            error: error.message,
        });
    }
}

export default uploadBasicDetails;
