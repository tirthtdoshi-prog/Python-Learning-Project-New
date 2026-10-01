import React from 'react';
import {
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  Star,
  Trophy,
  Zap,
  Target,
  BookOpen,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface Badge {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  isUnlocked: boolean;
}

export const AchievementCenterView: React.FC = () => {
  const { currentUser, chapters, setActiveView } = useAcademy();

  if (!currentUser) return null;

  const completedCount = currentUser.completedChapterIds.length;
  const quizCount = Object.keys(currentUser.quizScores).length;

  const badges: Badge[] = [
    {
      id: 'b-1',
      title: 'First Python Step',
      description: 'Cleared Chapter 1 (Introduction to Python)',
      category: 'Milestones',
      icon: '🌱',
      isUnlocked: currentUser.completedChapterIds.includes('step-1'),
    },
    {
      id: 'b-2',
      title: 'Logic Pathfinder',
      description: 'Conquered Chapter 7 (Conditional Statements & Logic)',
      category: 'Logic',
      icon: '🧠',
      isUnlocked: currentUser.completedChapterIds.includes('step-7'),
    },
    {
      id: 'b-3',
      title: 'Loop Master',
      description: 'Successfully navigated Chapter 8 (Loops & Iterations)',
      category: 'Iteration',
      icon: '🔄',
      isUnlocked: currentUser.completedChapterIds.includes('step-8'),
    },
    {
      id: 'b-4',
      title: 'Quiz Ace',
      description: 'Completed 3 or more chapter evaluation quizzes',
      category: 'Assessments',
      icon: '🎯',
      isUnlocked: quizCount >= 3,
    },
    {
      id: 'b-5',
      title: 'Data Architect',
      description: 'Mastered Lists, Tuples, Dictionaries, and Sets (Chapters 10-13)',
      category: 'Data Structures',
      icon: '📦',
      isUnlocked: ['step-10', 'step-11', 'step-12', 'step-13'].every((id) =>
        currentUser.completedChapterIds.includes(id)
      ),
    },
    {
      id: 'b-6',
      title: 'OOP Pioneer',
      description: 'Conquered Chapter 16 (Object Oriented Programming)',
      category: 'OOP',
      icon: '🏛️',
      isUnlocked: currentUser.completedChapterIds.includes('step-16'),
    },
    {
      id: 'b-7',
      title: 'Capstone Champion',
      description: 'Finished all 18 curriculum chapters and project milestones',
      category: 'Mastery',
      icon: '👑',
      isUnlocked: completedCount >= chapters.length,
    },
  ];

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-white to-purple-50 border border-amber-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-amber-800 border border-amber-200 mb-2 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Honors & Success Wall</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Achievement & Honors Center
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Celebrate your Python learning milestones, unlock skill badges, track your learning streak, and review achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('dashboard')}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 cursor-pointer"
        >
          ← Back to Learning Hub
        </button>
      </div>

      {/* 2. Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-amber-600 block">
            {unlockedCount} / {badges.length}
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">
            Badges Earned
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-2">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-rose-600 block">
            5 Days
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">
            Learning Streak
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-sky-600 block">
            {completedCount}
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">
            Chapters Cleared
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-600 block">
            980 XP
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">
            Knowledge Points
          </span>
        </div>
      </div>

      {/* 3. Badge Gallery */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-[#333333]">
          Official Academy Badges Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between select-none ${
                b.isUnlocked
                  ? 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 border-amber-300 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{b.icon}</span>
                  {b.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-[#333333]">
                  {b.title}
                </h3>
                <p className="text-xs text-[#4F6FAF] mt-1 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>{b.category}</span>
                {b.isUnlocked && (
                  <span className="text-amber-600 font-bold">★ Active</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
