import React from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const QuestionModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingQuestion,
  associatedLessonId,
  setAssociatedLessonId,
  lessons,
  questionsLoading,
  localError,
  handleAnswerChange,
  handleCorrectChange,
  addAnswerField,
  removeAnswerField,
  questionTypes,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cyber-bg/80 backdrop-blur-sm">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-cyber-surface w-full max-w-2xl rounded-2xl border border-cyber-border shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cyber-text-muted hover:text-cyber-text transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-6 border-b border-cyber-border">
            <h2 className="text-xl font-bold">
              {editingQuestion ? "Edit Question" : "Add Question"}
            </h2>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
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
                    <option key={l.lessonId} value={l.lessonId}>
                      {l.title}
                    </option>
                  ))}
                </select>

                <label className="block text-sm font-medium text-cyber-text-muted mb-2 mt-6">
                  Question Type
                </label>
                <select
                  value={formData.questionType}
                  onChange={(e) =>
                    setFormData({ ...formData, questionType: e.target.value })
                  }
                  required
                  className="input-field h-12 cursor-pointer"
                >
                  <option value="">Select question type</option>
                  {questionTypes.map((type) => (
                    <option key={type.id || type} value={type.name || type}>
                      {type.name || type}
                    </option>
                  ))}
                </select>
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
                Explanation / Content
              </label>
              <textarea
                value={formData.questionContent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    questionContent: e.target.value,
                  })
                }
                required
                rows={3}
                placeholder="Explain why this is Phish or Safe..."
                className="input-field resize-none py-3 w-full"
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
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
    </AnimatePresence>
  );
};

export default QuestionModal;
