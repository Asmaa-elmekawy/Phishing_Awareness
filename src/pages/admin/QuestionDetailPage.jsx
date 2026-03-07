import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, QuoteIcon, CheckCircle, XCircle, Info, ShieldAlert, Edit2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuestions } from '../../hooks/useQuestions';
import { useLessons } from '../../hooks/useLessons';
import { useMeta } from '../../hooks/useMeta';
import Card from './components/common/Card';
import QuestionModal from './components/common/QuestionModal';

const QuestionDetailPage = () => {
    const { lessonId, questionId } = useParams();
    const navigate = useNavigate();
    const { selectedQuestion, fetchQuestionById, updateQuestion, loading: questionsLoading } = useQuestions();
    const { lessons, fetchLessons, loading: lessonsLoading } = useLessons();
    const { questionTypes, fetchQuestionTypes, loading: metaLoading } = useMeta();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [localError, setLocalError] = useState("");
    const [associatedLessonId, setAssociatedLessonId] = useState(lessonId);

    const [formData, setFormData] = useState({
        questionText: "",
        questionContent: "",
        questionType: "",
        explanation: "",
        answers: [{ answerText: "", isCorrect: false }],
    });

    useEffect(() => {
        if (lessonId && questionId) {
            fetchQuestionById(lessonId, questionId);
            fetchLessons();
            fetchQuestionTypes();
        }
    }, [lessonId, questionId]);

    const handleOpenModal = () => {
        if (!selectedQuestion) return;
        setAssociatedLessonId(lessonId);
        setFormData({
            questionText: selectedQuestion.questionText || "",
            questionContent: selectedQuestion.questionContent || "",
            questionType: selectedQuestion.questionType || "",
            explanation: selectedQuestion.explanation || "",
            answers: selectedQuestion.answers?.length > 0
                ? selectedQuestion.answers.map(a => ({ ...a }))
                : [{ answerText: "", isCorrect: false }],
        });
        setIsModalOpen(true);
        setLocalError("");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setLocalError("");
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...formData.answers];
        newAnswers[index].answerText = value;
        setFormData({ ...formData, answers: newAnswers });
    };

    const handleCorrectChange = (index) => {
        const newAnswers = formData.answers.map((ans, i) => ({
            ...ans,
            isCorrect: i === index,
        }));
        setFormData({ ...formData, answers: newAnswers });
    };

    const addAnswerField = () => {
        setFormData({
            ...formData,
            answers: [...formData.answers, { answerText: "", isCorrect: false }],
        });
    };

    const removeAnswerField = (index) => {
        if (formData.answers.length <= 1) return;
        const newAnswers = formData.answers.filter((_, i) => i !== index);
        if (!newAnswers.some((ans) => ans.isCorrect)) {
            newAnswers[0] = { ...newAnswers[0], isCorrect: true };
        }
        setFormData({ ...formData, answers: newAnswers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");

        if (!formData.questionText || !formData.questionType) {
            setLocalError("Please fill in required fields");
            return;
        }

        const validAnswers = formData.answers.filter(a => a.answerText.trim() !== "");
        if (validAnswers.length === 0 || !validAnswers.some(a => a.isCorrect)) {
            setLocalError("Please add at least one answer and mark it as correct");
            return;
        }

        const questionData = {
            questionText: formData.questionText,
            questionContent: formData.questionContent,
            questionType: formData.questionType,
            explanation: formData.explanation,
            answers: validAnswers,
        };

        try {
            await updateQuestion(associatedLessonId, questionId, questionData);
            setIsModalOpen(false);
            // If lesson changed, we might need to navigate, but let's assume same lesson for now
            fetchQuestionById(associatedLessonId, questionId);
        } catch (err) {
            setLocalError(err.message || "Failed to save question");
        }
    };

    const isLoading = questionsLoading || lessonsLoading || metaLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-primary"></div>
            </div>
        );
    }

    if (!selectedQuestion) {
        return (
            <div className="p-8 max-w-5xl mx-auto space-y-8">

                <div className="text-center py-20 bg-cyber-surface rounded-2xl border border-cyber-border">
                    <HelpCircle size={48} className="mx-auto text-cyber-text-muted mb-4 opacity-20" />
                    <p className="text-xl font-bold text-cyber-text">Question Not Found</p>
                    <p className="text-cyber-text-muted mt-2">The requested question could not be retrieved.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-cyber-text-muted hover:text-cyber-primary transition-colors mb-4 group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </button>

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-cyber-secondary/10 text-cyber-secondary text-xs font-bold uppercase tracking-widest border border-cyber-secondary/20">
                            Question Analysis
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${selectedQuestion.questionType === 'MultipleChoice'
                            ? 'bg-cyber-accent/10 text-cyber-accent border-cyber-accent/20'
                            : 'bg-cyber-primary/10 text-cyber-primary border-cyber-primary/20'
                            }`}>
                            {selectedQuestion.questionType}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-cyber-text leading-tight">
                        {selectedQuestion.questionText}
                    </h1>
                </div>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary font-bold text-sm uppercase tracking-widest hover:bg-cyber-primary hover:text-white transition-all group"
                >
                    <Edit2 size={18} className="group-hover:rotate-12 transition-transform" />
                    Edit Question
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card title="Phishing Scenario" icon={<QuoteIcon size={20} className="text-cyber-primary" />}>
                        <div className="p-6 rounded-xl bg-cyber-bg/50 border border-cyber-border relative overflow-hidden">
                            <QuoteIcon size={40} className="absolute -top-2 -right-2 text-cyber-primary/5 opacity-20" />
                            <p className="text-cyber-text-muted italic leading-relaxed text-sm">
                                {selectedQuestion.questionContent || "No detailed scenario description provided for this question."}
                            </p>
                        </div>
                    </Card>

                    <Card title="Answer Options" subtitle="Correct and incorrect responses">
                        <div className="space-y-4">
                            {selectedQuestion.answers?.map((answer, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-4 rounded-xl border flex items-center justify-between ${answer.isCorrect
                                        ? 'bg-cyber-success/5 border-cyber-success/30 text-cyber-success'
                                        : 'bg-cyber-surface-alt/20 border-cyber-border text-cyber-text-muted'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${answer.isCorrect ? 'bg-cyber-success/20' : 'bg-cyber-bg'
                                            }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span className="font-medium">{answer.answerText}</span>
                                    </div>
                                    {answer.isCorrect ? (
                                        <CheckCircle size={20} className="text-cyber-success" />
                                    ) : (
                                        <XCircle size={20} className="text-cyber-text-muted/30" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card title="Expert Explanation" icon={<Info size={20} className="text-cyber-secondary" />}>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-cyber-secondary/5 border border-cyber-secondary/20">
                                <ShieldAlert size={24} className="text-cyber-secondary flex-shrink-0 mt-1" />
                                <p className="text-sm text-cyber-text-muted leading-relaxed">
                                    {selectedQuestion.explanation || "This question tests the user's ability to identify common indicators of phishing attacks, such as suspicious URLs, urgent tone, and generic greetings."}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card title="System Context">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-cyber-text-muted">Parent Lesson</span>
                                <span className="text-cyber-primary font-medium hover:underline cursor-pointer" onClick={() => navigate(`/admin/lessons/${lessonId}`)}>
                                    View Lesson
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-cyber-text-muted">Total Submissions</span>
                                <span className="font-bold">452</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-cyber-text-muted">Accuracy Rate</span>
                                <span className="text-cyber-success font-bold">72.4%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <QuestionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                lessons={lessons}
                associatedLessonId={associatedLessonId}
                setAssociatedLessonId={setAssociatedLessonId}
                editingQuestion={selectedQuestion}
                loading={questionsLoading}
                handleAnswerChange={handleAnswerChange}
                handleCorrectChange={handleCorrectChange}
                addAnswerField={addAnswerField}
                removeAnswerField={removeAnswerField}
                localError={localError}
                questionTypes={questionTypes}
            />
        </div>
    );
};

export default QuestionDetailPage;
