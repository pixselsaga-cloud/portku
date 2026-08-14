"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Download, Award, Briefcase, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const skills = [
    { name: '3D CGI & Blender Rendering', level: 95 },
    { name: 'Brutalists & Key Visual Posters', level: 98 },
    { name: 'Brand Identity Systems', level: 92 },
    { name: 'Dark Mode UI/UX & Figma Kits', level: 90 },
    { name: 'Motion Graphics & After Effects', level: 88 },
    { name: 'Color Grading & Commercial Cut', level: 86 },
  ];

  const experienceTimeline = [
    { year: '2025 — Present', role: 'Founder & Principal Creative Director', company: 'Otajon Jahongirov Studio' },
    { year: '2024 — 2025', role: 'Senior Visual & 3D Artist', company: 'Digital Wave Agency' },
    { year: '2023 — 2024', role: 'Graphic & Brand Identity Designer', company: 'Creative Atelier' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      
      {/* Hero Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Profile Visual with user_avatar.jpg */}
        <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-card-border bg-black/50 shadow-2xl">
          <img
            src="/assets/user_avatar.jpg"
            alt="Otajon Jahongirov Avatar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono text-accent-purple uppercase tracking-wider font-bold">{t('about_role')}</span>
            <h2 className="font-display font-bold text-white text-2xl">Otajon Jahongirov</h2>
            <p className="text-gray-400 text-xs mt-0.5">Tashkent, Uzbekistan • Global Remote</p>
          </div>
        </div>

        {/* Bio Text & CV Download */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-mono tracking-wider uppercase">
              {t('nav_about')}
            </span>
            <h1 className="hero-headline font-display font-bold text-white tracking-tight">
              Graphic Designer & Creative Digital Artist
            </h1>
          </div>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {t('about_bio')}
          </p>

          {/* Download CV CTA */}
          <div className="pt-2">
            <a
              href="/assets/Otajon_Jahongirov_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs font-bold shadow-xl shadow-accent-purple/20 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t('cv_download')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-white text-xl flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-purple" />
          <span>{t('about_skills_title')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((s) => (
            <div key={s.name} className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-2">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>{s.name}</span>
                <span className="font-mono text-accent-purple">{s.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full" style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-white text-xl flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-accent-blue" />
          <span>{t('about_exp_title')}</span>
        </h2>

        <div className="space-y-4">
          {experienceTimeline.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card-DEFAULT border border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-accent-purple font-bold block">{item.year}</span>
                <h3 className="font-display font-bold text-white text-base mt-0.5">{item.role}</h3>
                <p className="text-xs text-gray-400">{item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
