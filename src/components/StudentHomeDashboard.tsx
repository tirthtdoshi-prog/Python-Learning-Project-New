import React from 'react';
import {
  BookOpen,
  Video,
  Code2,
  FileCheck2,
  Rocket,
  Briefcase,
  Library,
  TrendingUp,
  Trophy,
  Calendar,
  Edit3,
  Users,
  Award,
  User,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useAcademy, ActiveView } from '../context/AcademyContext';

interface HubDestination {
  id: ActiveView;
  title: string;
  badge: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  borderColor: string;
  features: string[];
  action: string;
}

export const StudentHomeDashboard: React.FC = () => {
  const {
    currentUser,
    chapters,
    openChapter,
    setActiveView,
    isAdmin,
  } = useAcademy();

  if (!currentUser) return null;

  const totalChapters = chapters.length;
  const completedCount = currentUser.completedChapterIds.length;
  const isCertLocked = !isAdmin && completedCount < totalChapters;

  const nextChapter =
    chapters.find((c) => !currentUser.completedChapterIds.includes(c.id)) ||
    chapters[0];

  const destinations: HubDestination[] = [
    {
      id: 'chapter',
      title: 'LEARNING CENTER',
      badge: '18 Chapters',
      icon: BookOpen,
      gradient: 'from-sky-50 via-white to-blue-50/50',
      iconColor: 'bg-sky-100 text-sky-700 border-sky-200',
      borderColor: 'hover:border-sky-300 hover:ring-2 hover:ring-sky-100',
      features: [
        'Learn Python Step-by-Step',
        '18 Chapter Library',
        'Study Notes & PDF Material',
        'Quick Revision & Mind Maps',
      ],
      action: 'Enter Learning Deck',
    },
    {
      id: 'video_library',
      title: 'VIDEO LEARNING CENTER',
      badge: '18 HD Lectures',
      icon: Video,
      gradient: 'from-indigo-50/70 via-white to-purple-50/50',
      iconColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      borderColor: 'hover:border-indigo-300 hover:ring-2 hover:ring-indigo-100',
      features: [
        'Recorded Video Lectures',
        'Structured Video Courses',
        'Topic-by-Topic Demonstrations',
        'Visual Code Walkthroughs',
      ],
      action: 'Open Video Theater',
    },
    {
      id: 'practice',
      title: 'PRACTICE CENTER',
      badge: 'Interactive Lab',
      icon: Code2,
      gradient: 'from-emerald-50/70 via-white to-teal-50/50',
      iconColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      borderColor: 'hover:border-emerald-300 hover:ring-2 hover:ring-emerald-100',
      features: [
        'In-Browser Python Playground',
        'Daily Code Practice Lab',
        'Live Pyodide Code Execution',
        'Problem Solving Challenges',
      ],
      action: 'Open Code Lab',
    },
    {
      id: 'quizzes',
      title: 'ASSESSMENT CENTER',
      badge: 'Evaluations',
      icon: FileCheck2,
      gradient: 'from-purple-50/70 via-white to-pink-50/50',
      iconColor: 'bg-purple-100 text-purple-700 border-purple-200',
      borderColor: 'hover:border-purple-300 hover:ring-2 hover:ring-purple-100',
      features: [
        'Chapter Quizzes & Tests',
        'Code Assignments Submission',
        'Instant Auto-Checked Feedback',
        'Comprehensive Skill Evaluation',
      ],
      action: 'Open Assessments',
    },
    {
      id: 'projects',
      title: 'PROJECT STUDIO',
      badge: 'Real-World',
      icon: Rocket,
      gradient: 'from-rose-50/70 via-white to-amber-50/50',
      iconColor: 'bg-rose-100 text-rose-700 border-rose-200',
      borderColor: 'hover:border-rose-300 hover:ring-2 hover:ring-rose-100',
      features: [
        'Mini Python Projects (Level 17)',
        'Grand Capstone (Level 18)',
        'Portfolio Project Builder',
        'Interactive Code Submission',
      ],
      action: 'Launch Project Studio',
    },
    {
      id: 'interview',
      title: 'INTERVIEW CENTER',
      badge: 'Career & Placement',
      icon: Briefcase,
      gradient: 'from-teal-50/70 via-white to-sky-50/50',
      iconColor: 'bg-teal-100 text-teal-800 border-teal-200',
      borderColor: 'hover:border-teal-300 hover:ring-2 hover:ring-teal-100',
      features: [
        'Python Technical Interview Q&A',
        'Conceptual College Viva Tests',
        'Placement Preparation Guides',
        'Core OOP & GIL Deep Dives',
      ],
      action: 'Prepare for Interviews',
    },
    {
      id: 'resources',
      title: 'RESOURCE LIBRARY',
      badge: 'Handbooks & Docs',
      icon: Library,
      gradient: 'from-blue-50/70 via-white to-indigo-50/50',
      iconColor: 'bg-blue-100 text-blue-700 border-blue-200',
      borderColor: 'hover:border-blue-300 hover:ring-2 hover:ring-blue-100',
      features: [
        'Python Built-in Dictionary',
        'Complete Python Handbook',
        'Downloadable Cheat Sheets PDF',
        'Curated Official Documentation',
      ],
      action: 'Browse Resources',
    },
    {
      id: 'learning_path',
      title: 'PROGRESS CENTER',
      badge: 'Island Journey',
      icon: TrendingUp,
      gradient: 'from-sky-50/80 via-white to-emerald-50/60',
      iconColor: 'bg-sky-100 text-sky-800 border-sky-200',
      borderColor: 'hover:border-sky-300 hover:ring-2 hover:ring-sky-100',
      features: [
        '18 Knowledge Islands Journey',
        'Python Highway Expedition',
        'Real-Time GPS Navigation Panel',
        'Sailing Vessel Progress Engine',
      ],
      action: 'View Progress Journey',
    },
    {
      id: 'achievements',
      title: 'ACHIEVEMENT CENTER',
      badge: 'Honors & Badges',
      icon: Trophy,
      gradient: 'from-amber-50/80 via-white to-yellow-50/60',
      iconColor: 'bg-amber-100 text-amber-800 border-amber-300',
      borderColor: 'hover:border-amber-300 hover:ring-2 hover:ring-amber-100',
      features: [
        'Official Academy Badges',
        'Daily Learning Streak Counter',
        'Milestone Unlock Tracker',
        'Academy Success Wall',
      ],
      action: 'View Achievements',
    },
    {
      id: 'planner',
      title: 'STUDY PLANNER',
      badge: 'Daily & Weekly',
      icon: Calendar,
      gradient: 'from-emerald-50/70 via-white to-sky-50/50',
      iconColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      borderColor: 'hover:border-emerald-300 hover:ring-2 hover:ring-emerald-100',
      features: [
        'Daily Study Targets Checklist',
        'Weekly Learning Milestones',
        'Structured Study Schedule',
        'Progress & Habit Formation',
      ],
      action: 'Manage Study Plan',
    },
    {
      id: 'journal',
      title: 'PERSONAL LEARNING JOURNAL',
      badge: 'Notes & Reflections',
      icon: Edit3,
      gradient: 'from-amber-50/70 via-white to-purple-50/50',
      iconColor: 'bg-amber-100 text-amber-800 border-amber-200',
      borderColor: 'hover:border-amber-300 hover:ring-2 hover:ring-amber-100',
      features: [
        'Personal Notebook & Reflections',
        'Saved Code Breakthroughs',
        'Topic Insights & Bookmarks',
        'Private Study Diary Archive',
      ],
      action: 'Open Journal',
    },
    {
      id: 'community',
      title: 'COMMUNITY SECTION',
      badge: 'Peer Discussion',
      icon: Users,
      gradient: 'from-purple-50/70 via-white to-indigo-50/50',
      iconColor: 'bg-purple-100 text-purple-800 border-purple-200',
      borderColor: 'hover:border-purple-300 hover:ring-2 hover:ring-purple-100',
      features: [
        'Student Discussion Forum',
        'Ask Questions & Get Answers',
        'Weekly Python Code Jams',
        'Official Academy Notice Board',
      ],
      action: 'Join Discussion',
    },
    {
      id: 'certificates',
      title: 'CERTIFICATE CENTER',
      badge: isCertLocked ? `Locked (${completedCount}/${totalChapters})` : 'Unlocked ⭐',
      icon: Award,
      gradient: isCertLocked ? 'from-slate-50 via-white to-amber-50/30' : 'from-amber-50/90 via-white to-yellow-50/70',
      iconColor: isCertLocked ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-amber-100 text-amber-800 border-amber-300',
      borderColor: 'hover:border-amber-300 hover:ring-2 hover:ring-amber-100',
      features: [
        'Accredited Certificate of Completion',
        'Unique Online Verification ID',
        'Print & Download as Official PDF',
        'Requires all 18 Chapters Cleared',
      ],
      action: isCertLocked ? 'View Requirements' : 'View Certificate',
    },
    {
      id: 'profile',
      title: 'PROFILE CENTER',
      badge: currentUser.role === 'admin' ? 'Admin Portal' : 'Student Hub',
      icon: User,
      gradient: 'from-blue-50/60 via-white to-slate-50',
      iconColor: 'bg-blue-100 text-blue-700 border-blue-200',
      borderColor: 'hover:border-blue-300 hover:ring-2 hover:ring-blue-100',
      features: [
        'Student Account & Contact Details',
        'Study Performance Analytics',
        'Curriculum Clearance Records',
        'Academy Membership Credential',
      ],
      action: 'Open Profile Center',
    },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10 animate-fadeIn pb-24">
      {/* 1. TOP SECTION: WELCOME & MOTIVATIONAL BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-[#EAF6FF] to-[#F5F0FF] border border-[#BFDFFF]/60 p-8 sm:p-12 shadow-xs">
        {/* Soft Background Accents */}
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#BFDFFF] shadow-xs text-xs font-bold text-sky-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Python Learning Academy • World-Class Learning Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#333333] tracking-tight">
            Welcome To Python Learning Academy
          </h1>

          <h2 className="text-lg sm:text-2xl font-bold text-[#4F6FAF]">
            Choose Your Learning Destination
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Welcome, <strong>{currentUser.name}</strong>. Step into a peaceful, focused educational ecosystem dedicated to learning, practice, real-world development, and career growth.
          </p>
        </div>
      </div>

      {/* 2. LARGE GLASSMORPHISM CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => {
                if (card.id === 'chapter') {
                  openChapter(nextChapter.id);
                } else {
                  setActiveView(card.id);
                }
              }}
              className={`group relative rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-7 shadow-xs hover:shadow-xl hover:shadow-sky-100/70 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${card.borderColor}`}
            >
              {/* Soft gradient background tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 group-hover:opacity-80 transition-opacity -z-10`}
              />

              {/* Card Header: Icon + Title + Badge */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-110 ${card.iconColor}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 border border-slate-200/90 text-slate-700 shadow-2xs group-hover:bg-white transition-colors">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#333333] tracking-tight group-hover:text-sky-700 transition-colors">
                  {card.title}
                </h3>

                {/* Sub-bullets features */}
                <ul className="mt-3.5 space-y-1.5 text-xs text-[#4F6FAF]">
                  {card.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-sky-700 group-hover:text-sky-800">
                <span>{card.action}</span>
                <div className="w-7 h-7 rounded-xl bg-white/90 border border-slate-200/80 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all shadow-2xs group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
