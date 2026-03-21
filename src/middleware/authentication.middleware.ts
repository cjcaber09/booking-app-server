import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { TokenPayload } from "../types/users.types";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded token to request for further use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid access token" });
  }
};
