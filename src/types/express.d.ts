import { User } from "../types/users.types";
import { Request } from "express";

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

export type ParamRequest<P> = ParamsDictionary & Request<P>;
export type BodyRequest<B> = Request<{}, {}, B>;
export type QueryRequest<Q> = Request<{}, {}, {}, Q>;
export type FullRequest<P, B> = Request<P & ParamsDictionary, any, B, ParsedQs>;