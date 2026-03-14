import {
    Shield, Eye, TrendingUp, Globe, Trophy,
    AlertTriangle, ArrowRight, Clock, ChevronRight,
    Zap, BookOpen, Star, Menu
} from 'lucide-react';
import StatsCards from './components/StatsCards';

const Dashboard = ({ setIsMobileMenuOpen }) => {
    const recommendedLessons = [
        { title: 'URL Masking Techniques', duration: '10 min', level: 'Intermediate' },
        { title: 'Social Engineering 101', duration: '15 min', level: 'Beginner' },
        { title: 'Attachment Safety', duration: '8 min', level: 'Advanced' },
    ];

    const activeLessons = [
        { title: 'Email Basics', subtitle: 'Header Analysis', time: '12 mins left', progress: 60 },
        { title: 'Advanced URL Spoofing', subtitle: 'Homograph Attacks', time: '18 mins', progress: 0 },
    ];

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* ===== الترحيب ===== */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <button
                                className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                            <Shield size={28} className="text-cyber-primary" />
                            <h1 className="text-3xl font-bold">
                                Welcome back, <span className="text-cyber-primary">Slama</span>!
                            </h1>
                        </div>
                        <p className="text-cyber-text-muted flex items-center gap-2">
                            <Eye size={16} />
                            Your shield is strong. You've blocked <span className="text-cyber-primary font-bold">12 attempts</span> this week.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 p-4 bg-cyber-surface/50 rounded-2xl border border-cyber-border/50">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-500">99%</div>
                            <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-lg text-xs font-medium">Secure</span>
                        </div>
                        <div className="h-12 w-px bg-cyber-border"></div>
                        <div>
                            <p className="text-sm text-cyber-text-muted">Security Score</p>
                            <p className="font-medium">Excellent performance</p>
                        </div>
                    </div>
                </div>

                {/* ===== بطاقات الإحصائيات ===== */}
                <StatsCards />

                {/* ===== الصف الرئيسي (3 أعمدة) ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* العمود 1: Phish of the Day */}
                    <div className="bg-cyber-surface rounded-2xl border border-red-500/20 p-5 bg-gradient-to-br from-red-500/10 to-transparent">
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <span className="px-3 py-1.5 bg-red-500/20 text-red-500 rounded-lg text-xs font-bold flex items-center gap-1">
                                    <AlertTriangle size={14} /> HIGH RISK
                                </span>
                                <span className="text-xs text-cyber-text-muted">5 min read</span>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-2">Urgent: Microsoft Account Password Reset Request</h3>
                                <p className="text-sm text-cyber-text-muted leading-relaxed">
                                    Analyze this suspicious email attempt. Attackers are using sophisticated "0" substitution in domains. Can you spot the hidden red flags?
                                </p>
                            </div>

                            <button className="flex items-center gap-2 text-cyber-primary text-sm font-medium hover:gap-3 transition-all">
                                Analyze Now <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* العمود 2: Progress */}
                    <div className="bg-cyber-surface rounded-2xl border border-cyber-border/50 p-5">
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h2 className="text-lg font-bold mb-1">Progress</h2>
                                <div className="flex items-center gap-2 text-sm text-cyber-text-muted">
                                    <Zap size={16} className="text-yellow-400" />
                                    <span>+150 XP earned today</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-1 text-sm text-cyber-primary hover:gap-2 transition-all">
                                View History <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Progress</span>
                                    <span className="text-cyber-primary">72%</span>
                                </div>
                                <div className="w-full h-2 bg-cyber-bg rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent rounded-full" style={{ width: '72%' }} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <Clock size={16} className="text-cyber-text-muted" />
                                <span className="text-cyber-text-muted">4 of 6 Lessons completed today</span>
                            </div>
                        </div>
                    </div>

                    {/* العمود 3: Recommended */}
                    <div className="bg-cyber-surface rounded-2xl border border-cyber-border/50 p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Recommended</h2>
                            <button className="text-sm text-cyber-primary flex items-center gap-1 hover:gap-2 transition-all">
                                SEE ALL <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {recommendedLessons.map((lesson, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-cyber-bg/50 hover:bg-cyber-bg transition-colors cursor-pointer">
                                    <div>
                                        <p className="font-medium text-sm mb-1">{lesson.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-cyber-text-muted">
                                            <Clock size={12} />
                                            <span>{lesson.duration}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                                                lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                                                    'bg-red-500/20 text-red-500'
                                                }`}>
                                                {lesson.level}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===== الصف السفلي (عمودين) ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Active Curriculum (ياخد عمودين) */}
                    <div className="lg:col-span-2 bg-cyber-surface rounded-2xl border border-cyber-border/50 p-5">
                        <div className="flex items-center gap-2 mb-5">
                            <BookOpen size={20} className="text-cyber-primary" />
                            <h2 className="text-lg font-bold">Active Curriculum</h2>
                        </div>

                        <div className="space-y-4">
                            {activeLessons.map((lesson, index) => (
                                <div key={index} className="p-4 rounded-xl bg-cyber-bg/50 border border-cyber-border/50">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="font-bold mb-1">{lesson.title}</p>
                                            <p className="text-sm text-cyber-text-muted">{lesson.subtitle} • {lesson.time}</p>
                                        </div>
                                        {lesson.progress === 0 && (
                                            <span className="px-2 py-1 bg-cyber-bg rounded-lg text-xs font-medium text-cyber-text-muted border border-cyber-border">
                                                NOT STARTED
                                            </span>
                                        )}
                                    </div>
                                    {lesson.progress > 0 && (
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-cyber-text-muted">Progress</span>
                                                <span className="text-cyber-primary">{lesson.progress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-cyber-bg rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent rounded-full" style={{ width: `${lesson.progress}%` }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 text-center text-sm text-cyber-primary py-2 hover:bg-cyber-primary/5 rounded-lg transition-colors">
                            See All
                        </button>
                    </div>

                    {/* Cyber Guard AI */}
                    <div className="bg-gradient-to-br from-cyber-primary/20 to-cyber-accent/20 rounded-2xl border border-cyber-primary/30 p-5">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-cyber-primary/20 rounded-xl">
                                <Shield size={24} className="text-cyber-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold">Cyber Guard AI</h3>
                                <p className="text-sm text-cyber-text-muted">Active Protection</p>
                            </div>
                            <ChevronRight size={20} className="text-cyber-text-muted" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;