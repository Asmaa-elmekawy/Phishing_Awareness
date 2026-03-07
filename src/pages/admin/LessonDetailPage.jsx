import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, HelpCircle, ChevronRight, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLessons } from '../../hooks/useLessons';
import questionService from '../../services/questionService';
import Card from './components/common/Card';
import { ROUTES_ADMIN } from '../../constants/routes';
import LessonModal from './components/common/LessonModal';
import { useMeta } from '../../hooks/useMeta';

const LessonDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedLesson, fetchLessonById, updateLesson, loading: lessonLoading } = useLessons();
    const { difficultyLevels, fetchDifficultyLevels, loading: metaLoading } = useMeta();
    
    const [questions, setQuestions] = useState([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localError, setLocalError] = useState("");
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        description: "",
        orderNumber: 0,
        difficultyLevel: "",
    });

    useEffect(() => {
        const loadDetail = async () => {
            try {
                await fetchLessonById(id);
                setLoadingQuestions(true);
                const qs = await questionService.getQuestionsByLesson(id);
                setQuestions(qs);
                fetchDifficultyLevels();
            } catch (err) {
                console.error("Failed to load lesson details:", err);
            } finally {
                setLoadingQuestions(false);
            }
        };
        loadDetail();
    }, [id]);

    const handleOpenEditModal = () => {
        if (!selectedLesson) return;
        setFormData({
            id: selectedLesson.lessonId,
            title: selectedLesson.title || "",
            description: selectedLesson.description || "",
            orderNumber: selectedLesson.orderNumber || 0,
            difficultyLevel: selectedLesson.difficultyLevel || "",
        });
        setIsModalOpen(true);
        setLocalError("");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setLocalError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");

        try {
            const updatedData = {
                title: formData.title,
                description: formData.description,
                orderNumber: formData.orderNumber,
                difficultyLevel: formData.difficultyLevel,
            };

            await updateLesson(selectedLesson.lessonId, updatedData);
            setIsModalOpen(false);
            // Refresh local data
            await fetchLessonById(id);
        } catch (err) {
            console.error("Error updating lesson:", err);
            setLocalError(err.message || "Failed to update lesson");
        }
    };

    if (lessonLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-primary"></div>
            </div>
        );
    }

    if (!selectedLesson) {
        return (
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                 <button
                    onClick={() => navigate(ROUTES_ADMIN.LESSONS.LIST)}
                    className="flex items-center gap-2 text-cyber-text-muted hover:text-cyber-primary transition-colors mb-4 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Lessons</span>
                </button>
                <div className="text-center py-20 bg-cyber-surface rounded-2xl border border-cyber-border">
                    <BookOpen size={48} className="mx-auto text-cyber-text-muted mb-4 opacity-20" />
                    <p className="text-xl font-bold text-cyber-text">Lesson Not Found</p>
                    <p className="text-cyber-text-muted mt-2">The requested lesson could not be retrieved.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <button
                onClick={() => navigate(ROUTES_ADMIN.LESSONS.LIST)}
                className="flex items-center gap-2 text-cyber-text-muted hover:text-cyber-primary transition-colors mb-4 group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Lessons</span>
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-cyber-primary/10 text-cyber-primary text-xs font-bold uppercase tracking-widest border border-cyber-primary/20">
                            Lesson Detail
                        </span>
                        <span className="px-3 py-1 rounded-full bg-cyber-bg text-cyber-text-muted text-xs font-bold uppercase tracking-widest border border-cyber-border">
                            ID: {id}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold text-cyber-text">{selectedLesson.title}</h1>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center p-4 rounded-xl bg-cyber-surface border border-cyber-border min-w-[100px]">
                        <span className="text-2xl font-bold text-cyber-primary">{questions.length}</span>
                        <span className="text-[10px] uppercase font-bold text-cyber-text-muted">Questions</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-cyber-surface border border-cyber-border min-w-[100px]">
                        <span className="text-2xl font-bold text-cyber-secondary">{selectedLesson.difficultyLevel || 'N/A'}</span>
                        <span className="text-[10px] uppercase font-bold text-cyber-text-muted">Difficulty</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card title="Description" subtitle="Deep dive into the lesson objectives and content">
                        <p className="text-cyber-text-muted leading-relaxed text-lg italic">
                            "{selectedLesson.description}"
                        </p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-cyber-primary/10 text-cyber-primary">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-cyber-text-muted uppercase font-bold">Estimated Time</p>
                                    <p className="font-bold">15-20 Minutes</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-cyber-success/10 text-cyber-success">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-cyber-text-muted uppercase font-bold">Module Focus</p>
                                    <p className="font-bold">Advanced Detection</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card title="Associated Questions" subtitle="Questions linked to this module">
                        {loadingQuestions ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-primary"></div>
                            </div>
                        ) : questions.length === 0 ? (
                            <div className="text-center py-12">
                                <HelpCircle size={48} className="mx-auto text-cyber-text-muted mb-4 opacity-20" />
                                <p className="text-cyber-text-muted">No questions found for this lesson.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <motion.div
                                        key={q.questionId}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => navigate(`/admin/lessons/${id}/questions/${q.questionId}`)}
                                        className="p-4 rounded-xl bg-cyber-surface-alt/30 border border-cyber-border hover:border-cyber-primary/50 hover:bg-cyber-surface-alt/50 transition-all cursor-pointer group flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-cyber-primary/10 flex items-center justify-center text-cyber-primary font-bold text-xs border border-cyber-primary/20">
                                                {index + 1}
                                            </div>
                                            <p className="font-medium text-cyber-text group-hover:text-cyber-primary transition-colors line-clamp-1">{q.questionText}</p>
                                        </div>
                                        <ChevronRight size={18} className="text-cyber-text-muted group-hover:text-cyber-primary group-hover:translate-x-1 transition-all" />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card title="Module Status">
                        <div className="space-y-6">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between text-xs font-bold uppercase tracking-widest text-cyber-text-muted">
                                    <span>Configuration Progress</span>
                                    <span>100%</span>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyber-bg border border-cyber-border">
                                    <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyber-primary"></div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-cyber-success/5 border border-cyber-success/20">
                                <p className="text-xs font-bold text-cyber-success uppercase mb-1">Live Status</p>
                                <p className="text-sm text-cyber-text-muted">This lesson is currently active and visible to all users.</p>
                            </div>
                            <button 
                                onClick={handleOpenEditModal}
                                className="w-full py-4 rounded-xl bg-cyber-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-cyber-primary/90 transition-all active:scale-[0.98]"
                            >
                                Edit Lesson Content
                            </button>
                        </div>
                    </Card>

                    <Card title="Quick Info">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-cyber-border">
                                <span className="text-xs text-cyber-text-muted font-bold uppercase">Points</span>
                                <span className="text-sm font-bold">150 XP</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-cyber-border">
                                <span className="text-xs text-cyber-text-muted font-bold uppercase">Language</span>
                                <span className="text-sm font-bold">Egyptian Arabic</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-cyber-border">
                                <span className="text-xs text-cyber-text-muted font-bold uppercase">Scenarios</span>
                                <span className="text-sm font-bold">Email Phishing</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <LessonModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                editingLesson={selectedLesson}
                loading={lessonLoading}
                localError={localError}
                difficultyLevels={difficultyLevels}
                difficultyLevelsLoading={metaLoading}
            />
        </div>
    );
};

export default LessonDetailPage;
