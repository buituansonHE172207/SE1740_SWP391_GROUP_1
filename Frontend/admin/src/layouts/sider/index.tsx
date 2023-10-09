import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react'
import { getPath } from '../../utils';
import { Link, useLocation } from 'react-router-dom';
import menu from '../../routers';

const SiderApp = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { pathname: matchPatch } = useLocation();

    const routeMatched = getPath(menu, matchPatch);
    const selectedKeys = getPath(
      menu.map((single) => single.children),
      matchPatch
    );    
  return (
    <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={(value) => setCollapsed(value)}
    collapsedWidth={52}
    width={240}
  >
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={collapsed ? [] : routeMatched}
      defaultSelectedKeys={selectedKeys ? selectedKeys : routeMatched}
    >
      {menu.map((item, index) => {
        if (item.children.length > 0) {
          return (
            <Menu.SubMenu
              icon={item.icon}
              title={item.label}
              key={item.key}
            >
              {item.children.map((item2) => (
                <Menu.Item icon={item.icon} key={item2.key}>
                  <Link to={item2.path}>{item2.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item icon={item.icon} key={item.key}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      })}{" "}
    </Menu>
  </Sider>
  )
}

export default SiderApp