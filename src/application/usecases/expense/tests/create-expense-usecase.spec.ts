import {
  InMemoryExpenseRepository,
  InMemoryUserRepository,
} from "../../../../../tests/__mocks__/";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { CreateExpenseUsecase } from "../create-expense-usecase";

describe("Create Expense Usecase test suite", () => {
  let createExpenseUsecase: CreateExpenseUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const expenseRepository = new InMemoryExpenseRepository();
    createExpenseUsecase = new CreateExpenseUsecase(
      userRepository,
      expenseRepository
    );
  });

  it("should throw an error if user is not found", async () => {
    const result = createExpenseUsecase.execute({
      userId: "not-exists",
      title: "new expense",
      imageUrl: "aaa",
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
  });

  it("should create expense", async () => {
    const result = await createExpenseUsecase.execute({
      userId: "user-1",
      title: "new expense",
      imageUrl: "aaa",
    });
    expect(result).not.toBe(null);
    expect(result.data).toHaveProperty("id");
  });
});
