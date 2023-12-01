import { create } from "zustand";
import { Currency } from "../../types";

interface CurrencyStore {
  currencies: Currency[];
  setCurrencies: (currencies: Currency[]) => void;
  editCurrency: (currency: Currency) => void;
  error?: { message: string };
  setError: (error: { message: string }) => void;
}

export const useCurrencyStore = create<CurrencyStore>()((set) => ({
  currencies: [],
  error: undefined,
  setError: (error) => set({ error }),
  setCurrencies: (currencies) => set({ currencies }),
  editCurrency: (currency) =>
    set((state) => ({
      currencies: state.currencies.map((c) =>
        c.ccy === currency.ccy ? currency : c
      ),
    })),
}));
