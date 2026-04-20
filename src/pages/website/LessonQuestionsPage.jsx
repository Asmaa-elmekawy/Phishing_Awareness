// pages/LessonQuestionsPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trophy,
    Send,
    Loader,
    ChevronRight,
    Star,
    Target
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useLessonQuestions } from "../../hooks/Web/useLessonQuestions";
import { ROUTES_WEBSITE } from "../../constants/routes";

const LessonQuestionsPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const {
        currentQuestion,
        currentIndex,
        result,
        loading,
        error,
        isCompleted,
        handleAnswer,
        totalQuestions
    } = useLessonQuestions(lessonId);

    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleSubmitAnswer = async () => {
        if (!selectedAnswerId) {
            setLocalError("Please select an answer to continue.");
            return;
        }

        setIsSubmitting(true);
        setLocalError("");

        try {
            await handleAnswer(currentQuestion.questionId, selectedAnswerId);
            setSelectedAnswerId(null);
        } catch (err) {
            setLocalError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Loading State ---
    if (loading && !currentQuestion) {
        return (
            <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center">
                <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-slate-400 font-medium animate-pulse">Initializing Lesson Module...</p>
                </Motion.div>
            </div>
        );
    }

    // --- Completion State ---
    if (isCompleted && result) {
        const isPassed = result.passed;
        const scorePercentage = (result.score / (result.totalQuestions * 10)) * 100;

        return (
            <div className="min-h-screen bg-[#0a0f1d] text-white p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-xl w-full z-10">
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#111827]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl text-center"
                    >
                        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner ${isPassed ? "bg-green-500/20 text-green-400 shadow-green-500/10" : "bg-red-500/20 text-red-400 shadow-red-500/10"
                            }`}>
                            {isPassed ? <Trophy size={48} /> : <XCircle size={48} />}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                            {isPassed ? "Great Work!" : "Try Again!"}
                        </h2>
                        <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                            {isPassed
                                ? "You've successfully mastered this module's concepts."
                                : "Keep practicing to reinforce your security awareness."}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-[#1a2233] border border-slate-700/50 rounded-2xl p-6 transition-transform hover:scale-[1.02]">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Final Score</p>
                                <p className="text-3xl font-black text-blue-400">{result.score}</p>
                            </div>
                            <div className="bg-[#1a2233] border border-slate-700/50 rounded-2xl p-6 transition-transform hover:scale-[1.02]">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Accuracy</p>
                                <p className={`text-3xl font-black ${isPassed ? "text-green-400" : "text-yellow-400"}`}>
                                    {Math.round(scorePercentage)}%
                                </p>
                            </div>
                        </div>

                        {/* Progress Visualization */}
                        <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden mb-10 shadow-inner">
                            <Motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${scorePercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`absolute inset-y-0 left-0 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)] ${isPassed ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-yellow-500 to-orange-400"
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate(ROUTES_WEBSITE.LESSONS)}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                            >
                                Continue Learning <ChevronRight size={20} />
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-all active:scale-[0.98]"
                            >
                                Retry Module
                            </button>
                        </div>
                    </Motion.div>
                </div>
            </div>
        );
    }

    // --- No Questions ---
    if (!currentQuestion && !loading) {
        return (
            <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center p-6">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 bg-slate-800 text-slate-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">No Content Found</h2>
                    <p className="text-slate-400 mb-8">This module doesn't have any interactive questions available yet.</p>
                    <button
                        onClick={() => navigate(ROUTES_WEBSITE.LESSONS)}
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={18} /> Back to Modules
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col relative overflow-hidden">
            {/* Immersive Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />

            {/* Header */}
            <header className="h-20 px-4 md:px-12 flex items-center justify-between shrink-0 z-10 backdrop-blur-md border-b border-slate-800/40">
                <button
                    onClick={() => navigate(ROUTES_WEBSITE.LESSONS)}
                    className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
                >
                    <div className="p-2.5 bg-slate-800/50 rounded-xl group-hover:bg-slate-800 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="font-bold text-sm hidden sm:block uppercase tracking-wider">Leave Lesson</span>
                </button>

                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 mb-1">
                        <Target size={14} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Module Focus</span>
                    </div>
                    <h1 className="text-sm font-black text-slate-300 uppercase tracking-widest hidden md:block">Security Awareness</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Checkpoint</p>
                        <p className="text-lg font-black text-white">{currentIndex + 1} / {totalQuestions}</p>
                    </div>
                    <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 font-black">
                        {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
                    </div>
                </div>
            </header>

            {/* Global Progress Bar (Sticky Top) */}
            <div className="h-1.5 w-full bg-slate-800/30 overflow-hidden relative z-10">
                <Motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-4 py-8 md:py-12 z-10">
                <div className="max-w-3xl mx-auto flex flex-col gap-8">

                    {/* Error Notice */}
                    <AnimatePresence>
                        {(error || localError) && (
                            <Motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3 overflow-hidden shadow-lg shadow-red-500/5"
                            >
                                <AlertCircle size={20} className="shrink-0" />
                                <p className="text-sm font-bold">{error || localError}</p>
                            </Motion.div>
                        )}
                    </AnimatePresence>

                    {/* Question Stage */}
                    <AnimatePresence mode="wait">
                        <Motion.div
                            key={currentQuestion?.questionId}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="bg-[#111827]/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative"
                        >
                            {/* Subtle Glass Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                        {currentQuestion?.questionType || "Critical Analysis"}
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                                    {currentQuestion?.questionText}
                                </h2>

                                {currentQuestion?.questionContent && (
                                    <div className="bg-[#1a2233] border-l-4 border-blue-500 rounded-2xl p-5 md:p-6 shadow-inner">
                                        <p className="text-slate-400 text-sm md:text-base leading-relaxed italic">
                                            "{currentQuestion.questionContent}"
                                        </p>
                                    </div>
                                )}

                                {/* Answer Grid */}
                                <div className="space-y-4 mt-4">
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Select the most accurate response</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {currentQuestion?.answers?.map((answer, index) => {
                                            const isSelected = selectedAnswerId === answer.answerId;
                                            return (
                                                <Motion.div
                                                    key={answer.answerId}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                >
                                                    <label
                                                        className={`group flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${isSelected
                                                            ? "border-blue-500 bg-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                                            : "border-slate-800 bg-[#0f172a]/50 hover:border-slate-700 hover:bg-[#1e293b]/40"
                                                            }`}
                                                    >
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${isSelected ? "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/40" : "bg-transparent border-slate-700 group-hover:border-slate-500"
                                                            }`}>
                                                            {isSelected && <CheckCircle size={14} className="text-white" />}
                                                        </div>

                                                        <input
                                                            type="radio"
                                                            name="answer"
                                                            value={answer.answerId}
                                                            checked={isSelected}
                                                            onChange={() => setSelectedAnswerId(answer.answerId)}
                                                            className="hidden"
                                                        />

                                                        <span className={`text-sm md:text-base font-medium transition-colors ${isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-300"}`}>
                                                            {answer.answerText}
                                                        </span>

                                                        {/* Choice Letter Indicator */}
                                                        <span className="ml-auto text-[10px] font-black text-slate-700 uppercase group-hover:text-slate-600 transition-colors">
                                                            Option {String.fromCharCode(65 + index)}
                                                        </span>
                                                    </label>
                                                </Motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Motion.div>
                    </AnimatePresence>

                    {/* Footer Controls */}
                    <footer className="flex justify-center">
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={isSubmitting || !selectedAnswerId}
                            className="w-full sm:w-80 group relative overflow-hidden py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-20 disabled:cursor-not-allowed active:scale-[0.98] shadow-xl"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isSubmitting ? (
                                    <>
                                        <Loader size={20} className="animate-spin" />
                                        Processing
                                    </>
                                ) : (
                                    <>
                                        Submit Answer <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </footer>
                </div>
            </main>

        </div>
    );
};

export default LessonQuestionsPage;