import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import { AppError } from "../utils/app-error";
import { handleHttpErrorResponse } from "../utils/response-handler";

export function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): null | Response {
  try {
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new AppError("Missing authorization token", 401);
    }

    const token = authorization.replace("Bearer", "").trim();
    if (!token) {
      throw new AppError("Missing authorization token", 401);
    }

    try {
      jwt.verify(token, process.env.TOKEN_SECRET ?? "");
    } catch (error) {
      throw new AppError("Invalid authorization token", 401);
    }

    next();
    return null;
  } catch (err: any) {
    return handleHttpErrorResponse(response, err);
  }
}
