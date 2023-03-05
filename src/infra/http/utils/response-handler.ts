import { Response } from "express";

import { ResponseDto } from "@application/dtos/response-dto";
import { AppError } from "@helpers/errors/app-error";

export function handleHttpResponse(
  response: Response,
  statusCode: number,
  result: ResponseDto
): Response {
  const statusMessage = statusCode < 400 ? "success" : "failure";

  const responseObject = {
    status: statusMessage,
    metadata: result.metadata ?? null,
    data: result.data ?? null,
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
