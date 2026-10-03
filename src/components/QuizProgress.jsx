import React from 'react';
import { HelpCircle, Clock } from 'lucide-react';

export default function QuizProgress({ currentQuestion, totalQuestions, chapterTitle }) {
  const percent = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="text-blue-400 font-semibold uppercase tracking-wider block text-[10px]">Quiz Assessment</span>
          <h3 className="font-heading font-bold text-white text-base">{chapterTitle}</h3>
        </div>
        <div className="text-right">
          <span className="font-heading font-bold text-blue-300 text-sm">{currentQuestion + 1} / {totalQuestions}</span>
          <span className="text-[10px] text-slate-400 block font-medium">{percent}% Completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/5">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
