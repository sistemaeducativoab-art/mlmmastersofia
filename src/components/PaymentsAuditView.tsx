import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertCircle, ArrowUpRight, 
  Search, Filter, Printer, Download, X, ShieldCheck, DollarSign, Send
} from 'lucide-react';
import { PaymentRecord } from '../types';

interface PaymentsAuditViewProps {
  payments: PaymentRecord[];
  onApprovePayment: (paymentId: string) => void;
  onDisburseAllPending: () => void;
}

export const PaymentsAuditView: React.FC<PaymentsAuditViewProps> = ({
  payments,
  onApprovePayment,
  onDisburseAllPending
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pagado' | 'Pendiente' | 'En Revisión'>('all');
  const [selectedVoucher, setSelectedVoucher] = useState<PaymentRecord | null>(null);
  const [isDisbursingModalOpen, setIsDisbursingModalOpen] = useState(false);

  const pendingPayments = payments.filter(p => p.status === 'Pendiente');
  const pendingTotalAmount = pendingPayments.reduce((acc, curr) => acc + curr.netAmount, 0);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = p.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.affiliateCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExecuteDisbursement = () => {
    onDisburseAllPending();
    setIsDisbursingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner and Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Auditoría y Dispersión de Pagos a Afiliados</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Cierre Octubre 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Control de comisiones devengadas, liquidaciones de red y transferencias bancarias aprobadas con retención de ley para los socios distribuidores.
            </p>
          </div>

          <button
            onClick={() => setIsDisbursingModalOpen(true)}
            disabled={pendingPayments.length === 0}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Ejecutar Dispersión de Pagos ({pendingPayments.length})</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por socio, código o banco..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto">
            {(['all', 'Pagado', 'Pendiente', 'En Revisión'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st === 'all' ? 'Todos los Registros' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Socio / Distribuidor</th>
                <th className="p-3.5">Banco & Cuenta</th>
                <th className="p-3.5">Monto Bruto</th>
                <th className="p-3.5">Retención (10%)</th>
                <th className="p-3.5">Neto a Pagar</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 rounded-r-2xl text-right">Comprobante / Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {filteredPayments.map((p) => {
                const isPaid = p.status === 'Pagado';
                const isPending = p.status === 'Pendiente';
                const isReview = p.status === 'En Revisión';

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-white block text-sm">{p.affiliateName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {p.affiliateCode} • {p.groupBv.toLocaleString()} BV Grupal
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-200 block">{p.bankName}</span>
                      <span className="font-mono text-slate-400 text-[11px]">{p.accountNumber}</span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-semibold">${p.grossAmount.toFixed(2)}</td>
                    <td className="p-3.5 text-rose-400 font-mono">-${p.retentionTax.toFixed(2)}</td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-emerald-400 text-sm">
                        ${p.netAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {isPaid && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Pagado
                        </span>
                      )}
                      {isPending && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pendiente
                        </span>
                      )}
                      {isReview && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> En Revisión
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      {isPending && (
                        <button
                          onClick={() => onApprovePayment(p.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition text-xs shadow-sm"
                        >
                          Aprobar
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedVoucher(p)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold transition text-xs"
                      >
                        Ver Vale
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Ver Comprobante Digital / Vale de Liquidación */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedVoucher(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Voucher Header */}
            <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Vale Oficial de Liquidación de Comisiones
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">Multinivel Master</h3>
                <p className="text-xs text-slate-400">Sistema Educativo AB • Ecosistema Humanómica</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Comprobante N°</span>
                <span className="text-xs font-mono font-bold text-white">
                  {selectedVoucher.voucherNumber || 'VAL-2026-0091'}
                </span>
              </div>
            </div>

            {/* Beneficiary Info */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Socio Beneficiario:</span>
                <span className="font-bold text-white text-sm">{selectedVoucher.affiliateName}</span>
                <span className="text-slate-400 font-mono block text-[11px]">{selectedVoucher.affiliateCode}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Entidad & Cuenta:</span>
                <span className="font-bold text-white">{selectedVoucher.bankName}</span>
                <span className="text-slate-400 font-mono block text-[11px]">{selectedVoucher.accountNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Periodo de Liquidación:</span>
                <span className="font-medium text-slate-300">{selectedVoucher.period}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Volumen Calificado:</span>
                <span className="font-medium text-emerald-400">
                  {selectedVoucher.personalBv} BV (P) / {selectedVoucher.groupBv.toLocaleString()} BV (G)
                </span>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>Comisión Residual Uninivel Devengada:</span>
                <span className="font-semibold text-white">${selectedVoucher.grossAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-rose-300">
                <span>Retención Legal de Ley (10%):</span>
                <span className="font-mono">-${selectedVoucher.retentionTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-black text-white bg-slate-800/60 p-3 rounded-xl">
                <span>Monto Neto Transferido:</span>
                <span className="text-emerald-400 text-base font-black">
                  ${selectedVoucher.netAmount.toFixed(2)} USD
                </span>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Autorizado por: <strong>Ángel Manuel Breña Eulogio</strong> (Gerencia & Auditoría)</span>
              </div>
              <span className="font-mono">{selectedVoucher.paymentDate || 'Fecha: En proceso'}</span>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Recibo</span>
              </button>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Cerrar Vale
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirmación de Dispersión Masiva */}
      {isDisbursingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Confirmar Dispersión Bancaria Masiva</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Estás seguro de autorizar la dispersión inmediata a las cuentas bancarias de los <strong>{pendingPayments.length} socios pendientes</strong> por un total neto de:
            </p>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Total a Dispersar</span>
              <span className="text-2xl font-black text-emerald-400">${pendingTotalAmount.toFixed(2)} USD</span>
            </div>
            <p className="text-[11px] text-slate-400">
              * La orden será enviada a las interfaces bancarias (BCP, Interbank, BBVA, Swift) con comprobante de liquidación automática.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsDisbursingModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleExecuteDisbursement}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Ejecutar Ahora
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
