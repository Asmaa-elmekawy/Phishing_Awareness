import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/admin');
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg auth-gradient p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cyber-surface p-10 rounded-2xl shadow-2xl border border-cyber-border w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 rounded-full bg-cyber-primary/10 mb-4">
                        <Shield size={40} className="text-cyber-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-cyber-text">Admin Security Portal</h2>
                    <p className="text-cyber-text-muted text-sm mt-2">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-cyber-error/10 text-cyber-error p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">Email Address</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@security.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-cyber-primary text-white font-bold hover:shadow-lg hover:shadow-cyber-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <div className="bg-cyber-bg/50 p-4 rounded-xl border border-cyber-border border-dashed">
                        <p className="text-xs font-bold text-cyber-text-muted mb-1">Demo Credentials:</p>
                        <p className="text-xs text-cyber-text-muted">Email: admin@security.com</p>
                        <p className="text-xs text-cyber-text-muted">Password: admin123</p>
                    </div>
                    <p className="text-[10px] text-cyber-text-muted uppercase tracking-widest font-semibold">
                        System Access Monitored & Encrypted
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
