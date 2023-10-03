import express from "express"
import { createRoomController } from "../controllers/roomController.js";
const router =express.Router();

router.post(
    "/create-rooms",
    createRoomController
)

export default router;