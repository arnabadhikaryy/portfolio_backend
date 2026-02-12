import mongoose from "mongoose";

const basic_details_schema = new mongoose.Schema({
    my_name:{
        type: String,
        required: true
    },
    prifile_url:{
        type: String,
        required: true
    },
    profational_profile_pic_url:{
        type: String,
        required: true
    },
    profation:{
        type: String,  // web devloper
        required: true
    },
    linkdin_link:{
        type: String,
        required: true
    },
    github_link:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    date_of_barth:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    pnone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    resume_url:{
        type: String,
        default: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    skills:[
        { 
        skill_name:String, 
        confidance:Number,
        icon_url: String
        }
    ],
})



const basicmodel = mongoose.model('basicmodel',basic_details_schema);

export default basicmodel;