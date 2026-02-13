import React from 'react';
import { DatePicker } from '../ui/DatePicker';
import { FilterTabs, type FilterTabItem } from './FilterTabs';

interface MobileRecordFilterPanelProps {
  primaryLabel?: string;
  primaryControl?: React.ReactNode;
  startDate: Date | string | null | undefined;
  endDate: Date | string | null | undefined;
  onStartDateChange: (value: Date | string) => void;
  onEndDateChange: (value: Date | string) => void;
  tabs: FilterTabItem[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  errorMessage?: string;
  className?: string;
}

export function MobileRecordFilterPanel({
  primaryLabel,
  primaryControl,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  tabs,
  activeTabId,
  onSelectTab,
  errorMessage,
  className,
}: MobileRecordFilterPanelProps) {
  return (
    <div className={`md:hidden mb-5 space-y-5${className ? ` ${className}` : ''}`}>
      {primaryControl && (
        <div className="space-y-2">
          {primaryLabel && <label className="text-white font-bold text-sm">{primaryLabel}</label>}
          {primaryControl}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">Start Date</label>
          <DatePicker
            value={startDate}
            placeholder="DD-MM-YYYY"
            onChange={onStartDateChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-white font-bold text-sm">End Date</label>
          <DatePicker
            value={endDate}
            placeholder="DD-MM-YYYY"
            onChange={onEndDateChange}
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="text-xs text-red-400 -mt-3">{errorMessage}</p>
      ) : null}

      <div className="mb-1">
        <FilterTabs
          items={tabs}
          activeId={activeTabId}
          onSelect={onSelectTab}
          scrollable
        />
      </div>
    </div>
  );
}
