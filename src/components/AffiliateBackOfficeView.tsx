import React, { useState } from 'react';
import { 
  Award, Gem, TrendingUp, DollarSign, Wallet, Users, Share2, 
  Copy, Check, QrCode, Smartphone, Mail, Sparkles, ChevronRight, 
  AlertCircle, CheckCircle2, ArrowUpRight, Flame, X, ExternalLink
} from 'lucide-react';
import { MonthlyEarning } from '../types';

interface AffiliateBackOfficeViewProps {
  earnings: MonthlyEarning[];
  onOpenQrModal?: () => void;
}

export const AffiliateBackOfficeView: React.FC<AffiliateBackOfficeViewProps> = ({ earnings }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeLinkTab, setActiveLinkTab] = useState<'paquete' | 'gratis' | 'tienda' | 'membresia' | 'pre'>('paquete');
  const [showQrModal, setShowQrModal] = useState(false);

  // Link definitions
  const sponsorCode = 'AB-DIAMOND-001';
  const baseDomain = 'https://ab-natural-networkers.sistemaeducativoab.chatgpt.site';

  const linkOptions = {
    paquete: {
      title: 'Afiliación Pagada con Paquete',
      url: `${baseDomain}/afiliar?ref=${sponsorCode}&tipo=paquete`,
      desc: 'Para prospectos listos para adquirir su kit inicial y activar su posición con puntos BV.'
    },
    gratis: {
      title: 'Registro Gratuito (Cliente / Cuenta Básica)',
      url: `${baseDomain}/registro-libre?ref=${sponsorCode}`,
      desc: 'Sin costo inicial. Permite comprar a precio público o evaluar el catálogo antes de afiliarse.'
    },
    tienda: {
      title: 'Tienda Virtual Replicada',
      url: `${baseDomain}/tienda?sponsor=${sponsorCode}`,
      desc: 'Comparte con clientes para que compren productos naturales y las comisiones se acrediten a tu cuenta.'
    },
    membresia: {
      title: 'Invitación a Membresía Directa',
      url: `${baseDomain}/membresias?ref=${sponsorCode}`,
      desc: 'Enlace enfocado en membresías anuales con 30% de descuento en todos los productos.'
    },
    pre: {
      title: 'Enlace de Preafiliación',
      url: `${baseDomain}/preafiliacion?ref=${sponsorCode}`,
      desc: 'Para reservar posición en el derrame de red antes de formalizar el pago de activación.'
    }
  };

  const handleCopy = (type: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleShareWhatsApp = (url: string, title: string) => {
    const text = `¡Hola! 🌱 Te invito a unirte a mi equipo en *AB Natural Networkers* bajo la dirección de Ángel Breña.\n\n🔗 ${title}:\n${url}\n\n¡Comencemos juntos tu transformación en salud celular y libertad financiera! ✨`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Profile & Motivational Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-amber-400 p-0.5 shadow-xl flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-2xl">
                ÁB
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-black text-white">¡Hola, Ángel Breña!</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Gem className="w-3 h-3 text-amber-400" /> Diamante Ejecutivo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Código de Afiliado: <span className="font-mono text-cyan-400 font-bold">{sponsorCode}</span> • Red AB Natural Networkers
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowQrModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition shadow"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>Ver Mi Código QR</span>
            </button>
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3.5 py-2 rounded-2xl flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Membresía Activa (200 BV cumplidos)</span>
            </div>
          </div>
        </div>

        {/* Motivational Career Milestone Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Progreso hacia el Siguiente Rango: <strong className="text-amber-400">Doble Diamante / Maestro</strong>
              </span>
              <p className="text-[11px] text-slate-400">
                “¡Estás muy cerca de la siguiente meta! Te faltan 5,500 puntos grupales y 2 líneas activas para ascender.”
              </p>
            </div>
            <span className="text-xl font-black text-amber-400">78%</span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              style={{ width: '78%' }}
              className="bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 h-full rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/20"
            ></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Puntos Grupales</span>
              <strong className="text-emerald-400 font-bold">45,000 / 50,500 BV</strong>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Faltante Grupal</span>
              <strong className="text-amber-400 font-bold">5,500 BV</strong>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Líneas Calificadas</span>
              <strong className="text-white font-bold">4 / 6 Líneas</strong>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Bono de Ascenso</span>
              <strong className="text-emerald-400 font-bold">+$18,000 USD</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow">
          <span className="text-xs text-slate-400 font-semibold uppercase">Venta Personal</span>
          <h4 className="text-2xl font-black text-white">$450.00</h4>
          <span className="text-[11px] text-cyan-400 font-semibold">500 Puntos Personales BV</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow">
          <span className="text-xs text-slate-400 font-semibold uppercase">Bono Patrocinio Directo</span>
          <h4 className="text-2xl font-black text-amber-400">$1,200.00</h4>
          <span className="text-[11px] text-slate-400">Por 6 nuevos patrocinados</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow">
          <span className="text-xs text-slate-400 font-semibold uppercase">Regalías de Red (Uninivel)</span>
          <h4 className="text-2xl font-black text-emerald-400">$3,850.00</h4>
          <span className="text-[11px] text-emerald-300 font-semibold">Hasta 30 niveles activos</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Acumulado del Mes</span>
          <h4 className="text-2xl font-black text-white">$5,500.00</h4>
          <span className="text-[11px] text-emerald-400 font-bold">Listo para dispersión</span>
        </div>
      </div>

      {/* Monthly Earnings History Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Estado de Cuenta & Ganancias Mensuales</h3>
            <p className="text-xs text-slate-400">Historial verificado de liquidaciones y bonos acumulados</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Total Histórico: $18,800.00 USD</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Mes / Periodo</th>
                <th className="p-3.5">Ventas Personales</th>
                <th className="p-3.5">Regalías de Red</th>
                <th className="p-3.5">Bonos de Liderazgo</th>
                <th className="p-3.5">Total Ganado</th>
                <th className="p-3.5 rounded-r-2xl text-right">Estado de Pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {earnings.map((e, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white">{e.month}</td>
                  <td className="p-3.5 text-slate-300">${e.personalSales.toFixed(2)}</td>
                  <td className="p-3.5 text-slate-300">${e.royalties.toFixed(2)}</td>
                  <td className="p-3.5 text-amber-400 font-semibold">${e.bonuses.toFixed(2)}</td>
                  <td className="p-3.5 font-black text-emerald-400 text-sm">${e.total.toFixed(2)}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ✓ {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Link Sharing Hub */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
        <div>
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Centro de Enlaces Personales de Prospección</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cada enlace identifica automáticamente tu código de patrocinador sin crear ciclos ni alteraciones.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex overflow-x-auto space-x-2 border-b border-slate-800 pb-2 scrollbar-none text-xs">
          {(Object.keys(linkOptions) as Array<keyof typeof linkOptions>).map((key) => {
            const opt = linkOptions[key];
            const isSelected = activeLinkTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveLinkTab(key)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                  isSelected ? 'bg-cyan-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {opt.title}
              </button>
            );
          })}
        </div>

        {/* Link preview card */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">{linkOptions[activeLinkTab].title}</h4>
            <p className="text-xs text-slate-400">{linkOptions[activeLinkTab].desc}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              readOnly
              value={linkOptions[activeLinkTab].url}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-cyan-300 font-mono select-all"
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(activeLinkTab, linkOptions[activeLinkTab].url)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition border border-slate-700"
              >
                {copiedType === activeLinkTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === activeLinkTab ? '¡Copiado!' : 'Copiar'}</span>
              </button>

              <button
                onClick={() => handleShareWhatsApp(linkOptions[activeLinkTab].url, linkOptions[activeLinkTab].title)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal QR Code */}
      {showQrModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-bold text-white text-base">Código QR de Afiliación Inmediata</h3>
              <p className="text-xs text-slate-400 mt-1">
                Escanéalo en eventos presenciales para registrar nuevos socios bajo tu patrocinio.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 24 24" className="w-full h-full text-slate-950 fill-current">
                <path d="M2 2h8v8H2zM4 4v4h4V4zM14 2h8v8h-8zM16 4v4h4V4zM2 14h8v8H2zM4 16v4h4v-4zM14 14h2v2h-2zM18 14h4v2h-4zM14 18h4v4h-4zM20 18h2v4h-2zM16 16h2v2h-2z" />
              </svg>
            </div>

            <div className="text-xs font-mono text-cyan-400 bg-slate-950 p-2 rounded-xl">
              Patrocinador: {sponsorCode}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
