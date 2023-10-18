import hotelBookUser from "../models/hotelBookUser.js";

export const hotelBookController = async (req, res) => {
  try {
    const { name, checkin, checkout, phone, adult, children, idProof, address,parentCategory,parentSubCategory,branch ,roomCount} = req.body;
    // validations
    if (!name || !checkin || !checkout || !phone || !adult || !children || !idProof || !address ||!roomCount) {
      return res.status(400).send({ error: "All fields are required." });
    }

    // save
    const Room = await new hotelBookUser({
      name,
      checkin,
      phone,
      address,
      checkout,
      adult,
      children,
      idProof,
      parentCategory,
      parentSubCategory,
      branch,
      roomCount
    }).save();
    
    res.status(201).send({
      success: true,
      message: "Room Booked Successfully",
      Room,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Room Booking",
      error,
    });
  }
};
