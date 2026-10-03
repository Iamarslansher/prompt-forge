import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { Zap, Award, Unlock, GraduationCap, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const iconMap = {
  Zap: Zap,
  Award: Award,
  Unlock: Unlock,
  GraduationCap: GraduationCap,
  AlertTriangle: AlertTriangle,
  CheckCircle: CheckCircle,
  Info: Info
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map(toast => {
          const IconComponent = iconMap[toast.icon] || Info;
          const isGold = toast.type === 'gold';
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';

          let borderBgClass = "bg-[#111A33]/90 border-blue-500/40 text-blue-200";
          if (isGold) borderBgClass = "bg-[#111A33]/95 border-amber-500/60 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.25)]";
          if (isSuccess) borderBgClass = "bg-[#111A33]/95 border-emerald-500/60 text-emerald-300";
          if (isError) borderBgClass = "bg-[#111A33]/95 border-red-500/60 text-red-300";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`pointer-events-auto p-4 rounded-xl backdrop-blur-xl border shadow-xl flex items-start gap-3 ${borderBgClass}`}
            >
              <div className="p-2 rounded-lg bg-white/10 shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-semibold text-sm text-white">{toast.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
