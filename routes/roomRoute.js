
import express from "express"
import { createRoomController,getRoomController,updateRoomController ,bookRoomController} from "../controllers/roomController.js";
const router =express.Router();

router.post(
    "/create-rooms",
    createRoomController
)

router.post("/book-rooms",bookRoomController);
router.get("/get-rooms",getRoomController)
router.put(
    "/update-room/:rid",
    
    updateRoomController
  );
  

export default router;