import { randomUUID } from "crypto";

import {
  CreateExpenseDto,
  UpdateExpenseDto,
} from "../../../src/application/dtos/expense-dto";
import { Expense } from "../../../src/application/entities/expense";
import { ExpenseRepository } from "../../../src/application/repositories/expense-repository";

export class InMemoryExpenseRepository implements ExpenseRepository {
  private readonly expenses: Expense[] = [
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

  async findMany(): Promise<Expense[]> {
    return this.expenses;
  }

  async findById(id: string): Promise<Expense | null> {
    const expense = this.expenses.find((expense) => expense.id === id);
    if (!expense) {
      return null;
    }

    return expense;
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    const expense = this.expenses.filter(
      (expense) => expense.userId === userId
    );

    return expense;
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    const expense: Expense = {
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

  async update(data: UpdateExpenseDto): Promise<Expense | null> {
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

  async delete(id: string): Promise<Expense | null> {
    const expense = this.expenses.find((expense) => expense.id === id);
    if (!expense) {
      return null;
    }

    expense.isActive = false;

    return expense;
  }
}
