export type Currency = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};

export type BaseCurrencyType = {
  value: number;
  ccy: string;
};

export type CurrencyPairType = Currency & {
  value: number;
};

export type exchangeStore = {
  baseCurrency: BaseCurrencyType;
  exchangeCurrency: CurrencyPairType;
  exchangeOrder: "buy" | "sale";
  setExchangeOrder: (order: "buy" | "sale") => void;
  setBaseCurrency: (currency: BaseCurrencyType) => void;
  setExchangeCurrency: (currency: CurrencyPairType) => void;
  calculateBaseCurrencyChange: (
    baseCurrency: BaseCurrencyType,
    exchangeCurrency: CurrencyPairType,
    exchangeOrder: "buy" | "sale"
  ) => void;
  calculateExchangeCurrencyChange: (
    baseCurrency: BaseCurrencyType,
    exchangeCurrency: CurrencyPairType,
    exchangeOrder: "buy" | "sale"
  ) => void;
};
