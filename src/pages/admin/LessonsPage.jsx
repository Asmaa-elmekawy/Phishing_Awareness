import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, BookOpen, X } from 'lucide-react';
import Card from './components/common/Card';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const LessonsPage = ({ lessons, setLessons, questions, setQuestions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        orderNumber: 0,
        difficultyLevel: ''
    });

    const filteredLessons = lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (lesson = null) => {
        if (lesson) {
            setEditingLesson(lesson);
            setFormData({
                title: lesson.title ?? '',
                description: lesson.description ?? '',
                orderNumber: Number.isFinite(lesson.orderNumber) ? lesson.orderNumber : Number(lesson.orderNumber ?? 0),
                difficultyLevel: lesson.difficultyLevel ?? ''
            });
        } else {
            setEditingLesson(null);
            setFormData({
                title: '',
                description: '',
                orderNumber: 0,
                difficultyLevel: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingLesson) {
            setLessons(prev => prev.map(l => l.id === editingLesson.id ? { ...l, ...formData } : l));
        } else {
            const newLesson = { id: (globalThis.crypto?.randomUUID?.() ?? Date.now().toString()), ...formData };
            setLessons(prev => [...prev, newLesson]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this lesson? All associated questions will also be deleted.')) {
            setLessons(prev => prev.filter(l => l.id !== id));
            setQuestions(prev => prev.filter(q => q.lessonId !== id));
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Lessons Management</h1>
                    <p className="text-cyber-text-muted">Manage educational content and phishing modules.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn-primary"
                >
                    <Plus size={20} />
                    Create Lesson
                </button>
            </header>

            <div className="relative max-w-md mb-8">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted" />
                <input
                    type="text"
                    placeholder="Filter lessons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10 h-11"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredLessons.map((lesson) => (
                        <Motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                        >
                            <Card
                                className="h-full hover:border-cyber-primary/40 transition-all group"
                                footer={
                                    <div className="flex gap-4 justify-end">
                                        <button
                                            onClick={() => handleOpenModal(lesson)}
                                            className="text-cyber-text-muted hover:text-cyber-primary flex items-center gap-1.5 text-sm font-medium transition-colors"
                                        >
                                            <Edit2 size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(lesson.id)}
                                            className="text-cyber-text-muted hover:text-cyber-error flex items-center gap-1.5 text-sm font-medium transition-colors"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                }
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-cyber-primary/10 text-cyber-primary group-hover:scale-110 transition-transform">
                                        <BookOpen size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg mb-2 truncate">{lesson.title}</h3>
                                        <p className="text-sm text-cyber-text-muted line-clamp-3 leading-relaxed">
                                            {lesson.description}
                                        </p>
                                        <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyber-bg text-cyber-primary border border-cyber-primary/20">
                                            {questions.filter(q => q.lessonId === lesson.id).length} Questions
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cyber-bg/80 backdrop-blur-sm">
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-cyber-surface w-full max-w-lg rounded-2xl border border-cyber-border shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-cyber-text-muted hover:text-cyber-text transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-6 border-b border-cyber-border">
                                <h2 className="text-xl font-bold">
                                    {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-cyber-text-muted mb-2">Lesson Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="e.g. Email Security Basics"
                                        className="input-field focus:ring-2 focus:ring-cyber-primary/20 h-11"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">Order Number</label>
                                        <input
                                            type="number"
                                            value={formData.orderNumber}
                                            onChange={(e) => setFormData({ ...formData, orderNumber: Number(e.target.value) })}
                                            required
                                            min={0}
                                            className="input-field focus:ring-2 focus:ring-cyber-primary/20 h-11"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-cyber-text-muted mb-2">Difficulty Level</label>
                                        <input
                                            type="text"
                                            value={formData.difficultyLevel}
                                            onChange={(e) => setFormData({ ...formData, difficultyLevel: e.target.value })}
                                            required
                                            placeholder="e.g. Beginner"
                                            className="input-field focus:ring-2 focus:ring-cyber-primary/20 h-11"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cyber-text-muted mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        rows={4}
                                        placeholder="Describe what users will learn in this lesson..."
                                        className="input-field focus:ring-2 focus:ring-cyber-primary/20 resize-none py-3"
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
                                        {editingLesson ? 'Save Changes' : 'Create Lesson'}
                                    </button>
                                </div>
                            </form>
                        </Motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LessonsPage;
