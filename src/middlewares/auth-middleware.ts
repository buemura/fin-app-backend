import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { handleHttpErrorResponse } from "@helpers/handle-http-error-response";
import { AppError } from "@utils/app-error";

export function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
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
      jwt.verify(token, process.env.TOKEN_SECRET || "");
    } catch (error) {
      throw new AppError("Invalid authorization token", 401);
    }

    return next();
  } catch (err: any) {
    return handleHttpErrorResponse(response, err);
  }
}
