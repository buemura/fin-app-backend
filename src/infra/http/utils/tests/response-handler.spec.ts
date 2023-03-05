import { Response } from "express";

import { AppError } from "@helpers/errors/app-error";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../response-handler";

describe("Handle http error response test", () => {
  let response: Response;

  beforeEach(() => {
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 500 internal server error", () => {
    const res = handleHttpErrorResponse(
      response,
      new Error("Unexpected error")
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      message: "Internal Server Error",
    });
  });

  it("should return 400 with AppError instance", () => {
    const res = handleHttpErrorResponse(
      response,
      new AppError("Bad request error")
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      message: "Bad request error",
    });
  });

  it("should return 403 with AppError instance", () => {
    const res = handleHttpErrorResponse(
      response,
      new AppError("Forbidden error", 403)
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      message: "Forbidden error",
    });
  });
});

describe("Handle http response test", () => {
  let response: Response;

  beforeEach(() => {
    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return with status failure", () => {
    const res = handleHttpResponse(response, 403, {});
    expect(res.send).toHaveBeenCalledWith({
      status: "failure",
    });
  });

  it("should return with status success", () => {
    const res = handleHttpResponse(response, 200, {});
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
    });
  });

  it("should return with provided data", () => {
    const expectedResponse = {
      data: { message: "test success case" },
      metadata: {
        page: 1,
        items: 5,
        totalPages: 2,
        totalItems: 10,
      },
    };

    const res = handleHttpResponse(response, 200, expectedResponse);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      data: expectedResponse.data,
      metadata: expectedResponse.metadata,
    });
  });
});
