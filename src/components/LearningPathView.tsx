import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Compass,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
  Star,
  Play,
  Lock,
  ChevronRight,
  TrendingUp,
  MapPin,
  Shield,
  Layers,
  Trees,
  Cloud,
  Coffee,
  Code2,
  GraduationCap,
  X,
  Anchor,
  Navigation,
  Waves,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { SailingBoat, BoatState } from './SailingBoat';
import { ProgressCar, CarState } from './ProgressCar';

export const LearningPathView: React.FC = () => {
  const {
    chapters,
    currentUser,
    openChapter,
    completeChapter,
    setActiveView,
    isAdmin,
    showToast,
  } = useAcademy();

  if (!currentUser) return null;

  // View mode toggle: 'islands' (Knowledge Island Journey) vs 'highway' (Python Learning Highway)
  const [journeyMode, setJourneyMode] = useState<'islands' | 'highway'>('islands');

  const total = chapters.length;
  const completedCount = currentUser.completedChapterIds.length;
  const progressPercent = Math.round((completedCount / total) * 100);

  // Active milestone
  const nextChapter =
    chapters.find((c) => !currentUser.completedChapterIds.includes(c.id)) ||
    chapters[chapters.length - 1];

  const currentLevelNumber = nextChapter ? nextChapter.stepNumber : 1;
  const remainingCount = Math.max(0, total - completedCount);
  const isAllComplete = completedCount === total;

  // Vehicle states
  const [boatState, setBoatState] = useState<BoatState>('idle');
  const [carState, setCarState] = useState<CarState>('idle');
  const [celebrationModalChapter, setCelebrationModalChapter] = useState<any | null>(null);

  // Names of 18 Knowledge Islands
  const islandNames = [
    'Python Introduction Island',
    'Installation Island',
    'Variables Island',
    'Data Types Island',
    'Operators Island',
    'Input Output Island',
    'Conditional Statements Island',
    'Loops Island',
    'Functions Island',
    'Lists Island',
    'Tuples Island',
    'Dictionaries Island',
    'Sets Island',
    'File Handling Island',
    'Exception Handling Island',
    'OOP Island',
    'Mini Project Island',
    'Graduation Island',
  ];

  // Highway Destination Stops
  const highwayStops = [
    'Introduction Center',
    'Installation Hub',
    'Variables Station',
    'Data Types Plaza',
    'Operators Junction',
    'Input Output Point',
    'Logic City',
    'Loop Valley',
    'Function Town',
    'Lists District',
    'Tuples Square',
    'Dictionary City',
    'Sets Park',
    'File Handling Center',
    'Exception Tower',
    'OOP University',
    'Mini Project Lab',
    'Graduation & Final Project Center',
  ];

  const currentDestinationName =
    journeyMode === 'islands'
      ? islandNames[currentLevelNumber - 1] || 'Graduation Island'
      : highwayStops[currentLevelNumber - 1] || 'Graduation Center';

  const nextDestinationName =
    currentLevelNumber < total
      ? journeyMode === 'islands'
        ? islandNames[currentLevelNumber]
        : highwayStops[currentLevelNumber]
      : 'Academy Capstone Mastered';

  const handleSailBoat = () => {
    setBoatState('sailing');
    showToast(`Sailing to ${currentDestinationName}... Waves flowing! ⛵`);
    setTimeout(() => {
      setBoatState('idle');
    }, 3000);
  };

  const handleDriveCar = () => {
    setCarState('driving');
    showToast(`Driving down Python Highway towards ${currentDestinationName}... 🚗`);
    setTimeout(() => {
      setCarState('idle');
    }, 3000);
  };

  const handleQuickCompleteLevel = (chapter: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUser.completedChapterIds.includes(chapter.id)) {
      showToast(`Level ${chapter.stepNumber} is already completed! ⭐`);
      return;
    }
    completeChapter(chapter.id);
    setCelebrationModalChapter(chapter);
    setBoatState('arrived');
    setCarState('arrived');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#34D399', '#FBBF24', '#C084FC'],
    });

    setTimeout(() => {
      setBoatState('idle');
      setCarState('idle');
    }, 3500);
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. TOP HEADER & JOURNEY MODE TOGGLE */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-white to-emerald-50 border border-sky-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-sky-200 text-xs font-bold text-sky-800 mb-2 shadow-2xs">
            <Compass className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>
              {journeyMode === 'islands'
                ? '🏝️ Knowledge Island Journey'
                : '🛣️ Python Learning Highway'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] tracking-tight">
            {journeyMode === 'islands'
              ? 'Knowledge Island Journey'
              : 'Python Learning Highway'}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#4F6FAF] leading-relaxed">
            {journeyMode === 'islands'
              ? 'Sail through 18 Knowledge Islands from Python Introduction Island to Graduation Island. Every island contains video lectures, notes, practice code, and quizzes.'
              : 'Travel down the educational highway across 18 milestone destinations from Introduction Center to the Grand Graduation Capstone.'}
          </p>
        </div>

        {/* Mode Switcher & Vehicle Animation Trigger */}
        <div className="relative z-10 flex flex-col items-center gap-3 shrink-0">
          <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setJourneyMode('islands')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                journeyMode === 'islands'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏝️ Islands
            </button>
            <button
              type="button"
              onClick={() => setJourneyMode('highway')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                journeyMode === 'highway'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🛣️ Highway
            </button>
          </div>

          {journeyMode === 'islands' ? (
            <SailingBoat
              state={boatState}
              size="md"
              speechText={`Next: ${currentDestinationName}`}
              onClick={handleSailBoat}
            />
          ) : (
            <ProgressCar
              state={carState}
              size="md"
              speechText={`Next: ${currentDestinationName}`}
              onClick={handleDriveCar}
            />
          )}
        </div>
      </div>

      {/* 2. REAL-TIME GPS / NAVIGATION PROGRESS PANEL */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs p-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>CURRENT DESTINATION</span>
          </div>
          <p className="text-base font-extrabold text-[#333333] truncate">
            {currentDestinationName}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">
            Next: {nextDestinationName}
          </span>
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            CLEARED
          </span>
          <span className="text-xl font-extrabold text-emerald-600">
            {completedCount} / {total}
          </span>
          <span className="text-[10px] text-slate-400 block">Milestones</span>
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            REMAINING
          </span>
          <span className="text-xl font-extrabold text-amber-600">
            {remainingCount}
          </span>
          <span className="text-[10px] text-slate-400 block">To Graduation</span>
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            PROGRESS
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-sky-600">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-1">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. ACHIEVEMENT MILESTONES BANNER */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Island Expedition Badges:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] ${
            completedCount >= 1
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-400'
          }`}>
            ⛵ First Island Clear
          </span>
          <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] ${
            completedCount >= 5
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-400'
          }`}>
            ⭐ 25% Expedition
          </span>
          <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] ${
            completedCount >= 9
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-400'
          }`}>
            🏆 50% Mid-Voyage
          </span>
          <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] ${
            completedCount >= 14
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-400'
          }`}>
            💎 75% High Seas
          </span>
          <span className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] ${
            completedCount === 18
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-white border-slate-200 text-slate-400'
          }`}>
            🎓 Course Complete
          </span>
        </div>
      </div>

      {/* 4. ALL 18 ISLANDS / ROAD DESTINATIONS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#333333]">
            {journeyMode === 'islands'
              ? 'Archipelago of Knowledge (18 Islands)'
              : 'Learning Highway Mileposts (18 Stops)'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Click any unlocked destination to enter its dedicated learning deck
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map((ch, idx) => {
            const isDone = currentUser.completedChapterIds.includes(ch.id);
            const isCurrent = ch.stepNumber === currentLevelNumber;
            const isLocked = !isDone && !isCurrent && ch.stepNumber > currentLevelNumber;

            const islandTitle = islandNames[idx] || ch.title;
            const highwayStop = highwayStops[idx] || ch.title;
            const destTitle = journeyMode === 'islands' ? islandTitle : highwayStop;

            return (
              <div
                key={ch.id}
                onClick={() => !isLocked && openChapter(ch.id)}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between select-none ${
                  isLocked
                    ? 'bg-slate-50/70 border border-slate-200 opacity-60 cursor-not-allowed'
                    : isDone
                    ? 'bg-gradient-to-br from-emerald-50/70 to-white border-2 border-emerald-300 shadow-xs hover:shadow-md hover:-translate-y-1.5 cursor-pointer ring-2 ring-emerald-100/50'
                    : 'bg-gradient-to-br from-sky-50/90 to-white border-2 border-sky-400 shadow-md hover:shadow-xl hover:-translate-y-2 cursor-pointer ring-4 ring-sky-100'
                }`}
              >
                {/* Status Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-sky-600 text-white animate-bounce'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    #{ch.stepNumber}
                  </span>

                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cleared</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full animate-pulse">
                      <Compass className="w-3.5 h-3.5 text-sky-600" />
                      <span>Current Stop</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                {/* Island / Highway Content */}
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-sky-700 block mb-1">
                    {journeyMode === 'islands' ? `🏝️ Island ${ch.stepNumber}` : `📍 Milepost ${ch.stepNumber}`}
                  </span>

                  <h3 className="text-base font-extrabold text-[#333333] line-clamp-1">
                    {destTitle}
                  </h3>

                  <p className="text-xs text-[#4F6FAF] mt-1 line-clamp-2 leading-relaxed">
                    {ch.subtitle} • {ch.durationMinutes} min curriculum
                  </p>
                </div>

                {/* Current Active Indicator */}
                {isCurrent && (
                  <div className="my-3 py-2 px-3 rounded-xl bg-white/90 border border-sky-200 shadow-2xs flex items-center gap-2">
                    <span className="text-lg">{journeyMode === 'islands' ? '⛵' : '🚗'}</span>
                    <div className="text-left overflow-hidden">
                      <span className="text-[10px] font-extrabold text-sky-900 block truncate">
                        {journeyMode === 'islands' ? 'Boat Anchored Here' : 'Vehicle Parked Here'}
                      </span>
                      <span className="text-[9px] text-[#4F6FAF] block truncate">
                        Ready to learn
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {ch.durationMinutes} mins
                  </span>

                  {!isLocked && (
                    <div className="flex items-center gap-1.5">
                      {!isDone && (
                        <button
                          type="button"
                          onClick={(e) => handleQuickCompleteLevel(ch, e)}
                          className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] border border-emerald-200 transition-transform active:scale-95 cursor-pointer"
                          title="Mark chapter completed"
                        >
                          ✓ Done
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openChapter(ch.id)}
                        className="font-bold text-sky-600 hover:text-sky-800 flex items-center gap-0.5 cursor-pointer text-xs"
                      >
                        <span>Enter Deck</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CAPSTONE CERTIFICATION BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-sky-50 to-purple-50 border border-amber-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-center justify-center text-amber-500 shrink-0">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#333333]">
              Graduation Island & Official Academy Certificate
            </h4>
            <p className="text-xs text-[#4F6FAF] mt-0.5">
              Clear all 18 Knowledge Islands to unlock your verified credential.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('certificates')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-bold shadow-xs transition-transform active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer ${
            completedCount < total && !isAdmin
              ? 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
          }`}
        >
          {completedCount < total && !isAdmin ? (
            <>
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Certificate Locked ({completedCount}/{total})</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Claim Certificate (Unlocked!) 🎓</span>
            </>
          )}
        </button>
      </div>

      {/* 6. CELEBRATION MODAL */}
      {celebrationModalChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-200 text-center animate-scaleUp">
            <button
              type="button"
              onClick={() => setCelebrationModalChapter(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 shadow-md mx-auto flex items-center justify-center text-amber-500 mb-4 animate-bounce">
              <Star className="w-9 h-9 fill-amber-400" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200 mb-2">
              Level {celebrationModalChapter.stepNumber} Cleared! 🎉
            </span>

            <h3 className="text-xl font-extrabold text-[#333333]">
              {celebrationModalChapter.title}
            </h3>

            <p className="text-xs text-[#4F6FAF] mt-2 leading-relaxed">
              Splendid achievement! You have conquered this destination. Your vessel has sailed forward to the next horizon!
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setCelebrationModalChapter(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#333333]"
              >
                Close View
              </button>
              <button
                type="button"
                onClick={() => {
                  const cid = celebrationModalChapter.id;
                  setCelebrationModalChapter(null);
                  openChapter(cid);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-extrabold shadow-sm hover:shadow"
              >
                Review Chapter →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
