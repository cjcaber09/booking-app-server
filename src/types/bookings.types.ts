export interface BookingTypes {
  id: number;
  user_id: number;
  room_id: number;
  start_date: Date;
  end_date: Date;
  status: "pending" | "confirmed" | "cancelled";
  payment_method_id: number;
  payment_id?: string;
  created_at?: Date;
  updated_at?: Date;
  booked_by?: string;
}

export type CreateBookingType = Omit<
  BookingTypes,
  "id" | "created_at" | "updated_at"
>;

export type CheckAvailabilityType = Pick<
  BookingTypes,
  "room_id" | "start_date" | "end_date"
>;

export type BookingId = Pick<BookingTypes, "id">;

export type BookingSuccessResponse = Omit<
  BookingTypes,
  "created_at" | "updated_at"
>;

export interface updateBookingType {
  start_date?: Date | undefined;
  end_date?: Date | undefined;
  status?: "pending" | "confirmed" | "cancelled" | undefined;
  payment_method_id?: number | undefined;
  payment_id?: string | undefined;
  booked_by?: string | undefined;
}
