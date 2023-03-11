import { logger } from "../../../helpers/logger";
import { InvestmentRepository } from "../../repositories/investment-repository";

// TODO: Write tests for this usecase
export class InvestmentTotalsDecrementUsecase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(
    investmentId: string,
    investmentTotalQuantity: number,
    investmentTotalPaidPrice: number,
    quantity: number,
    pricePaid: number
  ): Promise<void> {
    logger.info(
      `[InvestmentTotalsDecrementUsecase]: Decrementing investment ${investmentId} totals`
    );

    await this.investmentRepository.update({
      investmentId,
      totalQuantity: investmentTotalQuantity - quantity,
      totalPaidPrice: investmentTotalPaidPrice - pricePaid,
    });

    logger.info(
      `[InvestmentTotalsDecrementUsecase]: Successfully decremented investment ${investmentId} totals`
    );
  }
}
