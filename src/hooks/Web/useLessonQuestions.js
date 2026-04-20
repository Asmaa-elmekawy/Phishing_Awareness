import { useState, useEffect } from "react";
import lessonQuestionsService from "../../services/WebServices/lessonQuestionsService";

export const useLessonQuestions = (lessonId) => {
  const [questions, setQuestions] = useState([]);        // كل الأسئلة
  const [currentQuestion, setCurrentQuestion] = useState(null); // السؤال الحالي
  const [currentIndex, setCurrentIndex] = useState(0);   // مؤشر السؤال الحالي
  const [answers, setAnswers] = useState([]);            // الإجابات المختارة
  const [result, setResult] = useState(null);            // نتيجة الدرس
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // جلب كل أسئلة الدرس
  const fetchLessonQuestions = async () => {
    if (!lessonId) return;
    setLoading(true);
    setError(null);
    try {
      const allQuestions = await lessonQuestionsService.getLessonQuestions(lessonId);
      console.log("📦 All Lesson questions:", allQuestions);
      setQuestions(allQuestions);
      
      // Get current question (progress)
      const currentQ = await lessonQuestionsService.getNextQuestion(lessonId);
      console.log("📦 Current question (resumed):", currentQ);
      
      if (currentQ && currentQ.questionId) {
        setCurrentQuestion(currentQ);
        // Find index in the full list
        const index = allQuestions.findIndex(q => q.questionId === currentQ.questionId);
        setCurrentIndex(index !== -1 ? index : 0);
      } else if (allQuestions.length > 0) {
        // If no next question, might be completed
        setCurrentQuestion(allQuestions[0]);
        setCurrentIndex(0);
      }
      return allQuestions;
    } catch (err) {
      console.error("❌ Error fetching questions:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب السؤال التالي
  const fetchNextQuestion = async () => {
    if (!lessonId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await lessonQuestionsService.getNextQuestion(lessonId);
      console.log("📦 Next question:", data);
      
      if (data && data.questionId) {
        setCurrentQuestion(data);
        setCurrentIndex(prev => prev + 1);
      } else {
        // مفيش أسئلة تانية، نروح للنتيجة
        await fetchLessonResult();
      }
      return data;
    } catch (err) {
      console.error("❌ Error fetching next question:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // إرسال إجابة
  const submitAnswer = async (questionId, answerId) => {
    if (!lessonId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await lessonQuestionsService.submitAnswer(lessonId, {
        questionId,
        answerId
      });
      console.log("✅ Answer submitted:", data);
      
      // تخزين الإجابة
      setAnswers(prev => [...prev, { questionId, answerId, isCorrect: data.isCorrect }]);
      
      return data;
    } catch (err) {
      // Handle "Already Answered" gracefully
      if (err.data && (err.data.errors?.includes("Question.AlreadyAnswered") || err.message?.includes("already answerd"))) {
        console.warn("⚠️ Question already answered, skipping...");
        return { isAlreadyAnswered: true };
      }
      
      console.error("❌ Error submitting answer:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب نتيجة الدرس
  const fetchLessonResult = async () => {
    if (!lessonId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await lessonQuestionsService.getLessonResult(lessonId);
      console.log("📊 Lesson result:", data);
      setResult(data);
      setIsCompleted(true);
      return data;
    } catch (err) {
      console.error("❌ Error fetching result:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // معالجة الإجابة والانتقال للسؤال التالي
  const handleAnswer = async (questionId, answerId) => {
    await submitAnswer(questionId, answerId);
    
    // بعد الإجابة، نجيب السؤال التالي
    const nextQuestion = await fetchNextQuestion();
    
    // لو مفيش سؤال تاني، نروح للنتيجة
    if (!nextQuestion || !nextQuestion.questionId) {
      await fetchLessonResult();
    }
  };

  // إعادة تعيين الحالة (لما نخرج من الدرس)
  const resetLesson = () => {
    setQuestions([]);
    setCurrentQuestion(null);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsCompleted(false);
    setError(null);
  };

  // جلب الأسئلة أول ما الكومبوننت يتحمل
  useEffect(() => {
    if (lessonId) {
      fetchLessonQuestions();
    }
    
    return () => {
      resetLesson();
    };
  }, [lessonId]);

  return {
    // البيانات
    questions,
    currentQuestion,
    currentIndex,
    answers,
    result,
    loading,
    error,
    isCompleted,
    
    // الدوال
    fetchLessonQuestions,
    fetchNextQuestion,
    submitAnswer,
    fetchLessonResult,
    handleAnswer,
    resetLesson,
    
    // معلومات مفيدة
    totalQuestions: questions.length,
    isLastQuestion: currentIndex === questions.length - 1,
    hasMoreQuestions: currentIndex < questions.length - 1,
  };
};