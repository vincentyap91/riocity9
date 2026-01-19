import React from 'react';
import { Copy, Share2, Users, Info } from 'lucide-react';
import { Button } from "../ui/button";
import imgBanner from "@/assets/9cc12ccab5ff73c2e07714865ae6549ed3409f4c.png";

export function ReferralBanner() {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden h-[450px] md:h-[400px] lg:h-[450px] shadow-2xl group bg-[#1c3f37]">
            {/* Background Image - Commented out to fix module load error */}
            <img 
                src={imgBanner} 
                alt="Referral Banner" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay Gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:via-transparent"></div>

            {/* Content Container */}
            <div className="relative h-full container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 flex items-center">
                
                {/* Form Card */}
                <div className="w-full max-w-md bg-[#02040a]/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl ml-0 md:ml-8 lg:ml-16">
                    
                    {/* Referral Code Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-yellow-400 tracking-wider">MY REFERRAL CODE</label>
                        <div className="flex items-center justify-between bg-[#134438]/50 border border-emerald-500/30 rounded-xl p-3 md:p-4 group/input hover:border-emerald-500/60 transition-colors">
                            <span className="text-white font-mono font-bold tracking-wide">HABBAJNBJ</span>
                            <button className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors text-yellow-400">
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Referral Link Section */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-yellow-400 tracking-wider">MY REFERRAL LINK</label>
                        <div className="flex items-center justify-between bg-[#134438]/50 border border-emerald-500/30 rounded-xl p-3 md:p-4 group/input hover:border-emerald-500/60 transition-colors">
                            <div className="flex flex-col truncate pr-4">
                                <span className="text-white text-xs truncate">https://abc.com/asnbskhkjss...</span>
                                <span className="text-white text-xs font-mono">code=HABBAJNBJ</span>
                            </div>
                            <button className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors text-yellow-400 shrink-0">
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]">
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]">
                            <Users className="w-4 h-4 mr-2" /> Downline
                        </Button>
                    </div>

                    {/* Action Button Row 2 */}
                    <Button className="w-full bg-[#e6c252] hover:bg-[#ffd65c] text-[#3c1100] font-bold h-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(230,194,82,0.4)]">
                        <Info className="w-4 h-4 mr-2" /> More Info
                    </Button>

                </div>

            </div>
        </div>
    );
}
