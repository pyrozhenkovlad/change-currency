import { useEffect, useState } from "react";
import "../../styles/Exchanger/styles.css";
import { Currency } from "../../types";
import CurrencyPair from "./CurrencyPair";
import Swap from "../../assets/svg/Swap";

export type CurrencyPairType = {
  ccy: string;
  buy: string;
  sale: string;
  value: number;
  type: string;
};
export const Exchanger = ({ currencies }: { currencies: Currency[] }) => {
  const [fromPair, setFromPair] = useState<CurrencyPairType>({
    ccy: "UAH",
    value: 1,
    type: "from",
    buy: "1",
    sale: "1",
  });
  const [toPair, setToPair] = useState<CurrencyPairType>({
    ccy: "USD",
    value: 1,
    type: "to",
    buy: "1",
    sale: "1",
  });

  useEffect(() => {
    setToPair({
      ...currencies[0],
      value: 1,
      type: "to",
    });
  }, [currencies]);

  const calculateValues = () => {
    if (fromPair.ccy === "UAH") {
      return {
        from: fromPair.value,
        to: fromPair.value * Number(toPair.buy),
      };
    }
  };

  useEffect(() => {
    console.log("fromPair", fromPair);
    console.log("toPair", toPair);
  }, [toPair, fromPair]);

  const handleSwap = () => {
    setFromPair({ ...toPair, type: "from" });
    setToPair({ ...fromPair, type: "to" });
  };

  return (
    <div className="exchanger-container">
      <CurrencyPair
        pair={fromPair}
        setPair={setFromPair}
        type="from"
        currencies={currencies}
      />
      <div onClick={handleSwap} style={{ cursor: "pointer" }}>
        <Swap />
      </div>
      <CurrencyPair
        pair={toPair}
        setPair={setToPair}
        type="to"
        currencies={currencies}
      />
    </div>
  );
};
