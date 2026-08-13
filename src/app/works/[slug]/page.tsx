"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { WatermarkOverlay } from '@/components/WatermarkOverlay';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { ShareModal } from '@/components/ShareModal';
import { projectTranslations, categoryTranslations } from '@/lib/i18n';
import {
  Heart,
  Bookmark,
  Share2,
  Download,
  Eye,
  ArrowLeft,
  Calendar,
  User,
  Wrench,
  CheckCircle2,
  FileText,
  Lock,
  Play
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { slug } = useParams() as { slug: string };
  const { lang, t } = useLanguage();
  const { showToast } = useToast();

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [saves, setSaves] = useState(0);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProject(data.project);
          setLikes(data.project.likes);
          setSaves(data.project.saves);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleLike = () => {
    if (isLiked) return;
    setIsLiked(true);
    setLikes((prev) => prev + 1);
    showToast('Project Liked!', 'success');
    fetch(`/api/projects/${slug}/like`, { method: 'POST' }).catch(() => {});
  };

  const handleSave = () => {
    if (isSaved) {
      setIsSaved(false);
      setSaves((prev) => Math.max(0, prev - 1));
      showToast('Removed from saved collection.', 'info');
    } else {
      setIsSaved(true);
      setSaves((prev) => prev + 1);
      showToast('Saved to collection!', 'success');
      fetch(`/api/projects/${slug}/save`, { method: 'POST' }).catch(() => {});
    }
  };

  const handleDownload = async (fileId?: string) => {
    try {
      const res = await fetch(`/api/projects/${slug}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Asset download initiated!', 'success');
      } else {
        showToast(data.error || 'Download not permitted', 'warning');
      }
    } catch (err) {
      showToast('Download request error', 'warning');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-xl" />
        <div className="h-[450px] bg-white/5 rounded-2xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Project Not Found</h2>
        <Link href="/works" className="inline-flex items-center gap-2 text-accent-purple">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Dynamic multi-language resolution for project detail
  const localized = projectTranslations[slug]?.[lang];
  const displayTitle = localized?.title || project.title;
  const displayDesc = localized?.description || project.description;
  const displayCategory = categoryTranslations[project.category]?.[lang] || project.category;
  const processList = localized?.processSteps || (project.processSteps ? JSON.parse(project.processSteps) : []);

  const toolsList = project.tools ? JSON.parse(project.tools) : [];
  const servicesList = project.services ? JSON.parse(project.services) : [];
  const beforeAfterObj = project.beforeAfter ? JSON.parse(project.beforeAfter) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-12 select-none">
      
      {/* Back Button */}
      <Link
        href="/works"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Works</span>
      </Link>

      {/* Header Info */}
      <div className="space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-xs font-mono tracking-wider uppercase">
              {displayCategory}
            </span>
            <h1 className="hero-headline font-display font-bold text-white tracking-tight">
              {displayTitle}
            </h1>
          </div>

          {/* Social Interactions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isLiked
                  ? 'bg-accent-rose text-white border-accent-rose'
                  : 'bg-card-DEFAULT border-card-border text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isSaved
                  ? 'bg-accent-gold text-black border-accent-gold'
                  : 'bg-card-DEFAULT border-card-border text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{saves}</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card-DEFAULT border border-card-border text-gray-300 hover:text-white hover:border-white/20 text-xs font-semibold transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{t('proj_share')}</span>
            </button>
          </div>
        </div>

        {/* Metadata Sidebar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-card-DEFAULT border border-card-border">
          <div>
            <span className="text-[11px] font-mono uppercase text-gray-500 block mb-1">
              {t('proj_client')}
            </span>
            <span className="text-sm font-semibold text-white">{project.client || 'N/A'}</span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-gray-500 block mb-1">
              {t('proj_year')}
            </span>
            <span className="text-sm font-semibold text-white">{project.year || '2026'}</span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-gray-500 block mb-1">
              {t('proj_services')}
            </span>
            <div className="flex flex-wrap gap-1">
              {servicesList.map((s: string, i: number) => (
                <span key={i} className="text-xs text-gray-300 font-medium">{s}{i < servicesList.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase text-gray-500 block mb-1">
              {t('proj_tools')}
            </span>
            <div className="flex flex-wrap gap-1">
              {toolsList.map((t: string, i: number) => (
                <span key={i} className="text-xs text-accent-purple font-medium">{t}{i < toolsList.length - 1 ? ' • ' : ''}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Cover Image with Watermark */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-card-border shadow-2xl bg-black/60">
        <Image
          src={project.coverImage}
          alt={displayTitle}
          fill
          className="object-cover"
          unoptimized
          onDragStart={(e) => e.preventDefault()}
        />
        <WatermarkOverlay />
      </div>

      {/* Description */}
      <div className="max-w-3xl space-y-4">
        <h2 className="font-display font-bold text-white text-xl">Project Overview</h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* Before / After Comparison Slider if available */}
      {beforeAfterObj && (
        <div className="space-y-4">
          <h2 className="font-display font-bold text-white text-xl">
            {t('proj_before_after')}
          </h2>
          <BeforeAfterSlider
            beforeImage={beforeAfterObj.before}
            afterImage={beforeAfterObj.after}
          />
        </div>
      )}

      {/* Process Steps */}
      {processList.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-display font-bold text-white text-xl">
            {t('proj_process')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processList.map((st: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl bg-card-DEFAULT border border-card-border space-y-2">
                <span className="text-xs font-mono font-bold text-accent-purple uppercase block">{st.step}</span>
                <h3 className="font-display font-bold text-white text-base">{st.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Downloadable Assets */}
      <div className="p-6 rounded-2xl bg-card-DEFAULT border border-card-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-white text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-purple" />
            <span>{t('proj_downloads')}</span>
          </h2>
          <span className="text-xs font-mono text-gray-400 uppercase">
            Rule: {project.downloadRule}
          </span>
        </div>

        {project.files && project.files.length > 0 ? (
          <div className="space-y-3">
            {project.files.map((file: any) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{file.filename}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">
                    {file.format} • {(file.fileSize / 1024 / 1024).toFixed(1)} MB • Downloads: {file.downloadCount}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(file.id)}
                  className="px-4 py-2 rounded-xl bg-accent-purple hover:bg-accent-purple/90 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-accent-purple/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('proj_download_btn')}</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No standalone file attachments for this project.</p>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        projectTitle={displayTitle}
        projectSlug={project.slug}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}
