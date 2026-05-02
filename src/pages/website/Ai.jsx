import React, { useState, useEffect, useRef } from 'react';
import {
    Send, Plus, Smile, ShieldCheck, User,
    Search, Link as LinkIcon, History, Bot,
    Menu
} from 'lucide-react';
import { sendChatMessage } from '../../services/WebServices/chatService';
import authService from '../../services/AdminServices/authService';

const Ai = ({ setIsMobileMenuOpen }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'ai',
            type: 'text',
            text: "Hello! I'm your AI Cyber Assistant. Phishing often starts with a deceptive link. Would you like to dive into a specific concept?",
            timestamp: '10:42 AM'
        },
        {
            id: 2,
            role: 'ai',
            type: 'concept',
            title: "URL Spoofing",
            description: "is a common technique where attackers create a web address that looks legitimate but leads to a malicious site. For example:",
            examples: [
                { text: "facebo0k.com", label: "Malicious", type: "error" },
                { text: "facebook.com", label: "Official", type: "success" }
            ],
            timestamp: '10:42 AM'
        },
        {
            id: 3,
            role: 'user',
            type: 'text',
            text: "That's scary. How can I protect myself from these fake links?",
            timestamp: '10:44 AM'
        }
    ]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (customText = null) => {
        const textToSend = customText || input;
        if (!textToSend.trim() || isLoading) return;

        // Create user message object
        const userMsg = {
            id: Date.now(),
            role: 'user',
            type: 'text',
            text: textToSend,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Update state immediately
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Get current user ID or use fallback
            const userId = authService.getUserId() || "guest_user";

            // Initialize training if not started
            if (!isStarted) {
                try {
                    await sendChatMessage({
                        user_id: userId,
                        message: "/train"
                    });
                    setIsStarted(true);
                } catch (trainError) {
                    console.warn("Training failed, continuing anyway:", trainError);
                }
            }

            // Send actual message
            const response = await sendChatMessage({
                user_id: userId,
                message: textToSend
            });

            console.log("Webhook response:", response);

            const aiText =
                response?.reply ||
                response?.message ||
                response?.response ||
                response?.answer ||
                response?.text ||
                "I'm sorry, I couldn't process that response.";

            const aiResponse = {
                id: Date.now() + 1,
                role: 'ai',
                type: 'text',
                text: aiText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, aiResponse]);

        } catch (error) {
            console.error("Chat Error:", error);
            
            // Add error message to chat
            const errorMsg = {
                id: Date.now() + 2,
                role: 'ai',
                type: 'text',
                text: "I'm having trouble connecting to my brain right now. Please check your connection or try again later.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0B1120] text-slate-300 relative overflow-hidden">
            {/* Header */}
            <header className="p-4 border-b border-slate-800/60 flex items-center justify-between bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Bot className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white leading-none">Cyber Assistant</h1>
                        <span className="text-xs text-blue-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                            Online & Ready
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
                        <Search size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
                        <History size={18} />
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
            >
                <div className="flex justify-center mb-8">
                    <span className="px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Today</span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group animate-fade-in-up`}>
                        <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className="flex-shrink-0 mt-1">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${msg.role === 'user'
                                    ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                                    : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                    }`}>
                                    {msg.role === 'user' ? <User size={16} /> : <ShieldCheck size={16} />}
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="space-y-1">
                                <div className={`p-4 rounded-2xl border transition-all ${msg.role === 'user'
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]'
                                    : 'bg-slate-800/40 border-slate-700/50 text-slate-200'
                                    }`}>
                                    {msg.type === 'text' && <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>}

                                    {msg.type === 'concept' && (
                                        <div className="space-y-3">
                                            <h3 className="text-blue-400 font-bold text-base md:text-lg">{msg.title}</h3>
                                            <p className="text-sm md:text-base text-slate-300">{msg.description}</p>
                                            <div className="bg-[#0B1120]/60 p-4 rounded-xl space-y-2.5 border border-slate-700/50">
                                                {msg.examples.map((ex, i) => (
                                                    <div key={i} className="flex items-center justify-between gap-3 text-xs md:text-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-2 h-2 rounded-full ${ex.type === 'error' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`}></div>
                                                            <code className={`font-mono ${ex.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{ex.text}</code>
                                                        </div>
                                                        <span className="text-slate-500 italic">({ex.label})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`flex items-center gap-1.5 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <span className="text-[10px] text-slate-500 font-medium">{msg.timestamp}</span>
                                    {msg.role === 'user' && (
                                        <div className="flex gap-0.5">
                                            <div className="w-2 h-2 text-blue-400">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline><polyline points="22 8 11 19 6 14"></polyline></svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                    <div className="flex justify-start animate-fade-in-up">
                        <div className="flex gap-3 max-w-[85%] md:max-w-[70%]">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-blue-500/10 border-blue-500/20 text-blue-400">
                                    <ShieldCheck size={16} />
                                </div>
                            </div>
                            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex gap-1.5 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-8 bg-gradient-to-t from-[#0B1120] via-[#0B1120] to-transparent">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {[
                            { icon: <Search size={14} />, label: "Explain URL Spoofing" },
                            { icon: <LinkIcon size={14} />, label: "Check link" },
                            { icon: <History size={14} />, label: "Recent trends" }
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(action.label)}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 hover:border-slate-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {action.icon}
                                {action.label}
                            </button>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl"></div>
                        <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-xl focus-within:border-blue-500/50 transition-all">
                            <button className="p-3 text-slate-400 hover:text-white hover:bg-slate-700/40 rounded-xl transition-colors">
                                <Plus size={20} />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your question..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 py-3 text-sm md:text-base"
                            />
                            <button className="p-3 text-slate-400 hover:text-white hover:bg-slate-700/40 rounded-xl transition-colors">
                                <Smile size={20} />
                            </button>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className={`p-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] ${input.trim() && !isLoading
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95'
                                    : 'bg-slate-700/50 text-slate-500 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ai;