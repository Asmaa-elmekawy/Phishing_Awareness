import { useState } from "react";
import authService from "../../services/AdminServices/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const confirmEmail = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.confirmEmailGet(token);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    register,
    confirmEmail,
    forgetPassword: authService.forgetPassword,
    resetPassword: authService.resetPassword,
    logout: authService.logout,
  };
};
