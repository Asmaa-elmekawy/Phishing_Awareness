import { useState, useEffect } from "react";
import accountService from "../../services/AdminServices/accountService";

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
      if (data && data.profileImage) {
        // Construct the full image URL. Ensure not to double slash if the path has one.
        const imagePath = data.profileImage.startsWith("/")
          ? data.profileImage.slice(1)
          : data.profileImage;
        setProfileImage(`https://phish-escape.runasp.net/${imagePath}`);
      } else {
        setProfileImage(null);
      }
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
      await fetchCurrentUser(); // Get updated info which contains new image path
      return data;
    } catch (err) {
      console.error("❌ Error uploading image:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

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
  };
};
