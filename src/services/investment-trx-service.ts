import {
  CreateInvestmentTrxProps,
  DeleteInvestmentTrxProps,
  FindInvestmentsTrxByUserIdProps,
  FindInvestmentsTrxByUserIdResponse,
  InvestmentTrxProps,
  UpdateInvestmentTrxProps,
} from "@interfaces/investment-trx";
import {
  IInvestmentRepository,
  IInvestmentTrxRepository,
  IUserRepository,
} from "@repositories/index";
import { AppError } from "@utils/app-error";
import { paginationMetadata, sliceParams } from "@utils/functions";
import { logger } from "@utils/logger";

export class InvestmentTrxService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly investmentRepository: IInvestmentRepository,
    private readonly investmentTrxRepository: IInvestmentTrxRepository
  ) {}

  async findTrxByUserId({
    userId,
    pagination,
  }: FindInvestmentsTrxByUserIdProps): Promise<FindInvestmentsTrxByUserIdResponse> {
    if (!userId) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const { start, end } = sliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const investmentsTrx = await this.investmentTrxRepository.findByUserId(
      userId
    );
    const result = investmentsTrx.slice(start, end);

    const metadata = paginationMetadata({
      data: investmentsTrx,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async createInvestmentTrx({
    userId,
    investmentId,
    pricePerQuantity,
    quantity,
  }: CreateInvestmentTrxProps): Promise<InvestmentTrxProps> {
    if (!userId || !investmentId || !pricePerQuantity || !quantity) {
      throw new AppError("Missing required parameter");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const result = await this.investmentTrxRepository.create({
      userId,
      investmentId,
      pricePerQuantity,
      quantity,
    });

    await this.updateInvestmentTotalData(investmentId);
    return result;
  }

  async updateInvestmentTrx({
    id,
    investmentId,
    pricePerQuantity,
    quantity,
  }: UpdateInvestmentTrxProps): Promise<InvestmentTrxProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new AppError("Investment Transaction not found");
    }

    const result = await this.investmentTrxRepository.update({
      id,
      investmentId,
      pricePerQuantity,
      quantity,
    });

    await this.updateInvestmentTotalData(result?.investmentId ?? "");
    return result;
  }

  async deleteInvestmentTrx({
    id,
  }: DeleteInvestmentTrxProps): Promise<InvestmentTrxProps | null> {
    if (!id) {
      throw new AppError("Missing required parameter");
    }

    const investmentTrx = await this.investmentTrxRepository.findById(id);
    if (!investmentTrx) {
      throw new AppError("Investment Transaction not found");
    }

    const result = await this.investmentTrxRepository.delete(id);
    const investment = await this.investmentRepository.findById(
      investmentTrx.investmentId
    );

    await this.updateInvestmentTotalDataOnDelete(
      investment?.id,
      result?.pricePaid,
      result?.quantity,
      investment?.totalPaidPrice,
      investment?.totalQuantity
    );
    return result;
  }

  private async updateInvestmentTotalData(id: string): Promise<void> {
    logger.info(`Updating Investment Total Data: ${id}`);

    try {
      const { totalPaidPrice, totalQuantity } =
        await this.investmentTrxRepository.getTotalDetails(id);

      await this.investmentRepository.update({
        id,
        totalPaidPrice,
        totalQuantity,
      });

      logger.info(`Successfully Updated Investment Total Data: ${id}`);
      logger.info(
        `Updated Investment Total Data with: totalPaidPrice=${totalPaidPrice} totalQuantity=${totalQuantity}`
      );
    } catch (error: any) {
      logger.error(error.message);
    }
  }

  private async updateInvestmentTotalDataOnDelete(
    id: string = "",
    pricePaid: number = 0,
    quantity: number = 0,
    totalPaidPrice: number = 0,
    totalQuantity: number = 0
  ): Promise<void> {
    logger.info(`Updating Investment Total Data On Delete: ${id}`);

    try {
      await this.investmentRepository.update({
        id,
        totalPaidPrice: totalPaidPrice - pricePaid,
        totalQuantity: totalQuantity - quantity,
      });

      logger.info(
        `Successfully Updated Investment Total Data On Delete: ${id}`
      );
    } catch (error) {}
  }
}
