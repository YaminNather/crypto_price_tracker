import Link from "next/link";
import react from "react";
import OnlyMarketData from "../../../../coingecko_api/only_market_data";

import styles from "./coin_button_styles.module.scss";

export interface CoinButtonProps {
  coin: OnlyMarketData;
  selected: boolean;
}

const CoinButton: React.FC<CoinButtonProps> = (props) => {
  const [hovering, setHovering] = react.useState<boolean>(false);

  function render(): JSX.Element {
    return (
      <div className={styles.coin_button}>
        {buildButton()}

        {buildLabel()}
      </div>
    );
  }
  
  function buildButton(): JSX.Element {
    return (
      <Link href={`/coins/${props.coin.id}`}>
        <div className={(props.selected) ? styles.button_selected : styles.button}  onMouseEnter={(e) => setHovering(true)} onMouseLeave={(e) => setHovering(false)}>
          <img className="icon" src={props.coin.image} />
        </div>
      </Link>
    );
  }

  function buildLabel(): JSX.Element {
    return (
      <div className={(hovering) ? styles.label_visible : styles.label_invisible}>
        {props.coin.name}
      </div>
    );
  }

  return render();
}


export default CoinButton;