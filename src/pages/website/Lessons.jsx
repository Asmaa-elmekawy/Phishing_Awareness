import React, { useState } from 'react';
import {
    Menu, Search, Bell, AtSign, Play, Bookmark,
    Link as LinkIcon, AlertCircle, Paperclip, Lock,
    Flame, Medal, Shield, Search as SearchIcon, Eye,
    MessageSquare,
    ShieldCheck,
    ShieldCheckIcon
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Lessons = ({ setIsMobileMenuOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0a0f1d] text-white overflow-hidden relative">
            {/* Top Bar */}
            <header className="h-16 border-b border-slate-800/60 px-4 md:px-8 flex items-center justify-between shrink-0 z-10 bg-[#0a0f1d]">
                <div className="flex items-center gap-4 flex-1">
                    <button
                        className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-xl relative">
                        <Search className="absolute left-3 text-slate-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Find phishing tactics, modules, or security tips..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111827] border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500/50 transition-colors text-slate-200 placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f1d]"></span>
                    </button>
                </div>
            </header>

            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">

                {/* Left Column: Active Curriculum */}
                <div className="flex-1 max-w-4xl flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Active Curriculum</h1>
                            <p className="text-slate-400 text-sm">Pick up where you left off or start a new module.</p>
                        </div>
                        <button className="text-blue-500 text-sm font-semibold hover:text-blue-400 hidden sm:block">
                            View All Modules &rarr;
                        </button>
                    </div>

                    {/* Featured Active Module */}
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#111827] border border-slate-800 rounded-2xl p-6 relative"
                    >
                        {/* Background subtle glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-start gap-4 flex-1 pr-4">
                                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <AtSign size={28} />
                                </div>
                                <div className="flex-1 w-full">
                                    <h2 className="text-xl font-bold mb-1">Email Basics</h2>
                                    <p className="text-slate-400 text-sm">Header Analysis • 12 mins • Intermediate</p>
                                    <div className="mb-6 mt-6">
                                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                            <span>Overall Progress</span>
                                            <span className="text-blue-400">60%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[60%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 text-sm">
                                            Resume Lesson <Play size={16} fill="currentColor" />
                                        </button>
                                        <button className="p-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-xl transition-colors border border-slate-700/50 flex-shrink-0">
                                            <Bookmark size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold tracking-wider rounded-full border border-green-500/20 shrink-0 mt-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                ACTIVE
                            </div>
                        </div>


                    </Motion.div>

                    {/* Other Modules Grid */}
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {/* Module 1 */}
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center">
                                    <LinkIcon size={20} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Not Started</span>
                            </div>
                            <h3 className="font-bold mb-1">Advanced URL Spoofing</h3>
                            <p className="text-xs text-slate-400 mb-6">Homograph Attacks • 18 mins</p>

                            <button className="mt-auto w-full py-2.5 bg-slate-800/30 hover:bg-slate-800 border border-slate-700/50 text-slate-300 text-sm font-bold rounded-xl transition-all">
                                Start Module
                            </button>
                        </Motion.div>

                        {/* Module 2 */}
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-slate-800 text-slate-300 rounded-xl flex items-center justify-center">
                                    <AlertCircle size={20} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Not Started</span>
                            </div>
                            <h3 className="font-bold mb-1">Psychological Triggers</h3>
                            <p className="text-xs text-slate-400 mb-6">Authority & Urgency • 15 mins</p>

                            <button className="mt-auto w-full py-2.5 bg-slate-800/30 hover:bg-slate-800 border border-slate-700/50 text-slate-300 text-sm font-bold rounded-xl transition-all">
                                Start Module
                            </button>
                        </Motion.div>

                        {/* Locked Module */}
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[#111827]/30 border border-slate-800/30 rounded-2xl p-6 flex flex-col relative overflow-hidden group opacity-60"
                        >
                            <div className="absolute inset-0 bg-[#0a0f1d]/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                                <Lock size={24} className="text-slate-500 mb-2" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unlock at Level 05</span>
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-slate-800/50 text-slate-500 rounded-xl flex items-center justify-center">
                                    <Paperclip size={20} />
                                </div>
                            </div>
                            <h3 className="font-bold mb-1 text-slate-400">Attachment Safety</h3>
                            <p className="text-xs text-slate-500">Macros & Extensions • 20 mins</p>
                        </Motion.div>
                    </div>
                </div>

                {/* Right Column: Sidebar Stats & Badges */}
                <div className="w-full lg:w-80 flex flex-col gap-6 lg:border-l border-slate-800/60 lg:pl-8 mt-8 lg:mt-0">

                    {/* Learning Stats */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Learning Stats</h2>
                        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 mb-4">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                <span>Weekly Goal</span>
                                <span className="text-blue-400">72%</span>
                            </div>
                            <div className="text-xl font-bold mb-4">1,200 XP to Gold</div>

                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-blue-500 w-[72%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">4 of 6 Lessons Today</span>
                                <span className="text-green-400 font-bold">+150 XP</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                <Flame size={24} className="text-orange-500 mb-2" />
                                <div className="font-bold text-lg leading-tight">7 Days</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Streak</div>
                            </div>
                            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                <Medal size={24} className="text-blue-400 mb-2" />
                                <div className="font-bold text-lg leading-tight">Top 5%</div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Global Rank</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Badges */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Recent Badges</h2>
                        <div className="flex items-center text-center justify-between gap-3 mb-4">
                            <div className="w-24 h-20 bg-[#111827] border border-slate-800 rounded-2xl flex items-center justify-center">
                                <ShieldCheckIcon size={24} className="text-slate-400" />
                            </div>
                            <div className="w-24 h-20 bg-[#111827] border border-slate-800 rounded-2xl flex items-center justify-center">
                                <SearchIcon size={24} className="text-slate-400" />
                            </div>
                            <div className="w-24 h-20 bg-[#111827] border border-slate-800 rounded-2xl flex items-center justify-center">
                                <Eye size={24} className="text-slate-400" />
                            </div>
                        </div>
                        <button className="text-sm font-semibold text-slate-400 hover:text-white transition-colors w-full text-center">
                            View Achievements
                        </button>
                    </div>

                    {/* Pro Simulation Banner */}
                    <div className="mt-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 relative overflow-hidden group shrink-0">
                        <div className="absolute -right-6 -bottom-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                            <Shield size={120} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 relative z-10">Pro Simulation</h3>
                        <p className="text-blue-100 text-sm mb-6 relative z-10 max-w-[200px] leading-relaxed">
                            Try the new realistic Microsoft 365 credential harvesting simulation.
                        </p>
                        <button className="bg-white text-blue-600 px-5 py-2 rounded-xl text-sm font-bold relative z-10 hover:shadow-lg transition-all active:scale-95">
                            Launch Now
                        </button>
                    </div>

                </div>
            </div>

            {/* Floating Bot Button */}
            <div className="absolute bottom-6 right-6 z-20 hidden md:block">
                <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:scale-105 transition-transform">
                    <MessageSquare size={24} className="text-white fill-white" />
                </button>
            </div>
        </div>
    );
};

export default Lessons;
