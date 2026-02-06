import React from 'react';
import { createPortal } from 'react-dom';
import { X, RefreshCcw, Lock } from 'lucide-react';
import { PRIMARY_CTA_CLASS } from '../../config/themeTokens';

interface GameModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    bannerImage: string;
}

export function GameModal({ isOpen, onClose, title, bannerImage }: GameModalProps) {
    if (!isOpen) return null;

    if (typeof document === 'undefined') return null;

    return createPortal((
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-[580px] bg-[#0f1923] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Styled like your site headers */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-b from-white/5 to-transparent">
                    <h2 className="text-[#39ff88] text-xl md:text-2xl font-black italic uppercase tracking-tighter">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all group"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Content Section */}
                <div className="px-6 md:px-8 pb-8 space-y-6">
                    {/* Banner with Premium Border */}
                    <div className="relative w-full aspect-[2.4/1] rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                        <img
                            src={bannerImage}
                            alt={title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Wallet & Rebate Stats */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {/* Wallet Box */}
                        <div className="bg-[#1a2230] rounded-2xl p-4 md:p-5 flex flex-col gap-1 border border-white/5 hover:border-emerald-500/20 transition-all shadow-inner group/box">
                            <div className="flex items-center justify-between opacity-80">
                                <span className="text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-widest">Balance</span>
                                <button className="text-gray-400 group-hover/box:text-[#39ff88] transition-colors hover:rotate-180 duration-500">
                                    <RefreshCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-white text-xl md:text-2xl font-black tracking-tight">0.00</span>
                                <span className="text-gray-400 text-[10px] font-bold">MYR</span>
                            </div>
                        </div>

                        {/* Rebate Box */}
                        <div className="bg-[#1a2230] rounded-2xl p-4 md:p-5 flex flex-col gap-1 border border-white/5 shadow-inner">
                            <div className="flex items-center justify-between opacity-80">
                                <span className="text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-widest">Rebate</span>
                                <Lock className="w-3.5 h-3.5 text-gray-500" />
                            </div>
                            <span className="text-white text-xl md:text-2xl font-black tracking-tight">0.00%</span>
                        </div>
                    </div>

                    {/* Action Button - Using System Primary CTA */}
                    <div className="pt-2">
                        <button className={`${PRIMARY_CTA_CLASS} w-full py-4 md:py-5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all active:scale-[0.98] active:translate-y-0 text-lg md:text-xl tracking-widest uppercase italic`}>
                            Start Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ), document.body);
}
