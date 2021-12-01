import react from 'react';
import { Coin } from '../../../coingecko_api/models/coin';
import styles from './price_change_indicator_styles.module.scss';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import classNames from 'classnames';

export interface PriceChangeIndicatorProps {
  coin: Coin;
  className?: string;
  style?: React.CSSProperties;
}

const PriceChangeIndicator: react.FC<PriceChangeIndicatorProps> = (props) => {
  function render(): JSX.Element {
    return (
      <div className={classNames(styles.price_change_indicator, props.className)} style={props.style}>
        {buildDirectionIcon()}

        {buildValue()}
      </div>
    );
  }

  function buildDirectionIcon(): JSX.Element {
    if(priceIncreased())
      return <ArrowDropUp className={styles.direction_icon_increased} />;
    else
      return <ArrowDropDown className={styles.direction_icon_decreased} />
  }

  function buildValue(): JSX.Element {
    const className: string = styles[`value_${(priceIncreased()) ? "increased" : "decreased"}`];
    
    return <span className={className}>{props.coin.market_data.price_change_percentage_24h}</span>;
  }

  function priceIncreased(): boolean {
    return props.coin.market_data.price_change_percentage_24h > 0;
  }

  return render();
}


export default PriceChangeIndicator;