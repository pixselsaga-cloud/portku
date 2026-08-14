"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  FileCode,
  MessageSquare,
  Sparkles,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  Heart,
  Bookmark,
  Download,
  Share2,
  Globe,
  Monitor,
  CheckCircle,
  FileSpreadsheet,
  Lock,
  Search,
  Upload,
  RefreshCw,
  Clock,
  Check,
  FileText,
  Archive,
  Image as ImageIcon,
  Film,
  Box,
  ExternalLink,
  LogOut,
  ShieldAlert,
  KeyRound,
  Zap,
  Activity,
  UserCheck,
  Palette,
  Award,
  Layers,
  ArrowRight,
  Copy,
  Send,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const MASTER_PASSWORD = 'Otajon2009$';

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'services' | 'stats' | 'projects' | 'files' | 'messages' | 'requests' | 'client-portal' | 'settings'
  >('analytics');

  // Analytics State
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsRange, setAnalyticsRange] = useState('30d');
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Client Portal Projects State
  const [clientProjectsList, setClientProjectsList] = useState<any[]>([]);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [editingClientProjectId, setEditingClientProjectId] = useState<string | null>(null);
  const [clientTitle, setClientTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAccessCode, setClientAccessCode] = useState('');
  const [clientDescription, setClientDescription] = useState('');
  const [clientStatus, setClientStatus] = useState('in_progress');
  const [clientDeliverablesList, setClientDeliverablesList] = useState<Array<{ name: string; size: string; url: string }>>([]);
  const [newDelivName, setNewDelivName] = useState('');
  const [newDelivSize, setNewDelivSize] = useState('');
  const [newDelivUrl, setNewDelivUrl] = useState('');

  // Services CMS State
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitleUz, setServiceTitleUz] = useState('');
  const [serviceDescUz, setServiceDescUz] = useState('');
  const [serviceBtnText, setServiceBtnText] = useState('Request Service');
  const [serviceBtnUrl, setServiceBtnUrl] = useState('/request');
  const [serviceIcon, setServiceIcon] = useState('Palette');

  // Stats CMS State
  const [statsList, setStatsList] = useState<any[]>([]);
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [editingStatId, setEditingStatId] = useState<string | null>(null);
  const [statValue, setStatValue] = useState('');
  const [statLabelUz, setStatLabelUz] = useState('');
  const [statIcon, setStatIcon] = useState('Award');

  // Projects & Files & Messages State
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [filesList, setFilesList] = useState<any[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('Design Asset');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadPermission, setUploadPermission] = useState('allowed');
  const [uploadProjectId, setUploadProjectId] = useState('none');
  const [uploading, setUploading] = useState(false);

  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [requestsList, setRequestsList] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  // Login Check
  useEffect(() => {
    const auth = localStorage.getItem('otajon_admin_session');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      fetchServices();
      fetchStats();
      fetchProjects();
      fetchFiles();
      fetchMessages();
      fetchRequests();
      fetchSettings();
      fetchClientProjects();
    }
  }, [isAuthenticated, analyticsRange]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === MASTER_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('otajon_admin_session', 'authenticated');
      showToast('Admin paneliga muvaffaqiyatli kirdingiz!', 'success');
      setPasswordInput('');
    } else {
      showToast("Parol noto'g'ri!", 'warning');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('otajon_admin_session');
    showToast('Admin panelidan chiqildi', 'info');
  };

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch(`/api/analytics?range=${analyticsRange}`);
      const data = await res.json();
      if (data.success) setAnalyticsData(data.analytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchServices = async () => {
    const res = await fetch('/api/services', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setServicesList(data.services);
  };

  const fetchStats = async () => {
    const res = await fetch('/api/stats', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setStatsList(data.stats);
  };

  const fetchProjects = async () => {
    const res = await fetch('/api/projects', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setProjectsList(data.projects);
  };

  const fetchFiles = async () => {
    const res = await fetch('/api/files', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setFilesList(data.files);
  };

  const fetchMessages = async () => {
    const res = await fetch('/api/messages', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setMessagesList(data.messages);
  };

  const fetchRequests = async () => {
    const res = await fetch('/api/requests', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setRequestsList(data.requests);
  };

  const fetchSettings = async () => {
    const res = await fetch('/api/settings', { cache: 'no-store' });
    const data = await res.json();
    if (data.success) setSiteSettings(data.settings);
  };

  const fetchClientProjects = async () => {
    try {
      const res = await fetch('/api/client-portal', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) setClientProjectsList(data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  // CLIENT PORTAL CRUD HANDLERS
  const generateAutoCode = () => {
    const prefix = clientName ? clientName.trim().split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '') : 'CLIENT';
    const num = Math.floor(1000 + Math.random() * 9000);
    setClientAccessCode(`${prefix || 'CLIENT'}-${num}`);
  };

  const handleAddDeliverable = () => {
    if (!newDelivName.trim() || !newDelivUrl.trim()) {
      showToast('Fayl nomi va havolasini kiriting!', 'warning');
      return;
    }
    setClientDeliverablesList((prev) => [
      ...prev,
      { name: newDelivName.trim(), size: newDelivSize.trim() || 'Ready File', url: newDelivUrl.trim() },
    ]);
    setNewDelivName('');
    setNewDelivSize('');
    setNewDelivUrl('');
  };

  const handleRemoveDeliverable = (idx: number) => {
    setClientDeliverablesList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveClientProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientTitle || !clientName || !clientAccessCode) {
      showToast('Loyiha nomi, mijoz ismi va kodni kiriting!', 'warning');
      return;
    }

    const payload = {
      title: clientTitle,
      clientName,
      clientEmail,
      accessCode: clientAccessCode.trim().toUpperCase(),
      description: clientDescription,
      status: clientStatus,
      deliverables: clientDeliverablesList,
    };

    if (editingClientProjectId) {
      const res = await fetch('/api/client-portal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingClientProjectId, ...payload }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Mijoz loyihasi yangilandi!', 'success');
      } else {
        showToast(data.error || 'Xatolik yuz berdi', 'warning');
      }
    } else {
      const res = await fetch('/api/client-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', ...payload }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Yangi mijoz xonasi ochildi!', 'success');
      } else {
        showToast(data.error || 'Xatolik yuz berdi', 'warning');
      }
    }

    setClientModalOpen(false);
    resetClientForm();
    fetchClientProjects();
  };

  const resetClientForm = () => {
    setEditingClientProjectId(null);
    setClientTitle('');
    setClientName('');
    setClientEmail('');
    setClientAccessCode('');
    setClientDescription('');
    setClientStatus('in_progress');
    setClientDeliverablesList([]);
    setNewDelivName('');
    setNewDelivSize('');
    setNewDelivUrl('');
  };

  const handleEditClientProject = (proj: any) => {
    setEditingClientProjectId(proj.id);
    setClientTitle(proj.title);
    setClientName(proj.clientName);
    setClientEmail(proj.clientEmail || '');
    setClientAccessCode(proj.accessCode);
    setClientDescription(proj.description || '');
    setClientStatus(proj.status || 'in_progress');
    let deliv = [];
    try {
      deliv = proj.deliverables ? (typeof proj.deliverables === 'string' ? JSON.parse(proj.deliverables) : proj.deliverables) : [];
    } catch {}
    setClientDeliverablesList(deliv);
    setClientModalOpen(true);
  };

  const handleDeleteClientProject = async (id: string) => {
    if (!confirm("Haqiqatan ham bu mijoz loyihasini o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/client-portal?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast("Mijoz xonasi o'chirildi", 'info');
        fetchClientProjects();
      }
    } catch (err) {
      showToast('Xatolik', 'warning');
    }
  };

  const copyClientCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Kod nusxalandi: ${code}`, 'success');
  };

  const copyClientLink = (code: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://portku-portku.vercel.app';
    const link = `${origin}/client/${code}`;
    navigator.clipboard.writeText(link);
    showToast(`Mijoz havolasi nusxalandi: ${link}`, 'success');
  };

  const handleExportCSV = () => {
    window.open('/api/analytics?export=csv', '_blank');
    showToast('Exporting Section 31 Analytics to CSV...', 'info');
  };

  // SERVICES CRUD
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitleUz || !serviceDescUz) {
      showToast('Sarlavha va Tavsifni to`ldiring!', 'warning');
      return;
    }

    const payload = {
      titleUz: serviceTitleUz,
      descUz: serviceDescUz,
      buttonText: serviceBtnText,
      buttonUrl: serviceBtnUrl,
      icon: serviceIcon,
    };

    if (editingServiceId) {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingServiceId, ...payload }),
      });
      showToast('Xizmat muvaffaqiyatli tahrirlandi!', 'success');
    } else {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      showToast('Yangi xizmat qo`shildi!', 'success');
    }

    setServiceModalOpen(false);
    setEditingServiceId(null);
    setServiceTitleUz('');
    setServiceDescUz('');
    fetchServices();
  };

  const handleEditServiceClick = (svc: any) => {
    setEditingServiceId(svc.id);
    setServiceTitleUz(svc.titleUz);
    setServiceDescUz(svc.descUz);
    setServiceBtnText(svc.buttonText || 'Request Service');
    setServiceBtnUrl(svc.buttonUrl || '/request');
    setServiceIcon(svc.icon || 'Palette');
    setServiceModalOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Ushbu xizmatni o`chirib tashlamoqchimisiz?')) return;
    await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    showToast('Xizmat o`chirildi', 'info');
    fetchServices();
  };

  // STATS CRUD
  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statValue || !statLabelUz) {
      showToast('Son va Nomini to`ldiring!', 'warning');
      return;
    }

    const payload = {
      value: statValue,
      labelUz: statLabelUz,
      icon: statIcon,
    };

    if (editingStatId) {
      await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingStatId, ...payload }),
      });
      showToast('Statistika ko`rsatkichi tahrirlandi!', 'success');
    } else {
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      showToast('Yangi statistika ko`rsatkichi qo`shildi!', 'success');
    }

    setStatModalOpen(false);
    setEditingStatId(null);
    setStatValue('');
    setStatLabelUz('');
    fetchStats();
  };

  const handleEditStatClick = (st: any) => {
    setEditingStatId(st.id);
    setStatValue(st.value);
    setStatLabelUz(st.labelUz);
    setStatIcon(st.icon || 'Award');
    setStatModalOpen(true);
  };

  const handleDeleteStat = async (id: string) => {
    if (!confirm('Ushbu ko`rsatkichni o`chirib tashlamoqchimisiz?')) return;
    await fetch(`/api/stats?id=${id}`, { method: 'DELETE' });
    showToast('Ko`rsatkich o`chirildi', 'info');
    fetchStats();
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    await fetch(`/api/projects/${slug}`, { method: 'DELETE' });
    showToast('Project deleted', 'info');
    fetchProjects();
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showToast('Fayl tanlanmadi!', 'warning');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', uploadCategory);
      formData.append('description', uploadDesc);
      formData.append('downloadPermission', uploadPermission);
      formData.append('projectId', uploadProjectId);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Fayl muvaffaqiyatli yuklandi: ${selectedFile.name}`, 'success');
        setSelectedFile(null);
        setUploadDesc('');
        setUploadModalOpen(false);
        fetchFiles();
      } else {
        showToast(data.error || 'Upload failed', 'warning');
      }
    } catch (err: any) {
      showToast('Network error during file upload', 'warning');
    } finally {
      setUploading(false);
    }
  };

  const getFormatBadge = (fmt: string) => {
    const format = fmt.toUpperCase();
    if (['JPG', 'JPEG', 'PNG', 'WEBP', 'SVG', 'GIF'].includes(format)) {
      return { color: 'bg-accent-emerald/10 text-accent-emerald border-accent-emerald/30', icon: ImageIcon };
    }
    if (['ZIP', 'RAR', '7Z', 'TAR', 'GZ'].includes(format)) {
      return { color: 'bg-accent-gold/10 text-accent-gold border-accent-gold/30', icon: Archive };
    }
    if (['PSD', 'AI', 'FIG', 'CDR', 'INDD'].includes(format)) {
      return { color: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30', icon: FileCode };
    }
    if (['MP4', 'MOV', 'AVI', 'WEBM'].includes(format)) {
      return { color: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30', icon: Film };
    }
    if (['BLEND', 'GLB', 'OBJ', 'FBX', 'C4D'].includes(format)) {
      return { color: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30', icon: Box };
    }
    return { color: 'bg-white/10 text-white border-white/20', icon: FileText };
  };

  // Strictly Secure Password Lock Barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-card-DEFAULT border border-card-border p-8 rounded-3xl shadow-2xl space-y-6 text-center backdrop-blur-xl">
          
          <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple mx-auto shadow-lg shadow-accent-purple/20">
            <Lock className="w-8 h-8" />
          </div>

          <h1 className="font-display font-bold text-white text-2xl tracking-tight">
            Shaxsiy Admin Kirish Paneli
          </h1>

          <form onSubmit={handleLogin} className="space-y-5 pt-2">
            <div>
              <input
                type="password"
                required
                autoFocus
                placeholder="Parolni kiriting..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full text-center font-mono text-base bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan text-white text-sm font-bold tracking-wide shadow-xl shadow-accent-purple/20 hover:scale-[1.01] active:scale-95 transition-all"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-card-DEFAULT border border-card-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-purple to-accent-blue p-[1px] shadow-lg shadow-accent-purple/20 overflow-hidden">
            <img
              src="/assets/user_avatar.jpg"
              alt="Otajon Jahongirov"
              className="w-full h-full object-cover rounded-[15px]"
            />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-xl tracking-tight">
              Studio Executive Control & CMS
            </h1>
            <p className="text-xs text-gray-400">
              Otajon Jahongirov Studio — Maxfiy Boshqaruv Tizimi
            </p>
          </div>
        </div>

        {/* Live Visitor Ticker & Logout */}
        <div className="flex items-center gap-3">
          {analyticsData && (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-accent-emerald/10 border border-accent-emerald/30 text-xs font-mono text-accent-emerald">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-emerald"></span>
              </span>
              <span>{analyticsData.kpis?.liveOnlineVisitors || 18} LIVE VISITORS ONLINE NOW</span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-rose/10 border border-accent-rose/30 text-accent-rose hover:bg-accent-rose/20 text-xs font-semibold transition-all"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4" />
            <span>Tizimdan Chiqish</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'analytics', label: t('analytics_dashboard'), icon: BarChart3 },
          { id: 'services', label: 'Xizmatlar CMS (Services)', icon: Palette },
          { id: 'stats', label: 'Statistika Sonlari CMS', icon: Award },
          { id: 'projects', label: 'Project CMS', icon: FolderKanban },
          { id: 'files', label: 'File Manager', icon: FileCode },
          { id: 'messages', label: 'Messages Inbox', icon: MessageSquare },
          { id: 'requests', label: 'Design Briefs', icon: Sparkles },
          { id: 'client-portal', label: 'Mijoz Portallari (Client Rooms)', icon: Users },
          { id: 'settings', label: 'Site Settings', icon: Settings },
        ].map((tab) => {
          const IconC = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20'
                  : 'bg-card-DEFAULT border border-card-border text-gray-400 hover:text-white'
              }`}
            >
              <IconC className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. ANALYTICS */}
      {activeTab === 'analytics' && analyticsData && (
        <div className="space-y-8">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-card-DEFAULT border border-card-border p-1 rounded-2xl text-xs">
              {['today', '7d', '30d', '3m', '1y'].map((r) => (
                <button
                  key={r}
                  onClick={() => setAnalyticsRange(r)}
                  className={`px-3 py-1.5 rounded-xl uppercase font-mono font-medium transition-all ${
                    analyticsRange === r ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald text-xs font-semibold flex items-center gap-2 hover:bg-accent-emerald/20 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{t('analytics_export_csv')}</span>
            </button>
          </div>

          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-1">
              <span className="text-[11px] font-mono uppercase text-gray-400">{t('analytics_views')}</span>
              <div className="font-display font-black text-2xl text-white">{analyticsData.kpis.totalViews.toLocaleString()}</div>
              <div className="text-[10px] text-accent-emerald">+18.4% last 30 days</div>
            </div>

            <div className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-1">
              <span className="text-[11px] font-mono uppercase text-gray-400">{t('analytics_unique')}</span>
              <div className="font-display font-black text-2xl text-white">{analyticsData.kpis.uniqueVisitors.toLocaleString()}</div>
              <div className="text-[10px] text-accent-purple">68.2% conversion rate</div>
            </div>

            <div className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-1">
              <span className="text-[11px] font-mono uppercase text-gray-400">Faol Onlayn Tashrifchilar</span>
              <div className="font-display font-black text-2xl text-accent-emerald flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-emerald animate-pulse"></span>
                <span>{analyticsData.kpis.liveOnlineVisitors} Users</span>
              </div>
              <div className="text-[10px] text-gray-400">Jonli server monitori</div>
            </div>

            <div className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-1">
              <span className="text-[11px] font-mono uppercase text-gray-400">{t('analytics_downloads')}</span>
              <div className="font-display font-black text-2xl text-accent-gold">{analyticsData.kpis.totalDownloads.toLocaleString()}</div>
              <div className="text-[10px] text-gray-400">Asset library grabs</div>
            </div>
          </div>

          {/* ACTIVE VISITORS LEADERBOARD */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent-emerald" />
                <span>Eng Faol Foydalanuvchilar va Jonli Kirgan Odamlar Monitoringi</span>
              </h3>
              <span className="text-xs font-mono text-accent-emerald font-semibold px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/30">
                ● Live Updates Active
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {analyticsData.activeVisitors?.map((usr: any, i: number) => (
                <div
                  key={usr.id}
                  className="p-4 rounded-2xl bg-card-DEFAULT border border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-accent-purple/40 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-purple/20 via-accent-blue/20 to-accent-cyan/20 border border-white/10 flex items-center justify-center font-mono font-bold text-accent-purple text-xs shrink-0">
                      0{i + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-white text-sm">{usr.location}</span>
                        {usr.isOnline ? (
                          <span className="px-2 py-0.5 rounded-full bg-accent-emerald/15 border border-accent-emerald/30 text-accent-emerald text-[10px] font-mono font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-ping"></span>
                            <span>{usr.status}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-mono">
                            {usr.status}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-400 font-mono text-[11px] mt-0.5">
                        IP: {usr.ip} • Device: {usr.device}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-gray-300 font-medium">
                      Oxirgi harakat: <span className="text-accent-cyan font-mono font-bold">{usr.lastAction}</span>
                    </div>
                    <div className="text-gray-400 text-[11px] font-mono">
                      Seans davomiyligi: <span className="text-white font-semibold">{usr.sessionTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-white/5">
                    <div className="text-right space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-gray-400 block">Ko'rilgan Sahifalar</span>
                      <span className="font-mono text-white text-base font-bold">{usr.pagesViewed} ta sahifa</span>
                    </div>

                    <div className="text-right space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-gray-400 block">Faollik Indeksi</span>
                      <span className="font-mono text-accent-purple text-base font-extrabold">{usr.activityScore}/100</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. SERVICES CMS (XIZMATLAR BOSHGARUVI) */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-white text-lg">Xizmatlar Boshqaruvi (Services CMS)</h2>
              <p className="text-xs text-gray-400">Saytdagi barcha xizmat kartochkalarini tahrirlash, yangi xizmat qo'shish va tugmalar matnlarini o'zgartirish</p>
            </div>

            <button
              onClick={() => {
                setEditingServiceId(null);
                setServiceTitleUz('');
                setServiceDescUz('');
                setServiceBtnText('Request Service');
                setServiceBtnUrl('/request');
                setServiceIcon('Palette');
                setServiceModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-accent-purple/20 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Xizmat Qo'shish</span>
            </button>
          </div>

          {/* Service Add/Edit Modal */}
          {serviceModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-lg bg-card-DEFAULT border border-card-border p-6 rounded-3xl shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                    <Palette className="w-4 h-4 text-accent-purple" />
                    <span>{editingServiceId ? 'Xizmatni Tahrirlash' : 'Yangi Xizmat Yaratish'}</span>
                  </h3>
                  <button onClick={() => setServiceModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Xizmat Nomi (Sarlavha)</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Grafik Dizayn va Key Visual"
                      value={serviceTitleUz}
                      onChange={(e) => setServiceTitleUz(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Tavsif (Description)</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Xizmat haqida batafsil matn..."
                      value={serviceDescUz}
                      onChange={(e) => setServiceDescUz(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Tugma Matni (Button Label)</label>
                      <input
                        type="text"
                        value={serviceBtnText}
                        onChange={(e) => setServiceBtnText(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Tugma Havolasi (URL Link)</label>
                      <input
                        type="text"
                        value={serviceBtnUrl}
                        onChange={(e) => setServiceBtnUrl(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Belgi (Icon)</label>
                    <select
                      value={serviceIcon}
                      onChange={(e) => setServiceIcon(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white"
                    >
                      <option value="Palette">Palette (Grafik Dizayn)</option>
                      <option value="Sparkles">Sparkles (Brending)</option>
                      <option value="Layout">Layout (UI/UX Dizayn)</option>
                      <option value="Box">Box (3D CGI)</option>
                      <option value="Film">Film (Motion)</option>
                      <option value="Video">Video (Montaj)</option>
                      <option value="Megaphone">Megaphone (Reklama)</option>
                      <option value="Compass">Compass (Art Direktsiya)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-accent-purple text-white font-bold shadow-lg shadow-accent-purple/30 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Saqlash</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Services Grid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicesList.map((svc) => (
              <div key={svc.id} className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-3 flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-[10px] font-mono font-bold">
                      {svc.icon}
                    </span>
                    <h3 className="font-bold text-white text-base">{svc.titleUz}</h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{svc.descUz}</p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-accent-cyan">
                    <span>Tugma: "{svc.buttonText}"</span>
                    <span>→ {svc.buttonUrl}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEditServiceClick(svc)}
                    className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:text-white"
                    title="Tahrirlash"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(svc.id)}
                    className="p-2 rounded-xl bg-accent-rose/10 border border-accent-rose/30 text-accent-rose hover:bg-accent-rose/20"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. STATS COUNTER CMS (STATISTIKA SONLARI BOSHGARUVI) */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-white text-lg">Statistika Sonlari Boshqaruvi (Stats Counter CMS)</h2>
              <p className="text-xs text-gray-400">Sayt bosh sahifasidagi "3+ YIL", "1000+", "1000+", "20+" son ko'rsatkichlarini va nomlarini o'zgartirish hamda yangisini qo'shish</p>
            </div>

            <button
              onClick={() => {
                setEditingStatId(null);
                setStatValue('');
                setStatLabelUz('');
                setStatIcon('Award');
                setStatModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-accent-purple/20 hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Ko'rsatkich Qo'shish</span>
            </button>
          </div>

          {/* Stat Add/Edit Modal */}
          {statModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-lg bg-card-DEFAULT border border-card-border p-6 rounded-3xl shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent-purple" />
                    <span>{editingStatId ? 'Ko`rsatkichni Tahrirlash' : 'Yangi Ko`rsatkich Qo`shish'}</span>
                  </h3>
                  <button onClick={() => setStatModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveStat} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Son / Qiymat (Value)</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: 3+ YIL, 1000+, 20+"
                      value={statValue}
                      onChange={(e) => setStatValue(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Nomi / Tavsifi (Label)</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Yillik tajriba, Yakunlangan loyihalar"
                      value={statLabelUz}
                      onChange={(e) => setStatLabelUz(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Belgi (Icon)</label>
                    <select
                      value={statIcon}
                      onChange={(e) => setStatIcon(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white"
                    >
                      <option value="Award">Award (Tajriba mukofoti)</option>
                      <option value="Briefcase">Briefcase (Loyihalar)</option>
                      <option value="Users">Users (Mijozlar)</option>
                      <option value="Layers">Layers (Dizayn yo'nalishlari)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-accent-purple text-white font-bold shadow-lg shadow-accent-purple/30 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Saqlash</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Stats Grid List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsList.map((st) => (
              <div key={st.id} className="p-5 rounded-2xl bg-card-DEFAULT border border-card-border space-y-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple text-[10px] font-mono font-bold">
                    {st.icon}
                  </span>
                  <div className="font-display font-black text-2xl text-white tracking-tight">{st.value}</div>
                  <p className="text-gray-400 text-xs font-semibold">{st.labelUz}</p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleEditStatClick(st)}
                    className="p-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:text-white"
                    title="Tahrirlash"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStat(st.id)}
                    className="p-1.5 rounded-xl bg-accent-rose/10 border border-accent-rose/30 text-accent-rose hover:bg-accent-rose/20"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROJECT MANAGEMENT CMS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-white text-lg">Portfolio Project Catalog</h2>
          </div>

          <div className="space-y-3">
            {projectsList.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-card-DEFAULT border border-card-border text-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black/40 overflow-hidden relative border border-white/10 shrink-0">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{p.title}</h3>
                    <p className="text-gray-400 font-mono text-[11px]">{p.category} • Views: {p.views} • Likes: {p.likes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteProject(p.slug)}
                    className="p-2 rounded-xl bg-accent-rose/10 border border-accent-rose/30 text-accent-rose hover:bg-accent-rose/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. FILE MANAGER */}
      {activeTab === 'files' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-white text-lg">Studio File Asset Manager</h2>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP, SVG, ZIP, RAR, PSD, AI, FIG, CDR, BLEND, GLB, MP4, PDF fayllarni yuklash va boshqarish</p>
            </div>

            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-accent-purple/20 hover:scale-105 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Yangi fayl yuklash</span>
            </button>
          </div>

          {/* Upload Modal Drawer */}
          {uploadModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-lg bg-card-DEFAULT border border-card-border p-6 rounded-3xl shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                    <Upload className="w-4 h-4 text-accent-purple" />
                    <span>Fayl Yuklash Tizimi</span>
                  </h3>
                  <button onClick={() => setUploadModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleFileUpload} className="space-y-4">
                  {/* Drag & Drop Dropzone */}
                  <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-accent-purple/50 transition-all bg-black/30">
                    <input
                      type="file"
                      required
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="fileUploadInput"
                    />
                    <label htmlFor="fileUploadInput" className="cursor-pointer space-y-2 block">
                      <div className="w-12 h-12 rounded-full bg-accent-purple/10 border border-accent-purple/30 flex items-center justify-center text-accent-purple mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {selectedFile ? selectedFile.name : 'Faylni tanlang yoki shu yerga tashlang'}
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Qo'llab-quvvatlanadi: JPG, PNG, WEBP, SVG, GIF, MP4, MOV, PDF, ZIP, RAR, PSD, AI, FIG, CDR, BLEND, GLB
                      </p>
                      {selectedFile && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-accent-emerald/20 text-accent-emerald text-[11px] font-mono">
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      )}
                    </label>
                  </div>

                  {/* Metadata inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Kategoriya</label>
                      <input
                        type="text"
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        placeholder="Graphics, Source File, 3D Model..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Download Permission</label>
                      <select
                        value={uploadPermission}
                        onChange={(e) => setUploadPermission(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                      >
                        <option value="allowed">Allowed (Ochiq)</option>
                        <option value="request_req">Request Required (So'rov shart)</option>
                        <option value="email_req">Email Required (Email shart)</option>
                        <option value="disabled">Disabled (Cheklangan)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Tavsif (Description)</label>
                    <input
                      type="text"
                      value={uploadDesc}
                      onChange={(e) => setUploadDesc(e.target.value)}
                      placeholder="Fayl haqida qisqa ma'lumot..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Loyihaga biriktirish (Project Link)</label>
                    <select
                      value={uploadProjectId}
                      onChange={(e) => setUploadProjectId(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                    >
                      <option value="none">Biriktirilmasin (General Asset)</option>
                      {projectsList.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 rounded-xl bg-accent-purple text-white text-xs font-bold shadow-lg shadow-accent-purple/30 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? 'Fayl yuklanmoqda...' : 'Faylni Serverga Yuklash'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Files List Table */}
          <div className="space-y-3">
            {filesList.map((f) => {
              const badge = getFormatBadge(f.format);
              const FormatIcon = badge.icon;
              return (
                <div key={f.id} className="flex items-center justify-between p-4 rounded-2xl bg-card-DEFAULT border border-card-border text-xs">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs ${badge.color}`}>
                      <FormatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <span>{f.filename}</span>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${badge.color}`}>
                          {f.format}
                        </span>
                      </div>
                      <div className="text-gray-400 font-mono text-[11px] mt-0.5">
                        {(f.fileSize / 1024 / 1024).toFixed(2)} MB • {f.category || 'General'} • Rule: <span className="text-accent-purple font-semibold">{f.downloadPermission}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple font-mono font-bold text-[11px]">
                      {f.downloadCount} Downloads
                    </div>
                    {f.fileUrl && (
                      <a
                        href={f.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:text-white"
                        title="Open/Download File"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. MESSAGES INBOX */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h2 className="font-display font-bold text-white text-lg">Inbound Client Messages & Schedule Queue</h2>
          <div className="space-y-3">
            {messagesList.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-card-DEFAULT border border-card-border space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-accent-purple font-bold">{m.name} ({m.email})</span>
                  <span className="text-gray-500">{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">{m.message}</p>
                {m.status === 'scheduled' && (
                  <div className="text-[10px] text-accent-gold font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Scheduled for: {new Date(m.scheduledAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. DESIGN REQUEST BRIEF INSPECTOR */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <h2 className="font-display font-bold text-white text-lg">Incoming Design Requests & AI Briefs</h2>
          <div className="space-y-4">
            {requestsList.map((r) => {
              const aiBriefObj = r.aiBrief ? JSON.parse(r.aiBrief) : null;
              return (
                <div key={r.id} className="p-6 rounded-2xl bg-card-DEFAULT border border-card-border space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-base">{r.clientName}</h3>
                      <p className="text-gray-400 font-mono">{r.email} • {r.phone}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-mono uppercase font-bold">
                      {r.status}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed">{r.projectDetails}</p>

                  {aiBriefObj && (
                    <div className="p-4 rounded-xl bg-black/50 border border-accent-cyan/30 text-gray-200 space-y-1">
                      <span className="text-[10px] font-mono text-accent-cyan font-bold uppercase block">AI Synthesized Brief</span>
                      <p><strong>Title:</strong> {aiBriefObj.title}</p>
                      <p><strong>Budget:</strong> {aiBriefObj.estimatedBudget}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. CLIENT PORTAL ROOMS CMS */}
      {activeTab === 'client-portal' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-white text-xl">Mijoz Portallari (Private Client Rooms)</h2>
              <p className="text-xs text-gray-400">
                Har bir mijoz uchun shaxsiy xona oching, fayllar biriktiring va kirish kodini mijozga yuboring.
              </p>
            </div>

            <button
              onClick={() => {
                resetClientForm();
                setClientModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-accent-purple text-white text-xs font-semibold shadow-lg shadow-accent-purple/20 hover:scale-105 active:scale-95 transition-all w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Mijoz Xonasi Ochish</span>
            </button>
          </div>

          {clientProjectsList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-card-DEFAULT border border-card-border space-y-3">
              <Users className="w-10 h-10 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm font-medium">Hozircha hech qanday mijoz xonasi ochilmagan.</p>
              <button
                onClick={() => {
                  resetClientForm();
                  setClientModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
              >
                + Birinchi mijoz xonasini ochish
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientProjectsList.map((cp) => {
                let delivs = [];
                try {
                  delivs = cp.deliverables ? (typeof cp.deliverables === 'string' ? JSON.parse(cp.deliverables) : cp.deliverables) : [];
                } catch {}

                const statusColor =
                  cp.status === 'completed'
                    ? 'bg-accent-emerald/10 border-accent-emerald/30 text-accent-emerald'
                    : cp.status === 'review'
                    ? 'bg-accent-purple/10 border-accent-purple/30 text-accent-purple'
                    : cp.status === 'in_progress'
                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                    : 'bg-accent-gold/10 border-accent-gold/30 text-accent-gold';

                const statusLabel =
                  cp.status === 'completed'
                    ? 'Yakunlandi'
                    : cp.status === 'review'
                    ? 'Tekshiruvda'
                    : cp.status === 'in_progress'
                    ? 'Jarayonda'
                    : 'Kutilmoqda';

                const clientDirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/client/${cp.accessCode}` : `https://portku-portku.vercel.app/client/${cp.accessCode}`;
                const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(clientDirectUrl)}&text=${encodeURIComponent(`Salom ${cp.clientName}! Sizning loyihangiz bo'yicha shaxsiy xona tayyor.\nKirish kodi: ${cp.accessCode}`)}`;

                return (
                  <div
                    key={cp.id}
                    className="p-6 rounded-3xl bg-card-DEFAULT border border-card-border space-y-5 hover:border-accent-purple/40 transition-all shadow-xl flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Title & Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold border ${statusColor}`}>
                            {statusLabel}
                          </span>
                          <h3 className="font-display font-bold text-white text-lg mt-2 leading-tight">
                            {cp.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Mijoz: <span className="text-white font-medium">{cp.clientName}</span> {cp.clientEmail && `(${cp.clientEmail})`}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditClientProject(cp)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-accent-purple/20 text-gray-400 hover:text-accent-purple transition-all"
                            title="Tahrirlash"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClientProject(cp.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-accent-rose/20 text-gray-400 hover:text-accent-rose transition-all"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Access Code & Quick Actions Box */}
                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-gray-400">MAXFIY KOD:</span>
                          <span className="font-mono text-sm font-black text-accent-lime tracking-wider bg-accent-lime/10 px-2.5 py-0.5 rounded-lg border border-accent-lime/30">
                            {cp.accessCode}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <button
                            onClick={() => copyClientCode(cp.accessCode)}
                            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-all"
                            title="Kodni nusxalash"
                          >
                            <Copy className="w-3.5 h-3.5 text-accent-cyan" />
                            <span>Kodni olish</span>
                          </button>

                          <button
                            onClick={() => copyClientLink(cp.accessCode)}
                            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-all"
                            title="Havolani nusxalash"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-accent-purple" />
                            <span>Havola</span>
                          </button>

                          <a
                            href={tgShareUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-[11px] font-medium transition-all"
                            title="Telegramda yuborish"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Telegram</span>
                          </a>
                        </div>
                      </div>

                      {/* Attached Deliverable Files */}
                      <div className="space-y-1.5 text-xs">
                        <div className="text-[11px] font-mono text-gray-400 uppercase font-bold flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-accent-emerald" />
                          <span>Biriktirilgan Fayllar ({delivs.length}):</span>
                        </div>
                        {delivs.length > 0 ? (
                          <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                            {delivs.map((d: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between text-[11px] bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/[0.05]">
                                <span className="truncate text-gray-200">{d.name}</span>
                                <a href={d.url} target="_blank" rel="noreferrer" className="text-accent-cyan hover:underline ml-2 shrink-0">
                                  Yuklab olish ↗
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-gray-500 italic">Hali fayllar qo`shilmagan.</p>
                        )}
                      </div>

                      {/* Client Feedbacks list */}
                      {cp.feedbacks && cp.feedbacks.length > 0 && (
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono uppercase text-accent-cyan font-bold block">
                            Mijoz fikrlari ({cp.feedbacks.length}):
                          </span>
                          <div className="space-y-1 max-h-20 overflow-y-auto pr-1">
                            {cp.feedbacks.map((fb: any) => (
                              <p key={fb.id} className="text-[11px] text-gray-300">
                                <strong className="text-accent-purple">{fb.sender === 'client' ? cp.clientName : 'Admin'}:</strong> {fb.comment}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer link to preview */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="text-gray-500 text-[10px] font-mono">
                        {new Date(cp.createdAt).toLocaleDateString()}
                      </span>
                      <a
                        href={`/client/${cp.accessCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-lime hover:underline font-semibold flex items-center gap-1 text-[11px]"
                      >
                        <span>Mijoz sahifasini ko'rish</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CLIENT ROOM CREATE/EDIT MODAL */}
      {clientModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display font-bold text-white text-lg">
                {editingClientProjectId ? 'Mijoz Xonasini Tahrirlash' : 'Yangi Mijoz Xonasi Ochish'}
              </h2>
              <button
                onClick={() => {
                  setClientModalOpen(false);
                  resetClientForm();
                }}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClientProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-medium mb-1">Mijoz Ismi / Kompaniya *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Akmal Shokirov yoki Apex Studio"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Loyiha Nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Brand Identity & 3D Visual Rendering"
                  value={clientTitle}
                  onChange={(e) => setClientTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-purple"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Mijoz Email / Tel</label>
                  <input
                    type="text"
                    placeholder="mijoz@gmail.com yoki +99890..."
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-purple"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Loyiha Holati</label>
                  <select
                    value={clientStatus}
                    onChange={(e) => setClientStatus(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-accent-purple"
                  >
                    <option value="pending">01 — Kutilmoqda (Pending)</option>
                    <option value="in_progress">02 — Jarayonda (In Progress)</option>
                    <option value="review">03 — Ko'rib chiqilmoqda (Review)</option>
                    <option value="completed">04 — Yakunlandi (Completed)</option>
                  </select>
                </div>
              </div>

              {/* Access Code Generation */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-gray-300 font-medium">Maxfiy Kirish Kodi *</label>
                  <button
                    type="button"
                    onClick={generateAutoCode}
                    className="text-[11px] text-accent-cyan hover:underline font-mono"
                  >
                    ⚡ Avtomatik Kod Yaratish
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Masalan: AKMAL-2025 yoki VIP-9900"
                  value={clientAccessCode}
                  onChange={(e) => setClientAccessCode(e.target.value.toUpperCase())}
                  className="w-full font-mono uppercase bg-black/40 border border-accent-lime/40 rounded-xl px-4 py-2.5 text-accent-lime font-bold tracking-wider focus:border-accent-lime"
                />
              </div>

              {/* Deliverable Files Section */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-3">
                <label className="block text-gray-300 font-medium">Tayyor Fayllar (Deliverables)</label>

                {/* Add new deliverable inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Fayl nomi (Logo-Vector.svg)"
                    value={newDelivName}
                    onChange={(e) => setNewDelivName(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Hajmi (25 MB / Vector)"
                    value={newDelivSize}
                    onChange={(e) => setNewDelivSize(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Havola (URL / Google Drive)"
                    value={newDelivUrl}
                    onChange={(e) => setNewDelivUrl(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Faylni ro'yxatga qo'shish</span>
                </button>

                {/* Deliverables List */}
                {clientDeliverablesList.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {clientDeliverablesList.map((d, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5 text-xs">
                        <div className="min-w-0 pr-2">
                          <span className="font-semibold text-white">{d.name}</span>{' '}
                          <span className="text-gray-400 text-[10px]">({d.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(i)}
                          className="text-accent-rose hover:text-red-400 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setClientModalOpen(false);
                    resetClientForm();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold"
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accent-purple text-white font-bold shadow-lg shadow-accent-purple/20 hover:scale-105 active:scale-95 transition-all"
                >
                  {editingClientProjectId ? 'O`zgarishlarni saqlash' : 'Mijoz xonasini ochish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. SITE SETTINGS */}
      {activeTab === 'settings' && siteSettings && (
        <div className="max-w-xl mx-auto p-8 rounded-3xl bg-card-DEFAULT border border-card-border space-y-6">
          <h2 className="font-display font-bold text-white text-lg">Studio General Settings</h2>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Owner Name</label>
              <input
                type="text"
                defaultValue={siteSettings.ownerName}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Headline</label>
              <input
                type="text"
                defaultValue={siteSettings.headline}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1">Watermark Text</label>
              <input
                type="text"
                defaultValue={siteSettings.watermarkText}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <button
              onClick={() => showToast('Studio Settings updated successfully!', 'success')}
              className="w-full py-3 rounded-xl bg-accent-purple text-white font-bold shadow-lg shadow-accent-purple/30"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
