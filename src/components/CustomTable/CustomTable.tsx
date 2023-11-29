import { Table } from "antd";
import { tableColumns } from "../../constants/tableColumns";
import "../../styles/Table/styles.css";
import { Currency } from "../../types";

export const CustomTable = ({ currencies }: { currencies: Currency[] }) => {
  return (
    <Table
      columns={tableColumns}
      dataSource={currencies}
      rowKey={(record) => record.ccy}
      rowClassName="table-row"
      pagination={false}
    />
  );
};
