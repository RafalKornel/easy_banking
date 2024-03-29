import { Button, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";

import { useResource } from "../hooks";
import { getAllTransfers, TransferDto } from "../services/transfers";
import { Flex } from "./Flex";

const columns: ColumnsType<TransferDto> = [
  { title: "Title", dataIndex: "title" },
  { title: "Description", dataIndex: "transfer_description" },
  { title: "Ammount", dataIndex: "ammount" },
  { title: "Sender", dataIndex: "sender_username" },
  { title: "Recipient", dataIndex: "recipient_username" },
  {
    title: "Date",
    dataIndex: "transfer_date",
    render: (date) => new Date(date).toLocaleDateString(),
    sorter: (a, b) => {
      const firstDate = new Date(a.transfer_date);
      const secondDate = new Date(b.transfer_date);
      return firstDate > secondDate ? 1 : -1;
    },
  },
];

interface Props {
  title?: string;
  filterFunction?: (transfer: TransferDto) => boolean;
}

export const TransfersTable = ({
  title = "Transfers",
  filterFunction,
}: Props) => {
  const { resource, isLoading, refetch } = useResource(getAllTransfers);

  const transfers = resource?.transfers || [];

  const data = filterFunction ? transfers.filter(filterFunction) : transfers;

  return (
    <Flex>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data}
        footer={() => <Button onClick={refetch}>Refetch</Button>}
      />
    </Flex>
  );
};
