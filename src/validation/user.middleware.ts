import { ObjectSchema } from "joi";
import userValidation from "../validation/user.validation";
import roomValidation from "../validation/room.validation";
import { Request, Response, NextFunction } from "express";

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