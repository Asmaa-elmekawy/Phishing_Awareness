import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Activity, Users, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';

export const WelcomeSection = ({ userName }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 border border-cyber-primary/30 p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-8"
  >
    <div className="z-10 text-center md:text-left">
      <h1 className="text-3xl font-bold text-cyber-text mb-2">Welcome back, {userName}!</h1>
      <p className="text-cyber-text-muted max-w-md">
        Your system is currently secured. You have 3 new notifications and 5 pending quiz reviews for today.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
        <div className="flex items-center gap-2 px-4 py-2 bg-cyber-surface/50 rounded-lg border border-cyber-border text-sm">
          <Activity size={16} className="text-cyber-success" />
          <span>System Status: <span className="text-cyber-success font-bold">Optimal</span></span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-cyber-surface/50 rounded-lg border border-cyber-border text-sm">
          <Users size={16} className="text-cyber-primary" />
          <span>Active Users: <span className="font-bold">1,284</span></span>
        </div>
      </div>
    </div>
    <div className="relative w-64 h-64 md:w-80 md:h-64 flex-shrink-0">
        <img 
            src="/dashboard_hero.png" 
            alt="Cyber Security Illustration" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/20 to-transparent pointer-events-none"></div>
    </div>
  </motion.div>
);

export const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/,/g, ''));
    if (isNaN(end)) {
        setCount(value);
        return;
    }
    if (start === end) return;

    let totalMilisecondsChildStep = duration * 1000;
    let incrementTime = (totalMilisecondsChildStep / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{value.toString().includes('%') ? '%' : ''}</span>;
};

export const StatCard = ({ title, value, icon, trend, trendValue, colorClass, onClick }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    onClick={onClick}
    className={`bg-cyber-surface p-6 rounded-xl border border-cyber-border hover:border-cyber-primary/50 transition-colors relative overflow-hidden group ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${colorClass}/10 rounded-full blur-2xl group-hover:bg-${colorClass}/20 transition-colors`}></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-cyber-bg border border-cyber-border`}>
        {React.cloneElement(icon, { className: `text-${colorClass}` })}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-cyber-success' : 'text-cyber-error'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    
    <div>
      <p className="text-cyber-text-muted text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-cyber-text mt-1">
        <AnimatedCounter value={value} />
      </h3>
    </div>
  </motion.div>
);

export const SimpleChart = () => {
    // A simple mock SVG chart for visual appeal
    const points = "0,80 20,60 40,70 60,40 80,50 100,20 120,30 140,10 160,25 180,15 200,5";
    return (
        <div className="h-48 w-full relative mt-4 overflow-hidden rounded-lg bg-cyber-bg/30 border border-cyber-border/50 p-4">
            <svg viewBox="0 0 200 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-cyber-primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--color-cyber-primary)" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path 
                    d={`M 0,100 L ${points} L 200,100 Z`} 
                    fill="url(#chartGradient)" 
                />
                <motion.path 
                    d={`M ${points}`} 
                    fill="none" 
                    stroke="var(--color-cyber-primary)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Horizontal Grid lines */}
                {[0, 25, 50, 75, 100].map(y => (
                    <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="var(--color-cyber-border)" strokeWidth="0.5" strokeDasharray="4 2" />
                ))}
            </svg>
            <div className="absolute bottom-2 left-4 text-[10px] text-cyber-text-muted flex justify-between w-[calc(100%-2rem)]">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </div>
    );
};

export const ActivityTable = ({ activities }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-cyber-border">
          <th className="py-3 px-4 text-xs font-semibold text-cyber-text-muted uppercase tracking-wider">User</th>
          <th className="py-3 px-4 text-xs font-semibold text-cyber-text-muted uppercase tracking-wider">Activity</th>
          <th className="py-3 px-4 text-xs font-semibold text-cyber-text-muted uppercase tracking-wider">Status</th>
          <th className="py-3 px-4 text-xs font-semibold text-cyber-text-muted uppercase tracking-wider">Time</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity, index) => (
          <motion.tr 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-cyber-border/50 hover:bg-cyber-surface-alt/30 transition-colors"
          >
            <td className="py-3 px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyber-primary/20 flex items-center justify-center text-cyber-primary text-xs font-bold">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium">{activity.user}</span>
              </div>
            </td>
            <td className="py-3 px-4 text-sm text-cyber-text-muted">{activity.action}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                activity.status === 'Completed' ? 'bg-cyber-success/10 text-cyber-success' : 
                activity.status === 'Pending' ? 'bg-cyber-accent/10 text-cyber-accent' : 
                'bg-cyber-error/10 text-cyber-error'
              }`}>
                {activity.status}
              </span>
            </td>
            <td className="py-3 px-4 text-xs text-cyber-text-muted">{activity.time}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);
