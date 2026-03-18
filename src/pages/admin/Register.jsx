import React, { useState } from 'react';
import { Shield, Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../hooks/Admin/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES_ADMIN } from '../../constants/routes';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // التعامل مع تغيير الحقول
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // التحقق من صحة البيانات
    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !confirmPassword) {
            setLocalError('All fields are required');
            return false;
        }
        
        if (formData.password !== confirmPassword) {
            setLocalError('Passwords do not match');
            return false;
        }
        
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setLocalError('Please enter a valid email address');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setSuccessMessage('');
        
        if (!validateForm()) return;

        try {
            const response = await register(formData);
            console.log('Registration successful:', response);
            
            setSuccessMessage('Registration successful! Please check your email to confirm your account.');
            
            setTimeout(() => {
                navigate(ROUTES_ADMIN.AUTH.LOGIN, { 
                    state: { 
                        message: 'Registration successful! Please login with your credentials after confirming your email.' 
                    }
                });
            }, 3000);
            
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

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
                    <h2 className="text-2xl font-bold text-cyber-text">Create Account</h2>
                    <p className="text-cyber-text-muted text-sm mt-2">Register to access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {successMessage && (
                        <div className="bg-green-500/10 text-green-500 p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={18} />
                            {successMessage}
                        </div>
                    )}

                    {displayError && (
                        <div className="bg-cyber-error/10 text-cyber-error p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={18} />
                            {displayError}
                        </div>
                    )}

                    {/* الاسم الأول */}
                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                            First Name
                        </label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Enter your first name"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* الاسم الأخير */}
                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                            Last Name
                        </label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Enter your last name"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* الإيميل */}
                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* كلمة المرور */}
                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-text-muted hover:text-cyber-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* تأكيد كلمة المرور */}
                    <div>
                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface-alt text-cyber-text outline-none focus:border-cyber-primary transition-all disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* شروط كلمة المرور - استرشادية */}
                    <div className="text-xs text-cyber-text-muted space-y-1">
                        <p>• At least 6 characters</p>
                        <p>• At least one uppercase letter</p>
                        <p>• At least one number</p>
                        <p>• At least one special character (!@#$%^&*)</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-cyber-primary text-white font-bold hover:shadow-lg hover:shadow-cyber-primary/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-6"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                {/* رابط تسجيل الدخول */}
                <div className="mt-6 text-center">
                    <p className="text-cyber-text-muted text-sm">
                        Already have an account?{' '}
                        <Link to={ROUTES_ADMIN.AUTH.LOGIN} className="text-cyber-primary hover:text-cyber-primary/80 transition-colors font-medium">
                            Login here
                        </Link>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-cyber-text-muted uppercase tracking-widest font-semibold">
                        Secure Registration • Data Encrypted
                    </p>
                </div>
            </Motion.div>
        </div>
    );
};

export default Register;