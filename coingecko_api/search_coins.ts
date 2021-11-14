import { CoinsList, getAllCoins, SingleCoin } from "./coingecko_api";
import { Coin } from "./models/coin";
import ListAllCoinsResponseCoinData from "./models/list_all_coins_response_coin_data";
import OnlyMarketData from "./models/only_market_data";
import Searcher from "./utils/searcher";

export default class SearchCoins {
  public constructor(searchFor: string) {
    this.searchFor = searchFor;
  }

  public execute = async (): Promise<OnlyMarketData[]> => {
    const allCoins: OnlyMarketData[] = await CoinsList("INR");
    
    return this.filter(allCoins);
  };  

  private filter = (allCoins: OnlyMarketData[]): OnlyMarketData[] => {
    return allCoins.filter((value, index, array) => this.getRegExp().test(value.name.toLowerCase()));
  };

  private getRegExp = (): RegExp => {
    const splitSearchFor: string[] = this.searchFor.toLowerCase().split(" ");

    if(splitSearchFor.length <= 1)
      return new RegExp(splitSearchFor[0]);

    let regExpString: string = `${this.searchFor}`;
    for(let i: number = 0; i < splitSearchFor.length; i++)
      regExpString += `|${splitSearchFor[i]}`;
    return new RegExp(regExpString);
  };


  private readonly searchFor: string;
}