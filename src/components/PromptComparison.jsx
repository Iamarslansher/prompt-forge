import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Sparkles, Copy, Check } from 'lucide-react';

export default function PromptComparison({ comparison }) {
  const [copied, setCopied] = React.useState(false);

  if (!comparison) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bad Prompt */}
      <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 font-heading font-semibold text-xs uppercase tracking-wider mb-2">
            <XCircle className="w-4 h-4" />
            <span>Weak / Novice Prompt</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0B1020]/90 border border-red-500/20 font-mono text-xs text-red-200 leading-relaxed select-all">
            "{comparison.badPrompt.text}"
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-red-500/10">
          <p className="text-[11px] font-semibold text-red-300 uppercase tracking-wider">Why it fails:</p>
          <ul className="space-y-1">
            {comparison.badPrompt.issues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-red-300/80">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Good Prompt */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-emerald-400 font-heading font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Structured / Expert Prompt</span>
            </div>
            <button
              onClick={() => handleCopy(comparison.goodPrompt.text)}
              className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-medium flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0B1020]/90 border border-emerald-500/20 font-mono text-xs text-emerald-200 leading-relaxed whitespace-pre-line select-all">
            {comparison.goodPrompt.text}
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-emerald-500/10">
          <p className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">Why it succeeds:</p>
          <ul className="space-y-1">
            {comparison.goodPrompt.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-xs text-emerald-300/90">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
