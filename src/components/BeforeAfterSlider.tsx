"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Sliders } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[400px] md:h-[550px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-card-border shadow-2xl"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="After Render"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-mono uppercase tracking-wider border border-white/10">
          Final Render (After)
        </div>
      </div>

      {/* Before Image (Clipped Foreground) */}
      <div
        className="absolute inset-0 h-full overflow-hidden border-r-2 border-accent-purple shadow-2xl"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="relative w-full h-full min-w-[320px]">
          <Image
            src={beforeImage}
            alt="Before Raw Draft"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-mono uppercase tracking-wider border border-white/10">
            Raw CAD Draft (Before)
          </div>
        </div>
      </div>

      {/* Divider Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-accent-purple z-30"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-accent-purple text-white flex items-center justify-center shadow-lg shadow-accent-purple/50 border border-white/40">
          <Sliders className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );
};
