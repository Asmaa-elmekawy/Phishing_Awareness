import React from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard, Microscope, BarChart3, Bot,
    User, Settings, ShieldCheck, BookOpen
} from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to PhishScape</h1>
            <p className="text-slate-400 mb-8 max-w-md text-center">
                "Learn to protect yourself here."
            </p>
            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                    Login
                </Link>
                <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all active:scale-95"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Home;
