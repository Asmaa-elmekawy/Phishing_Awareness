import React, { useState } from 'react';
import {
    LayoutDashboard, Microscope, BarChart3, Bot,
    User, Settings, ShieldCheck, BookOpen, Menu
} from 'lucide-react';
import NavItem from './NavItem';
import { ROUTES_WEBSITE } from '../../../constants/routes';

const WebsiteLayout = ({ children }) => {
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
                        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to={ROUTES_WEBSITE.DASHBOARD} />
                        <NavItem icon={<BookOpen size={20} />} label="Lessons" to={ROUTES_WEBSITE.LESSONS} />
                        <NavItem icon={<Microscope size={20} />} label="Simulations" to={ROUTES_WEBSITE.SIMULATIONS} />
                        <NavItem icon={<BarChart3 size={20} />} label="Analytics" to={ROUTES_WEBSITE.ANALYTICS} />
                        <NavItem icon={<Bot size={20} />} label="Ai" to={ROUTES_WEBSITE.AI} />

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
                {/* Mobile Menu Toggle (Only visible and functional on mobile if layout doesn't have its own header) */}
                {/* 
                  Note: Some pages have their own headers. 
                  We can provide a way to toggle the sidebar from children, 
                  or have a standard header here.
                  For now, we'll allow pages to have their own headers but provide the toggle function via context or props if needed.
                  Actually, let's pass setIsMobileMenuOpen to children components if they need it.
                */}
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { setIsMobileMenuOpen });
                    }
                    return child;
                })}
            </main>
        </div>
    );
};

export default WebsiteLayout;
