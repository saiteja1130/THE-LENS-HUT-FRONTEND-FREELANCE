import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'confirm', // 'confirm' | 'success' | 'error' | 'warning'
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: null,
    onCancel: null,
    destructive: false,
  });

  const toastIdRef = useRef(0);

  // Remove specific toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Show Toast
  const showToast = useCallback((message, type = 'success', duration = 3200) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  // Convenience toast object
  const toast = {
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
  };

  // Show Confirmation Modal
  const showConfirm = useCallback(({
    title = 'Are you sure?',
    message = '',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm = null,
    onCancel = null,
    destructive = false,
    type = 'confirm',
  }) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      destructive,
    });
  }, []);

  const showSuccessModal = useCallback((title, message, onConfirm) => {
    setModal({
      isOpen: true,
      title: title || 'Success',
      message: message || '',
      type: 'success',
      confirmText: 'Continue',
      cancelText: null,
      onConfirm: onConfirm || null,
      onCancel: null,
      destructive: false,
    });
  }, []);

  const showErrorModal = useCallback((title, message, onConfirm) => {
    setModal({
      isOpen: true,
      title: title || 'Error',
      message: message || 'An unexpected error occurred.',
      type: 'error',
      confirmText: 'Dismiss',
      cancelText: null,
      onConfirm: onConfirm || null,
      onCancel: null,
      destructive: false,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleModalConfirm = () => {
    const callback = modal.onConfirm;
    closeModal();
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  const handleModalCancel = () => {
    const callback = modal.onCancel;
    closeModal();
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        showToast,
        toast,
        showConfirm,
        showSuccessModal,
        showErrorModal,
        closeModal,
      }}
    >
      {children}

      {/* Floating Toasts Container (Top-Right) */}
      <div className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
        {toasts.map((t) => {
          const isError = t.type === 'error';
          const isWarning = t.type === 'warning';
          const isInfo = t.type === 'info';
          const isSuccess = t.type === 'success';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-3 fade-in ${
                isError
                  ? 'bg-rose-950/95 border-rose-800 text-rose-100'
                  : isWarning
                  ? 'bg-amber-950/95 border-amber-800 text-amber-100'
                  : isInfo
                  ? 'bg-slate-900/95 border-slate-700 text-slate-100'
                  : 'bg-slate-900/95 border-slate-700 text-white'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                {isInfo && <Info className="w-5 h-5 text-sky-400" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </div>

              <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
                {t.message}
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="shrink-0 text-slate-400 hover:text-white transition-colors cursor-pointer -mr-1 -mt-0.5"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Luxury Confirmation / Alert Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={closeModal}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-7 text-center z-10 animate-in zoom-in-95 duration-200">
            {/* Icon Header Badge */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border shadow-inner">
              {modal.type === 'error' && (
                <div className="w-full h-full rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <AlertCircle className="w-7 h-7" />
                </div>
              )}
              {modal.type === 'warning' && (
                <div className="w-full h-full rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <AlertTriangle className="w-7 h-7" />
                </div>
              )}
              {modal.type === 'success' && (
                <div className="w-full h-full rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              )}
              {modal.type === 'confirm' && (
                <div
                  className={`w-full h-full rounded-2xl flex items-center justify-center ${
                    modal.destructive
                      ? 'bg-rose-50 border border-rose-200 text-rose-600'
                      : 'bg-slate-100 border border-slate-200 text-slate-800'
                  }`}
                >
                  {modal.destructive ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : (
                    <Info className="w-7 h-7 text-[#0F172A]" />
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {modal.title}
            </h3>

            {/* Message */}
            {modal.message && (
              <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                {modal.message}
              </p>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              {modal.cancelText && (
                <button
                  type="button"
                  onClick={handleModalCancel}
                  className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {modal.cancelText}
                </button>
              )}

              <button
                type="button"
                onClick={handleModalConfirm}
                className={`w-full ${
                  modal.cancelText ? 'sm:w-1/2' : 'sm:w-full'
                } px-4 py-2.5 rounded-xl font-semibold text-sm text-white shadow-sm transition-all cursor-pointer ${
                  modal.destructive || modal.type === 'error'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                    : 'bg-[#0F172A] hover:bg-black shadow-slate-900/20'
                }`}
              >
                {modal.confirmText || 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
