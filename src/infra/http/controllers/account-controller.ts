import { Request, Response } from "express";

import {
  CreateAccountUsecase,
  DeleteAccountUsecase,
  GetAccountByIdUsecase,
  GetUserAccountsUsecase,
  UpdateAccountUsecase,
} from "../../../application/usecases";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class AccountController {
  constructor(
    private readonly getAccountByIdUsecase: GetAccountByIdUsecase,
    private readonly getUserAccountsUsecase: GetUserAccountsUsecase,
    private readonly createAccountUsecase: CreateAccountUsecase,
    private readonly updateAccountUsecase: UpdateAccountUsecase,
    private readonly deleteAccountUsecase: DeleteAccountUsecase
  ) {}

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.getAccountByIdUsecase.execute(id);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.getUserAccountsUsecase.execute({
        pagination,
        userId,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { name, balance, icon } = request.body;

    try {
      const result = await this.createAccountUsecase.execute({
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

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, balance, icon } = request.body;

    try {
      const result = await this.updateAccountUsecase.execute({
        accountId: id,
        name,
        balance,
        icon,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.deleteAccountUsecase.execute(id);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
