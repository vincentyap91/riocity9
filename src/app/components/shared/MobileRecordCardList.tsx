import React from 'react';

export interface MobileRecordField {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

interface MobileRecordCardListProps<T> {
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  renderHeader?: (row: T, index: number) => React.ReactNode;
  fields: (row: T, index: number) => MobileRecordField[];
  emptyState?: React.ReactNode;
  cardClassName?: string;
  fieldGridClassName?: string;
}

export function MobileRecordCardList<T>({
  data,
  rowKey,
  renderHeader,
  fields,
  emptyState = null,
  cardClassName = 'bg-[#1a2230] rounded-2xl border border-white/5 p-4',
  fieldGridClassName = 'grid grid-cols-[120px_1fr] gap-x-3 gap-y-2 text-xs',
}: MobileRecordCardListProps<T>) {
  if (data.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="space-y-3">
      {data.map((row, index) => (
        <div key={rowKey(row, index)} className={cardClassName}>
          {renderHeader && <div className="mb-3">{renderHeader(row, index)}</div>}
          <div className={fieldGridClassName}>
            {fields(row, index).map((field) => (
              <React.Fragment key={`${String(rowKey(row, index))}-${field.label}`}>
                <span className="text-gray-400 font-bold uppercase tracking-wide">{field.label}</span>
                <span className={field.valueClassName || 'text-white font-medium'}>{field.value}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
