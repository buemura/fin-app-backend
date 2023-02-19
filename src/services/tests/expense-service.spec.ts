import { ExpenseService } from "../expense-service";
import { RedisService } from "../../../tests/__mocks__/services/RedisSerivce";
import {
  InMemoryUserRepository,
  InMemoryExpenseRepository,
} from "../../../tests/__mocks__/repositories";

describe("Expense service test suite", () => {
  let expenseService: ExpenseService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const expenseRepository = new InMemoryExpenseRepository();
    const redisService = new RedisService();
    expenseService = new ExpenseService(
      userRepository,
      expenseRepository,
      redisService
    );
  });

  describe("Find Expenses by User Id", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = expenseService.findByUser({ userId: "" });
      await expect(result).rejects.toThrow("User id not provided");
    });

    it("should throw an error if user is not found", async () => {
      const result = expenseService.findByUser({ userId: "not-exists" });
      await expect(result).rejects.toThrow("User does not exists");
    });

    it("should return users expenses", async () => {
      const result = await expenseService.findByUser({ userId: "user-1" });
      expect(result).not.toBe(null);
      // expect(result[0].id).toBe("expense-1");
    });
  });

  describe("Create Expense", () => {
    it("should throw an error if user is not found", async () => {
      const result = expenseService.createExpense({
        userId: "not-exists",
        title: "new expense",
        imageUrl: "aaa",
      });
      await expect(result).rejects.toThrow("User does not exists");
    });

    it("should create expense", async () => {
      const result = await expenseService.createExpense({
        userId: "user-1",
        title: "new expense",
        imageUrl: "aaa",
      });
      expect(result).not.toBe(null);
      expect(result).toHaveProperty("id");
      expect(result.userId).toBe("user-1");
      expect(result.title).toBe("new expense");
      expect(result.imageUrl).toBe("aaa");
    });
  });

  describe("Update Expense", () => {
    it("should throw an error if user is not found", async () => {
      const result = expenseService.updateExpense({
        expenseId: "not-exists",
        title: "new expense",
        imageUrl: "aaa",
      });
      await expect(result).rejects.toThrow("Expense does not exists");
    });

    it("should create expense", async () => {
      const result = await expenseService.updateExpense({
        expenseId: "expense-1",
        title: "updated expense",
        imageUrl: "aaa",
      });
      expect(result).not.toBe(null);
      expect(result).toHaveProperty("id");
      expect(result?.userId).toBe("user-1");
      expect(result?.title).toBe("updated expense");
      expect(result?.imageUrl).toBe("aaa");
    });
  });

  describe("Update All Expense", () => {
    it("should create expense", async () => {
      const result = await expenseService.updateAllExpenses();
      expect(result).not.toBe(null);
      expect(result).toHaveProperty("message");
      expect(result.message).toBe("updated all expense payment status");
    });
  });

  describe("Delete Expense", () => {
    it("should throw an error if user is not found", async () => {
      const result = expenseService.deleteExpense({
        expenseId: "not-exists",
      });
      await expect(result).rejects.toThrow("Expense does not exists");
    });

    it("should create expense", async () => {
      const result = await expenseService.deleteExpense({
        expenseId: "expense-1",
      });
      expect(result).not.toBe(null);
      expect(result?.isActive).toBeFalsy();
    });
  });
});
