import { InputNumber, Select } from "antd";
import "../../../styles/CurrencyPair/styles.css";
import { Currency } from "../../../types";
import { CurrencyPairType } from "../Exchanger";

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

  const handleValueChange = (value: number | null) => {
    setPair((prev: CurrencyPairType) => ({
      ...prev,
      value: value ? Number(value) : 0,
    }));
  };

  return (
    <div className="pair-container">
      <InputNumber
        value={pair.value}
        controls={false}
        min={0}
        max={1000000000}
        onChange={handleValueChange}
      />
      <Select
        options={handleOptions()}
        onChange={handleSelectChange}
        value={pair.ccy}
        placement="topLeft"
      />
    </div>
  );
};
