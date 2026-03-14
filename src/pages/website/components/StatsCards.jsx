// components/dashboard/StatsCards.jsx
import React from 'react';
import { TrendingUp, Globe, Trophy, Star } from 'lucide-react';

const StatsCards = () => {
    const stats = [
        {
            icon: <TrendingUp size={20} className="text-cyber-primary" />,
            label: 'Simulations Passed',
            value: '24 / 25',
            badge: '+12% vs last month',
        },
        {
            icon: <Globe size={20} className="text-cyber-primary" />,
            label: 'Global User Rank',
            value: 'Top 5%',
            badge: 'Gold League',
        },
        {
            icon: <Trophy size={20} className="text-cyber-primary" />,
            label: 'XP Progress',
            value: '1,200 XP to Gold',
            badge: '4 of 6 Lessons',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((stat, index) => (
                <div key={index} className="bg-cyber-surface rounded-2xl border border-cyber-border/50 p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-cyber-primary/10 rounded-xl">
                            {stat.icon}
                        </div>
                        <span className="px-2 py-1 bg-cyber-bg rounded-lg text-xs font-medium text-cyber-text-muted border border-cyber-border">
                            {stat.badge}
                        </span>
                    </div>
                    <p className="text-sm text-cyber-text-muted mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;