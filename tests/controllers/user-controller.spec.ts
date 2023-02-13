import { Request, Response } from "express";

import { UserController } from "../../src/controllers/user-controller";
import { UserService } from "../../src/services/user-service";
import { InMemoryUserRepository } from "../__mocks__/repositories";

describe("User controller test suite", () => {
  let request: Request;
  let response: Response;

  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    request = {
      params: {},
      body: {},
    } as Request;

    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

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
      await userController.getUserDetails(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.userId = "user-1";
      await userController.getUserDetails(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Sign Up", () => {
    it("should not return 2xx status code", async () => {
      request.body = {
        name: "",
        email: "",
        password: "",
      };

      await userController.signUp(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.body = {
        name: "user",
        email: "user@example.com",
        password: "password",
      };

      await userController.signUp(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Sign In", () => {
    it("should not return 2xx status code", async () => {
      request.body = {
        name: "",
        email: "",
        password: "",
      };

      await userController.signIn(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.body = {
        name: "john",
        email: "john@example.com",
        password: "password",
      };

      await userController.signIn(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
