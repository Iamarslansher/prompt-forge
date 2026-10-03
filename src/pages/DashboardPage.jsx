import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { CHAPTERS_DATA } from '../data/chapters';
import ChapterCard from '../components/ChapterCard';
import RecentExplorers from '../components/RecentExplorers';
import { Sparkles, ArrowRight, Flame, Zap, Award, BookOpen, RotateCcw, GraduationCap } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { progress, levelInfo } = useProgress();

  const passedChapters = progress?.passedChapters || [];
  const unlockedChapters = progress?.unlockedChapters || [1];
  const chapterScores = progress?.chapterScores || {};

  const courseProgressPercent = Math.round((passedChapters.length / 5) * 100);

  // Find next chapter to continue learning
  let nextToLearn = 1;
  for (let i = 1; i <= 5; i++) {
    if (unlockedChapters.includes(i) && !passedChapters.includes(i)) {
      nextToLearn = i;
      break;
    }
  }
  if (passedChapters.length === 5) nextToLearn = 5;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-purple-950/40 relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Prompt Engineer Academy</span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-4xl text-white">
            Welcome back, {user?.name || 'Learner'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Continue your journey to becoming a Prompt Engineer. Master structured prompting, few-shot techniques, and enterprise security.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to={`/chapters/${nextToLearn}`}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-heading font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Continue Learning (Chapter {nextToLearn})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {progress?.certificateIssued && (
              <Link
                to="/certificate"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-amber-300 font-heading font-bold text-xs flex items-center gap-2 hover:bg-amber-500/30 transition-all"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>View Certificate</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Course Progress */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Course Progress</span>
          <div className="font-heading font-black text-2xl text-blue-400">{courseProgressPercent}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-1">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${courseProgressPercent}%` }} />
          </div>
        </div>

        {/* Chapters */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Chapters</span>
          <div className="font-heading font-black text-2xl text-purple-400">
            {passedChapters.length} <span className="text-sm font-normal text-slate-400">/ 5</span>
          </div>
          <p className="text-[10px] text-slate-400">Completed & Passed</p>
        </div>

        {/* Best Score */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Best Score</span>
          <div className="font-heading font-black text-2xl text-emerald-400">
            {progress?.bestQuizScore || 0}%
          </div>
          <p className="text-[10px] text-slate-400">Highest Quiz Attempt</p>
        </div>

        {/* Quiz Attempts */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Quiz Attempts</span>
          <div className="font-heading font-black text-2xl text-cyan-400">
            {progress?.quizAttemptsCount || 0}
          </div>
          <p className="text-[10px] text-slate-400">Total Submissions</p>
        </div>

        {/* Total XP */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Total XP</span>
          <div className="font-heading font-black text-2xl text-amber-400 flex items-center gap-1">
            <Zap className="w-4 h-4 fill-amber-400" />
            {(progress?.totalXp || 0).toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400">{levelInfo.fullTitle}</p>
        </div>

        {/* Current Streak */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Current Streak</span>
          <div className="font-heading font-black text-2xl text-amber-500 flex items-center gap-1">
            <Flame className="w-5 h-5 fill-amber-500" />
            {progress?.streakDays || 1} <span className="text-xs font-semibold text-slate-400">Days</span>
          </div>
          <p className="text-[10px] text-slate-400">Daily Login Streak</p>
        </div>

      </div>

      {/* Curriculum Chapters Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-white">5-Chapter Learning Path</h2>
          <span className="text-xs text-slate-400">75%+ Score required to unlock next chapter</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS_DATA.map((ch) => {
            const isUnlocked = unlockedChapters.includes(ch.id);
            const isPassed = passedChapters.includes(ch.id);
            const score = chapterScores[ch.id] || 0;
            const isCurrent = ch.id === nextToLearn;

            return (
              <ChapterCard
                key={ch.id}
                chapter={ch}
                isUnlocked={isUnlocked}
                isPassed={isPassed}
                bestScore={score}
                isCurrent={isCurrent}
              />
            );
          })}
        </div>
      </div>

      {/* Community Explorers */}
      <RecentExplorers />

    </div>
  );
}
