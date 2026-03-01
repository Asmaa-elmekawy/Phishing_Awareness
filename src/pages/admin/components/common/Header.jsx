import React from 'react';
import { User, Bell, Search } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 bg-cyber-surface border-bottom border-cyber-border flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="relative w-80">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                <input
                    type="text"
                    placeholder="Search lessons or questions..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-cyber-border bg-cyber-bg text-cyber-text outline-none focus:border-cyber-primary text-sm transition-all"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="bg-transparent text-cyber-text-muted relative hover:text-cyber-text transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyber-error rounded-full border-2 border-cyber-surface"></span>
                </button>

                <div className="flex items-center gap-4 border-l border-cyber-border pl-6">
                    <div className="text-right">
                        <p className="text-sm font-semibold">Admin</p>
                        <p className="text-xs text-cyber-text-muted">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-cyber-primary flex items-center justify-center text-white">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
