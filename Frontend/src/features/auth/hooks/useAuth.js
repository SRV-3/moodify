import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ email, username, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ username, password }) {
    setLoading(true);
    const data = await login({ username, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleGetMe() {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handlelogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handlelogout,
  };
};
