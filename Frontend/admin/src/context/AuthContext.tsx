import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_CONFIG } from "../config/url.config";
import { TOKEN } from "../http";
import { IUser } from "../services/user.service";

type AuthContextType = {
  // userRole: string | null;
  userInfo: IUser | null;
  setUserInfo: (user: IUser) => void;
  // login: (role: string) => void;
  // logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [userRole, setUserRole] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  // const login = (role: string) => {
  //   setUserRole(role);
  // };

  // const logout = () => {
  //   setUserRole(null);
  // };

  useEffect(() => {
    // const token = localStorage.getItem(TOKEN);
    if (
      !userInfo?.role &&
      ![URL_CONFIG.LOGIN, URL_CONFIG.REGISTER].includes(pathname)
      // && !token
    ) {
      localStorage.removeItem(TOKEN);
      navigate(URL_CONFIG.LOGIN);
    }
  }, [navigate, pathname, userInfo?.role]);

  return (
    // <AuthContext.Provider value={{ userRole, userInfo, setUserInfo, login, logout }}>
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
