import React, { useState } from 'react';
import {
  Video,
  Play,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Code2,
  Compass,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';

export const VideoLibraryView: React.FC = () => {
  const { chapters, currentUser, openChapter, setActiveView } = useAcademy();

  const [selectedChapterId, setSelectedChapterId] = useState<string>(chapters[0].id);

  const selectedChapter =
    chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const totalDuration = chapters.reduce((acc, c) => acc + c.durationMinutes, 0);
  const completedCount = currentUser?.completedChapterIds.length ?? 0;

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-10 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-sky-50 border border-indigo-200/60 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-indigo-700 border border-indigo-200 mb-2 shadow-2xs">
            <Video className="w-3.5 h-3.5" />
            <span>Python Academy Video Learning Center</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Video Library & Lectures
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Stream all 18 structured Python video lectures. Learn syntax, logic, data structures, and OOP visually.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
            <span className="text-lg font-extrabold text-indigo-700 block">
              {chapters.length}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">
              Lectures
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
            <span className="text-lg font-extrabold text-emerald-600 block">
              {Math.round(totalDuration / 60)}h {totalDuration % 60}m
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">
              Total Watch
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Theater Player for Active Lecture */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 mb-1">
              <span>LEVEL {selectedChapter.stepNumber}</span>
              <span>•</span>
              <span className="text-slate-500">{selectedChapter.subtitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#333333]">
              {selectedChapter.videoTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => openChapter(selectedChapter.id)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Full Chapter Deck</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Video Player (100% Free - Supports YouTube embeds, local files, and interactive visual slides) */}
        <UniversalVideoPlayer
          videoUrl={selectedChapter.videoUrl}
          videoTitle={selectedChapter.videoTitle}
          chapter={selectedChapter}
          poster="/src/assets/images/study_desk_illustration_1790697938057.jpg"
        />

        {/* Notes preview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-3">
          <BookOpen className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">
              Lecture Notes Summary (Level {selectedChapter.stepNumber})
            </span>
            <p className="line-clamp-2 text-slate-600 leading-relaxed font-sans">
              {selectedChapter.notes.slice(0, 300)}...
            </p>
          </div>
        </div>
      </div>

      {/* 3. All 18 Lectures Playlist Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#333333]">
            Curriculum Playlist (18 Lectures)
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {completedCount} of 18 Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chap) => {
            const isSelected = chap.id === selectedChapterId;
            const isDone = currentUser?.completedChapterIds.includes(chap.id);

            return (
              <div
                key={chap.id}
                onClick={() => setSelectedChapterId(chap.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-300 shadow-md ring-2 ring-indigo-200/60'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center text-[11px]">
                      {chap.stepNumber}
                    </span>

                    <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{chap.durationMinutes} min</span>
                      {isDone && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                      )}
                    </div>
                  </div>

                  <h4 className="font-extrabold text-sm text-[#333333] line-clamp-1">
                    {chap.title}
                  </h4>

                  <p className="text-xs text-[#4F6FAF] mt-1 line-clamp-2">
                    {chap.videoTitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span
                    className={
                      isSelected ? 'text-indigo-700' : 'text-slate-600'
                    }
                  >
                    {isSelected ? 'Now Playing ▶' : 'Select Lecture'}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <Play className="w-3 h-3 fill-slate-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
