import React from 'react';
import {
  User,
  History,
  Users,
  Globe,
  Lock,
  ChevronRight,
  Copy,
  CreditCard,
  ArrowRightLeft,
  LogOut,
} from 'lucide-react';
// Using proper import for bronze badge image
import imgBronzeBadge from '@/assets/711e7c00068ea0ecd513e2e0c1cc723c6de60e76.png';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { MOBILE } from "../config/themeTokens";
import { UsersThree } from '../components/icons/UsersThree';

export function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    { icon: User, labelKey: 'myProfile', path: '/profile' },
    { icon: CreditCard, labelKey: 'deposit', path: '/deposit' },
    { icon: ArrowRightLeft, labelKey: 'withdrawal', path: '/withdraw' },
    { icon: History, labelKey: 'historyRecord', path: '/history' },
    { icon: Users, labelKey: 'referral', path: '/referral' },
    { icon: UsersThree, labelKey: 'downlines', path: '/downlines' },
    { icon: Globe, labelKey: 'changeLanguage', path: '/language' },
    { icon: Lock, labelKey: 'changePassword', path: '/security' },
  ];

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className={`container mx-auto max-w-[640px] ${MOBILE.settingsPageContainer}`}>

        {/* User Profile Header Card - Mobile Version (Follows Screenshot) */}
        <div className={`md:hidden bg-gradient-to-b from-[#1a2230] to-[#131b29] rounded-2xl ${MOBILE.cardPadding} ${MOBILE.sectionMb} shadow-xl border border-white/5 relative overflow-hidden`}>
          <div className="flex flex-row gap-5 items-center">
            {/* Left side: Avatar/Badge */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] p-1 shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)] bg-black/40 relative z-10 flex items-center justify-center">
                <img
                  src={imgBronzeBadge}
                  alt="Bronze Badge"
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>

            {/* Right side: Info */}
            <div className="flex-1 flex flex-col pt-1">
              <h2 className={`${MOBILE.title} text-white leading-none ${MOBILE.sectionMb}`}>{user?.displayName || user?.email?.split('@')[0] || 'testvin'}</h2>
              {/* ID Pill */}
              <div className={`flex items-center ${MOBILE.gapSm} bg-[#0f151f] px-4 py-2 rounded-full border border-white/10 self-start`}>
                <span className={`${MOBILE.caption} font-mono tracking-wide leading-none`}>880123456789</span>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText('880123456789');
                    } catch (e) {
                      console.error('copy failed', e);
                    }
                  }}
                  className="text-[#4A5565] hover:text-white transition-colors active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Status Row */}
          <div className="mt-3 flex items-center justify-between leading-none">
            <span className="text-sm font-bold text-[#f28b0c]">{t("bronze")}</span>
            <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
              {t("depositToBecome")} <span className="text-[#efbb4b] font-black">3,682</span> {t("toBecome")} <span className="text-white font-black">{t("silver")}!</span>
            </div>
          </div>

          {/* Progress Bar (at the bottom of the card) */}
          <div className="mt-2 h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <div className="h-full w-[8%] bg-[#00bc7d] rounded-full shadow-[0_0_10px_rgba(0,188,125,0.55)]"></div>
          </div>
        </div>

        {/* User Profile Header Card - Desktop Version */}
        <div className={`hidden md:block bg-gradient-to-b from-[#1a2230] to-[#131b29] rounded-2xl ${MOBILE.cardPadding} ${MOBILE.sectionMb} shadow-xl border border-white/5 relative overflow-hidden`}>
          <div className={`flex flex-col sm:flex-row ${MOBILE.gap} items-start`}>
            {/* Avatar Section */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] p-1 shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)] bg-black/40 relative z-10">
                <img
                  src={imgBronzeBadge}
                  alt="Bronze Badge"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 flex flex-col justify-center space-y-3 w-full">
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-x-4 gap-y-1">
                <h2 className="text-2xl font-black text-white tracking-wide">{user?.displayName || user?.email?.split('@')[0] || 'Guest'}</h2>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full border border-white/5">
                  <span className="text-xs text-gray-400 font-mono tracking-wide">880123456789</span>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* VIP Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-[#CD7F32]">{t("bronze")}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    {t("depositToBecome")} <span className="text-[#FFD700] font-bold">3,682</span> {t("toBecome")} <span className="text-gray-300 font-bold">{t("silver")}!</span>
                  </span>
                </div>
                {/* Custom Progress Bar */}
                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full w-[8%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-[#1a2230] border border-white/5 rounded-2xl p-4 lg:p-6 mb-4 flex items-center justify-between gap-4 shadow-lg h-full lg:h-[110px]">
          <div className="flex flex-col justify-center h-full">
            <div className="text-sm font-bold text-emerald-400 mb-1 uppercase tracking-wider">{t("totalBalance")}</div>
            <div className="flex items-start text-white">
              <span className="text-xl lg:text-2xl font-black mr-1">$</span>
              <span className="text-xl lg:text-2xl font-black tracking-tight">980.69</span>
            </div>
          </div>
          <Button
            onClick={() => navigate('/deposit')}
            className="bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] text-black font-black text-base rounded-lg px-8 h-12 shadow-[0_2px_10px_rgba(16,185,129,0.3)] transition-all border-none"
          >
            {t("deposit")}
          </Button>
        </div>

        {/* Menu List */}
        <div className="bg-[#1a2230] rounded-2xl overflow-hidden shadow-lg border border-white/5">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group w-full text-left"
                onClick={() => {
                  if (item.path === '/language') {
                    window.dispatchEvent(new CustomEvent('openLanguageModal'));
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center text-[#99A1AF] group-hover:text-[#00bc7d] group-hover:bg-[#00bc7d]/10 transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white group-hover:text-white transition-colors text-sm lg:text-base">{t(item.labelKey as any)}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#4A5565] group-hover:text-emerald-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="gap-2 border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white w-48 h-12 rounded-xl font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            {t("logout")}
          </Button>
        </div>

      </div>
    </InnerPageLayout>
  );
}
