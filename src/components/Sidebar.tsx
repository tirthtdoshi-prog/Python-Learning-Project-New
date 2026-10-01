import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Code2,
  HelpCircle,
  FileCheck2,
  Award,
  User,
  LogOut,
  Shield,
  GraduationCap,
  Lock,
  Video,
  Rocket,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useAcademy, ActiveView } from '../context/AcademyContext';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    logout,
    isAdmin,
    chapters,
    currentChapterId,
    openChapter,
  } = useAcademy();

  const [chaptersExpanded, setChaptersExpanded] = useState(true);

  const totalChapters = chapters.length;
  const completedCount = currentUser?.completedChapterIds.length ?? 0;
  const isCertLocked = !isAdmin && completedCount < totalChapters;

  const mainNavItems: {
    id: ActiveView;
    label: string;
    icon: React.ElementType;
    badge?: string;
    isLocked?: boolean;
  }[] = [
    { id: 'dashboard', label: 'Dashboard Hub', icon: LayoutDashboard },
    { id: 'learning_path', label: 'Learning Roadmap', icon: Compass, badge: 'Adventure' },
    { id: 'video_library', label: 'Video Library', icon: Video, badge: '18 Vids' },
    { id: 'practice', label: 'Practice Lab', icon: Code2 },
    { id: 'quizzes', label: 'Quiz Center', icon: HelpCircle },
    { id: 'assignments', label: 'Assignments', icon: FileCheck2 },
    { id: 'projects', label: 'Project Studio', icon: Rocket, badge: 'Capstones' },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: isCertLocked ? Lock : Award,
      badge: isCertLocked ? `🔒 ${completedCount}/${totalChapters}` : '⭐ Unlocked',
      isLocked: isCertLocked,
    },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white/90 backdrop-blur-md border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen">
      {/* Top Brand Logo */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-400 flex items-center justify-center text-white shadow-sm shadow-sky-200 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-sm font-extrabold text-[#333333] tracking-tight truncate">
              Python Academy
            </h2>
            <p className="text-[11px] text-sky-600 font-semibold truncate">
              Learning Academy
            </p>
          </div>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1 text-xs">
          {/* Main Hub & Roadmap */}
          {mainNavItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-200/80'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
                {item.badge && !isActive && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-md bg-sky-100 text-sky-700 text-[9px] font-extrabold shrink-0">
                    {item.badge}
                  </span>
                )}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />}
              </button>
            );
          })}

          {/* DEDICATED CHAPTERS SUBMENU */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setChaptersExpanded(!chaptersExpanded)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                <span>Chapters (18)</span>
              </span>
              {chaptersExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {chaptersExpanded && (
              <div className="mt-1 space-y-0.5 max-h-48 overflow-y-auto pl-2 pr-1 border-l-2 border-sky-100 ml-3">
                {chapters.map((ch) => {
                  const isActive = activeView === 'chapter' && currentChapterId === ch.id;
                  const isDone = currentUser?.completedChapterIds.includes(ch.id);

                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => openChapter(ch.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left truncate cursor-pointer ${
                        isActive
                          ? 'bg-sky-100/80 text-sky-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                      }`}
                      title={ch.title}
                    >
                      <span className="font-mono text-[9px] text-slate-400 shrink-0">
                        #{ch.stepNumber}
                      </span>
                      <span className="truncate flex-1">{ch.title}</span>
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Additional Features (Video Library, Practice, Quizzes, Assignments, Projects, Certificates, Profile) */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            {mainNavItems.slice(2).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-200/80'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                  {item.badge && !isActive && (
                    <span
                      className={`ml-auto px-1.5 py-0.5 rounded-md text-[9px] font-extrabold shrink-0 ${
                        item.isLocked
                          ? 'bg-amber-100/90 text-amber-800'
                          : 'bg-sky-100 text-sky-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Admin link if user is admin */}
          {isAdmin && (
            <div className="pt-2 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveView('admin')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeView === 'admin'
                    ? 'bg-purple-50 text-purple-700 shadow-xs border border-purple-200'
                    : 'text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Shield className="w-4 h-4 shrink-0 text-purple-500" />
                <span>Admin Panel</span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Profile card & Logout (NO user/admin photo) */}
      <div className="p-3 border-t border-slate-100 shrink-0">
        {currentUser && (
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 mb-2 flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs shrink-0 ${
                currentUser.role === 'admin'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-sky-100 text-sky-700 border border-sky-200'
              }`}
            >
              {currentUser.role === 'admin' ? (
                <Shield className="w-4 h-4 text-purple-600" />
              ) : (
                <span>
                  {currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {currentUser.role === 'admin' ? 'Administrator' : 'Student Learner'}
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-xl text-xs font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
