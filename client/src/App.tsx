import Layout, { Content, Header } from "antd/lib/layout/layout";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import "antd/dist/antd.css";
import { AdminView } from "./views/AdminView";
import { Button, Typography } from "antd";
import { Flex } from "./components/Flex";
import { UserSelect } from "./components/UserSelect";
import { UserView } from "./views/UserView";

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <Header color="white">
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        additionalStyling={{ height: "100%" }}
      >
        <Typography.Title
          style={{ color: "white", margin: "auto 0", userSelect: "none" }}
          level={3}
        >
          Easy banking
        </Typography.Title>
        <Flex direction="row" additionalStyling={{ width: "auto" }}>
          <UserSelect onChange={(userId) => navigate(`/user/${userId}`)} />
          <Button
            type="ghost"
            htmlType="button"
            style={{ color: "white", marginLeft: "1rem" }}
          >
            <Link to={"/admin"}>Admin</Link>
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{ margin: "2rem" }}>
          <Routes>
            <Route path="/admin" element={<AdminView />} />
            <Route path="/user/:id" element={<UserView />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
