"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import {
  CheckCircle,
  Clock,
  Download,
  Send,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function ClientProjectPage() {
  const { code } = useParams() as { code: string };
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (!code) return;
    fetch(`/api/client-portal?code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProject(data.project);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [code]);

  const handleSendFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setSubmittingFeedback(true);
    try {
      const res = await fetch('/api/client-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, comment: feedback, sender: 'client' }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Feedback submitted to studio team!', 'success');
        setFeedback('');
        // Refresh project data
        const ref = await fetch(`/api/client-portal?code=${code}`);
        const refData = await ref.json();
        if (refData.success) setProject(refData.project);
      }
    } catch (err) {
      showToast('Error submitting feedback', 'warning');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleApproveProject = async () => {
    try {
      const res = await fetch('/api/client-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, action: 'approve' }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Project officially approved & completed! Thank you!', 'success');
        setProject((prev: any) => ({ ...prev, status: 'completed' }));
      }
    } catch (err) {
      showToast('Approval error', 'warning');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-xl" />
        <div className="h-64 bg-white/5 rounded-2xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-accent-rose mx-auto" />
        <h2 className="text-lg font-bold text-white">Invalid Access Code</h2>
        <p className="text-xs text-gray-400">Please check your code with Otajon Jahongirov Studio.</p>
      </div>
    );
  }

  const deliverables = project.deliverables ? JSON.parse(project.deliverables) : [];

  const statuses = ['pending', 'in_progress', 'review', 'completed'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-accent-purple font-bold">
              Private Project Room
            </span>
            <h1 className="font-display font-bold text-white text-2xl tracking-tight">
              {project.title}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Client: <span className="text-white font-medium">{project.clientName}</span> ({project.clientEmail})
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-gray-300 w-fit">
            CODE: <span className="text-white font-bold">{project.accessCode}</span>
          </div>
        </div>

        {/* Status Stepper */}
        <div className="pt-4 border-t border-white/[0.08]">
          <h3 className="text-xs font-mono uppercase text-gray-400 mb-4">Project Milestones</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statuses.map((st, i) => {
              const activeIndex = statuses.indexOf(project.status);
              const isPast = i <= activeIndex;
              const isCurrent = i === activeIndex;

              return (
                <div
                  key={st}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-accent-purple/20 border-accent-purple text-white shadow-lg'
                      : isPast
                      ? 'bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald'
                      : 'bg-black/30 border-white/10 text-gray-500'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold mb-1">
                    Step 0{i + 1}
                  </div>
                  <div className="text-xs font-semibold uppercase">
                    {t(`client_status_${st}` as any) || st}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deliverable Files Section */}
      <div className="p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-4">
        <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-accent-purple" />
          <span>{t('client_deliverables')}</span>
        </h3>

        <div className="space-y-3">
          {deliverables.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5"
            >
              <div>
                <div className="font-semibold text-white text-sm">{item.name}</div>
                <div className="text-xs text-gray-400 font-mono">{item.size}</div>
              </div>

              <a
                href={item.url || '#'}
                download
                className="px-4 py-2 rounded-xl bg-accent-purple text-white text-xs font-semibold flex items-center gap-2 hover:bg-accent-purple/90 transition-all shadow-lg shadow-accent-purple/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback & Notes Section */}
      <div className="p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-6">
        <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-accent-cyan" />
          <span>{t('client_feedback_title')}</span>
        </h3>

        {/* Comment Thread */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {project.feedbacks && project.feedbacks.length > 0 ? (
            project.feedbacks.map((fb: any) => (
              <div
                key={fb.id}
                className={`p-4 rounded-2xl text-xs space-y-1 ${
                  fb.sender === 'client'
                    ? 'bg-accent-purple/10 border border-accent-purple/30 text-white ml-6'
                    : 'bg-black/50 border border-white/10 text-gray-300 mr-6'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span className="uppercase font-bold">{fb.sender === 'client' ? 'Client' : 'Studio Lead (Otajon)'}</span>
                  <span>{new Date(fb.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="leading-relaxed">{fb.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">No feedback submitted yet.</p>
          )}
        </div>

        {/* Send Comment Input */}
        <form onSubmit={handleSendFeedback} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type feedback or revision note..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-purple"
          />
          <button
            type="submit"
            disabled={submittingFeedback}
            className="px-5 py-2.5 rounded-xl bg-accent-purple text-white text-xs font-semibold flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

        {/* Project Final Approval Button */}
        {project.status !== 'completed' && (
          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={handleApproveProject}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-emerald to-accent-cyan text-white text-sm font-bold shadow-xl shadow-accent-emerald/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t('client_approve_project')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
