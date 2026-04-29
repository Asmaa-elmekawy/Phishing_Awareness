import React from 'react';
import { Play, Lock, Clock, Link, BrainCog, Mail } from 'lucide-react';

const RecommendedLessons = () => {
    const lessons = [
        {
            title: 'URL Masking Techniques',
            duration: '10 min',
            level: 'Intermediate',
            levelColor: 'text-yellow-500 bg-yellow-500/10',
            icon: <Link size={20} />,
            locked: false
        },
        {
            title: 'Social Engineering 101',
            duration: '15 min',
            level: 'Beginner',
            levelColor: 'text-emerald-500 bg-emerald-500/10',
            icon: <BrainCog size={20} />,
            locked: false
        },
        {
            title: 'Attachment Safety',
            duration: '8 min',
            level: 'Advanced',
            levelColor: 'text-red-500 bg-red-500/10',
            icon: <Mail size={20} />,
            locked: true
        }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Recommended</h2>
                <button onClick={() => window.location.href = "/lessons"} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors uppercase tracking-wider text-[11px]">
                    See All
                </button>
            </div>

            <div className="space-y-4">
                {lessons.map((lesson, idx) => (
                    <div
                        key={idx}
                        className={`group p-4 rounded-3xl border border-cyber-border/30 bg-cyber-surface/30 flex items-center gap-4 transition-all hover:bg-cyber-surface/50 cursor-pointer `}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-cyber-bg/50 flex items-center justify-center text-xl border border-cyber-border/20">
                            {lesson.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm truncate group-hover:text-blue-400 transition-colors">
                                {lesson.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-cyber-text-muted text-[10px]">
                                    <Clock size={12} />
                                    {lesson.duration}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${lesson.levelColor}`}>
                                    {lesson.level}
                                </span>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            {lesson.locked ? (
                                <Lock size={18} className="text-cyber-text-muted" />
                            ) : (
                                <div className="p-2 bg-cyber-bg/50 rounded-full border border-cyber-border/20 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all">
                                    <Play size={14} fill="currentColor" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedLessons;
