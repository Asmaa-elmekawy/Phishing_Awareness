import React, { useState } from 'react';
import {
    LayoutDashboard, Microscope, BarChart3, Bot,
    User, Settings, ShieldCheck, BookOpen, Menu,
    Search, Bell, Bookmark, Link as LinkIcon, Lightbulb,
    Paperclip, Lock, Flame, Medal, Shield, Eye, MousePointerClick, ChevronRight, FileSearch
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Lessons = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#0B1120] text-slate-300 font-sans overflow-hidden">
            {/* Mobile Sidebar Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside className={`fixed md:relative z-50 w-64 border-r border-slate-800/60 bg-[#0B1120] flex flex-col justify-between h-full flex-shrink-0 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div>
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">PhishScape</span>
                    </div>

                    {/* Navigation */}
                    <nav className="px-3 py-2 space-y-1">
                        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/" />
                        <NavItem icon={<BookOpen size={20} />} label="Lessons" active to="/lessons" />
                        <NavItem icon={<Microscope size={20} />} label="Simulations" to="/simulations" />
                        <NavItem icon={<BarChart3 size={20} />} label="Analytics" to="/analytics" />
                        <NavItem icon={<Bot size={20} />} label="Ai" to="/ai" />

                        <div className="pt-6 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Account
                        </div>
                        <NavItem icon={<User size={20} />} label="Profile" to="/profile" />
                        <NavItem icon={<Settings size={20} />} label="Settings" to="/settings" />
                    </nav>
                </div>

                {/* User Profile */}
                <div className="p-4 m-4 rounded-xl bg-slate-800/30 border border-slate-700/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex-shrink-0">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-white truncate">Slama Analyst</span>
                        <span className="text-xs text-blue-400 truncate">Lvl 14 Security</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

                {/* Top Header */}
                <header className="h-20 border-b border-slate-800/60 px-4 md:px-8 flex items-center justify-between shadow-sm z-10 bg-[#0B1120]/80 backdrop-blur-md flex-shrink-0">
                    <div className="flex items-center gap-3 flex-1 md:flex-none">
                        <button
                            className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden md:flex relative w-full md:w-[400px] xl:w-[500px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Find phishing tactics, modules, or security tips..."
                                className="w-full bg-[#151D2C] border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto w-full flex flex-col lg:flex-row [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* Left Main Content */}
                    <div className="flex-1 p-6 md:p-8 lg:border-r border-slate-800/60">

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">Active Curriculum</h1>
                                <p className="text-slate-400 text-sm mt-1">Pick up where you left off or start a new module.</p>
                            </div>
                            <button className="text-blue-500 text-sm font-semibold hover:text-blue-400 flex items-center gap-1">
                                View All Modules <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Active Module */}
                        <div className="bg-[#151D2C] rounded-2xl p-6 md:p-8 border border-slate-700/50 mb-8 relative">
                            <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                ACTIVE
                            </div>

                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                                    <span className="text-blue-500 text-2xl font-bold">@</span>
                                </div>
                                <div className="flex flex-col pt-1">
                                    <h2 className="text-xl font-bold text-white mb-1">Email Basics</h2>
                                    <p className="text-slate-400 text-sm">Header Analysis •. 12 mins •. Intermediate</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 tracking-wider">
                                    <span>OVERALL PROGRESS</span>
                                    <span className="text-blue-500">60%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2">
                                    Resume Lesson <ChevronRight size={18} />
                                </button>
                                <button className="p-2.5 rounded-xl border border-slate-700/50 bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                                    <Bookmark size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Module Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            {/* Card 1 */}
                            <div className="bg-[#151D2C] rounded-2xl p-6 border border-slate-700/50 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center flex-shrink-0">
                                        <LinkIcon className="text-slate-400" size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-800/30 px-2.5 py-1 rounded">Not Started</span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-white mb-1">Advanced URL Spoofing</h3>
                                    <p className="text-slate-400 text-sm">Homograph Attacks •. 18 mins</p>
                                </div>

                                <button className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800/20 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors">
                                    Start Module
                                </button>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-[#151D2C] rounded-2xl p-6 border border-slate-700/50 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center flex-shrink-0">
                                        <Lightbulb className="text-slate-400" size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-800/30 px-2.5 py-1 rounded">Not Started</span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-white mb-1">Psychological Triggers</h3>
                                    <p className="text-slate-400 text-sm">Authority & Urgency •. 15 mins</p>
                                </div>

                                <button className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-800/20 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition-colors">
                                    Start Module
                                </button>
                            </div>

                        </div>

                        {/* Locked Card */}
                        <div className="bg-[#151D2C]/40 rounded-2xl p-6 border border-slate-800/80 relative overflow-hidden flex flex-col justify-center min-h-[160px]">
                            {/* Locked overlay styling */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1120]/80 z-0"></div>

                            <div className="relative z-10 opacity-40">
                                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center mb-6">
                                    <Paperclip className="text-slate-400" size={20} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Attachment Safety</h3>
                                <p className="text-slate-400 text-sm">Macros & Extensions •. 20 mins</p>
                            </div>

                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[2px]">
                                <Lock className="text-slate-300 mb-2" size={28} />
                                <span className="font-bold text-slate-400 tracking-wider text-xs uppercase">Unlock at Level 05</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Panel */}
                    <div className="w-full lg:w-[320px] xl:w-[350px] p-6 md:p-8 flex flex-col bg-[#0B1120] flex-shrink-0 pb-24 lg:pb-8">

                        <h2 className="text-lg font-bold text-white mb-6">Learning Stats</h2>

                        {/* Weekly Goal */}
                        <div className="bg-[#151D2C] rounded-2xl p-5 border border-slate-700/50 mb-6">
                            <div className="flex justify-between text-xs font-semibold text-slate-400 mb-3 tracking-wider">
                                <span>Weekly Goal</span>
                                <span className="text-blue-500">72%</span>
                            </div>
                            <div className="text-xl font-bold text-white mb-4">
                                1,200 XP to Gold
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }}></div>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">4 of 6 Lessons Today</span>
                                <span className="text-emerald-400 font-semibold">+150 XP</span>
                            </div>
                        </div>

                        {/* Dual Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#151D2C] rounded-2xl p-5 border border-slate-700/50 flex flex-col items-center justify-center text-center">
                                <Flame className="text-orange-500 mb-2" size={28} />
                                <div className="font-bold text-white text-lg">7 Days</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Streak</div>
                            </div>
                            <div className="bg-[#151D2C] rounded-2xl p-5 border border-slate-700/50 flex flex-col items-center justify-center text-center">
                                <Medal className="text-blue-400 mb-2" size={28} />
                                <div className="font-bold text-white text-lg">Top 5%</div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Global Rank</div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-white mb-4">Recent Badges</h2>
                            <div className="flex gap-3 mb-6">
                                <div className="flex-1 aspect-square bg-[#151D2C] rounded-2xl flex items-center justify-center border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                    <ShieldCheck className="text-slate-400" size={24} />
                                </div>
                                <div className="flex-1 aspect-square bg-[#151D2C] rounded-2xl flex items-center justify-center border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                    <FileSearch className="text-slate-400" size={24} />
                                </div>
                                <div className="flex-1 aspect-square bg-[#151D2C] rounded-2xl flex items-center justify-center border border-slate-700/50 hover:bg-slate-800 transition-colors">
                                    <Eye className="text-slate-400" size={24} />
                                </div>
                            </div>
                            <button className="w-full text-center text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                                View Achievements
                            </button>
                        </div>

                        {/* Pro Simulation Banner */}
                        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white mt-auto relative overflow-hidden mb-8 flex flex-col items-center text-center">
                            {/* decorative faint circles in the background */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            <div className="absolute top-0 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

                            <h3 className="font-bold text-lg mb-2 relative z-10 w-full text-center">Pro Simulation</h3>
                            <p className="text-blue-100 text-sm mb-6 relative z-10 opacity-90 w-full text-center">
                                Try the new realistic Microsoft 365 credential harvesting simulation.
                            </p>
                            <button className="bg-white text-blue-600 font-bold py-2.5 px-6 rounded-xl w-full hover:bg-blue-50 transition-colors shadow-lg relative z-10">
                                Launch Now
                            </button>
                        </div>

                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50">
                    <button className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full shadow-xl shadow-blue-500/20 flex items-center justify-center text-white transition-transform hover:scale-105">
                        <Bot size={28} />
                    </button>
                </div>

            </main>
        </div>
    );
};

/* Helper Component for Sidebar Items */
const NavItem = ({ icon, label, active, to = "#" }) => {
    return (
        <RouterLink to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${active
            ? 'bg-blue-500/10 text-blue-400'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}>
            <div className={`${active ? 'text-blue-500' : 'text-slate-400'}`}>
                {icon}
            </div>
            {label}
        </RouterLink>
    );
};

export default Lessons;
