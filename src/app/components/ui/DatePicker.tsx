import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './calendar';
import { cn } from './utils';

type DatePickerValue = Date | string | null | undefined;

interface DatePickerProps {
  value: DatePickerValue;
  onChange: (value: Date | string) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

function isValidDate(date: Date | undefined): date is Date {
  return !!date && !Number.isNaN(date.getTime());
}

function parseDateValue(value: DatePickerValue): Date | undefined {
  if (value instanceof Date) {
    return isValidDate(value) ? value : undefined;
  }
  if (typeof value !== 'string') {
    return undefined;
  }

  const text = value.trim();
  if (!text) {
    return undefined;
  }

  const parseFromParts = (day: number, month: number, year: number) => {
    const parsed = new Date(year, month - 1, day);
    if (
      parsed.getFullYear() === year &&
      parsed.getMonth() === month - 1 &&
      parsed.getDate() === day
    ) {
      return parsed;
    }
    return undefined;
  };

  const dashDmyMatch = text.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dashDmyMatch) {
    return parseFromParts(
      Number(dashDmyMatch[1]),
      Number(dashDmyMatch[2]),
      Number(dashDmyMatch[3]),
    );
  }

  const slashDmyMatch = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (slashDmyMatch) {
    return parseFromParts(
      Number(slashDmyMatch[1]),
      Number(slashDmyMatch[2]),
      Number(slashDmyMatch[3]),
    );
  }

  const isoYmdMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoYmdMatch) {
    return parseFromParts(
      Number(isoYmdMatch[3]),
      Number(isoYmdMatch[2]),
      Number(isoYmdMatch[1]),
    );
  }

  const fallback = new Date(text);
  return isValidDate(fallback) ? fallback : undefined;
}

function formatDate(date: Date): string {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'DD-MM-YYYY',
  minDate,
  maxDate,
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedDate = useMemo(() => parseDateValue(value), [value]);
  const displayValue = selectedDate ? formatDate(selectedDate) : '';

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!containerRef.current || !target) return;
      if (!containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative group">
        <input
          type="text"
          value={displayValue}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          onClick={() => !disabled && setOpen(true)}
          className={cn(
            'w-full bg-[#0f151f] border border-white/10 text-white h-12 rounded-xl px-4 focus:border-[#00bc7d] focus-visible:ring-[#00bc7d]/20 pr-10 cursor-pointer',
            disabled && 'opacity-60 cursor-not-allowed',
            className,
          )}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((previous) => !previous)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          aria-label="Open calendar"
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>

      {open && !disabled && (
        <div className="absolute left-0 mt-2 z-50 rounded-xl border border-white/10 bg-[#131b29] shadow-2xl">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatDate(date));
              setOpen(false);
            }}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
            className="text-white"
            classNames={{
              caption_label: 'text-sm font-medium text-white',
              head_cell: 'text-gray-400 rounded-md w-8 font-normal text-[0.8rem]',
              day: 'size-8 p-0 font-normal text-white hover:bg-white/10 rounded-md',
              day_selected:
                'bg-[#00bc7d] text-black hover:bg-[#00bc7d] hover:text-black focus:bg-[#00bc7d] focus:text-black',
              day_today: 'bg-white/10 text-white',
              day_outside: 'text-gray-500',
              day_disabled: 'text-gray-600 opacity-50',
              nav_button:
                'size-7 bg-transparent p-0 text-gray-300 opacity-80 hover:opacity-100 hover:bg-white/10 rounded-md',
            }}
          />
        </div>
      )}
    </div>
  );
}
