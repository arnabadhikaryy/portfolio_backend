import mongoose from "mongoose";

const project_schema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    discriotion:{
        type:String,
        required: true
    },
    project_link:{
        type:String,
        unique: true
    },
    project_snap_url:{
        type:String
    }
})

const project_model = mongoose.model('projectsmodel',project_schema);

export default project_model;