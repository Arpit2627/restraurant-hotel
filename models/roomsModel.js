import mongoose from "mongoose";

const roomSchema= new mongoose.Schema(
    {

price:{
    type:String,
    required:true
},
quantity:{
    type:Number,
    required:true
},
description:{
    type:String,
    required:true
},




}
)
export default mongoose.model("Rooms", roomSchema);
