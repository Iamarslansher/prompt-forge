import React, { useState } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CHAPTERS_DATA } from '../data/chapters';
import { QUESTIONS_DATA } from '../data/questions';
import QuizQuestion from '../components/QuizQuestion';
import QuizProgress from '../components/QuizProgress';
import QuizResultCard from '../components/QuizResultCard';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export default function QuizPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { recordQuizResult, progress } = useProgress();

  const chapterNum = Number(chapterId);
  const chapter = CHAPTERS_DATA.find(c => c.id === chapterNum);
  const questions = QUESTIONS_DATA[chapterNum] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);

  const unlockedChapters = progress?.unlockedChapters || [1];
  const isUnlocked = unlockedChapters.includes(chapterNum);

  if (!chapter || questions.length === 0) {
    return <Navigate to="/chapters" replace />;
  }

  if (!isUnlocked) {
    return <Navigate to={`/chapters/${chapterNum}`} replace />;
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    const result = recordQuizResult(
      chapterNum,
      scorePercent,
      correctCount,
      questions.length,
      userAnswers
    );

    setResultData({
      score: scorePercent,
      correctCount,
      totalQuestions: questions.length,
      passed: result.passed
    });
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setResultData(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to={`/chapters/${chapterNum}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz & Return to Lesson</span>
        </Link>
      </div>

      {/* Render Results Card if submitted */}
      {isSubmitted && resultData ? (
        <QuizResultCard
          chapter={chapter}
          score={resultData.score}
          correctCount={resultData.correctCount}
          totalQuestions={resultData.totalQuestions}
          passed={resultData.passed}
          questions={questions}
          userAnswers={userAnswers}
          onRetry={handleRetry}
        />
      ) : (
        /* Active Quiz Runner */
        <div className="space-y-6">
          
          <QuizProgress
            currentQuestion={currentIndex}
            totalQuestions={questions.length}
            chapterTitle={`Chapter ${chapter.number}: ${chapter.title}`}
          />

          <QuizQuestion
            question={currentQuestion}
            selectedOption={selectedOption}
            onSelectOption={handleSelectOption}
            currentQuestionIndex={currentIndex}
            totalQuestions={questions.length}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                disabled={selectedOption === undefined}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-40 transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(userAnswers).length < questions.length}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-heading font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 disabled:opacity-40 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Quiz</span>
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
