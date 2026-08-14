"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProjectCard } from '@/components/ProjectCard';
import { categoryTranslations } from '@/lib/i18n';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

export default function WorksPage() {
  const { lang, t } = useLanguage();

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    'All',
    'Branding',
    'Graphic Design',
    'Poster',
    'UI/UX',
    '3D',
    'Motion',
    'Video',
    'Photography',
    'Other',
  ];

  useEffect(() => {
    fetchProjects();
  }, [activeCategory, searchQuery, sortOption]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);
      if (sortOption) params.append('sort', sortOption);

      const res = await fetch(`/api/projects?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      
      {/* Header */}
      <div className="space-y-2 sm:space-y-3">
        <h1 className="section-headline font-display font-bold text-white tracking-tight">
          {t('works_title')}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl">
          {t('works_subtitle')}
        </p>
      </div>

      {/* Controls Bar: Search, Category Filter Tabs, Sorting & View Toggle */}
      <div className="space-y-4 sm:space-y-6">
        
        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('works_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card-DEFAULT border border-card-border rounded-xl pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-purple transition-all"
            />
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Sort Select */}
            <div className="flex items-center gap-2 bg-card-DEFAULT border border-card-border px-3 py-2 rounded-xl text-xs flex-grow sm:flex-grow-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer w-full text-xs"
              >
                <option value="newest" className="bg-card-DEFAULT">{t('works_sort_newest')}</option>
                <option value="popular" className="bg-card-DEFAULT">{t('works_sort_popular')}</option>
                <option value="likes" className="bg-card-DEFAULT">{t('works_sort_likes')}</option>
                <option value="views" className="bg-card-DEFAULT">{t('works_sort_views')}</option>
              </select>
            </div>

            {/* Layout Mode Toggle */}
            <div className="flex items-center gap-1 bg-card-DEFAULT border border-card-border p-1 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-accent-purple text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-accent-purple text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills with Smooth Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-card-border/50 no-scrollbar flex-nowrap w-full">
          {categories.map((cat) => {
            const localizedCat = categoryTranslations[cat]?.[lang] || cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat
                    ? 'bg-accent-lime text-black shadow-lg shadow-accent-lime/25 font-bold'
                    : 'bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {localizedCat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-80 rounded-2xl bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-card-DEFAULT border border-card-border rounded-2xl space-y-3">
          <p className="text-gray-400 text-xs sm:text-sm">{t('works_empty')}</p>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
              : 'grid grid-cols-1 gap-4 sm:gap-6'
          }
        >
          {projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              id={proj.id}
              slug={proj.slug}
              title={proj.title}
              category={proj.category}
              description={proj.description}
              coverImage={proj.coverImage}
              views={proj.views}
              likes={proj.likes}
              saves={proj.saves}
              featured={proj.featured}
            />
          ))}
        </div>
      )}
    </div>
  );
}
