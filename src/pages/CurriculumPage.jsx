import React from 'react';
import { CHAPTERS_DATA } from '../data/chapters';
import { useProgress } from '../context/ProgressContext';
import ChapterCard from '../components/ChapterCard';
import { BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CurriculumPage() {
  const { progress } = useProgress();

  const unlockedChapters = progress?.unlockedChapters || [1];
  const passedChapters = progress?.passedChapters || [];
  const chapterScores = progress?.chapterScores || {};

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Complete Academy Curriculum</span>
        </div>

        <h1 className="font-heading font-black text-3xl text-white">
          Prompt Engineering Learning Path
        </h1>
        <p className="text-xs text-slate-300 max-w-xl">
          Progress sequentially from Chapter 1 to Chapter 5. Score at least 75% on each chapter quiz to unlock the next level.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHAPTERS_DATA.map((ch) => {
          const isUnlocked = unlockedChapters.includes(ch.id);
          const isPassed = passedChapters.includes(ch.id);
          const score = chapterScores[ch.id] || 0;

          return (
            <ChapterCard
              key={ch.id}
              chapter={ch}
              isUnlocked={isUnlocked}
              isPassed={isPassed}
              bestScore={score}
              isCurrent={isUnlocked && !isPassed}
            />
          );
        })}
      </div>

    </div>
  );
}
