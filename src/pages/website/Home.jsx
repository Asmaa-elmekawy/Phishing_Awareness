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
            <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
            >
                Go to WEBSITE
            </Link>
        </div>
    );
};

export default Home;
