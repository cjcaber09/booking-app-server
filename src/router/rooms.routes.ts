import {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} from "../controller/rooms.controller";
import express from "express";
import adminMiddleware from "../middleware/admin.middleware";
import { validateRoomSchema } from "../validation/user.middleware";

const router = express.Router();

router.get("/", getRooms);
router.post("/create", adminMiddleware, validateRoomSchema, createRoom);
router.put("/:id", adminMiddleware, validateRoomSchema, updateRoom);
router.delete("/:id", adminMiddleware, deleteRoom);

export default router;
