import { useHandleResourceState, useResource } from "../hooks";
import { getAllInvoices } from "../services/invoices";
import { ExpensesChart } from "./ExpensesChart";

type Props = {
  userId: number;
};

export const ExpensesChartForUser = ({ userId }: Props) => {
  const { resource, isLoading, error } = useResource(getAllInvoices);

  useHandleResourceState({ resource, isLoading, error });

  const invoicesForUser = (resource?.invoices || []).filter(
    (invoice) => invoice.user_id === userId
  );

  return <ExpensesChart invoices={invoicesForUser} />;
};
