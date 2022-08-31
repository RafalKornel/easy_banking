import { RegisterUserForm, UsersList } from "../components";
import { AddTransactionForm } from "../components/AddTransactionForm";
import { Flex } from "../components/Flex";
import { TransactionsTable } from "../components/TransactionsTable";

export const AdminView = () => (
  <Flex additionalStyling={{ height: "100%" }}>
    <Flex direction="row" gap="2rem" justify="space-evenly">
      <UsersList />
      <RegisterUserForm />
    </Flex>
    <AddTransactionForm />
    <TransactionsTable />
  </Flex>
);
