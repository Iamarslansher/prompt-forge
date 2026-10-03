import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Award, Zap, BookOpen, Layers, BrainCircuit, CheckCircle2, Lock } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chapters';

export default function HomePage() {
  const steps = [
    { num: "01", title: "Learn", desc: "Read 5 structured chapters built for beginners to pros", icon: BookOpen },
    { num: "02", title: "Practice", desc: "Interactive prompt comparisons & real-world scenarios", icon: Layers },
    { num: "03", title: "Test", desc: "Chapter quizzes to evaluate your prompting skills", icon: BrainCircuit },
    { num: "04", title: "Unlock", desc: "Score ≥ 75% to unlock the next chapter", icon: Lock },
    { num: "05", title: "Master", desc: "Advanced prompt optimization & security strategies", icon: Zap },
    { num: "06", title: "Get Certified", desc: "Receive an official PromptForge Certificate", icon: Award },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
            <img src="/logo.png" alt="Logo" className="w-4 h-4 object-contain" />
            <span>PromptForge • Learn • Practice • Master</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            MASTER THE ART OF <br className="hidden sm:inline" />
            <span className="gradient-text-blue-purple">PROMPT ENGINEERING</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Learn how to communicate with AI clearly, strategically, and effectively — from your first prompt to advanced prompt engineering.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-heading font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#curriculum"
              className="px-8 py-3.5 rounded-2xl glass-panel border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-heading font-semibold text-sm transition-all"
            >
              Explore Curriculum
            </a>
          </div>

          {/* Social Proof Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5 Structured Chapters</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-blue-400" /> 75% Unlock Threshold</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Official Certificate</span>
          </div>

        </div>
      </section>

      {/* Visual Learning Loop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">How PromptForge Works</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">THE ACADEMY LEARNING LOOP</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/10 text-center space-y-3 relative group hover:border-blue-500/40 transition-all"
              >
                <span className="font-heading font-black text-xl text-blue-400/40 group-hover:text-blue-400 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-blue-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-sm text-white">{step.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">5-Chapter Curriculum</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">BECOME A PROMPT ENGINEER</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS_DATA.map((ch) => (
            <div key={ch.id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading font-black text-xl text-blue-400/50">{ch.number}</span>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {ch.badge}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">{ch.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{ch.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>{ch.sections?.length || 5} Topics</span>
                <span>{ch.questionCount} Questions</span>
                <span className="text-emerald-400 font-medium">≥75% Pass</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <span>Start Learning Chapter 1</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
