import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useAcademy();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce sm:animate-none">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-sky-200/80 shadow-lg shadow-sky-100 text-xs font-semibold text-slate-800 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
