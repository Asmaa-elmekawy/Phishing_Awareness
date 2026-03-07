import { useState, useEffect } from "react";
import metaService from "../../services/AdminServices/metaService";

export const useMeta = () => {
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDifficultyLevels = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await metaService.getAllDifficultyLevels();
      console.log(" Difficulty levels:", data);
      setDifficultyLevels(data);
      return data;
    } catch (err) {
      console.error(" Error fetching difficulty levels:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await metaService.getAllQuestionsTypes();
      console.log(" Question types:", data);
      setQuestionTypes(data);
      return data;
    } catch (err) {
      console.error(" Error fetching question types:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب كل البيانات مرة واحدة
  const fetchAllMeta = async () => {
    setLoading(true);
    setError(null);
    try {
      const [levels, types] = await Promise.all([
        metaService.getAllDifficultyLevels(),
        metaService.getAllQuestionsTypes(),
      ]);
      console.log(" All meta data:", { levels, types });
      setDifficultyLevels(levels);
      setQuestionTypes(types);
      return { difficultyLevels: levels, questionTypes: types };
    } catch (err) {
      console.error(" Error fetching meta data:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات أول مرة (اختياري - علقيه لو مش عايزة)
  useEffect(() => {
    fetchAllMeta();
  }, []);

  return {
    difficultyLevels,
    questionTypes,

    loading,
    error,

    fetchDifficultyLevels,
    fetchQuestionTypes,

    fetchAllMeta,
  };
};
