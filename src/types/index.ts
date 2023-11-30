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
