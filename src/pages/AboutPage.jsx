import React from 'react';
import { Sparkles, Shield, Award, BookOpen, Heart, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="PromptForge Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="font-heading font-black text-3xl text-white">About PromptForge</h1>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest">Learn • Practice • Master</p>
          </div>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed font-light">
          PromptForge is an interactive learning, quiz, and certification platform engineered by <strong>Arslan Sher</strong> to take complete beginners from zero knowledge to certified prompt engineering proficiency.
        </p>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 text-xs text-blue-200 flex items-center gap-2 w-fit">
          <Heart className="w-4 h-4 text-red-400 fill-red-400 shrink-0" />
          <span>Designed & Developed by <strong>Arslan Sher</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="font-heading font-bold text-lg text-white">5 Structured Chapters</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Covers foundations, the RCTCO framework, few-shot prompting, real-world coding/business scenarios, and enterprise security.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <Award className="w-6 h-6 text-amber-400 mb-2" />
          <h3 className="font-heading font-bold text-lg text-white">Interactive Quizzes</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Test your knowledge with 70+ scenario questions. 75%+ score required to unlock next chapter.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <Zap className="w-6 h-6 text-purple-400 mb-2" />
          <h3 className="font-heading font-bold text-lg text-white">Gamified Progression</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Earn XP, advance from Level 1 to Level 8, unlock badges, and rank on the global leaderboard.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
          <Shield className="w-6 h-6 text-emerald-400 mb-2" />
          <h3 className="font-heading font-bold text-lg text-white">Official Certificate</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Generate and download high-resolution verified certificates upon completing the full course.
          </p>
        </div>
      </div>

    </div>
  );
}
