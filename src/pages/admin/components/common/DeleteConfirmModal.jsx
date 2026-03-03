// components/DeleteConfirmModal.jsx
import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName = "",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-cyber-bg/80 backdrop-blur-sm">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-cyber-surface w-full max-w-md rounded-2xl border border-cyber-border shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cyber-text-muted hover:text-cyber-text transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>

          <div className="p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={32} className="text-cyber-error" />
            </div>

            <h2 className="text-xl font-bold text-cyber-text mb-2">{title}</h2>

            <p className="text-cyber-text-muted mb-2">{message}</p>

            {itemName && (
              <p className="text-cyber-text font-semibold bg-cyber-bg/50 p-3 rounded-lg mb-6 border border-cyber-border">
                "{itemName}"
              </p>
            )}

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-cyber-border font-bold text-cyber-text-muted hover:bg-cyber-surface-alt transition-all"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-6 py-2.5 rounded-lg bg-cyber-error text-white font-bold hover:bg-cyber-error/80 transition-all flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </Motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
