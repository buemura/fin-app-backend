import { Response } from "express";

export function handleHttpResponse(
  response: Response,
  statusCode: number,
  data: any
) {
  const statusMessage = statusCode < 400 ? "success" : "failure";

  const responseObject = {
    status: statusMessage,
    data: data,
  };

  return response.status(statusCode).send(responseObject);
}
