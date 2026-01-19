import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NotFound() {
  const location = useLocation();
  return (
    <div className="min-h-screen w-full relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#042f1f] via-[#031a15] to-[#02040a]"></div>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.2)] rounded-full blur-[100px]"></div>
        <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-[rgba(0,96,69,0.2)] rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 max-w-[1024px]">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/"
            className="h-10 w-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <span className="text-white font-bold text-base">Home</span>
        </div>

        <div className="bg-[#1a2230] rounded-[16px] shadow-xl border border-white/5 p-8 md:p-10">
          <div className="text-center space-y-3">
            <h1 className="text-white font-black text-2xl md:text-3xl tracking-tight">
              Page Not Found
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              找不到页面：<span className="font-mono text-gray-300">{location.pathname}</span>
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="inline-flex h-12 px-8 items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

