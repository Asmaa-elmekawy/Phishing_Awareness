import React from 'react';
import { Shield, Bell, Zap, ChevronRight, MessageSquare, Settings } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import StatsCards from './components/StatsCards';
import WeeklyGoalCard from './components/WeeklyGoalCard';
import PhishOfTheDay from './components/PhishOfTheDay';
import RecommendedLessons from './components/RecommendedLessons';
import ActiveCurriculum from './components/ActiveCurriculum';
import PhishLogo from '../../assets/phishing_of_the_day.png';

const Dashboard = ({ setIsMobileMenuOpen }) => {
    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 p-6 lg:p-10 space-y-10 overflow-y-auto w-full custom-scrollbar">
            <div className="max-w-[1400px] mx-auto space-y-10">

                {/* Header Section */}
                <Motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <Shield size={24} />
                            </button>
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                Welcome back, Slama!
                            </h1>
                        </div>
                        <p className="text-slate-400 text-sm md:text-base font-medium">
                            Your shield is strong. You've blocked <span className="text-blue-400 font-bold">12 attempts</span> this week.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-auto">
                        <button className="p-2 sm:p-3 text-slate-400 hover:text-white transition-all bg-cyber-surface/30 rounded-2xl border border-cyber-border/30 relative">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B1120]" />
                        </button>
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-cyber-surface/30 rounded-2xl border border-cyber-border/30">
                            <Zap size={18} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-white">7 Days Streak</span>
                        </div>
                    </div>
                </Motion.header>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">

                    {/* Left Column (Main Content) */}
                    <Motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="xl:col-span-2 space-y-4"
                    >
                        <StatsCards />
                        <PhishOfTheDay image={PhishLogo} />
                        <ActiveCurriculum />
                    </Motion.div>

                    {/* Right Column (Sidebar Content) */}
                    <Motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="xl:col-span-1 space-y-10"
                    >
                        <WeeklyGoalCard />
                        <RecommendedLessons />

                        {/* Assistant Section */}
                        <div className="space-y-4">

                            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-3xl border border-blue-500/20 p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700">
                                    <Shield size={120} className="text-blue-400" />
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-8 h-8 rounded bg-blue-400/20 animate-ping absolute inset-0" />
                                            <Shield className="w-8 h-8 text-blue-400 relative z-10" />
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Cyber Guard AI</h4>
                                    <p className="text-sm text-blue-100/60 mb-8 leading-relaxed">
                                        "Hello! Need help analyzing a specific link or suspicious email? I'm here to assist."
                                    </p>
                                    <div className="flex gap-3 w-full">
                                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 rounded-2xl transition-all border border-white/10 backdrop-blur-sm">
                                            Chat Now
                                        </button>
                                        <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 backdrop-blur-sm">
                                            <Settings size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Motion.div>
                </div>
            </div>

            <style sx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #334155;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
