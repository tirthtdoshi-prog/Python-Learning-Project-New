import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  Clock,
  Send,
  Code2,
  BookOpen,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const AssignmentsView: React.FC = () => {
  const { chapters, currentUser, submitAssignment, openChapter, showToast } = useAcademy();

  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0].id);
  const activeChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  const submission = currentUser?.submittedAssignments[activeChapter.id];
  const [code, setCode] = useState(
    submission ? submission.code : activeChapter.assignment.starterCode
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssignment(activeChapter.id, code);
  };

  const handleSelectChapter = (id: string) => {
    setActiveChapterId(id);
    const sub = currentUser?.submittedAssignments[id];
    const chap = chapters.find((c) => c.id === id) || chapters[0];
    setCode(sub ? sub.code : chap.assignment.starterCode);
  };

  const totalAssignments = chapters.length;
  const submittedCount = Object.keys(currentUser?.submittedAssignments || {}).length;

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-100/70 via-white to-sky-50 p-6 sm:p-8 border border-amber-200/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-amber-700 border border-amber-200 shadow-xs mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Practical Coursework</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Student Assignments
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Submit your chapter problem solutions for instructor evaluation and track your submission records.
          </p>
        </div>

        <div className="text-center p-4 rounded-2xl bg-white border border-amber-100 shadow-xs shrink-0">
          <p className="text-xs font-semibold text-slate-500">Submission Progress</p>
          <p className="text-2xl font-bold text-amber-600 mt-0.5">
            {submittedCount} / {totalAssignments}
          </p>
          <span className="text-[10px] text-slate-400">Chapters Completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Assignment List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Chapter Assignments
          </h3>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {chapters.map((chap) => {
              const isSelected = chap.id === activeChapterId;
              const sub = currentUser?.submittedAssignments[chap.id];
              return (
                <div
                  key={chap.id}
                  onClick={() => handleSelectChapter(chap.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      Step {chap.stepNumber}: {chap.title}
                    </span>
                    {sub ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3" /> Submitted
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Pending</span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                    {chap.assignment.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Assignment Workspace (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-amber-600">
                Step {activeChapter.stepNumber} Assignment
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-0.5">
                {activeChapter.assignment.title}
              </h2>
            </div>

            <button
              onClick={() => openChapter(activeChapter.id)}
              className="text-xs text-sky-600 hover:text-sky-700 font-semibold"
            >
              Open Chapter Notes →
            </button>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 mb-1">
              Problem Description:
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed p-4 rounded-2xl bg-slate-50 border border-slate-100">
              {activeChapter.assignment.problemStatement}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-slate-700">Your Python Solution:</span>
                <span className="text-[11px] text-slate-400">
                  {submission ? `Last submitted on ${submission.date}` : 'Not submitted yet'}
                </span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                spellCheck={false}
                className="w-full p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 bg-white focus:outline-none focus:border-amber-400 leading-relaxed shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 italic">
                💡 Hint: {activeChapter.assignment.hints[0]}
              </span>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submission ? 'Update Submission' : 'Submit Assignment'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
