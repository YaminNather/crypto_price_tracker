import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import Link from "next/link";
import react from "react";
import { Coin } from "../../../coingecko_api/models/coin";
import { SingleCoin } from "../../../coingecko_api/coingecko_api";
import CoinChart from "../../common/coin_chart/coin_chart";
import styles from "./styles.module.scss";

export interface MiniCoinChartCardProps {
  id: string;
}

const MiniCoinChartCard: react.FC<MiniCoinChartCardProps> = (props) => {
  const [coin, setCoin] = react.useState<Coin | null>();

  react.useEffect(
    () => {
      SingleCoin(props.id).then((value) => setCoin(value));
    },
    []
  );

  function render(): JSX.Element {
    return (
      <div className={classNames("card", styles.mini_coin_chart_card)}>
        {buildMainSection()}
      </div>
    );
  }

  function buildMainSection() {
    if(coin == null) {
      return (
        <div className="center">
          <CircularProgress />
        </div>
      );
    }
    
    const priceIncreased: boolean = coin.market_data.price_change_percentage_24h > 0;
    
    return (
      <Link href={`/coins/${props.id}`}>
        <div>
          <p className={(priceIncreased) ? styles.price_change_increased : styles.price_change_decreased}>
            {coin.market_data.price_change_percentage_24h}%
          </p>

          <CoinChart 
            className={styles.coin_chart} 
            id={props.id} 
            color={(priceIncreased) ? "#3dff8b" : "red" } 
            showLabels={false} showLegend={false}
            days={2}
            // interval="daily"
            tension={0.4}          
          />

          <div className={styles.bottom_area}>
            <img src={coin.image.small} />

            <h3 className={styles.name}>{coin.name}</h3>
          </div>
        </div>
      </Link>
    );
  }

  return render();
};

export default MiniCoinChartCard;