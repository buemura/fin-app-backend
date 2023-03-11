import { Request, Response } from "express";

import {
  InMemoryUserRepository,
  requestMock,
  responseMock,
} from "../../../../../tests/__mocks__/";
import {
  LoginUserUsecase,
  RegisterUserUsecase,
} from "../../../../application/usecases";
import { AuthController } from "../auth-controller";

describe("Auth controller test suite", () => {
  let request: Request;
  let response: Response;

  let registerUserUsecase: RegisterUserUsecase;
  let loginUserUsecase: LoginUserUsecase;
  let authController: AuthController;

  beforeEach(() => {
    request = requestMock;
    response = responseMock;

    const userRepository = new InMemoryUserRepository();

    registerUserUsecase = new RegisterUserUsecase(userRepository);
    loginUserUsecase = new LoginUserUsecase(userRepository);

    authController = new AuthController(registerUserUsecase, loginUserUsecase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Register User", () => {
    it("should not return 2xx status code", async () => {
      request.body = {
        name: "",
        email: "",
        password: "",
      };

      await authController.register(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.body = {
        name: "user",
        email: "user@example.com",
        password: "password",
      };

      await authController.register(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Login User", () => {
    it("should not return 2xx status code", async () => {
      request.body = {
        name: "",
        email: "",
        password: "",
      };

      await authController.login(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.body = {
        name: "john",
        email: "john@example.com",
        password: "password",
      };

      await authController.login(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
