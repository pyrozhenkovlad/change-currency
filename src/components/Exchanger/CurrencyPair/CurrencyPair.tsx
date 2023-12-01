import { InputNumber, Select } from "antd";
import "../../../assets/styles/CurrencyPair/styles.css";
import { BaseCurrencyType, Currency, CurrencyPairType } from "../../../types";
import { validateInput } from "../../../utils/inputValidator";

type CurrencyPairProps = {
  pair: CurrencyPairType | BaseCurrencyType;
  type: "from" | "to";
  currencies: Currency[];
  handleValueChange: (
    value: number | null,
    pair: CurrencyPairType | BaseCurrencyType
  ) => void;
  handleSelectChange: (
    value: string,
    pair: CurrencyPairType | BaseCurrencyType
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
    if (value !== null && !validateInput(value)) return;
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
        max={10000000}
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
