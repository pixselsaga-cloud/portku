"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Download,
  Eye,
  Heart,
  MessageSquare,
  Award,
  Briefcase,
  Users,
  Layers,
  Palette,
  Layout,
  Box,
  Film,
  Video,
  Megaphone,
  Compass
} from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const { showToast } = useToast();

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [statsList, setStatsList] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjectsList(data.projects.slice(0, 6));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) {
        setServicesList(data.services.slice(0, 8));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success) {
        setStatsList(data.stats);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Layout': return Layout;
      case 'Box': return Box;
      case 'Film': return Film;
      case 'Video': return Video;
      case 'Megaphone': return Megaphone;
      case 'Compass': return Compass;
      default: return Palette;
    }
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return Briefcase;
      case 'Users': return Users;
      case 'Layers': return Layers;
      default: return Award;
    }
  };

  return (
    <div className="space-y-24 py-6">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-8 max-w-7xl mx-auto pt-8">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-accent-purple/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="text-center space-y-6 relative z-10 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] text-accent-purple text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Otajon Jahongirov Digital Studio</span>
          </div>

          <h1 className="hero-headline font-display font-extrabold text-white tracking-tight">
            Graphic Designer & Creative Digital Artist
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan text-white text-xs font-bold shadow-xl shadow-accent-purple/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              <span>{t('hero_cta_primary')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/request"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.12] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-all"
            >
              <span>{t('hero_cta_secondary')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-card-DEFAULT border border-card-border shadow-2xl">
          {statsList.map((st) => {
            const IconC = getStatIcon(st.icon);
            const label = lang === 'ru' ? (st.labelRu || st.labelUz) : lang === 'en' ? (st.labelEn || st.labelUz) : st.labelUz;
            return (
              <div key={st.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 text-center sm:text-left">
                <div className="w-8 h-8 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple mx-auto sm:mx-0">
                  <IconC className="w-4 h-4" />
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  {st.value}
                </div>
                <div className="text-gray-400 text-xs font-medium">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PORTFOLIO WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-card-border pb-6">
          <div>
            <span className="text-xs font-mono text-accent-purple uppercase tracking-widest font-bold">Showcase Catalog</span>
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl tracking-tight mt-1">
              Featured Artwork & Projects
            </h2>
          </div>

          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent-purple hover:text-white transition-colors"
          >
            <span>View All Works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* 4. DYNAMIC SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono text-accent-purple uppercase tracking-widest font-bold">{t('nav_services')}</span>
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl tracking-tight">
            Creative Services & Disciplines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((svc) => {
            const IconC = getServiceIcon(svc.icon);
            const title = lang === 'ru' ? (svc.titleRu || svc.titleUz) : lang === 'en' ? (svc.titleEn || svc.titleUz) : svc.titleUz;
            const desc = lang === 'ru' ? (svc.descRu || svc.descUz) : lang === 'en' ? (svc.descEn || svc.descUz) : svc.descUz;

            return (
              <div
                key={svc.id}
                className="p-6 rounded-3xl bg-card-DEFAULT border border-card-border hover:border-accent-purple/50 transition-all duration-300 space-y-4 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-purple group-hover:scale-110 group-hover:bg-accent-purple/10 transition-all">
                    <IconC className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-accent-purple transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <Link
                    href={svc.buttonUrl || '/request'}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-accent-purple hover:text-white transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>{svc.buttonText || 'Request Service'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. START A PROJECT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-accent-purple/20 via-card-DEFAULT to-accent-blue/20 border border-accent-purple/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-3 max-w-xl mx-auto relative z-10">
            <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl tracking-tight">
              Ready to Launch Your Visual Identity?
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              Direct consultation, hyper-realistic 3D rendering, and brutalist poster design.
            </p>
          </div>

          <div className="pt-2 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs font-bold shadow-xl shadow-accent-purple/30 hover:scale-105 transition-all"
            >
              Start Project Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
