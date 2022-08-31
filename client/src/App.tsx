import { UsersList } from "./components";
import { RegisterUserForm } from "./components/RegisterUser";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { TransactionsTable } from "./components/TransactionsTable";
import Layout, { Content } from "antd/lib/layout/layout";
import "antd/dist/antd.css";

function App() {
  return (
    <Layout>
      <Content style={{ margin: "2rem" }}>
        <RegisterUserForm />
        <UsersList />
        <AddTransactionForm />
        <TransactionsTable />
      </Content>
    </Layout>
  );
}

export default App;
