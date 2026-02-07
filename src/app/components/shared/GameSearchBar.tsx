import React from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

type SearchAccent = "emerald" | "pink" | "blue" | "orange" | "purple" | "cyan" | "amber";

interface GameSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  accent?: SearchAccent;
  className?: string;
}

const ACCENT_STYLES: Record<SearchAccent, { focusBorder: string; iconBg: string; iconColor: string }> = {
  emerald: {
    focusBorder: "focus:border-[#00bc7d]/50",
    iconBg: "bg-emerald-600/20",
    iconColor: "text-emerald-400",
  },
  pink: {
    focusBorder: "focus:border-pink-500/50",
    iconBg: "bg-pink-600/20",
    iconColor: "text-pink-400",
  },
  blue: {
    focusBorder: "focus:border-blue-500/50",
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-400",
  },
  orange: {
    focusBorder: "focus:border-orange-500/50",
    iconBg: "bg-orange-600/20",
    iconColor: "text-orange-400",
  },
  purple: {
    focusBorder: "focus:border-purple-500/50",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-400",
  },
  cyan: {
    focusBorder: "focus:border-cyan-500/50",
    iconBg: "bg-cyan-600/20",
    iconColor: "text-cyan-400",
  },
  amber: {
    focusBorder: "focus:border-amber-500/50",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
};

export function GameSearchBar({
  value,
  onChange,
  placeholder,
  maxLength = 50,
  accent = "emerald",
  className = "",
}: GameSearchBarProps) {
  const { t } = useLanguage();
  const accentStyles = ACCENT_STYLES[accent];

  return (
    <div className={`w-full max-w-5xl ${className}`.trim()}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(event) => {
            onChange(event.target.value.slice(0, maxLength));
          }}
          maxLength={maxLength}
          className={`w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 ${accentStyles.focusBorder} rounded-full pl-6 pr-14 text-white placeholder:text-gray-500 transition-all outline-none`}
          placeholder={placeholder ?? t("searchPlaceholder")}
        />
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${accentStyles.iconBg} ${accentStyles.iconColor}`}>
          <Search className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
