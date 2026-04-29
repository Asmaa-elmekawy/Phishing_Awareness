import { useState } from 'react';
import { Shield, Mail, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../hooks/Admin/useAuth';
import { Link } from 'react-router-dom';
import { ROUTES_WEBSITE } from '../../constants/routes';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [localError, setLocalError] = useState('');
    const { forgetPassword, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!email) {
            setLocalError('Please enter your email address');
            return;
        }

        try {
            await forgetPassword(email);
            setIsSubmitted(true);
        } catch (err) {
            setLocalError(err.message || 'Failed to send reset email. Please try again.');
        }
    };

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
                <div className="relative mb-3">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl" />
                    <div className="relative w-16 h-16 bg-[#151b2d] border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <Shield className="w-8 h-8 text-blue-500" />
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
                {!isSubmitted ? (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-1">Forgot Password?</h2>
                            <p className="text-slate-400 text-sm">No worries, we'll send you reset instructions.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {localError && (
                                <Motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm"
                                >
                                    <AlertCircle size={18} />
                                    {localError}
                                </Motion.div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Reset Password <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                        <p className="text-slate-400 text-sm mb-8">
                            We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors"
                        >
                            Didn't receive the email? Click to retry
                        </button>
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <Link 
                        to={ROUTES_WEBSITE.AUTH.LOGIN} 
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Log In
                    </Link>
                </div>
            </Motion.div>
        </div>
    );
};

export default ForgotPassword;
