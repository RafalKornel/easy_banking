import { UsersList } from "./components";
import { RegisterUserForm } from "./components/RegisterUser";
import { UserSelect } from "./components/UserSelect";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <RegisterUserForm />
      <UserSelect />
      <UsersList />
    </div>
  );
}

export default App;
