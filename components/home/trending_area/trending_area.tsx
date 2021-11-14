import react from "react";
import { TrendingCoins } from "../../../coingecko_api/coingecko_api";
import { TrendingResultCoinData } from "../../../coingecko_api/trending_result_coin_data";
import MiniCoinChartCard from "../mini_coin_chart_card/mini_coin_chart_card";
import styles from './trending_area_styles.module.scss';

const TrendingArea: React.FC = (props) => {
  const [trendingCoins, setTrendingCoins] = react.useState<TrendingResultCoinData[]>([]);

  react.useEffect(
    () => {
      TrendingCoins().then((value) => setTrendingCoins(value.slice(0, 3)));      
    },
    []
  );

  function render(): JSX.Element {
    return (
      <div className={styles.trending_area}>
        <h3>Trending Coins</h3>

        <div className={styles.charts_area}>
          {trendingCoins.map((value) => <MiniCoinChartCard key={value.item.id} id={value.item.id} />)}
        </div>
      </div>    
    );
  }

  return render();
}


export default TrendingArea;