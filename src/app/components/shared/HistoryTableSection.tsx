import React from 'react';

type ColumnAlign = 'left' | 'center' | 'right';

export interface HistoryColumn<T> {
  key: string;
  label: string;
  align?: ColumnAlign;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => React.ReactNode;
}

interface HistoryTableSectionProps<T> {
  title?: string;
  columns: HistoryColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
}

const ALIGN_CLASS: Record<ColumnAlign, string> = {
  left: '',
  center: 'text-center',
  right: 'text-right',
};

export function HistoryTableSection<T>({
  title,
  columns,
  data,
  rowKey,
}: HistoryTableSectionProps<T>) {
  return (
    <>
      {title && (
        <div className="flex items-center justify-start gap-3 pb-4">
          <span className="text-white font-bold text-base">{title}</span>
        </div>
      )}

      <div className="bg-[#0f151f] rounded-2xl border border-white/5 shadow-inner">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#1a2230]/80 border-b border-white/5">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest ${ALIGN_CLASS[column.align || 'left']} ${column.headerClassName || ''}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((row) => (
                <tr key={rowKey(row)} className="hover:bg-white/5 transition-all group">
                  {columns.map((column) => (
                    <td
                      key={`${String(rowKey(row))}-${column.key}`}
                      className={`px-6 py-5 ${ALIGN_CLASS[column.align || 'left']} ${column.cellClassName || ''}`}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Showing 1-{data.length} of {data.length} records
          </span>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Prev</button>
            <button type="button" className="px-3 py-1 rounded-lg bg-[#00bc7d]/20 text-[#00bc7d] text-xs font-bold border border-[#00bc7d]/30">1</button>
            <button type="button" className="px-3 py-1 rounded-lg bg-white/5 text-gray-500 text-xs disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
