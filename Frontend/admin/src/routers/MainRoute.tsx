import { Route, Routes } from "react-router-dom";
import menu, { RouteMenu } from ".";
import { URL_CONFIG } from "../config/url.config";
import Container from "../layouts/container";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";

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

const MainRoute = () => {
  const renderRoute = () =>
    listMenu().map((route, index) => {
      return (
        // <AuthRoute key={index} permissions={route.permissions}>
        <Route
          key={index}
          path={route.path}
          element={<>{<Container> {route.element}</Container>}</>}
        />
        // </AuthRoute>
      );
    });
  return (
    <>
      <Routes>
        {renderRoute()}
        <Route path={URL_CONFIG.LOGIN} element={<LoginPage />} />
        <Route path={URL_CONFIG.REGISTER} element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default MainRoute;
