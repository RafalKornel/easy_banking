import { Statistic, Typography } from "antd";
import { useParams } from "react-router-dom";
import {
  ErrorHandler,
  Flex,
  TransfersTable,
  MostRecentInvoiceCard,
  InvoicesTable,
  ExpensesChart,
} from "../components";
import { useHandleResourceState, useResource, useUsers } from "../hooks";
import { getAllInvoices } from "../services/invoices";

export const UserView = () => {
  const { id } = useParams();

  const usersResource = useUsers();

  const invoiceResource = useResource(getAllInvoices);

  useHandleResourceState(usersResource);
  useHandleResourceState(invoiceResource);

  if (!id) {
    return null;
  }

  const invoicesForUser = (invoiceResource?.resource?.invoices || []).filter(
    (invoice) => invoice.user_id === Number(id)
  );

  const currentUser = usersResource.resource?.users.find(
    ({ id: userId }) => id && userId === Number(id)
  );

  const mostRecentInvoice = [...invoicesForUser]
    .sort((a, b) =>
      new Date(a.invoice_date) > new Date(b.invoice_date) ? 1 : -1
    )
    .at(0);

  if (!currentUser)
    return <ErrorHandler error={new Error("Couldn't find user")} />;

  return (
    <Flex>
      <Flex direction="row">
        <Flex direction="column" justify="start">
          <Typography.Title level={2}>
            Welcome {currentUser?.username}
          </Typography.Title>
          <Statistic
            title="Your balance"
            value={currentUser?.balance}
            prefix="$"
          />
          {mostRecentInvoice && (
            <MostRecentInvoiceCard invoice={mostRecentInvoice} />
          )}
        </Flex>

        <Flex align="center" additionalStyling={{ width: "100%" }}>
          <ExpensesChart invoices={invoicesForUser} />
        </Flex>
      </Flex>

      <InvoicesTable
        title="Your invoices"
        filterFunction={(invoice) => invoice.user_id === currentUser.id}
      />

      <Flex additionalStyling={{ margin: "2rem 0" }}>
        <TransfersTable
          title="Incoming transfers"
          filterFunction={(transfer) =>
            transfer.recipient_id === currentUser.id
          }
        />
      </Flex>

      <Flex>
        <TransfersTable
          title="Outcoming transfers"
          filterFunction={(transfer) => transfer.sender_id === currentUser.id}
        />
      </Flex>
    </Flex>
  );
};
