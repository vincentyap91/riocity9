import React from 'react';

export interface ResponsiveTableCardMeta {
  label?: React.ReactNode;
  value: React.ReactNode;
  className?: string;
  rowClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}

interface ResponsiveTableCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  amount?: React.ReactNode;
  status?: React.ReactNode;
  metadata?: ResponsiveTableCardMeta[];
  icon?: React.ReactNode;
  className?: string;
}

export function ResponsiveTableCard({
  title,
  description,
  amount,
  status,
  metadata = [],
  icon,
  className = 'bg-[#1a2230] rounded-2xl border border-white/5 p-4',
}: ResponsiveTableCardProps) {
  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            {icon && <div className="shrink-0">{icon}</div>}
            {amount ? (
              <span className="text-2xl font-black leading-none tracking-tight text-white truncate">{amount}</span>
            ) : (
              <span className="text-base font-bold leading-tight text-white truncate">{title}</span>
            )}
          </div>
          {amount && title && (
            <div className="mt-2 text-sm font-bold text-white truncate">{title}</div>
          )}
          {description && (
            <div className="mt-1.5 text-sm text-gray-200 font-medium leading-snug">{description}</div>
          )}
        </div>
        {status && <div className="shrink-0">{status}</div>}
      </div>

      {metadata.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {metadata.map((meta, index) => (
            meta.label ? (
              <div
                key={index}
                className={`flex w-full items-center justify-between gap-3 ${meta.className || ''} ${meta.rowClassName || ''}`}
              >
                <span className={`text-[11px] font-bold uppercase tracking-wider text-gray-500 ${meta.labelClassName || ''}`}>
                  {meta.label}
                </span>
                <span className={`text-sm font-medium text-white ${meta.valueClassName || ''}`}>
                  {meta.value}
                </span>
              </div>
            ) : (
              <span
                key={index}
                className={`text-gray-400 ${meta.className || ''}`}
              >
                {meta.value}
              </span>
            )
          ))}
        </div>
      )}
    </div>
  );
}
