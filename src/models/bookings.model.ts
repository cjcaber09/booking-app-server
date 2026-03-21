import pool from "../config/db";
import {
  BookingId,
  CreateBookingType,
  updateBookingType,
} from "../types/bookings.types";

export const checkRoomAvailabilityModel = async (
  room_id: number,
  start_date: Date,
  end_date: Date,
) => {
  try {
    const query = `
      SELECT * FROM bookings
      WHERE room_id = $1
        AND start_date < $3
        AND end_date > $2
    `;
    const values = [room_id, start_date, end_date];
    const result = await pool.query(query, values);
    return result.rows.length === 0; // Return true if no conflicting bookings
  } catch (error) {
    console.error("Error checking room availability:", error);
    throw error;
  }
};

export const createBookingModel = async (bookingData: CreateBookingType) => {
  try {
    const { user_id, room_id, start_date, end_date, payment_method_id } =
      bookingData;
    const query = `
      INSERT INTO bookings (user_id, room_id, start_date, end_date, payment_method_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [user_id, room_id, start_date, end_date, payment_method_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getBookingByIdModel = async (id: BookingId) => {
  try {
    const query = "SELECT * FROM bookings WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
};

export const updateBookingModel = async (
  id: BookingId,
  updateData: updateBookingType,
) => {
  try {
    const fields = Object.keys(updateData)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = [id, ...Object.values(updateData)];
    const query = `UPDATE bookings SET ${fields} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};
