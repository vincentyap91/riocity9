import React from 'react';
import { Inbox, type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  icon?: LucideIcon;
  className?: string;
  /** Use compact padding (e.g. inside table cells) */
  compact?: boolean;
}

const defaultMessage = 'No data found';

export function EmptyState({
  message = defaultMessage,
  icon: Icon = Inbox,
  className = '',
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-gray-500 ${compact ? '' : 'py-12'} ${className}`}
      role="status"
      aria-label={message}
    >
      <Icon className="w-12 h-12 text-gray-500/80 shrink-0" aria-hidden />
      <span className="text-sm font-medium text-center">{message}</span>
    </div>
  );
}
