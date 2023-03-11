import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { StockPricesProvider } from "../../../providers/stocks-price-provider";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";

export class UpdateInvestmentCurrentPriceUsecase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute(userId: string): Promise<ResponseDto> {
    if (!userId) {
      logger.info(
        `[UpdateInvestmentCurrentPriceUsecase]: Missing required parameters`
      );
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investments = await this.investmentRepository.findByUserId(userId);
    if (investments.length === 0) {
      logger.info(
        `[UpdateInvestmentCurrentPriceUsecase]: Investments from user ${userId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    const tickers = investments.map((investment) => investment.ticker);

    logger.info(
      `[UpdateInvestmentCurrentPriceUsecase]: Getting current investments prices`
    );

    const investmentsCurrentPeice = await StockPricesProvider.getCurrentPrices(
      tickers
    );

    logger.info(
      `[UpdateInvestmentCurrentPriceUsecase]: Successfully got current investments prices`
    );

    const investmentUpdate = investments.map(async (investment) => {
      const stock = investmentsCurrentPeice.data.find(
        (stock) => investment.ticker === stock.ticker
      );
      if (!stock) {
        return;
      }

      logger.info(
        `[UpdateInvestmentCurrentPriceUsecase]: Updating investment ${investment.id} with current data`
      );
      await this.investmentRepository.update({
        investmentId: investment.id,
        accountId: investment.accountId ?? "",
        category: investment.category,
        ticker: investment.ticker,
        type: investment.type ?? "",
        pricePerQuantity: stock.price ?? 0,
        totalPrice: stock.price * investment.totalQuantity,
      });

      logger.info(
        `[UpdateInvestmentCurrentPriceUsecase]: Successfully updated investment ${investment.id}`
      );

      return investment.id;
    });

    const result = await Promise.allSettled(investmentUpdate);

    return {
      data: result,
    };
  }
}
