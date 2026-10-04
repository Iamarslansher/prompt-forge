import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, ChevronDown, ChevronUp, AlertCircle, Award } from 'lucide-react';

export default function QuizResultCard({ chapter, score, correctCount, partialCount, totalQuestions, passed, timedOut, questions, userAnswers, answerResults, onRetry }) {
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [passed]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Result Card */}
      <div className={`glass-panel p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden ${
        passed ? "border-emerald-500/40 shadow-2xl shadow-emerald-500/10" : "border-red-500/40 shadow-2xl shadow-red-500/10"
      }`}>
        
        <div className="inline-flex p-4 rounded-3xl mb-4 bg-white/5">
          {passed ? (
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          ) : (
            <XCircle className="w-12 h-12 text-red-400" />
          )}
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">QUIZ COMPLETE</p>
        <h2 className="font-heading font-black text-3xl text-white mb-2">{chapter.title}</h2>
        {timedOut && (
          <p className="text-xs text-amber-300 mb-2">Time expired; unanswered questions were marked incorrect.</p>
        )}

        {/* Score Pill */}
        <div className="my-6 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 inline-block">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Your Score</div>
          <div className={`font-heading font-black text-5xl ${passed ? "text-emerald-400" : "text-red-400"}`}>
            {score}%
          </div>
          <div className="text-xs font-medium text-slate-300 mt-1">
            {correctCount} correct{partialCount ? `, ${partialCount} partial` : ''} / {totalQuestions}
          </div>
        </div>

        {/* Status Message */}
        {passed ? (
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Chapter Passed!</span>
            </div>
            <p className="text-xs text-slate-300">
              {chapter.id < 5 ? `Chapter ${chapter.id + 1} has been unlocked.` : "You passed the final assessment!"}
            </p>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-semibold">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>Quiz Failed (75% Required)</span>
            </div>
            <p className="text-xs text-slate-300">
              You need a score of 75% or higher to unlock the next chapter. Review your mistakes below and try again!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-blue-400" />
            <span>Retry Quiz</span>
          </button>

          {passed && chapter.id < 5 && (
            <Link
              to={`/chapters/${chapter.id + 1}`}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
            >
              <span>Next Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          {passed && chapter.id === 5 && (
            <Link
              to="/certificate"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate</span>
            </Link>
          )}
        </div>

      </div>

      {/* Review Mistakes Section */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10">
        <button
          onClick={() => setShowReview(!showReview)}
          className="w-full flex items-center justify-between font-heading font-bold text-sm text-white hover:text-blue-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Review Quiz Questions & Answers ({totalQuestions})
          </span>
          {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showReview && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
            {questions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const answerResult = answerResults?.[idx];
              const isCorrect = q.type === 'text' ? answerResult?.score === 1 : userAns === q.correctAnswer;
              const isPartial = q.type === 'text' && answerResult?.score === 0.5;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-left space-y-2 ${
                    isCorrect ? "bg-emerald-950/20 border-emerald-500/30" : isPartial ? "bg-amber-950/20 border-amber-500/30" : "bg-red-950/20 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">Q{idx + 1}.</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                      isCorrect ? "bg-emerald-500/20 text-emerald-300" : isPartial ? "bg-amber-500/20 text-amber-300" : "bg-red-500/20 text-red-300"
                    }`}>
                      {isCorrect ? "Correct" : isPartial ? "Partially correct" : "Needs improvement"}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-white">{q.question}</p>

                  <div className="text-xs space-y-1">
                    <p className="text-slate-300">
                      Your Answer:                       <strong className={isCorrect ? "text-emerald-300" : isPartial ? "text-amber-300" : "text-red-300"}>
                        {userAns !== undefined
                          ? q.type === 'text' ? userAns : q.options[userAns]
                          : "Not answered"}
                      </strong>
                    </p>
                    {q.type !== 'text' && !isCorrect && (
                      <p className="text-emerald-400 font-medium">
                        Correct Answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    {q.type === 'text' && (
                      <>
                        <p className="text-emerald-300 font-medium whitespace-pre-line">
                          Model answer: {q.sampleAnswer}
                        </p>
                        <p className={isCorrect ? "text-emerald-300" : isPartial ? "text-amber-300" : "text-red-300"}>
                          {answerResult?.feedback || 'No answer was provided.'}
                          {answerResult?.totalConcepts > 0
                            ? ` Covered ${answerResult.matchedCount} of ${answerResult.totalConcepts} key criteria.`
                            : ''}
                        </p>
                        {q.rubric?.length > 0 && answerResult && (
                          <p className="text-slate-400">
                            {answerResult.missingConcepts.length
                              ? `Criteria not detected: ${answerResult.missingConcepts.map((criterion) => criterion.split('|')[0]).join(', ')}.`
                              : 'All key criteria were detected.'}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-[#0B1020]/80 border border-white/5 text-[11px] text-slate-300 leading-relaxed mt-2">
                    <strong className="text-blue-300 block mb-0.5">Explanation:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
