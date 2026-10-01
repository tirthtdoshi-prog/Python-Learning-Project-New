import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Printer,
  Share2,
  Lock,
  ArrowRight,
  Compass,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const CertificateView: React.FC = () => {
  const { currentUser, claimCertificate, chapters, showToast, setActiveView, openChapter } = useAcademy();

  if (!currentUser) return null;

  const totalChapters = chapters.length;
  const completedCount = currentUser.completedChapterIds.length;
  const isUnlocked = currentUser.role === 'admin' || completedCount >= totalChapters;
  const progressPercent = Math.round((completedCount / totalChapters) * 100);

  const nextChapter =
    chapters.find((c) => !currentUser.completedChapterIds.includes(c.id)) ||
    chapters[chapters.length - 1];

  const [activeCert, setActiveCert] = useState(
    currentUser.certificates[0] || null
  );

  const handleClaim = () => {
    const cert = claimCertificate();
    if (cert) {
      setActiveCert(cert);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#F59E0B', '#38BDF8', '#34D399'],
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `I earned my Python Programming Certificate from Python Learning Academy! Certificate ID: ${activeCert?.certificateId || 'PLA-PY-2026'}`
    );
    showToast('Certificate details copied to clipboard!');
  };

  // LOCKED STATE: STUDENT HAS NOT COMPLETED ALL 18 CHAPTERS
  if (!isUnlocked) {
    return (
      <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8 animate-fadeIn pb-24">
        {/* Lock Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-white to-sky-50 border border-amber-200/80 p-8 sm:p-10 text-center space-y-5 shadow-sm relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md border-2 border-amber-200 animate-pulse">
            <Lock className="w-10 h-10" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-extrabold">
              <Lock className="w-3.5 h-3.5" />
              <span>CERTIFICATE CURRENTLY LOCKED</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333333]">
              Clear All 18 Chapters to Unlock Your Certificate
            </h1>

            <p className="text-xs sm:text-sm text-[#4F6FAF] leading-relaxed">
              Official certification from Python Learning Academy is awarded exclusively to students who finish every chapter milestone on the learning roadmap.
            </p>
          </div>

          {/* Progress Tracker Bar */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Coursework Clearance</span>
              <span className="text-amber-800">{completedCount} of {totalChapters} Chapters ({progressPercent}%)</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 font-medium text-left">
              🔒 Remaining: <strong>{totalChapters - completedCount}</strong> more chapters needed to unlock this credential.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openChapter(nextChapter.id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-sky-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue Learning: Level {nextChapter.stepNumber} ({nextChapter.title})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setActiveView('learning_path')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Open Learning Roadmap</span>
            </button>
          </div>
        </div>

        {/* Milestone Checklist */}
        <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-[#333333] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>18-Level Milestone Checklist</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {completedCount}/{totalChapters} Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapters.map((ch) => {
              const isDone = currentUser.completedChapterIds.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  onClick={() => openChapter(ch.id)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    isDone
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-sky-50 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="font-mono text-[10px] opacity-70">#{ch.stepNumber}</span>
                    <span className="font-semibold truncate">{ch.title}</span>
                  </div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED STATE: ALL CHAPTERS CLEARED
  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-100/70 via-white to-emerald-50 p-6 sm:p-8 border border-amber-200/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-extrabold text-emerald-800 border border-emerald-200 shadow-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>ALL CHAPTERS CLEARED • CERTIFICATE UNLOCKED</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Academic Certificate of Completion
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Congratulations! You have mastered the complete 18-level Python curriculum.
          </p>
        </div>

        {activeCert && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        )}
      </div>

      {/* Claim Banner if not claimed */}
      {!activeCert && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Claim Your Verified Python Credential
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              All 18 levels have been cleared! Click below to generate your personalized credential with unique ID and academy accreditation.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={handleClaim}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Generate Verified Certificate 🎓
            </button>
          </div>
        </div>
      )}

      {/* Aesthetic Certificate Layout */}
      {activeCert && (
        <div className="p-4 sm:p-8 bg-amber-50/20 rounded-3xl border border-amber-200/60 flex justify-center">
          <div
            id="certificate-print-area"
            className="w-full max-w-3xl rounded-3xl border-8 border-double border-amber-300/80 bg-gradient-to-br from-white via-amber-50/20 to-white p-8 sm:p-12 text-center text-slate-800 shadow-xl relative"
          >
            {/* Top decorative header */}
            <div className="flex items-center justify-between text-[11px] font-mono text-amber-700/80 uppercase tracking-widest pb-6 border-b border-amber-200/50">
              <span>Python Learning Academy</span>
              <span>Accredited Credential</span>
            </div>

            {/* Seal Emblem */}
            <div className="mt-8 mx-auto w-24 h-24 rounded-full border-2 border-amber-400 p-1 shadow-md bg-white">
              <img
                src="/src/assets/images/academy_seal_emblem_1790697105797.jpg"
                alt="Academy Academic Seal"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="mt-6 text-xs uppercase font-bold tracking-widest text-amber-600">
              Certificate of Academic Excellence
            </p>

            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 font-serif">
              Python Programming Mastery
            </h2>

            <p className="mt-4 text-xs text-slate-500 italic">This is proudly presented to</p>

            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-sky-700 tracking-wide font-serif">
              {activeCert.studentName}
            </h3>

            <p className="mt-4 max-w-lg mx-auto text-xs text-slate-600 leading-relaxed">
              for successfully completing the 18-level structured adventure roadmap, practical coding assignments, and chapter assessments in{' '}
              <strong className="text-slate-800">{activeCert.courseName}</strong>.
            </p>

            {/* Verification & Signatures */}
            <div className="mt-12 pt-8 border-t border-amber-200/60 grid grid-cols-3 items-end text-xs">
              <div className="text-center">
                <p className="font-serif italic text-sm text-slate-700">Guido & Academic Board</p>
                <div className="w-24 h-0.5 bg-slate-300 mx-auto mt-1" />
                <span className="text-[10px] text-slate-400 mt-1 block">Course Director</span>
              </div>

              <div className="text-center">
                <span className="font-mono text-xs font-bold text-slate-700 block">
                  ID: {activeCert.certificateId}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
                  ✓ Verified Online
                </span>
              </div>

              <div className="text-center">
                <p className="font-mono text-xs text-slate-700">{activeCert.completionDate}</p>
                <div className="w-24 h-0.5 bg-slate-300 mx-auto mt-1" />
                <span className="text-[10px] text-slate-400 mt-1 block">Date of Issue</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
