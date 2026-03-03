import React, { useState } from 'react';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState(''); // للأخطاء المحلية
    
    //  استخدام الهوك
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        // التحقق من المدخلات محلياً
        if (!email || !password) {
            setLocalError('Please enter both email and password');
            return;
        }

        try {
            //  استخدام دالة login من الهوك
            const response = await login(email, password);
            
            console.log('Login successful:', response);
            
            // توجيه المستخدم للصفحة الرئيسية بعد نجاح تسجيل الدخول
            window.location.href = '/admin'; 
            
        } catch (err) {
            // الأخطاء بتتعالج تلقائياً في الهوك
            console.error('Login failed:', err);
        }
    };

    // دمج الأخطاء المحلية مع أخطاء الهوك
    const displayError = localError || error;

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
                    <h2 className="text-2xl font-bold text-cyber-text">Admin Security Portal</h2>
                    <p className="text-cyber-text-muted text-sm mt-2">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* عرض الأخطاء */}
                    {displayError && (
                        <div className="bg-cyber-error/10 text-cyber-error p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={18} />
                            {displayError}
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
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading} 
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* رابط نسيت كلمة المرور */}
                    <div className="text-right">
                        <a 
                            href="/forget-password" 
                            className="text-sm text-cyber-primary hover:text-cyber-primary/80 transition-colors"
                        >
                            Forgot Password?
                        </a>
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
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* رابط التسجيل */}
                <div className="mt-6 text-center">
                    <p className="text-cyber-text-muted text-sm">
                        Don't have an account?{' '}
                        <Link to="/admin/register" className="text-cyber-primary hover:text-cyber-primary/80 transition-colors font-medium">
                            Register here
                        </Link>
                    </p>
                </div>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-[10px] text-cyber-text-muted uppercase tracking-widest font-semibold">
                        System Access Monitored & Encrypted
                    </p>
                </div>
            </Motion.div>
        </div>
    );
};

export default Login;