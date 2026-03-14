import React from 'react';
import { Menu } from 'lucide-react';

const Lessons = ({ setIsMobileMenuOpen }) => {
    return (
        <>
            {/* Mobile Header (Only visible on small screens) */}
            <header className="md:hidden h-16 border-b border-slate-800/60 px-4 flex items-center shadow-sm z-10 bg-[#0B1120]/80 backdrop-blur-md absolute top-0 w-full">
                <button
                    className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-lg font-bold text-white ml-2">Lessons</h1>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center pt-16 md:pt-0">
                <h2 className="text-2xl font-bold text-slate-400">Entzarona</h2>
            </div>
        </>
    );
};

export default Lessons;
