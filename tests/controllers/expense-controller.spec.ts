import { Request, Response } from "express";

import { ExpenseController } from "../../src/controllers/expense-controller";
import { ExpenseService } from "../../src/services/expense-service";
import {
  InMemoryUserRepository,
  InMemoryExpenseRepository,
} from "../__mocks__/repositories";
import { RedisService } from "../__mocks__/services/RedisSerivce";

describe("Expense controller test suite", () => {
  let request: Request;
  let response: Response;

  let expenseService: ExpenseService;
  let expenseController: ExpenseController;

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
    const expenseRepository = new InMemoryExpenseRepository();
    const redisService = new RedisService();
    expenseService = new ExpenseService(
      userRepository,
      expenseRepository,
      redisService
    );
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

      await expenseController.createExpense(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 201 status code", async () => {
      request.body = {
        userId: "user-1",
        title: "expense",
        imageUrl: "http://example.com",
      };

      await expenseController.createExpense(request, response);
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

      await expenseController.updateExpense(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.expenseId = "expense-1";
      request.body = {
        title: "expense update",
        imageUrl: "http://example.com",
      };

      await expenseController.updateExpense(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Update All Expenses", () => {
    it("should not return 2xx status code", async () => {
      jest.spyOn(expenseService, "updateAllExpenses").mockImplementation(() => {
        throw new Error("error");
      });

      await expenseController.updateAllExpense(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      await expenseController.updateAllExpense(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });

  describe("Delete Expense", () => {
    it("should not return 2xx status code", async () => {
      request.params.expenseId = "";
      await expenseController.deleteExpense(request, response);
      expect(response.status).not.toHaveBeenCalledWith(200);
    });

    it("should return 200 status code", async () => {
      request.params.expenseId = "expense-1";
      await expenseController.deleteExpense(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
    });
  });
});
