import React, { useState } from 'react';
import { 
  FileText, Printer, Download, ShieldCheck, Search, Filter, 
  Clock, AlertTriangle, Eye, ArrowDownToLine, CheckCircle2, Lock
} from 'lucide-react';
import { AuditLog, Affiliate, MonthlyEarning } from '../types';

interface ReportsAndAuditViewProps {
  logs: AuditLog[];
  affiliates: Affiliate[];
  earnings: MonthlyEarning[];
}

export const ReportsAndAuditView: React.FC<ReportsAndAuditViewProps> = ({ logs, affiliates, earnings }) => {
  const [reportType, setReportType] = useState<'liquidaciones' | 'afiliados' | 'inventario' | 'seguridad'>('liquidaciones');
  const [selectedPeriod, setSelectedPeriod] = useState('Septiembre / Octubre 2026');
  const [searchTerm, setSearchTerm] = useState('');

  const handleExportCsv = () => {
    let csvContent = '';
    let filename = '';

    if (reportType === 'liquidaciones') {
      filename = `reporte_liquidaciones_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Periodo,Venta Personal (USD),Regalías Red (USD),Bonos (USD),Total Liquidado (USD),Estado\n';
      earnings.forEach(e => {
        csvContent += `"${e.month}",${e.personalSales.toFixed(2)},${e.royalties.toFixed(2)},${e.bonuses.toFixed(2)},${e.total.toFixed(2)},"${e.status}"\n`;
      });
    } else if (reportType === 'afiliados') {
      filename = `padron_afiliados_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Codigo,Nombre,Rango,Puntos Personales (BV),Puntos Grupales (BV),Patrocinador,Estado\n';
      affiliates.forEach(a => {
        csvContent += `"${a.code}","${a.name}","${a.rank}",${a.personalBv},${a.groupBv},"${a.sponsorName}","${a.status}"\n`;
      });
    } else {
      filename = `bitacora_seguridad_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'Fecha Hora,Usuario,Accion,Modulo,Detalles,IP\n';
      logs.forEach(l => {
        csvContent += `"${l.timestamp}","${l.userName}","${l.action}","${l.module}","${l.details.replace(/"/g, '""')}","${l.ipAddress}"\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter(l => 
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.ipAddress.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Centro de Reportes Oficiales & Auditoría de Seguridad</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generación de reportes certificados PDF, liquidaciones mensuales y registro forense de IP para acciones sensibles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs px-4 py-2.5 rounded-2xl shadow flex items-center space-x-1.5 transition shrink-0 border border-slate-700"
            title="Exportar registros a archivo CSV"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow flex items-center space-x-2 transition shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Descargar Reporte PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selector Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setReportType('liquidaciones')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            reportType === 'liquidaciones' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Reporte de Liquidación de Comisiones
        </button>
        <button
          onClick={() => setReportType('afiliados')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            reportType === 'afiliados' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Padrón de Afiliados & Rangos
        </button>
        <button
          onClick={() => setReportType('seguridad')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            reportType === 'seguridad' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Bitácora Forense de Seguridad & IPs ({logs.length})
        </button>
      </div>

      {/* Certified Printable Report Paper (Wysiwyg for print) */}
      {reportType !== 'seguridad' && (
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 tracking-wider block">
                Documento Oficial de Liquidación y Auditoría
              </span>
              <h2 className="text-xl font-black text-white">AB Natural Networkers</h2>
              <p className="text-xs text-slate-400">Dirigido por Ángel Breña • Multinivel Diamante AB</p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400 block">Periodo Certificado:</span>
              <strong className="text-white font-mono">{selectedPeriod}</strong>
              <span className="text-[10px] text-slate-500 block">Emisión: {new Date().toLocaleDateString('es-ES')}</span>
            </div>
          </div>

          {reportType === 'liquidaciones' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Total Liquidado</span>
                  <span className="text-xl font-black text-emerald-400">$38,200.00 USD</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Afiliados Beneficiarios</span>
                  <span className="text-xl font-black text-white">2,480 Socios</span>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Retención Tributaria (10%)</span>
                  <span className="text-xl font-black text-amber-400">$3,820.00 USD</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800 text-slate-300 uppercase">
                    <tr>
                      <th className="p-3">Periodo</th>
                      <th className="p-3">Venta Personal</th>
                      <th className="p-3">Regalías Red</th>
                      <th className="p-3">Bonos</th>
                      <th className="p-3">Total Liquidado</th>
                      <th className="p-3 text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {earnings.map((e, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-white">{e.month}</td>
                        <td className="p-3 text-slate-300">${e.personalSales.toFixed(2)}</td>
                        <td className="p-3 text-slate-300">${e.royalties.toFixed(2)}</td>
                        <td className="p-3 text-slate-300">${e.bonuses.toFixed(2)}</td>
                        <td className="p-3 font-bold text-emerald-400">${e.total.toFixed(2)}</td>
                        <td className="p-3 text-right font-mono text-emerald-400">✓ {e.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'afiliados' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800 text-slate-300 uppercase">
                  <tr>
                    <th className="p-3">Código</th>
                    <th className="p-3">Socio</th>
                    <th className="p-3">Rango</th>
                    <th className="p-3">Puntos Pers.</th>
                    <th className="p-3">Puntos Grup.</th>
                    <th className="p-3">Patrocinador</th>
                    <th className="p-3 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {affiliates.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-cyan-400 font-bold">{a.code}</td>
                      <td className="p-3 font-medium text-white">{a.name}</td>
                      <td className="p-3 text-amber-400 font-bold">{a.rank}</td>
                      <td className="p-3 text-slate-300">{a.personalBv} BV</td>
                      <td className="p-3 font-bold text-white">{a.groupBv.toLocaleString()} BV</td>
                      <td className="p-3 text-slate-400">{a.sponsorName}</td>
                      <td className="p-3 text-right text-emerald-400 font-semibold">● {a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Legal Certification Note */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Certificado bajo el protocolo de cumplimiento ético de AB Natural Networkers.</span>
            <span className="font-mono text-cyan-400">Firma Digital: ANGEL-BRENA-VERIFIED-2026</span>
          </div>
        </div>
      )}

      {/* Security Audit Log View */}
      {reportType === 'seguridad' && (
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Bitácora de Auditoría & Trazabilidad Forense</span>
              </h4>
              <p className="text-xs text-slate-400">Registro inmutable de accesos, modificaciones de comisiones y cambios sensibles de IP.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por usuario o IP..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-300 uppercase">
                <tr>
                  <th className="p-3">Fecha y Hora</th>
                  <th className="p-3">Usuario</th>
                  <th className="p-3">Acción Registrada</th>
                  <th className="p-3">Módulo</th>
                  <th className="p-3">Detalles</th>
                  <th className="p-3 text-right">Dirección IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="p-3 font-bold text-white">{log.userName}</td>
                    <td className="p-3 text-cyan-300 font-semibold">{log.action}</td>
                    <td className="p-3 text-slate-300">{log.module}</td>
                    <td className="p-3 text-slate-400 max-w-xs truncate">{log.details}</td>
                    <td className="p-3 text-right font-mono text-amber-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
