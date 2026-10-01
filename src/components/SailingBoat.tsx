import React from 'react';
import { Sparkles } from 'lucide-react';

export type BoatState = 'sailing' | 'idle' | 'arrived';

interface SailingBoatProps {
  state?: BoatState;
  size?: 'sm' | 'md' | 'lg';
  speechText?: string;
  onClick?: () => void;
  className?: string;
}

export const SailingBoat: React.FC<SailingBoatProps> = ({
  state = 'idle',
  size = 'md',
  speechText,
  onClick,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }[size];

  const isSailing = state === 'sailing';
  const isArrived = state === 'arrived';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center cursor-pointer select-none group transition-transform ${className}`}
      title="Knowledge Island Sailing Vessel"
    >
      {/* Speech / Status Bubble */}
      {speechText && (
        <div className="absolute -top-10 z-30 px-3 py-1 rounded-2xl bg-white/95 border border-sky-200 shadow-md text-[10px] font-extrabold text-[#333333] whitespace-nowrap animate-bounce flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
          <span>{speechText}</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-sky-200 rotate-45" />
        </div>
      )}

      {/* Arrival Aura Beacon */}
      {isArrived && (
        <div className="absolute inset-0 rounded-full bg-cyan-300 opacity-40 blur-lg animate-ping" />
      )}

      {/* Sailing Boat SVG Illustration */}
      <div
        className={`${dimensions} relative flex items-center justify-center transition-all duration-500 ${
          isSailing ? 'animate-[bounce_0.8s_infinite]' : isArrived ? 'animate-pulse scale-105' : 'hover:scale-105'
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="sailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
            <linearGradient id="woodTrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Water Ripples underneath boat */}
          <ellipse cx="50" cy="85" rx="38" ry="6" fill="#38BDF8" opacity="0.3" className={isSailing ? 'animate-pulse' : ''} />
          <path d="M15,86 Q30,83 50,86 T85,86" stroke="#0284C7" strokeWidth="2" fill="none" opacity="0.4" />

          {/* Boat Hull */}
          <path
            d="M20,68 L80,68 C76,82 66,86 50,86 C34,86 24,82 20,68 Z"
            fill="url(#hullGrad)"
          />
          {/* Hull gold deck trim */}
          <path d="M18,68 L82,68 L80,65 L20,65 Z" fill="url(#woodTrim)" />

          {/* Center Mast */}
          <line x1="50" y1="20" x2="50" y2="67" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

          {/* Main Sail (Right Triangle) */}
          <path
            d="M52,24 L82,60 L52,60 Z"
            fill="url(#sailGrad)"
            stroke="#BAE6FD"
            strokeWidth="1.5"
            className={isSailing ? 'animate-pulse' : ''}
          />

          {/* Front Jib Sail (Left Triangle) */}
          <path
            d="M48,28 L24,58 L48,58 Z"
            fill="url(#sailGrad)"
            stroke="#BAE6FD"
            strokeWidth="1.5"
          />

          {/* Top Pennant Flag */}
          <path d="M50,18 L64,22 L50,26 Z" fill="#F43F5E" />

          {/* Python Emerald Emblem on Main Sail */}
          <circle cx="62" cy="45" r="5" fill="#34D399" opacity="0.8" />
          <path d="M60,45 Q62,43 64,45 T62,47" stroke="#065F46" strokeWidth="1" fill="none" />
        </svg>

        {/* Small Compass sparkle */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 border border-white shadow-2xs flex items-center justify-center text-[10px] text-white">
          ⛵
        </div>
      </div>

      {/* Status Tag */}
      <div className="mt-1 px-2 py-0.5 rounded-full bg-white/95 border border-sky-200 shadow-2xs flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${isSailing ? 'bg-sky-500 animate-ping' : 'bg-emerald-500'}`} />
        <span className="text-[9px] font-extrabold text-[#333333] tracking-wide">
          {isSailing ? 'SAILING' : 'ANCHORED'}
        </span>
      </div>
    </div>
  );
};
