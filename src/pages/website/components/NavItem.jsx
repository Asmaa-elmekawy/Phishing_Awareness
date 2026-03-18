import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ icon, label, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <div className={`${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
                        {icon}
                    </div>
                    {label}
                </>
            )}
        </NavLink>
    );
};

export default NavItem;
