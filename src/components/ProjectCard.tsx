"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { WatermarkOverlay } from './WatermarkOverlay';
import { projectTranslations, categoryTranslations } from '@/lib/i18n';
import { Heart, Bookmark, Eye, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  views: number;
  likes: number;
  saves: number;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  title: initialTitle,
  category: initialCategory,
  description: initialDesc,
  coverImage,
  views: initialViews,
  likes: initialLikes,
  saves: initialSaves,
  featured = false,
}) => {
  const { lang, t } = useLanguage();
  const { showToast } = useToast();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [saves, setSaves] = useState(initialSaves);
  const [isSaved, setIsSaved] = useState(false);

  // Dynamic multi-language resolution for project post text
  const localized = projectTranslations[slug]?.[lang];
  const displayTitle = localized?.title || initialTitle;
  const displayDesc = localized?.description || initialDesc;
  const displayCategory = categoryTranslations[initialCategory]?.[lang] || initialCategory;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) return;
    setIsLiked(true);
    setLikes((prev) => prev + 1);
    showToast('Project Liked! Added to project popularity ranking.', 'success');

    fetch(`/api/projects/${slug}/like`, { method: 'POST' }).catch(() => {});
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      setIsSaved(false);
      setSaves((prev) => Math.max(0, prev - 1));
      showToast('Removed from saved collection.', 'info');
    } else {
      setIsSaved(true);
      setSaves((prev) => prev + 1);
      showToast('Saved to your private collection!', 'success');
      fetch(`/api/projects/${slug}/save`, { method: 'POST' }).catch(() => {});
    }
  };

  return (
    <Link
      href={`/works/${slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-card-DEFAULT border border-card-border hover:border-accent-purple/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-purple/10 flex flex-col h-full select-none"
    >
      {/* Cover Image Container with Watermark */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
        <Image
          src={coverImage}
          alt={displayTitle}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          unoptimized
          onDragStart={(e) => e.preventDefault()}
        />

        {/* Protection Watermark Overlay */}
        <WatermarkOverlay />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-30 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono tracking-wider text-gray-200 uppercase border border-white/10">
            {displayCategory}
          </span>
          {featured && (
            <span className="px-2.5 py-0.5 rounded-full bg-accent-purple/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider shadow-lg shadow-accent-purple/30">
              Featured Case
            </span>
          )}
        </div>

        {/* Quick Action Overlay (Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-end p-4">
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleLike}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                isLiked
                  ? 'bg-accent-rose text-white border-accent-rose'
                  : 'bg-black/60 border-white/20 text-white hover:bg-accent-rose hover:border-accent-rose'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleSave}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
                isSaved
                  ? 'bg-accent-gold text-black border-accent-gold'
                  : 'bg-black/60 border-white/20 text-white hover:bg-accent-gold hover:text-black hover:border-accent-gold'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-white text-base group-hover:text-accent-purple transition-colors leading-tight line-clamp-1">
              {displayTitle}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </div>
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Footer Stats Bar */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              {initialViews}
            </span>
            <span className="flex items-center gap-1">
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'text-accent-rose fill-current' : 'text-gray-400'}`} />
              {likes}
            </span>
          </div>

          <span className="text-[10px] text-gray-400 uppercase">
            Case Study →
          </span>
        </div>
      </div>
    </Link>
  );
};
