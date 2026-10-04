import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { CHAPTERS_DATA } from '../data/chapters';
import { QUESTIONS_DATA } from '../data/questions';
import QuizQuestion from '../components/QuizQuestion';
import QuizProgress from '../components/QuizProgress';
import QuizResultCard from '../components/QuizResultCard';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { evaluateTextAnswer } from '../utils/quizEvaluation';
import { randomizeQuizQuestions } from '../utils/quizRandomization';

const QUIZ_DURATION_SECONDS = 30 * 60;

export default function QuizPage() {
  const { chapterId } = useParams();
  const { recordQuizResult, progress } = useProgress();

  const chapterNum = Number(chapterId);
  const chapter = CHAPTERS_DATA.find(c => c.id === chapterNum);
  const baseQuestions = QUESTIONS_DATA[chapterNum] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState(() => randomizeQuizQuestions(baseQuestions));
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(QUIZ_DURATION_SECONDS);

  useEffect(() => {
    setCurrentIndex(0);
    setQuestions(randomizeQuizQuestions(QUESTIONS_DATA[chapterNum] || []));
    setUserAnswers({});
    setIsSubmitted(false);
    setResultData(null);
    setTimeRemaining(QUIZ_DURATION_SECONDS);
  }, [chapterNum]);

  const unlockedChapters = progress?.unlockedChapters || [1];
  const isUnlocked = unlockedChapters.includes(chapterNum);

  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasAnswer = currentQuestion?.type === 'text'
    ? Boolean(String(selectedOption || '').trim())
    : selectedOption !== undefined;
  const allQuestionsAnswered = questions.every((question, index) => (
    question.type === 'text'
      ? Boolean(String(userAnswers[index] || '').trim())
      : userAnswers[index] !== undefined
  ));

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

  const handleSubmit = (timedOut = false) => {
    let correctCount = 0;
    let earnedPoints = 0;
    const answerResults = {};
    questions.forEach((q, idx) => {
      if (q.type === 'text') {
        const grade = evaluateTextAnswer(q, userAnswers[idx]);
        answerResults[idx] = grade;
        earnedPoints += grade.score;
        if (grade.score === 1) correctCount += 1;
      } else if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
        earnedPoints += 1;
        answerResults[idx] = { score: 1 };
      } else {
        answerResults[idx] = { score: 0 };
      }
    });

    const partialCount = Object.values(answerResults).filter((answer) => answer.score === 0.5).length;
    const scorePercent = Math.round((earnedPoints / questions.length) * 100);

    const result = recordQuizResult(
      chapterNum,
      scorePercent,
      correctCount,
      questions.length,
      userAnswers,
      partialCount
    );

    setResultData({
      score: scorePercent,
      correctCount,
      partialCount,
      totalQuestions: questions.length,
      passed: result.passed,
      timedOut,
      answerResults
    });
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setQuestions(randomizeQuizQuestions(baseQuestions));
    setUserAnswers({});
    setIsSubmitted(false);
    setResultData(null);
    setTimeRemaining(QUIZ_DURATION_SECONDS);
  };

  useEffect(() => {
    if (isSubmitted) return undefined;
    if (timeRemaining === 0) {
      handleSubmit(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setTimeRemaining((remaining) => remaining - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [timeRemaining, isSubmitted, handleSubmit]);

  if (!chapter || questions.length === 0) {
    return <Navigate to="/chapters" replace />;
  }

  if (!isUnlocked) {
    return <Navigate to={`/chapters/${chapterNum}`} replace />;
  }

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
          timedOut={resultData.timedOut}
          partialCount={resultData.partialCount}
          questions={questions}
          userAnswers={userAnswers}
          answerResults={resultData.answerResults}
          onRetry={handleRetry}
        />
      ) : (
        /* Active Quiz Runner */
        <div className="space-y-6">
          
          <QuizProgress
            currentQuestion={currentIndex}
            totalQuestions={questions.length}
            chapterTitle={`Chapter ${chapter.number}: ${chapter.title}`}
            timeRemaining={timeRemaining}
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
                disabled={!hasAnswer}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-40 transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
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
