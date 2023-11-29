import { Table } from "antd";
import { tableColumns } from "../../constants/tableColumns";
import "../../assets/styles/Table/styles.css";
import { Currency } from "../../types";

export const CustomTable = ({ currencies }: { currencies: Currency[] }) => {
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
