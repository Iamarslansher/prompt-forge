import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock, CheckCircle2, Clock, BookOpen, ArrowRight, Award } from 'lucide-react';

export default function ChapterCard({ chapter, isUnlocked, isPassed, bestScore, isCurrent }) {
  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
        !isUnlocked
          ? "bg-[#111A33]/40 border border-white/5 opacity-75 grayscale-[0.2]"
          : isPassed
          ? "glass-panel border-emerald-500/30 hover:border-emerald-500/50 shadow-lg shadow-emerald-500/5"
          : isCurrent
          ? "glass-panel border-blue-500/50 ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/10"
          : "glass-panel glass-panel-hover"
      }`}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-heading font-black text-2xl tracking-tight text-white/40">
            {chapter.number}
          </span>

          {/* Status Badge */}
          {isPassed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Passed ({bestScore}%)</span>
            </div>
          ) : !isUnlocked ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Locked</span>
            </div>
          ) : isCurrent ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold animate-pulse">
              <Unlock className="w-3.5 h-3.5" />
              <span>In Progress</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium">
              <span>Unlocked</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="font-heading font-bold text-xl text-white mb-1 group-hover:text-blue-300 transition-colors">
          {chapter.title}
        </h3>
        <p className="text-xs text-blue-300/80 font-medium mb-2">{chapter.subtitle}</p>
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
          {chapter.description}
        </p>
      </div>

      {/* Meta Specs & CTA */}
      <div className="pt-4 border-t border-white/10 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            {chapter.sections?.length || 5} Topics
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            ~{chapter.estimatedMinutes} mins
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {chapter.questionCount} Questions
          </span>
        </div>

        {/* Action Button */}
        {isUnlocked ? (
          <Link
            to={`/chapters/${chapter.id}`}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isPassed
                ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20"
            }`}
          >
            <span>{isPassed ? "Review Chapter" : "Start Learning"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-white/5 border border-white/5 text-slate-400 flex items-center justify-center gap-2 cursor-not-allowed">
            <Lock className="w-3.5 h-3.5" />
            <span>Pass Chapter {chapter.id - 1} with 75%+ to unlock</span>
          </div>
        )}
      </div>
    </div>
  );
}
