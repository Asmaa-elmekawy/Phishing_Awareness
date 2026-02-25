import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, BookOpen, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-cyber-bg text-cyber-text font-sans">
            {/* Navbar */}
            <nav className="border-b border-cyber-border bg-cyber-surface/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={32} className="text-cyber-primary" />
                        <span className="font-bold text-2xl tracking-tight">PhishGuard</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-cyber-text-muted font-medium">
                        <a href="#features" className="hover:text-cyber-primary transition-colors">Features</a>
                        <a href="#about" className="hover:text-cyber-primary transition-colors">About</a>
                        <Link to="/login" className="px-6 py-2.5 bg-cyber-primary hover:bg-cyber-primary-hover text-white rounded-lg transition-all shadow-lg shadow-cyber-primary/20 flex items-center gap-2">
                            Admin Portal <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-secondary/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Master the Art of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">
                            Phishing Detection
                        </span>
                    </h1>
                    <p className="text-xl text-cyber-text-muted max-w-3xl mx-auto mb-12">
                        PhishGuard is your comprehensive platform for cybersecurity awareness.
                        Learn to spot threats, test your skills, and stay one step ahead of cybercriminals.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-cyber-primary hover:bg-cyber-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-cyber-primary/25">
                            Start Learning Now
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-cyber-surface border border-cyber-border hover:bg-cyber-surface-alt rounded-xl font-bold text-lg transition-all">
                            Explore Modules
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-cyber-border bg-cyber-surface/30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-4xl font-bold text-cyber-primary mb-2">91%</div>
                        <div className="text-cyber-text-muted">Of cyber attacks start with a phishing email</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-cyber-secondary mb-2">$4.9M</div>
                        <div className="text-cyber-text-muted">Average cost of a data breach in 2025</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-cyber-accent mb-2">10/10</div>
                        <div className="text-cyber-text-muted">Security experts recommend regular training</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4">Why PhishGuard?</h2>
                        <div className="h-1 w-20 bg-cyber-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BookOpen className="text-cyber-primary" size={32} />}
                            title="Interactive Lessons"
                            description="Learn about various phishing techniques through real-world examples and interactive modules."
                        />
                        <FeatureCard
                            icon={<Eye className="text-cyber-secondary" size={32} />}
                            title="Detection Simulation"
                            description="Test your skills in our controlled environment. Can you spot the suspicious link?"
                        />
                        <FeatureCard
                            icon={<Lock className="text-cyber-accent" size={32} />}
                            title="Secure by Design"
                            description="Our platform follows industry-standard security protocols to keep your data safe."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-cyber-border bg-cyber-surface">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={24} className="text-cyber-primary" />
                        <span className="font-bold text-xl tracking-tight">PhishGuard</span>
                    </div>
                    <p className="text-cyber-text-muted text-sm">
                        © 2026 PhishGuard Security. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 bg-cyber-surface border border-cyber-border rounded-2xl hover:border-cyber-primary/50 transition-all hover:-translate-y-2 group">
        <div className="mb-6 p-4 bg-cyber-bg rounded-xl w-fit group-hover:bg-cyber-primary/10 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-cyber-text-muted leading-relaxed">{description}</p>
    </div>
);

export default Home;
