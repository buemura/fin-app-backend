interface GetCurrentPricesDataResponse {
  ticker: string;
  price: number;
}

interface GetCurrentPricesResponse {
  status: string;
  data: GetCurrentPricesDataResponse[];
}

export abstract class StockPricesProvider {
  abstract getCurrentPrices(
    stockList: string[]
  ): Promise<GetCurrentPricesResponse>;
}
