import { Request, Response } from "express";

import { ExpenseService } from "@application/services/expense-service";
import {
  InMemoryExpenseRepository,
  InMemoryUserRepository,
  requestMock,
  responseMock,
} from "@tests/__mocks__/";
import { ExpenseController } from "../expense-controller";

describe("Expense controller test suite", () => {
  let request: Request;
  let response: Response;

  let expenseService: ExpenseService;
  let expenseController: ExpenseController;

  beforeEach(() => {
    request = requestMock;
    response = responseMock;

    const userRepository = new InMemoryUserRepository();
    const expenseRepository = new InMemoryExpenseRepository();
    expenseService = new ExpenseService(userRepository, expenseRepository);
    expenseController = new ExpenseController(expenseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Find Expenses by User Id", () => {
    it("should not return 2xx status code", async () => {
      request.params.userId = "";
      await expenseController.findByUserId(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.userId = "user-1";
      request.query.page = "1";
      request.query.items = "5";
      await expenseController.findByUserId(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Create Expenses", () => {
    it("should not return 2xx status code", async () => {
      request.body = {
        userId: "",
        title: "expense",
        imageUrl: "http://example.com",
      };

      await expenseController.create(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 201 status code", async () => {
      request.body = {
        userId: "user-1",
        title: "expense",
        imageUrl: "http://example.com",
      };

      await expenseController.create(request, response);
      expect(response.status).toHaveBeenCalledWith(201);
    });
  });

  describe("Update Expenses", () => {
    it("should not return 2xx status code", async () => {
      request.params.expenseId = "";
      request.body = {
        title: "expense update",
        imageUrl: "http://example.com",
      };

      await expenseController.update(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.expenseId = "expense-1";
      request.body = {
        title: "expense update",
        imageUrl: "http://example.com",
      };

      await expenseController.update(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Update All Expenses", () => {
    it("should not return 2xx status code", async () => {
      jest
        .spyOn(expenseService, "resetPaymentStatus")
        .mockImplementation(() => {
          throw new Error("error");
        });

      await expenseController.resetPaymentStatus(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      await expenseController.resetPaymentStatus(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Delete Expense", () => {
    it("should not return 2xx status code", async () => {
      request.params.expenseId = "";
      await expenseController.delete(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.expenseId = "expense-1";
      await expenseController.delete(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
