"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClientPortalLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    router.push(`/client/${code.trim()}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-8">
      <div className="space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-accent-lime/10 border border-accent-lime/30 flex items-center justify-center text-accent-lime mx-auto shadow-lg shadow-accent-lime/10">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="font-display font-bold text-white text-2xl tracking-tight">
          {t('client_title')}
        </h1>
        <p className="text-gray-400 text-xs">
          {t('client_enter_code')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-card-DEFAULT border border-white/10 space-y-4 shadow-2xl">
        <input
          type="text"
          required
          placeholder={t('client_code_placeholder')}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full text-center tracking-widest font-mono uppercase bg-black/50 border border-accent-lime/30 rounded-xl px-4 py-3 text-sm text-accent-lime font-bold focus:outline-none focus:border-accent-lime"
        />

        <button
          type="submit"
          className="w-full py-3.5 rounded-full bg-accent-lime text-black text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-accent-lime/25 hover:bg-accent-limeBright hover:scale-105 active:scale-95 transition-all"
        >
          <span>{t('client_access_btn')}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-accent-lime" />
        <span>End-to-End Encrypted Private Deliverables Portal</span>
      </div>
    </div>
  );
}
