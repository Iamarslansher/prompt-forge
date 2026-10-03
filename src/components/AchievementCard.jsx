import React from 'react';
import { Sparkles, Layers, BrainCircuit, Briefcase, Award, Zap, Flame, BookOpen, GraduationCap, Lock, Check } from 'lucide-react';

const iconMap = {
  Sparkles,
  Layers,
  BrainCircuit,
  Briefcase,
  Award,
  Zap,
  Flame,
  BookOpen,
  GraduationCap
};

export default function AchievementCard({ achievement, isUnlocked }) {
  const IconComponent = iconMap[achievement.icon] || Award;

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        isUnlocked
          ? "glass-panel border-amber-500/30 hover:border-amber-500/50 shadow-lg shadow-amber-500/5"
          : "bg-[#111A33]/40 border-white/5 opacity-60 grayscale-[0.5]"
      }`}
    >
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-2xl ${
            isUnlocked
              ? "bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 text-amber-400 border border-amber-500/30"
              : "bg-white/5 text-slate-500 border border-white/5"
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              isUnlocked
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : "bg-slate-800 text-slate-400 border-slate-700"
            }`}>
              +{achievement.xpReward} XP
            </span>
          </div>
        </div>

        <h4 className="font-heading font-bold text-base text-white mb-0.5">{achievement.title}</h4>
        <p className="text-xs text-amber-400/80 font-medium mb-2">{achievement.subtitle}</p>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">{achievement.description}</p>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px] truncate max-w-[180px]">{achievement.requirement}</span>
        {isUnlocked ? (
          <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <Check className="w-3 h-3" /> Unlocked
          </span>
        ) : (
          <span className="flex items-center gap-1 text-slate-400 font-medium text-[11px]">
            <Lock className="w-3 h-3" /> Locked
          </span>
        )}
      </div>
    </div>
  );
}
