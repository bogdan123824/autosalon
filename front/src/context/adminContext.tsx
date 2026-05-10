import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AdminContextProps {
  username: string;
  password: string;
  isLogin: boolean;
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  toggleForm: () => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
      setError('Username should contain only English letters.');
      return;
    }

    if (username.length < 4) {
      setError('Username should be at least 4 characters long.');
      return;
    }

    if (password.length < 4) {
      setError('Password should be at least 4 characters long.');
      return;
    }

    try {
      const url = isLogin ? `${process.env.REACT_APP_DEV_URL}/login` : `${process.env.REACT_APP_DEV_URL}/register`;
      const response = await axios.post(url, { username, password });
      console.log(isLogin ? 'Login successful' : 'Registration successful', response.data);
      if (isLogin) {
        setUser(username);
        setIsAuthenticated(true);
        localStorage.setItem('user', username);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        setIsLogin(true);
      }
      setUsername('');
      setPassword('');
      setError(null);
    
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedUser && storedIsAuthenticated === 'true') {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setUsername('');
    setPassword('');
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/admin');
  };

  return (
    <AdminContext.Provider value={{
      username, setUsername,
      password, setPassword,
      isLogin, setIsLogin,
      isAuthenticated, setIsAuthenticated,
      user, setUser,
      error, handleSubmit, toggleForm, logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};