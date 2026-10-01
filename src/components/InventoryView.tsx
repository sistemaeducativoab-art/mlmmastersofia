import React, { useState } from 'react';
import { 
  Package, Plus, Edit2, AlertCircle, CheckCircle2, AlertTriangle, 
  Dna, Sparkles, X, Info, FileText, ChevronRight, Layers, Flame
} from 'lucide-react';
import { Product, LotRecord } from '../types';

interface InventoryViewProps {
  products: Product[];
  lots: LotRecord[];
  onUpdateProductStock: (productId: string, newStock: number) => void;
  onAddLot: (newLot: LotRecord) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  products,
  lots,
  onUpdateProductStock,
  onAddLot
}) => {
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Lot form state
  const [lotProductId, setLotProductId] = useState(products[0]?.id || '');
  const [lotUnits, setLotUnits] = useState<number>(500);
  const [lotCodeInput, setLotCodeInput] = useState('LOT-2026-NUEVO');
  const [lotExpiry, setLotExpiry] = useState('2028-06-30');
  const [lotNotes, setLotNotes] = useState('Control de calidad aprobado por FORCEXCORP E.I.R.L.');

  // Edit stock form state
  const [editUnits, setEditUnits] = useState<number>(0);

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setEditUnits(product.stock);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProductStock(editingProduct.id, editUnits);
    setIsEditModalOpen(false);
  };

  const handleSaveNewLot = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === lotProductId);
    if (!prod) return;

    const newRecord: LotRecord = {
      id: `lot-${Date.now()}`,
      productId: prod.id,
      productName: prod.name,
      lotCode: lotCodeInput,
      productionDate: new Date().toISOString().split('T')[0],
      expiryDate: lotExpiry,
      units: lotUnits,
      initialUnits: lotUnits,
      notes: lotNotes
    };

    onAddLot(newRecord);
    onUpdateProductStock(prod.id, prod.stock + lotUnits);
    setIsStockModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-white">Gestión de Stock y Lotes - Línea Funcional</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Línea Registrada
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Control maestro de productos epigenéticos: Enercell + ION, Nopaloe RF03, Moringa Hiperanthera, Biomega y MULTIBATIDO, formulados bajo supervisión analítica de Ángel Manuel Breña Eulogio.
            </p>
          </div>
          <button
            onClick={() => setIsStockModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Nuevo Lote</span>
          </button>
        </div>

        {/* Table of Products */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Producto Funcional</th>
                <th className="p-3.5">Código Lote Activo</th>
                <th className="p-3.5">Stock Disponible</th>
                <th className="p-3.5">Puntos BV</th>
                <th className="p-3.5">Precio Socio / Público</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 rounded-r-2xl text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {products.map((prod) => {
                const isOptimal = prod.status === 'optimal';
                const isLow = prod.status === 'low';
                const isCritical = prod.status === 'critical';

                return (
                  <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center font-bold text-emerald-400">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-white block text-sm">{prod.name}</span>
                          <span className="text-[11px] text-slate-400">{prod.subtitle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-300 font-mono text-xs">{prod.lotCode}</td>
                    <td className="p-3.5 font-bold">
                      <span className={`text-sm ${
                        isOptimal ? 'text-emerald-400' : isLow ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {prod.stock.toLocaleString()} unidades
                      </span>
                      <span className="text-[10px] text-slate-500 block font-normal">
                        Mín. sugerido: {prod.minThreshold} u.
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-white text-sm">{prod.bv} BV</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-emerald-400">${prod.distributorPrice}</span>
                      <span className="text-slate-500 text-[11px] line-through ml-2">${prod.publicPrice}</span>
                    </td>
                    <td className="p-3.5">
                      {isOptimal && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Óptimo
                        </span>
                      )}
                      {isLow && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Bajo
                        </span>
                      )}
                      {isCritical && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Crítico
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => setSelectedProductDetails(prod)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold inline-flex items-center gap-1"
                        title="Ver Ficha Epigenética"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ficha</span>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold inline-flex items-center gap-1"
                        title="Editar Stock"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Ajustar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lots Audit List */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white text-base">Historial y Trazabilidad de Lotes de Producción</h4>
            <p className="text-xs text-slate-400">Verificación de fechas de formulación y vencimiento</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">{lots.length} Lotes Registrados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lots.map((lot) => (
            <div key={lot.id} className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{lot.productName}</span>
                <span className="font-mono text-xs text-emerald-400 font-semibold">{lot.lotCode}</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Unidades:</span>
                  <span className="font-bold text-white">{lot.units} / {lot.initialUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vencimiento:</span>
                  <span className="text-amber-300 font-mono">{lot.expiryDate}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-700/60">
                "{lot.notes}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Ficha Epigenética Detallada */}
      {selectedProductDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedProductDetails(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white">
                <Dna className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{selectedProductDetails.name}</h3>
                <p className="text-xs text-emerald-400 font-medium">{selectedProductDetails.subtitle}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Mechanism */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-1.5">
                <span className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider block">
                  Mecanismo Molecular & Epigenético
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedProductDetails.mechanism}
                </p>
              </div>

              {/* Mode of Use with exact rules */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-1.5">
                <span className="font-bold text-amber-400 text-[11px] uppercase tracking-wider block flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Modo de Empleo & Activación Recomendada
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {selectedProductDetails.modeOfUse}
                </p>
              </div>

              {/* Ingredients list */}
              <div>
                <span className="font-bold text-slate-300 block mb-2">Ingredientes & Principios Activos Estandarizados:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductDetails.ingredients.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs">
                      ✓ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business values */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Puntos BV</span>
                  <span className="text-base font-bold text-white">{selectedProductDetails.bv} BV</span>
                </div>
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Precio Socio</span>
                  <span className="text-base font-bold text-emerald-400">${selectedProductDetails.distributorPrice}</span>
                </div>
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase block">Precio Público</span>
                  <span className="text-base font-bold text-slate-300">${selectedProductDetails.publicPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Registrar Nuevo Lote */}
      {isStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Registrar Nuevo Lote de Producto</h3>
              <button onClick={() => setIsStockModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewLot} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Producto Funcional</label>
                <select
                  value={lotProductId}
                  onChange={(e) => setLotProductId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.bv} BV)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Código de Lote</label>
                <input
                  type="text"
                  value={lotCodeInput}
                  onChange={(e) => setLotCodeInput(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Cantidad de Unidades</label>
                  <input
                    type="number"
                    min="1"
                    value={lotUnits}
                    onChange={(e) => setLotUnits(Number(e.target.value))}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={lotExpiry}
                    onChange={(e) => setLotExpiry(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">Observaciones de Control de Calidad</label>
                <textarea
                  value={lotNotes}
                  onChange={(e) => setLotNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStockModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl"
                >
                  Guardar Lote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Ajustar Stock */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Ajustar Stock: {editingProduct.name}</h3>
            
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1">Stock Disponible Actual</label>
                <input
                  type="number"
                  min="0"
                  value={editUnits}
                  onChange={(e) => setEditUnits(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-base font-bold"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
