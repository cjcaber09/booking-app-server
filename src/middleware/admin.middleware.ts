import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/users.types";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  // TODO - Implement admin validation logic
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token missing" });
  try {
    // Here you would typically verify the token and check if the user has admin privileges
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    // if the user role is not admin, return 403
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden: Admins only" });
    req.user = decoded; // Attach decoded token to request for further use
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid access token" });
  }
};

export default authenticateAdmin;
