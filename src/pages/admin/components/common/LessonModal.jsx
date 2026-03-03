import { X } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const LessonModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingLesson,
  loading,
  localError,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cyber-bg/80 backdrop-blur-sm">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-cyber-surface w-full max-w-lg rounded-2xl border border-cyber-border shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cyber-text-muted hover:text-cyber-text transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-6 border-b border-cyber-border">
            <h2 className="text-xl font-bold">
              {editingLesson ? "Edit Lesson" : "Create New Lesson"}
            </h2>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-6">
            {/* عرض أخطاء محلية */}
            {localError && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
                {localError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                Lesson Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="e.g. Email Security Basics"
                className="input-field focus:ring-2 focus:ring-cyber-primary/20 h-11"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  Order Number
                </label>
                <input
                  type="number"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      orderNumber: Number(e.target.value),
                    })
                  }
                  required
                  min={0}
                  className="input-field focus:ring-2 focus:ring-cyber-primary/20 h-11"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  Difficulty Level
                </label>
                <input
                  type="text"
                  value={formData.difficultyLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficultyLevel: e.target.value,
                    })
                  }
                  required
                  placeholder="e.g. Beginner"
                  className="input-field focus:ring-2 focus:ring-cyber-primary/20 h-11"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
                placeholder="Describe what users will learn in this lesson..."
                className="input-field focus:ring-2 focus:ring-cyber-primary/20 resize-none py-3"
                disabled={loading}
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-cyber-border font-bold text-cyber-text-muted hover:bg-cyber-surface-alt transition-all"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-8"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editingLesson
                    ? "Save Changes"
                    : "Create Lesson"}
              </button>
            </div>
          </form>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LessonModal;
