import React, { useState } from 'react';
import { 
  GitBranch, Search, ZoomIn, ZoomOut, RotateCcw, ChevronDown, 
  ChevronRight, Award, Gem, Users, UserCheck, Shield
} from 'lucide-react';
import { Affiliate } from '../types';

interface NetworkTreeViewProps {
  affiliates: Affiliate[];
  onSelectAffiliate?: (aff: Affiliate) => void;
}

export const NetworkTreeView: React.FC<NetworkTreeViewProps> = ({ affiliates, onSelectAffiliate }) => {
  const [structureType, setStructureType] = useState<'unilevel' | 'matrix3' | 'matrix4' | 'matrix5' | 'matrix6' | 'binary'>('unilevel');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'aff-1': true,
    'aff-2': true,
    'aff-4': true,
  });

  // Structure specific rules
  const structureMetadata = {
    unilevel: {
      title: 'Plan Uninivel Infinito (Activo Oficial)',
      width: 'Ilimitado (Frontalidad libre)',
      depth: 'Hasta 30 niveles con compresión dinámica',
      maxPositions: 'Sin límite teórico',
      placement: 'Patrocinio directo e inscripción inmediata',
      spillover: 'No aplica (Cada socio construye sus líneas frontales)',
      compression: 'Automática para socios con < 100 BV mensual',
      status: 'Activo en Producción'
    },
    matrix3: {
      title: 'Matriz Forzada 3×3',
      width: '3 posiciones frontales',
      depth: '3 niveles de profundidad',
      maxPositions: '39 posiciones totales (3 + 9 + 27)',
      placement: 'Derrame de izquierda a derecha balanceado',
      spillover: 'Activado por exceso de patrocinio directo',
      compression: 'Rollover al nodo patrocinador calificado',
      status: 'Modo Simulación (Requiere confirmación de reglas por Administrador Maestro)'
    },
    matrix4: {
      title: 'Matriz Forzada 4×4',
      width: '4 posiciones frontales',
      depth: '4 niveles de profundidad',
      maxPositions: '340 posiciones totales',
      placement: 'Derrame jerárquico por volumen',
      spillover: 'Activado con compensación lateral',
      compression: 'Compresión mensual en cierre',
      status: 'Modo Simulación (Requiere confirmación de reglas por Administrador Maestro)'
    },
    matrix5: {
      title: 'Matriz Forzada 5×5',
      width: '5 posiciones frontales',
      depth: '5 niveles de profundidad',
      maxPositions: '3,905 posiciones totales',
      placement: 'Colocación asistida por algoritmo de derrame',
      spillover: 'Derrame descendente en líneas más débiles',
      compression: 'Rollover dinámico',
      status: 'Modo Simulación (Requiere confirmación de reglas por Administrador Maestro)'
    },
    matrix6: {
      title: 'Matriz Forzada 6×6',
      width: '6 posiciones frontales',
      depth: '6 niveles de profundidad',
      maxPositions: '55,986 posiciones totales',
      placement: 'Balance automático de 6 líneas directas',
      spillover: 'Derrame rotativo por orden de registro',
      compression: 'Compresión ascendente inmediata',
      status: 'Modo Simulación (Requiere confirmación de reglas por Administrador Maestro)'
    },
    binary: {
      title: 'Árbol Binario Híbrido (Opcional Futuro)',
      width: '2 equipos (Pierna Izquierda / Pierna Derecha)',
      depth: 'Profundidad ilimitada con corte semanal/mensual',
      maxPositions: 'Infinito por ciclos',
      placement: 'Regla de derrame exterior o pierna de poder',
      spillover: 'Derrame automático por línea de auspicio',
      compression: 'No aplica; se calcula sobre pierna menor',
      status: 'Módulo en desarrollo para fase 2 (En pausa de producción)'
    }
  };

  const activeMeta = structureMetadata[structureType];

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAffiliates = affiliates.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Estructura & Árbol de Red Genealógico</h3>
            <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Hasta 30 Niveles
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualizador jerárquico multinivel con compresión dinámica y balance de líneas activas.
          </p>
        </div>

        {/* Structure Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center text-xs">
            <button
              onClick={() => setStructureType('unilevel')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                structureType === 'unilevel' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Uninivel
            </button>
            <button
              onClick={() => setStructureType('matrix3')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                structureType === 'matrix3' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriz 3×3
            </button>
            <button
              onClick={() => setStructureType('matrix4')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                structureType === 'matrix4' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriz 4×4
            </button>
            <button
              onClick={() => setStructureType('matrix5')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                structureType === 'matrix5' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriz 5×5
            </button>
            <button
              onClick={() => setStructureType('matrix6')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                structureType === 'matrix6' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Matriz 6×6
            </button>
            <button
              onClick={() => setStructureType('binary')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition opacity-80 hover:opacity-100 ${
                structureType === 'binary' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Módulo opcional de árbol binario"
            >
              Binario (Opcional)
            </button>
          </div>

          <button
            onClick={() => setShowConfigPanel(prev => !prev)}
            className="px-3.5 py-1.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{showConfigPanel ? 'Ocultar Parámetros' : 'Ver Reglas de Estructura'}</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button 
              onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))} 
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Reducir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-1 text-slate-300 font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.1))} 
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(1)} 
              className="p-1.5 text-slate-400 hover:text-white transition"
              title="Restablecer Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Structure Rules & Configuration Panel */}
      {showConfigPanel && (
        <div className="bg-slate-900 border border-cyan-500/40 p-5 rounded-3xl space-y-4 shadow-xl animate-in fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400">Reglas Técnicas de la Estructura Seleccionada</span>
              <h4 className="text-base font-bold text-white">{activeMeta.title}</h4>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              structureType === 'unilevel' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {activeMeta.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ancho Frontal</span>
              <span className="font-bold text-white">{activeMeta.width}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Profundidad</span>
              <span className="font-bold text-cyan-400">{activeMeta.depth}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Posiciones Máximas</span>
              <span className="font-bold text-amber-400">{activeMeta.maxPositions}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Compresión & Rollover</span>
              <span className="font-bold text-emerald-400">{activeMeta.compression}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <p><strong>Reglas de Colocación & Derrame (Spillover):</strong> {activeMeta.placement} • {activeMeta.spillover}</p>
            <p className="text-amber-300/90 text-[10px]">
              ⚠️ <strong>Salud Regulatoria:</strong> No se activan fórmulas de matriz ni binario en pagos hasta que el Administrador Maestro confirme sus coeficientes de calificación en el plan de compensación.
            </p>
          </div>
        </div>
      )}

      {/* Search Bar & Node Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar socio por nombre o código en el árbol..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
        <div className="text-xs text-slate-400 flex items-center space-x-3">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Diamante / Ejecutivo</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> Platino</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Oro</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Activo</span>
        </div>
      </div>

      {/* Visual Canvas Tree */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl overflow-x-auto min-h-[500px]">
        <div 
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 flex flex-col items-center space-y-8"
        >
          {/* Root Leader: Ángel Breña */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-amber-400 rounded-3xl p-5 shadow-2xl w-72 text-center relative group">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-600 to-amber-400 p-0.5 shadow-lg flex items-center justify-center -mt-9">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-lg">
                  ÁB
                </div>
              </div>
              
              <div className="mt-2 space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Diamante Ejecutivo (Líder Raíz)
                </span>
                <h4 className="font-bold text-white text-base">Ángel Manuel Breña</h4>
                <p className="text-[11px] font-mono text-cyan-400">AB-DIAMOND-001</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-[11px]">
                <div className="bg-slate-900 p-1.5 rounded-xl">
                  <span className="text-slate-400 block text-[9px]">P. Personal</span>
                  <strong className="text-white">500 BV</strong>
                </div>
                <div className="bg-slate-900 p-1.5 rounded-xl">
                  <span className="text-slate-400 block text-[9px]">P. Grupal</span>
                  <strong className="text-emerald-400">45,000 BV</strong>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center text-[10px] text-slate-400">
                <span>14 Directos Activos</span>
                <span className="text-emerald-400 font-bold">● Activo 100%</span>
              </div>
            </div>

            {/* Tree Branch Line */}
            <div className="w-0.5 h-8 bg-cyan-500/50"></div>
          </div>

          {/* Level 1 Horizontal Bar & Nodes */}
          <div className="flex items-start justify-center gap-8 relative">
            {/* Top horizontal connection connector */}
            <div className="absolute -top-4 left-24 right-24 h-0.5 bg-cyan-500/40"></div>

            {/* Sub-line 1: María Elena Silva */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-cyan-500/40 -mt-4"></div>
              <div className="bg-slate-950 border border-sky-500/50 rounded-2xl p-4 shadow-lg w-60 text-center space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">
                    Nivel 1 · Platino
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">● Activo</span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">María Elena Silva</h5>
                  <span className="text-[10px] font-mono text-slate-400">AB-PLATINUM-104</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                  <span className="text-slate-400">300 Pers.</span>
                  <span className="text-sky-400 font-bold">12,400 BV</span>
                </div>
                <button
                  onClick={() => toggleNode('aff-2')}
                  className="w-full py-1 text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 flex items-center justify-center gap-1"
                >
                  <span>{expandedNodes['aff-2'] ? 'Contraer Línea' : 'Expandir (5 socios)'}</span>
                  {expandedNodes['aff-2'] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
              </div>

              {/* Sub-nodes of María Elena (Level 2) */}
              {expandedNodes['aff-2'] && (
                <div className="flex flex-col items-center mt-2">
                  <div className="w-0.5 h-6 bg-cyan-500/40"></div>
                  <div className="bg-slate-950 border border-yellow-500/40 rounded-xl p-3 shadow w-52 text-center space-y-1">
                    <span className="text-[9px] font-bold bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                      Nivel 2 · Oro
                    </span>
                    <h6 className="font-bold text-white text-xs">Carlos Mendoza Ruiz</h6>
                    <span className="text-[10px] font-mono text-slate-400 block">AB-GOLD-305</span>
                    <div className="text-[10px] text-emerald-400 font-bold">6,500 BV Grupal</div>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-line 2: Rosaura Gómez Silva */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-cyan-500/40 -mt-4"></div>
              <div className="bg-slate-950 border border-cyan-500/50 rounded-2xl p-4 shadow-lg w-60 text-center space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
                    Nivel 1 · Diamante
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">● Activo</span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Rosaura Gómez Silva</h5>
                  <span className="text-[10px] font-mono text-slate-400">AB-DIAMOND-002</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                  <span className="text-slate-400">450 Pers.</span>
                  <span className="text-cyan-400 font-bold">28,500 BV</span>
                </div>
                <button
                  onClick={() => toggleNode('aff-4')}
                  className="w-full py-1 text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 flex items-center justify-center gap-1"
                >
                  <span>{expandedNodes['aff-4'] ? 'Contraer Línea' : 'Expandir (11 socios)'}</span>
                  {expandedNodes['aff-4'] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
              </div>

              {/* Sub-nodes of Rosaura (Level 2) */}
              {expandedNodes['aff-4'] && (
                <div className="flex flex-col items-center mt-2">
                  <div className="w-0.5 h-6 bg-cyan-500/40"></div>
                  <div className="bg-slate-950 border border-sky-500/40 rounded-xl p-3 shadow w-52 text-center space-y-1">
                    <span className="text-[9px] font-bold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">
                      Nivel 2 · Platino
                    </span>
                    <h6 className="font-bold text-white text-xs">Dr. Fernando Arismendi</h6>
                    <span className="text-[10px] font-mono text-slate-400 block">AB-SAPPHIRE-201</span>
                    <div className="text-[10px] text-emerald-400 font-bold">9,800 BV Grupal</div>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-line 3: Línea en Calificación */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-cyan-500/40 -mt-4"></div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-lg w-60 text-center space-y-2 opacity-90">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                    Nivel 1 · Plata
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">● Activo</span>
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Líder Regional México</h5>
                  <span className="text-[10px] font-mono text-slate-400">AB-MEX-701</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                  <span className="text-slate-400">200 Pers.</span>
                  <span className="text-amber-400 font-bold">4,100 BV</span>
                </div>
                <span className="text-[10px] text-slate-400 block pt-1">4 ramas descendentes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
