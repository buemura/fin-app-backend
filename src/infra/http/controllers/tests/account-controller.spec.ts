import { Request, Response } from "express";

import {
  InMemoryAccountRepository,
  InMemoryUserRepository,
  requestMock,
  responseMock,
} from "../../../../../tests/__mocks__/";
import {
  CreateAccountUsecase,
  DeleteAccountUsecase,
  GetAccountByIdUsecase,
  GetUserAccountsUsecase,
  UpdateAccountUsecase,
} from "../../../../application/usecases";
import { AccountController } from "../account-controller";

describe("Account controller test suite", () => {
  let request: Request;
  let response: Response;

  let getAccountByIdUsecase: GetAccountByIdUsecase;
  let getUserAccountsUsecase: GetUserAccountsUsecase;
  let createAccountUsecase: CreateAccountUsecase;
  let updateAccountUsecase: UpdateAccountUsecase;
  let deleteAccountUsecase: DeleteAccountUsecase;
  let accountController: AccountController;

  beforeEach(() => {
    request = requestMock;
    response = responseMock;

    const userRepository = new InMemoryUserRepository();
    const accountRepository = new InMemoryAccountRepository();

    getAccountByIdUsecase = new GetAccountByIdUsecase(accountRepository);
    getUserAccountsUsecase = new GetUserAccountsUsecase(
      userRepository,
      accountRepository
    );
    createAccountUsecase = new CreateAccountUsecase(
      userRepository,
      accountRepository
    );
    updateAccountUsecase = new UpdateAccountUsecase(accountRepository);
    deleteAccountUsecase = new DeleteAccountUsecase(accountRepository);

    accountController = new AccountController(
      getAccountByIdUsecase,
      getUserAccountsUsecase,
      createAccountUsecase,
      updateAccountUsecase,
      deleteAccountUsecase
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get Account by Id", () => {
    it("should not return 2xx status code", async () => {
      request.params.id = "";
      await accountController.findById(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.id = "account-1";
      await accountController.findById(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Get Accounts by user Id", () => {
    it("should not return 2xx status code", async () => {
      request.params.userId = "";
      await accountController.findByUserId(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.userId = "user-1";
      await accountController.findByUserId(request, response);
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

      await accountController.create(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 201 status code", async () => {
      request.body = {
        userId: "user-1",
        name: "Itau",
        balance: 500,
        icon: "",
      };

      await accountController.create(request, response);
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

      await accountController.update(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.id = "account-1";
      request.body = {
        name: "itau updated",
        icon: "http://example.com",
      };

      await accountController.update(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Delete Account", () => {
    it("should not return 2xx status code", async () => {
      request.params.id = "";
      await accountController.delete(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.id = "account-1";
      await accountController.delete(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
