import React, { useState } from 'react';
import {
    Bell, BookOpen, LayoutDashboard, Microscope, BarChart3, Bot,
    User, Settings, ShieldCheck, ArrowLeft, AlertTriangle, AtSign,
    UserX, AlarmClock, Lightbulb, ArrowRight, Menu
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const Analytics = ({ setIsMobileMenuOpen, userData }) => {
    return (
        <>
            {/* Top Header */}
            <Motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="h-20 border-b border-slate-800/60 px-4 md:px-8 flex items-center justify-between shadow-sm z-10 bg-[#0B1120]/80 backdrop-blur-md flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <button className="hidden md:block p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="hidden md:flex w-8 h-8 rounded border border-blue-500/30 bg-blue-500/10 items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                    </div>
                    <h1 className="text-lg md:text-xl font-bold text-white truncate">PhishScape Analysis</h1>
                </div>
                <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                    <Bell size={20} />
                </button>
            </Motion.header>

            {/* Content Area */}
            <div className="flex-1 w-full flex flex-col lg:flex-row lg:overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {/* Left Panel: Simulated Inbox */}
                <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-[3] p-8 pb-32 lg:pb-40 lg:overflow-y-auto lg:border-r border-slate-800/60 bg-[#0B1120] lg:[&::-webkit-scrollbar]:hidden lg:[-ms-overflow-style:none] lg:[scrollbar-width:none]">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">Simulated Inbox</h2>
                        <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold tracking-wider uppercase rounded-full">
                            High Risk Attempt
                        </span>
                    </div>

                    {/* Email Container */}
                    <div className="bg-[#151D2C] border border-slate-700/40 rounded-2xl overflow-hidden shadow-2xl mr-4 max-w-2xl">

                        {/* Email Header */}
                        <div className="p-6 border-b border-slate-700/40 bg-slate-800/20 relative">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                    <AlertTriangle className="w-5 h-5 text-red-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="text-xs text-slate-400">From</div>
                                        <div className="text-xs text-slate-500">10:42 AM</div>
                                    </div>
                                    <div className="text-sm mb-3">
                                        <span className="font-bold text-white mr-2">Microsoft Support</span>
                                        <span className="text-red-400/80 bg-red-500/10 px-1.5 py-0.5 rounded text-xs">&lt;support@micros0ft-security.com&gt;</span>
                                    </div>

                                    <div className="text-xs text-slate-400 mb-1">Subject</div>
                                    <div className="text-lg font-bold text-white">Urgent: Security Breach Detected</div>
                                </div>
                            </div>
                        </div>

                        {/* Email Body */}
                        <div className="p-8 pb-10 flex flex-col">
                            <p className="text-red-400 bg-red-500/10 rounded px-2 py-1 inline-block self-start font-medium text-[15px] mb-6 border border-red-500/20">
                                Dear {userData?.firstName || 'User'},
                            </p>

                            <p className="text-slate-300 text-[15px] leading-relaxed mb-6 max-w-[480px]">
                                Our automated systems have detected an unauthorized
                                login attempt on your account from
                                an unrecognized location. For your protection, your access
                                has been temporarily restricted.
                            </p>

                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg self-start transition-colors mb-8 shadow-lg shadow-blue-500/20">
                                Verify Account Immediately
                            </button>

                            <div className="text-[15px] text-slate-300">
                                <p className="mb-0.5">Thank you {userData?.firstName || 'User'},</p>
                                <p className="font-bold">The Security Team</p>
                            </div>
                        </div>

                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 mt-6 max-w-2xl">
                        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-[#151D2C] border border-slate-700/40 rounded-xl flex-1 justify-center opacity-80">
                            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
                            <span className="text-sm font-medium text-slate-400">Threat Detected</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-[#151D2C] border border-slate-700/40 rounded-xl flex-1 justify-center opacity-80">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                            <span className="text-sm font-medium text-slate-400">Safe Element</span>
                        </div>
                        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-[#151D2C] border border-slate-700/40 rounded-xl flex-1 justify-center opacity-80">
                            <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                            <span className="text-sm font-medium text-slate-400">Interactive Link</span>
                        </div>
                    </div>

                </Motion.div>

                {/* Right Panel: Analysis & Breakdown */}
                <Motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex-[2] bg-[#0F1523] flex flex-col relative min-w-[380px] max-w-[500px] lg:h-full lg:min-h-0 border-t lg:border-t-0 border-slate-800/60">

                    <div className="p-8 pb-4 border-b border-slate-800/60 flex-shrink-0">
                        <div className="flex justify-between items-end mb-4">
                            <h2 className="text-xl font-bold text-white">Analysis & Breakdown</h2>
                            <div className="text-sm font-semibold text-blue-400">3 of 3 flags found</div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1 bg-slate-800 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-full rounded-full"></div>
                        </div>
                    </div>

                    <div className="flex-1 min-h-0 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <h3 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-6">Threat Indicators</h3>

                        <div className="space-y-4">

                            {/* Indicator 1 */}
                            <div className="bg-[#151D2C] border border-slate-700/60 rounded-xl p-5 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                                <div className="flex gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0">
                                        <AtSign size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1.5">Domain Spoofing</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Notice the '0' instead of 'o' in 'micros0ft'.
                                            Attackers use look-alike domains to trick you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Indicator 2 */}
                            <div className="bg-[#151D2C] border border-slate-700/60 rounded-xl p-5 relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                                <div className="flex gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0">
                                        <UserX size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1.5">Generic Greeting</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            <span className="text-orange-400">"Dear {userData?.firstName || 'User'}"</span> is a massive red flag.
                                            Legitimate companies will almost always
                                            use your full name in security alerts.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Indicator 3 */}
                            <div className="bg-[#151D2C] border border-slate-700/60 rounded-xl p-5 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                                <div className="flex gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center flex-shrink-0">
                                        <AlarmClock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1.5">Artificial Urgency</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Terms like <span className="text-red-400">"Immediately"</span> or <span className="text-red-400">"Action Required"</span> are designed to make you panic
                                            and skip critical thinking.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pro Tip */}
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5 mt-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                                        <Lightbulb size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-blue-100 font-bold mb-1.5">Pro Tip</h4>
                                        <p className="text-sm text-blue-200/70 leading-relaxed">
                                            Always hover over links (on desktop) or
                                            long-press (on mobile) to see the actual
                                            destination URL before clicking.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-8 bg-[#0F1523] mt-auto flex-shrink-0">
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                            Continue to Quiz <ArrowRight size={20} />
                        </button>
                    </div>

                </Motion.div>

            </div>
        </>
    );
};

export default Analytics;
