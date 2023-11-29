import { useEffect } from "react";
import { Currency } from "../../../types";
import { CurrencyPairType } from "../Exchanger";
import { Select } from "antd";
import "../../../styles/CurrencyPair/styles.css";

type CurrencyPairProps = {
  pair: CurrencyPairType;
  type: "from" | "to";
  currencies: Currency[];
  setPair: React.Dispatch<React.SetStateAction<CurrencyPairType>>;
};

export const CurrencyPair = ({
  pair,
  setPair,
  type,
  currencies,
}: CurrencyPairProps) => {
  useEffect(() => {
    console.log("pair", pair);
  }, [pair]);

  const handleOptions = () => {
    const options = [];
    if (pair.ccy === "UAH") {
      options.push({
        value: "UAH",
        label: "UAH",
      });
    } else {
      currencies.forEach((currency) => {
        if (currency.ccy !== pair.ccy) {
          options.push({
            value: currency.ccy,
            label: currency.ccy,
          });
        }
      });
      options.push({
        value: "UAH",
        label: "UAH",
      });
    }
    return options;
  };

  const handleSelectChange = (value: string) => {
    setPair((prev: CurrencyPairType) => ({
      ...prev,
      ccy: value,
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPair((prev: CurrencyPairType) => ({
      ...prev,
      value: Number(e.target.value),
    }));
  };

  return (
    <div className="pair-container">
      <input
        type="number"
        value={pair.value}
        onChange={handleValueChange}
        id={type}
      />
      <Select
        options={handleOptions()}
        onChange={handleSelectChange}
        value={pair.ccy}
      />
    </div>
  );
};
