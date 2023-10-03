import roomsModel from "../models/roomsModel.js";
export const createRoomController =async(req,res)=>{

try{
const {price,quantity,description,category}=req.body;

if(!price){
    return res.status(401).send({message:"Price is Required "})
}
if(!quantity){
    return res.status(401).send({message:"Price is Required "})
}if(!description){
    return res.status(401).send({message:"Price is Required "})
}


const rooms = await new roomsModel({
    price,quantity,description,category
}).save();
res.status(201).send({
    success: true,
    message: "Rooms created successfully",
    rooms,
  });



}

catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Rooms",
    });
  }


}