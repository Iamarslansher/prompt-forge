import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Terminal } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-center">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative">
        
        <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            404
          </h1>
          <h2 className="font-heading font-bold text-lg text-white">
            Looks like this prompt didn't return the expected result.
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or route you requested does not exist or has moved context.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-heading font-bold text-xs shadow-lg shadow-blue-500/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
