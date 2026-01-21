import React, { useState } from 'react';
import { Share2, Users, Info, Copy, Check } from 'lucide-react';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export function ReferralBanner() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [referralCode] = useState('HABBAJNBJ');
    const [referralLink] = useState('https://abc.com/asnbskhkjss?code=HABBAJNBJ');
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(referralCode);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('复制失败，请手动复制');
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('复制失败，请手动复制');
        }
    };

    return (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* Mobile View - Follow HTML Structure */}
            <div className="md:hidden flex flex-col rounded-2xl overflow-hidden bg-[#0d2818]">
                {/* Background Image */}
                <div className="relative w-full">
                    <img 
                        src="/src/assets/mobile-referral.png" 
                        alt="referral" 
                        className="w-full h-auto object-cover"
                    />
                </div>
                
                {/* Button Group - Below the image (matching screenshot) */}
                <div className="bg-[#0f1923] backdrop-blur-md border border-emerald-500/20 px-4 py-4">
                    <div className="space-y-3">
                        {/* Top Row Buttons - Share and Downlines */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button 
                                onClick={() => navigate('/referral')}
                                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-sm shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                            >
                                <Share2 className="w-4 h-4 mr-2" /> {t("share")}
                            </Button>
                            <Button 
                                onClick={() => navigate('/referral')}
                                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-sm shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                            >
                                <Users className="w-4 h-4 mr-2" /> {t("downlines")}
                            </Button>
                        </div>
                        {/* Bottom Button - More Info (full width) */}
                        <Button 
                            onClick={() => navigate('/referral')}
                            className="w-full bg-[#e6c252] hover:bg-[#ffd65c] text-[#3c1100] font-bold h-12 rounded-xl text-sm shadow-[0_0_15px_-3px_rgba(230,194,82,0.4)] transition-all cursor-pointer"
                        >
                            <Info className="w-4 h-4 mr-2" /> {t("moreInfo")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop View - Keep Original Design */}
            <div className="hidden md:block relative w-full rounded-2xl overflow-hidden h-[400px] lg:h-[450px] shadow-2xl group bg-[#1c3f37]">
                <img 
                    src="/src/assets/9cc12ccab5ff73c2e07714865ae6549ed3409f4c.png" 
                    alt="Referral Banner" 
                    className="absolute inset-0 w-full h-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                <div className="relative h-full container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 flex items-center">
                    <div className="w-full max-w-md bg-[#02040a]/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl ml-0 md:ml-8 lg:ml-16">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-yellow-400 tracking-wider">{t("myReferralCode")}</label>
                            <div className="flex items-center justify-between bg-[#134438]/50 border border-emerald-500/30 rounded-xl p-3 md:p-4 group/input hover:border-emerald-500/60 transition-colors">
                                <span className="text-white font-mono font-bold tracking-wide uppercase">{referralCode}</span>
                                <button 
                                    onClick={handleCopyCode}
                                    className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors text-yellow-400 active:scale-95"
                                    title="Copy referral code"
                                >
                                    {copiedCode ? (
                                        <Check className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-yellow-400 tracking-wider">{t("myReferralLink")}</label>
                            <div className="flex items-center justify-between bg-[#134438]/50 border border-emerald-500/30 rounded-xl p-3 md:p-4 group/input hover:border-emerald-500/60 transition-colors">
                                <div className="flex flex-col truncate pr-4">
                                    <span className="text-white text-xs truncate">https://abc.com/asnbskhkjss...</span>
                                    <span className="text-white text-xs font-mono">code={referralCode}</span>
                                </div>
                                <button 
                                    onClick={handleCopyLink}
                                    className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors text-yellow-400 shrink-0 active:scale-95"
                                    title="Copy referral link"
                                >
                                    {copiedLink ? (
                                        <Check className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]">
                                <Share2 className="w-4 h-4 mr-2" /> {t("share")}
                            </Button>
                            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]">
                                <Users className="w-4 h-4 mr-2" /> {t("downline")}
                            </Button>
                        </div>
                        <Button className="w-full bg-[#e6c252] hover:bg-[#ffd65c] text-[#3c1100] font-bold h-12 rounded-xl text-base shadow-[0_0_15px_-3px_rgba(230,194,82,0.4)]">
                            <Info className="w-4 h-4 mr-2" /> {t("moreInfo")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
