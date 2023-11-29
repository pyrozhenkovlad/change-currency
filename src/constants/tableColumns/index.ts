import { ColumnsType } from "antd/es/table";
import { Currency } from "../../types";

export const tableColumns: ColumnsType<Currency> = [
  {
    title: `Currency /   ${new Date().toLocaleDateString()}`,
    dataIndex: "ccy",
    key: "ccy",
    render: (_, currency: Currency) => {
      return `${currency.ccy}/${currency.base_ccy}`;
    },
  },
  {
    title: "Buy",
    dataIndex: "buy",
    key: "buy",
  },
  {
    title: "Sell",
    dataIndex: "sale",
    key: "sale",
  },
];
