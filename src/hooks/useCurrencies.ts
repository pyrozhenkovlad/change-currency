import useSWR from "swr";
import { Currency } from "../types";
import { fetcher } from "../api";
import { useCurrencyStore } from "../utils/currenciesStore";
import { useEffect } from "react";

export const useCurrencies = () => {
  const { data, error } = useSWR<Currency[]>(
    process.env.REACT_APP_API_BASE_URL,
    fetcher
  );

  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);

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
    }
  }, [data, setCurrencies]);

  return {
    isLoading: !error && !data,
    isError: error,
  };
};
