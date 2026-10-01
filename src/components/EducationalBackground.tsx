import React from 'react';

export const EducationalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Soft Ambient Radial Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-200/25 blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-purple-200/25 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-amber-100/35 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute top-2/3 -left-20 w-80 h-80 rounded-full bg-emerald-100/25 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Floating Educational Vector Icons */}
      
      {/* 1. Open Book - Top Right */}
      <div
        className="absolute top-16 right-16 text-sky-400/20 opacity-30 animate-[floatGentle_10s_ease-in-out_infinite]"
        style={{ animationDelay: '0s' }}
      >
        <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8M8 11h6" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Graduation Cap - Top Left */}
      <div
        className="absolute top-36 left-12 text-indigo-400/20 opacity-35 animate-[floatGentleReverse_12s_ease-in-out_infinite]"
        style={{ animationDelay: '1s' }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      {/* 3. Study Pencil & Ruler - Mid Left */}
      <div
        className="absolute top-1/2 left-8 text-amber-500/20 opacity-30 animate-[floatGentle_14s_ease-in-out_infinite]"
        style={{ animationDelay: '2s' }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 2l4 4-14 14H4v-4L18 2z" />
          <path d="M14 6l4 4" />
        </svg>
      </div>

      {/* 4. Notebook Paper Element - Mid Right */}
      <div
        className="absolute top-1/2 right-12 text-purple-400/20 opacity-30 animate-[floatGentleReverse_11s_ease-in-out_infinite]"
        style={{ animationDelay: '3s' }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
        </svg>
      </div>

      {/* 5. Knowledge Tree / Atom / Compass - Bottom Right */}
      <div
        className="absolute bottom-24 right-20 text-emerald-500/20 opacity-35 animate-[floatGentle_13s_ease-in-out_infinite]"
        style={{ animationDelay: '2.5s' }}
      >
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a8 8 0 0 0-8 8c0 4.418 8 12 8 12s8-7.582 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      {/* 6. Soft Drifting Clouds */}
      <div className="absolute top-20 left-1/3 text-sky-200/40 opacity-40 animate-[cloudDriftSlow_25s_ease-in-out_infinite]">
        <svg width="120" height="50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
        </svg>
      </div>
      <div className="absolute bottom-40 left-1/4 text-purple-200/30 opacity-30 animate-[cloudDriftReverse_28s_ease-in-out_infinite]">
        <svg width="140" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
        </svg>
      </div>

      {/* 7. Subtle Educational Dot-Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
};
