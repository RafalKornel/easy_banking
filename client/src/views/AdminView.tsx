import { Button, Typography } from "antd";
import {
  RegisterUserForm,
  UsersList,
  Flex,
  TransfersTable,
  AddTransferForm,
} from "../components";
import { AddInvoiceForm } from "../components/AddInvoiceForm";
import { InvoicesTable } from "../components/InvoicesTable";
import { useMutationWithToast } from "../hooks";
import { API } from "../services/api";

const triggerSeed = () => API.post("seed");

const SeederSection = () => {
  const triggerSeedWithToast = useMutationWithToast(triggerSeed);

  return (
    <Flex additionalStyling={{ margin: "4rem 0" }}>
      <Typography.Title level={3}>Seeder</Typography.Title>

      <Button onClick={triggerSeedWithToast}>Trigger seed</Button>
    </Flex>
  );
};

export const AdminView = () => (
  <Flex additionalStyling={{ height: "100%" }}>
    <SeederSection />

    <Flex direction="row" gap="2rem" justify="space-evenly">
      <UsersList />
      <RegisterUserForm />
    </Flex>

    <AddTransferForm />
    <TransfersTable />

    <AddInvoiceForm />
    <InvoicesTable />
  </Flex>
);
