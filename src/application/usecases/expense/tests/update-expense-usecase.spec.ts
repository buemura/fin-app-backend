import { InMemoryExpenseRepository } from "../../../../../tests/__mocks__/";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { UpdateExpenseUsecase } from "../update-expense-usecase";

describe("Update Expense Usecase test suite", () => {
  let updateExpenseUsecase: UpdateExpenseUsecase;

  beforeEach(() => {
    const expenseRepository = new InMemoryExpenseRepository();
    updateExpenseUsecase = new UpdateExpenseUsecase(expenseRepository);
  });

  it("should throw an error if user is not found", async () => {
    const result = updateExpenseUsecase.execute({
      expenseId: "not-exists",
      title: "new expense",
      imageUrl: "aaa",
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
  });

  it("should create expense", async () => {
    const result = await updateExpenseUsecase.execute({
      expenseId: "expense-1",
      title: "updated expense",
      imageUrl: "aaa",
    });
    expect(result).not.toBe(null);
    expect(result.data).toHaveProperty("id");
    expect(result.data.id).toBe("expense-1");
  });
});
