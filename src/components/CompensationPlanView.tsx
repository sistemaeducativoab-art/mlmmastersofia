import React, { useState } from 'react';
import { 
  Sliders, Award, Gem, Sparkles, CheckCircle2, DollarSign, 
  Layers, Users, Shield, ArrowRight, RotateCcw, Edit2, Save
} from 'lucide-react';
import { CareerRank } from '../types';

interface CompensationPlanViewProps {
  ranks: CareerRank[];
}

export const CompensationPlanView: React.FC<CompensationPlanViewProps> = ({ ranks }) => {
  // Plan percentages editable state
  const [directSponsorPercent, setDirectSponsorPercent] = useState(20);
  const [personalSalesPercent, setPersonalSalesPercent] = useState(30);
  const [globalPoolPercent, setGlobalPoolPercent] = useState(5);
  const [minMonthlyBv, setMinMonthlyBv] = useState(100);
  const [activeLevelsCount, setActiveLevelsCount] = useState(30);
  const [isSaved, setIsSaved] = useState(false);

  // Simulator state
  const [simDirects, setSimDirects] = useState(4);
  const [simDuplication, setSimDuplication] = useState(3);
  const [simAverageBv, setSimAverageBv] = useState(100);

  // Level percentages schedule (up to level 10 shown, up to 30 supported)
  const [levelRules, setLevelRules] = useState([
    { level: 1, percent: 8, label: 'Nivel 1 (Directos)' },
    { level: 2, percent: 7, label: 'Nivel 2' },
    { level: 3, percent: 6, label: 'Nivel 3' },
    { level: 4, percent: 5, label: 'Nivel 4' },
    { level: 5, percent: 4, label: 'Nivel 5' },
    { level: 6, percent: 3, label: 'Nivel 6' },
    { level: 7, percent: 2, label: 'Nivel 7' },
    { level: 8, percent: 2, label: 'Nivel 8' },
    { level: 9, percent: 1, label: 'Nivel 9' },
    { level: 10, percent: 1, label: 'Nivel 10 al 30 (Compresión Dinámica)' }
  ]);

  const handleSaveConfig = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Calculation for simulator
  let totalCommissionsSim = 0;
  let totalTeamSim = 0;

  const simRows = levelRules.slice(0, 7).map((rule, idx) => {
    const affiliates = idx === 0 ? simDirects : Math.round(simDirects * Math.pow(simDuplication, idx));
    const volume = affiliates * simAverageBv;
    const earned = volume * (rule.percent / 100);

    totalTeamSim += affiliates;
    totalCommissionsSim += earned;

    return {
      level: rule.level,
      label: rule.label,
      percent: rule.percent,
      affiliates,
      volume,
      earned
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Configuración del Plan de Compensación & Niveles</h3>
            <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Hasta 30 Niveles
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Ajusta los porcentajes de bono de patrocinio, regalías uninivel con compresión dinámica y requisitos de calificación.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow flex items-center space-x-1.5 transition shrink-0"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? '¡Reglas Guardadas!' : 'Guardar Parámetros'}</span>
        </button>
      </div>

      {/* Core Rules Config Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Bono Patrocinio Directo</span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={directSponsorPercent}
              onChange={(e) => setDirectSponsorPercent(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xl font-black text-amber-400 w-24"
            />
            <span className="text-lg font-bold text-slate-400">%</span>
          </div>
          <p className="text-[11px] text-slate-400">Sobre puntaje BV del primer pedido del afiliado.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Descuento Venta Personal</span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={personalSalesPercent}
              onChange={(e) => setPersonalSalesPercent(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xl font-black text-cyan-400 w-24"
            />
            <span className="text-lg font-bold text-slate-400">%</span>
          </div>
          <p className="text-[11px] text-slate-400">Margen comercial de reventa para el distribuidor.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Pool Global de Liderazgo</span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={globalPoolPercent}
              onChange={(e) => setGlobalPoolPercent(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xl font-black text-emerald-400 w-24"
            />
            <span className="text-lg font-bold text-slate-400">%</span>
          </div>
          <p className="text-[11px] text-slate-400">Fondo mundial repartido entre Diamantes y Maestros.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400 font-semibold uppercase block">Activación Mensual Mín.</span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={minMonthlyBv}
              onChange={(e) => setMinMonthlyBv(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xl font-black text-white w-24"
            />
            <span className="text-xs font-mono font-bold text-slate-400">BV</span>
          </div>
          <p className="text-[11px] text-slate-400">Puntos personales para calificar comisiones de red.</p>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Simulador Interactivo de Ganancias Residuales</span>
            </h4>
            <p className="text-xs text-slate-400">Modifica los factores de duplicación para calcular ingresos estimados</p>
          </div>

          <div className="bg-gradient-to-r from-cyan-600/20 to-emerald-600/20 border border-cyan-500/30 px-4 py-2.5 rounded-2xl text-right">
            <span className="text-[10px] text-cyan-300 font-bold uppercase block">Proyección Mensual</span>
            <span className="text-2xl font-black text-emerald-400">${totalCommissionsSim.toLocaleString('en-US', { maximumFractionDigits: 0 })} USD</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs">
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300 font-semibold">Socios Directos (Nivel 1):</span>
              <strong className="text-amber-400">{simDirects} directos</strong>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              value={simDirects}
              onChange={(e) => setSimDirects(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300 font-semibold">Duplicación por Nivel:</span>
              <strong className="text-cyan-400">{simDuplication} por socio</strong>
            </div>
            <input
              type="range"
              min="2"
              max="5"
              value={simDuplication}
              onChange={(e) => setSimDuplication(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300 font-semibold">Consumo Promedio (BV):</span>
              <strong className="text-emerald-400">{simAverageBv} BV</strong>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="25"
              value={simAverageBv}
              onChange={(e) => setSimAverageBv(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Nivel</th>
                <th className="p-3.5">% Pago</th>
                <th className="p-3.5">Distribuidores en Nivel</th>
                <th className="p-3.5">Volumen Puntos</th>
                <th className="p-3.5 rounded-r-2xl text-right">Comisión Proyectada ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {simRows.map((r) => (
                <tr key={r.level} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs">
                      {r.level}
                    </span>
                    <span>{r.label}</span>
                  </td>
                  <td className="p-3.5 font-mono text-cyan-400 font-bold">{r.percent}%</td>
                  <td className="p-3.5 text-slate-300">{r.affiliates.toLocaleString()} socios</td>
                  <td className="p-3.5 font-bold text-white">{r.volume.toLocaleString()} BV</td>
                  <td className="p-3.5 text-right font-black text-emerald-400 text-sm">
                    ${r.earned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Career Ranks Matrix */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
        <div>
          <h4 className="text-lg font-bold text-white">Plan de Carrera Oficial (9 Rangos)</h4>
          <p className="text-xs text-slate-400">Requisitos de calificación mensual y bonos por ascenso de rango</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Rango</th>
                <th className="p-3.5">BV Personal</th>
                <th className="p-3.5">Volumen Grupal</th>
                <th className="p-3.5">Líneas Activas</th>
                <th className="p-3.5">Niveles Pagados</th>
                <th className="p-3.5">Bono Ascenso</th>
                <th className="p-3.5 rounded-r-2xl">Beneficios Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {ranks.map((rk) => (
                <tr key={rk.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold" style={{ color: rk.color }}>
                    ★ {rk.name}
                  </td>
                  <td className="p-3.5 text-slate-300 font-semibold">{rk.minPersonalBv} BV</td>
                  <td className="p-3.5 font-bold text-emerald-400">{rk.minGroupBv.toLocaleString()} BV</td>
                  <td className="p-3.5 text-slate-300">{rk.minActiveLegs} líneas</td>
                  <td className="p-3.5 text-cyan-300 font-mono font-bold">Hasta {rk.maxLevelsPaid} Niv.</td>
                  <td className="p-3.5 font-bold text-amber-400">${rk.rankBonusUsd.toLocaleString()}</td>
                  <td className="p-3.5 text-slate-400 text-[11px]">
                    {rk.perks.join(' • ')}
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
