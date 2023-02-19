import { NextFunction, Request, Response } from "express";
import { ensureAuthentication } from "../auth-middleware";

describe("ensureAuthentication()", () => {
  let request: Request;
  let response: Response;
  let next: NextFunction;

  beforeEach(() => {
    request = {
      headers: {
        authorization: "Bearer abcd1234",
      },
    } as Request;

    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnValue(null),
    } as unknown as Response;

    next = jest.fn().mockReturnThis();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not throw when valid token is provided", () => {
    expect(() => ensureAuthentication(request, response, next)).not.toThrow();
  });

  it("should call handleHttpErrorResponse() when no authorization header is provided", () => {
    request.headers.authorization = "";
    ensureAuthentication(request, response, next);
    expect(response.status).toHaveBeenCalledWith(401);
  });

  it("should call handleHttpErrorResponse() when invalid token is provided", () => {
    process.env.TOKEN_SECRET = "test-secret";
    request.headers.authorization = "Bearer invalid-token";
    ensureAuthentication(request, response, next);
    expect(response.status).toHaveBeenCalledWith(401);
  });
});
