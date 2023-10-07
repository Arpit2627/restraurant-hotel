import hotelBookUser from "../models/hotelBookUser.js";
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
export const bookRoomController =async(req,res)=>{

try{
const {name,checkin,checkout,people,phone,address,idProof}=req.body;

if(!checkin){
    return res.status(401).send({message:"checkin is Required "})
}
if(!checkout){
    return res.status(401).send({message:"checkout is Required "})
}if(!name){
    return res.status(401).send({message:"name is Required "})
}
if(!people){
    return res.status(401).send({message:"people is Required "})
}
if(!phone){
    return res.status(401).send({message:"people is Required "})
}
if(!address){
    return res.status(401).send({message:"people is Required "})
}
if(!idProof){
    return res.status(401).send({message:"people is Required "})
}
const rooms = await new hotelBookUser({
    name,checkin,checkout,people,phone,address,idProof
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