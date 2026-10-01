import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const QuizSection: React.FC = () => {
  const { chapters, recordQuizScore, currentUser, openChapter } = useAcademy();

  const [selectedStep, setSelectedStep] = useState(1);
  const activeChapter =
    chapters.find((c) => c.stepNumber === selectedStep) || chapters[0];
  const activeQuiz = activeChapter.quiz;

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(activeQuiz.timeLimitSeconds);
  const [timerRunning, setTimerRunning] = useState(true);

  // Switch quiz
  const handleSelectQuiz = (stepNum: number) => {
    setSelectedStep(stepNum);
    const chap = chapters.find((c) => c.stepNumber === stepNum) || chapters[0];
    setAnswers({});
    setIsSubmitted(false);
    setTimeLeft(chap.quiz.timeLimitSeconds);
    setTimerRunning(true);
  };

  // Timer effect
  useEffect(() => {
    if (!timerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isSubmitted]);

  const handleAnswerSelect = (qId: string, val: any) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    setTimerRunning(false);

    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      const studentAns = answers[q.id];
      if (q.type === 'fill_blank') {
        if (
          typeof studentAns === 'string' &&
          studentAns.trim().toLowerCase() === String(q.correctAnswer).toLowerCase()
        ) {
          correctCount++;
        }
      } else {
        if (studentAns === q.correctAnswer) {
          correctCount++;
        }
      }
    });

    const scorePercent = Math.round(
      (correctCount / activeQuiz.questions.length) * 100
    );
    recordQuizScore(activeQuiz.id, scorePercent);
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setTimeLeft(activeQuiz.timeLimitSeconds);
    setTimerRunning(true);
  };

  // Score stats
  let correctCount = 0;
  if (isSubmitted) {
    activeQuiz.questions.forEach((q) => {
      const studentAns = answers[q.id];
      const isCorrect =
        q.type === 'fill_blank'
          ? typeof studentAns === 'string' &&
            studentAns.trim().toLowerCase() === String(q.correctAnswer).toLowerCase()
          : studentAns === q.correctAnswer;
      if (isCorrect) correctCount++;
    });
  }
  const scorePercent = Math.round(
    (correctCount / activeQuiz.questions.length) * 100
  );

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-100/70 via-white to-sky-50 p-6 sm:p-8 border border-purple-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-purple-700 border border-purple-200 shadow-xs mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
            <span>Interactive Self-Assessment</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Chapter Knowledge Quizzes
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            MCQ, True/False, and Fill in the Blank quizzes with automatic grading and helpful explanations.
          </p>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-purple-100 shadow-xs">
          <Timer className="w-4 h-4 text-purple-600" />
          <span className="font-mono text-sm font-bold text-slate-800">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">
          Select Quiz by Chapter:
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {chapters.map((chap) => {
            const isSelected = chap.stepNumber === selectedStep;
            const pastScore = currentUser?.quizScores[chap.quiz.id];
            return (
              <button
                key={chap.id}
                onClick={() => handleSelectQuiz(chap.stepNumber)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-purple-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Step {chap.stepNumber}
                {pastScore !== undefined && (
                  <span className="ml-1 text-[10px] opacity-80">({pastScore}%)</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {activeQuiz.title}
            </h3>
            <p className="text-xs text-slate-500">
              Step {activeChapter.stepNumber}: {activeChapter.title} · {activeQuiz.questions.length} Questions
            </p>
          </div>

          {currentUser?.quizScores[activeQuiz.id] !== undefined && (
            <div className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Highest Score: {currentUser.quizScores[activeQuiz.id]}%
            </div>
          )}
        </div>

        {/* Score Card on Submit */}
        {isSubmitted && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-sky-50 to-emerald-50 border border-purple-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white shadow-xs mx-auto flex items-center justify-center text-purple-600">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">
              Quiz Completed! Score: {scorePercent}%
            </h4>
            <p className="text-xs text-slate-600">
              You answered {correctCount} of {activeQuiz.questions.length} questions correctly.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={() => openChapter(activeChapter.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Review Chapter Notes</span>
              </button>
            </div>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-6">
          {activeQuiz.questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect =
              q.type === 'fill_blank'
                ? typeof userAns === 'string' &&
                  userAns.trim().toLowerCase() === String(q.correctAnswer).toLowerCase()
                : userAns === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/80 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    {idx + 1}. {q.question}
                  </h4>
                  {isSubmitted && (
                    <span
                      className={`text-xs font-bold flex items-center gap-1 shrink-0 ${
                        isCorrect ? 'text-emerald-600' : 'text-rose-500'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Incorrect
                        </>
                      )}
                    </span>
                  )}
                </div>

                {q.codeSnippet && (
                  <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs">
                    <pre>{q.codeSnippet}</pre>
                  </div>
                )}

                {/* Question Types: MCQ, True/False, Fill in blank */}
                {q.type === 'mcq' && q.options && (
                  <div className="space-y-2 mt-2">
                    {q.options.map((opt) => {
                      const checked = userAns === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, opt)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            checked
                              ? 'bg-purple-50 border-purple-400 font-semibold text-purple-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              checked ? 'border-purple-600 bg-purple-600' : 'border-slate-300'
                            }`}
                          >
                            {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[true, false].map((val) => {
                      const checked = userAns === val;
                      return (
                        <button
                          key={String(val)}
                          type="button"
                          onClick={() => handleAnswerSelect(q.id, val)}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                            checked
                              ? 'bg-purple-50 border-purple-400 text-purple-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {val ? 'True' : 'False'}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'fill_blank' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={userAns || ''}
                      onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-purple-400"
                    />
                  </div>
                )}

                {/* Explanation on submit */}
                {isSubmitted && (
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Submit Quiz for Checking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
