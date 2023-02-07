import { type Request, type Response } from "express";
import { handleHttpErrorResponse } from "../helpers/handle-http-error-response";
import { handleHttpResponse } from "../helpers/handle-http-response";
import { type AccountService } from "../services/account-service";

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  async getAccountById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.accountService.getAccountById({ id });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async getAccountsByUserId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;

    try {
      const result = await this.accountService.getAccountsByUserId({ userId });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async createAccount(request: Request, response: Response): Promise<Response> {
    const { userId, name, balance, icon } = request.body;

    try {
      const result = await this.accountService.createAccount({
        userId,
        name,
        balance,
        icon,
      });
      return handleHttpResponse(response, 201, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async updateAccount(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, balance, icon } = request.body;

    try {
      const result = await this.accountService.updateAccount({
        id,
        name,
        balance,
        icon,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async deleteAccount(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.accountService.deleteAccount({ id });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
