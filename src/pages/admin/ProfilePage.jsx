import React, { useState, useRef } from "react";
import { 
  User, 
  Mail, 
  Camera, 
  Edit2, 
  Save, 
  Shield, 
  Calendar,
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useAccount } from "../../hooks/useAccount";
import Card from "./components/common/Card";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const {
    user,
    profileImage,
    loading,
    error,
    success,
    updateUserInfo,
    changePassword,
    uploadProfileImage,
  } = useAccount();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  // State للمعلومات الشخصية
  const [userForm, setUserForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  // State لتغيير كلمة المرور
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // تحديث userForm عند تغير user
  React.useEffect(() => {
    if (user) {
      setUserForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setLocalError("Image size should be less than 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setLocalError("Please select an image file");
      return;
    }

    try {
      await uploadProfileImage(file);
      setLocalError("");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      await updateUserInfo({
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        email: userForm.email,
      });
      setIsEditing(false);
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setLocalError(err.message);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyber-primary/20 border-t-cyber-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield size={24} className="text-cyber-primary/50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-bg via-cyber-bg/95 to-cyber-bg p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
      <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/20 to-transparent rounded-2xl blur-3xl -z-10"></div>
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-cyber-text-muted hover:text-cyber-primary transition-colors mb-4 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyber-primary/10 border border-cyber-primary/20">
              <User size={32} className="text-cyber-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-accent bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-cyber-text-muted mt-1">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>
       

        {/* رسائل الخطأ والنجاح */}
        <AnimatePresence>
          {(error || localError) && (
            <Motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 flex items-center gap-3"
            >
              <AlertCircle size={20} />
              {error || localError}
            </Motion.div>
          )}

          {success && (
            <Motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl mb-6 flex items-center gap-3"
            >
              <CheckCircle size={20} />
              {success}
            </Motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Left Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 overflow-hidden group">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                {/* Cover Image Placeholder */}
                <div className="h-24 bg-gradient-to-r from-cyber-primary/20 to-cyber-accent/20 rounded-t-lg -mt-6 -mx-6 mb-4"></div>
                
                {/* Profile Image */}
                <div className="flex flex-col items-center -mt-12">
                  <div 
                    className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-cyber-surface to-cyber-surface-alt border-4 border-cyber-surface shadow-xl cursor-pointer group/image"
                    onClick={handleImageClick}
                  >
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-primary/20 to-cyber-accent/20">
                        <User size={40} className="text-cyber-primary" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all backdrop-blur-sm">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <h2 className="mt-4 text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-cyber-text-muted flex items-center gap-2">
                    <Mail size={14} />
                    {user?.email}
                  </p>
                  
                </div>

                {/* Member Since */}
                <div className="mt-6 pt-6 border-t border-cyber-border">
                  <div className="flex items-center gap-3 text-cyber-text-muted">
                    <Calendar size={18} />
                    <span className="text-sm">Member since March 2024</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info Section */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyber-primary/10">
                    <User size={20} className="text-cyber-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Personal Information</h2>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-all"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUserSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={userForm.firstName}
                        onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={userForm.lastName}
                        onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyber-primary text-white font-bold hover:shadow-lg hover:shadow-cyber-primary/30 transition-all"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setUserForm({
                          firstName: user?.firstName || "",
                          lastName: user?.lastName || "",
                          email: user?.email || "",
                        });
                      }}
                      className="px-6 py-3 rounded-xl border border-cyber-border text-cyber-text-muted hover:bg-cyber-surface-alt transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-cyber-bg/50 border border-cyber-border group hover:border-cyber-primary/30 transition-all">
                    <div className="p-3 rounded-lg bg-cyber-primary/10 group-hover:scale-110 transition-transform">
                      <User size={20} className="text-cyber-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-cyber-text-muted">Full Name</p>
                      <p className="font-medium text-lg">{user?.firstName} {user?.lastName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-cyber-bg/50 border border-cyber-border group hover:border-cyber-primary/30 transition-all">
                    <div className="p-3 rounded-lg bg-cyber-primary/10 group-hover:scale-110 transition-transform">
                      <Mail size={20} className="text-cyber-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-cyber-text-muted">Email Address</p>
                      <p className="font-medium text-lg">{user?.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Security Section */}
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyber-primary/10">
                  <Shield size={20} className="text-cyber-primary" />
                </div>
                <h2 className="text-xl font-bold">Security Settings</h2>
              </div>

              <div className="space-y-4">
                {/* Password Section */}
                <div className="p-4 rounded-xl bg-cyber-bg/50 border border-cyber-border">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Lock size={18} className="text-cyber-primary" />
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-cyber-text-muted">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      className="px-4 py-2 rounded-lg bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-all"
                    >
                      Change
                    </button>
                  </div>

                  <AnimatePresence>
                    {isChangingPassword && (
                      <Motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-cyber-border"
                      >
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                              placeholder="Enter current password"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                              placeholder="Enter new password"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              required
                              className="w-full px-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                              placeholder="Confirm new password"
                            />
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              type="submit"
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyber-primary text-white font-bold hover:shadow-lg hover:shadow-cyber-primary/30 transition-all"
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <Save size={18} />
                                  Update Password
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsChangingPassword(false);
                                setPasswordForm({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                              }}
                              className="px-6 py-3 rounded-xl border border-cyber-border text-cyber-text-muted hover:bg-cyber-surface-alt transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;