import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import AchievementCard from '../components/AchievementCard';
import { Award, Zap } from 'lucide-react';

export default function AchievementsPage() {
  const { progress } = useProgress();
  const unlockedAchIds = progress?.unlockedAchievements || [];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3 bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-indigo-950/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span>Badges & Milestones</span>
        </div>

        <h1 className="font-heading font-black text-3xl text-white">Platform Achievements</h1>
        <p className="text-xs text-slate-300 max-w-xl">
          Unlock badges by completing chapters, maintaining daily learning streaks, and scoring 100% on quizzes. Earn bonus XP for every unlocked achievement!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS_DATA.map((ach) => (
          <AchievementCard
            key={ach.id}
            achievement={ach}
            isUnlocked={unlockedAchIds.includes(ach.id)}
          />
        ))}
      </div>

    </div>
  );
}
