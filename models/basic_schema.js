import mongoose from "mongoose";

const basic_details_schema = new mongoose.Schema({
    // --- Basic Information ---
    my_name: {
        type: String,
        required: true
    },
    prifile_url: {
        type: String,
        required: true
    },
    profational_profile_pic_url: {
        type: String,
        required: true
    },
    profation: {
        type: String,  // e.g., "Web Developer"
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pnone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date_of_barth: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    
    // --- Social Links ---
    linkdin_link: {
        type: String,
        required: true
    },
    github_link: {
        type: String,
        required: true
    },

    // --- Resume ---
    resume_url: {
        type: String,
        default: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },

    // --- About Section (Added as a useful extra field) ---
    about_me: {
        type: String,
        default: " "
    },
    my_password:{
        type:String
    },
    your_ui_name:{
        type:String
    },
    exprience:{
        type:Number
    },
    project_count:{
        type:Number
    },

    // --- 1. SKILLS ARRAY ---
    skills: [
        { 
            skill_name: String, 
            confidance: Number,
            icon_url: String
        }
    ],

    // --- 2. EDUCATION ARRAY (Merged from education_schema.js) ---
    education: [
        {
            title: {
                type: String,
                required: true
            },
            discriotion: { 
                type: String,
                required: true
            },
            certificate_url: {
                type: String,
                default: ""
            },
            start_year: { // Added helpful field
                type: String,
                default: ""
            },
            end_year: { // Added helpful field
                type: String,
                default: ""
            }
        }
    ],

    // --- 3. PROJECTS ARRAY (Merged from project_schema.js) ---
    projects: [
        {
            title: {
                type: String,
                required: true,
            },
            discriotion: {
                type: String,
                required: true
            },
            project_link: {
                type: String,
                default: ""
            },
            project_snap_url: {
                type: String,
                default: ""
            },
            technologies_used: { // Added helpful field (e.g., "React, Node, Mongo")
                type: String, 
                default: ""
            }
        }
    ]

}, { timestamps: true }); // timestamps adds createdAt and updatedAt automatically

const basicmodel = mongoose.model('basicmodel', basic_details_schema);

export default basicmodel;