import { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, LogIn, AlertCircle } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../hooks/Admin/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_WEBSITE } from '../../constants/routes';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!email || !password) {
            setLocalError('Please enter both email and password');
            return;
        }

        try {
            await login(email, password);
            navigate(ROUTES_WEBSITE.DASHBOARD);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const displayError = localError || error;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1d] text-white p-4 font-sans relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <Motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center mb-4 z-10"
            >
                {/* Logo Box */}
                <div className="relative mb-3">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl" />
                    <div className="relative w-16 h-16 bg-[#151b2d] border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Shield className="w-8 h-8 text-blue-500" />
                        <div className="absolute inset-x-4 top-4 bottom-4 flex items-center justify-center">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 absolute -top-1" />
                        </div>
                        <Lock className="w-3 h-3 text-blue-400 absolute center mt-1" size={12} />
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold tracking-tight">
                    Phish<span className="text-blue-500">Scape</span>
                </h1>
            </Motion.div>

            <Motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-[440px] bg-[#111827]/80 backdrop-blur-xl border border-slate-800/50 p-7 rounded-[32px] shadow-2xl z-10"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
                    <p className="text-slate-400 text-sm">Please enter your credentials to access the platform</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {displayError && (
                        <Motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm"
                        >
                            <AlertCircle size={18} />
                            {displayError}
                        </Motion.div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Corporate Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@company.com"
                                className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-200 placeholder:text-slate-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                                <Lock size={20} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-200 placeholder:text-slate-600"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? 'Logging in...' : (
                            <>
                                Log In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <span className="relative px-4 bg-[#111827] text-[10px] uppercase tracking-widest text-slate-500 font-bold">Enterprise Auth</span>
                    </div>

                    <button className="w-full bg-[#1c2436] hover:bg-[#252d42] text-slate-300 py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 border border-slate-800/50 transition-all active:scale-[0.98]">
                        <LogIn size={20} className="text-blue-500" />
                        SSO
                    </button>
                </div>
            </Motion.div>

            <div className="mt-6 text-center space-y-3 z-10">
                <p className="text-slate-400 text-sm">
                    Don't have an account? <Link to={ROUTES_WEBSITE.AUTH.REGISTER} className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Sign Up</Link>
                </p>
                
                <div className="pt-4 flex items-center justify-center gap-2 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium">
                    <Shield size={10} />
                    End-to-end encrypted training platform
                </div>
            </div>
        </div>
    );
};

export default Login;
