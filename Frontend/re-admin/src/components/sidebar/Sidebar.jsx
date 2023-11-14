import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChatIcon from '@mui/icons-material/Chat';
import ArticleIcon from '@mui/icons-material/Article';
import QueueIcon from '@mui/icons-material/Queue';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const authContext = useContext(AuthContext);

  const logout = () => {
    authContext.dispatch({ type: "LOGOUT" });
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SachTrucTuyen</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/authors" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Authors</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <Link to={"/collections"} style={{ textDecoration: 'none' }}>
            <li>
              <QueueIcon className="icon" />
              <span>Collections</span>
            </li>
          </Link>
          <Link to={"/sliders"} style={{ textDecoration: 'none' }}>
            <li>
              <SlideshowIcon className="icon" />
              <span>Sliders</span>
            </li>
          </Link>
          <Link to={"/publishers"} style={{ textDecoration: 'none' }}>
            <li>
              <AssuredWorkloadIcon className="icon" />
              <span>Publishers</span>
            </li>
          </Link>
          <Link to={'/posts'} style={{ textDecoration: 'none' }}>
            <li>
              <ArticleIcon className="icon" />
              <span>Posts</span>
            </li>
          </Link>
          <Link to={'/feedbacks'} style={{ textDecoration: 'none' }}>
            <li>
              <ChatIcon className="icon" />
              <span>Feedbacks</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to={"/changePass"} style={{ textDecoration: 'none' }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Change Password</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
