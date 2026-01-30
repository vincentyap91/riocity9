import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SessionModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
  /** Optional title; omit for default "Session Ended" */
  title?: string;
}

const DEFAULT_TITLE = 'Session Ended';

/**
 * Session message modal: idle logout and "another device" messages.
 * Styled to match the Language modal: overlay + panel, header with icon + title + X, content area.
 */
export function SessionModal({ open, message, onClose, title }: SessionModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 py-12 md:py-20">
          <div
            className="absolute inset-0 bg-black/10 backdrop-blur-xs transition-opacity duration-300"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-md bg-[#0f1923] rounded-[24px] border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden z-[101]"
          >
            {/* Header – same as Language modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00bc7d]/10 border border-[#00bc7d]/20 flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-[#00bc7d]" />
                </div>
                <h3 className="text-white font-black text-lg uppercase tracking-tighter">
                  {title ?? DEFAULT_TITLE}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content – message + CTA */}
            <div className="px-6 pb-6 pt-6 space-y-6">
              <p className="text-white/80 text-[15px] leading-relaxed">
                {message}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-[14px] bg-gradient-to-r from-[#00bc7d]/20 to-[#00bc7d]/10 border border-[#00bc7d]/30 text-[#00ff88] font-bold text-[15px] tracking-tight hover:from-[#00bc7d]/30 hover:to-[#00bc7d]/20 hover:border-[#00bc7d]/50 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
