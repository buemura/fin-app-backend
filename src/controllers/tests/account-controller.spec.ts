import { Request, Response } from "express";

import { AccountController } from "../account-controller";
import { AccountService } from "../../services/account-service";
import {
  InMemoryUserRepository,
  InMemoryAccountRepository,
  RedisService,
  requestMock,
  responseMock,
} from "../../../tests/__mocks__/";

describe("Account controller test suite", () => {
  let request: Request;
  let response: Response;

  let accountService: AccountService;
  let accountController: AccountController;

  beforeEach(() => {
    request = requestMock;
    response = responseMock;

    const userRepository = new InMemoryUserRepository();
    const accountRepository = new InMemoryAccountRepository();
    const redisService = new RedisService();
    accountService = new AccountService(
      userRepository,
      accountRepository,
      redisService
    );
    accountController = new AccountController(accountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get Account by Id", () => {
    it("should not return 2xx status code", async () => {
      request.params.id = "";
      await accountController.getAccountById(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.id = "account-1";
      await accountController.getAccountById(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Get Accounts by user Id", () => {
    it("should not return 2xx status code", async () => {
      request.params.userId = "";
      await accountController.getAccountsByUserId(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.userId = "user-1";
      await accountController.getAccountsByUserId(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Create Account", () => {
    it("should not return 2xx status code", async () => {
      request.body = {
        userId: "",
        name: "Itau",
        balance: 500,
        icon: "",
      };

      await accountController.createAccount(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 201 status code", async () => {
      request.body = {
        userId: "user-1",
        name: "Itau",
        balance: 500,
        icon: "",
      };

      await accountController.createAccount(request, response);
      expect(response.status).toHaveBeenCalledWith(201);
    });
  });

  describe("Update Account", () => {
    it("should not return 2xx status code", async () => {
      request.params.id = "";
      request.body = {
        name: "itau updated",
        icon: "http://example.com",
      };

      await accountController.updateAccount(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.id = "account-1";
      request.body = {
        name: "itau updated",
        icon: "http://example.com",
      };

      await accountController.updateAccount(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Delete Account", () => {
    it("should not return 2xx status code", async () => {
      request.params.id = "";
      await accountController.deleteAccount(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.id = "account-1";
      await accountController.deleteAccount(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
