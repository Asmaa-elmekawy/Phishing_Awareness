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
      try {
        const currentQ = await lessonQuestionsService.getNextQuestion(lessonId);
        console.log("📦 Current question (resumed):", currentQ);
        
        if (currentQ && currentQ.questionId) {
          setCurrentQuestion(currentQ);
          // Find index in the full list
          const index = allQuestions.findIndex(q => q.questionId === currentQ.questionId);
          setCurrentIndex(index !== -1 ? index : 0);
        } else if (allQuestions.length > 0) {
          // If no next question from server, but we have questions, check if we should show results
          try {
            await fetchLessonResult();
          } catch (resErr) {
            // If result fetch fails, just default to first question
            setCurrentQuestion(allQuestions[0]);
            setCurrentIndex(0);
          }
        }
      } catch (err) {
        const isLessonCompleted = 
          (err.data?.errors && err.data.errors.some(e => e.includes("Lesson Completed") || e.includes("lesson completed"))) ||
          (err.message && (err.message.includes("Lesson Completed") || err.message.includes("lesson completed")));
        
        if (isLessonCompleted) {
          await fetchLessonResult();
        } else if (allQuestions.length > 0) {
          // Fallback to first question if getNextQuestion fails but we have questions
          setCurrentQuestion(allQuestions[0]);
          setCurrentIndex(0);
        }
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
      // Handle "Already Answered" or "Completed" gracefully
      const isAlreadyAnswered = 
        (err.data?.errors && err.data.errors.some(e => e.includes("AlreadyAnswered") || e.includes("already answerd"))) ||
        (err.message && (err.message.includes("AlreadyAnswered") || err.message.includes("already answerd")));

      const isLessonCompleted = 
        (err.data?.errors && err.data.errors.some(e => e.includes("Lesson Completed") || e.includes("lesson completed"))) ||
        (err.message && (err.message.includes("Lesson Completed") || err.message.includes("lesson completed")));

      if (isAlreadyAnswered || isLessonCompleted) {
        console.warn("⚠️ Already answered or lesson completed, moving on...");
        return { isAlreadyAnswered: true, isLessonCompleted: isLessonCompleted };
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
    try {
      const response = await submitAnswer(questionId, answerId);
      
      // If lesson is already completed, show results
      if (response?.isLessonCompleted) {
        await fetchLessonResult();
        return;
      }
    } catch (err) {
      // Still good to handle "Already Answered" just in case of race conditions
      console.warn("Retrying mode: skipping server error for already answered question", err);
    }

    // بعد الإجابة، نجيب السؤال التالي
    const nextQuestion = questions[currentIndex + 1];
    
    // لو مفيش سؤال تاني، نروح للنتيجة
    if (!nextQuestion) {
      setIsCompleted(true);
      await fetchLessonResult();
    } else {
      setCurrentQuestion(nextQuestion);
      setCurrentIndex(prev => prev + 1);
    }
  };

  // وظيفة إعادة البدء (Retry) - Server Reset + State Reset
  const retry = async () => {
    if (!lessonId) return;
    setLoading(true);
    setError(null);
    try {
      // 1. مسح التقدم على السيرفر
      await lessonQuestionsService.resetLessonProgress(lessonId);
      
      // 2. تصفير الحالة محلياً
      setResult(null);
      setIsCompleted(false);
      setCurrentIndex(0);
      setAnswers([]);
      
      // 3. إعادة جلب الأسئلة من جديد
      await fetchLessonQuestions();
    } catch (err) {
      console.error("❌ Failed to reset lesson:", err);
      setError("Failed to restart the lesson. Please try again.");
    } finally {
      setLoading(false);
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
    retry,
    
    // معلومات مفيدة
    totalQuestions: questions.length,
    isLastQuestion: currentIndex === questions.length - 1,
    hasMoreQuestions: currentIndex < questions.length - 1,
  };
};