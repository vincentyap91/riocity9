import React, { useState } from 'react';
import { Share2, Info, Copy, Check } from 'lucide-react';
import { Button } from "../ui/button";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { UsersThree } from '../icons/UsersThree';
// Assets - using proper imports for local assets
import imgReferralBanner from '@/assets/9cc12ccab5ff73c2e07714865ae6549ed3409f4c.png';
import imgMobileReferral from '@/assets/mobile-referral.png';

export function ReferralBanner() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [referralLink] = useState('https://abc.com/asnbekhkjss/hamaxph?code=HABBAJNBJ');
    const [copiedLink, setCopiedLink] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert(t("copyFailedManual"));
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: t("shareReferralTitle"),
                    text: t("shareReferralText"),
                    url: referralLink,
                });
            } else {
                await handleCopyLink();
                alert(t("referralLinkCopiedShare"));
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    };

    return (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* Mobile/Tablet View - Follow HTML Structure */}
            <div className="lg:hidden flex flex-col rounded-2xl overflow-hidden bg-[#0d2818]">
                {/* Background Image */}
                <div className="relative w-full">
                    <img
                        src={imgMobileReferral}
                        alt="referral"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Referral Link Section - Mobile View */}
                <div className="bg-[#0f1923] backdrop-blur-md border border-emerald-500/20 px-4 py-4">
                    <div className="space-y-4">
                        {/* My Referral Link */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#FFD700] tracking-wider">{t("myReferralLink")}</label>
                            <div className="flex items-center justify-between bg-[#134438]/50 border border-emerald-500/30 rounded-xl p-3 group/input hover:border-emerald-500/60 transition-colors">
                                <span className="text-white text-xs font-mono truncate pr-4">{referralLink}</span>
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 hover:bg-[#00bc7d]/20 rounded-lg transition-colors text-[#FFD700] shrink-0 active:scale-95"
                                    title={t("copyReferralLink")}
                                >
                                    {copiedLink ? (
                                        <Check className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Button Group */}
                        <div className="space-y-3">
                            {/* Top Row Buttons - Share and Downlines */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    onClick={handleShare}
                                    className="bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black h-12 rounded-xl text-sm shadow-[0_2px_10px_rgba(16,185,129,0.3)] transition-all cursor-pointer border-none"
                                >
                                    <Share2 className="w-4 h-4 mr-2" /> {t("share")}
                                </Button>
                                <Button
                                    onClick={() => navigate('/downlines')}
                                    className="bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black h-12 rounded-xl text-sm shadow-[0_2px_10px_rgba(16,185,129,0.3)] transition-all cursor-pointer border-none"
                                >
                                    <UsersThree className="w-4 h-4 mr-2" /> {t("downlines")}
                                </Button>
                            </div>
                            {/* Bottom Button - More Info (full width) – gradient yellow, match Share/Downlines layout */}
                            <Button
                                onClick={() => navigate('/referral')}
                                className="w-full h-12 rounded-xl text-sm font-black text-black border-none transition-all cursor-pointer bg-gradient-to-b from-yellow-400 via-amber-400 to-amber-500 hover:brightness-110 shadow-[0_2px_10px_rgba(245,158,11,0.3)]"
                            >
                                <Info className="w-4 h-4 mr-2" /> {t("moreInfo")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop View - Keep Original Design */}
            <div className="hidden lg:block relative w-full rounded-2xl overflow-hidden h-[400px] lg:h-[450px] shadow-2xl group bg-[#1c3f37]">
                <img
                    src={imgReferralBanner}
                    alt="Referral Banner"
                    className="absolute inset-0 w-full h-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                <div className="relative h-full container mx-auto max-w-[1200px] 2xl:max-w-[1480px] px-4 flex items-center">
                    <div className="w-full max-w-md bg-[#02040a]/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl ml-0 md:ml-8 lg:ml-16">
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl md:text-2xl font-black text-[#FFD700]">{t("referralHubTitle")}</h2>
                            <p className="font-bold text-white text-sm md:text-base">{t("referralHubSubtitle")}</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[#FFD700] tracking-wider">{t("myReferralLink")}</label>
                            <div className="flex items-center justify-between bg-[#134438]/50 border border-emerald-500/30 rounded-xl p-3 md:p-4 group/input hover:border-emerald-500/60 transition-colors">
                                <span className="text-white text-xs md:text-sm font-mono truncate pr-4">{referralLink}</span>
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 hover:bg-[#00bc7d]/20 rounded-lg transition-colors text-[#FFD700] shrink-0 active:scale-95"
                                    title={t("copyReferralLink")}
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
                            <Button
                                onClick={handleShare}
                                className="bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black h-12 rounded-xl text-base shadow-[0_2px_10px_rgba(16,185,129,0.3)] border-none"
                            >
                                <Share2 className="w-4 h-4 mr-2" /> {t("share")}
                            </Button>
                            <Button
                                onClick={() => navigate('/downlines')}
                                className="bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black h-12 rounded-xl text-base shadow-[0_2px_10px_rgba(16,185,129,0.3)] border-none"
                            >
                                <UsersThree className="w-4 h-4 mr-2" /> {t("downlines")}
                            </Button>
                        </div>
                        <Button
                            onClick={() => navigate('/referral')}
                            className="w-full h-12 rounded-xl text-base font-black text-black border-none transition-all cursor-pointer bg-gradient-to-b from-yellow-400 via-amber-400 to-amber-500 hover:brightness-110 shadow-[0_2px_10px_rgba(245,158,11,0.3)]"
                        >
                            <Info className="w-4 h-4 mr-2" /> {t("moreInfo")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
