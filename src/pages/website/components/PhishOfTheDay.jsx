import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const PhishOfTheDay = ({ image }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Phish of the Day
                </h2>
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                    View History
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-cyber-surface/30 rounded-3xl border border-cyber-border/30 p-8 min-h-[420px]">
                {/* Image Placeholder */}
                <div className="aspect-[3/4] rounded-2xl bg-black overflow-hidden flex items-center justify-center relative border border-cyber-border/50 group">
                    {image ? (
                        <img src={image} alt="Phish of the Day" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="text-cyber-text-muted text-sm italic">Cyber Security Visual</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] font-bold rounded uppercase tracking-wider">
                            High Risk
                        </span>
                        <div className="flex items-center gap-1.5 text-cyber-text-muted text-xs">
                            <Clock size={14} />
                            <span>5 min read</span>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-white leading-tight">
                        Urgent: Microsoft <br /> Account Password <br /> Reset Request
                    </h3>

                    <p className="text-cyber-text-muted text-xl leading-relaxed">
                        Analyze this suspicious email attempt. Attackers are using sophisticated "0" substitution in domains. Can you spot the hidden red flags?
                    </p>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group mt-auto">
                        Analyze Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhishOfTheDay;
