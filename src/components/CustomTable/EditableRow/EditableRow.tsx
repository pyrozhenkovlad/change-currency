import { useEffect, useState } from "react";
import "../../../assets/styles/EditableRow/styles.css";
import Decline from "../../../assets/svg/Decline";
import Edit from "../../../assets/svg/Edit";
import Save from "../../../assets/svg/Save";
import { Currency } from "../../../types";
import { useCurrencyStore } from "../../../utils/currenciesStore";
import { useExchangeStore } from "../../../utils/exchangeStore";

type EditableRowProps = {
  currency: Currency;
  type: "buy" | "sale";
};

export const EditableRow = ({ currency, type }: EditableRowProps) => {
  const currencyStore = useCurrencyStore();

  const [showEditIcon, setShowEditIcon] = useState(false);
  const [openEditInput, setOpenEditInput] = useState(false);
  const [editedCurrency = currency, setEditedCurrency] = useState<Currency>();
  const selectedExchange = useExchangeStore((state) => state.exchangeCurrency);
  const updateSelectedExchange = useExchangeStore(
    (state) => state.setExchangeCurrency
  );

  const handleChangeValue = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newCurrency = { ...currency, [type]: value.target.value };
    setEditedCurrency(newCurrency);
  };

  const handleSaveEdit = () => {
    currencyStore.editCurrency(editedCurrency);
    if (editedCurrency.ccy === selectedExchange.ccy) {
      updateSelectedExchange({
        ...selectedExchange,
        [type]: editedCurrency[type],
      });
    }
    setOpenEditInput(false);
  };

  const handleCancelEdit = () => {
    setOpenEditInput(false);
    setEditedCurrency(currency);
  };

  const handleMouseEnter = () => {
    if (!openEditInput) setShowEditIcon(true);
  };

  const handleMouseLeave = () => {
    if (!openEditInput) setShowEditIcon(false);
  };

  const showInputHandler = () => {
    setOpenEditInput(true);
    setShowEditIcon(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="editable-row-container"
    >
      {!openEditInput && <span>{currency[type]}</span>}
      {openEditInput && (
        <input
          className="editable-row-input"
          type="number"
          value={editedCurrency[type]}
          min={Number(editedCurrency[type]) * 0.9}
          max={Number(editedCurrency[type]) * 1.1}
          onChange={handleChangeValue}
        />
      )}
      {showEditIcon && (
        <div
          onClick={showInputHandler}
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            cursor: "pointer",
          }}
        >
          <Edit />
        </div>
      )}
      {openEditInput && (
        <div
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            display: "flex",
            backgroundColor: "#E7F3E7",
            height: "17px",
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={handleSaveEdit}>
            <Save />
          </div>
          <div style={{ cursor: "pointer" }} onClick={handleCancelEdit}>
            <Decline />
          </div>
        </div>
      )}
    </div>
  );
};
