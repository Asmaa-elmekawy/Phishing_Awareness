import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, HelpCircle, ShieldAlert, CheckCircle, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from './components/common/Card';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionsPage = () => {
    const { lessons, questions, addQuestion, updateQuestion, deleteQuestion } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLesson, setSelectedLesson] = useState('all');

    // Form State
    const [formData, setFormData] = useState({
        lessonId: '',
        scenario: '',
        answers: [{ text: '', isCorrect: false }],
        explanation: ''
    });

    const filteredQuestions = questions.filter(q => {
        const matchesSearch = q.scenario.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLesson = selectedLesson === 'all' || q.lessonId === selectedLesson;
        return matchesSearch && matchesLesson;
    });

    const handleOpenModal = (question = null) => {
        if (question) {
            setEditingQuestion(question);

            // Handle legacy structure or new structure
            const answers = question.answers || [
                { text: 'Safe', isCorrect: question.correctAnswer === 'Safe' },
                { text: 'IsPhish', isCorrect: question.correctAnswer === 'IsPhish' }
            ];

            setFormData({
                lessonId: question.lessonId,
                scenario: question.scenario,
                answers: answers,
                explanation: question.explanation || ''
            });
        } else {
            setEditingQuestion(null);
            setFormData({
                lessonId: lessons[0]?.id || '',
                scenario: '',
                answers: [{ text: '', isCorrect: true }],
                explanation: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...formData.answers];
        newAnswers[index].text = value;
        setFormData({ ...formData, answers: newAnswers });
    };

    const handleCorrectChange = (index) => {
        const newAnswers = formData.answers.map((ans, i) => ({
            ...ans,
            isCorrect: i === index
        }));
        setFormData({ ...formData, answers: newAnswers });
    };

    const addAnswerField = () => {
        setFormData({
            ...formData,
            answers: [...formData.answers, { text: '', isCorrect: false }]
        });
    };

    const removeAnswerField = (index) => {
        if (formData.answers.length <= 1) return;
        const newAnswers = formData.answers.filter((_, i) => i !== index);

        // If we removed the correct answer, mark the first one as correct
        if (!newAnswers.some(ans => ans.isCorrect)) {
            newAnswers[0].isCorrect = true;
        }

        setFormData({ ...formData, answers: newAnswers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Must have at least one answer and one correct answer
        if (formData.answers.length === 0 || !formData.answers.some(a => a.isCorrect)) {
            alert('Please add at least one answer and mark one as correct.');
            return;
        }

        if (editingQuestion) {
            updateQuestion(editingQuestion.id, formData);
        } else {
            addQuestion(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            deleteQuestion(id);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Questions Management</h1>
                    <p className="text-cyber-text-muted">Configure phishing scenarios and safe communication examples.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    disabled={lessons.length === 0}
                    className="btn-primary"
                >
                    <Plus size={20} />
                    Add Question
                </button>
            </header>

            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                    <input
                        type="text"
                        placeholder="Search scenarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10 h-11"
                    />
                </div>
                <select
                    value={selectedLesson}
                    onChange={(e) => setSelectedLesson(e.target.value)}
                    className="input-field h-11 lg:w-64 cursor-pointer"
                >
                    <option value="all">All Lessons</option>
                    {lessons.map(l => (
                        <option key={l.id} value={l.id}>{l.title}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {filteredQuestions.map((q) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            layout
                        >
                            <Card className="hover:border-cyber-primary/20 transition-all">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className={`
                                        p-4 rounded-xl flex items-center justify-center transition-all
                                        ${(q.answers?.find(a => a.isCorrect)?.text === 'IsPhish' || q.correctAnswer === 'IsPhish') ? 'bg-cyber-error/10 text-cyber-error' : 'bg-cyber-success/10 text-cyber-success'}
                                    `}>
                                        {(q.answers?.find(a => a.isCorrect)?.text === 'IsPhish' || q.correctAnswer === 'IsPhish') ? <ShieldAlert size={28} /> : <CheckCircle size={28} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold tracking-widest text-cyber-primary uppercase">
                                                {lessons.find(l => l.id === q.lessonId)?.title}
                                            </span>
                                            <div className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenModal(q)} className="text-cyber-text-muted hover:text-cyber-primary"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(q.id)} className="text-cyber-text-muted hover:text-cyber-error"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                        <p className="font-bold text-lg mb-3 leading-relaxed">{q.scenario}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {(q.answers || []).map((ans, i) => (
                                                <div
                                                    key={i}
                                                    className={`px-3 py-1 rounded-lg text-xs border ${ans.isCorrect ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary font-bold' : 'bg-cyber-surface-alt border-cyber-border text-cyber-text-muted'}`}
                                                >
                                                    {ans.text}
                                                </div>
                                            ))}
                                        </div>

                                        {q.explanation && (
                                            <div className="p-3 rounded-lg bg-cyber-bg/50 border border-cyber-border italic text-sm text-cyber-text-muted">
                                                <span className="font-bold not-italic text-cyber-text">Explanation: </span> {q.explanation}
                                            </div>
                                        )}
                                    </div>

                                    <div className={`
                                        px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter self-start md:self-center
                                        ${(q.answers?.find(a => a.isCorrect)?.text === 'IsPhish' || q.correctAnswer === 'IsPhish') ? 'bg-cyber-error/20 text-cyber-error' : 'bg-cyber-success/20 text-cyber-success'}
                                    `}>
                                        {q.answers?.find(a => a.isCorrect)?.text || q.correctAnswer}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cyber-bg/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-cyber-surface w-full max-w-2xl rounded-2xl border border-cyber-border shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-cyber-text-muted hover:text-cyber-text transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6 border-b border-cyber-border">
                                <h2 className="text-xl font-bold">
                                    {editingQuestion ? 'Edit Question' : 'Add Question'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">Associated Lesson</label>
                                        <select
                                            value={formData.lessonId}
                                            onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                                            required
                                            className="input-field h-11 cursor-pointer"
                                        >
                                            {lessons.map(l => (
                                                <option key={l.id} value={l.id}>{l.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-sm font-medium text-cyber-text-muted">Answers & Scenarios</label>
                                            <button
                                                type="button"
                                                onClick={addAnswerField}
                                                className="text-xs font-bold text-cyber-primary hover:text-cyber-primary/80 flex items-center gap-1 transition-colors"
                                            >
                                                <Plus size={14} /> Add Answer
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {formData.answers.map((answer, index) => (
                                                <div key={index} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300">
                                                    <div className="flex-1 relative">
                                                        <input
                                                            type="text"
                                                            value={answer.text}
                                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                            required
                                                            placeholder={`Answer Option ${index + 1}`}
                                                            className={`input-field pl-10 h-11 ${answer.isCorrect ? 'border-cyber-primary shadow-[0_0_10px_rgba(59,130,246,0.1)]' : ''}`}
                                                        />
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                                            <input
                                                                type="radio"
                                                                name="correctAnswer"
                                                                checked={answer.isCorrect}
                                                                onChange={() => handleCorrectChange(index)}
                                                                className="w-4 h-4 accent-cyber-primary cursor-pointer"
                                                                title="Mark as correct answer"
                                                            />
                                                        </div>
                                                    </div>

                                                    {formData.answers.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAnswerField(index)}
                                                            className="p-3 rounded-lg border border-cyber-border text-cyber-text-muted hover:text-cyber-error hover:border-cyber-error/30 transition-all bg-cyber-bg"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {formData.answers.some(a => a.isCorrect) && (
                                            <p className="text-[10px] text-cyber-primary mt-3 font-bold uppercase tracking-wider">
                                                ✓ The selected answer will be marked as correct
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cyber-text-muted mb-2">Scenario Description</label>
                                    <textarea
                                        value={formData.scenario}
                                        onChange={(e) => setFormData({ ...formData, scenario: e.target.value })}
                                        required
                                        rows={3}
                                        placeholder="e.g. Email from HR asking to click a link to view salary..."
                                        className="input-field resize-none py-3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cyber-text-muted mb-2">Explanation (Optional)</label>
                                    <textarea
                                        value={formData.explanation}
                                        onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                        rows={3}
                                        placeholder="Explain why this is Phish or Safe..."
                                        className="input-field resize-none py-3"
                                    />
                                </div>

                                <div className="flex gap-3 justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 rounded-lg border border-cyber-border font-bold text-cyber-text-muted hover:bg-cyber-surface-alt transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary px-8"
                                    >
                                        {editingQuestion ? 'Save Changes' : 'Add Question'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestionsPage;
