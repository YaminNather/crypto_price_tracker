import react from "react";
import AliceCarousel from "react-alice-carousel";
import { Coin } from "../../../coingecko_api/coin";

const TrendingCoinsCarousel: React.FC = (props) => {
  const [trendingCoins, setTrendingCoins] = react.useState<Coin[] | null>(null);
  
  if(trendingCoins == null)
    return <div>Loading...</div>;  

  const items: React.ReactNode[] = trendingCoins.map(
    (element, index) => {
      return (<></>);
    }
  );

  return (
    <AliceCarousel items={items} mouseTracking infinite disableDotsControls />
  );
};


export default TrendingCoinsCarousel;