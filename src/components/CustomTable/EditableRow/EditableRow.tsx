import { useEffect, useState } from "react";
import { Currency } from "../../../types";
import { useCurrencyStore } from "../../../utils/currenciesStore";
import "../../../assets/styles/EditableRow/styles.css";
import Edit from "../../../assets/svg/Edit";

type EditableRowProps = {
  currency: Currency;
  type: "buy" | "sale";
};

export const EditableRow = ({ currency, type }: EditableRowProps) => {
  const currencyStore = useCurrencyStore();

  const [showEditIcon, setShowEditIcon] = useState(false);
  const [openEditInput, setOpenEditInput] = useState(false);

  useEffect(() => {
    console.log(showEditIcon);
  }, [showEditIcon]);

  const handleChangeValue = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newCurrency = { ...currency, [type]: value };
    currencyStore.editCurrency(newCurrency);
  };

  const showEditIconHandler = () => {
    setShowEditIcon((prev) => !prev);
  };

  return (
    <div
      onMouseEnter={showEditIconHandler}
      onMouseLeave={showEditIconHandler}
      className="editable-row-container"
    >
      <span>{currency[type]}</span>
      {showEditIcon && <Edit />}
    </div>
  );
};
