import { Request, Response } from "express";
import {
  checkRoomAvailabilityModel,
  createBookingModel,
  getBookingByIdModel,
  updateBookingModel,
} from "../models/bookings.model";
import { FullRequest } from "../types/express";
import {
  CheckAvailabilityType,
  updateBookingType,
  BookingId,
} from "../types/bookings.types";

export const createBooking = async (req: Request, res: Response) => {
  // TODO - Implement logic to create a new booking
  let { room_id, start_date, end_date, payment_method_id } = req.body;
  let user_id = req.user.id;

  // check availability of the room for the given date range
  // if available, create the booking and associate it with the user and payment method
  const isAvailable = await checkRoomAvailabilityModel(
    room_id,
    start_date,
    end_date,
  );
  if (!isAvailable) {
    return res
      .status(400)
      .json({ message: "Room is not available for the selected dates" });
  }
  if (isAvailable) {
    // TODO - Implement booking creation logic
    // Insert booking into the database with the provided details
    const bookingAdded = await createBookingModel({
      user_id,
      room_id,
      start_date,
      end_date,
      status: "pending",
      payment_method_id,
    });
    // Associate the booking with the user and payment method
    res.status(201).json({
      message: "Booking created successfully",
    });
  }
};;

export const updateBooking = async (
  req: FullRequest<BookingId, updateBookingType>,
  res: Response,
) => {
  let { id } = req.params;
  let {
    start_date,
    end_date,
    status,
    payment_method_id,
    payment_id,
    booked_by,
  } = req.body;
  // TODO - Implement logic to update an existing booking
  // Validate the booking ID and update the booking details in the database
  const booking = await getBookingByIdModel(id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  // TODO - Implement logic to update the booking details based on the provided data
  const updateResult = await updateBookingModel(id, {
    start_date,
    end_date,
    status,
    payment_method_id,
    payment_id,
    booked_by,
  });
  // TODO - Implement logic to update an existing booking
  res.status(200).json(updateResult);
};

export const updateBookingStatus = async (
  req: FullRequest<
    BookingId,
    { status: "pending" | "confirmed" | "cancelled" }
  >,
  res: Response,
) => {
  let { id } = req.params;
  let { status } = req.body;
  // TODO - Implement logic to update the status of an existing booking
  const booking = await getBookingByIdModel(id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  const updateResult = await updateBookingModel(id, { status });
  res.status(200).json(updateResult);
};
export const checkRoomAvailability = async (
  req: FullRequest<{}, CheckAvailabilityType>,
  res: Response,
) => {
  // TODO - Implement logic to check room availability for given date range
  let { room_id, start_date, end_date } = req.query;
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  // check availability of the room for the given date range
  const isAvailable = await checkRoomAvailabilityModel(
    room_id,
    startDate,
    endDate,
  );
  if (!isAvailable) {
    return res
      .status(400)
      .json({ message: "Room is not available for the selected dates" });
  }

  // TODO - Implement room availability check logic
  res.status(200).json({
    message: "Room is available for the selected dates",
  });
};

