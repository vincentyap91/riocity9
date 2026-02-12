import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { PRIMARY_CTA_CLASS } from '../../config/themeTokens';

interface VerifyPhoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
}

export function VerifyPhoneModal({ open, onOpenChange, phoneNumber }: VerifyPhoneModalProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      // Placeholder for OTP API integration.
      await new Promise((resolve) => setTimeout(resolve, 600));
      onOpenChange(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[580px] p-0 gap-0 border border-white/10 bg-[#0f1923] rounded-[32px] overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] [&>button]:hidden"
        overlayClassName="bg-black/60 backdrop-blur-sm"
      >
        <DialogHeader className="px-6 py-5 border-b border-white/5 text-left bg-gradient-to-b from-white/5 to-transparent">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[#39ff88] text-xl md:text-2xl font-black italic uppercase tracking-tighter">
              Verify Phone Number
            </DialogTitle>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 md:px-8 pb-8 pt-5">
          <div className="bg-[#1a2230] rounded-2xl border border-white/5 p-4 md:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
              <div className="text-white/80 text-sm md:text-base leading-tight">
                OTP will be sent to <span className="text-white font-black tracking-tight">{phoneNumber}</span>
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSending}
                className={`${PRIMARY_CTA_CLASS} h-11 px-6 rounded-xl text-sm md:text-base font-black tracking-tight disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isSending ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
