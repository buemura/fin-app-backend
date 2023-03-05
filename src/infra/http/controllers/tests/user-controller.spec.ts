import { Request, Response } from "express";

import {
  InMemoryUserRepository,
  requestMock,
  responseMock,
} from "../../../../../tests/__mocks__/";
import { UserService } from "../../../../application/services/user-service";
import { UserController } from "../user-controller";

describe("User controller test suite", () => {
  let request: Request;
  let response: Response;

  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    request = requestMock;
    response = responseMock;

    const userRepository = new InMemoryUserRepository();
    userService = new UserService(userRepository);
    userController = new UserController(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get user details", () => {
    it("should not return 2xx status code", async () => {
      request.params.userId = "";
      await userController.findById(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.userId = "user-1";
      await userController.findById(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
