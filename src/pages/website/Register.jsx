import { useState, useMemo } from 'react';
import { Shield, Mail, Lock, User, Building2, ChevronDown, CheckCircle2, AlertCircle, LogIn } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useAuth } from '../../hooks/Admin/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES_WEBSITE } from '../../constants/routes';

const DEPARTMENTS = [
    "Information Technology (IT)",
    "Human Resources (HR)",
    "Finance",
    "Security Operations",
    "Sales & Marketing",
    "Legal",
    "Other"
];

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    // Password strength calculation
    const passwordStrength = useMemo(() => {
        if (!password) return 0;
        let score = 0;
        if (password.length >= 8) score += 25;
        if (/[A-Z]/.test(password)) score += 25;
        if (/[0-9]/.test(password)) score += 25;
        if (/[^A-Za-z0-9]/.test(password)) score += 25;
        return score;
    }, [password]);

    const strengthLabel = useMemo(() => {
        if (passwordStrength === 0) return "";
        if (passwordStrength <= 25) return "Weak";
        if (passwordStrength <= 50) return "Fair";
        if (passwordStrength <= 75) return "Good";
        return "Strong";
    }, [passwordStrength]);

    const strengthColor = useMemo(() => {
        if (passwordStrength <= 25) return "bg-red-500";
        if (passwordStrength <= 50) return "bg-orange-500";
        if (passwordStrength <= 75) return "bg-yellow-500";
        return "bg-blue-500";
    }, [passwordStrength]);

    const validateForm = () => {
        if (!fullName || !email || !department || !password) {
            setLocalError('Please fill in all fields');
            return false;
        }
        if (!agreeToTerms) {
            setLocalError('You must agree to the Terms and Privacy Policy');
            return false;
        }
        if (passwordStrength < 50) {
            setLocalError('Please choose a stronger password');
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
            // Split full name into firstName and lastName as expected by API
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || '.';

            const userData = {
                firstName,
                lastName,
                email,
                password,
                department
            };

            await register(userData);
            setSuccessMessage('Account created successfully! Redirecting to login...');

            setTimeout(() => {
                navigate(ROUTES_WEBSITE.AUTH.LOGIN);
            }, 3000);
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    const displayError = localError || error;

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col font-sans relative overflow-x-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Header */}
            <header className="p-6 flex items-center justify-between z-20">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">PhishScape</span>
                </Link>
                <Link
                    to={ROUTES_WEBSITE.AUTH.LOGIN}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all active:scale-[0.98]"
                >
                    Log In
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 py-8 z-10">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-[500px] bg-[#111827]/40 backdrop-blur-2xl border border-slate-700/50 p-7 rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden"
                >
                    {/* Card Inner Background Shield */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none z-0">
                        <div className="absolute w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
                        <Shield className="w-[650px] h-[550px] text-blue-500 blur-lg absolute opacity-30" strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
                            <p className="text-slate-400 text-sm">Join the frontline of cybersecurity awareness.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {successMessage && (
                                <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                                    <CheckCircle2 size={18} />
                                    {successMessage}
                                </div>
                            )}

                            {displayError && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                                    <AlertCircle size={18} />
                                    {displayError}
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter Your Name"
                                        className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-200 placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Work Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Work Email</label>
                                <div className="relative group">
                                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-200 placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Department Select */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Department</label>
                                <div className="relative group">
                                    <Building2 size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-10 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-200 appearance-none"
                                        required
                                    >
                                        <option value="" disabled>Select Department</option>
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Create Password</label>
                                <div className="relative group">
                                    <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-[#151b2d] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-200 placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                                {/* Strength Indicator */}
                                {password && (
                                    <div className="px-1 py-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
                                                <Shield size={10} /> Security Level: <span className="text-blue-500">{strengthLabel}</span>
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-bold">{passwordStrength}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <Motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength}%` }}
                                                className={`h-full ${strengthColor} transition-colors duration-500`}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Terms Toggle */}
                            <div className="flex items-start gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-slate-800 bg-[#151b2d] text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0"
                                />
                                <label htmlFor="terms" className="text-xs text-slate-400 leading-tight">
                                    I agree to the <span className="text-blue-500 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-500 hover:underline cursor-pointer">Privacy Policy</span>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-slate-400 text-sm">
                                Already have an account? <Link to={ROUTES_WEBSITE.AUTH.LOGIN} className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Log In</Link>
                            </p>
                        </div>
                    </div>
                </Motion.div>
            </main>

            {/* Footer */}
            <footer className="p-6 mt-auto border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 z-20">
                <p>© 2024 PhishScape Cybersecurity. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy</span>
                    <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
                    <span className="hover:text-slate-400 cursor-pointer transition-colors">Contact Support</span>
                </div>
            </footer>
        </div>
    );
};

export default Register;
