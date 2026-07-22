import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { login as loginApi } from "../api/authApi";
import { getProfile as getProfileApi } from "../api/adminApi";

const AuthContext = createContext(null);
const TOKEN_KEY = "portfolio_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrap = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await getProfileApi();
      setUser(data);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const { data } = await loginApi({ email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data);
    toast.success("Logged in");
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    toast.success("Logged out");
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, setUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

