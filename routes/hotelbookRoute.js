import express from "express";
import { hotelBookController} from "../controllers/hotelBookController.js";

const router = express.Router();

//routes
//Method - POST
router.post("/book-a-room",hotelBookController);


//Method - GET
// router.get("/get-bills/:id",getBillsController);


//Method - GET
// router.get("/get-bills",getAllBillsController);



export default router;