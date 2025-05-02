// src/components/ui/Modal.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import FocusLock from 'react-focus-lock';
import React, { useEffect } from 'react'; // Import React

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Optional title for the modal header
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // Effect to handle Escape key press for closing modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore background scroll when modal closes
      document.body.style.overflow = '';
    }
    // Cleanup listener and overflow style
    return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusLock returnFocus> {/* Traps focus inside */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" // Added overflow-y-auto
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm" // Use fixed for backdrop
              onClick={onClose} // Close on backdrop click
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              aria-hidden="true"
            />

            {/* Modal Panel */}
            <motion.div
              className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-xl border border-gray-100 my-8" // Max-width lg, margin top/bottom
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside panel
            >
              {/* Modal Header (Optional) */}
              {title && (
                 <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10"> {/* Sticky header */}
                    <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                       {title}
                    </h2>
                    <button
                       onClick={onClose}
                       aria-label="Close modal"
                       className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
                     >
                       <X className="h-5 w-5" />
                     </button>
                 </div>
              )}

              {/* Close Button (if no title/header - generally better to have a header) */}
              {!title && (
                   <button
                       onClick={onClose}
                       aria-label="Close modal"
                       className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors z-20"
                     >
                       <X className="h-5 w-5" />
                  </button>
              )}

              {/* Modal Content - Make content scrollable if needed */}
              <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto"> {/* Max height and scroll */}
                {children}
              </div>
            </motion.div>
          </motion.div>
        </FocusLock>
      )}
    </AnimatePresence>
  );
};

export default Modal;