import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/users.types";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const generateToken = (tokenPayload: TokenPayload) => {
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
  return token as string;
};
