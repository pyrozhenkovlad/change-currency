import useSWR from "swr";
import { Currency } from "../types";
import { fetcher } from "../api";
import { useCurrencyStore } from "../utils/currenciesStore";
import { useEffect } from "react";
import { useExchangeStore } from "../utils/exchangeStore";

export const useCurrencies = () => {
  const { data, error } = useSWR<Currency[]>(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4",
    fetcher
  );

  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setExchangeCurrency = useExchangeStore(
    (state) => state.setExchangeCurrency
  );

  useEffect(() => {
    if (data) {
      const formatedData = data.map((currency) => {
        return {
          ...currency,
          buy: Number(currency.buy).toFixed(2),
          sale: Number(currency.sale).toFixed(2),
        };
      });
      setCurrencies(formatedData);
      setExchangeCurrency({ ...formatedData[0], value: 1 });
    }
  }, [data, setCurrencies, setExchangeCurrency]);

  return {
    isLoading: !error && !data,
    isError: error,
  };
};
