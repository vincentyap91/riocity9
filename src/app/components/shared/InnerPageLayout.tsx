import React from "react";
import { cn } from "../ui/utils";

type InnerPageLayoutProps = {
  children: React.ReactNode;
  /** Extra classes for the outermost wrapper */
  className?: string;
  /** Extra classes for the content wrapper (z-10 layer) */
  contentClassName?: string;
};

/**
 * Shared inner-page background wrapper.
 * Matches the ambience used by `Deposit` page.
 */
export function InnerPageLayout({
  children,
  className,
  contentClassName,
}: InnerPageLayoutProps) {
  return (
    <div
      className={cn(
        "w-full relative overflow-x-hidden font-sans text-white",
        className
      )}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[rgba(0,79,59,0.3)] rounded-full blur-[150px]" />
      </div>

      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </div>
  );
}

