import { useEffect, useState } from "react";
import "../../styles/Exchanger/styles.css";
import { Currency } from "../../types";
import CurrencyPair from "./CurrencyPair";

export type CurrencyPairType = {
  ccy: string;
  buy?: string;
  sale?: string;
  value?: number;
};
export const Exchanger = ({ currencies }: { currencies: Currency[] }) => {
  const [fromPair, setFromPair] = useState<CurrencyPairType>({
    ccy: "UAH",
    value: 1,
  });
  const [toPair, setToPair] = useState<CurrencyPairType>({
    ccy: "USD",
    value: 100,
  });

  useEffect(() => {
    console.log("currencies", currencies);
  }, [currencies]);

  const handleSwap = () => {
    setFromPair(toPair);
    setToPair(fromPair);
  };

  return (
    <div className="exchanger-container">
      <CurrencyPair
        pair={fromPair}
        setPair={setFromPair}
        type="from"
        currencies={currencies}
      />
      <div onClick={handleSwap}>3</div>
      <CurrencyPair
        pair={toPair}
        setPair={setToPair}
        type="to"
        currencies={currencies}
      />
    </div>
  );
};
