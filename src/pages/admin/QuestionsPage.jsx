import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  ShieldAlert,
  CheckCircle,
  QuoteIcon,
} from "lucide-react";
import Card from "./components/common/Card";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useQuestions } from "../../hooks/useQuestions";
import { useLessons } from "../../hooks/useLessons";
import QuestionModal from "./components/common/QuestionModal";
import DeleteConfirmModal from "./components/common/DeleteConfirmModal";

const emptyQuestionModel = {
  questionText: "",
  questionContent: "",
  questionType: "",
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  // تصفية الأسئلة (ولا نعرض أي أسئلة لو اختار "All")
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = (q.questionText || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const displayQuestions =
    selectedLesson === "all" ? [] : filteredQuestions;

  const handleOpenModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setAssociatedLessonId(selectedLesson !== "all" ? selectedLesson : "");
      setFormData({
        questionText: question.questionText || "",
        questionContent: question.questionContent || "",
        questionType: question.questionType || "",
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
        questionType: "",
        answers: [{ answerText: "", isCorrect: false }],
      });
    }
    setIsModalOpen(true);
    setLocalError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
    setLocalError("");
  };

  const handleOpenDeleteModal = (question) => {
    setDeletingQuestion(question);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingQuestion(null);
    setDeleteLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (!deletingQuestion) return;

    setDeleteLoading(true);
    try {
      await deleteQuestion(deletingQuestion.lessonId, deletingQuestion.questionId);
      handleCloseDeleteModal();
    } catch (err) {
      console.error("Failed to delete:", err);
      setLocalError(err.message || "Failed to delete question");
      handleCloseDeleteModal();
    }
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
          editingQuestion.questionId,
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
            <option key={l.lessonId} value={l.lessonId}>
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
          {displayQuestions.length > 0 ? (
            displayQuestions.map((q) => (
              <Motion.div
                key={q.questionId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                // exit={{ opacity: 0, x: 20 }}
                layout
              >
                <Card className="hover:border-cyber-primary/20 transition-all">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div
                      className="p-4 rounded-xl flex items-center justify-center transition-all bg-cyber-primary/10 text-cyber-primary w-16 h-16"
                    >
                      <QuoteIcon size={28} className="text-cyber-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold tracking-widest text-cyber-primary uppercase">
                          {lessons.find((l) => l.lessonId === q.lessonId)?.title}
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
                            onClick={() => handleOpenDeleteModal(q)}
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
                      className="px-4 py-1.5 rounded-full text-sm uppercase tracking-tighter self-start md:self-center bg-cyber-primary/20 text-cyber-primary font-bold"
                    >
                      {q.questionType}
                    </div>
                  </div>
                </Card>
              </Motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <QuoteIcon size={48} className="mx-auto text-cyber-text-muted mb-4" />
              <p className="text-cyber-text-muted">No questions found</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
     <QuestionModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      editingQuestion={editingQuestion}
      loading={loading}
      localError={localError}
      associatedLessonId={associatedLessonId}
      setAssociatedLessonId={setAssociatedLessonId}
      lessons={lessons}
      questionsLoading={questionsLoading}
      handleAnswerChange={handleAnswerChange}
      handleCorrectChange={handleCorrectChange}
      addAnswerField={addAnswerField}
      removeAnswerField={removeAnswerField}/>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Delete Question"
        message="Are you sure you want to delete this question?"
        itemName={deletingQuestion?.questionText}
      />

      
    </div>
  );
};

export default QuestionsPage;
