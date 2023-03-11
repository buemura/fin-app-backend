import { InMemoryExpenseRepository } from "../../../../../tests/__mocks__/";
import { ResetExpensesPaymentStatusUsecase } from "../reset-expenses-payment-status-usecase";

describe("Reset Expenses Payment Status Usecase test suite", () => {
  let resetExpensesPaymentStatusUsecase: ResetExpensesPaymentStatusUsecase;

  beforeEach(() => {
    const expenseRepository = new InMemoryExpenseRepository();
    resetExpensesPaymentStatusUsecase = new ResetExpensesPaymentStatusUsecase(
      expenseRepository
    );
  });

  it("should create expense", async () => {
    const result = await resetExpensesPaymentStatusUsecase.execute();
    console.log("@@ result", result);

    expect(result).not.toBe(null);
    expect(result.data).toHaveProperty("message");
    expect(result.data.message).toBe("successfully reset payment status");
  });
});
