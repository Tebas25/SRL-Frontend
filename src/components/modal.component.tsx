// src/components/modal.component.tsx
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-xl"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
