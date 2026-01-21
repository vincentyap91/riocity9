import React from "react";
import { Button } from "../ui/button";
import { Trophy, Calendar, Clock, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from '../../contexts/LanguageContext';

export function LiveSports() {
  const { t } = useLanguage();
  
  const matches = [
    {
      id: 1,
      league: "Premier League",
      homeTeam: "Chelsea",
      awayTeam: "Bournemouth",
      date: "31/12/25",
      time: "03:30",
      status: t("comingSoon"),
      homeColor: "bg-blue-700",
      awayColor: "bg-red-700",
      background:
        "https://images.unsplash.com/photo-1697562160779-fed83c21a2cd?w=800&q=80",
    },
    {
      id: 2,
      league: "Premier League",
      homeTeam: "Burnley",
      awayTeam: "Newcastle",
      date: "31/12/25",
      time: "03:30",
      status: t("comingSoon"),
      homeColor: "bg-emerald-800",
      awayColor: "bg-sky-600",
      background:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    },
    {
      id: 3,
      league: "Premier League",
      homeTeam: "Nottingham",
      awayTeam: "Everton",
      date: "31/12/25",
      time: "03:30",
      status: t("comingSoon"),
      homeColor: "bg-red-600",
      awayColor: "bg-blue-800",
      background:
        "https://images.unsplash.com/photo-1766756499755-0ae763777974?w=800&q=80",
    },
  ];
  return (
    <section className="w-full">
      <SectionHeader
        title={
          <span>
            {t("liveSports").split(" ").map((word, idx) => 
              idx === 0 ? word + " " : <span key={idx} className="text-[#ff6900]">{word}</span>
            )}
          </span>
        }
        icon={
            <div className="p-1.5 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <Trophy className="text-orange-500 w-5 h-5" />
            </div>
        }
        action={
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-[11px] uppercase font-bold text-[rgb(148,163,184)] hover:text-emerald-400 hover:bg-emerald-500/10 border border-[rgb(148,163,184,0.3)] rounded-full transition-all"
            >
              {t("viewAll")}
            </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="group relative flex flex-col rounded-xl overflow-hidden border border-white/5 bg-[#0f1923] shadow-lg hover:shadow-[0_0_20px_-10px_rgba(249,115,22,0.5)] transition-all duration-300"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={match.background}
                alt="stadium"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] via-[#0f1923]/80 to-[#0f1923]/40"></div>
            </div>

            {/* Content Content */}
            <div className="relative z-10 p-5 flex-1 flex flex-col">
              {/* Top Bar */}
              <div className="flex justify-between items-start text-xs font-medium text-slate-300 mb-6">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                  <Trophy className="w-3 h-3 text-orange-500" />
                  <span>RioCity9</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-white">
                    <Calendar className="w-3 h-3 text-orange-500/70" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{match.time} GMT+8</span>
                  </div>
                </div>
              </div>

              {/* Matchup Center */}
              <div className="flex items-center justify-between mt-2 mb-6">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2 md:gap-3 w-1/3">
                  <div
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full ${match.homeColor} flex items-center justify-center border-2 border-white/20 shadow-[0_0_15px_-5px_rgba(255,255,255,0.3)] ring-2 ring-transparent group-hover:ring-orange-500/30 transition-all`}
                  >
                    <span className="text-sm md:text-xl font-black text-white drop-shadow-md">
                      {match.homeTeam
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-center leading-tight tracking-wide truncate w-full">
                    {match.homeTeam}
                  </span>
                </div>

                {/* VS */}
                <div className="flex flex-col items-center justify-center w-1/3">
                  <span className="text-xl md:text-3xl font-black italic text-white/10 select-none group-hover:text-orange-500/20 transition-colors">
                    {t("vs")}
                  </span>
                  <Badge
                    variant="outline"
                    className="mt-1 md:mt-2 border-orange-500/50 text-orange-500 bg-orange-500/10 text-[8px] md:text-[10px] uppercase tracking-wider px-1.5 py-0 md:px-2"
                  >
                    {match.status}
                  </Badge>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2 md:gap-3 w-1/3">
                  <div
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full ${match.awayColor} flex items-center justify-center border-2 border-white/20 shadow-[0_0_15px_-5px_rgba(255,255,255,0.3)] ring-2 ring-transparent group-hover:ring-orange-500/30 transition-all`}
                  >
                    <span className="text-sm md:text-xl font-black text-white drop-shadow-md">
                      {match.awayTeam
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-center leading-tight tracking-wide truncate w-full">
                    {match.awayTeam}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10">
              <Button className="w-full rounded-none h-12 text-base font-bold uppercase tracking-wider bg-orange-600 hover:bg-orange-500 text-white shadow-inner transition-colors">
                {t("betNow")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
