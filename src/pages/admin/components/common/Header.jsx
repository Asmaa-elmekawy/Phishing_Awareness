import React from 'react';
import { User, Bell, Search, Menu } from 'lucide-react';
import { useAccount } from '../../../../hooks/Admin/useAccount';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const { user, profileImage } = useAccount();

  return (
    <header className="h-16 bg-cyber-surface border-bottom border-cyber-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          className="md:hidden p-2 -ml-2 text-cyber-text-muted hover:text-cyber-text transition-colors rounded-lg hover:bg-cyber-surface-alt"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-[200px] md:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
          <input
            type="text"
            placeholder="Search lessons or questions..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-cyber-border bg-cyber-bg text-cyber-text outline-none focus:border-cyber-primary text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="bg-transparent text-cyber-text-muted relative hover:text-cyber-text transition-colors">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyber-error rounded-full border-2 border-cyber-surface"></span>
        </button>

        <div className="flex items-center gap-2 md:gap-4 border-l border-cyber-border pl-4 md:pl-6">
          <Link to="/admin/profile" className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-cyber-text-muted">
                {user?.role || "User"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-cyber-primary flex items-center justify-center text-white overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
