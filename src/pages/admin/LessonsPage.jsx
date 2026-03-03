import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, BookOpen } from "lucide-react";
import Card from "./components/common/Card";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useLessons } from "../../hooks/useLessons";
import { useQuestions } from "../../hooks/useQuestions";
import LessonModal from "./components/common/LessonModal";

const LessonsPage = () => {
  const {
    lessons,
    loading,
    error,
    fetchLessons,
    createLesson,
    updateLesson,
    deleteLesson,
  } = useLessons();

  const { questions, fetchQuestions } = useQuestions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    orderNumber: 0,
    difficultyLevel: "",
  });

  useEffect(() => {
    fetchLessons();
    if (fetchQuestions) fetchQuestions();
  }, []);

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenCreateModal = () => {
    setEditingLesson(null);
    setFormData({
      id: null,
      title: "",
      description: "",
      orderNumber: 0,
      difficultyLevel: "",
    });
    setIsModalOpen(true);
    setLocalError("");
  };

  const handleOpenEditModal = (lesson) => {
    console.log("Editing lesson:", lesson);
    setEditingLesson(lesson);
    setFormData({
      id: lesson.lessonId,
      title: lesson.title || "",
      description: lesson.description || "",
      orderNumber: lesson.orderNumber || 0,
      difficultyLevel: lesson.difficultyLevel || "",
    });
    setIsModalOpen(true);
    setLocalError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLesson(null);
    setLocalError("");
  };

  //  الفورم (إضافة أو تعديل)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      if (editingLesson) {
        const lessonId = editingLesson.lessonId;

        if (!lessonId) {
          setLocalError("معرف الدرس غير موجود");
          return;
        }

        const updatedData = {
          title: formData.title,
          description: formData.description,
          orderNumber: formData.orderNumber,
          difficultyLevel: formData.difficultyLevel,
        };

        await updateLesson(lessonId, updatedData);
        console.log(" Lesson updated successfully");
      } else {
        //  إضافة درس جديد
        const newLessonData = {
          title: formData.title,
          description: formData.description,
          orderNumber: formData.orderNumber,
          difficultyLevel: formData.difficultyLevel,
        };

        await createLesson(newLessonData);
        console.log(" Lesson created successfully");
      }

      handleCloseModal();
    } catch (err) {
      console.error(" Error saving lesson:", err);
      setLocalError(err.message || "فشل في حفظ الدرس");
    }
  };

  // حذف درس
  const handleDelete = async (lessonId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this lesson? All associated questions will also be deleted.",
      )
    ) {
      try {
        await deleteLesson(lessonId);
      } catch (err) {
        console.error("فشل في حذف الدرس:", err);
      }
    }
  };

  const displayError = error || localError;

  if (loading && !lessons.length) {
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
          <h1 className="text-3xl font-bold mb-2">Lessons Management</h1>
          <p className="text-cyber-text-muted">
            Manage educational content and phishing modules.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="btn-primary"
          disabled={loading}
        >
          <Plus size={20} />
          Create Lesson
        </button>
      </header>

      {displayError && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4">
          {displayError}
        </div>
      )}

      <div className="relative max-w-md mb-8">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted"
        />
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
              key={lesson.lessonId}
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
                      onClick={() => handleOpenEditModal(lesson)}
                      className="text-cyber-text-muted hover:text-cyber-primary flex items-center gap-1.5 text-sm font-medium transition-colors"
                      disabled={loading}
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lesson.lessonId)}
                      className="text-cyber-text-muted hover:text-cyber-error flex items-center gap-1.5 text-sm font-medium transition-colors"
                      disabled={loading}
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
                    <h3 className="font-bold text-lg mb-2 truncate">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-cyber-text-muted line-clamp-3 leading-relaxed">
                      {lesson.description}
                    </p>
                    <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyber-bg text-cyber-primary border border-cyber-primary/20">
                      {questions?.filter((q) => q.lessonId === lesson.lessonId)
                        .length || 0}{" "}
                      Questions
                    </div>
                  </div>
                </div>
              </Card>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-cyber-text-muted mb-4" />
          <p className="text-cyber-text-muted">No lessons found</p>
        </div>
      )}

      <LessonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingLesson={editingLesson}
        loading={loading}
        localError={localError}
      />
    </div>
  );
};

export default LessonsPage;
