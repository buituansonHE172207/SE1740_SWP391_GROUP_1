import { Card } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import menu, { RouteMenu } from "../../routers";

const getAllRoute = (route: RouteMenu) => {
  let temps: Array<RouteMenu> = [];
  if (route.children.length > 0) {
    route.children.forEach((subItem: RouteMenu) => {
      let menu = getAllRoute(subItem);
      temps = [...temps, ...menu];
    });
  }
  temps.push(route);
  return temps;
};

const listMenu = () => {
  let list: Array<RouteMenu> = [];
  menu.forEach((item) => (list = [...list, ...getAllRoute(item)]));
  return list;
};

const ContentApp = () => {
  const renderRoute = () =>
    listMenu().map((route, index) => {
      if (route.children.length > 0) {
      }
      return <Route key={index} path={route.path} element={route.element} />;
    });

  return (
    <Content>
      <Card>
        <Routes>{renderRoute()}</Routes>
      </Card>
    </Content>
  );
};

export default ContentApp;
