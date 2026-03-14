import React from 'react';
import { Star } from 'lucide-react';

const WeeklyGoalCard = ({ currentXp = 150, targetXp = 1200, lessonsDone = 4, totalLessons = 6 }) => {
    const progress = (currentXp / targetXp) * 100;

    return (
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="p-2 bg-white/20 rounded-full">
                    <Star size={20} fill="white" />
                </div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Weekly Goal
                </span>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-1">{targetXp.toLocaleString()} XP to Gold</h2>
                <p className="text-blue-100 text-sm mb-6">{lessonsDone} of {totalLessons} Lessons completed today</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                        <span className="opacity-80">Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-blue-100/80 text-xs font-medium">
                <div className="w-1 h-1 bg-blue-100 rounded-full" />
                <span>+150 XP earned today</span>
            </div>
        </div>
    );
};

export default WeeklyGoalCard;
