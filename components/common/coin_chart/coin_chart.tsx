import CircularProgress from "@mui/material/CircularProgress";
import react from "react";
import { MarketChartData } from "../../../coingecko_api/coingecko_api";
import { Line } from "react-chartjs-2";
import classNames from "classnames";

export interface CoinChartProps {
  id: string;
  className?: string;
  style?: react.CSSProperties;
  days?: number;
  interval?: "daily";
  showLabels?: boolean;
  showLegend?: boolean;
  color?: string;
  tension?: number;
  maintainAspectRatio?: boolean;
}

const CoinChart: react.FC<CoinChartProps> = (props) => {
  const [chartData, setChartData] = react.useState<number[][] | null>(null);    

  react.useEffect(
    () => {
      fetchNewMarketData();      
    },
    [props.id]
  );

  react.useEffect(
    () => {
      if(chartData == null)
        return;      
      
      const timeout: NodeJS.Timeout = setTimeout(fetchNewMarketData, 1000 * 1);

      return () => clearTimeout(timeout);
    },
    [chartData]
  );

  function fetchNewMarketData(): void {
    MarketChartData(props.id, days, "INR", props.interval).then(
      (value) => {
        if(value == chartData)
          console.log(`CustomLog: Recieved updated chart data for ${props.id}`);

        return setChartData(value);
      }
    );
  }

  const days: number = props.days ?? 1;

  if(chartData == null)
    return <CircularProgress />;

  return (
    <Line          
      className={classNames(props.className)}
      style={props.style}            
      data={{
        labels: chartData.map(
          (value) => {
            let date: Date = new Date(value[0]);
            
            if(days > 1)
              return date.toLocaleDateString();
            else
              return date.toLocaleTimeString();
          },          
        ),
        datasets: [
          { 
            label: `Price (Past ${days} days)`, 
            data: chartData.map((coin) => coin[1]), 
            borderColor: props.color,
            tension: props.tension
          },
          // { data: chartData.map((value, index) => in dex)}
        ]        
      }}
      options={{
        elements: {
          point: { radius: 1 },        
        },
        scales: {
          y: {
            display: props.showLabels,
            ticks: { color: "white" }
          },
          x: {
            display: props.showLabels,
            ticks: { color: "white" }
          }
        },
        plugins: {
          legend: { display: props.showLegend }
        },
        maintainAspectRatio: props.maintainAspectRatio
      }}
    />
  );
};

export default CoinChart;