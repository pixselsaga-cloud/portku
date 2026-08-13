"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/i18n';
import { Sparkles, Globe, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret Keyboard Shortcut (Ctrl + Shift + A) to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        router.push('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/works', label: t('nav_works') },
    { href: '/services', label: t('nav_services') },
    { href: '/about', label: t('nav_about') },
    { href: '/client', label: t('nav_client') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-background/60 border-b border-card-border transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Custom Vector Avatar */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-purple via-accent-blue to-accent-cyan p-[1px] transition-transform duration-300 group-hover:scale-105 overflow-hidden shadow-lg shadow-accent-purple/20">
            <img
              src="/assets/user_avatar.jpg"
              alt="Otajon Jahongirov Avatar"
              className="w-full h-full object-cover rounded-[11px]"
            />
          </div>
          <div>
            <span className="font-display font-bold tracking-tight text-white text-base block group-hover:text-accent-purple transition-colors">
              OTAJON JAHONGIROV
            </span>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium block">
              Creative Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-inner font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-full text-xs">
            <Globe className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  lang === l.code
                    ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Start Project CTA */}
          <Link
            href="/request"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue hover:from-accent-purple/90 hover:to-accent-blue/90 text-white text-xs font-semibold shadow-lg shadow-accent-purple/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('nav_request')}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-full text-xs">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-0.5 rounded-full font-medium transition-all ${
                  lang === l.code
                    ? 'bg-accent-purple text-white'
                    : 'text-gray-400'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-card-border flex flex-col gap-3 pb-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/request"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('nav_request')}</span>
          </Link>
        </div>
      )}
    </header>
  );
};
