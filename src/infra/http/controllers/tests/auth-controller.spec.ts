import { Request, Response } from "express";

import {
  InMemoryUserRepository,
  requestMock,
  responseMock,
} from "../../../../../tests/__mocks__/";
import { AuthService } from "../../../../application/services/auth-service";
import { AccessTokenProviderImpl } from "../../../providers/access-token-provider";
import { PasswordHashProviderImpl } from "../../../providers/password-hash-provider";
import { AuthController } from "../auth-controller";

describe("Auth controller test suite", () => {
  let request: Request;
  let response: Response;

  let authService: AuthService;
  let authController: AuthController;

  beforeEach(() => {
    request = requestMock;
    response = responseMock;

    const userRepository = new InMemoryUserRepository();
    const passwordHashProvider = new PasswordHashProviderImpl();
    const accessTokenProvider = new AccessTokenProviderImpl();
    authService = new AuthService(
      userRepository,
      passwordHashProvider,
      accessTokenProvider
    );
    authController = new AuthController(authService);
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
