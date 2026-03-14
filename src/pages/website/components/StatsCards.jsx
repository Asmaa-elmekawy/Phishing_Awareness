import React from 'react';
import { TrendingUp, Globe, Trophy, Star, CheckCheckIcon, CheckCircle2, CheckCircle, CheckCircleIcon } from 'lucide-react';

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Security Score */}
            <div className="flex flex-col">
                <div className="bg-cyber-surface/30 rounded-3xl border border-cyber-border/30 p-4 flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-48 overflow-hidden">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 144 144">
                            <circle
                                cx="72" cy="72" r="64"
                                fill="none" stroke="currentColor" strokeWidth="10"
                                className="text-cyber-bg/50"
                            />
                            <circle
                                cx="72" cy="72" r="64"
                                fill="none" stroke="currentColor" strokeWidth="10"
                                strokeDasharray="402.12"
                                strokeDashoffset="4.02"
                                className="text-blue-500"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">99%</span>
                            <span className="text-[11px] text-emerald-500 font-bold uppercase">Secure</span>
                        </div>
                    </div>
                </div>
                <div className="mt-1 text-center">
                    <h3 className="text-sm font-bold text-white mb-1">Security Score</h3>
                    <p className="text-xs text-cyber-text-muted">Excellent performance</p>
                </div>
            </div>

            {/* Simulations Passed */}
            <div className="bg-cyber-surface/30 rounded-3xl border border-cyber-border/30 p-6 flex flex-col justify-between md:h-48">
                <div className="flex items-start">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 border border-emerald-500/20">
                        <CheckCircleIcon size={24} />
                    </div>
                    <span className="px-2 py-1 text-emerald-500 text-[15px] font-bold">
                        +12% vs last <br /> month
                    </span>
                </div>
                <div>
                    <p className="text-3xl font-bold text-white mb-1">24 / 25</p>
                    <p className="text-sm text-cyber-text-muted">Simulations Passed</p>
                </div>
            </div>

            {/* Global User Rank */}
            <div className="bg-cyber-surface/30 rounded-3xl border border-cyber-border/30 p-6 flex flex-col justify-between md:h-48">
                <div className="flex items-start">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500 border border-yellow-500/20">
                        <Trophy size={24} />
                    </div>
                    <span className="px-2 py-3 text-yellow-500 rounded-lg text-[10px] font-bold uppercase">
                        Gold League
                    </span>
                </div>
                <div>
                    <p className="text-3xl font-bold text-white mb-1">Top 5%</p>
                    <p className="text-sm text-cyber-text-muted">Global User Rank</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;