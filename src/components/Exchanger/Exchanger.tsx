import { useEffect } from "react";
import Swap from "../../assets/svg/Swap";
import "../../assets/styles/Exchanger/styles.css";
import { Currency, CurrencyPairType, BaseCurrencyType } from "../../types";
import { useExchangeStore } from "../../utils/exchangeStore";
import CurrencyPair from "./CurrencyPair";

export const Exchanger = ({ currencies }: { currencies: Currency[] }) => {
  const exchangeState = useExchangeStore();

  const handleSwap = () => {
    const order = exchangeState.exchangeOrder;
    switch (order) {
      case "buy":
        exchangeState.setExchangeOrder("sale");
        break;
      case "sale":
        exchangeState.setExchangeOrder("buy");
        break;
    }
  };

  const calculate = (
    type: "base" | "exchange" | "select",
    baseCurrencyValue: number,
    exchangeCurrencyValue: number,
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

  useEffect(() => {
    calculate(
      "base",
      exchangeState.baseCurrency.value,
      exchangeState.exchangeCurrency.value
    );
  }, [currencies]);

  useEffect(() => {
    console.log(exchangeState);
  }, [exchangeState]);

  const handleValueChange = (
    value: number | null,
    pair: CurrencyPairType | BaseCurrencyType
  ) => {
    if (pair.ccy === "UAH") {
      exchangeState.setBaseCurrency({ ...pair, value: value ? value : 0 });
      calculate(
        "base",
        value ? value : 0,
        exchangeState.exchangeCurrency.value
      );
    } else {
      const changedPair = pair as CurrencyPairType;
      exchangeState.setExchangeCurrency({
        ...changedPair,
        value: value ? value : 0,
      });
      calculate(
        "exchange",
        exchangeState.baseCurrency.value,
        value ? value : 0
      );
    }
  };

  const handleSelectChange = (
    selectValue: string,
    pair: CurrencyPairType | BaseCurrencyType
  ) => {
    if (selectValue === "UAH") {
      handleSwap();
    } else {
      const newPair = currencies.find(
        (currency) => currency.ccy === selectValue
      ) as CurrencyPairType;
      exchangeState.setExchangeCurrency({
        ...newPair,
        value: pair.value,
      });
      calculate("select", exchangeState.baseCurrency.value, pair.value, {
        ...newPair,
        value: pair.value,
      });
    }
  };

  return (
    <div className="exchanger-container">
      <CurrencyPair
        pair={
          exchangeState.exchangeOrder === "buy"
            ? exchangeState.baseCurrency
            : exchangeState.exchangeCurrency
        }
        type="from"
        currencies={currencies}
        handleSelectChange={handleSelectChange}
        handleValueChange={handleValueChange}
      />
      <div onClick={handleSwap} style={{ cursor: "pointer" }}>
        <Swap />
      </div>
      <CurrencyPair
        pair={
          exchangeState.exchangeOrder === "buy"
            ? exchangeState.exchangeCurrency
            : exchangeState.baseCurrency
        }
        type="to"
        currencies={currencies}
        handleSelectChange={handleSelectChange}
        handleValueChange={handleValueChange}
      />
    </div>
  );
};
