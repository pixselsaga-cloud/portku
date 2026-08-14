"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Download, Award, Briefcase, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const skills = [
    { name: t('about_skill_1'), level: 95 },
    { name: t('about_skill_2'), level: 98 },
    { name: t('about_skill_3'), level: 92 },
    { name: t('about_skill_4'), level: 90 },
    { name: t('about_skill_5'), level: 88 },
    { name: t('about_skill_6'), level: 86 },
  ];

  const experienceTimeline = [
    { year: t('about_exp_present'), role: t('about_exp_role_1'), company: t('about_exp_company_1') },
    { year: '2024 — 2025', role: t('about_exp_role_2'), company: t('about_exp_company_2') },
    { year: '2023 — 2024', role: t('about_exp_role_3'), company: t('about_exp_company_3') },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      
      {/* Hero Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Profile Visual with user_avatar.jpg */}
        <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl group">
          <img
            src="/assets/user_avatar.jpg"
            alt="Otajon Jahongirov Avatar"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 space-y-1">
            <span className="text-xs font-mono text-accent-lime uppercase tracking-wider font-bold">{t('about_role')}</span>
            <h2 className="font-display font-bold text-white text-2xl">Otajon Jahongirov</h2>
            <p className="text-gray-400 text-xs">{t('about_location')}</p>
          </div>
        </div>

        {/* Bio Text & CV Download */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-xs font-mono tracking-wider uppercase">
              {t('nav_about')}
            </span>
            <h1 className="hero-headline font-display font-bold text-white tracking-tight">
              {t('about_headline')}
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent-lime text-black text-xs font-bold shadow-xl shadow-accent-lime/25 hover:bg-accent-limeBright hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>{t('cv_download')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-white text-xl flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-lime" />
          <span>{t('about_skills_title')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {skills.map((s) => (
            <div key={s.name} className="p-5 rounded-2xl bg-card-DEFAULT border border-white/10 space-y-2.5 hover:border-accent-lime/40 transition-all">
              <div className="flex justify-between text-xs font-semibold text-white">
                <span>{s.name}</span>
                <span className="font-mono text-accent-lime font-bold">{s.level}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-lime via-accent-emerald to-accent-cyan rounded-full transition-all duration-1000 shadow-[0_0_12px_#a3e635]" style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-white text-xl flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-accent-lime" />
          <span>{t('about_exp_title')}</span>
        </h2>

        <div className="space-y-4">
          {experienceTimeline.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card-DEFAULT border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-accent-lime/40 transition-all">
              <div>
                <span className="text-xs font-mono text-accent-lime font-bold block">{item.year}</span>
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
