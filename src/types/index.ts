export type Currency = {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
};

export type baseCurrencyType = {
  value: number;
  ccy: string;
};

export type CurrencyPairType = Currency & {
  value: number;
};
