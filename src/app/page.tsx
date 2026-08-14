"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
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
  Compass,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Cpu,
  Target
} from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const { showToast } = useToast();

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [statsList, setStatsList] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(0);

  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
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
      const res = await fetch('/api/services', { cache: 'no-store' });
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
      const res = await fetch('/api/stats', { cache: 'no-store' });
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

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Audit',
      desc: 'We begin by learning your brand goals, target audience, and current design challenges through a deep-dive strategy call.',
    },
    {
      step: '02',
      title: 'Concept & Planning',
      desc: 'Creating a tailored creative blueprint with key visuals, moodboards, 3D wireframes, and high-converting asset roadmaps.',
    },
    {
      step: '03',
      title: 'Production & Development',
      desc: 'Executing photorealistic 3D rendering, dark luxury typography, motion graphic edits, and Figma UI design systems.',
    },
    {
      step: '04',
      title: 'Launch & Delivery',
      desc: 'Finalizing all high-resolution digital assets, master source files, and deploying your visual identity to market.',
    },
    {
      step: '05',
      title: 'Growth & Support',
      desc: 'Ongoing creative retainer support, campaign iterations, and analytics optimization for sustainable brand scaling.',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 py-4 sm:py-6">
      
      {/* 1. HERO SECTION (Electric Lime Dark Theme matching reference) */}
      <section className="relative px-4 sm:px-8 max-w-7xl mx-auto pt-6 sm:pt-12 text-center">
        
        {/* Lime Glowing Radial Halo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] lime-glow-halo pointer-events-none rounded-full" />

        <div className="text-center space-y-5 sm:space-y-7 relative z-10 max-w-4xl mx-auto">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-accent-lime/30 text-accent-lime text-[11px] sm:text-xs font-mono tracking-wider uppercase backdrop-blur-md shadow-lg shadow-accent-lime/10">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-accent-lime" />
            <span>Otajon Jahongirov • Studio & Creative Partner</span>
          </div>

          {/* Main Headline with Highlighted Lime Text */}
          <h1 className="hero-headline font-display font-extrabold text-white tracking-tight leading-[1.05]">
            Smart Systems, <span className="text-accent-lime font-black">Collaborate Seamlessly</span>, Succeed Efficiently
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {t('hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 w-full">
            <Link
              href="/works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent-lime text-black text-xs sm:text-sm font-bold shadow-xl shadow-accent-lime/25 flex items-center justify-center gap-2 hover:bg-accent-limeBright hover:scale-105 active:scale-95 transition-all"
            >
              <span>{t('hero_cta_primary')}</span>
              <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
            </Link>

            <Link
              href="/request"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/[0.1] hover:border-accent-lime/40 transition-all"
            >
              <span>{t('hero_cta_secondary')}</span>
            </Link>
          </div>
        </div>

        {/* Interactive Dashboard / Sales Target Mockup Showcase (Matching Reference Image Section 2) */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto relative z-10 rounded-3xl bg-card-DEFAULT border border-white/10 p-4 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Mockup Card 1 */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/[0.06] text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center text-accent-lime">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">A complete overview of our actions</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Clear tracking of brand identity systems, 3D renders, and campaign deliverables.
              </p>
            </div>

            {/* Mockup Card 2 */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/[0.06] text-left space-y-3">
              <div className="w-8 h-8 rounded-lg bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center text-accent-lime">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-white text-sm">Complete statistics of your business</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Real-time audience engagement, likes, and asset downloads breakdown.
              </p>
            </div>

            {/* Mockup Card 3: Glowing Lime Sales Graph */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/[0.06] text-left space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-white text-xs">Sales / Target</span>
                <span className="text-[10px] font-mono text-accent-lime font-bold bg-accent-lime/10 px-2 py-0.5 rounded-full border border-accent-lime/20">+94.8%</span>
              </div>
              <div className="text-2xl font-display font-black text-white">$142,850</div>
              
              {/* Graphic Chart SVG */}
              <div className="h-16 w-full pt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <path
                    d="M 0 35 Q 20 10, 40 25 T 80 5 T 100 15 L 100 40 L 0 40 Z"
                    fill="url(#limeGradient)"
                    opacity="0.3"
                  />
                  <path
                    d="M 0 35 Q 20 10, 40 25 T 80 5 T 100 15"
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="3"
                  />
                  <defs>
                    <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a3e635" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-card-DEFAULT border border-white/[0.08] shadow-2xl">
          {statsList.map((st) => {
            const IconC = getStatIcon(st.icon);
            const label = lang === 'ru' ? (st.labelRu || st.labelUz) : lang === 'en' ? (st.labelEn || st.labelUz) : st.labelUz;
            return (
              <div key={st.id} className="p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/[0.05] space-y-1.5 text-center sm:text-left hover:border-accent-lime/40 transition-all">
                <div className="w-8 h-8 rounded-xl bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center text-accent-lime mx-auto sm:mx-0">
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

      {/* 3. FEATURE SHOWCASE: CLARITY & CONTROL (Matching Reference Image Section 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 rounded-3xl bg-card-DEFAULT border border-white/[0.08] relative overflow-hidden">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl tracking-tight leading-tight">
              Clarity and Control in Every Click — <span className="text-accent-lime">Streamline, Track, and Grow</span> with Ease
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Simplify design workflows, gain instant visual insights, and accelerate growth with high-precision artwork tailored for modern studio standards.
            </p>
            <div>
              <Link
                href="/request"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-lime text-black font-bold text-xs shadow-lg shadow-accent-lime/20 hover:bg-accent-limeBright transition-all"
              >
                <span>Take Control</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Column with Lime Pills & Analytics Mockup */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Interactive Pill Tabs */}
            <div className="flex flex-wrap gap-2">
              {['Product Strategy', 'Brand Identity', '3D Rendering', 'UI/UX Design', 'Motion Graphics'].map((tab, idx) => (
                <span
                  key={tab}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    idx === 0
                      ? 'bg-accent-lime text-black font-bold border-accent-lime'
                      : 'bg-black/40 border-white/10 text-gray-300'
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* Dashboard Conversion Box */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-black/60 border border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-accent-lime text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>CONVERSION</span>
                </div>
                <div className="text-xl font-display font-bold text-white">98.4%</div>
                <p className="text-[10px] text-gray-400">Turn audience into clients</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-accent-cyan text-xs font-bold">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>ANALYTICS</span>
                </div>
                <div className="text-xl font-display font-bold text-white">Real-Time</div>
                <p className="text-[10px] text-gray-400">Clear metrics, smart choices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENTO GRID SHOWCASE (Matching Reference Image Section 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl tracking-tight">
            Your <span className="text-accent-lime">Business & Brand</span>, Backed by Intelligence
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            High-octane design systems built for long-term scalability and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Electric Lime Highlight Card */}
          <div className="p-6 sm:p-8 rounded-3xl lime-card-active space-y-6 flex flex-col justify-between shadow-2xl transition-transform hover:scale-[1.02]">
            <div className="space-y-3">
              <h3 className="font-display font-extrabold text-black text-xl sm:text-2xl leading-tight">
                Process Automation
              </h3>
              <p className="text-black/80 text-xs leading-relaxed font-medium">
                We automate routine creative workflows to improve accuracy, save time, and boost overall efficiency.
              </p>
            </div>

            {/* Lime Bar Graphic */}
            <div className="flex items-end gap-2 h-20 pt-4">
              <div className="w-full h-[40%] bg-black/20 rounded-lg" />
              <div className="w-full h-[70%] bg-black/40 rounded-lg" />
              <div className="w-full h-[100%] bg-black/80 rounded-lg" />
              <div className="w-full h-[60%] bg-black/30 rounded-lg" />
              <div className="w-full h-[85%] bg-black/70 rounded-lg" />
            </div>
          </div>

          {/* Bento Card 2: Performance Analytics (Dark Glass with Lime Line Graph) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card-DEFAULT border border-white/10 space-y-6 flex flex-col justify-between shadow-xl hover:border-accent-lime/40 transition-all">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight">
                Performance Analytics
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Track creative asset views, engagement metrics, and conversion milestones with real-time accuracy.
              </p>
            </div>

            {/* Glowing Line Chart */}
            <div className="h-20 w-full pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <path
                  d="M 0 35 L 20 20 L 40 30 L 60 10 L 80 18 L 100 5"
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>

          {/* Bento Card 3: Business Strategy (Dark Glass with Lime Ring Chart) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card-DEFAULT border border-white/10 space-y-6 flex flex-col justify-between shadow-xl hover:border-accent-lime/40 transition-all">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight">
                Business Strategy
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                From brand positioning to long-term digital growth, we help build strategies that drive measurable results.
              </p>
            </div>

            {/* Lime Ring Chart Graphic */}
            <div className="flex items-center justify-center py-2">
              <div className="w-16 h-16 rounded-full border-4 border-accent-lime border-t-transparent animate-spin-slow flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-accent-lime/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE STEP-BY-STEP (Matching Reference Image Section 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-accent-lime uppercase tracking-widest font-bold">How It Works</span>
            <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl tracking-tight mt-1">
              Begin <span className="text-accent-lime">Your Journey</span> with Us
            </h2>
          </div>

          <Link
            href="/request"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-lime text-black font-bold text-xs shadow-lg shadow-accent-lime/20 hover:bg-accent-limeBright transition-all"
          >
            <span>Take Control</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Step-by-Step Accordion List matching reference */}
        <div className="space-y-4">
          {processSteps.map((ps, idx) => {
            const isOpen = activeStep === idx;
            return (
              <div
                key={ps.step}
                onClick={() => setActiveStep(isOpen ? null : idx)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                  isOpen
                    ? 'bg-card-DEFAULT border-accent-lime/60 shadow-xl shadow-accent-lime/10'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <span className="font-mono font-bold text-accent-lime text-lg sm:text-xl">
                      {ps.step}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg sm:text-2xl">
                      {ps.title}
                    </h3>
                  </div>

                  <button className={`p-2 rounded-full border text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
                    isOpen ? 'bg-accent-lime text-black border-accent-lime' : 'bg-white/5 border-white/10 text-white'
                  }`}>
                    <span>{isOpen ? 'Close' : 'Learn More'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/10 text-gray-300 text-xs sm:text-sm leading-relaxed max-w-3xl animate-in fade-in duration-300">
                    {ps.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FEATURED PORTFOLIO WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6">
          <div>
            <span className="text-xs font-mono text-accent-lime uppercase tracking-widest font-bold">{t('showcase_catalog')}</span>
            <h2 className="font-display font-bold text-white text-xl sm:text-3xl tracking-tight mt-1">
              {t('featured_works_title')}
            </h2>
          </div>

          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent-lime hover:text-white transition-colors"
          >
            <span>{t('view_all_works')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projectsList.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* 7. DYNAMIC SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono text-accent-lime uppercase tracking-widest font-bold">{t('nav_services')}</span>
          <h2 className="font-display font-bold text-white text-xl sm:text-3xl tracking-tight">
            {t('services_title_full')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {servicesList.map((svc) => {
            const IconC = getServiceIcon(svc.icon);
            const title = lang === 'ru' ? (svc.titleRu || svc.titleUz) : lang === 'en' ? (svc.titleEn || svc.titleUz) : svc.titleUz;
            const desc = lang === 'ru' ? (svc.descRu || svc.descUz) : lang === 'en' ? (svc.descEn || svc.descUz) : svc.descUz;

            return (
              <div
                key={svc.id}
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card-DEFAULT border border-white/10 hover:border-accent-lime/50 transition-all duration-300 space-y-4 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-lime group-hover:scale-110 group-hover:bg-accent-lime/10 transition-all">
                    <IconC className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-accent-lime transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/[0.06]">
                  <Link
                    href={svc.buttonUrl || '/request'}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-accent-lime hover:text-white transition-colors group-hover:translate-x-1 transition-transform"
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

      {/* 8. CALLOUT BANNER (Matching Reference Image Bottom Callout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-card-DEFAULT border border-white/10 text-center space-y-5 shadow-2xl relative overflow-hidden">
          
          <div className="absolute inset-0 lime-glow-halo opacity-75 pointer-events-none" />

          <div className="space-y-3 max-w-xl mx-auto relative z-10">
            <h2 className="font-display font-extrabold text-white text-2xl sm:text-4xl tracking-tight">
              Boost <span className="text-accent-lime">Your Business & Brand</span> Now
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Upgrade your business workflow with deep creative insights, photorealistic 3D renders, and dark luxury branding.
            </p>
          </div>

          <div className="pt-2 relative z-10 flex items-center justify-center">
            <Link
              href="/request"
              className="px-8 py-3.5 rounded-full bg-accent-lime text-black text-xs sm:text-sm font-bold shadow-xl shadow-accent-lime/30 hover:bg-accent-limeBright hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('cta_btn')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
