import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/dist/client/router";
import Head from "next/head";
import react from "react";
import { Coin } from "../../coingecko_api/models/coin";
import { SingleCoin } from "../../coingecko_api/coingecko_api";
import SideBar from "../../components/common/side_bar/side_bar";
import CoinChartCard from "../../components/home/coin_chart_card/coin_chart_card";
import PriceChangeIndicator from "../../components/home/price_indicator/price_change_indicator";
import TrendingArea from "../../components/home/trending_area/trending_area";

import styles from "../../styles/Home.module.scss";
import SearchArea from "../../components/home/search_area/search_area";
import searchAreaContext, { SearchAreaContextData } from "../../components/home/search_area_context/search_area_context";

import Image from "next/image";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import Search from "@mui/icons-material/Search";

const CoinsInfoPage: NextPage = () => {
  const coinInfo: Coin | null = useCoinInfo();
  const [searchAreaOpen, setSearchAreaOpen] = react.useState<boolean>(false);
  const searchAreaContextData: SearchAreaContextData | null = react.useContext<SearchAreaContextData | null>(searchAreaContext);

  function render(): JSX.Element {
    return (
      <>
        <Head>
          <title>Price Tracker</title>
        </Head>
  
        <div className={styles.home_page}>
          <searchAreaContext.Provider value={{isOpen: searchAreaOpen, setIsOpen: (value) => setSearchAreaOpen(value)}}>
            <SideBar />
                    
            <SearchArea />
          </searchAreaContext.Provider>

          <div className={classNames("container", styles.page_area)}>  
            {buildPageAreaContent()}
          </div>            
        </div>
      </>
    );
  }

  function buildPageAreaContent(): JSX.Element {
    if(coinInfo == null) {
      return (
      <div className={styles.progress_indicator_container}>
        <CircularProgress />
      </div>);
    }

    return (
      <>
        <div className={styles.app_bar}>
          <div className={classNames("icon_button", styles.search_button)} onClick={() => setSearchAreaOpen(true)}>
            <Search />
          </div>
        </div>

        <div className={styles.header_area}>          
            <img src={coinInfo.image.small} />
            
            <h1 style={{marginLeft: "16px"}}>{coinInfo.name}</h1>

            <PriceChangeIndicator className={styles.price_change_indicator} coin={coinInfo} />
        </div>

        <CoinChartCard className={styles.coin_chart_card} id={coinInfo.id} />

        <TrendingArea />        
      </>
    );
  }

  return render();
}

function useCoinInfo(): Coin | null {
  const [coinInfo, setCoinInfo] = react.useState<Coin | null>(null);
  const router: NextRouter = useRouter();

  react.useEffect(
    () => {
      if(router.query.id == undefined)
        return;

      SingleCoin(router.query.id as string).then((value) => setCoinInfo(value))
    },
    [router.query.id]
  );

  return coinInfo;
}

export default CoinsInfoPage;