import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { useResource } from "../hooks";
import { API } from "../services/api";
import { TransactionDto } from "../services/transactions";

interface TransactionsResponse {
  transactions: TransactionDto[];
}

const getTransactions = () => API.get<TransactionsResponse>("transactions");

const columns: ColumnsType<TransactionDto> = [
  { title: "Title", dataIndex: "title" },
  { title: "Description", dataIndex: "transaction_description" },
  { title: "Ammount", dataIndex: "ammount" },
  { title: "Sender", dataIndex: "sender_username" },
  { title: "Recipient", dataIndex: "recipient_username" },
  { title: "Date", dataIndex: "transaction_date" },
];

interface Props {
  filterFunction?: (transaction: TransactionDto) => boolean;
}

export const TransactionsTable = ({ filterFunction }: Props) => {
  const { resource, isLoading, refetch } = useResource(getTransactions);

  const transactions = resource?.transactions || [];

  const data = filterFunction
    ? transactions.filter(filterFunction)
    : transactions;

  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={data}
      footer={() => <Button onClick={refetch}>Refetch</Button>}
    />
  );
};
