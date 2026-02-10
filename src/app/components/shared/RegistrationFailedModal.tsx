import React from 'react';

interface RegistrationFailedModalProps {
  isOpen: boolean;
  onBackHome: () => void;
  onMoreGames: () => void;
  message?: string;
}

export function RegistrationFailedModal({
  isOpen,
  onBackHome,
  onMoreGames,
  message = 'Registration Failed',
}: RegistrationFailedModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-[#232529] border border-white/10 p-5 md:p-6 flex flex-col items-center gap-4">
        <div className="text-white/90 text-sm md:text-base font-medium text-center">{message}</div>
        <div className="w-full grid grid-cols-2 gap-2">
          <button
            type="button"
            className="h-10 rounded-md bg-[#43ea8a] text-black text-sm font-bold hover:bg-[#58f29a] transition-colors"
            onClick={onBackHome}
          >
            Back To Home
          </button>
          <button
            type="button"
            className="h-10 rounded-md bg-[#f2cc2f] text-black text-sm font-bold hover:bg-[#ffd74f] transition-colors"
            onClick={onMoreGames}
          >
            More Games
          </button>
        </div>
      </div>
    </div>
  );
}
