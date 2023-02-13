import { type Response } from "express";
import { handleHttpResponse } from "../../src/utils/response-handler";

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
      data: {},
    });
  });

  it("should return with status success", () => {
    const res = handleHttpResponse(response, 200, {});
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      data: {},
    });
  });

  it("should return with provided data", () => {
    const expectedData = { message: "test success case" };

    const res = handleHttpResponse(response, 200, expectedData);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      data: expectedData,
    });
  });
});
