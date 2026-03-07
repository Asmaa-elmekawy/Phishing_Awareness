// hooks/useQuestions.js
import { useState, useEffect } from "react";
import questionService from "../services/questionService";

export const useQuestions = (lessonId = null) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // جلب أسئلة درس معين
  const fetchQuestionsByLesson = async (id = lessonId) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await questionService.getQuestionsByLesson(id);
      setQuestions(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب كل الأسئلة لكل الدروس (مفيد لصفحة الدروس الرئيسية)
  const fetchAllQuestions = async (lessonsList) => {
    if (!lessonsList || lessonsList.length === 0) return [];
    
    setLoading(true);
    setError(null);
    try {
      const promises = lessonsList.map((lesson) =>
        questionService.getQuestionsByLesson(lesson.lessonId || lesson.id)
      );
      const results = await Promise.all(promises);
      const allQuestions = results.flat();
      setQuestions(allQuestions);
      return allQuestions;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب سؤال معين
  const fetchQuestionById = async (lessonId, questionId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionService.getQuestionById(lessonId, questionId);
      setSelectedQuestion(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // إضافة سؤال
  const createQuestion = async (lessonId, questionData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionService.createQuestion(lessonId, questionData);
      // تحديث القائمة بعد الإضافة
      await fetchQuestionsByLesson(lessonId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // تعديل سؤال
  const updateQuestion = async (lessonId, questionId, questionData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionService.updateQuestion(
        lessonId,
        questionId,
        questionData,
      );
      // تحديث القائمة بعد التعديل
      await fetchQuestionsByLesson(lessonId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // مسح سؤال
  const deleteQuestion = async (lessonId, questionId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await questionService.deleteQuestion(lessonId, questionId);
      // تحديث القائمة بعد المسح
      await fetchQuestionsByLesson(lessonId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // لو في lessonId، نجيب الأسئلة أول ما الكومبوننت يتحمل
  useEffect(() => {
    if (lessonId) {
      fetchQuestionsByLesson(lessonId);
    }
  }, [lessonId]);

  return {
    questions,
    selectedQuestion,
    loading,
    error,
    fetchQuestionsByLesson,
    fetchQuestions: fetchAllQuestions, // Alias for convenience
    fetchAllQuestions,
    fetchQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};
