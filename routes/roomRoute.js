import express from "express"
import { createRoomController,getRoomController,updateRoomController } from "../controllers/roomController.js";
const router =express.Router();

router.post(
    "/create-rooms",
    createRoomController
)


router.get("/get-rooms",getRoomController)
router.put(
    "/update-room/:rid",
    
    updateRoomController
  );
  

export default router;