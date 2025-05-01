import mongoose from "mongoose";

const service_schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    discriotion:{
        type:String,
        required: true
    },
    icon_url:{
        type:String,
        required: true
    },
    price:{ 
        type:Number
    }
}) 


const service = mongoose.model('servicemodel', service_schema)

export default service