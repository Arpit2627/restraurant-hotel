import express from "express"
import { createRoomController ,bookRoomController} from "../controllers/roomController.js";
const router =express.Router();

router.post(
    "/create-rooms",
    createRoomController
)
router.post("/book-rooms",bookRoomController);
export default router;