import React, { useState } from 'react';
import {
    Lock, ShieldCheck, Monitor, Smartphone, Moon, Mail,
    LogOut, Award, ChevronRight, Edit2, Menu
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES_WEBSITE } from '../../constants/routes';

const Settings = ({ setIsMobileMenuOpen }) => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className="h-full overflow-y-auto bg-[#0a0f1d] text-white p-4 md:p-8">
            <Motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center text-xs text-slate-400 mb-2 gap-2">
                        <Link to={ROUTES_WEBSITE.DASHBOARD}><span className="hover:text-slate-300 cursor-pointer">Home</span></Link>
                        <ChevronRight size={12} />
                        <span className="text-blue-500">Account Settings</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 shrink-0"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-3xl font-bold">Account Settings</h1>
                    </div>
                    <p className="text-slate-400 text-sm">Manage your profile, security, and application preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">

                    {/* Left Column (Main Settings) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Login & Security */}
                        <Motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#111827]/60 border border-slate-800/60 rounded-3xl p-6"
                        >
                            <div className="mb-6">
                                <h2 className="text-lg font-bold">Login & Security</h2>
                                <p className="text-slate-400 text-sm">Manage your password and authentication methods.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#151b2d] rounded-2xl border border-slate-800/80 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0">
                                            <Lock size={18} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">Password</div>
                                            <div className="text-xs text-slate-400">Last changed 3 months ago</div>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 text-sm font-medium bg-[#1c2436] hover:bg-[#252d42] border border-slate-700/50 rounded-xl transition-colors">
                                        Change
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#151b2d] rounded-2xl border border-slate-800/80 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <ShieldCheck size={18} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm flex items-center gap-2">
                                                Two-Factor Authentication
                                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">ENABLED</span>
                                            </div>
                                            <div className="text-xs text-slate-400">Added protection for your account</div>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 text-sm font-medium bg-[#1c2436] hover:bg-[#252d42] border border-slate-700/50 rounded-xl transition-colors">
                                        Configure
                                    </button>
                                </div>
                            </div>
                        </Motion.section>

                        {/* Connected Devices */}
                        <Motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#111827]/60 border border-slate-800/60 rounded-3xl p-6"
                        >
                            <div className="mb-6">
                                <h2 className="text-lg font-bold">Connected Devices</h2>
                                <p className="text-slate-400 text-sm">Recent active sessions on your account.</p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-800/60">
                                            <th className="pb-3 font-medium min-w-[200px]">Device</th>
                                            <th className="pb-3 font-medium min-w-[150px]">Location</th>
                                            <th className="pb-3 font-medium min-w-[150px]">Last Active</th>
                                            <th className="pb-3 font-medium text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-slate-800/40">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <Monitor size={18} className="text-slate-400 shrink-0" />
                                                    <div>
                                                        <div className="font-semibold text-slate-200">MacBook Pro 14"</div>
                                                        <div className="text-xs text-slate-500">Chrome • macOS</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-slate-400">San Francisco, CA</td>
                                            <td className="py-4 text-slate-400">Current Session</td>
                                            <td className="py-4 text-right">
                                                <button className="text-slate-500 hover:text-slate-300 transition-colors p-2 rounded-lg hover:bg-slate-800/50">
                                                    <LogOut size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <Smartphone size={18} className="text-slate-400 shrink-0" />
                                                    <div>
                                                        <div className="font-semibold text-slate-200">iPhone 15 Pro</div>
                                                        <div className="text-xs text-slate-500">Safari • iOS</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-slate-400">Austin, TX</td>
                                            <td className="py-4 text-slate-400">2 hours ago</td>
                                            <td className="py-4 text-right">
                                                <button className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10">
                                                    <LogOut size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Motion.section>

                        {/* Platform Preferences */}
                        <Motion.section
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-[#111827]/60 border border-slate-800/60 rounded-3xl p-6"
                        >
                            <div className="mb-6">
                                <h2 className="text-lg font-bold">Platform Preferences</h2>
                                <p className="text-slate-400 text-sm">Customize your interface and communication.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-[#151b2d] rounded-2xl border border-slate-800/80">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0">
                                            <Moon size={18} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">Dark Mode</div>
                                            <div className="text-xs text-slate-400">Use dark theme across the platform</div>
                                        </div>
                                    </div>
                                    {/* Toggle Switch */}
                                    <div
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-slate-700'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#151b2d] rounded-2xl border border-slate-800/80 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0">
                                            <Mail size={18} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">Email Frequency</div>
                                            <div className="text-xs text-slate-400">Choose how often you hear from us</div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 text-xs font-medium bg-[#1c2436] hover:bg-[#252d42] border border-slate-700/50 rounded-xl transition-colors text-slate-300">
                                        Weekly Summary
                                    </button>
                                </div>
                            </div>
                        </Motion.section>
                    </div>

                    {/* Right Column (Profile & Stats) */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <Motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#111827]/60 border border-slate-800/60 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full bg-white shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1),_0_8px_16px_rgba(0,0,0,0.2)] border-4 border-[#111827] z-10 relative">
                                    {/* Placeholder avatar logic or image */}
                                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <div className="w-[80%] h-[80%] bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center border-2 border-[#111827] hover:bg-blue-600 transition-colors z-20 shadow-lg">
                                    <Edit2 size={12} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">Slama</h3>
                            <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-6">Security Analyst</p>

                            <div className="w-full h-px bg-slate-800/60 mb-6" />

                            <div className="flex justify-around w-full">
                                <div className="text-center">
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">Courses</div>
                                    <div className="text-xl font-bold text-white">12</div>
                                </div>
                                <div className="w-px h-10 bg-slate-800/60" />
                                <div className="text-center">
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">Rank</div>
                                    <div className="text-xl font-bold text-white">Expert</div>
                                </div>
                            </div>
                        </Motion.div>

                        {/* Security Score Card */}
                        <Motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 relative overflow-hidden text-white shadow-xl shadow-blue-900/20"
                        >
                            <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
                                <ShieldCheck size={150} />
                            </div>

                            <div className="relative z-10 flex items-center gap-2 mb-6">
                                <Award size={18} />
                                <span className="text-sm font-bold">Account Security Score</span>
                            </div>

                            <div className="relative z-10 mb-4">
                                <div className="w-full h-3 bg-blue-950/40 rounded-full overflow-hidden mb-4">
                                    <Motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '85%' }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                    />
                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="text-4xl font-black tabular-nums">85<span className="text-lg text-blue-200 font-medium">/100</span></div>
                                    <div className="px-3 py-1 rounded-lg bg-blue-400/30 border border-blue-300/30 text-[10px] uppercase tracking-wider font-bold backdrop-blur-sm">
                                        Excellent
                                    </div>
                                </div>
                            </div>

                            <p className="relative z-10 text-xs text-blue-100 font-medium leading-relaxed max-w-[90%]">
                                Enable app-based MFA to reach 100% security coverage.
                            </p>
                        </Motion.div>

                    </div>
                </div>

                {/* Bottom Sticky Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 md:left-64 p-4 z-40">
                    {/* Dark gradient fade for smooth integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/90 to-transparent -top-12 pointer-events-none" />

                    <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-end gap-6 bg-[#0B1120]/80 backdrop-blur-xl border border-slate-800/80 px-6 py-4 rounded-2xl shadow-2xl">
                        <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Discard Changes
                        </button>
                        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all">
                            Save All Changes
                        </button>
                    </div>
                </div>
            </Motion.div>
        </div>
    );
};

export default Settings;
