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
  static async getCurrentPrices(
    stockList: string[]
  ): Promise<GetCurrentPricesResponse> {
    const baseUrl =
      process.env.STOCK_SCRAPER_SERVICE_API_URL ?? "http://localhost:5001/api";
    const body = {
      stocks: stockList,
    };
    const { data } = await axios.post(`${baseUrl}/scrape`, body);
    return data;
  }
}
