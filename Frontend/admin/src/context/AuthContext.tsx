import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { URL_CONFIG } from '../config/url.config';
import { TOKEN } from '../http';

type AuthContextType = {
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [userRole, setUserRole] = useState<string | null>(null);


  const login = (role: string) => {
    setUserRole(role);
  };

  const logout = () => {
    setUserRole(null);
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (!userRole && ![URL_CONFIG.LOGIN, URL_CONFIG.REGISTER].includes(pathname) && !token) {
        navigate(URL_CONFIG.LOGIN);
    }
  }, [navigate, pathname, userRole])

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};