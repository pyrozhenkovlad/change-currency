import { useEffect } from "react";
import "../../assets/styles/Exchanger/styles.css";
import Swap from "../../assets/svg/Swap";
import { useExchangeStore } from "../../store/exchangeStore";
import { BaseCurrencyType, Currency, CurrencyPairType } from "../../types";
import { calculate } from "../../utils/calculate";
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

  useEffect(() => {
    if (exchangeState.exchangeOrder === "buy") {
      calculate(
        "base",
        exchangeState.baseCurrency.value,
        exchangeState.exchangeCurrency.value,
        exchangeState
      );
    } else {
      calculate(
        "exchange",
        exchangeState.baseCurrency.value,
        exchangeState.exchangeCurrency.value,
        exchangeState
      );
    }
  }, [exchangeState.exchangeOrder]);

  useEffect(() => {
    calculate(
      "base",
      exchangeState.baseCurrency.value,
      exchangeState.exchangeCurrency.value,
      exchangeState
    );
  }, [currencies]);

  const handleValueChange = (
    value: number | null,
    pair: CurrencyPairType | BaseCurrencyType
  ) => {
    if (pair.ccy === "UAH") {
      exchangeState.setBaseCurrency({ ...pair, value: value ? value : 0 });
      calculate(
        "base",
        value ? value : 0,
        exchangeState.exchangeCurrency.value,
        exchangeState
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
        value ? value : 0,
        exchangeState
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
      calculate(
        "select",
        exchangeState.baseCurrency.value,
        pair.value,
        exchangeState,
        {
          ...newPair,
          value: pair.value,
        }
      );
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
      <div onClick={handleSwap}>
        <Swap pointer/>
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
