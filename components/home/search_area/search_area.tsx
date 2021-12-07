import Search from "@mui/icons-material/Search";
import classNames from "classnames";
import react, { useEffect } from "react";
import { searchCoins } from "../../../coingecko_api/coingecko_api";
import OnlyMarketData from "../../../coingecko_api/models/only_market_data";
import searchAreaContext, { SearchAreaContextData } from "../search_area_context/search_area_context";
import styles from "./search_area_styles.module.scss";
import Link from "next/link";
import Close from "@mui/icons-material/Close";

export interface SearchAreaProps {
  className?: string;
  style?: react.CSSProperties;  
}

const SearchArea: React.FC<SearchAreaProps> = (props) => {
  const [searchFor, setSearchFor] = react.useState<string>("");
  const [searchResults, setSearchResults] = react.useState<OnlyMarketData[]>([]);
  const searchAreaContextData: SearchAreaContextData = react.useContext<SearchAreaContextData | null>(searchAreaContext) as SearchAreaContextData;


  useEffect(() => updateSearchResults(), []);

  function render(): JSX.Element {
    const a: any = typeof window == "undefined";

    return (
      <div
        onKeyDown={(e) => e.key}
        className={classNames(props.className, styles.search_area)} 
        style={{...props.style, display: (searchAreaContextData.isOpen) ? "flex" : "none"}}
      >      
        <div className={styles.search_input_container}>
          <Search fontSize="large" />

          <input 
            type="text" 
            value={searchFor}
            className={styles.search_input}
            onChange={(e) => setSearchFor(e.target.value)}
            onKeyDown={(e) => {
              if(e.key == "Enter")
                updateSearchResults();                            
            }}
          />
        </div>

        <div className={styles.search_results}>
          {searchResults.map(
            (value, index) => {
              return (
                <Link key={index} href={`/coins/${value.id}`}>
                  <div className={styles.search_result} onClick={() => searchAreaContextData.setIsOpen(false)}>
                    <img src={value.image} />

                    <p className={styles.name}>{value.name}</p>
                  </div>
                </Link>
              );
            }
          )}
        </div>

        <div className={classNames("icon_button", styles.close_button)} onClick={(e) => searchAreaContextData.setIsOpen(false)}>
          <Close />
        </div>
      </div>
    );
  }

  function updateSearchResults(): void {
    searchCoins(searchFor).then((value) => setSearchResults(value));
  }

  return render();
}


export default SearchArea;