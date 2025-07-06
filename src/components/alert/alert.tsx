// ConfirmContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

export const ConfirmType = {
  Confirm: 'confirm',
  Warning: 'warning',
  Info: 'info',
  Danger: 'danger',
} as const;

export type ConfirmType = typeof ConfirmType[keyof typeof ConfirmType];

interface ConfirmOptions {
  type?: ConfirmType;
  title?: string;
  message?: ReactNode | string;
  onAccept?: () => void;
  onCancel?: () => void;
  hideButtons?: boolean;
}

interface ConfirmContextType {
  show: (options: ConfirmOptions) => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useConfirm must be used within a ConfirmProvider');
  return context;
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const show = (opts: ConfirmOptions) => setOptions(opts);
  const close = () => setOptions(null);

  return (
    <ConfirmContext.Provider value={{ show }}>
      {children}
      {options && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-4">
            <h2 className="text-lg font-semibold mb-2">{options.title}</h2>
            <div className="text-sm mb-4">{options.message}</div>
            {!options.hideButtons && (
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                  onClick={() => {
                    options.onCancel?.();
                    close();
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    options.onAccept?.();
                    close();
                  }}
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
