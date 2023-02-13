import { randomUUID } from "crypto";
import { type ExpenseRepository } from "../../../src/repositories/interfaces/expense-repository";
import {
  type ExpenseProps,
  type CreateExpenseProps,
  type UpdateExpenseProps,
} from "../../../src/interfaces/expense";

export class InMemoryExpenseRepository implements ExpenseRepository {
  private readonly expenses: ExpenseProps[] = [
    {
      id: "expense-1",
      userId: "user-1",
      title: "Expense 1",
      imageUrl: "http://localhost.com/expense",
      isPaid: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<ExpenseProps | null> {
    const expense = this.expenses.find((expense) => expense.id === id);
    if (!expense) {
      return null;
    }

    return expense;
  }

  async findByUserId(userId: string): Promise<ExpenseProps[]> {
    const expense = this.expenses.filter(
      (expense) => expense.userId === userId
    );

    return expense;
  }

  async create(data: CreateExpenseProps): Promise<ExpenseProps> {
    const expense: ExpenseProps = {
      id: randomUUID(),
      userId: data.userId,
      title: data.title,
      isPaid: false,
      isActive: true,
      imageUrl: data.imageUrl ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.expenses.push(expense);
    return expense;
  }

  async update(data: UpdateExpenseProps): Promise<ExpenseProps | null> {
    const expense = this.expenses.find(
      (expense) => expense.id === data.expenseId
    );
    if (!expense) {
      return null;
    }

    expense.title = data?.title ?? expense.title;
    expense.imageUrl = data?.imageUrl ?? expense.imageUrl;
    expense.isPaid = data?.isPaid ?? expense.isPaid;
    expense.isActive = data?.isActive ?? expense.isActive;

    return expense;
  }

  async updateAll(): Promise<void> {
    this.expenses.map((expense) => ({
      ...expense,
      isPaid: false,
    }));
  }

  async delete(id: string): Promise<ExpenseProps | null> {
    const expense = this.expenses.find((expense) => expense.id === id);
    if (!expense) {
      return null;
    }

    expense.isActive = false;

    return expense;
  }
}
