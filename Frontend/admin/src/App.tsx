import { Layout } from "antd";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ContentApp from "./layouts/content";
import HeaderApp from "./layouts/header";
import SiderApp from "./layouts/sider";

function App() {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <SiderApp />
          <Layout>
            <HeaderApp />
            <ContentApp />
          </Layout>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
