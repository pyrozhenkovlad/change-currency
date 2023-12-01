import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../api";
import { mockData } from "../mockData/currencies";
import { useCurrencyStore } from "../store/currenciesStore";
import { useExchangeStore } from "../store/exchangeStore";
import { Currency } from "../types";

export const useCurrencies = () => {
  const { data, error } = useSWR<Currency[]>(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4",
    fetcher
  );

  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setExchangeCurrency = useExchangeStore(
    (state) => state.setExchangeCurrency
  );
  const setError = useCurrencyStore((state) => state.setError);
  const fetcherCounter = localStorage.getItem("fetcherCounter");

  useEffect(() => {
    if (Number(fetcherCounter) >= 5) {
      localStorage.setItem("fetcherCounter", "0");
      setError({ message: "No data" });
    }
    if (error) {
      const formatedData = mockData.map((currency) => {
        return {
          ...currency,
          buy: Number(currency.buy).toFixed(2),
          sale: Number(currency.sale).toFixed(2),
        };
      });
      setCurrencies(formatedData);
      setExchangeCurrency({ ...formatedData[0], value: 1 });
      return;
    }
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
      if (fetcherCounter == null) {
        localStorage.setItem("fetcherCounter", "2");
        return;
      }
      localStorage.setItem("fetcherCounter", Number(fetcherCounter) + 1 + "");
    }
  }, [data, setCurrencies, setExchangeCurrency, error]);

  return {
    isLoading: !error && !data,
    isError: error,
  };
};
