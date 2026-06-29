import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getme } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, loading, setLoading, setUser } = context;

  async function handleRegister(data) {
    setLoading(true);
    try {
      const res = await register(data);
      setUser(res.user);
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(data) {
    setLoading(true);
    try {
      const res = await login(data);
      setUser(res.user);
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initUser = async () => {
      try {
        const res = await getme();
        setUser(res.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [setLoading, setUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
