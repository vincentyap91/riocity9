import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Gift, Ticket, Box, Home, Flame, Gamepad2, Dices,
    Fish, ArrowLeftRight, Club, Plane, Megaphone, Users,
    HandCoins, Crown, MessageCircle, Facebook, Send, Phone,
    Sparkles, ChevronUp, History
} from 'lucide-react';
import { FootballIcon } from '../icons/FootballIcon';
import { LuckyWheelIcon } from '../icons/LuckyWheelIcon';
import { useAuth } from '../../contexts/AuthContext';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";

// --- Configuration ---
const rewardItems = [
    { labelKey: "spinWheelBonus", icon: LuckyWheelIcon, path: "/bonus?tab=wheel", color: "text-yellow-400" },
    { labelKey: "voucherScratchBonus", icon: Ticket, path: "/bonus?tab=scratch", color: "text-pink-400" },
    { labelKey: "prizeBoxBonus", icon: Box, path: "/bonus?tab=prize", color: "text-orange-400" },
];

const menuItems = [
    { labelKey: "home", icon: Home, path: "/" },
    { labelKey: "hotGames", icon: Flame, path: "/hot" },
    { labelKey: "allGames", icon: Gamepad2, path: "/all" },
    { labelKey: "sports", icon: FootballIcon, path: "/sports" },
    { labelKey: "liveCasino", icon: Dices, path: "/live-casino" },
    { labelKey: "slots", icon: Gamepad2, path: "/slots" },
    { labelKey: "fishHunt", icon: Fish, path: "/fishing" },
    { labelKey: "lottery", icon: Ticket, path: "/lottery" },
    { labelKey: "exchange", icon: ArrowLeftRight, path: "/exchange" },
    { labelKey: "poker", icon: Club, path: "/poker" },
    { labelKey: "recentGames", icon: History, path: "/recent-games" },
    { labelKey: "crash", icon: Plane, path: "/crash" },
    { labelKey: "promotions", icon: Megaphone, path: "/promotions" },
    { labelKey: "referral", icon: Users, path: "/referral" },
    { labelKey: "rebate", icon: HandCoins, path: "/rebate" },
    { labelKey: "vipClub", icon: Crown, path: "/membership" },
];

interface SidebarMenuProps {
    onItemClick?: () => void;
}

export function SidebarMenu({ onItemClick }: SidebarMenuProps) {
    const location = useLocation();
    const { t } = useLanguage();
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="flex flex-col h-full bg-[#02040a] text-white overflow-y-auto custom-scrollbar">

            {/* Reward Centre Accordion - 完美还原截图卡片样式 */}
            <div className="px-4 pt-4 pb-4">
                <Accordion type="single" collapsible defaultValue="rewards" className="w-full">
                    <AccordionItem value="rewards" className="border-none bg-[#0a0802] rounded-2xl overflow-hidden border border-[#4d3d0a]/30 shadow-2xl">
                        <AccordionTrigger className="px-4 py-4 hover:no-underline bg-[#2a2105] border-none [&>svg]:hidden group">
                            <div className="flex items-center gap-3 text-left w-full">
                                <div className="w-10 h-10 rounded-xl bg-[#fab005]/10 flex items-center justify-center shrink-0 border border-[#fab005]/20 shadow-inner">
                                    <Sparkles className="w-5 h-5 text-[#fab005] fill-[#fab005]/20" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className="font-bold text-white text-[16px] leading-tight">{t("rewardCentre")}</span>
                                    <span className="text-xs text-[#fab005] font-medium mt-0.5">{t("activeBonuses")}</span>
                                </div>
                                <ChevronUp className="w-4 h-4 text-white/80 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <div className="flex flex-col py-2">
                                {rewardItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        to={item.path}
                                        onClick={onItemClick}
                                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="w-5 flex justify-center">
                                            <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                                        </div>
                                        <span className="font-medium text-[14px] text-white/90 group-hover:text-white">{t(item.labelKey as any)}</span>
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Main Menu List */}
            <div className="flex-1 px-4 flex flex-col gap-1 pb-4">
                {menuItems.map((item, idx) => {
                    // Simple active check
                    const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');

                    return (
                        <Link
                            key={idx}
                            to={item.path}
                            onClick={onItemClick}
                            className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group overflow-hidden ${isActive
                                ? 'bg-[#0f1115] text-[#00ff88]'
                                : 'text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-[#00ff88]' : 'text-white'} transition-colors`} />
                            <span className={`font-bold text-[15px] tracking-wide ${isActive ? 'text-[#00ff88]' : 'text-white'}`}>{t(item.labelKey as any)}</span>

                            {/* 右侧激活指示条 */}
                            {isActive && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-[#00ff88] rounded-l-full shadow-[0_0_8px_rgba(0,255,136,0.6)]"></div>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="p-3 mt-auto space-y-3">

                {/* Live Chat Card - click opens live chat popup and closes sidebar */}
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('openLiveChat'));
                        onItemClick?.();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            window.dispatchEvent(new CustomEvent('openLiveChat'));
                            onItemClick?.();
                        }
                    }}
                    className="bg-[#131b29] border border-white/10 rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:border-[#00ff88]/50 transition-all shadow-lg hover:shadow-[#00ff88]/10"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00ff88] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(0,255,136,0.5)] group-hover:scale-105 transition-transform">
                            <MessageCircle className="w-5 h-5 text-[#131b29] fill-[#131b29]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-[#00ff88] text-base tracking-tight uppercase italic">{t("liveChat")}</span>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{t("liveChatTagline")}</span>
                        </div>
                    </div>
                    <div className="bg-[#fa5252] text-white text-[10px] font-black px-1.5 py-0.5 min-w-[22px] h-5 flex items-center justify-center rounded-lg shadow-lg border border-white/10 animate-pulse">
                        11
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-3 py-1.5">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-900/20">
                        <Facebook className="w-5 h-5 text-white fill-current" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#2AABEE] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-sky-900/20">
                        <Send className="w-4 h-4 text-white fill-current" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-green-900/20">
                        <Phone className="w-4 h-4 text-white fill-current" />
                    </a>
                </div>

                {/* Login / Sign Up when logged out; Log Out when logged in */}
                {isAuthenticated ? (
                    <Button
                        onClick={() => {
                            logout();
                            onItemClick?.();
                        }}
                        className="w-full h-11 bg-gradient-to-r from-[#00ff88] to-[#00cc76] hover:from-[#05ffa1] hover:to-[#00dd82] text-black font-black text-base rounded-xl shadow-[0_8px_25px_-5px_rgba(0,255,136,0.4)] hover:shadow-[0_12px_30px_-5px_rgba(0,255,136,0.6)] tracking-tighter uppercase italic transition-all border-none"
                    >
                        {t("logout")}
                    </Button>
                ) : (
                    <Button
                        asChild
                        className="w-full h-11 bg-gradient-to-r from-[#00ff88] to-[#00cc76] hover:from-[#05ffa1] hover:to-[#00dd82] text-black font-black text-base rounded-xl shadow-[0_8px_25px_-5px_rgba(0,255,136,0.4)] hover:shadow-[0_12px_30px_-5px_rgba(0,255,136,0.6)] tracking-tighter uppercase italic transition-all border-none"
                        onClick={onItemClick}
                    >
                        <Link to="/login">{t("loginSignUp")}</Link>
                    </Button>
                )}
            </div>

        </div>
    );
}
