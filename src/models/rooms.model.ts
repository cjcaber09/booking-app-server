import pool from "../config/db";
import { CreateRoomType, RoomIdParam } from "../types/rooms.types";
import { Request, Response } from "express";
export const CreateRoomModel = async (roomData: CreateRoomType) => {
  try {
    const {
      name,
      capacity,
      price,
      description,
      featuredImage,
      images,
      amenities,
    } = roomData;
    const columns = [
      "name",
      "capacity",
      "price",
      description ? "description" : null,
      featuredImage ? "featuredImage" : null,
      images ? "images" : null,
      amenities ? "amenities" : null,
    ];
    const values = [
      name,
      capacity,
      price,
      description,
      featuredImage ? featuredImage : null,
      images ? JSON.stringify(images) : null,
      amenities ? JSON.stringify(amenities) : null,
    ];
    const query = `INSERT INTO rooms (${columns.join(", ")}) VALUES (${values.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const getRoomsModel = async () => {
  try {
    const query = "SELECT * FROM rooms";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const getRoomByIdModel = async (id: number) => {
  try {
    const query = "SELECT * FROM rooms WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
};

export const updateRoomModel = async (
  id: number,
  room: Partial<CreateRoomType>,
) => {
  try {
    const jsonbFields = ["images", "amenities"];

    const columns = Object.keys(room).map(
      (key, index) => `${key} = $${index + 1}`,
    );

    const values = Object.entries(room).map(([key, value]) =>
      jsonbFields.includes(key) ? JSON.stringify(value) : value,
    );
    const query = `UPDATE rooms SET ${columns.join(", ")} WHERE id = $${columns.length + 1} RETURNING *`;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
};

export const deleteRoomModel = async (id: RoomIdParam) => {
  try {
    const query = "DELETE FROM rooms WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
};
