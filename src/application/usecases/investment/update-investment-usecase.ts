import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { UpdateInvestmentDto } from "../../dtos/investment-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";

export class UpdateInvestmentUsecase {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async execute({
    investmentId,
    accountId,
    category,
    ticker,
    type,
  }: UpdateInvestmentDto): Promise<ResponseDto> {
    if (!investmentId) {
      logger.info(`[UpdateInvestmentUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const investment = await this.investmentRepository.findById(investmentId);
    if (!investment) {
      logger.info(
        `[UpdateInvestmentUsecase]: Investment ${investmentId} not found`
      );
      throw new AppError(ERROR_MESSAGE.INVESTMENT_NOT_FOUND);
    }

    logger.info(
      `[UpdateInvestmentUsecase]: Updating investment ${investmentId}`
    );
    const result = await this.investmentRepository.update({
      investmentId,
      accountId,
      category,
      ticker,
      type,
    });

    logger.info(
      `[UpdateInvestmentUsecase]: Successfully updating investment ${investmentId}`
    );
    return {
      data: {
        id: result?.id,
      },
    };
  }
}
