import React from 'react';
import { Home, Search, Wallet, Gift, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import svgPaths from "@/imports/svg-fhcj8q950g";

// --- After Login Component (Existing) ---
function MobileBottomNavAfterLogin({ onMenuClick, onSearchClick }: { onMenuClick?: () => void, onSearchClick?: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f19]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">

        <NavButton icon={Menu} label={t("menu")} onClick={onMenuClick} />
        <NavButton icon={Search} label={t("search")} onClick={onSearchClick} />

        {/* Center CTA - Wallet/Deposit */}
        <div className="relative -top-5">
          <Link to="/deposit" className="w-14 h-14 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 hover:shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center justify-center shadow-[0_2px_10px_rgba(16,185,129,0.3)] border-4 border-[#0a0f19] transition-all">
            <Wallet className="w-6 h-6 text-black fill-black/20" />
          </Link>
        </div>

        <NavButton icon={Gift} label={t("promo")} to="/promotions" />
        <NavButton icon={User} label={t("profile")} to="/profile" />

      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick, to }: any) {
  if (to) {
    return (
      <Link to={to} className={`flex flex-col items-center justify-center gap-1 w-14 h-full ${active ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
        <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
        <span className="text-[10px] font-medium">{label}</span>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 w-14 h-full ${active ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
      <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}

// --- Before Login Component ---

function IconMenu() {
  return (
    <div className="relative shrink-0 size-[19.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9901 19.9901">
        <g>
          <path d="M3.33169 9.99507H16.6584" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d="M3.33169 4.99753H16.6584" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d="M3.33169 14.9926H16.6584" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
        </g>
      </svg>
    </div>
  );
}

function IconSearch() {
  return (
    <div className="relative shrink-0 size-[19.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9901 19.9901">
        <g>
          <path d={svgPaths.p129a4600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d={svgPaths.p148c08e0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
        </g>
      </svg>
    </div>
  );
}

function IconReferral() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p25397b80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pc9c280} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function IconPromo() {
  return (
    <div className="relative shrink-0 size-[19.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9901 19.9901">
        <g>
          <path d={svgPaths.p1debfc80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d="M9.99507 6.66338V17.4914" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d={svgPaths.pc798800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d={svgPaths.p8fe0900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
        </g>
      </svg>
    </div>
  );
}

function IconProfile() {
  return (
    <div className="relative shrink-0 size-[19.99px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9901 19.9901">
        <g>
          <path d={svgPaths.p5f99600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
          <path d={svgPaths.p1bbc5e80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66584" />
        </g>
      </svg>
    </div>
  );
}

function NavButtonBefore({ icon: Icon, label, onClick, to }: { icon: any, label: string, onClick?: () => void, to?: string }) {
  const content = (
    <>
      <div className="text-white">
        <Icon />
      </div>
      <div className="h-[15.005px] relative shrink-0 w-auto mt-[4px]">
        <p className="font-['Arial',sans-serif] leading-[15px] not-italic text-[10px] text-center text-white">
          {label}
        </p>
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="flex flex-col items-center justify-center w-full h-full pb-[0.017px]">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full pb-[0.017px]">
      {content}
    </button>
  );
}

function MobileBottomNavBeforeLogin({ onMenuClick, onSearchClick }: { onMenuClick?: () => void, onSearchClick?: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f19]/95 backdrop-blur-xl border-t border-[rgba(255,255,255,0.1)] pb-safe h-[64px]">
      <div className="flex flex-row items-center size-full">
        <div className="flex items-center justify-between px-[21px] w-full h-full">
          <NavButtonBefore icon={IconMenu} label={t("menu")} onClick={onMenuClick} />
          <NavButtonBefore icon={IconSearch} label={t("search")} to="/login" />
          <NavButtonBefore icon={IconReferral} label={t("referral")} to="/referral" />
          <NavButtonBefore icon={IconPromo} label={t("promo")} to="/promotions" />
          <NavButtonBefore icon={IconProfile} label={t("profile")} to="/login" />
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

export function MobileBottomNav({ onMenuClick, onSearchClick, isLoggedIn = false }: { onMenuClick?: () => void, onSearchClick?: () => void, isLoggedIn?: boolean }) {
  if (isLoggedIn) {
    return <MobileBottomNavAfterLogin onMenuClick={onMenuClick} onSearchClick={onSearchClick} />;
  }
  return <MobileBottomNavBeforeLogin onMenuClick={onMenuClick} onSearchClick={onSearchClick} />;
}
