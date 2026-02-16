import React from "react";
import { ArrowRight } from "lucide-react";

export function SlotsGameHoverOverlay() {
  return (
    <div className="absolute inset-0 z-20 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
      <div className="w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center shadow-[0_0_20px_rgba(0,188,125,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
        <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
      </div>
    </div>
  );
}
