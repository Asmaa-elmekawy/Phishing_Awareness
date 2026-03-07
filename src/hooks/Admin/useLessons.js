import { useState, useEffect } from "react";
import lessonService from "../../services/AdminServices/lessonsService";

export const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonService.getAllLessons();
      setLessons(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonService.getLessonById(id);
      setSelectedLesson(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createLesson = async (lessonData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonService.createLesson(lessonData);
      // نحدث قائمة الدروس بعد الإضافة
      await fetchLessons();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLesson = async (id, lessonData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonService.updateLesson(id, lessonData);
      // نحدث قائمة الدروس بعد التعديل
      await fetchLessons();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonService.deleteLesson(id);
      // نحدث قائمة الدروس بعد المسح
      await fetchLessons();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // نجلب الدروس أول ما الكومبوننت يتحمل
  useEffect(() => {
    fetchLessons();
  }, []);

  return {
    lessons,
    selectedLesson,
    loading,
    error,
    fetchLessons,
    fetchLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
  };
};
