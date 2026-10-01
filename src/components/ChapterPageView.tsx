import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Save,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Video,
  Code2,
  HelpCircle,
  FileCheck2,
  Sparkles,
  Award,
  Star,
  Clock,
  ExternalLink,
  ChevronRight,
  Edit2,
  Shield,
  X,
  Volume2,
  Layers,
  Copy,
  Check,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { executePythonCode } from '../services/pythonRunner';
import { PyBuddyCharacter, PyBuddyState } from './PyBuddyCharacter';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';

export const ChapterPageView: React.FC = () => {
  const {
    currentChapterId,
    chapters,
    currentUser,
    openChapter,
    completeChapter,
    savePracticeCode,
    submitAssignment,
    recordQuizScore,
    setActiveView,
    isAdmin,
    showToast,
  } = useAcademy();

  const chapter = chapters.find((c) => c.id === currentChapterId) || chapters[0];
  const isCompleted = currentUser?.completedChapterIds.includes(chapter.id);

  // PyBuddy Companion State
  const [buddyState, setBuddyState] = useState<PyBuddyState>('idle');

  // Practice state
  const [practiceCode, setPracticeCode] = useState(
    currentUser?.savedPractices[chapter.id] || chapter.practiceTemplate
  );
  const [practiceOutput, setPracticeOutput] = useState('');
  const [isRunningPractice, setIsRunningPractice] = useState(false);

  // Assignment state
  const [assignmentCode, setAssignmentCode] = useState(
    currentUser?.submittedAssignments[chapter.id]?.code ||
      `# Level ${chapter.stepNumber} Assignment: ${chapter.assignment.title}\n# Write your Python solution below:\n\n`
  );
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(
    !!currentUser?.submittedAssignments[chapter.id]
  );

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(
    currentUser?.quizScores[chapter.quiz?.id || ''] ?? null
  );

  // Completion modal state
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Reset when chapter changes
  useEffect(() => {
    setPracticeCode(
      currentUser?.savedPractices[chapter.id] || chapter.practiceTemplate
    );
    setPracticeOutput('');
    setAssignmentCode(
      currentUser?.submittedAssignments[chapter.id]?.code ||
        `# Level ${chapter.stepNumber} Assignment: ${chapter.assignment.title}\n# Write your Python solution below:\n\n`
    );
    setAssignmentSubmitted(!!currentUser?.submittedAssignments[chapter.id]);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(currentUser?.quizScores[chapter.quiz?.id || ''] ?? null);
  }, [chapter.id, currentUser]);

  const currentIndex = chapters.findIndex((c) => c.id === chapter.id);
  const goToNextChapter = () => {
    if (currentIndex < chapters.length - 1) {
      openChapter(chapters[currentIndex + 1].id);
    }
  };
  const goToPrevChapter = () => {
    if (currentIndex > 0) {
      openChapter(chapters[currentIndex - 1].id);
    }
  };

  // Run practice code using browser Pyodide runner
  const handleRunPractice = async () => {
    setIsRunningPractice(true);
    setBuddyState('walking');
    const res = await executePythonCode(practiceCode);
    setIsRunningPractice(false);
    setBuddyState('idle');
    setPracticeOutput(
      res.output || (res.error ? res.error : 'Code executed with no stdout output.')
    );
  };

  const handleSavePractice = () => {
    savePracticeCode(chapter.id, practiceCode);
    showToast('Practice code saved successfully!');
  };

  const handleResetPractice = () => {
    setPracticeCode(chapter.practiceTemplate);
    setPracticeOutput('');
    showToast('Practice code reset to initial template.');
  };

  const handleSubmitAssignmentCode = () => {
    submitAssignment(chapter.id, assignmentCode);
    setAssignmentSubmitted(true);
    setBuddyState('waving');
    showToast(`Assignment for Level ${chapter.stepNumber} submitted!`);
    setTimeout(() => setBuddyState('idle'), 2500);
  };

  const handleQuizOptionSelect = (qId: string, answer: any) => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: answer });
  };

  const handleEvaluateQuiz = () => {
    if (!chapter.quiz) return;
    let correct = 0;
    const questions = chapter.quiz.questions;

    questions.forEach((q) => {
      const studentAns = selectedAnswers[q.id];
      if (typeof q.correctAnswer === 'boolean') {
        if (studentAns === q.correctAnswer) correct++;
      } else if (typeof q.correctAnswer === 'string') {
        if (
          String(studentAns || '')
            .trim()
            .toLowerCase() === q.correctAnswer.trim().toLowerCase()
        ) {
          correct++;
        }
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    setQuizScore(percent);
    setQuizSubmitted(true);
    recordQuizScore(chapter.quiz.id, percent);
    showToast(`Quiz completed: ${percent}% score recorded!`);

    if (percent >= 70) {
      setBuddyState('celebrating');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#BFDFFF', '#F5F0FF', '#FFF4EC', '#FFD700'],
      });
      setTimeout(() => setBuddyState('idle'), 3000);
    }
  };

  const handleCopyExample = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // COMPLETE CHAPTER ACTION (Bottom of Page)
  const handleCompleteChapterClick = () => {
    completeChapter(chapter.id);
    setBuddyState('celebrating');
    setShowCompletionModal(true);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#BFDFFF', '#F5F0FF', '#FFF4EC', '#34d399', '#f59e0b'],
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-10 selection:bg-[#BFDFFF] selection:text-[#333333] animate-fadeIn pb-24">
      {/* 🧭 NAVIGATION BREADCRUMB */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView('dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <span>🏠 Learning Hub</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('learning_path')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F6FAF] hover:text-sky-700 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Island Roadmap</span>
          </button>
        </div>

        {/* PyBuddy Mini Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 border border-[#BFDFFF] shadow-xs text-xs font-semibold text-[#4F6FAF]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>PyBuddy is studying Level {chapter.stepNumber} with you! 🎒</span>
        </div>
      </div>

      {/* 1. TOP: CHAPTER TITLE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#EAF6FF] to-[#F5F0FF] border border-[#BFDFFF]/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-white border border-[#BFDFFF] shadow-2xs">
              LEVEL {chapter.stepNumber} OF {chapters.length}
            </span>
            <span>•</span>
            <span className="text-[#4F6FAF] font-medium">{chapter.subtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333333] tracking-tight">
            {chapter.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          {/* Completed Golden Star Indicator */}
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold shadow-2xs animate-pulse">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>Level Mastered ⭐</span>
            </div>
          )}

          {isAdmin ? (
            <button
              type="button"
              onClick={() => setActiveView('admin')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-700 font-bold hover:bg-purple-200 text-xs transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Admin: Edit Level</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-50 text-sky-700 text-[11px] font-semibold border border-sky-200">
              <Shield className="w-3.5 h-3.5 text-sky-500" />
              <span>Student View (Safe)</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. MIDDLE: LECTURE VIDEO */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
            <Video className="w-4 h-4 text-sky-500" />
            <span>Lecture Video: {chapter.videoTitle}</span>
          </div>
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span>{chapter.durationMinutes} min lesson</span>
          </span>
        </div>

        {/* Video Player (100% Free - Supports YouTube embeds, local uploaded files, and interactive visual slides) */}
        <UniversalVideoPlayer
          videoUrl={chapter.videoUrl}
          videoTitle={chapter.videoTitle}
          chapter={chapter}
          poster="/src/assets/images/study_desk_illustration_1790697938057.jpg"
        />
      </div>

      {/* 3. NOTES SECTION (Notebook Style) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
          <BookOpen className="w-4 h-4 text-purple-500" />
          <span>Student Notebook Notes</span>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#BFDFFF]/60 shadow-xs relative overflow-hidden">
          {/* Subtle notebook ruled lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '100% 28px',
            }}
          />
          <div className="relative z-10 prose prose-slate max-w-none text-xs leading-relaxed text-[#333333] whitespace-pre-line font-normal">
            {chapter.notes}
          </div>
        </div>
      </div>

      {/* 4. EXAMPLES */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
          <Code2 className="w-4 h-4 text-emerald-600" />
          <span>Code Examples & Concepts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.examples.map((ex, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#333333]">{ex.title}</h4>
                  <p className="text-[11px] text-[#4F6FAF] mt-0.5">{ex.explanation}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyExample(ex.code, `ex-${idx}`)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-sky-600 text-xs shadow-2xs transition-colors"
                  title="Copy code"
                >
                  {copiedCodeId === `ex-${idx}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-900 overflow-x-auto text-[11px] font-mono text-emerald-400">
                <pre>{ex.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PRACTICE QUESTIONS (Interactive Python Terminal) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
            <Play className="w-4 h-4 text-sky-600" />
            <span>Practice Questions: Interactive Code Sandbox</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Pyodide In-Browser Runner</span>
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-sky-200 shadow-xs space-y-4">
          <p className="text-xs text-[#333333] font-medium bg-sky-50/60 p-3 rounded-xl border border-sky-100">
            <strong>Task:</strong> Run and test the interactive code template below for Level {chapter.stepNumber} ({chapter.title}). Try altering variables and observing results.
          </p>

          {/* Interactive Code Editor */}
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs flex items-center justify-between font-mono">
              <span>main.py</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetPractice}
                  className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
                <button
                  type="button"
                  onClick={handleSavePractice}
                  className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Save className="w-3 h-3" /> Save
                </button>
              </div>
            </div>
            <textarea
              value={practiceCode}
              onChange={(e) => setPracticeCode(e.target.value)}
              rows={8}
              className="w-full p-4 bg-slate-900 text-sky-200 font-mono text-xs focus:outline-none resize-y"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleRunPractice}
              disabled={isRunningPractice}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunningPractice ? 'Executing Python...' : 'Run Code'}</span>
            </button>
          </div>

          {/* Terminal Output */}
          {practiceOutput && (
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
              <span className="text-[10px] text-slate-500 block mb-1">Terminal Output:</span>
              <pre className="whitespace-pre-wrap">{practiceOutput}</pre>
            </div>
          )}
        </div>
      </div>

      {/* 6. ASSIGNMENT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
            <FileCheck2 className="w-4 h-4 text-amber-600" />
            <span>Chapter Assignment: {chapter.assignment.title}</span>
          </div>
          {assignmentSubmitted && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Submitted
            </span>
          )}
        </div>

        <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-4">
          <p className="text-xs text-[#333333] leading-relaxed">
            {chapter.assignment.problemStatement}
          </p>

          <div className="rounded-2xl overflow-hidden border border-slate-200">
            <div className="px-4 py-2 bg-slate-800 text-slate-300 text-xs flex items-center justify-between font-mono">
              <span>assignment_solution.py</span>
            </div>
            <textarea
              value={assignmentCode}
              onChange={(e) => setAssignmentCode(e.target.value)}
              rows={8}
              className="w-full p-4 bg-slate-900 text-amber-100 font-mono text-xs focus:outline-none resize-y"
              placeholder="# Write your complete assignment solution here..."
              spellCheck={false}
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={handleSubmitAssignmentCode}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>{assignmentSubmitted ? 'Update Submission' : 'Submit Assignment'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. QUIZ */}
      {chapter.quiz && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#333333]">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>Level {chapter.stepNumber} Knowledge Evaluation</span>
            </div>
            {quizScore !== null && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                Score: {quizScore}%
              </span>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-200/70 shadow-xs space-y-6">
            {chapter.quiz.questions.map((q, idx) => {
              const currentAns = selectedAnswers[q.id];
              const isEvaluated = quizSubmitted;
              const isCorrect =
                isEvaluated &&
                (typeof q.correctAnswer === 'boolean'
                  ? currentAns === q.correctAnswer
                  : String(currentAns || '').trim().toLowerCase() ===
                    String(q.correctAnswer).trim().toLowerCase());

              return (
                <div key={q.id} className="space-y-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-[#333333] leading-relaxed">
                      {q.question}
                    </p>
                  </div>

                  {/* MCQ Options */}
                  {q.type === 'mcq' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                      {q.options.map((opt) => {
                        const isSelected = currentAns === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => handleQuizOptionSelect(q.id, opt)}
                            className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-purple-50 border-purple-400 text-purple-800 font-semibold'
                                : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* True / False */}
                  {q.type === 'true_false' && (
                    <div className="flex items-center gap-3 pl-7">
                      {[true, false].map((val) => (
                        <button
                          key={String(val)}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleQuizOptionSelect(q.id, val)}
                          className={`px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                            currentAns === val
                              ? 'bg-purple-50 border-purple-400 text-purple-800'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {val ? 'True' : 'False'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fill in Blank */}
                  {q.type === 'fill_blank' && (
                    <div className="pl-7">
                      <input
                        type="text"
                        disabled={quizSubmitted}
                        placeholder="Type answer here..."
                        value={currentAns || ''}
                        onChange={(e) => handleQuizOptionSelect(q.id, e.target.value)}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  )}

                  {/* Result explanation */}
                  {quizSubmitted && (
                    <div
                      className={`ml-7 p-3 rounded-xl text-xs ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <p className="font-bold">
                        {isCorrect ? '✓ Correct!' : `✗ Correct Answer: ${String(q.correctAnswer)}`}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-600">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button
                type="button"
                onClick={handleEvaluateQuiz}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-200 transition-all cursor-pointer"
              >
                Submit Chapter Quiz
              </button>
            ) : (
              <div className="p-3 rounded-2xl bg-purple-50 text-center text-xs font-bold text-purple-800">
                Quiz Evaluation Recorded!
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. BOTTOM: COMPLETE CHAPTER BUTTON & ROADMAP MOVEMENT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-sky-50 to-purple-50 border border-emerald-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#333333]">
              Finished Studying Level {chapter.stepNumber}?
            </h3>
            <p className="text-xs text-[#4F6FAF] mt-0.5">
              Click below to mark complete, trigger golden star celebration, and guide PyBuddy forward along the roadmap!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={goToPrevChapter}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
          >
            ← Prev
          </button>

          <button
            type="button"
            onClick={handleCompleteChapterClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white text-xs font-bold shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Complete Chapter & Earn Star ⭐</span>
          </button>

          <button
            type="button"
            onClick={goToNextChapter}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <span>Next →</span>
          </button>
        </div>
      </div>

      {/* 🎉 LEVEL COMPLETION CELEBRATION MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md p-8 rounded-3xl bg-white border-2 border-emerald-200 shadow-2xl text-center space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowCompletionModal(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-4 top-4 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* PyBuddy Celebrating */}
            <div className="flex justify-center pt-2">
              <PyBuddyCharacter
                state="celebrating"
                speechText="Level Cleared! PyBuddy celebrates! ⭐"
                size="md"
              />
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Level {chapter.stepNumber} Cleared!</span>
              </div>

              <h3 className="text-xl font-extrabold text-[#333333]">
                Milestone Reached!
              </h3>
              <p className="text-xs text-[#4F6FAF] mt-1 leading-relaxed">
                You've successfully mastered <strong>{chapter.title}</strong>!
                The roadmap node is glowing, a golden star has been awarded, and PyBuddy is ready to guide you to the next chapter.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  goToNextChapter();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-sky-200 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Next Level</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  setActiveView('learning_path');
                }}
                className="w-full py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer"
              >
                Return to Roadmap Trail 🗺️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
