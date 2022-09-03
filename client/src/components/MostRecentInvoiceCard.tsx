import { Card, Typography } from "antd";
import { AmmountCell } from "./AmmountCell";
import { InvoiceDto } from "../services/invoices";

type Props = {
  invoice: InvoiceDto;
};

export const MostRecentInvoiceCard = ({ invoice }: Props) => (
  <Card
    title="Most recent Invoice"
    style={{ margin: "2rem 0", maxWidth: "25rem" }}
  >
    <Typography.Paragraph>
      <strong>Title:</strong> {invoice.title}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Recipient:</strong> {invoice.recipient}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Description:</strong> {invoice.invoice_description}
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Ammount:</strong> <AmmountCell ammount={invoice.ammount} />
    </Typography.Paragraph>
  </Card>
);
