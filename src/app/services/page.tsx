"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Palette,
  Sparkles,
  Layout,
  Box,
  Film,
  Video,
  Megaphone,
  Compass,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function ServicesPage() {
  const { lang, t } = useLanguage();
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) {
        setServicesList(data.services);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-mono tracking-wider uppercase">
          {t('nav_services')}
        </span>
        <h1 className="hero-headline font-display font-bold text-white tracking-tight">
          Specialized Studio Capabilities & Solutions
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          High-end visual communication, 3D CGI rendering, and digital studio execution.
        </p>
      </div>

      {/* Services Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesList.map((svc) => {
          const IconC = getIconComponent(svc.icon);
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
    </div>
  );
}
