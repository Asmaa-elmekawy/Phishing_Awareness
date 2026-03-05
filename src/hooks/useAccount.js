import { useState, useEffect } from "react";
import accountService from "../services/accountService";

export const useAccount = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountService.getCurrentUser();
      console.log("👤 User data:", data);
      setUser(data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching user:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await accountService.updateUserInfo(userData);
      console.log("✅ User info updated:", data);
      setSuccess("Profile updated successfully");
      await fetchCurrentUser(); // نجيب البيانات المحدثة
      return data;
    } catch (err) {
      console.error("❌ Error updating user:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (passwordData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await accountService.changePassword(passwordData);
      console.log("✅ Password changed:", data);
      setSuccess("Password changed successfully");
      return data;
    } catch (err) {
      console.error("❌ Error changing password:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (imageFile) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await accountService.uploadProfileImage(imageFile);
      console.log("✅ Image uploaded:", data);
      setSuccess("Profile image uploaded successfully");
      await fetchProfileImage(); // نجيب الصورة الجديدة
      return data;
    } catch (err) {
      console.error("❌ Error uploading image:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const imageBlob = await accountService.getProfileImage();
      const imageUrl = URL.createObjectURL(imageBlob);
      setProfileImage((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return imageUrl;
      });
      return imageUrl;
    } catch (err) {
      console.error("❌ Error fetching profile image:", err);
      setError(err.message);
      // مش هنرمي الخطأ لأن ممكن ميكونش في صورة
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchProfileImage();
  }, []);

  // تنظيف الـ URL object عند إلغاء التحميل
  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  return {
    user,
    profileImage,
    loading,
    error,
    success,
    fetchCurrentUser,
    updateUserInfo,
    changePassword,
    uploadProfileImage,
    fetchProfileImage,
  };
};
