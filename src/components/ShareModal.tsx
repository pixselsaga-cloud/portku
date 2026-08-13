"use client";

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { Send, Twitter, Linkedin, Link as LinkIcon, X } from 'lucide-react';

interface ShareModalProps {
  projectTitle: string;
  projectSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  projectTitle,
  projectSlug,
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  if (!isOpen) return null;

  const url = typeof window !== 'undefined' ? `${window.location.origin}/works/${projectSlug}` : '';

  const trackShare = (platform: string) => {
    fetch(`/api/projects/${projectSlug}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    }).catch(() => {});
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    trackShare('Copy Link');
    showToast('Project link copied to clipboard!', 'success');
  };

  const handleTelegram = () => {
    trackShare('Telegram');
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(projectTitle)}`, '_blank');
  };

  const handleX = () => {
    trackShare('X');
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(projectTitle)}`, '_blank');
  };

  const handleLinkedIn = () => {
    trackShare('LinkedIn');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-card-DEFAULT border border-card-border p-6 rounded-2xl shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-white text-lg">Share Project</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Share <span className="text-white font-medium">"{projectTitle}"</span> across social channels or copy link directly.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleTelegram}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 transition-all font-medium text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>
          
          <button
            onClick={handleX}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-all font-medium text-sm"
          >
            <Twitter className="w-4 h-4" />
            <span>X (Twitter)</span>
          </button>

          <button
            onClick={handleLinkedIn}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/20 transition-all font-medium text-sm"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/20 transition-all font-medium text-sm"
          >
            <LinkIcon className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </div>

        {/* URL Preview */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 overflow-hidden font-mono">
          <span className="truncate">{url}</span>
        </div>
      </div>
    </div>
  );
};
