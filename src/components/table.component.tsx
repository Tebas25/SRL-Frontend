/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor?: string;
  render?: (value: any, row: T) => ReactNode;
}

interface TableWrapperProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

const TableWrapper = <T extends object>({ data, columns, className = '' }: TableWrapperProps<T>) => {
  return (
    <div className={`overflow-x-auto rounded-lg shadow border ${className}`}>
      <table className="min-w-full divide-y divide-gray-300 text-sm text-left">
        <thead className="bg-blue-900 text-white">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 font-semibold">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => {
                const value = col.accessor ? getNestedValue(row, col.accessor) : null;
                return (
                  <td key={colIndex} className="px-4 py-3 align-middle h-[60px]">
                    {col.render
                      ? col.render(value, row)
                      : String(value)
                    }
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
