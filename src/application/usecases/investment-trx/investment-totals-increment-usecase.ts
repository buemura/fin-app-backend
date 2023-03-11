import { logger } from "../../../helpers/logger";
import { InvestmentRepository } from "../../repositories/investment-repository";

// TODO: Write tests for this usecase
export class InvestmentTotalsIncrementUsecase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number
  ): Promise<void> {
    logger.info(
      `[InvestmentTotalsIncrementUsecase]: Incrementing investment ${investmentId} totals`
    );

    await this.investmentRepository.update({
      investmentId,
      totalQuantity: investmentTotalQuantity + quantity,
      totalPaidPrice: investmentTotalPaidPrice + pricePaid,
    });

    logger.info(
      `[InvestmentTotalsIncrementUsecase]: Successfully incremented investment ${investmentId} totals`
    );
  }
}
