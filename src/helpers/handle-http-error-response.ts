import { Response } from "express";
import { AppError } from "@utils/app-error";

export function handleHttpErrorResponse(response: Response, error: Error) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).send({
    status: "error",
    message: "Internal Server Error",
  });
}
