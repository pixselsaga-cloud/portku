"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { Copy, Download, Send, Instagram, ArrowUpRight, ShieldCheck, MessageCircle, Lock } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const phoneNum = "+998 88 919 18 09";
  const emailAddr = "pixselsaga@gmail.com";
  const tgDirectUrl = "https://t.me/otajon9999?text=Assalomu%20alekum";
  const tgChannelUrl = "https://t.me/ustozmee";
  const instaUrl = "https://instagram.com/ustozmee";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNum);
    showToast(t('contact_phone_copied'), 'success');
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-16 pb-12 overflow-hidden">
      {/* Glow Orbs background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 lime-glow-halo opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Studio Statement with user_avatar.jpg */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-lime via-accent-emerald to-accent-cyan p-[1px] shadow-lg shadow-accent-lime/20 overflow-hidden">
                <img
                  src="/assets/user_avatar.jpg"
                  alt="Otajon Jahongirov Avatar"
                  className="w-full h-full object-cover rounded-[11px]"
                />
              </div>
              <span className="font-display font-bold text-white text-xl tracking-tight">
                OTAJON JAHONGIROV
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              {t('hero_subtitle')}
            </p>
            
            {/* Direct Telegram CTA Button with Glow & Clean Label */}
            <div className="pt-1">
              <a
                href={tgDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent-lime hover:bg-accent-limeBright text-black font-display font-bold text-xs shadow-xl shadow-accent-lime/25 transition-all hover:scale-105 active:scale-95 group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-black group-hover:scale-110 transition-transform" />
                <span>{t('tg_contact_btn')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-accent-lime bg-accent-lime/10 border border-accent-lime/20 px-3.5 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('verified_studio')}</span>
            </div>
          </div>

          {/* Direct Contact & Phone Copy */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-gray-400">
              {t('nav_contact')}
            </h4>

            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-medium">{t('contact_direct_phone')}</p>
              <div className="flex items-center gap-2">
                <a href={`tel:${phoneNum.replace(/\s+/g, '')}`} className="font-mono text-white text-sm font-bold hover:text-accent-lime transition-colors">
                  {phoneNum}
                </a>
                <button
                  onClick={handleCopyPhone}
                  title="Copy Phone Number"
                  className="p-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-400 hover:text-white hover:border-accent-lime transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-medium">{t('contact_studio_email')}</p>
              <a href={`mailto:${emailAddr}`} className="text-white hover:text-accent-lime transition-colors font-mono text-xs font-semibold">
                {emailAddr}
              </a>
            </div>

            {/* CV Download CTA */}
            <div className="pt-2">
              <a
                href="/assets/Otajon_Jahongirov_CV.pdf"
                download
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white hover:border-accent-lime hover:bg-accent-lime/10 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-accent-lime" />
                <span>{t('cv_download')}</span>
              </a>
            </div>
          </div>

          {/* Social Channels — Telegram & Instagram ONLY */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-gray-400">
              {t('social_channels')}
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              
              {/* Telegram Lichka */}
              <a
                href={tgDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-card-DEFAULT border border-white/10 hover:border-accent-lime/50 text-white font-medium hover:bg-accent-lime/10 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-accent-lime group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{t('tg_direct')}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Telegram Kanal */}
              <a
                href={tgChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-card-DEFAULT border border-white/10 hover:border-accent-cyan/50 text-white font-medium hover:bg-accent-cyan/10 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-accent-cyan group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{t('tg_channel')}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Instagram */}
              <a
                href={instaUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-card-DEFAULT border border-white/10 hover:border-accent-rose/50 text-white font-medium hover:bg-accent-rose/10 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-accent-rose group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Instagram</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer Bar with Admin link for Otajon */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Otajon Jahongirov Creative Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/client" className="hover:text-gray-300 transition-colors">
              {t('nav_client')}
            </Link>
            <Link href="/admin" className="flex items-center gap-1.5 text-gray-600 hover:text-accent-lime transition-colors font-mono text-[11px]">
              <Lock className="w-3 h-3 text-accent-lime" />
              <span>Studio Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
