import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CHAPTERS_DATA } from '../data/chapters';
import PromptComparison from '../components/PromptComparison';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Award, CheckCircle2, Lock, Sparkles, HelpCircle, Lightbulb } from 'lucide-react';

export default function ChapterReaderPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { progress, markChapterRead } = useProgress();

  const chapterNum = Number(chapterId);
  const chapter = CHAPTERS_DATA.find(c => c.id === chapterNum);

  const unlockedChapters = progress?.unlockedChapters || [1];
  const isUnlocked = unlockedChapters.includes(chapterNum);
  const isPassed = progress?.passedChapters?.includes(chapterNum);

  useEffect(() => {
    if (chapterNum && isUnlocked) {
      markChapterRead(chapterNum);
    }
  }, [chapterNum, isUnlocked]);

  if (!chapter) {
    return <Navigate to="/chapters" replace />;
  }

  if (!isUnlocked) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="p-4 rounded-full bg-slate-800 border border-slate-700 w-16 h-16 flex items-center justify-center mx-auto text-slate-400">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-white">Chapter {chapter.number} is Locked</h2>
        <p className="text-xs text-slate-300">
          You must score at least 75% on the Chapter {chapterNum - 1} quiz to unlock this chapter.
        </p>
        <Link
          to={`/chapters/${chapterNum - 1}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Chapter {chapterNum - 1}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
          Chapter {chapter.number} of 05
        </span>
      </div>

      {/* Chapter Title Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-3 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
            {chapter.badge}
          </span>
          {isPassed && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Completed
            </span>
          )}
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
          {chapter.title}
        </h1>
        <p className="text-sm text-blue-200/90 font-medium">{chapter.subtitle}</p>

        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-purple-400" /> ~{chapter.estimatedMinutes} Mins Read</span>
          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-blue-400" /> {chapter.sections?.length} Topic Sections</span>
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-400" /> {chapter.questionCount} Quiz Questions</span>
        </div>
      </div>

      {/* Chapter Sections Content */}
      <div className="space-y-8">
        {chapter.sections?.map((sec, idx) => (
          <section key={sec.id || idx} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>{sec.title}</span>
            </h2>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-light">
              {sec.content}
            </div>

            {/* Render Prompt Comparison Box if present */}
            {sec.comparison && (
              <PromptComparison comparison={sec.comparison} />
            )}

            {/* Framework Details List if present */}
            {sec.frameworkDetails && (
              <div className="grid grid-cols-1 gap-2.5 my-4">
                {sec.frameworkDetails.map((f, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 text-xs">
                    <span className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-300 font-mono font-bold shrink-0">
                      [{f.key}]
                    </span>
                    <p className="text-slate-300 self-center">{f.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Code Snippet Example if present */}
            {sec.codeExample && (
              <div className="my-4">
                <div className="p-4 rounded-xl bg-[#07111F] border border-white/10 font-mono text-xs text-blue-200 overflow-x-auto whitespace-pre leading-relaxed select-all">
                  {sec.codeExample}
                </div>
              </div>
            )}

            {/* Tip Card if present */}
            {sec.tip && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-0.5">PROMPT MASTER TIP:</strong>
                  {sec.tip}
                </div>
              </div>
            )}

            {/* Key Takeaway */}
            {sec.keyTakeaway && (
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-0.5">KEY TAKEAWAY:</strong>
                  {sec.keyTakeaway}
                </div>
              </div>
            )}

          </section>
        ))}
      </div>

      {/* Chapter Footer CTA: Start Quiz */}
      <div className="glass-panel p-8 rounded-3xl border border-blue-500/30 text-center space-y-4 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-blue-500/30">
          <HelpCircle className="w-6 h-6" />
        </div>

        <h3 className="font-heading font-bold text-2xl text-white">Ready to test your knowledge?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Take the Chapter {chapter.number} Quiz. Score at least <strong>75%</strong> to pass and unlock the next chapter!
        </p>

        <div className="pt-2">
          <Link
            to={`/chapters/${chapter.id}/quiz`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-heading font-bold text-xs shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Chapter {chapter.number} Quiz ({chapter.questionCount} Questions)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
