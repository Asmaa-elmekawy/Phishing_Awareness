import React, { useEffect } from 'react';
import { Play, Lock, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useLessonCards } from '../../../hooks/Web/useLessonCard';
import { useNavigate } from 'react-router-dom';
import { ROUTES_WEBSITE } from '../../../constants/routes';
import { motion as Motion } from 'framer-motion';

const getIcon = (iconName) => {
    const name = iconName?.toLowerCase() || '';
    if (name.includes('atsign') || name.includes('@')) return '📧';
    if (name.includes('link') || name.includes('url')) return '🔗';
    if (name.includes('alert')) return '⚠️';
    if (name.includes('paperclip')) return '📎';
    return '📘';
};

const ActiveCurriculum = () => {
    const { lessons, activeLessons, loading, fetchActiveLessons } = useLessonCards();
    const navigate = useNavigate();

    useEffect(() => {
        fetchActiveLessons();
    }, []);

    const handleNavigateToLessons = () => {
        navigate(ROUTES_WEBSITE.LESSONS);
    };

    const handleResumeLesson = (lessonId) => {
        navigate(ROUTES_WEBSITE.LESSON_QUESTIONS.replace(':lessonId', lessonId));
    };

    if (loading && activeLessons.length === 0) {
        return (
            <div className="space-y-4">
                <div className="h-6 w-48 bg-slate-800 rounded animate-pulse mb-6" />
                {[1, 2].map((i) => (
                    <div key={i} className="h-24 bg-cyber-surface/30 border border-cyber-border/30 rounded-3xl animate-pulse" />
                ))}
            </div>
        );
    }

    // Only show if there are active lessons or if we want the "See All" access
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-tight">Active Curriculum</h2>
                <button
                    onClick={handleNavigateToLessons}
                    className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors flex items-center gap-1 group"
                >
                    See All <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className="space-y-4">
                {activeLessons && activeLessons.length > 0 ? (
                    activeLessons.slice(0, 3).map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className="p-5 rounded-3xl border border-cyber-border/30 bg-cyber-surface/30 flex items-center gap-6 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl font-bold flex-shrink-0 group-hover:scale-105 transition-transform">
                                {getIcon(item.icon)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-white text-lg truncate">{item.title || 'Active Module'}</h4>
                                        <p className="text-cyber-text-muted text-sm truncate flex items-center gap-1.5">
                                            {item.topic || 'Security Analysis'} • <Clock size={12} /> {item.duration || '15 min'}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-blue-400 font-black text-lg">
                                            {item.progress || 0}%
                                        </span>
                                    </div>
                                </div>

                                <div className="h-1.5 bg-cyber-bg/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                                        style={{ width: `${item.progress || 0}%` }}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => handleResumeLesson(item.lessonId)}
                                className="flex-shrink-0 w-11 h-11 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-2xl flex items-center justify-center transition-all active:scale-90"
                            >
                                <Play size={20} fill="currentColor" className="ml-1" />
                            </button>
                        </div>
                    ))
                ) : null}

                {/* Always try to show a locked lesson if we have enough lessons */}
                {(() => {
                    const lockedLesson = (lessons || []).find(l => 
                        (l.status?.toLowerCase() === 'locked' || l.isLocked) && 
                        !activeLessons.some(a => a.lessonId === l.lessonId)
                    );

                    if (!lockedLesson) return null;

                    return (
                        <div
                            key={lockedLesson.id || 'locked'}
                            className="p-5 rounded-3xl border border-slate-800/20 bg-cyber-surface/10 flex items-center gap-6 opacity-60 grayscale-[0.5]"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-slate-800/30 text-slate-500 flex items-center justify-center flex-shrink-0">
                                <Lock size={28} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="overflow-hidden text-left">
                                        <h4 className="font-bold text-slate-400 text-lg truncate">{lockedLesson.title || 'Upcoming Module'}</h4>
                                        <p className="text-slate-600 text-sm truncate flex items-center gap-1.5">
                                            Locked Content • <Lock size={12} /> Milestone Required
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest pl-2 pt-1 text-right">
                                            {lockedLesson.status || 'Locked'}
                                        </span>
                                        <Lock size={16} className="text-slate-700" />
                                    </div>
                                </div>
                                <div className="h-1.5 bg-slate-800/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-700 w-[0%]" />
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {(!activeLessons || activeLessons.length === 0) && (!lessons || lessons.length === 0) && (
                    <div className="p-10 rounded-3xl border border-dashed border-slate-800 bg-cyber-surface/10 flex flex-col items-center text-center">
                        <BookOpen size={40} className="text-slate-600 mb-4" />
                        <h4 className="font-bold text-slate-400 mb-1">No Active Lessons</h4>
                        <p className="text-slate-500 text-xs mb-6">Start a new module to begin your journey.</p>
                        <button
                            onClick={handleNavigateToLessons}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                        >
                            Explore Curriculum
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveCurriculum;
