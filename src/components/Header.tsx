import React from 'react';
import { Dna, Award, Sparkles, ShieldCheck, ChevronRight, BarChart3, Package, Key, DollarSign, FileCheck, BookOpen, Bot } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenFounderModal: () => void;
  totalBv: number;
  totalAffiliates: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenFounderModal,
  totalBv,
  totalAffiliates
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Dna className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-lg text-white tracking-tight leading-tight">
                  Multinivel Master
                </h1>
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Pro 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Sofía Humanómica & Back-Office • Sistema Educativo AB
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar & Founder Bio Trigger */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-4 justify-between sm:justify-end">
            <div className="hidden lg:flex items-center space-x-4 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Red Total</span>
                <span className="font-bold text-white">{totalAffiliates.toLocaleString()} Afiliados</span>
              </div>
              <div className="h-6 w-px bg-slate-700"></div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Volumen Mes</span>
                <span className="font-bold text-emerald-400">{totalBv.toLocaleString()} BV</span>
              </div>
              <div className="h-6 w-px bg-slate-700"></div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Rango Activo</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Award className="w-3 h-3" /> Diamante
                </span>
              </div>
            </div>

            {/* Founder Profile Button */}
            <button
              onClick={onOpenFounderModal}
              className="group flex items-center space-x-3 bg-gradient-to-r from-slate-800 to-slate-800/90 hover:from-slate-700 hover:to-slate-800 border border-slate-700/80 hover:border-emerald-500/50 px-3 py-1.5 rounded-2xl transition-all shadow-sm"
              title="Ver perfil científico del Fundador"
            >
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-medium text-emerald-400 flex items-center justify-end gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Fundador & Analista
                </span>
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Ángel Manuel Breña E.
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-extrabold text-white text-sm shadow-md">
                ÁB
              </div>
            </button>
          </div>

        </div>

        {/* Global Navigation Tabs */}
        <nav className="mt-3.5 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('sofia')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'sofia'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4 text-emerald-300" />
            <span>Sofía Humanómica (IA)</span>
            <span className="ml-1 px-1.5 py-0.2 bg-white/20 text-white text-[9px] rounded-full">Elite</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard Red</span>
          </button>

          <button
            onClick={() => setActiveTab('inventario')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'inventario'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventario & Lotes</span>
          </button>

          <button
            onClick={() => setActiveTab('codigos')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'codigos'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Generador de Códigos</span>
          </button>

          <button
            onClick={() => setActiveTab('regalias')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'regalias'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Plan Regalías & Bonos</span>
          </button>

          <button
            onClick={() => setActiveTab('pagos')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pagos'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Auditoría de Pagos</span>
          </button>

          <button
            onClick={() => setActiveTab('ecosistema')}
            className={`tab-btn flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'ecosistema'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ecosistema & Fundador</span>
          </button>
        </nav>

      </div>
    </header>
  );
};
