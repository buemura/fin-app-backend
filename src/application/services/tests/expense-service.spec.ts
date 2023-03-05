import { ERROR_MESSAGE } from "@helpers/errors/messages";
import { DEFAULT_PAGINATION } from "@helpers/pagination/constants";
import {
  InMemoryExpenseRepository,
  InMemoryUserRepository,
} from "@tests/__mocks__/";
import { ExpenseService } from "../expense-service";

describe("Expense service test suite", () => {
  let expenseService: ExpenseService;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const expenseRepository = new InMemoryExpenseRepository();
    expenseService = new ExpenseService(userRepository, expenseRepository);
  });

  describe("Find Expenses by User Id", () => {
    it("should throw an error if required parameters are missing", async () => {
      const result = expenseService.findByUserId({
        userId: "",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      await expect(result).rejects.toThrow(
        ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS
      );
    });

    it("should throw an error if user is not found", async () => {
      const result = expenseService.findByUserId({
        userId: "not-exists",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
    });

    it("should return users expenses", async () => {
      const result = await expenseService.findByUserId({
        userId: "user-1",
        pagination: {
          page: DEFAULT_PAGINATION.PAGE,
          items: DEFAULT_PAGINATION.ITEMS,
        },
      });
      expect(result).not.toBe(null);
    });
  });

  describe("Create Expense", () => {
    it("should throw an error if user is not found", async () => {
      const result = expenseService.create({
        userId: "not-exists",
        title: "new expense",
        imageUrl: "aaa",
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
    });

    it("should create expense", async () => {
      const result = await expenseService.create({
        userId: "user-1",
        title: "new expense",
        imageUrl: "aaa",
      });
      expect(result).not.toBe(null);
      expect(result.data).toHaveProperty("id");
    });
  });

  describe("Update Expense", () => {
    it("should throw an error if user is not found", async () => {
      const result = expenseService.update({
        expenseId: "not-exists",
        title: "new expense",
        imageUrl: "aaa",
      });
      await expect(result).rejects.toThrow(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    });

    it("should create expense", async () => {
      const result = await expenseService.update({
        expenseId: "expense-1",
        title: "updated expense",
        imageUrl: "aaa",
      });
      expect(result).not.toBe(null);
      expect(result.data).toHaveProperty("id");
      expect(result.data.id).toBe("expense-1");
    });
  });

  describe("Update All Expense", () => {
    it("should create expense", async () => {
      const result = await expenseService.resetPaymentStatus();
      console.log("@@ result", result);

      expect(result).not.toBe(null);
      expect(result.data).toHaveProperty("message");
      expect(result.data.message).toBe("successfully reset payment status");
    });
  });

  describe("Delete Expense", () => {
    it("should throw an error if user is not found", async () => {
      const result = expenseService.delete("not-exists");
      await expect(result).rejects.toThrow(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    });

    it("should create expense", async () => {
      const result = await expenseService.delete("expense-1");
      expect(result).not.toBe(null);
      expect(result?.data.id).toBe("expense-1");
    });
  });
});
