import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [lessons, setLessons] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load data from localStorage
        const savedLessons = localStorage.getItem('phish_lessons');
        const savedQuestions = localStorage.getItem('phish_questions');

        if (savedLessons) {
            setLessons(JSON.parse(savedLessons));
        } else {
            // Initial sample data
            const initialLessons = [
                { id: '1', title: 'Email Safety 101', description: 'Learn how to identify suspicious emails.' },
                { id: '2', title: 'Social Media Traps', description: 'Spotting phish on social platforms.' }
            ];
            setLessons(initialLessons);
            localStorage.setItem('phish_lessons', JSON.stringify(initialLessons));
        }

        if (savedQuestions) {
            setQuestions(JSON.parse(savedQuestions));
        } else {
            // Initial sample data
            const initialQuestions = [
                {
                    id: 'q1',
                    lessonId: '1',
                    scenario: 'You receive an email from "service@paypa1.com" asking you to verify your account.',
                    correctAnswer: 'IsPhish',
                    explanation: 'The domain name is "paypa1.com" (with a number 1) instead of "paypal.com".'
                },
                {
                    id: 'q2',
                    lessonId: '1',
                    scenario: 'An email from your bank (official domain) with your full name correctly spelled.',
                    correctAnswer: 'Safe',
                    explanation: 'Standard bank communication from a verified domain with personalized info is usually safe.'
                }
            ];
            setQuestions(initialQuestions);
            localStorage.setItem('phish_questions', JSON.stringify(initialQuestions));
        }

        setLoading(false);
    }, []);

    // Lessons CRUD
    const addLesson = (lesson) => {
        const newLessons = [...lessons, { ...lesson, id: Date.now().toString() }];
        setLessons(newLessons);
        localStorage.setItem('phish_lessons', JSON.stringify(newLessons));
    };

    const updateLesson = (id, updatedLesson) => {
        const newLessons = lessons.map(l => l.id === id ? { ...l, ...updatedLesson } : l);
        setLessons(newLessons);
        localStorage.setItem('phish_lessons', JSON.stringify(newLessons));
    };

    const deleteLesson = (id) => {
        const newLessons = lessons.filter(l => l.id !== id);
        setLessons(newLessons);
        localStorage.setItem('phish_lessons', JSON.stringify(newLessons));

        // Also delete associated questions
        const newQuestions = questions.filter(q => q.lessonId !== id);
        setQuestions(newQuestions);
        localStorage.setItem('phish_questions', JSON.stringify(newQuestions));
    };

    // Questions CRUD
    const addQuestion = (question) => {
        const newQuestions = [...questions, { ...question, id: Date.now().toString() }];
        setQuestions(newQuestions);
        localStorage.setItem('phish_questions', JSON.stringify(newQuestions));
    };

    const updateQuestion = (id, updatedQuestion) => {
        const newQuestions = questions.map(q => q.id === id ? { ...q, ...updatedQuestion } : q);
        setQuestions(newQuestions);
        localStorage.setItem('phish_questions', JSON.stringify(newQuestions));
    };

    const deleteQuestion = (id) => {
        const newQuestions = questions.filter(q => q.id !== id);
        setQuestions(newQuestions);
        localStorage.setItem('phish_questions', JSON.stringify(newQuestions));
    };

    return (
        <DataContext.Provider value={{
            lessons, questions, loading,
            addLesson, updateLesson, deleteLesson,
            addQuestion, updateQuestion, deleteQuestion
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
