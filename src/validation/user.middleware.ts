import { ObjectSchema } from "joi";
import userValidation from "./users.validation";
import roomValidation from "./rooms.validation";
import {
  checkAvailabilityValidationSchema,
  bookingsValidationSchema,
} from "./bookings.validation";
import { Request, Response, NextFunction } from "express";
import paymentMethodsValidation from "./payment_methods.validation";

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details?.[0]?.message ?? "Validation error" });
    }
    next();
  };
};

export const validateRegister = validate(userValidation.registerSchema);
export const validateLogin = validate(userValidation.loginSchema);
export const validateRoomSchema = validate(roomValidation.createRoomSchema);
export const validatePaymentMethodSchema = validate(
  paymentMethodsValidation.paymentMethodSchema,
);
export const validateBookingSchema = validate(bookingsValidationSchema);
export const checkRoomAvailability = validate(
  checkAvailabilityValidationSchema,
);
