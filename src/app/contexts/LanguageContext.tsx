import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Globe } from "lucide-react";
import en from "../i18n/en";
import zhCN from "../i18n/zh-cn";
import zhHK from "../i18n/zh-hk";
import km from "../i18n/km";
import bn from "../i18n/bn";
import tp from "../i18n/tp";
import th from "../i18n/th";
import tokPisinFlag from "@/assets/download.png";

export type LanguageOption = {
  id: string;
  label: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
};

type Dictionary = typeof en;
export type TranslationKey = keyof Dictionary;

const languages: LanguageOption[] = [
  { id: "en", label: "English", icon: ({ className }) => <img src="https://flagcdn.com/w80/gb.png" className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="EN" />, code: "EN" },
  { id: "zh-cn", label: "简体中文", icon: ({ className }) => <img src="https://pksoftcdn.azureedge.net/media/flag-china-202512190744512558.svg" className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="CN" />, code: "CN" },
  { id: "km", label: "Khmer", icon: ({ className }) => <img src="https://flagcdn.com/w80/kh.png" className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="KH" />, code: "KH" },
  { id: "bn", label: "Bangladesh", icon: ({ className }) => <img src="https://pksoftcdn.azureedge.net/media/flag-bangladesh-202410031642427807.svg" className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="BD" />, code: "BD" },
  { id: "zh-hk", label: "繁体中文", icon: ({ className }) => <img src="https://flagcdn.com/w80/hk.png" className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="HK" />, code: "HK" },
  { id: "tp", label: "Tok Pisin", icon: ({ className }) => <img src={tokPisinFlag} className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="TP" />, code: "TP" },
  { id: "th", label: "Thai", icon: ({ className }) => <img src="https://flagcdn.com/w80/th.png" className={`w-full h-full object-cover object-center ${className ?? ""}`} alt="TH" />, code: "TH" },
];

type LanguageContextValue = {
  languages: LanguageOption[];
  currentLang: LanguageOption;
  setCurrentLang: (lang: LanguageOption) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "riocity9_lang";
const dictionaries: Record<string, Dictionary> = {
  en,
  "zh-cn": zhCN,
  "zh-hk": zhHK,
  km,
  bn,
  tp,
  th,
};

export function LanguageProvider({ children }: React.PropsWithChildren<{}>) {
  const [currentLang, setCurrentLang] = useState<LanguageOption>(() => {
    if (typeof window === "undefined") return languages[0];
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return languages.find((lang) => lang.id === stored) ?? languages[0];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang.id);
  }, [currentLang]);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[currentLang.id] ?? en;
    return {
      languages,
      currentLang,
      setCurrentLang,
      t: (key) => dict[key] ?? en[key] ?? key,
    };
  }, [currentLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
