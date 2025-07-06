import { toast, type ToastOptions } from 'react-toastify';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const getIcon = (type: ToastType) => {
  const iconClass = 'w-5 h-5 mt-0.5 shrink-0';
  switch (type) {
    case 'success': return <CheckCircle2 className={`${iconClass} text-green-600`} />;
    case 'error': return <XCircle className={`${iconClass} text-red-600`} />;
    case 'info': return <Info className={`${iconClass} text-blue-600`} />;
    case 'warning': return <AlertTriangle className={`${iconClass} text-yellow-600`} />;
    default: return null;
  }
};

const getColors = (type: ToastType) => {
  switch (type) {
    case 'success': return 'bg-green-100 text-green-800 border-green-500';
    case 'error': return 'bg-red-100 text-red-800 border-red-500';
    case 'info': return 'bg-blue-100 text-blue-800 border-blue-500';
    case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    default: return '';
  }
};

const getProgressColor = (type: ToastType) => {
  switch (type) {
    case 'success': return 'bg-green-500';
    case 'error': return 'bg-red-500';
    case 'info': return 'bg-blue-500';
    case 'warning': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const ToastMessage = ({ type, message }: { type: ToastType; message: string }) => (
  <div
    className={clsx(
      'relative flex items-center justify-between border-l-4 px-4 py-3 rounded-lg shadow-md w-full max-w-sm',
      getColors(type)
    )}
  >
    <div className="flex items-start gap-3">
      {getIcon(type)}
      <span className="text-sm font-medium">{message}</span>
    </div>
  </div>
);



const defaultOptions = (type: ToastType): ToastOptions => ({
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true, // ✅ OCULTA LA BARRA
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  closeButton: false,
  className: '!bg-transparent !shadow-none !p-0',
  progressClassName: `${getProgressColor(type)} !important h-1 rounded-b-lg`,
});

export class Notifications {
  static show(type: ToastType, message: string) {
    toast(<ToastMessage type={type} message={message} />, defaultOptions(type));
  }
  static getSuccess(msg: string) {
    this.show('success', msg);
  }
  static getError(msg: string) {
    this.show('error', msg);
  }
  static getInfo(msg: string) {
    this.show('info', msg);
  }
  static getWarning(msg: string) {
    this.show('warning', msg);
  }
}



