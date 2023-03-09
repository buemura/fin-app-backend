import { Request, Response } from "express";

import { AccountService } from "../../../application/services/account-service";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.accountService.findById(id);
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
      const result = await this.accountService.findByUserId({
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
      const result = await this.accountService.create({
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
      const result = await this.accountService.update({
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
      const result = await this.accountService.delete(id);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
