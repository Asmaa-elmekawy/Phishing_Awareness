import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, HelpCircle, LogOut, ShieldCheck, Users } from 'lucide-react';
import { useAuth } from '../../../../hooks/Admin/useAuth';
import { ROUTES_ADMIN } from '../../../../constants/routes';
const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate(ROUTES_ADMIN.AUTH.LOGIN);
    };

    const navItems = [
        { name: 'Overview', icon: <LayoutDashboard size={20} />, path: ROUTES_ADMIN.DASHBOARD, end: true },
        { name: 'Lessons', icon: <BookOpen size={20} />, path: ROUTES_ADMIN.LESSONS.LIST },
        { name: 'Questions', icon: <HelpCircle size={20} />, path: ROUTES_ADMIN.QUESTIONS.LIST },
        { name: 'User Management', icon: <Users size={20} />, path: ROUTES_ADMIN.SETTINGS.USER_SETTINGS },
    ];

    return (
        <aside className={`fixed md:relative z-50 w-64 bg-cyber-surface border-r border-cyber-border flex flex-col p-6 h-full transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
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
                                end={item.end}
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
                onClick={handleLogout}
                className="flex items-center text-red-500 gap-3 px-4 py-3 rounded-lg text-cyber-text-muted hover:bg-cyber-error/10 hover:text-cyber-error transition-all mt-auto group"
            >
                <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                <span className="font-medium ">Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;
