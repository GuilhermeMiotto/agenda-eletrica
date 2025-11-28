'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-error',
    info: 'bg-accent-primary',
  }[type];

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className={`${bgColor} text-white p-4 rounded-card shadow-lg flex justify-between items-center`}>
        <p className="flex-1">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-xl leading-none hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
}
