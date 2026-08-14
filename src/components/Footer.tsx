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
    <footer className="relative border-t border-card-border bg-background pt-16 pb-12 overflow-hidden">
      {/* Glow Orbs background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Studio Statement with user_avatar.jpg */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-purple via-accent-blue to-accent-cyan p-[1px] shadow-lg shadow-accent-purple/20 overflow-hidden">
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
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan hover:opacity-95 text-white font-display font-bold text-xs shadow-xl shadow-accent-blue/30 transition-all hover:scale-105 active:scale-95 group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white group-hover:scale-110 transition-transform" />
                <span>{t('tg_contact_btn')}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/20 px-3.5 py-1.5 rounded-full w-fit">
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
              <p className="text-gray-400 text-xs font-medium">Direct Phone</p>
              <div className="flex items-center gap-2">
                <a href={`tel:${phoneNum.replace(/\s+/g, '')}`} className="font-mono text-white text-sm font-bold hover:text-accent-purple transition-colors">
                  {phoneNum}
                </a>
                <button
                  onClick={handleCopyPhone}
                  title="Copy Phone Number"
                  className="p-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-400 hover:text-white hover:border-accent-purple transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-medium">Studio Email</p>
              <a href={`mailto:${emailAddr}`} className="text-white hover:text-accent-purple transition-colors font-mono text-xs font-semibold">
                {emailAddr}
              </a>
            </div>

            {/* CV Download CTA */}
            <div className="pt-2">
              <a
                href="/assets/Otajon_Jahongirov_CV.pdf"
                download
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white hover:border-accent-purple hover:bg-accent-purple/10 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-accent-purple" />
                <span>{t('cv_download')}</span>
              </a>
            </div>
          </div>

          {/* Social Channels — Telegram & Instagram ONLY */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-gray-400">
              Social Channels
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              
              {/* Telegram Lichka */}
              <a
                href={tgDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-card-DEFAULT border border-card-border hover:border-accent-blue/50 text-white font-medium hover:bg-accent-blue/10 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-accent-blue group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{t('tg_direct')}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Telegram Kanal */}
              <a
                href={tgChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-card-DEFAULT border border-card-border hover:border-accent-cyan/50 text-white font-medium hover:bg-accent-cyan/10 transition-all group"
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
                className="flex items-center justify-between p-3 rounded-2xl bg-card-DEFAULT border border-card-border hover:border-accent-rose/50 text-white font-medium hover:bg-accent-rose/10 transition-all group"
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
            <Link href="/admin" className="flex items-center gap-1.5 text-gray-600 hover:text-accent-purple transition-colors font-mono text-[11px]">
              <Lock className="w-3 h-3 text-accent-purple" />
              <span>Studio Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
