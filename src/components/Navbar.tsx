import React, { useState } from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  Compass,
  BookOpen,
  Video,
  Code2,
  HelpCircle,
  FileCheck2,
  Rocket,
  Award,
  User,
  LogOut,
  Shield,
  Lock,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  Library,
  Trophy,
  Calendar,
  Edit3,
  Users,
  Grid,
} from 'lucide-react';
import { useAcademy, ActiveView } from '../context/AcademyContext';
import { PublishFreeModal } from './PublishFreeModal';

export const Navbar: React.FC = () => {
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chaptersDropdownOpen, setChaptersDropdownOpen] = useState(false);
  const [centersDropdownOpen, setCentersDropdownOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  if (!currentUser) return null;

  const totalChapters = chapters.length;
  const completedCount = currentUser.completedChapterIds.length;
  const isCertLocked = !isAdmin && completedCount < totalChapters;

  const primaryNavLinks: {
    id: ActiveView;
    label: string;
    icon: React.ElementType;
    badge?: string;
    isLocked?: boolean;
  }[] = [
    { id: 'dashboard', label: 'Hub', icon: LayoutDashboard },
    { id: 'learning_path', label: 'Roadmap', icon: Compass },
    { id: 'video_library', label: 'Videos', icon: Video },
    { id: 'practice', label: 'Practice', icon: Code2 },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'projects', label: 'Projects', icon: Rocket },
    {
      id: 'certificates',
      label: 'Certificate',
      icon: isCertLocked ? Lock : Award,
      badge: isCertLocked ? '🔒' : '⭐',
      isLocked: isCertLocked,
    },
  ];

  const moreCenters: { id: ActiveView; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'interview', label: 'Interview Center', icon: Briefcase, desc: 'Technical Q&A & Viva' },
    { id: 'resources', label: 'Resource Library', icon: Library, desc: 'Handbooks & Docs' },
    { id: 'achievements', label: 'Achievement Center', icon: Trophy, desc: 'Badges & Streaks' },
    { id: 'planner', label: 'Study Planner', icon: Calendar, desc: 'Daily Goals & Schedule' },
    { id: 'journal', label: 'Learning Journal', icon: Edit3, desc: 'Personal Notes' },
    { id: 'community', label: 'Community Section', icon: Users, desc: 'Student Forum' },
    { id: 'assignments', label: 'Assignments', icon: FileCheck2, desc: 'Problem Submissions' },
    { id: 'profile', label: 'Profile Center', icon: User, desc: 'Account Details' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 1. Left: Brand Logo & Title */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setActiveView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shadow-xs shadow-sky-200 transition-transform group-hover:scale-105">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm text-[#333333] tracking-tight block group-hover:text-sky-600 transition-colors">
                  Python Academy
                </span>
                <span className="text-[10px] text-sky-600 font-semibold block -mt-0.5">
                  Learning Academy
                </span>
              </div>
            </button>

            {/* Quick Chapters Dropdown Trigger */}
            <div className="relative hidden xl:block">
              <button
                type="button"
                onClick={() => setChaptersDropdownOpen(!chaptersDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span>Chapters (18)</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {chaptersDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setChaptersDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-64 max-h-96 overflow-y-auto rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-scaleUp">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                      Select Chapter Deck
                    </div>
                    {chapters.map((ch) => {
                      const isDone = currentUser.completedChapterIds.includes(ch.id);
                      const isCurrent = activeView === 'chapter' && currentChapterId === ch.id;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => {
                            openChapter(ch.id);
                            setChaptersDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                            isCurrent
                              ? 'bg-sky-50 text-sky-700 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate pr-2">
                            #{ch.stepNumber} {ch.title}
                          </span>
                          {isDone ? (
                            <span className="text-emerald-500 font-bold text-[10px]">✓</span>
                          ) : (
                            <span className="text-slate-300 text-[10px]">→</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 2. Center: Desktop Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-2xs border border-sky-200/80 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-sky-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] ml-0.5">{item.badge}</span>
                  )}
                </button>
              );
            })}

            {/* "More Centers" Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCentersDropdownOpen(!centersDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  moreCenters.some((c) => c.id === activeView)
                    ? 'bg-sky-50 text-sky-700 border border-sky-200/80 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                <span>More Centers</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {centersDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCentersDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-scaleUp">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                      Academic Centers
                    </div>
                    {moreCenters.map((center) => {
                      const Icon = center.icon;
                      const isCenterActive = activeView === center.id;
                      return (
                        <button
                          key={center.id}
                          type="button"
                          onClick={() => {
                            setActiveView(center.id);
                            setCentersDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                            isCenterActive
                              ? 'bg-sky-50 text-sky-800 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="block font-bold">{center.label}</span>
                            <span className="block text-[10px] text-slate-400">{center.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* 3. Right: Publish Free + Admin + User Monogram + Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 100% Free Publish / Export button */}
            <button
              type="button"
              onClick={() => setPublishModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-xs hover:shadow-emerald-200 cursor-pointer"
              title="Publish or share this site 100% free with zero cloud billing"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Publish Free</span>
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={() => setActiveView('admin')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeView === 'admin'
                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100/80 border border-purple-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-600" />
                <span>Admin</span>
              </button>
            )}

            {/* User Profile Monogram Badge */}
            <button
              type="button"
              onClick={() => setActiveView('profile')}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
              title="View Profile"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shadow-xs shrink-0 ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-sky-100 text-sky-700 border border-sky-200'
                }`}
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-purple-600" />
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
              <span className="hidden sm:inline text-xs font-bold text-slate-700 truncate max-w-[100px]">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-1.5 animate-fadeIn max-h-[80vh] overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Hub Destinations
          </div>
          {primaryNavLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold">{item.badge}</span>
                )}
              </button>
            );
          })}

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-t border-slate-100">
            More Academic Centers
          </div>
          {moreCenters.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] text-slate-400">{item.desc}</span>
              </button>
            );
          })}

          {isAdmin && (
            <button
              type="button"
              onClick={() => {
                setActiveView('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 cursor-pointer mt-2"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
          )}
        </div>
      )}

      {/* 100% Free Publish / Export Modal */}
      <PublishFreeModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
      />
    </header>
  );
};
