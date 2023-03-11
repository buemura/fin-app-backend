import { InMemoryExpenseRepository } from "../../../../../tests/__mocks__/";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { DeleteExpenseUsecase } from "../delete-expense-usecase";

describe("Delete Expense Usecase test suite", () => {
  let deleteExpenseUsecase: DeleteExpenseUsecase;

  beforeEach(() => {
    const expenseRepository = new InMemoryExpenseRepository();
    deleteExpenseUsecase = new DeleteExpenseUsecase(expenseRepository);
  });

  it("should throw an error if user is not found", async () => {
    const result = deleteExpenseUsecase.execute("not-exists");
    await expect(result).rejects.toThrow(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
  });

  it("should create expense", async () => {
    const result = await deleteExpenseUsecase.execute("expense-1");
    expect(result).not.toBe(null);
    expect(result?.data.id).toBe("expense-1");
  });
});
