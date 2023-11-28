import { create } from "zustand";
import { Currency } from "../../types";

interface CurrencyStore {
  currencies: Currency[];
  setCurrencies: (currencies: Currency[]) => void;
}

export const useCurrencyStore = create<CurrencyStore>()((set) => ({
  currencies: [],
  setCurrencies: (currencies) => set({ currencies }),
}));
