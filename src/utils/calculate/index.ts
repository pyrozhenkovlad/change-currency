import { CurrencyPairType, exchangeStore } from "../../types";

export const calculate = (
  type: "base" | "exchange" | "select",
  baseCurrencyValue: number,
  exchangeCurrencyValue: number,
  exchangeState: exchangeStore,
  selectExchangeCurrency?: CurrencyPairType
) => {
  switch (type) {
    case "base": {
      exchangeState.calculateBaseCurrencyChange(
        { ...exchangeState.baseCurrency, value: baseCurrencyValue },
        exchangeState.exchangeCurrency,
        exchangeState.exchangeOrder
      );
      break;
    }
    case "exchange": {
      exchangeState.calculateExchangeCurrencyChange(
        exchangeState.baseCurrency,
        { ...exchangeState.exchangeCurrency, value: exchangeCurrencyValue },
        exchangeState.exchangeOrder
      );
      break;
    }
    case "select": {
      exchangeState.calculateExchangeCurrencyChange(
        exchangeState.baseCurrency,
        { ...selectExchangeCurrency!, value: exchangeCurrencyValue },
        exchangeState.exchangeOrder
      );
      break;
    }
  }
};
