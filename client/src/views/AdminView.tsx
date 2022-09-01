import {
  RegisterUserForm,
  UsersList,
  Flex,
  TransactionsTable,
  AddTransactionForm,
} from "../components";

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
