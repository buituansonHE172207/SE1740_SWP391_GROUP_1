import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import HeaderApp from "../header";
import SiderApp from "../sider";
type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderApp />
      <Layout>
        <HeaderApp />
        <Content>
          <Card>{children}</Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;
