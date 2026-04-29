import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Shield, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import authService from '../../services/AdminServices/authService';
import { ROUTES_WEBSITE } from '../../constants/routes';

const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            if (!token) {
                setStatus('error');
                setMessage('Missing verification token.');
                return;
            }

            try {
                await authService.confirmEmailGet(token);
                setStatus('success');
                setMessage('Your email has been successfully confirmed!');
            } catch (err) {
                setStatus('error');
                setMessage(err.message || 'Email verification failed. The link may be expired or invalid.');
            }
        };

        verifyEmail();
    }, [searchParams]);

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
                className="w-full max-w-[440px] bg-[#111827]/80 backdrop-blur-xl border border-slate-800/50 p-7 rounded-[32px] shadow-2xl z-10 text-center"
            >
                {status === 'verifying' && (
                    <div className="py-8">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Verifying your email...</h2>
                        <p className="text-slate-400">Please wait a moment while we confirm your account.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="py-8">
                        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} className="text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                        <p className="text-slate-400 mb-8">{message}</p>
                        <Link
                            to={ROUTES_WEBSITE.AUTH.LOGIN}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                        >
                            Log In to Your Account <ArrowRight size={20} />
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="py-8">
                        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                        <p className="text-red-400/80 text-sm mb-8">{message}</p>
                        <Link
                            to={ROUTES_WEBSITE.AUTH.LOGIN}
                            className="text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors"
                        >
                            Back to Log In
                        </Link>
                    </div>
                )}
            </Motion.div>
        </div>
    );
};

export default ConfirmEmail;
