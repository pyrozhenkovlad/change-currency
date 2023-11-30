import { Table } from "antd";
import "../../assets/styles/Table/styles.css";
import { Currency } from "../../types";
import EditableRow from "./EditableRow";
import { ColumnsType } from "antd/es/table";

export const CustomTable = ({ currencies }: { currencies: Currency[] }) => {
  const tableColumns: ColumnsType<Currency> = [
    {
      title: `Currency /   ${new Date().toLocaleDateString()}`,
      dataIndex: "ccy",
      key: "ccy",
      align: "center",
      render: (_, currency: Currency) => {
        return `${currency.ccy}/${currency.base_ccy}`;
      },
    },
    {
      title: "Buy",
      dataIndex: "buy",
      key: "buy",
      align: "center",
      width: 100,
      render: (_, currency: Currency) => {
        return <EditableRow currency={currency} type="buy" />;
      },
    },
    {
      title: "Sell",
      dataIndex: "sale",
      key: "sale",
      align: "center",
      width: 100,
      render: (_, currency: Currency) => {
        return <EditableRow currency={currency} type="sale" />;
      },
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={tableColumns}
        dataSource={currencies}
        rowKey={(record) => record.ccy}
        rowClassName="table-row"
        pagination={false}
      />
    </div>
  );
};
