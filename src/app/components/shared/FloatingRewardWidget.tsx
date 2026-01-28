import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingRewardWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();

  const handleBonusClick = (bonusType: string) => {
    navigate(`/bonus/${bonusType}`);
    setIsExpanded(false);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleHide = () => {
    setIsHidden(true);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className="fixed bottom-36 md:bottom-24 right-6 z-40 flex items-end gap-3">
      {/* Bonus Icons Panel - Slides in from right */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative flex items-center gap-3 bg-[#1a2230]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl"
          >
            {/* Collapse Button on Left */}
            <button
              onClick={handleCollapse}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center hover:from-orange-400 hover:to-orange-500 active:scale-95 transition-all shadow-lg"
              aria-label="Collapse"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Spin Wheel Bonus */}
            <button
              onClick={() => handleBonusClick('wheel')}
              className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label="Spin Wheel Bonus"
            >
              <img
                src="https://pksoftcdn.azureedge.net/media/spin%20wheel%20button-202501021417106102.svg"
                alt="Spin Wheel Bonus"
                className="w-full h-full object-contain"
              />
            </button>

            {/* Voucher Scratch Bonus */}
            <button
              onClick={() => handleBonusClick('scratch')}
              className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label="Voucher Scratch Bonus"
            >
              <img
                src="https://pksoftcdn.azureedge.net/media/voucher-scratch-202510101415238782.png"
                alt="Voucher Scratch Bonus"
                className="w-full h-full object-contain"
              />
            </button>

            {/* Prize Box Bonus */}
            <button
              onClick={() => handleBonusClick('prize')}
              className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              aria-label="Prize Box Bonus"
            >
              <img
                src="https://pksoftcdn.azureedge.net/media/prize-box-202510101415447518.png"
                alt="Prize Box Bonus"
                className="w-full h-full object-contain"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Gift Box Button */}
      <div className="relative">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-16 h-16 md:w-16 md:h-16 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
          aria-label="Rewards"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://pksoftcdn.azureedge.net/media/floating-icon-202510101416400018-202511120902419089.png"
            alt="Rewards"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.button>
        
        {/* Close Button on Big Gift Box */}
        <button
          onClick={handleHide}
          className="absolute -top-5 -right-2 w-5 h-5 rounded-full bg-[#1a2230] border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
          aria-label="Hide Widget"
        >
          <X className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
}
