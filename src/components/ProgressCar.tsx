import React from 'react';
import { Sparkles } from 'lucide-react';

export type CarState = 'driving' | 'idle' | 'arrived';

interface ProgressCarProps {
  state?: CarState;
  direction?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg';
  speechText?: string;
  onClick?: () => void;
  className?: string;
}

export const ProgressCar: React.FC<ProgressCarProps> = ({
  state = 'idle',
  direction = 'right',
  size = 'md',
  speechText,
  onClick,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-20 h-10',
    md: 'w-28 h-14',
    lg: 'w-36 h-18',
  }[size];

  const isDriving = state === 'driving';
  const isArrived = state === 'arrived';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center cursor-pointer select-none group transition-transform ${className}`}
      title="Academy Progress Car - Moving you forward on the Python Highway!"
    >
      {/* Speech / Status Bubble */}
      {speechText && (
        <div className="absolute -top-10 z-30 px-3 py-1 rounded-2xl bg-white/95 border border-[#BFDFFF] shadow-md text-[10px] font-extrabold text-[#333333] whitespace-nowrap animate-bounce flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
          <span>{speechText}</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#BFDFFF] rotate-45" />
        </div>
      )}

      {/* Arrival Aura Beacon */}
      {isArrived && (
        <div className="absolute inset-0 rounded-full bg-sky-400 opacity-40 blur-lg animate-ping" />
      )}

      {/* Car Wrapper with Flip Direction */}
      <div
        className={`${dimensions} relative flex items-center justify-center transition-all duration-500 ${
          direction === 'left' ? 'scale-x-[-1]' : ''
        } ${isDriving ? 'animate-[bounce_0.6s_infinite]' : isArrived ? 'animate-pulse scale-105' : 'hover:scale-105'}`}
      >
        {/* Headlight beam when driving or idle */}
        <div className="absolute -right-6 top-5 w-12 h-6 bg-gradient-to-r from-amber-200/60 to-transparent blur-sm rounded-r-full pointer-events-none transform -rotate-3" />

        {/* Realistic Modern Compact EV Vector SVG */}
        <svg
          viewBox="0 0 160 80"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Body metallic paint gradient: Soft Sky Blue to Slate Silver */}
            <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Roof and Glass Gradient */}
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.95" />
            </linearGradient>

            {/* Chrome Rim Gradient */}
            <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Underbody Shadow */}
          <ellipse cx="80" cy="72" rx="65" ry="6" fill="#0F172A" opacity="0.3" />

          {/* Main Car Aerodynamic Body */}
          <path
            d="M 15 54 
               C 15 48, 20 44, 28 44
               L 42 44
               C 52 44, 60 26, 74 22
               L 112 22
               C 126 22, 134 36, 142 45
               L 150 48
               C 156 50, 158 54, 157 60
               L 154 64
               C 152 67, 146 67, 142 67
               L 18 67
               C 14 67, 12 60, 15 54 Z"
            fill="url(#carBodyGrad)"
            stroke="#0369A1"
            strokeWidth="1.5"
          />

          {/* Panoramic Cabin Glass / Windshield / Side Windows */}
          <path
            d="M 50 42 
               C 56 30, 64 24, 76 24 
               L 108 24 
               C 120 24, 126 34, 132 42 
               Z"
            fill="url(#glassGrad)"
            stroke="#0F172A"
            strokeWidth="1.2"
          />

          {/* Window Pillar (B-Pillar) */}
          <line x1="90" y1="24" x2="90" y2="42" stroke="#0F172A" strokeWidth="2.5" />

          {/* Interior Headrest silhouettes */}
          <circle cx="80" cy="33" r="4.5" fill="#64748B" opacity="0.7" />
          <circle cx="102" cy="33" r="4.5" fill="#64748B" opacity="0.7" />

          {/* Sleek Door Line and Flush Handle */}
          <path d="M 64 45 L 64 63" stroke="#0284C7" strokeWidth="1" />
          <rect x="70" y="47" width="10" height="2" rx="1" fill="#FFFFFF" opacity="0.8" />
          <path d="M 112 45 L 112 63" stroke="#0284C7" strokeWidth="1" />
          <rect x="116" y="47" width="10" height="2" rx="1" fill="#FFFFFF" opacity="0.8" />

          {/* Python Academy Emblem on Car Door */}
          <circle cx="90" cy="54" r="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
          <path d="M 88 52 Q 90 50 92 52 Q 90 55 88 52" fill="#F59E0B" />
          <circle cx="89" cy="52" r="0.6" fill="#1E293B" />

          {/* Front LED Headlight */}
          <polygon
            points="148,48 156,52 148,56"
            fill="#FEF08A"
            stroke="#FBBF24"
            strokeWidth="1"
          />
          {/* Headlight Internal Glow */}
          <circle cx="152" cy="52" r="2.5" fill="#FFFFFF" />

          {/* Rear LED Tail Light Strip */}
          <rect x="13" y="50" width="4" height="8" rx="1.5" fill="#EF4444" />
          <rect x="14" y="52" width="2" height="4" rx="0.5" fill="#FCA5A5" />

          {/* Front Wheel Arch and Alloy Wheel */}
          <g transform="translate(125, 65)">
            {/* Wheel Arch Cutout */}
            <path d="M -16 0 A 16 16 0 0 1 16 0" fill="none" stroke="#0284C7" strokeWidth="2" />
            {/* Tire Rubber */}
            <circle cx="0" cy="0" r="14" fill="#1E293B" />
            <circle cx="0" cy="0" r="12" fill="#334155" />
            {/* Chrome Alloy Rim */}
            <circle cx="0" cy="0" r="9" fill="url(#rimGrad)" />
            {/* Spokes (Spinning when driving) */}
            <g className={isDriving ? 'animate-[spin_0.8s_linear_infinite]' : ''}>
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="1.8" />
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#FFFFFF" strokeWidth="1.8" />
              <line x1="-5" y1="-5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="-5" y1="5" x2="5" y2="-5" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
            <circle cx="0" cy="0" r="3" fill="#0284C7" />
          </g>

          {/* Rear Wheel Arch and Alloy Wheel */}
          <g transform="translate(38, 65)">
            {/* Wheel Arch Cutout */}
            <path d="M -16 0 A 16 16 0 0 1 16 0" fill="none" stroke="#0284C7" strokeWidth="2" />
            {/* Tire Rubber */}
            <circle cx="0" cy="0" r="14" fill="#1E293B" />
            <circle cx="0" cy="0" r="12" fill="#334155" />
            {/* Chrome Alloy Rim */}
            <circle cx="0" cy="0" r="9" fill="url(#rimGrad)" />
            {/* Spokes (Spinning when driving) */}
            <g className={isDriving ? 'animate-[spin_0.8s_linear_infinite]' : ''}>
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="1.8" />
              <line x1="0" y1="-7" x2="0" y2="7" stroke="#FFFFFF" strokeWidth="1.8" />
              <line x1="-5" y1="-5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="1.5" />
              <line x1="-5" y1="5" x2="5" y2="-5" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
            <circle cx="0" cy="0" r="3" fill="#0284C7" />
          </g>
        </svg>

        {/* Electric badge in Corner */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 border border-white shadow-2xs flex items-center justify-center text-[10px] text-white">
          ⚡
        </div>
      </div>

      {/* Modern Badge Tag below car */}
      <div className="mt-1 px-2 py-0.5 rounded-full bg-white/95 border border-sky-200 shadow-2xs flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${isDriving ? 'bg-sky-500 animate-ping' : 'bg-emerald-500'}`} />
        <span className="text-[9px] font-extrabold text-[#333333] tracking-wide">
          {isDriving ? 'DRIVING' : 'ACADEMY EV'}
        </span>
      </div>
    </div>
  );
};
