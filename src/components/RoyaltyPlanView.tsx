import React, { useState } from 'react';
import { 
  DollarSign, Award, Users, TrendingUp, Layers, CheckCircle2, 
  HelpCircle, Sparkles, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

export const RoyaltyPlanView: React.FC = () => {
  // Simulator inputs
  const [directsCount, setDirectsCount] = useState<number>(4);
  const [duplicationFactor, setDuplicationFactor] = useState<number>(3);
  const [averageBv, setAverageBv] = useState<number>(100);

  // Compensation levels percentage
  const levelPercentages = [
    { level: 1, percent: 8, label: 'Nivel 1 (Directos)' },
    { level: 2, percent: 6, label: 'Nivel 2' },
    { level: 3, percent: 5, label: 'Nivel 3' },
    { level: 4, percent: 4, label: 'Nivel 4' },
    { level: 5, percent: 3, label: 'Nivel 5' },
    { level: 6, percent: 2, label: 'Nivel 6' },
    { level: 7, percent: 2, label: 'Nivel 7' },
    { level: 8, percent: 1, label: 'Nivel 8' },
  ];

  // Calculate matrix
  let totalCommissionsMonthly = 0;
  let totalNetworkAffiliates = 0;
  let totalNetworkBv = 0;

  const simulationResults = levelPercentages.map((lvl, index) => {
    const affiliatesInLevel = index === 0 ? directsCount : Math.round(directsCount * Math.pow(duplicationFactor, index));
    const volumeBv = affiliatesInLevel * averageBv;
    const commissionUsd = volumeBv * (lvl.percent / 100);

    totalNetworkAffiliates += affiliatesInLevel;
    totalNetworkBv += volumeBv;
    totalCommissionsMonthly += commissionUsd;

    return {
      ...lvl,
      affiliatesInLevel,
      volumeBv,
      commissionUsd
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner and Summary Cards */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white">Plan de Compensación & Regalías Humanómica</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Compresión Dinámica
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Estructura uninivel híbrida de alto impacto: bonos de inicio rápido, residuales continuos sobre 8 niveles y reparto del fondo global de liderazgo diseñado por Ángel Manuel Breña Eulogio.
          </p>
        </div>

        {/* 3 Pillar Bonus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Bono Inicio Rápido (N1)
              </span>
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Zap className="w-4 h-4" />
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">20% Inmediato</h4>
            <p className="text-xs text-slate-400">
              Pagado sobre el puntaje BV de activación de cada nuevo afiliado directo patrocinado en su primer pedido.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Comisión Residual Uninivel
              </span>
              <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                <Layers className="w-4 h-4" />
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">Hasta 8 Niveles</h4>
            <p className="text-xs text-slate-400">
              Distribución porcentual sobre la recompra mensual de la red con compresión dinámica automática.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Bono Fondo Global Liderazgo
              </span>
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                <Award className="w-4 h-4" />
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">3% a 5% Pool</h4>
            <p className="text-xs text-slate-400">
              Participación directa en la facturación mundial para rangos Zafiro, Esmeralda, Diamante y Corona.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Dynamic Earnings Simulator */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Simulador Interactivo de Ingresos Residuales</h3>
            </div>
            <p className="text-xs text-slate-400">
              Ajusta los parámetros de duplicación para proyectar tus comisiones mensuales recurrentes
            </p>
          </div>

          {/* Quick Projected Total Banner */}
          <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/40 px-5 py-3 rounded-2xl text-right">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">
              Comisión Mensual Proyectada (USD)
            </span>
            <span className="text-2xl font-black text-emerald-400">
              ${totalCommissionsMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })} / mes
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          {/* Slider 1: Directs */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Socios Directos (Nivel 1):</span>
              <span className="font-bold text-emerald-400 text-sm">{directsCount} directos</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={directsCount}
              onChange={(e) => setDirectsCount(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Número de líderes patrocinados personalmente</span>
          </div>

          {/* Slider 2: Duplication */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Duplicación por Nivel:</span>
              <span className="font-bold text-emerald-400 text-sm">{duplicationFactor} por socio</span>
            </div>
            <input
              type="range"
              min="2"
              max="5"
              step="1"
              value={duplicationFactor}
              onChange={(e) => setDuplicationFactor(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Promedio de afiliados que incorpora cada distribuidor</span>
          </div>

          {/* Slider 3: Average BV */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Consumo Promedio Mensual (BV):</span>
              <span className="font-bold text-emerald-400 text-sm">{averageBv} BV</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="25"
              value={averageBv}
              onChange={(e) => setAverageBv(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Recompra habitual de productos funcionales</span>
          </div>
        </div>

        {/* Level Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Nivel de Red</th>
                <th className="p-3.5">% Residual</th>
                <th className="p-3.5">Distribuidores</th>
                <th className="p-3.5">Volumen Puntos (BV)</th>
                <th className="p-3.5 rounded-r-2xl text-right">Comisión Proyectada ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {simulationResults.map((res) => (
                <tr key={res.level} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-emerald-400 border border-slate-700">
                      {res.level}
                    </span>
                    <span>{res.label}</span>
                  </td>
                  <td className="p-3.5 font-mono text-emerald-400 font-bold">{res.percent}%</td>
                  <td className="p-3.5 text-slate-300">{res.affiliatesInLevel.toLocaleString()} distribuidores</td>
                  <td className="p-3.5 font-bold text-white">{res.volumeBv.toLocaleString()} BV</td>
                  <td className="p-3.5 text-right font-black text-emerald-400 text-sm">
                    ${res.commissionUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Company Ranks & Milestones Table */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
        <div>
          <h4 className="text-lg font-bold text-white">Carrera de Liderazgo & Requisitos de Rango</h4>
          <p className="text-xs text-slate-400">Escala de calificación mensual y bonos de estilo de vida</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Rango Requerido</th>
                <th className="p-3.5">BV Personal Mín.</th>
                <th className="p-3.5">Volumen Grupal Mínimo</th>
                <th className="p-3.5">Profundidad Pagada</th>
                <th className="p-3.5 rounded-r-2xl text-right">Bonos Especiales & Estilo de Vida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Asociado</td>
                <td className="p-3.5 text-slate-300">50 BV</td>
                <td className="p-3.5 text-slate-300">100 BV</td>
                <td className="p-3.5 text-slate-300">2 Niveles</td>
                <td className="p-3.5 text-right text-slate-400">Descuento de Socio (30%)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Asociado Senior</td>
                <td className="p-3.5 text-slate-300">100 BV</td>
                <td className="p-3.5 text-emerald-400 font-bold">1,000 BV</td>
                <td className="p-3.5 text-slate-300">3 Niveles</td>
                <td className="p-3.5 text-right text-emerald-400 font-semibold">Bono Activación Rápida</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Platino</td>
                <td className="p-3.5 text-slate-300">100 BV</td>
                <td className="p-3.5 text-emerald-400 font-bold">5,000 BV</td>
                <td className="p-3.5 text-slate-300">5 Niveles</td>
                <td className="p-3.5 text-right text-emerald-400 font-semibold">Bono Convención Anual + 2% Pool</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Zafiro Ejecutivo</td>
                <td className="p-3.5 text-slate-300">100 BV</td>
                <td className="p-3.5 text-emerald-400 font-bold">10,000 BV</td>
                <td className="p-3.5 text-slate-300">6 Niveles</td>
                <td className="p-3.5 text-right text-emerald-400 font-semibold">Bono Desarrollo de Liderazgo</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-emerald-500/5">
                <td className="p-3.5 font-bold text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Diamante (Rango Actual)</span>
                </td>
                <td className="p-3.5 text-slate-300">100 BV</td>
                <td className="p-3.5 text-emerald-400 font-bold">20,000 BV</td>
                <td className="p-3.5 text-slate-300">8 Niveles</td>
                <td className="p-3.5 text-right text-amber-400 font-black">Bono Auto de Lujo + 4% Pool</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Diamante Corona</td>
                <td className="p-3.5 text-slate-300">150 BV</td>
                <td className="p-3.5 text-emerald-400 font-bold">75,000 BV</td>
                <td className="p-3.5 text-slate-300">Ilimitada (Compresión Dinámica)</td>
                <td className="p-3.5 text-right text-amber-400 font-black">Bono Residencia / Mansión + 5% Pool</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
