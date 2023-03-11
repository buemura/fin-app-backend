import { Request, Response } from "express";

import {
  CreateInvestmentUsecase,
  DeleteInvestmentUsecase,
  GetUserInvestmentsUsecase,
  UpdateInvestmentCurrentPriceUsecase,
  UpdateInvestmentUsecase,
} from "../../../application/usecases";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class InvestmentController {
  constructor(
    private readonly getUserInvestmentsUsecase: GetUserInvestmentsUsecase,
    private readonly createInvestmentUsecase: CreateInvestmentUsecase,
    private readonly updateInvestmentUsecase: UpdateInvestmentUsecase,
    private readonly updateInvestmentCurrentPriceUsecase: UpdateInvestmentCurrentPriceUsecase,
    private readonly deleteInvestmentUsecase: DeleteInvestmentUsecase
  ) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.getUserInvestmentsUsecase.execute({
        userId,
        pagination,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { accountId, category, ticker, type } = request.body;

    try {
      const result = await this.createInvestmentUsecase.execute({
        userId,
        accountId,
        category,
        ticker,
        type,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { investmentId } = request.params;
    const { accountId, category, ticker, type } = request.body;

    try {
      const result = await this.updateInvestmentUsecase.execute({
        investmentId,
        accountId,
        category,
        ticker,
        type,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async updateInvestmentsCurrentPrices(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;

    try {
      const result = await this.updateInvestmentCurrentPriceUsecase.execute(
        userId
      );
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { investmentId } = request.params;

    try {
      const result = await this.deleteInvestmentUsecase.execute(investmentId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
