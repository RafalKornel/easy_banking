import { Button, Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useResource } from "../hooks";
import { getAllInvoices, InvoiceDto } from "../services/invoices";
import { Flex } from "./Flex";

const columns: ColumnsType<InvoiceDto> = [
  { title: "Title", dataIndex: "title" },
  { title: "Description", dataIndex: "invoice_description" },
  { title: "Ammount", dataIndex: "ammount" },
  { title: "User", dataIndex: "username" },
  { title: "Date", dataIndex: "invoice_date" },
];

interface Props {
  filterFunction?: (invoice: InvoiceDto) => boolean;
}

export const InvoicesTable = ({ filterFunction }: Props) => {
  const { isLoading, refetch, resource } = useResource(getAllInvoices);

  const invoices = resource?.invoices || [];

  const data = filterFunction ? invoices.filter(filterFunction) : invoices;

  return (
    <Flex>
      <Typography.Title level={3}>Invoices</Typography.Title>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        footer={() => <Button onClick={refetch}>Refetch</Button>}
      />
    </Flex>
  );
};
