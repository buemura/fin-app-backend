import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";
import { InvestmentTrxRepository } from "../../repositories/investment-trx-repository";
import { InvestmentTotalsDecrementUsecase } from "./investment-totals-decrement-usecase";

// TODO: Write tests for this usecase
export class DeleteInvestmentTrxUsecase {
  constructor(
    private readonly investmentRepository: InvestmentRepository,
    private readonly investmentTrxRepository: InvestmentTrxRepository,
    private readonly investmentTotalsDecrementUsecase: InvestmentTotalsDecrementUsecase
  ) {}

  async execute(investmentTrxId: string): Promise<ResponseDto> {
    if (!investmentTrxId) {
      logger.info(`[DeleteInvestmentTrxUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investmentTrx = await this.investmentTrxRepository.findById(
      investmentTrxId
    );
    if (!investmentTrx) {
      logger.info(
        `[DeleteInvestmentTrxUsecase]: Investment Trx ${investmentTrxId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_TRX_NOT_FOUND);
    }

    logger.info(
      `[DeleteInvestmentTrxUsecase]: Deleting investment trx ${investmentTrxId}`
    );
    await this.investmentTrxRepository.delete(investmentTrxId);

    logger.info(
      `[DeleteInvestmentTrxUsecase]: Successfully deleted investment trx ${investmentTrxId}`
    );

    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId
    );
    if (!investment) {
      logger.info(
        `[DeleteInvestmentTrxUsecase]: Investment ${investmentTrx.investmentId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    await this.investmentTotalsDecrementUsecase.execute(
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
}
