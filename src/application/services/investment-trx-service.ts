import { AppError } from "../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../helpers/errors/messages";
import { PaginationHelper } from "../../helpers/pagination/functions";
import {
  CreateInvestmentTrxDto,
  UpdateInvestmentTrxDto,
} from "../dtos/investment-trx-dto";
import { FindByUserIdDto } from "../dtos/pagination-dto";
import { ResponseDto } from "../dtos/response-dto";
import { InvestmentRepository } from "../repositories/investment-repository";
import { InvestmentTrxRepository } from "../repositories/investment-trx-repository";
import { UserRepository } from "../repositories/user-repository";

export class InvestmentTrxService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly investmentRepository: InvestmentRepository,
    private readonly investmentTrxRepository: InvestmentTrxRepository
  ) {}

  async findByUserId({
    userId,
    pagination,
  }: FindByUserIdDto): Promise<ResponseDto> {
    if (!userId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const investmentsTrx = await this.investmentTrxRepository.findByUserId(
      userId
    );
    const result = investmentsTrx.slice(start, end);

    const metadata = PaginationHelper.getMetadata({
      data: investmentsTrx,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async create({
    userId,
    investmentId,
    pricePerQuantity,
    pricePaid,
    quantity,
  }: CreateInvestmentTrxDto): Promise<ResponseDto> {
    if (!userId || !investmentId || !pricePerQuantity || !quantity) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const investment = await this.investmentRepository.findById(investmentId);
    if (!investment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    const investmentTrx = await this.investmentTrxRepository.create({
      userId,
      investmentId,
      pricePerQuantity,
      quantity,
      pricePaid,
    });

    await this.incrementInvestmentTotals(
      investmentId,
      investment.totalQuantity,
      investment.totalPaidPrice,
      investmentTrx.quantity,
      investmentTrx.pricePaid
    );

    return {
      data: {
        id: investmentTrx.id,
      },
    };
  }

  async update({
    investmentTrxId,
    investmentId,
    pricePerQuantity,
    pricePaid,
    quantity,
  }: UpdateInvestmentTrxDto): Promise<ResponseDto> {
    if (!investmentTrxId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    // Check if investment transaction exists and decremetn from investment metadata
    const investmentTrx = await this.investmentTrxRepository.findById(
      investmentTrxId
    );
    if (!investmentTrx) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_TRX_NOT_FOUND);
    }

    const prevInvestment = await this.investmentRepository.findById(
      investmentTrx.investmentId
    );
    if (!prevInvestment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    await this.decrementInvestmentTotals(
      investmentTrx.investmentId,
      prevInvestment.totalQuantity,
      prevInvestment.totalPaidPrice,
      investmentTrx.quantity,
      investmentTrx.pricePaid
    );

    // Check if new investment metada exists and increments in investment metadata
    const newInvestment = await this.investmentRepository.findById(
      investmentId
    );
    if (!newInvestment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    const newInvestmentTrx = await this.investmentTrxRepository.update({
      investmentTrxId,
      investmentId,
      pricePerQuantity,
      pricePaid,
      quantity,
    });

    await this.incrementInvestmentTotals(
      investmentId,
      newInvestment.totalQuantity,
      newInvestment.totalPaidPrice,
      newInvestmentTrx.quantity,
      newInvestmentTrx.pricePaid
    );

    return { data: { id: newInvestmentTrx.id } };
  }

  async delete(investmentTrxId: string): Promise<ResponseDto> {
    if (!investmentTrxId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investmentTrx = await this.investmentTrxRepository.findById(
      investmentTrxId
    );
    if (!investmentTrx) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_TRX_NOT_FOUND);
    }

    await this.investmentTrxRepository.delete(investmentTrxId);

    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId
    );
    if (!investment) {
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    await this.decrementInvestmentTotals(
      investment.id,
      investment.totalQuantity,
      investment.totalPaidPrice,
      investmentTrx.quantity,
      investmentTrx.pricePaid
    );

    return {
      data: {
        id: investment.id,
      },
    };
  }

  private async incrementInvestmentTotals(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number
  ): Promise<void> {
    await this.investmentRepository.update({
      investmentId,
      totalQuantity: investmentTotalQuantity + quantity,
      totalPaidPrice: investmentTotalPaidPrice + pricePaid,
    });
  }

  private async decrementInvestmentTotals(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number
  ): Promise<void> {
    await this.investmentRepository.update({
      investmentId,
      totalQuantity: investmentTotalQuantity - quantity,
      totalPaidPrice: investmentTotalPaidPrice - pricePaid,
    });
  }
}
