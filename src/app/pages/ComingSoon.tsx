import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";

export function ComingSoon({
  title,
  description = "此功能正在制作中，敬请期待。",
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
      <div className="container mx-auto px-4 py-10 max-w-[1024px]">
        {/* Header with back button - gap below for inner pages */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to={backTo}
            className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <span className="text-white font-bold text-base">{backLabel}</span>
        </div>

        <div className="bg-[#1a2230] rounded-[16px] shadow-xl border border-white/5 p-8 md:p-10">
          <div className="text-center space-y-3">
            <h1 className="text-white font-black text-2xl md:text-3xl tracking-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-sm md:text-base">{description}</p>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}

