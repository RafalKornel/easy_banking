import { InvoiceDto } from "../services/invoices";
import { Column } from "@ant-design/plots";
import { Flex } from "./Flex";
import { DatePicker, Radio, Typography } from "antd";
import { useState } from "react";
import moment, { Moment } from "moment";

enum Months {
  Jan = "Jan",
  Feb = "Feb",
  Mar = "Mar",
  Apr = "Apr",
  May = "May",
  Jun = "Jun",
  Jul = "Jul",
  Aug = "Aug",
  Sep = "Sep",
  Oct = "Oct",
  Nov = "Nov",
  Dec = "Dec",
}

const months = Object.values(Months);

const groupInvoicesByMonth = (invoices: InvoiceDto[]): [Months, number][] => {
  const invoiceWithDateObjects = invoices.map((invoice) => ({
    ...invoice,
    dateObject: new Date(invoice.invoice_date),
  }));

  const dataPerMonth = months.map((month, index) => {
    console.log(month);
    const invoicesForMonth = invoiceWithDateObjects.filter((invoice) => {
      const invoiceMonth = invoice.dateObject.getMonth();

      return invoiceMonth === index;
    });

    const totalForMonth = invoicesForMonth.reduce(
      (p, next) => p + next.ammount,
      0
    );

    return [month, totalForMonth] as [Months, number];
  });

  return dataPerMonth;
};

const filterByYear = (invoices: InvoiceDto[], date: Moment): InvoiceDto[] =>
  invoices.filter(
    (invoice) => moment(invoice.invoice_date).year() === date.year()
  );

enum InvoiceMode {
  Expense = "Expense",
  Income = "Income",
  Total = "Total",
}

const INVOICE_MODE_FILTER_FUNCTIONS = {
  [InvoiceMode.Expense]: (invoice: InvoiceDto) => invoice.ammount < 0,
  [InvoiceMode.Income]: (invoice: InvoiceDto) => invoice.ammount > 0,
  [InvoiceMode.Total]: (invoice: InvoiceDto) => true,
};

type Props = {
  invoices: InvoiceDto[];
};

export const ExpensesChart = ({ invoices }: Props) => {
  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(
    moment()
  );

  const [invoiceMode, setInvoiceMode] = useState<InvoiceMode>(
    InvoiceMode.Total
  );

  const invoicesForCurrentYear = filterByYear(
    invoices,
    currentDate || moment()
  );

  const invoicesByMode = invoicesForCurrentYear.filter(
    INVOICE_MODE_FILTER_FUNCTIONS[invoiceMode]
  );

  const data = groupInvoicesByMonth(invoicesByMode).map(
    ([month, total_spent]) => ({
      month,
      total_spent,
    })
  );

  return (
    <Flex additionalStyling={{ maxWidth: "50rem", width: "100%" }}>
      <Typography.Title level={3}>History analysis</Typography.Title>

      <Flex additionalStyling={{ margin: "1rem 0" }} direction="row">
        <Flex>
          <Typography.Text>Select year</Typography.Text>
          <DatePicker
            style={{ maxWidth: "10rem" }}
            disabledDate={(date) => date > moment()}
            allowClear
            picker="year"
            value={currentDate}
            onChange={(value) => setCurrentDate(value)}
          />
        </Flex>
        <Flex additionalStyling={{ margin: "auto 0 0 2rem" }}>
          <Radio.Group
            value={invoiceMode}
            onChange={(e) => setInvoiceMode(e.target.value as InvoiceMode)}
            buttonStyle="solid"
          >
            <Radio.Button value={InvoiceMode.Total}>Total</Radio.Button>
            <Radio.Button value={InvoiceMode.Expense}>Expenses</Radio.Button>
            <Radio.Button value={InvoiceMode.Income}>Incomes</Radio.Button>
          </Radio.Group>
        </Flex>
      </Flex>
      <Column
        data={data}
        isStack
        xField="month"
        yField="total_spent"
        color={({ month }) => {
          const dataForMonth = data.find(({ month: m }) => m === month);

          const total = dataForMonth?.total_spent || 0;

          return total < 0 ? "#f5222d" : "#52c41a";
        }}
        label={{
          position: "middle",
          style: {
            fill: "#FFFFFF",
            opacity: 0.6,
          },
        }}
        xAxis={{
          label: {
            autoHide: true,
            autoRotate: false,
          },
        }}
        meta={{
          month: {
            alias: "Month",
          },
          total_spent: {
            alias: "Total",
          },
        }}
      />
    </Flex>
  );
};
