import React from 'react';
import { Play, Lock } from 'lucide-react';

const ActiveCurriculum = () => {
    const curricula = [
        {
            title: 'Email Basics',
            subtitle: 'Header Analysis',
            time: '12 mins left',
            progress: 60,
            icon: '@',
            iconColor: 'text-blue-400 bg-blue-400/10'
        },
        {
            title: 'Advanced URL Spoofing',
            subtitle: 'Homograph Attacks',
            time: '18 mins',
            progress: 0,
            icon: '🔗',
            iconColor: 'text-purple-400 bg-purple-400/10',
            locked: true
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Active Curriculum</h2>
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                    See All
                </button>
            </div>

            <div className="space-y-4">
                {curricula.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-5 rounded-3xl border border-cyber-border/30 bg-cyber-surface/30 flex items-center gap-6"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 ${item.iconColor}`}>
                            {item.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                    <p className="text-cyber-text-muted text-sm">{item.subtitle} • {item.time}</p>
                                </div>
                                {item.progress > 0 ? (
                                    <span className="text-blue-400 font-bold">{item.progress}%</span>
                                ) : (
                                    <span className="text-cyber-text-muted text-[10px] font-bold uppercase tracking-wider">
                                        Not Started
                                    </span>
                                )}
                            </div>

                            {item.progress > 0 && (
                                <div className="h-1.5 bg-cyber-bg/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex-shrink-0">
                            {item.locked ? (
                                <Lock size={20} className="text-cyber-text-muted" />
                            ) : (
                                <Play size={20} className="text-blue-400" fill="currentColor" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveCurriculum;
