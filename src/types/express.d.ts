import { User } from "../types/users.types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface ErrorResponse {
  message: string;
  error?: any;
}
