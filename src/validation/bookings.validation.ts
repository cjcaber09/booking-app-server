import joi from "joi";

export const bookingsValidationSchema = joi.object({
  room_id: joi.number().integer().positive().required(),
  start_date: joi.date().iso().required(),
  end_date: joi.date().iso().greater(joi.ref("start_date")).required(),
  guests: joi.number().integer().positive().required(),
  status: joi
    .string()
    .valid("pending", "confirmed", "cancelled")
    .default("pending"),
  payment_method_id: joi.number().integer().positive().required(),
  payment_id: joi.number().integer().positive().optional(),
  booked_by: joi.number().integer().positive().optional(),
});

export const checkAvailabilityValidationSchema = joi.object({
  room_id: joi.number().integer().positive().required(),
  startDate: joi.date().iso().required(),
  endDate: joi.date().iso().greater(joi.ref("startDate")).required(),
});
