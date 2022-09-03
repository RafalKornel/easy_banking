import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { useResource } from "../hooks";
import { getAllTransfers, TransferDto } from "../services/transfers";

const columns: ColumnsType<TransferDto> = [
  { title: "Title", dataIndex: "title" },
  { title: "Description", dataIndex: "transfer_description" },
  { title: "Ammount", dataIndex: "ammount" },
  { title: "Sender", dataIndex: "sender_username" },
  { title: "Recipient", dataIndex: "recipient_username" },
  { title: "Date", dataIndex: "transfer_date" },
];

interface Props {
  filterFunction?: (transfer: TransferDto) => boolean;
}

export const TransfersTable = ({ filterFunction }: Props) => {
  const { resource, isLoading, refetch } = useResource(getAllTransfers);

  const transfers = resource?.transfers || [];

  console.log({ transfers, resource });

  const data = filterFunction ? transfers.filter(filterFunction) : transfers;

  return (
    <Table
      columns={columns}
      loading={isLoading}
      dataSource={data}
      footer={() => <Button onClick={refetch}>Refetch</Button>}
    />
  );
};
