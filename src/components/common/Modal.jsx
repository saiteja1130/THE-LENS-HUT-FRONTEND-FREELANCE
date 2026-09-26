import React, { useEffect } from 'react';
import { X } from 'lucide-react';
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#14232E]/60 backdrop-blur-xs transition-opacity" onClick={onClose} aria-hidden="true" />

      {/* Dialog box */}
      <div className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-lg shadow-2xl border border-slate-100 z-10 overflow-hidden transform transition-all my-8 animate-in fade-in zoom-in-95 duration-200`} role="dialog" aria-modal="true">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          {title ? <h3 className="text-lg font-bold text-[#14232E]">{title}</h3> : <div />}
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-[#14232E] hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>;
};