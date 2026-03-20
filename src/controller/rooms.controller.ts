import { Request, Response } from "express";
import {
  CreateRoomType,
  RoomIdParam,
  RoomTypes,
  UpdateRoomType,
} from "../types/rooms.types";
import { BodyRequest, FullRequest, ParamRequest } from "../types/express";
import {
  CreateRoomModel,
  getRoomByIdModel,
  getRoomsModel,
  updateRoomModel,
  deleteRoomModel,
} from "../models/rooms.model";

export const createRoom = async (
  req: BodyRequest<CreateRoomType>,
  res: Response,
) => {
  const stored = await CreateRoomModel(req.body);
  if ("error" in stored)
    return res
      .status(500)
      .json({ message: stored.error?.message || "Error creating room" });
  // TODO - Implement room creation logic
  return res.status(200).json({
    message: stored,
  });
};

export const getRooms = async (req: Request, res: Response) => {
  // TODO - Implement logic to fetch available rooms
  const rooms = await getRoomsModel();
  if (rooms.length === 0)
    return res.status(404).json({ message: "No rooms found" });
  return res.status(200).json({ rooms });
};

export const getRoomById = async (
  req: ParamRequest<RoomIdParam>,
  res: Response,
) => {
  // TODO - Implement logic to fetch room details by ID
  return res.status(200).json({
    message: "Fetching room details not implemented yet",
  });
};

export const updateRoom = async (
  req: FullRequest<RoomIdParam, UpdateRoomType>,
  res: Response,
) => {
  const room = await getRoomByIdModel(req.params.id);
  if (!room) return res.status(404).json({ message: "Room not found" });
  // TODO - Implement logic to update room details
  const updateResult = await updateRoomModel(req.params.id, req.body);
  if ("error" in updateResult)
    return res
      .status(500)
      .json({ message: updateResult.error?.message || "Error updating room" });
  return res
    .status(200)
    .json({ ...updateResult, message: "Room updated successfully" });
};

export const deleteRoom = async (
  req: ParamRequest<RoomIdParam>,
  res: Response,
) => {
  const deleteResult = await deleteRoomModel(req.params.id);
  if ("error" in deleteResult)
    return res
      .status(500)
      .json({ message: deleteResult.error?.message || "Error deleting room" });
  return res.status(200).json({
    message: "Room deleted successfully",
  });
};
