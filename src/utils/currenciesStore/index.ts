import { create } from "zustand";
import { Currency } from "../../types";

interface CurrencyStore {
  currencies: Currency[];
  setCurrencies: (currencies: Currency[]) => void;
  editCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyStore>()((set) => ({
  currencies: [],
  setCurrencies: (currencies) => set({ currencies }),
  editCurrency: (currency) =>
    set((state) => ({
      currencies: state.currencies.map((c) =>
        c.ccy === currency.ccy ? currency : c
      ),
    })),
}));
