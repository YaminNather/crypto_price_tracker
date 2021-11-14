import react from "react";

export interface SearchAreaContextData {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const searchAreaContext: React.Context<SearchAreaContextData | null> = react.createContext<SearchAreaContextData | null>(null);

export default searchAreaContext;