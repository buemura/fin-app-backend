import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { CreateInvestmentTrxDto } from "../../dtos/investment-trx-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";
import { InvestmentTrxRepository } from "../../repositories/investment-trx-repository";
import { UserRepository } from "../../repositories/user-repository";
import { InvestmentTotalsIncrementUsecase } from "./investment-totals-increment-usecase";

// TODO: Write tests for this usecase
export class CreateInvestmentTrxUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly investmentRepository: InvestmentRepository,
    private readonly investmentTrxRepository: InvestmentTrxRepository,
    private readonly investmentTotalsIncrementUsecase: InvestmentTotalsIncrementUsecase
  ) {}

  async execute({
    userId,
    investmentId,
    pricePerQuantity,
    pricePaid,
    quantity,
  }: CreateInvestmentTrxDto): Promise<ResponseDto> {
    if (!userId || !investmentId || !pricePerQuantity || !quantity) {
      logger.info(`[CreateInvestmentTrxUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[CreateInvestmentTrxUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const investment = await this.investmentRepository.findById(investmentId);
    if (!investment) {
      logger.info(
        `[CreateInvestmentTrxUsecase]: Investment ${investmentId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    logger.info(
      `[CreateInvestmentTrxUsecase]: Creating investment trx for investment ${investmentId}`
    );
    const investmentTrx = await this.investmentTrxRepository.create({
      userId,
      investmentId,
      pricePerQuantity,
      quantity,
      pricePaid,
    });

    logger.info(
      `[CreateInvestmentTrxUsecase]: Created investment trx for investment ${investmentId}`
    );

    await this.investmentTotalsIncrementUsecase.execute(
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
}
