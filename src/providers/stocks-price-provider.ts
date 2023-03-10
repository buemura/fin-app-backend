import axios from "axios";

interface GetCurrentPricesDataResponse {
  ticker: string;
  price: number;
}

interface GetCurrentPricesResponse {
  status: string;
  data: GetCurrentPricesDataResponse[];
}

export class StockPricesProvider {
  private readonly baseUrl =
    process.env.STOCK_SCRAPER_SERVICE_API_URL ?? "http://localhost:5001/api";

  async getCurrentPrices(
    stockList: string[]
  ): Promise<GetCurrentPricesResponse> {
    const body = {
      stocks: stockList,
    };
    const { data } = await axios.post(`${this.baseUrl}/scrape`, body);
    return data;
  }
}
