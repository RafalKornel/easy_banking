import { UsersList } from "./components";
import { RegisterUserForm } from "./components/RegisterUser";
import { UserSelect } from "./components/UserSelect";
import "antd/dist/antd.css";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { TransactionsTable } from "./components/TransactionsTable";
import Layout, { Content } from "antd/lib/layout/layout";

function App() {
  return (
    <Layout>
      <Content style={{ margin: "2rem" }}>
        <RegisterUserForm />
        <UserSelect />
        <UsersList />
        <AddTransactionForm />
        <TransactionsTable />
      </Content>
    </Layout>
  );
}

export default App;
