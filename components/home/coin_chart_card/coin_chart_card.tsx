import styles from "./styles.module.scss";
import { Coin } from "../../../coingecko_api/coin";
import CoinChart from "../../common/coin_chart/coin_chart";

import react from "react";
import classNames from "classnames";

export interface CoinChartCardProps {
  className?: string;
  style?: React.CSSProperties;
  id: string;
}

const CoinChartCard: React.FC<CoinChartCardProps> = (props) => {
  function render(): JSX.Element {
    return (
      <div className={classNames("card", styles.coin_chart_card, props.className)} style={props.style}>
        <h3 >Price</h3>

        <div className={styles.chart_container}>
          <CoinChart
            className={styles.chart}            
            maintainAspectRatio={false}
            id={props.id} days={1} 
            // interval="daily"
            showLabels={window.innerWidth > 599}
            showLegend={window.innerWidth > 599}
            color="rgb(255, 53, 87)" 
          />
        </div>
      </div>
    );
  }  
  
  return render();
};

export default CoinChartCard;