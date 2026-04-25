import { useState, useEffect } from "react";
import lessonCardsService from "../../services/WebServices/lessonCardsService";

export const useLessonCards = () => {
  const [lessons, setLessons] = useState([]);        // كل الدروس (cards)
  const [activeLessons, setActiveLessons] = useState([]); // الدروس النشطة فقط
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // جلب كل الدروس (cards)
  const fetchLessonCards = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonCardsService.getUserLessonCards();
      console.log("📦 All lesson cards:", data);
      setLessons(data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching lesson cards:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب الدروس النشطة فقط (active)
  const fetchActiveLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonCardsService.getActiveLessons();
      console.log("📦 Active lessons:", data);
      setActiveLessons(data);
      return data;
    } catch (err) {
      console.error("❌ Error fetching active lessons:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ ده اللي كنت محتاجاه: اسم واضح إنه بيجيب كل الدروس
  const fetchAllLessons = fetchLessonCards; // أو تسخدمي fetchLessonCards مباشرة

  // جلب كل الدروس أول ما الكومبوننت يتحمل (اختياري)
  useEffect(() => {
    fetchLessonCards();
  }, []);

  return {
    lessons,           // كل الدروس (cards)
    activeLessons,     // الدروس النشطة فقط
    loading,
    error,
    fetchLessonCards,  // جلب كل الدروس
    fetchActiveLessons, // جلب الدروس النشطة
    fetchAllLessons,   // ✅ نفس fetchLessonCards بس اسم أوضح
  };
};