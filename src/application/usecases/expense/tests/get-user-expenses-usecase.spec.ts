import {
  InMemoryExpenseRepository,
  InMemoryUserRepository,
} from "../../../../../tests/__mocks__/";
import { ERROR_MESSAGE } from "../../../../helpers/errors/messages";
import { DEFAULT_PAGINATION } from "../../../../helpers/pagination/constants";
import { GetUserExpensesUsecase } from "../get-user-expenses-usecase";

describe("Get User Expenses Usecase test suite", () => {
  let getUserExpensesUsecase: GetUserExpensesUsecase;

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository();
    const expenseRepository = new InMemoryExpenseRepository();
    getUserExpensesUsecase = new GetUserExpensesUsecase(
      userRepository,
      expenseRepository
    );
  });

  it("should throw an error if required parameters are missing", async () => {
    const result = getUserExpensesUsecase.execute({
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
    const result = getUserExpensesUsecase.execute({
      userId: "not-exists",
      pagination: {
        page: DEFAULT_PAGINATION.PAGE,
        items: DEFAULT_PAGINATION.ITEMS,
      },
    });
    await expect(result).rejects.toThrow(ERROR_MESSAGE.USER_NOT_FOUND);
  });

  it("should return users expenses", async () => {
    const result = await getUserExpensesUsecase.execute({
      userId: "user-1",
      pagination: {
        page: DEFAULT_PAGINATION.PAGE,
        items: DEFAULT_PAGINATION.ITEMS,
      },
    });
    expect(result).not.toBe(null);
  });
});
