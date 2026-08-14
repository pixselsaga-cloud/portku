"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { Sparkles, Bot, Send, CheckCircle2, FileText, Upload, Paperclip } from 'lucide-react';

export default function DesignRequestPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'form' | 'ai'>('form');

  // Form State
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectDetails, setProjectDetails] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // AI Brief Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content: "Salom! Men Otajon Jahongirov Studio AI yordamchisiman. Loyihangiz haqida oddiy tilda yozing (masalan: 'Instagram uchun Mercedes AMG haqida premium qora poster kerak'). Men sizga kerakli savollarni berib, tayyor professional Project Brief yaratib beraman!"
    }
  ]);
  const [aiGeneratedBrief, setAiGeneratedBrief] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const availableServices = [
    'Logo',
    'Branding',
    'Poster',
    'Social Media Design',
    'UI/UX',
    'Website',
    '3D Design',
    'Motion Design',
    'Video Editing',
    'Other',
  ];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleAttachmentUpload = async (file: File) => {
    setAttachedFile(file);
    setUploadingAttachment(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'Request Attachment');
      formData.append('description', `Client Reference Attachment from ${clientName || 'Inquirer'}`);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setAttachmentUrl(data.file.fileUrl);
        showToast(`Reference file "${file.name}" attached successfully!`, 'success');
      } else {
        showToast('Attachment upload error', 'warning');
      }
    } catch (err) {
      showToast('Network error during file attachment', 'warning');
    } finally {
      setUploadingAttachment(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !email || !projectDetails) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          email,
          phone,
          services: selectedServices,
          projectDetails,
          targetAudience,
          stylePreference,
          deadline,
          budget,
          attachments: attachmentUrl ? [attachmentUrl] : [],
          aiBrief: aiGeneratedBrief,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast('Design Request & Reference Files successfully submitted!', 'success');
        setClientName('');
        setEmail('');
        setPhone('');
        setSelectedServices([]);
        setProjectDetails('');
        setTargetAudience('');
        setStylePreference('');
        setDeadline('');
        setBudget('');
        setAttachedFile(null);
        setAttachmentUrl(null);
      } else {
        showToast(data.error || 'Submission error', 'warning');
      }
    } catch (err) {
      showToast('Network error during request submission', 'warning');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAiSendMessage = async () => {
    if (!aiPrompt.trim()) return;

    const userText = aiPrompt;
    setAiPrompt('');
    setAiChatHistory((prev) => [...prev, { role: 'user', content: userText }]);
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          history: aiChatHistory,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiChatHistory((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        if (data.brief) {
          setAiGeneratedBrief(data.brief);
          showToast('AI synthesized formal project brief!', 'success');
        }
      }
    } catch (err) {
      showToast('AI response error', 'warning');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="section-headline font-display font-bold text-white tracking-tight">
          {t('request_title')}
        </h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          {t('request_subtitle')}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center p-1.5 rounded-full bg-card-DEFAULT border border-white/10 w-fit mx-auto">
        <button
          onClick={() => setActiveTab('form')}
          className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'form'
              ? 'bg-accent-lime text-black shadow-lg shadow-accent-lime/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {t('request_tab_form')}
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'ai'
              ? 'bg-accent-lime text-black shadow-lg shadow-accent-lime/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>{t('request_tab_ai')}</span>
        </button>
      </div>

      {/* 1. STANDARD QUESTIONNAIRE FORM */}
      {activeTab === 'form' ? (
        <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 rounded-3xl bg-card-DEFAULT border border-white/10 space-y-6 shadow-2xl">
          
          {/* Services Selection Grid */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-accent-lime font-bold">
              {t('request_services_needed')}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((srv) => {
                const isSelected = selectedServices.includes(srv);
                return (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => toggleService(srv)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-accent-lime text-black border-accent-lime font-bold shadow-lg shadow-accent-lime/20'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {srv}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">{t('request_name')}</label>
              <input
                type="text"
                required
                placeholder="Sarah Jenkins"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-lime"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">{t('request_email')}</label>
              <input
                type="email"
                required
                placeholder="sarah@brand.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-lime"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">{t('request_phone')}</label>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-lime"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">{t('request_details')}</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your brand goals, vision, and deliverables..."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-lime resize-none"
            />
          </div>

          {/* Additional Scope */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">{t('request_deadline')}</label>
              <input
                type="text"
                placeholder="e.g. 3 Weeks"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-lime"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">{t('request_budget')}</label>
              <input
                type="text"
                placeholder="e.g. $2,500 - $5,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-lime"
              />
            </div>
          </div>

          {/* File Attachment Uploader (JPG, PNG, PDF, ZIP, RAR, AI, PSD, etc.) */}
          <div className="space-y-2 pt-2 border-t border-white/[0.08]">
            <label className="block text-xs font-medium text-gray-300 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-accent-lime" />
              <span>Reference File / Brand Attachments (JPG, PNG, PDF, ZIP, RAR, PSD, AI, FIG)</span>
            </label>
            
            <div className="flex items-center gap-3">
              <input
                type="file"
                id="requestAttachmentInput"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleAttachmentUpload(f);
                }}
                className="hidden"
              />
              <label
                htmlFor="requestAttachmentInput"
                className="px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-accent-lime text-xs text-gray-300 hover:text-white cursor-pointer flex items-center gap-2 transition-all"
              >
                <Upload className="w-4 h-4 text-accent-lime" />
                <span>{attachedFile ? attachedFile.name : 'Fayl biriktirish (Attach File)'}</span>
              </label>

              {uploadingAttachment && (
                <span className="text-xs font-mono text-accent-cyan animate-pulse">Uploading file...</span>
              )}
              {attachmentUrl && (
                <span className="text-xs font-mono text-accent-lime flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              )}
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={submitting || uploadingAttachment}
            className="w-full py-3.5 rounded-full bg-accent-lime text-black text-xs sm:text-sm font-bold shadow-xl shadow-accent-lime/25 flex items-center justify-center gap-2 hover:bg-accent-limeBright hover:scale-[1.01] active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span>{submitting ? 'Submitting...' : t('request_submit')}</span>
          </button>
        </form>
      ) : (
        
        /* 2. AI BRIEF ASSISTANT CHAT */
        <div className="p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">Studio AI Brief Generator</h3>
              <p className="text-gray-400 text-xs">AI-driven automated brief synthesis for studio commissions</p>
            </div>
          </div>

          {/* Chat History Messages */}
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {aiChatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-md p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-accent-purple text-white rounded-br-none'
                      : 'bg-black/50 border border-white/10 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="text-xs font-mono text-accent-cyan animate-pulse">
                AI Assistant is thinking...
              </div>
            )}
          </div>

          {/* AI Output Generated Brief Card */}
          {aiGeneratedBrief && (
            <div className="p-5 rounded-2xl bg-black/60 border border-accent-cyan/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-accent-cyan font-bold flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{t('request_ai_generated_brief')}</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono">STATUS: READY FOR REVIEW</span>
              </div>
              <div className="text-xs space-y-1 text-gray-200">
                <p><strong>Title:</strong> {aiGeneratedBrief.title}</p>
                <p><strong>Category:</strong> {aiGeneratedBrief.category}</p>
                <p><strong>Style:</strong> {aiGeneratedBrief.style}</p>
                <p><strong>Deliverables:</strong> {aiGeneratedBrief.deliverables?.join(', ')}</p>
                <p><strong>Estimated Budget:</strong> {aiGeneratedBrief.estimatedBudget}</p>
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={t('request_ai_chat_placeholder')}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSendMessage()}
              className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-accent-cyan"
            />
            <button
              onClick={handleAiSendMessage}
              disabled={aiLoading}
              className="p-3 rounded-xl bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
