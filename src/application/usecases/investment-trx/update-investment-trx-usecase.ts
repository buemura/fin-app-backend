import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { UpdateInvestmentTrxDto } from "../../dtos/investment-trx-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";
import { InvestmentTrxRepository } from "../../repositories/investment-trx-repository";
import { InvestmentTotalsDecrementUsecase } from "./investment-totals-decrement-usecase";
import { InvestmentTotalsIncrementUsecase } from "./investment-totals-increment-usecase";

// TODO: Write tests for this usecase
export class UpdateInvestmentTrxUsecase {
  constructor(
    private readonly investmentRepository: InvestmentRepository,
    private readonly investmentTrxRepository: InvestmentTrxRepository,
    private readonly investmentTotalsIncrementUsecase: InvestmentTotalsIncrementUsecase,
    private readonly investmentTotalsDecrementUsecase: InvestmentTotalsDecrementUsecase
  ) {}

  async execute({
    investmentTrxId,
    investmentId,
    pricePerQuantity,
    pricePaid,
    quantity,
  }: UpdateInvestmentTrxDto): Promise<ResponseDto> {
    if (!investmentTrxId) {
      logger.info(`[UpdateInvestmentTrxUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    // Check if investment transaction exists and decremetn from investment metadata
    const investmentTrx = await this.investmentTrxRepository.findById(
      investmentTrxId
    );
    if (!investmentTrx) {
      logger.info(
        `[UpdateInvestmentTrxUsecase]: Investment Trx ${investmentTrxId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_TRX_NOT_FOUND);
    }

    const prevInvestment = await this.investmentRepository.findById(
      investmentTrx.investmentId
    );
    if (!prevInvestment) {
      logger.info(
        `[UpdateInvestmentTrxUsecase]: Previous Investment ${investmentTrx.investmentId}`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    await this.investmentTotalsDecrementUsecase.execute(
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
      logger.info(
        `[UpdateInvestmentTrxUsecase]: New Investment ${investmentId}`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    logger.info(
      `[UpdateInvestmentTrxUsecase]: Updating Investment Trx ${investmentTrxId}`
    );

    const newInvestmentTrx = await this.investmentTrxRepository.update({
      investmentTrxId,
      investmentId,
      pricePerQuantity,
      pricePaid,
      quantity,
    });

    logger.info(
      `[UpdateInvestmentTrxUsecase]: Successfully updated Investment Trx ${investmentTrxId}`
    );

    await this.investmentTotalsIncrementUsecase.execute(
      investmentId,
      newInvestment.totalQuantity,
      newInvestment.totalPaidPrice,
      newInvestmentTrx.quantity,
      newInvestmentTrx.pricePaid
    );

    return { data: { id: newInvestmentTrx.id } };
  }
}
