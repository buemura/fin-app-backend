import { type Response } from "express";
import { AppError } from "./app-error";

export function handleHttpResponse(
  response: Response,
  statusCode: number,
  data: any
): Response {
  const statusMessage = statusCode < 400 ? "success" : "failure";

  const responseObject = {
    status: statusMessage,
    data,
  };

  return response.status(statusCode).send(responseObject);
}

export function handleHttpErrorResponse(
  response: Response,
  error: Error
): Response {
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
