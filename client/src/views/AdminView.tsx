import { Tabs } from "antd";
import {
  RegisterUserForm,
  UsersList,
  Flex,
  TransfersTable,
  AddTransferForm,
  SeederSection,
  InvoicesTable,
  AddInvoiceForm,
} from "../components";

enum AdminViewTabs {
  Seeder = "Seeder",
  Registration = "Registration",
  Transfers = "Transfers",
  Invoices = "Invoices",
}

export const AdminView = () => (
  <Flex additionalStyling={{ height: "100%" }}>
    <Tabs defaultActiveKey={AdminViewTabs.Registration}>
      <Tabs.TabPane
        tab={AdminViewTabs.Registration}
        key={AdminViewTabs.Registration}
      >
        <Flex direction="row" gap="2rem" justify="space-evenly">
          <UsersList />
          <RegisterUserForm />
        </Flex>
      </Tabs.TabPane>

      <Tabs.TabPane tab={AdminViewTabs.Transfers} key={AdminViewTabs.Transfers}>
        <AddTransferForm />
        <TransfersTable />
      </Tabs.TabPane>

      <Tabs.TabPane tab={AdminViewTabs.Invoices} key={AdminViewTabs.Invoices}>
        <AddInvoiceForm />
        <InvoicesTable />
      </Tabs.TabPane>

      <Tabs.TabPane tab={AdminViewTabs.Seeder} key={AdminViewTabs.Seeder}>
        <SeederSection />
      </Tabs.TabPane>
    </Tabs>
  </Flex>
);
