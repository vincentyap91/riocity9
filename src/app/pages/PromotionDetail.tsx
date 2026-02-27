import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { useActivePromo } from "../contexts/ActivePromoContext";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { MOBILE } from "../config/themeTokens";
import { PROMOTIONS } from "../config/promotionsData";

export function PromotionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { activePromo, setActivePromo } = useActivePromo();
  const isThisPromoActive = id != null && activePromo?.id === id;

  const promo = useMemo(() => {
    return PROMOTIONS.find((item) => item.id === id) || PROMOTIONS.find((item) => item.id === "welcome-bonus");
  }, [id]);

  if (!promo) {
    return (
      <InnerPageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">{t("loading")}</div>
        </div>
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="relative min-h-screen text-white overflow-x-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(0,188,125,0.1)_0%,_rgba(0,188,125,0.05)_40%,_transparent_70%)] pointer-events-none" />

        <div className={`relative z-10 container mx-auto max-w-[900px] ${MOBILE.settingsPageContainer}`}>
          {/* Back Button - gap below for inner pages with back button */}
          <button
            onClick={() => navigate("/promotions")}
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00bc7d]/20 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">{t("backToPromotions")}</span>
          </button>

          {/* Hero Card - Banner image + title + CTA */}
          <div className="relative bg-[#0b1218] rounded-2xl overflow-hidden border border-white/5 shadow-xl mb-8">
            <div className="relative w-full aspect-[580/300] bg-white/5">
              <img
                src={promo.image}
                alt={promo.imageAlt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1218]/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="relative z-10 p-5 md:p-6 space-y-4 text-center md:text-left">
              {promo.subtitle && (
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  {promo.subtitle}
                </p>
              )}
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-white">
                {promo.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => {
                    if (isThisPromoActive) {
                      setActivePromo(null);
                    } else if (id && promo?.title) {
                      setActivePromo({
                        id,
                        name: promo.title,
                        promoRolloverCurrent: 58.8,
                        promoRolloverTarget: 60,
                        targetCurrent: 0.1,
                        targetTarget: 20,
                      });
                    }
                  }}
                  className={
                    isThisPromoActive
                      ? "h-11 px-8 rounded-xl border border-[#00bc7d]/30 text-[#00bc7d] hover:bg-[#00bc7d]/10 font-bold text-sm transition-all bg-transparent"
                      : "h-11 px-8 rounded-xl bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black text-sm transition-all border-none"
                  }
                >
                  {isThisPromoActive ? t("deactivatePromo") : (promo.actionText || "Claim")}
                </Button>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-8 max-w-[800px] mx-auto">
            {/* Description */}
            <div className="text-center md:text-left">
              <div className="text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                {promo.description}
              </div>
            </div>

            {/* Sections (Prize Overview, etc.) */}
            {promo.sections?.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2 text-white">
                  {section.icon && <section.icon className="w-5 h-5 text-emerald-500" />}
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d] mt-2 shrink-0" />
                      <span className="text-sm font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Terms & Conditions */}
            {promo.terms && promo.terms.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h2 className="text-base font-bold text-white">Terms & Conditions</h2>
                <ul className="space-y-2">
                  {promo.terms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d]/30 mt-1.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* More Important Stuff */}
            {promo.important && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-white">More Important Stuff</h2>
                <ul className="space-y-2">
                  {promo.important.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d]/30 mt-1.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom: Claim / Deactivate (same toggle as hero) */}
            <div className="pt-8">
              <Button
                onClick={() => {
                  if (isThisPromoActive) {
                    setActivePromo(null);
                  } else if (id && promo?.title) {
                    setActivePromo({
                      id,
                      name: promo.title,
                      promoRolloverCurrent: 58.8,
                      promoRolloverTarget: 60,
                      targetCurrent: 0.1,
                      targetTarget: 20,
                    });
                  }
                }}
                className={
                  isThisPromoActive
                    ? "w-full h-11 rounded-xl border border-[#00bc7d]/30 text-[#00bc7d] hover:bg-[#00bc7d]/10 font-bold text-sm transition-all bg-transparent"
                    : "w-full h-11 rounded-xl bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 hover:brightness-110 text-black font-black text-sm transition-all border-none"
                }
              >
                {isThisPromoActive ? t("deactivatePromo") : (promo.actionText || "Claim")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}
