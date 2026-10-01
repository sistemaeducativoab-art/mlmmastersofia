import React, { useState } from 'react';
import { 
  Users, TrendingUp, DollarSign, AlertTriangle, Award, CheckCircle2, 
  ArrowUpRight, ChevronRight, Search, Filter, Shield, Dna, Eye, UserPlus
} from 'lucide-react';
import { Affiliate, Product } from '../types';

interface DashboardViewProps {
  affiliates: Affiliate[];
  products: Product[];
  onNavigateToTab: (tab: any) => void;
  onSelectAffiliate?: (affiliate: Affiliate) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  affiliates,
  products,
  onNavigateToTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [chartMetric, setChartMetric] = useState<'bv' | 'afiliados'>('bv');

  const criticalProductsCount = products.filter(p => p.status === 'critical' || p.status === 'low').length;
  const totalBv = 48250;
  const totalCommissions = 12840;

  // Monthly historical data
  const monthlyData = [
    { month: 'Mayo', bv: 12000, affiliates: 650 },
    { month: 'Junio', bv: 19000, affiliates: 820 },
    { month: 'Julio', bv: 28000, affiliates: 1040 },
    { month: 'Agosto', bv: 35000, affiliates: 1220 },
    { month: 'Septiembre', bv: 42000, affiliates: 1360 },
    { month: 'Octubre', bv: 48250, affiliates: 1482 },
  ];

  const maxVal = chartMetric === 'bv' ? 55000 : 1600;

  const filteredAffiliates = affiliates.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* 4 KPI Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Affiliates */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-md hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Afiliados Totales</p>
              <h3 className="text-3xl font-black text-white mt-1">1,482</h3>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18% este mes
            </span>
            <span className="text-[11px] text-slate-500">6 niveles activos</span>
          </div>
        </div>

        {/* Group BV */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-md hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Volumen Grupal (BV)</p>
              <h3 className="text-3xl font-black text-emerald-400 mt-1">{totalBv.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 80% Meta Diamante
            </span>
            <span className="text-[11px] text-slate-500">Meta: 60,000 BV</span>
          </div>
        </div>

        {/* Monthly Commissions */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-md hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Comisiones Mes</p>
              <h3 className="text-3xl font-black text-amber-400 mt-1">${totalCommissions.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Listo para dispersión
            </span>
            <button 
              onClick={() => onNavigateToTab('pagos')}
              className="text-[11px] text-emerald-400 hover:underline font-semibold"
            >
              Auditar →
            </button>
          </div>
        </div>

        {/* Critical Stock */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-md hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock Crítico</p>
              <h3 className="text-3xl font-black text-rose-400 mt-1">{criticalProductsCount} Productos</h3>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
              Biomega & Nopaloe RF03
            </span>
            <button 
              onClick={() => onNavigateToTab('inventario')}
              className="text-[11px] text-rose-300 hover:underline font-semibold"
            >
              Reponer →
            </button>
          </div>
        </div>

      </div>

      {/* Main Charts & Rank Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network Growth & Sales Chart (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Crecimiento de Red y Ventas (Últimos Semestres)</h3>
                <p className="text-xs text-slate-400">Evolución mensual consolidada del volumen de puntos BV y nuevos afiliados</p>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setChartMetric('bv')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    chartMetric === 'bv' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Volumen BV
                </button>
                <button
                  onClick={() => setChartMetric('afiliados')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    chartMetric === 'afiliados' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Afiliados
                </button>
              </div>
            </div>

            {/* SVG Visual Graphic */}
            <div className="h-64 w-full relative pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="#334155" strokeWidth="1" />

                {/* Area and Line Path */}
                {(() => {
                  const points = monthlyData.map((d, i) => {
                    const x = (i / (monthlyData.length - 1)) * 560 + 20;
                    const val = chartMetric === 'bv' ? d.bv : d.affiliates;
                    const y = 180 - (val / maxVal) * 150;
                    return { x, y, val, month: d.month };
                  });

                  const lineD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
                  const areaD = `${lineD} L ${points[points.length - 1].x} 190 L ${points[0].x} 190 Z`;

                  return (
                    <>
                      <path d={areaD} fill="url(#chartGradient)" />
                      <path d={lineD} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                      {points.map((p, idx) => (
                        <g key={idx}>
                          <circle cx={p.x} cy={p.y} r="5" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                          <text x={p.x} y={p.y - 12} fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                            {chartMetric === 'bv' ? `${(p.val / 1000).toFixed(1)}k` : p.val}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between text-xs text-slate-400 mt-3 px-2">
                {monthlyData.map((d, i) => (
                  <span key={i} className="font-medium">{d.month}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Volumen certificado bajo protocolo analítico de FORCEXCORP
            </span>
            <span className="text-emerald-400 font-semibold">+302% de incremento semestral</span>
          </div>
        </div>

        {/* Current Rank Status & Compression Details */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white">Estado del Rango Actual</h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Diamante
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              Rango: <strong>Diamante Ejecutivo en Proceso</strong>
            </p>

            {/* Progress Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Puntaje Personal (100 BV mín.)</span>
                  <span className="text-emerald-400 font-bold">100 / 100 BV (100%)</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div className="bg-emerald-500 h-full w-full rounded-full transition-all"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Piernas Calificadas (4 / 6)</span>
                  <span className="text-amber-400 font-bold">66%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div className="bg-amber-500 h-full w-2/3 rounded-full transition-all"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">Volumen Grupal Diamante (48.2k / 60k BV)</span>
                  <span className="text-emerald-400 font-bold">80.4%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div className="bg-emerald-500 h-full w-[80%] rounded-full transition-all"></div>
                </div>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="mt-5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-1">
              <span className="text-emerald-400 font-bold block text-[11px] uppercase">Próximo Salto:</span>
              <p>Faltan <strong>11,750 BV</strong> y <strong>2 piernas Platino</strong> para consolidar Diamante Corona.</p>
            </div>
          </div>

          {/* Dynamic Compression Notice */}
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-start space-x-3">
            <Dna className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              <strong>Compresión Dinámica Automática:</strong> Al cierre mensual, los volúmenes de afiliados inactivos se comprimen hacia el patrocinador calificado superior inmediato para no perder bonos.
            </p>
          </div>
        </div>

      </div>

      {/* Network Genealogy & Top Leaders Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Estructura de Líderes y Afiliados Directos</h3>
            <p className="text-xs text-slate-400">Monitoreo de actividad, puntaje personal y volumen de red en tiempo real</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por socio o código..."
                className="bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              onClick={() => onNavigateToTab('codigos')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 shadow"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Afiliar Nuevo</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Líder / Socio</th>
                <th className="p-3.5">Nivel</th>
                <th className="p-3.5">Rango</th>
                <th className="p-3.5">BV Personal</th>
                <th className="p-3.5">BV Grupal</th>
                <th className="p-3.5">Directos</th>
                <th className="p-3.5 rounded-r-2xl text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredAffiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center font-bold text-white text-xs">
                        {aff.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{aff.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{aff.code} • {aff.country}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-300 font-medium">Nivel {aff.level}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {aff.rank}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-white">{aff.personalBv} BV</td>
                  <td className="p-3.5 font-bold text-emerald-400">{aff.groupBv.toLocaleString()} BV</td>
                  <td className="p-3.5 text-slate-300">{aff.directReferralsCount} socios</td>
                  <td className="p-3.5 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                      ● Activo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
