import { create } from "zustand";
import { exchangeStore } from "../../types";

export const useExchangeStore = create<exchangeStore>((set) => ({
  baseCurrency: {
    value: 1000,
    ccy: "UAH",
  },
  exchangeCurrency: {
    base_ccy: "UAH",
    buy: "41.26220",
    ccy: "CHF",
    sale: "41.26220",
    value: 1,
  },
  exchangeOrder: "buy",
  setExchangeOrder: (order) => set({ exchangeOrder: order }),
  setBaseCurrency: (currency) => set({ baseCurrency: currency }),
  setExchangeCurrency: (currency) => set({ exchangeCurrency: currency }),
  calculateBaseCurrencyChange: (baseCurrency, exchangeCurrency, order) => {
    if (order === "buy") {
      const newExchangeCurrency = Number(
        (baseCurrency.value / Number(exchangeCurrency.sale)).toFixed(2)
      );
      set({
        exchangeCurrency: {
          ...exchangeCurrency,
          value: newExchangeCurrency,
        },
      });
    } else {
      const newExchangeCurrency = Number(
        (baseCurrency.value / Number(exchangeCurrency.buy)).toFixed(2)
      );
      set({
        exchangeCurrency: {
          ...exchangeCurrency,
          value: newExchangeCurrency,
        },
      });
    }
  },
  calculateExchangeCurrencyChange: (baseCurrency, exchangeCurrency, order) => {
    if (order === "buy") {
      const newBaseCurrency = Number(
        (exchangeCurrency.value * Number(exchangeCurrency.sale)).toFixed(2)
      );
      set({
        baseCurrency: {
          ...baseCurrency,
          value: newBaseCurrency,
        },
      });
    } else {
      const newBaseCurrency = Number(
        (exchangeCurrency.value * Number(exchangeCurrency.buy)).toFixed(2)
      );
      set({
        baseCurrency: {
          ...baseCurrency,
          value: newBaseCurrency,
        },
      });
    }
  },
}));
