import { useState, useEffect } from "react";
import userService from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      console.log("📦 Users:", data);
      setUsers(data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (userId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await userService.makeAdmin(userId);
      console.log("✅ User promoted to admin:", data);
      setSuccess("User promoted to admin successfully");
      await fetchUsers(); // تحديث القائمة
      return data;
    } catch (err) {
      console.error("❌ Error making admin:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeAdmin = async (userId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await userService.removeAdmin(userId);
      console.log("✅ Admin rights removed:", data);
      setSuccess("Admin rights removed successfully");
      await fetchUsers(); // تحديث القائمة
      return data;
    } catch (err) {
      console.error("❌ Error removing admin:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    success,
    fetchUsers,
    makeAdmin,
    removeAdmin,
  };
};