import axios, { AxiosResponse } from "axios";
import { Coin } from "./models/coin";
import ListAllCoinsResponseCoinData from "./models/list_all_coins_response_coin_data";
import OnlyMarketData from "./models/only_market_data";
import { TrendingResultCoinData } from "./models/trending_result_coin_data";
import SearchCoins from "./search_coins";

export async function CoinsList(currency: string): Promise<OnlyMarketData[]> {
  const url: string = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;  
  const response: AxiosResponse = await axios.get(url);

  return response.data;
};

export async function SingleCoin(id: string): Promise<Coin> {
  const url: string = `https://api.coingecko.com/api/v3/coins/${id}`;
  const response: AxiosResponse = await axios.get(url);
  
  const r: Coin = response.data;

  return r;
};

export async function MarketChartData(id: string, days: number = 365, currency: string, interval?: "daily"): Promise<number[][]> {  
  const url: string = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}${(interval != null) ? `&interval=${interval}` : ``}`;
  const response: AxiosResponse = await axios.get(url);

  return response.data.prices;
};

export async function TrendingCoins(): Promise<TrendingResultCoinData[]> {
  const url = `https://api.coingecko.com/api/v3/search/trending`;
  const response: AxiosResponse = await axios.get(url);

  return response.data.coins;
}

export async function getAllCoins(): Promise<ListAllCoinsResponseCoinData[]> {
  const url = `https://api.coingecko.com/api/v3/coins/list`;
  const response: AxiosResponse = await axios.get(url);

  return response.data;
}

export async function searchCoins(searchFor: string): Promise<OnlyMarketData[]> {
  const methodObject: SearchCoins = new SearchCoins(searchFor);
  return methodObject.execute();
}