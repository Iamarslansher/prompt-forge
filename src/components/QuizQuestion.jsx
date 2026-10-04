import React from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';

export default function QuizQuestion({ question, selectedOption, onSelectOption, currentQuestionIndex, totalQuestions }) {
  if (!question) return null;

  return (
    <div className="space-y-6">
      
      {/* Question Header */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs text-blue-400 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-slate-400 font-normal">
            {question.difficulty || 'Medium'} · {question.format || (question.type === 'text' ? 'Write a prompt' : 'Multiple choice')}
          </span>
        </div>
        <h2 className="font-heading font-bold text-lg sm:text-xl text-white leading-relaxed">
          {question.question}
        </h2>
      </div>

      {question.type === 'text' ? (
        <div className="space-y-2">
          <textarea
            value={selectedOption || ''}
            onChange={(event) => onSelectOption(event.target.value)}
            rows={6}
            maxLength={2000}
            placeholder="Write a specific response that addresses the task and its constraints..."
            aria-label="Your written answer"
            className="w-full p-4 rounded-2xl glass-panel border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-sm text-white placeholder:text-slate-500 resize-y outline-none"
          />
          <p className="text-[10px] text-slate-400">
            Written answers are automatically checked against key criteria; a sample answer and feedback appear in your review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((optionText, idx) => {
            const isSelected = selectedOption === idx;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                onClick={() => onSelectOption(idx)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between border ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border-blue-500 text-white shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/30"
                    : "glass-panel border-white/10 hover:border-blue-500/30 text-slate-200 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <span className={`w-8 h-8 rounded-xl font-heading font-bold text-xs flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? "bg-blue-500 text-white border-blue-400"
                      : "bg-white/5 text-slate-400 border-white/10"
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-normal">{optionText}</span>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-slate-600"
                }`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
