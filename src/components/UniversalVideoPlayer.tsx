import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Code2,
  BookOpen,
  MonitorPlay,
  Volume2,
  ExternalLink,
} from 'lucide-react';
import { Chapter } from '../types';

interface UniversalVideoPlayerProps {
  videoUrl?: string;
  videoTitle?: string;
  chapter?: Chapter;
  className?: string;
  poster?: string;
}

export const UniversalVideoPlayer: React.FC<UniversalVideoPlayerProps> = ({
  videoUrl = '',
  videoTitle = 'Lecture Video',
  chapter,
  className = '',
  poster = '/src/assets/images/study_desk_illustration_1790697938057.jpg',
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlayingVisualizer, setIsPlayingVisualizer] = useState(false);

  // Helper: check if URL is a YouTube link
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    if (url.includes('youtube.com/embed/')) return url;

    // Matches youtube.com/watch?v=ID or youtu.be/ID
    const regExp = /(?:youtube\.com\/(?:watch\?v=|v\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
  const isDirectVideoFile =
    videoUrl &&
    (videoUrl.startsWith('blob:') ||
      videoUrl.startsWith('data:') ||
      videoUrl.endsWith('.mp4') ||
      videoUrl.endsWith('.webm') ||
      videoUrl.endsWith('.mov') ||
      videoUrl.endsWith('.ogg'));

  // If YouTube link
  if (youtubeEmbedUrl) {
    return (
      <div className={`rounded-3xl overflow-hidden bg-slate-950 aspect-video relative border border-slate-200 shadow-md ${className}`}>
        <iframe
          src={youtubeEmbedUrl}
          title={videoTitle}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // If local direct video file or blob object URL (uploaded from computer for free)
  if (isDirectVideoFile) {
    return (
      <div className={`rounded-3xl overflow-hidden bg-slate-950 aspect-video relative border border-slate-200 shadow-md ${className}`}>
        <video
          key={videoUrl}
          src={videoUrl}
          controls
          poster={poster}
          className="w-full h-full object-contain"
        >
          Your browser does not support HTML5 video playback.
        </video>
      </div>
    );
  }

  // Fallback: 100% Free Interactive Visual Lecture Theater
  // Visual presentation slides generated from chapter content
  const slides = chapter?.examples && chapter.examples.length > 0
    ? chapter.examples.map((ex, idx) => ({
        step: `Concept #${idx + 1}`,
        title: ex.title,
        code: ex.code,
        explanation: ex.explanation,
      }))
    : [
        {
          step: 'Overview',
          title: chapter?.title || 'Python Core Principles',
          code: `# Welcome to ${chapter?.title || 'Python Learning'}\nprint("Learning Python with zero cloud storage!")`,
          explanation: chapter?.subtitle || 'Interactive in-browser Python educational lecture.',
        },
      ];

  const currentSlide = slides[activeSlide % slides.length];

  return (
    <div className={`rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white aspect-video relative border border-slate-700 shadow-xl flex flex-col justify-between p-6 sm:p-8 ${className}`}>
      {/* Visualizer Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <MonitorPlay className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-indigo-300">
                Interactive Visual Lecture Theater
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Free • No Cloud Storage
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-200 mt-0.5">
              {videoTitle}
            </h3>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">
          Slide {activeSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Visual Slide Content */}
      <div className="my-auto py-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-indigo-500 text-[10px] font-bold uppercase tracking-wider text-white">
            {currentSlide.step}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-sky-200">
            {currentSlide.title}
          </h4>
        </div>

        <div className="rounded-2xl bg-black/60 border border-slate-800 p-4 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner">
          <pre>{currentSlide.code}</pre>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {currentSlide.explanation}
        </p>
      </div>

      {/* Visualizer Player Controls */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer transition-colors"
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer transition-colors"
          >
            Next Slide →
          </button>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Browser Native • Zero External Bandwidth Fees</span>
        </div>
      </div>
    </div>
  );
};
