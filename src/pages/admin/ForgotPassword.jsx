import { useState } from 'react';
import { Shield, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../hooks/Admin/useAuth';
import { Link } from 'react-router-dom';
import { ROUTES_ADMIN } from '../../constants/routes';

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
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg auth-gradient p-4">
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cyber-surface p-10 rounded-2xl shadow-2xl border border-cyber-border w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 rounded-full bg-cyber-primary/10 mb-4">
                        <Shield size={40} className="text-cyber-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-cyber-text">Password Recovery</h2>
                    <p className="text-cyber-text-muted text-sm mt-2">
                        {!isSubmitted 
                            ? "Enter your email to receive reset instructions" 
                            : "Reset instructions sent successfully"}
                    </p>
                </div>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {localError && (
                            <div className="bg-cyber-error/10 text-cyber-error p-3 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle size={18} />
                                {localError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="admin@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-cyber-primary text-white font-bold hover:shadow-lg hover:shadow-cyber-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-6">
                        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-cyber-text mb-2">Check your email</h3>
                        <p className="text-cyber-text-muted text-sm mb-8">
                            We've sent password reset instructions to <br />
                            <span className="text-cyber-text font-medium">{email}</span>
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-cyber-primary hover:text-cyber-primary/80 text-sm font-bold transition-colors"
                        >
                            Didn't receive the email? Click to retry
                        </button>
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <Link 
                        to={ROUTES_ADMIN.AUTH.LOGIN} 
                        className="flex items-center gap-2 text-sm text-cyber-text-muted hover:text-cyber-text transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-cyber-text-muted uppercase tracking-widest font-semibold">
                        Secure Password Recovery Protocol
                    </p>
                </div>
            </Motion.div>
        </div>
    );
};

export default ForgotPassword;
