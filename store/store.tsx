import react from "react";

export default class Store {
  constructor() {
    
  }
}

const storeContext: React.Context<Store> = react.createContext<Store>(new Store());