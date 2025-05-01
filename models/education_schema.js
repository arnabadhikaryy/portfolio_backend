import mongoose from "mongoose";

const education_achivement_schems = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    discriotion:{
        type:String,
        required: true,
        unique: true
    },
    certificate_url:{
        type:String
    }
})


const educationmodel = mongoose.model('educationmodel',education_achivement_schems);
export default educationmodel;