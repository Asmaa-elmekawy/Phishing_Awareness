import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, HelpCircle, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Lessons', icon: <BookOpen size={20} />, path: '/admin/lessons' },
        { name: 'Questions', icon: <HelpCircle size={20} />, path: '/admin/questions' },
    ];

    return (
        <aside className="w-64 bg-cyber-surface border-r border-cyber-border flex flex-col p-6 h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-10 p-2">
                <ShieldCheck size={32} className="text-cyber-primary" />
                <span className="font-bold text-xl tracking-tight">PhishGuard</span>
            </div>

            <nav className="flex-1">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-cyber-primary text-white shadow-lg shadow-cyber-primary/20'
                                        : 'text-cyber-text-muted hover:bg-cyber-surface-alt hover:text-cyber-text'}
                `}
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-cyber-text-muted hover:bg-cyber-error/10 hover:text-cyber-error transition-all mt-auto group"
            >
                <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                <span className="font-medium">Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;
