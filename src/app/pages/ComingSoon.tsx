import React from "react";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { PRIMARY_CTA_CLASS } from "../config/themeTokens";

export function ComingSoon({
  title,
  description = "Something great is on the way.\nThis feature is being carefully crafted and will launch soon.",
  backTo = "/",
  backLabel = "Back",
}: {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
}) {
  return (
    <InnerPageLayout className="overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-[1024px]">
        {/* Header with back button - gap below for inner pages */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to={backTo}
            className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-white hover:bg-[#00bc7d]/20 hover:border-[#00bc7d]/50 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-white font-bold text-base">{backLabel}</span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#1a2230] p-8 md:p-14 shadow-xl">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#00bc7d]/10 blur-3xl" />
          <div className="relative mx-auto max-w-xl text-center space-y-5">
            <div className="mx-auto h-12 w-12 rounded-full border border-[#00bc7d]/25 bg-[#00bc7d]/10 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-[#00bc7d]" />
            </div>
            <h1 className="text-white font-black text-3xl md:text-4xl tracking-tight">
              {title}
            </h1>
            <p className="text-gray-300 text-base md:text-lg whitespace-pre-line leading-relaxed">
              {description}
            </p>
            <Link
              to={backTo}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 ${PRIMARY_CTA_CLASS}`}
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}

