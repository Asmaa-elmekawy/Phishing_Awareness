import React from 'react';
import { 
    Mail, 
    RefreshCcw, 
    History, 
    BookOpen, 
    BrainCircuit, 
    Smartphone, 
    Lightbulb,
    Zap,
    ShieldAlert,
    Eye,
    Hourglass,
    CheckCircle2,
    Lock
} from 'lucide-react';

const Profile = () => {
    const riskScore = 72;
    const circumference = 2 * Math.PI * 34; // r=34
    const offset = circumference - (riskScore / 100) * circumference;

    const simulations = [
        { id: 1, title: 'Urgent Invoice Phish', date: 'October 14, 2023 • 09:42 AM', status: 'clicked', color: 'text-red-500', bg: 'bg-red-500', desc: '*Subject: Urgent: Overdue Payment for Q3 Cloud Services*' },
        { id: 2, title: 'IT Support Password Reset', date: 'September 22, 2023 • 02:15 PM', status: 'reported', color: 'text-green-500', bg: 'bg-green-500' },
        { id: 3, title: 'HR Policy Update 2024', date: 'August 05, 2023 • 11:00 AM', status: 'ignored', color: 'text-amber-500', bg: 'bg-amber-500' },
        { id: 4, title: 'Internal Coffee Gift Card', date: 'July 18, 2023 • 08:30 AM', status: 'passed', color: 'text-green-500', bg: 'bg-green-500' },
    ];

    const training = [
        { id: 1, name: 'Fundamentals of Social Engineering', date: 'Completed Oct 15', score: '92/100', status: 'completed' },
        { id: 2, name: 'Recognizing Malicious Attachments', progress: 45, status: 'in-progress' },
        { id: 3, name: 'Advanced Business Email Compromise', status: 'locked' },
        { id: 4, name: 'Remote Work Security Basics', status: 'locked' },
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-cyber-bg text-cyber-text-muted">
            {/* Header Section */}
            <header className="bg-cyber-surface/40 border border-cyber-border/50 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20">
                        <img 
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                            alt="Mohamed slama" 
                            className="w-full h-full rounded-full object-cover border-4 border-cyber-primary/30"
                        />
                        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-red-500 border-2 border-cyber-bg rounded-full"></div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-cyber-text mb-1">Mohamed slama's Profile</h1>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="bg-cyber-primary/10 text-cyber-primary px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">Sales Department</span>
                            <span className="text-cyber-text-muted/60">•</span>
                            <span className="text-cyber-text-muted/60">Employee ID: #44920</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-cyber-text-muted">
                            <History size={14} />
                            <span>Last active: 2 hours ago from Mansoura</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-20 h-20">
                        <svg width="80" height="80" className="-rotate-90">
                            <circle cx="40" cy="40" r="34" strokeWidth="6" className="fill-none stroke-white/5" />
                            <circle 
                                cx="40" cy="40" r="34" strokeWidth="6" 
                                className="fill-none stroke-red-500 transition-[stroke-dashoffset] duration-1000 ease-out"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-extrabold text-cyber-text leading-none">{riskScore}</span>
                            <span className="text-[10px] text-cyber-text-muted leading-none">/100</span>
                        </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest">High Risk</span>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyber-surface/60 border border-cyber-border/50 rounded-xl text-sm font-semibold text-cyber-text hover:bg-cyber-surface-alt/80 transition-all">
                        <Mail size={16} />
                        Message User
                    </button>
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyber-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                        <RefreshCcw size={16} />
                        Re-assign Training
                    </button>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Simulation History Column */}
                <div className="bg-cyber-surface/60 border border-cyber-border/40 rounded-2xl p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-3 text-base font-bold text-cyber-text">
                            <History size={20} className="text-cyber-primary" />
                            Simulation History
                        </h2>
                        <span className="text-[10px] text-cyber-text-muted">Last 6 Months</span>
                    </div>
                    
                    <div className="relative pl-6 space-y-8 before:absolute before:left-1 before:top-1.5 before:bottom-1.5 before:w-px before:bg-cyber-border/50">
                        {simulations.map((item) => (
                            <div key={item.id} className="relative">
                                <div className={`absolute -left-[24.5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-cyber-bg ${item.bg}`}></div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-cyber-text">{item.title}</h3>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase ${item.status === 'clicked' ? 'bg-red-500/10 text-red-500 border-red-500/20' : item.status === 'reported' || item.status === 'passed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-cyber-text-muted">{item.date}</span>
                                    {item.desc && (
                                        <div className="mt-3 bg-cyber-surface-alt/30 border border-cyber-border/30 rounded-lg p-3 text-[11px] leading-relaxed italic text-cyber-text-muted/80">
                                            {item.desc}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training Progress Column */}
                <div className="bg-cyber-surface/60 border border-cyber-border/40 rounded-2xl p-6 flex flex-col h-full">
                    <h2 className="flex items-center gap-3 text-base font-bold text-cyber-text mb-6">
                        <BookOpen size={20} className="text-cyber-primary" />
                        Training Progress
                    </h2>
                    
                    <div className="flex justify-between items-center mb-6 text-sm">
                        <span className="text-cyber-text-muted">Current Course Load</span>
                        <span className="text-cyber-primary font-semibold">65% Complete</span>
                    </div>

                    <div className="space-y-4 flex-1">
                        {training.map((course) => (
                            <div key={course.id} className="group p-3 rounded-xl hover:bg-cyber-surface-alt/20 transition-colors flex justify-between items-start gap-4">
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-sm font-semibold text-cyber-text group-hover:text-cyber-primary transition-colors">{course.name}</h3>
                                    {course.date && <span className="text-[10px] text-cyber-text-muted">{course.date}</span>}
                                    {course.progress !== undefined && (
                                        <div className="w-full mt-2">
                                            <span className="text-[10px] text-cyber-text-muted">In Progress - {course.progress}%</span>
                                            <div className="w-full h-1 bg-cyber-border/50 rounded-full mt-1.5 overflow-hidden">
                                                <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>
                                    )}
                                    {course.status === 'locked' && <span className="text-[10px] text-cyber-text-muted">Unstarted</span>}
                                </div>
                                <div className="mt-1">
                                    {course.status === 'completed' && <CheckCircle2 size={18} className="text-green-500" />}
                                    {course.status === 'in-progress' && <Eye size={18} className="text-amber-500" />}
                                    {course.status === 'locked' && <Lock size={18} className="text-cyber-border" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 p-3 bg-cyber-surface-alt/60 border border-cyber-border/50 rounded-xl text-sm font-semibold text-cyber-text hover:bg-cyber-surface-alt/80 transition-all">
                        View All Training History
                    </button>
                </div>

                {/* Behavioral Insights Column */}
                <div className="bg-cyber-surface/60 border border-cyber-border/40 rounded-2xl p-6 flex flex-col h-full">
                    <h2 className="flex items-center gap-3 text-base font-bold text-cyber-text mb-6">
                        <BrainCircuit size={20} className="text-cyber-primary" />
                        Behavioral Insights
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-cyber-surface-alt/30 border border-cyber-border/30 rounded-xl p-4 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-cyber-text-muted mb-2">Time to Click</div>
                            <div className="text-2xl font-extrabold text-red-500">45<span className="text-sm font-normal ml-0.5">s</span></div>
                            <div className="text-[9px] text-cyber-text-muted/60 mt-1">Avg. Company: 124s</div>
                        </div>
                        <div className="bg-cyber-surface-alt/30 border border-cyber-border/30 rounded-xl p-4 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-cyber-text-muted mb-2">Reporting Rate</div>
                            <div className="text-2xl font-extrabold text-amber-500">20<span className="text-sm font-normal ml-0.5">%</span></div>
                            <div className="text-[9px] text-cyber-text-muted/60 mt-1">Goal: 85%+</div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyber-text-muted mb-4">Common Risk Triggers</h4>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-surface-alt/40 border border-red-500/30 text-red-500 rounded-lg text-xs font-semibold">
                                <Zap size={14} /> Urgency
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-surface-alt/40 border border-red-500/30 text-red-500 rounded-lg text-xs font-semibold">
                                <ShieldAlert size={14} /> Authority
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-surface-alt/40 border border-cyber-border/50 text-cyber-text-muted rounded-lg text-xs font-semibold">
                                <Eye size={14} /> Curiosity
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-surface-alt/40 border border-cyber-border/50 text-cyber-text-muted rounded-lg text-xs font-semibold">
                                <Lock size={14} /> Scarcity
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyber-text-muted mb-4">Most Targeted Device</h4>
                        <div className="bg-gradient-to-br from-cyber-primary/10 to-transparent border border-cyber-primary/20 rounded-xl p-4 flex items-center gap-4">
                            <Smartphone size={24} className="text-cyber-primary shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-cyber-text">Mobile (iPhone 14)</h4>
                                <p className="text-[11px] leading-relaxed text-cyber-text-muted">80% of risk interactions occur on mobile device during commute hours.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-500 mb-2">
                            <Lightbulb size={16} />
                            Risk Mitigation Tip
                        </div>
                        <p className="text-[11px] leading-relaxed text-cyber-text-muted/80">
                            John tends to respond rapidly to "Urgent" emails from "Authority" figures. Focused training on verifying sender identity via secondary channels is recommended.
                        </p>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-cyber-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-cyber-text-muted/50">
                <p>© 2024 CyberSafe AI Cybersecurity Intelligence. SOC2 Compliant.</p>
                <div className="flex gap-6">
                    <span className="hover:text-cyber-text-muted cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="hover:text-cyber-text-muted cursor-pointer transition-colors">Audit Logs</span>
                    <span className="hover:text-cyber-text-muted cursor-pointer transition-colors">Data Management</span>
                </div>
            </footer>
        </div>
    );
};

export default Profile;
