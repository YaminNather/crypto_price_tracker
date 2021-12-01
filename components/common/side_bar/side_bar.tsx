import react from 'react';
import { CoinsList } from '../../../coingecko_api/coingecko_api';
import OnlyMarketData from '../../../coingecko_api/models/only_market_data';
import styles from "./side_bar_styles.module.scss";
import { NextRouter, useRouter } from 'next/dist/client/router';
import CoinButton from './coin_button/coin_button';
import Search from '@mui/icons-material/Search';
import classnames from 'classnames';
import searchAreaContext, { SearchAreaContextData } from '../../home/search_area_context/search_area_context';

export interface SideBarProperties {
  className?: string;
  style?: React.CSSProperties;
}

const SideBar: React.FC = (props) => {
  const coins: OnlyMarketData[] = useCoins();
  const selectedCoin: string | null = useSelectedCoin();
  const searchAreaContextData: SearchAreaContextData = react.useContext<SearchAreaContextData | null>(searchAreaContext) as SearchAreaContextData;

  function render(): JSX.Element {
    return (
      <div className={styles.side_bar}>
        <div className={styles.scroll_viewport}>
          <div className={styles.upper_section}>
            <div className={classnames("icon_button", styles.search_button)} onClick={() => searchAreaContextData.setIsOpen(true)}>
              <Search />
            </div>
            {/* <hr /> */}
          </div>
          
          {coins.map((value, index) => <CoinButton key={index} coin={value} selected={value.id == selectedCoin} />)}  
        </div>        
      </div>
    );
  }

  return render();
};

function useCoins(): OnlyMarketData[] {
  const [coins, setCoins] = react.useState<OnlyMarketData[]>([]);

  react.useEffect(
    () => {
      CoinsList("INR").then(
        (value) => {
          setCoins(value);
        }
      );
    },
    []
  );

  return coins;
}

function useSelectedCoin(): string | null {
  const router: NextRouter = useRouter();  
  const [selectedCoin, setSelectedCoin] = react.useState<string | null>(null);
  
  react.useEffect(
    () => {
      if(router.query.id != undefined)
        setSelectedCoin(router.query.id as string);
    },
    [router.query.id]
  );

  return selectedCoin;
}

export default SideBar;