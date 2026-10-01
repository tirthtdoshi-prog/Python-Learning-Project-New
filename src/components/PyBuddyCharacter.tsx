import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, BookOpen, Star } from 'lucide-react';

export type PyBuddyState = 'idle' | 'walking' | 'waving' | 'celebrating';

interface PyBuddyCharacterProps {
  state?: PyBuddyState;
  size?: 'sm' | 'md' | 'lg';
  speechText?: string;
  onClick?: () => void;
  className?: string;
}

export const PyBuddyCharacter: React.FC<PyBuddyCharacterProps> = ({
  state = 'idle',
  size = 'md',
  speechText,
  onClick,
  className = '',
}) => {
  const [internalState, setInternalState] = useState<PyBuddyState>(state);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    setInternalState(state);
  }, [state]);

  const handleClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1200);

    // Trigger celebration or wave on click
    if (internalState === 'idle') {
      setInternalState('waving');
      setTimeout(() => setInternalState('idle'), 2500);
    }
    if (onClick) onClick();
  };

  const dimensions = {
    sm: 'w-16 h-20',
    md: 'w-24 h-28',
    lg: 'w-32 h-36',
  }[size];

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center cursor-pointer select-none group transition-transform ${className}`}
      title="I'm PyBuddy! Click me to say hello!"
    >
      {/* Interactive Speech Bubble */}
      {speechText && (
        <div className="absolute -top-12 z-20 px-3 py-1.5 rounded-2xl bg-white/95 border border-[#BFDFFF] shadow-md text-[11px] font-bold text-[#333333] whitespace-nowrap animate-bounce flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
          <span>{speechText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-[#BFDFFF] rotate-45" />
        </div>
      )}

      {/* Floating Love Heart on Click */}
      {showHeart && (
        <div className="absolute -top-6 text-rose-500 animate-ping">
          <Heart className="w-5 h-5 fill-rose-400" />
        </div>
      )}

      {/* PyBuddy Character Container */}
      <div
        className={`${dimensions} relative flex items-center justify-center transition-all duration-300 ${
          internalState === 'walking'
            ? 'animate-bounce'
            : internalState === 'celebrating'
            ? 'animate-pulse scale-110'
            : 'hover:scale-105'
        }`}
      >
        {/* Glow halo behind PyBuddy */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-200 to-amber-200 opacity-60 blur-md -z-10" />

        {/* PyBuddy SVG Body */}
        <svg
          viewBox="0 0 100 110"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          {/* Backpack Straps & Bag */}
          <rect
            x="20"
            y="42"
            width="14"
            height="32"
            rx="6"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="2"
          />
          <path
            d="M 28 42 L 35 55"
            stroke="#B45309"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Legs (Animated during walking) */}
          <g
            className={
              internalState === 'walking'
                ? 'origin-top animate-[spin_0.6s_ease-in-out_infinite_alternate]'
                : ''
            }
          >
            {/* Left Leg */}
            <rect
              x="36"
              y="82"
              width="9"
              height="18"
              rx="4"
              fill="#0284C7"
            />
            {/* Left Shoe */}
            <ellipse
              cx="38"
              cy="99"
              rx="7"
              ry="4"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="2"
            />
          </g>

          <g
            className={
              internalState === 'walking'
                ? 'origin-top animate-[spin_0.6s_ease-in-out_infinite_alternate-reverse]'
                : ''
            }
          >
            {/* Right Leg */}
            <rect
              x="55"
              y="82"
              width="9"
              height="18"
              rx="4"
              fill="#0284C7"
            />
            {/* Right Shoe */}
            <ellipse
              cx="62"
              cy="99"
              rx="7"
              ry="4"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="2"
            />
          </g>

          {/* Cute Body (Hoodie with Python Emblem) */}
          <rect
            x="30"
            y="40"
            width="40"
            height="46"
            rx="16"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="2"
          />
          {/* Hoodie Pocket */}
          <rect
            x="37"
            y="65"
            width="26"
            height="14"
            rx="6"
            fill="#E0F2FE"
          />

          {/* Python emblem ribbon on hoodie */}
          <path
            d="M 45 52 Q 50 48 55 52 Q 50 56 45 52"
            fill="#FACC15"
          />

          {/* Left Arm (holds open Python book) */}
          <g>
            <rect
              x="18"
              y="52"
              width="14"
              height="8"
              rx="4"
              fill="#38BDF8"
            />
            {/* Mini Python Book */}
            <rect
              x="12"
              y="48"
              width="12"
              height="15"
              rx="2"
              fill="#FDE047"
              stroke="#CA8A04"
              strokeWidth="1.5"
            />
            <line x1="18" y1="48" x2="18" y2="63" stroke="#CA8A04" strokeWidth="1" />
            <text x="14" y="58" fontSize="6" fontWeight="bold" fill="#854D0E">Py</text>
          </g>

          {/* Right Arm (Waving or Celebration) */}
          {internalState === 'waving' || internalState === 'celebrating' ? (
            <g className="origin-bottom-left animate-bounce">
              <path
                d="M 68 50 Q 82 32 86 24"
                stroke="#38BDF8"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="86" cy="24" r="5" fill="#FED7AA" />
              {/* Star sparkle near hand */}
              <circle cx="92" cy="18" r="2.5" fill="#F59E0B" />
            </g>
          ) : (
            <g>
              <rect
                x="68"
                y="52"
                width="14"
                height="8"
                rx="4"
                fill="#38BDF8"
              />
              <circle cx="82" cy="56" r="4.5" fill="#FED7AA" />
            </g>
          )}

          {/* Friendly Head / Face */}
          <circle
            cx="50"
            cy="27"
            r="19"
            fill="#FED7AA"
            stroke="#FDBA74"
            strokeWidth="1.5"
          />

          {/* Explorer Hair & Cap */}
          <path
            d="M 33 22 Q 50 10 67 22 Q 62 13 50 11 Q 38 13 33 22"
            fill="#854D0E"
          />
          {/* Cozy Explorer Student Cap */}
          <path
            d="M 32 20 Q 50 14 68 20 Q 72 12 50 8 Q 28 12 32 20"
            fill="#0284C7"
          />
          {/* Golden Cap Button */}
          <circle cx="50" cy="8" r="2.5" fill="#FACC15" />

          {/* Big Friendly Sparkly Eyes */}
          <ellipse cx="43" cy="26" rx="3" ry="4" fill="#1E293B" />
          <ellipse cx="57" cy="26" rx="3" ry="4" fill="#1E293B" />
          {/* Eye Sparkles */}
          <circle cx="44" cy="24.5" r="1.2" fill="#FFFFFF" />
          <circle cx="58" cy="24.5" r="1.2" fill="#FFFFFF" />

          {/* Rosy Cheeks */}
          <ellipse cx="37" cy="30" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.8" />
          <ellipse cx="63" cy="30" rx="3" ry="1.8" fill="#FDA4AF" opacity="0.8" />

          {/* Happy Smile */}
          {internalState === 'celebrating' ? (
            <path
              d="M 44 32 Q 50 40 56 32 Z"
              fill="#E11D48"
            />
          ) : (
            <path
              d="M 44 32 Q 50 37 56 32"
              fill="none"
              stroke="#9A3412"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Celebration Golden Stars Floating */}
          {internalState === 'celebrating' && (
            <>
              <polygon
                points="15,15 18,22 25,22 19,26 21,33 15,29 9,33 11,26 5,22 12,22"
                fill="#FACC15"
                className="animate-spin"
              />
              <polygon
                points="85,15 87,20 92,20 88,23 90,28 85,25 80,28 82,23 78,20 83,20"
                fill="#F59E0B"
                className="animate-ping"
              />
            </>
          )}
        </svg>

        {/* Sparkle badge */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center text-[10px]">
          ✨
        </div>
      </div>

      {/* Name Tag */}
      <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#BFDFFF] shadow-2xs flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-extrabold text-[#333333]">PyBuddy</span>
      </div>
    </div>
  );
};
