import { InputNumber, Select } from "antd";
import "../../../styles/CurrencyPair/styles.css";
import { Currency, CurrencyPairType, baseCurrencyType } from "../../../types";


type CurrencyPairProps = {
  pair: CurrencyPairType | baseCurrencyType;
  type: "from" | "to";
  currencies: Currency[];
  handleValueChange: (
    value: number | null,
    pair: CurrencyPairType | baseCurrencyType
  ) => void;
  handleSelectChange: (
    value: string,
    pair: CurrencyPairType | baseCurrencyType
  ) => void;
};

export const CurrencyPair = ({
  pair,
  type,
  currencies,
  handleValueChange,
  handleSelectChange,
}: CurrencyPairProps) => {
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

  const handleCurrencyValue = (value: number | null) => {
    const currencyValue = value ? value : 0;
    handleValueChange(currencyValue, pair);
  };

  const handleCurrencySelect = (value: string) => {
    handleSelectChange(value, pair);
  };

  return (
    <div className="pair-container">
      <InputNumber
        value={pair.value}
        controls={false}
        min={0}
        max={1000000000}
        onChange={handleCurrencyValue}
      />
      <Select
        options={handleOptions()}
        onChange={handleCurrencySelect}
        value={pair.ccy}
        placement="topLeft"
      />
    </div>
  );
};
