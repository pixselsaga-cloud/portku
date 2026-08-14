"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { ScheduleModal } from '@/components/ScheduleModal';
import {
  Send,
  Clock,
  Copy,
  MessageSquare,
  Phone,
  Mail,
  Instagram,
  Send as TelegramIcon,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const phoneNum = "+998 88 919 18 09";
  const emailAddr = "pixselsaga@gmail.com";
  const tgDirectUrl = "https://t.me/otajon9999?text=Assalomu%20alekum";
  const tgChannelUrl = "https://t.me/ustozmee";
  const instaUrl = "https://instagram.com/ustozmee";

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNum);
    showToast(t('contact_phone_copied'), 'success');
  };

  const handleContactSubmit = async (e?: React.FormEvent, scheduledAt?: string) => {
    if (e) e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, scheduledAt }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          scheduledAt
            ? `Message scheduled for delivery on ${new Date(scheduledAt).toLocaleString()}`
            : t('contact_success_msg'),
          'success'
        );
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        showToast(data.error || 'Failed to send message', 'warning');
      }
    } catch (err: any) {
      showToast('Network error while sending message', 'warning');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="section-headline font-display font-bold text-white tracking-tight">
          {t('contact_title')}
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          {t('contact_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          
          {/* Direct Telegram Chat CTA */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-accent-purple/20 via-card-DEFAULT to-card-DEFAULT border border-accent-purple/30 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-accent-purple/20 border border-accent-purple/40 flex items-center justify-center text-accent-purple">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">{t('contact_tg_title')}</h3>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                {t('contact_tg_desc')}
              </p>
            </div>
            <a
              href={tgDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent-blue/30 hover:scale-[1.02] active:scale-95 transition-all group"
            >
              <TelegramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('tg_contact_btn')}</span>
            </a>
          </div>

          {/* Direct Phone & Email */}
          <div className="p-6 rounded-3xl bg-card-DEFAULT border border-card-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-purple">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-gray-500 block mb-0.5">{t('contact_direct_phone')}</span>
                <div className="flex items-center gap-2">
                  <a href={`tel:${phoneNum.replace(/\s+/g, '')}`} className="font-mono text-white text-sm font-bold hover:text-accent-purple transition-colors">
                    {phoneNum}
                  </a>
                  <button onClick={handleCopyPhone} className="text-gray-400 hover:text-white p-1">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-accent-cyan">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-gray-500 block mb-0.5">{t('contact_studio_email')}</span>
                <a href={`mailto:${emailAddr}`} className="font-mono text-white text-sm font-bold hover:text-accent-cyan transition-colors">
                  {emailAddr}
                </a>
              </div>
            </div>
          </div>

          {/* Social Channels — Telegram & Instagram ONLY */}
          <div className="p-6 rounded-3xl bg-card-DEFAULT border border-card-border space-y-3">
            <h4 className="font-display font-semibold text-white text-xs uppercase tracking-wider text-gray-400">{t('social_channels')}</h4>
            <div className="space-y-2.5 text-xs">
              
              {/* Telegram Lichka */}
              <a href={tgDirectUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 text-gray-200 hover:text-white hover:border-accent-blue/40 hover:bg-accent-blue/10 transition-all group">
                <span className="flex items-center gap-2.5 font-semibold">
                  <TelegramIcon className="w-4 h-4 text-accent-blue group-hover:scale-110 transition-transform" />
                  <span>{t('tg_direct')}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Telegram Kanal */}
              <a href={tgChannelUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 text-gray-200 hover:text-white hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all group">
                <span className="flex items-center gap-2.5 font-semibold">
                  <TelegramIcon className="w-4 h-4 text-accent-cyan group-hover:scale-110 transition-transform" />
                  <span>{t('tg_channel')}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Instagram */}
              <a href={instaUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/5 text-gray-200 hover:text-white hover:border-accent-rose/40 hover:bg-accent-rose/10 transition-all group">
                <span className="flex items-center gap-2.5 font-semibold">
                  <Instagram className="w-4 h-4 text-accent-rose group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-6">
          
          <div className="space-y-1">
            <h3 className="font-display font-bold text-white text-lg">{t('contact_send_msg')}</h3>
            <p className="text-gray-400 text-xs">{t('contact_form_desc')}</p>
          </div>

          <form onSubmit={(e) => handleContactSubmit(e)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">{t('request_name')}</label>
                <input
                  type="text"
                  required
                  placeholder="Otajon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">{t('request_email')}</label>
                <input
                  type="email"
                  required
                  placeholder="pixselsaga@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">{t('request_phone')}</label>
              <input
                type="tel"
                placeholder="+998 88 919 18 09"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">{t('request_details')}</label>
              <textarea
                required
                rows={4}
                placeholder={t('contact_msg_placeholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-purple resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-sm font-semibold shadow-lg shadow-accent-purple/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t('sending_text') : t('contact_send_now')}</span>
              </button>

              <button
                type="button"
                onClick={() => setScheduleModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-300 text-xs font-medium flex items-center justify-center gap-2 hover:bg-white/[0.1] transition-all"
              >
                <Clock className="w-4 h-4 text-accent-gold" />
                <span>{t('contact_schedule')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Message Scheduler Modal */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onConfirm={(isoDate) => handleContactSubmit(undefined, isoDate)}
      />
    </div>
  );
}
