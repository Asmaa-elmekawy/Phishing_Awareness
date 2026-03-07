import React, { useState } from "react";
import {
    Users,
    Shield,
    ShieldOff,
    Search,
    CheckCircle,
    AlertCircle,
    Mail,
    User
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useUsers } from "../../hooks/useUsers";
import Card from "./components/common/Card";

const UserSettings = () => {
    const {
        users,
        loading,
        error,
        success,
        makeAdmin,
        removeAdmin,
    } = useUsers();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [localError, setLocalError] = useState("");
    const [actionLoading, setActionLoading] = useState(null);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole =
            roleFilter === "all" ? true :
                roleFilter === "admin" ? user.isAdmin === true :
                    roleFilter === "user" ? user.isAdmin === false : true;

        return matchesSearch && matchesRole;
    });

    const handleToggleAdmin = async (user) => {
        setActionLoading(user.id);
        setLocalError("");

        try {
            if (user.isAdmin) {
                await removeAdmin(user.id);
            } else {
                await makeAdmin(user.id);
            }
        } catch (err) {
            setLocalError(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const getInitials = (email) => {
        return email?.substring(0, 2).toUpperCase() || "U";
    };

    if (loading && !users.length) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyber-primary/20 border-t-cyber-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Users size={24} className="text-cyber-primary/50" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyber-bg via-cyber-bg/95 to-cyber-bg p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyber-primary/10 border border-cyber-primary/20">
                            <Users size={32} className="text-cyber-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-accent bg-clip-text text-transparent pb-1">
                                User Management
                            </h1>
                            <p className="text-cyber-text-muted mt-1">
                                Manage users and their permissions
                            </p>
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

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted"
                        />
                        <input
                            type="text"
                            placeholder="Search users by email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10 h-11 w-full"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="input-field h-11 sm:w-48 cursor-pointer"
                    >
                        <option value="all">All Users</option>
                        <option value="admin">Admins Only</option>
                        <option value="user">Regular Users</option>
                    </select>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-gradient-to-br from-cyber-primary/10 to-transparent">
                        <p className="text-sm text-cyber-text-muted">Total Users</p>
                        <p className="text-2xl font-bold text-cyber-primary">{users.length}</p>
                    </Card>
                    <Card className="bg-gradient-to-br from-cyber-accent/10 to-transparent">
                        <p className="text-sm text-cyber-text-muted">Admins</p>
                        <p className="text-2xl font-bold text-cyber-accent">
                            {users.filter(u => u.isAdmin === true).length}
                        </p>
                    </Card>
                    <Card className="bg-gradient-to-br from-cyber-secondary/10 to-transparent">
                        <p className="text-sm text-cyber-text-muted">Regular Users</p>
                        <p className="text-2xl font-bold text-cyber-secondary">
                            {users.filter(u => u.isAdmin === false).length}
                        </p>
                    </Card>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {filteredUsers.map((user, index) => (
                            <Motion.div
                                key={user.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <Card className="p-4 hover:border-cyber-primary/30 transition-all h-full">
                                    <div className="flex flex-col h-full">
                                        {/* User Avatar - من الإيميل */}
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-primary/20 to-cyber-accent/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm font-bold text-cyber-primary">
                                                    {getInitials(user.email)}
                                                </span>
                                            </div>

                                            {/* Email */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center mt-2 gap-1 text-sm text-cyber-text-muted">
                                                    <Mail size={14} className="flex-shrink-0" />
                                                    <span className="truncate font-medium text-cyber-text">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Role Badge */}
                                        <div className="mb-3">
                                            <div className={`inline-flex px-2 py-1 rounded-lg text-xs font-bold items-center gap-1 ${user.isAdmin
                                                ? "bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/30"
                                                : "bg-cyber-surface-alt text-cyber-text-muted border border-cyber-border"
                                                }`}>
                                                <Shield size={12} />
                                                {user.isAdmin ? "Admin" : "User"}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={() => handleToggleAdmin(user)}
                                            disabled={actionLoading === user.id}
                                            className={`w-full mt-auto py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${user.isAdmin
                                                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30"
                                                : "bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 border border-cyber-primary/30"
                                                }`}
                                        >
                                            {actionLoading === user.id ? (
                                                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : user.isAdmin ? (
                                                <>
                                                    <ShieldOff size={12} />
                                                    Remove Admin
                                                </>
                                            ) : (
                                                <>
                                                    <Shield size={12} />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </Card>
                            </Motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* No Results */}
                {!loading && filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <Users size={48} className="mx-auto text-cyber-text-muted mb-4" />
                        <p className="text-cyber-text-muted">No users found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSettings;