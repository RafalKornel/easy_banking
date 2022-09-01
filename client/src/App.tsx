import Layout, { Content } from "antd/lib/layout/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";

import { UserView, AdminView } from "./views";
import { AppHeader } from "./components";

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
