import React from 'react';
import { BookOpen, Table, BarChart3, CheckCircle2, Play } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'workspace' | 'sandbox' | 'analytics';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentLessonTitle?: string;
  completedCount: number;
  totalLessons: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentLessonTitle,
  completedCount,
  totalLessons,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-neutral-200 sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => setActiveTab('dashboard')} 
        className="flex items-center gap-2.5 cursor-pointer shrink-0"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
          X
        </div>
        <span className="text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap">
          Excel Akademi AI
        </span>
      </div>

      {/* Zone 2: 4 clean single-line nav tabs */}
      <nav className="hidden md:flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'dashboard'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Müfredat Portalı
        </button>

        <button
          onClick={() => setActiveTab('workspace')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'workspace'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Table className="w-3.5 h-3.5 text-emerald-600" />
          Ders Çalışma Alanı
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'sandbox'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Play className="w-3.5 h-3.5 text-blue-600" />
          Serbest Excel Masası
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
          Gelişim & Analiz
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span className="tabular-nums font-medium text-neutral-700">{completedCount} / {totalLessons}</span>
          <span>Ders Tamamlandı</span>
        </div>

        <button
          onClick={() => setActiveTab('workspace')}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Table className="w-3.5 h-3.5" />
          {activeTab === 'workspace' ? 'Ders Deski Aktif' : 'Derse Başla'}
        </button>
      </div>
    </header>
  );
};
