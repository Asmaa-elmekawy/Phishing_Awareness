import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  ShieldAlert,
  CheckCircle,
  X,
} from "lucide-react";
import Card from "./components/common/Card";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useQuestions } from "../../hooks/useQuestions";
import { useLessons } from "../../hooks/useLessons";

const emptyQuestionModel = {
  questionText: "",
  questionContent: "",
  questionType: "Email",
  answers: [
    {
      answerText: "",
      isCorrect: false,
    },
  ],
};

const QuestionsPage = () => {
  const {
    questions,
    loading: questionsLoading,
    error: questionsError,
    fetchQuestionsByLesson,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  } = useQuestions();

  const { lessons, loading: lessonsLoading, fetchLessons } = useLessons();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("all");
  const [associatedLessonId, setAssociatedLessonId] = useState("");
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState(emptyQuestionModel);

  // نجيب الدروس أول ما الصفحة تتحمل
  useEffect(() => {
    fetchLessons();
  }, []);

  // لما نختار درس، نجيب أسئلته
  useEffect(() => {
    if (selectedLesson && selectedLesson !== "all") {
      fetchQuestionsByLesson(selectedLesson);
    }
  }, [selectedLesson]);

  // تصفية الأسئلة
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = (q.questionText || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleOpenModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setAssociatedLessonId(selectedLesson !== "all" ? selectedLesson : "");
      setFormData({
        questionText: question.questionText || "",
        questionContent: question.questionContent || "",
        questionType: question.questionType || "Email",
        answers: question.answers?.length
          ? question.answers.map((a) => ({
              answerText: a.answerText || "",
              isCorrect: Boolean(a.isCorrect),
            }))
          : [{ answerText: "", isCorrect: false }],
      });
    } else {
      setEditingQuestion(null);
      setAssociatedLessonId(
        selectedLesson !== "all" ? selectedLesson : lessons[0]?.id || "",
      );
      setFormData({
        questionText: "",
        questionContent: "",
        questionType: "Email",
        answers: [{ answerText: "", isCorrect: false }],
      });
    }
    setIsModalOpen(true);
    setLocalError("");
  };

  // التعامل مع الإجابات
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

    // لو مسحنا الإجابة الصحيحة، نختار أول واحدة
    if (!newAnswers.some((ans) => ans.isCorrect)) {
      newAnswers[0] = { ...newAnswers[0], isCorrect: true };
    }

    setFormData({ ...formData, answers: newAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // التحقق من صحة البيانات
    if (!associatedLessonId) {
      setLocalError("Please select a lesson");
      return;
    }

    if (!formData.questionText) {
      setLocalError("Please enter question text");
      return;
    }

    if (!formData.questionType) {
      setLocalError("Please enter question type");
      return;
    }

    if (
      formData.answers.length === 0 ||
      !formData.answers.some((a) => a.isCorrect)
    ) {
      setLocalError("Please add at least one answer and mark one as correct");
      return;
    }

    // تصفية الإجابات الفاضية
    const validAnswers = formData.answers.filter(
      (a) => a.answerText.trim() !== "",
    );

    if (validAnswers.length === 0) {
      setLocalError("Please add at least one answer with text");
      return;
    }

    const questionData = {
      questionText: formData.questionText,
      questionContent: formData.questionContent || "",
      questionType: formData.questionType,
      answers: validAnswers,
    };

    try {
      if (editingQuestion) {
        await updateQuestion(
          associatedLessonId,
          editingQuestion.id,
          questionData,
        );
      } else {
        await createQuestion(associatedLessonId, questionData);
      }
      setIsModalOpen(false);
    } catch (err) {
      setLocalError(err.message || "Failed to save question");
    }
  };

  const handleDelete = async (questionId) => {
    if (!selectedLesson || selectedLesson === "all") {
      alert("Please select a specific lesson to delete questions");
      return;
    }

    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(selectedLesson, questionId);
      } catch (err) {
        console.error("Failed to delete question:", err);
      }
    }
  };

  // دالة لمعرفة نوع السؤال (Phish أو Safe) من الإجابة الصحيحة
  const getQuestionType = (question) => {
    const correctAnswer =
      question.answers?.find((a) => a.isCorrect)?.answerText || "";
    if (correctAnswer.toLowerCase().includes("phish")) return "phish";
    if (correctAnswer.toLowerCase().includes("safe")) return "safe";
    return "unknown";
  };

  const loading = questionsLoading || lessonsLoading;

  if (loading && !questions.length && !lessons.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Questions Management</h1>
          <p className="text-cyber-text-muted">
            Configure phishing scenarios and safe communication examples.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          disabled={lessons.length === 0 || selectedLesson === "all"}
          className="btn-primary"
          title={
            selectedLesson === "all"
              ? "Please select a specific lesson first"
              : ""
          }
        >
          <Plus size={20} />
          Add Question
        </button>
      </header>

      {/* عرض الأخطاء */}
      {(questionsError || localError) && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4">
          {questionsError || localError}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted"
          />
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
          {lessons.map((l) => (
            <option key={l.id} value={l.id}>
              {l.title}
            </option>
          ))}
        </select>
      </div>

      {/* رسالة لو اختار All Lessons */}
      {selectedLesson === "all" && (
        <div className="bg-cyber-surface p-4 rounded-lg text-center mb-4">
          <p className="text-cyber-text-muted">
            Please select a specific lesson to view its questions
          </p>
        </div>
      )}

      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions.map((q) => {
            const questionType = getQuestionType(q);
            return (
              <Motion.div
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                layout
              >
                <Card className="hover:border-cyber-primary/20 transition-all">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div
                      className={`
                                            p-4 rounded-xl flex items-center justify-center transition-all
                                            ${questionType === "phish" ? "bg-cyber-error/10 text-cyber-error" : "bg-cyber-success/10 text-cyber-success"}
                                        `}
                    >
                      {questionType === "phish" ? (
                        <ShieldAlert size={28} />
                      ) : (
                        <CheckCircle size={28} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold tracking-widest text-cyber-primary uppercase">
                          {lessons.find((l) => l.id === q.lessonId)?.title}
                        </span>
                        <div className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenModal(q)}
                            className="text-cyber-text-muted hover:text-cyber-primary"
                            disabled={questionsLoading}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(q.id)}
                            className="text-cyber-text-muted hover:text-cyber-error"
                            disabled={questionsLoading}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="font-bold text-lg mb-3 leading-relaxed">
                        {q.questionText}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(q.answers || []).map((ans, i) => (
                          <div
                            key={i}
                            className={`px-3 py-1 rounded-lg text-xs border ${
                              ans.isCorrect
                                ? "bg-cyber-primary/20 border-cyber-primary text-cyber-primary font-bold"
                                : "bg-cyber-surface-alt border-cyber-border text-cyber-text-muted"
                            }`}
                          >
                            {ans.answerText}
                          </div>
                        ))}
                      </div>

                      {q.questionContent && (
                        <div className="p-3 rounded-lg bg-cyber-bg/50 border border-cyber-border italic text-sm text-cyber-text-muted">
                          <span className="font-bold not-italic text-cyber-text">
                            Explanation:{" "}
                          </span>
                          {q.questionContent}
                        </div>
                      )}
                    </div>

                    <div
                      className={`
                                            px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter self-start md:self-center
                                            ${questionType === "phish" ? "bg-cyber-error/20 text-cyber-error" : "bg-cyber-success/20 text-cyber-success"}
                                        `}
                    >
                      {questionType === "phish" ? "PHISH" : "SAFE"}
                    </div>
                  </div>
                </Card>
              </Motion.div>
            );
          })}
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
              className="bg-cyber-surface w-full max-w-2xl rounded-2xl border border-cyber-border shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-cyber-text-muted hover:text-cyber-text transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-6 border-b border-cyber-border">
                <h2 className="text-xl font-bold">
                  {editingQuestion ? "Edit Question" : "Add Question"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {localError && (
                  <div className="bg-red-500/10 text-red-500 p-3 rounded-lg">
                    {localError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                      Associated Lesson
                    </label>
                    <select
                      value={associatedLessonId}
                      onChange={(e) => setAssociatedLessonId(e.target.value)}
                      required
                      className="input-field h-11 cursor-pointer"
                      disabled={!!editingQuestion}
                    >
                      <option value="">Select a lesson</option>
                      {lessons.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.title}
                        </option>
                      ))}
                    </select>

                    <label className="block text-sm font-medium text-cyber-text-muted mb-2 mt-6">
                      Question Type
                    </label>
                    <input
                      type="text"
                      value={formData.questionType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          questionType: e.target.value,
                        })
                      }
                      required
                      placeholder="e.g. Email, Multiple Choice, etc."
                      className="input-field h-11"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-sm font-medium text-cyber-text-muted">
                        Answers
                      </label>
                      <button
                        type="button"
                        onClick={addAnswerField}
                        className="text-xs font-bold text-cyber-primary hover:text-cyber-primary/80 flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Answer
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.answers.map((answer, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              value={answer.answerText}
                              onChange={(e) =>
                                handleAnswerChange(index, e.target.value)
                              }
                              required
                              placeholder={`Answer ${index + 1}`}
                              className={`input-field pl-10 h-11 ${
                                answer.isCorrect ? "border-cyber-primary" : ""
                              }`}
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={answer.isCorrect}
                                onChange={() => handleCorrectChange(index)}
                                className="w-4 h-4 accent-cyber-primary cursor-pointer"
                              />
                            </div>
                          </div>

                          {formData.answers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAnswerField(index)}
                              className="p-3 rounded-lg border border-cyber-border text-cyber-text-muted hover:text-cyber-error"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                    Question Text
                  </label>
                  <textarea
                    value={formData.questionText}
                    onChange={(e) =>
                      setFormData({ ...formData, questionText: e.target.value })
                    }
                    required
                    rows={3}
                    placeholder="e.g. Email from HR asking to click a link to view salary..."
                    className="input-field resize-none py-3 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                    Explanation / Content (Optional)
                  </label>
                  <textarea
                    value={formData.questionContent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        questionContent: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Explain why this is Phish or Safe..."
                    className="input-field resize-none py-3 w-full"
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
                    disabled={questionsLoading}
                  >
                    {questionsLoading
                      ? "Saving..."
                      : editingQuestion
                        ? "Save Changes"
                        : "Add Question"}
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

export default QuestionsPage;
