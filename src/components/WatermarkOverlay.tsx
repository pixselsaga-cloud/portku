"use client";

import React from 'react';

interface WatermarkOverlayProps {
  text?: string;
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  text = "PORTFOLIO PREVIEW — OTAJON JAHONGIROV"
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden select-none">
      <div className="rotate-[-25deg] opacity-[0.12] text-white font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] uppercase whitespace-nowrap border-y border-white/20 py-2 px-12 bg-black/40 backdrop-blur-[1px]">
        {text} • {text} • {text}
      </div>
    </div>
  );
};
