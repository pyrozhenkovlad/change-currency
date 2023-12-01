import { useState } from "react";
import "../../../assets/styles/EditableRow/styles.css";
import Decline from "../../../assets/svg/Decline";
import Edit from "../../../assets/svg/Edit";
import Save from "../../../assets/svg/Save";
import { useCurrencyStore } from "../../../store/currenciesStore";
import { useExchangeStore } from "../../../store/exchangeStore";
import { Currency } from "../../../types";
import { validateEditableRowValue } from "../../../utils/rowValueValidator";

type EditableRowProps = {
  currency: Currency;
  type: "buy" | "sale";
};

export const EditableRow = ({ currency, type }: EditableRowProps) => {
  const currencyStore = useCurrencyStore();

  const [showEditIcon, setShowEditIcon] = useState(false);
  const [openEditInput, setOpenEditInput] = useState(false);
  const [editedCurrency = currency, setEditedCurrency] =
    useState<Currency>(currency);
  const [allowSave, setAllowSave] = useState(true);
  const selectedExchange = useExchangeStore((state) => state.exchangeCurrency);
  const updateSelectedExchange = useExchangeStore(
    (state) => state.setExchangeCurrency
  );

  const handleChangeValue = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(value.target.value) < 0) return;
    setAllowSave(true);
    const newCurrency = { ...currency, [type]: value.target.value };
    setEditedCurrency(newCurrency);
    if (
      validateEditableRowValue(
        Number(value.target.value),
        Number(currency[type])
      )
    ) {
      setAllowSave(true);
    } else {
      setAllowSave(false);
    }
  };

  const handleSaveEdit = () => {
    if (!allowSave) return;
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
    setAllowSave(true);
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
          onChange={handleChangeValue}
        />
      )}
      {showEditIcon && (
        <div onClick={showInputHandler}>
          <Edit />
        </div>
      )}
      {openEditInput && (
        <div className="editable-row-buttons">
          <Save
            disabled={!allowSave}
            cursor={allowSave ? "pointer" : "not-allowed"}
            onClick={handleSaveEdit}
          />
          <Decline pointer onClick={handleCancelEdit} />
        </div>
      )}
    </div>
  );
};
