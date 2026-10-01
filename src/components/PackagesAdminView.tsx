import React, { useState } from 'react';
import { 
  Package, Plus, Edit2, Copy, Trash2, CheckCircle2, 
  X, Sparkles, Layers, DollarSign, Award, Clock
} from 'lucide-react';
import { AffiliationPackage, Product } from '../types';

interface PackagesAdminViewProps {
  packages: AffiliationPackage[];
  products: Product[];
  onAddPackage: (pkg: AffiliationPackage) => void;
  onUpdatePackage: (pkg: AffiliationPackage) => void;
  onDeletePackage: (id: string) => void;
}

export const PackagesAdminView: React.FC<PackagesAdminViewProps> = ({
  packages,
  products,
  onAddPackage,
  onUpdatePackage,
  onDeletePackage
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<AffiliationPackage | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState(250);
  const [bv, setBv] = useState(150);
  const [validityDays, setValidityDays] = useState(365);
  const [initialRank, setInitialRank] = useState('Bronce');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);

  const openCreateModal = () => {
    setEditingPkg(null);
    setName('');
    setCode(`PACK-${Math.floor(100 + Math.random() * 900)}`);
    setPrice(200);
    setBv(120);
    setValidityDays(365);
    setInitialRank('Bronce');
    setDescription('');
    setFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: AffiliationPackage) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setCode(pkg.code);
    setPrice(pkg.price);
    setBv(pkg.bv);
    setValidityDays(pkg.validityDays);
    setInitialRank(pkg.initialRank);
    setDescription(pkg.description);
    setFeatured(Boolean(pkg.featured));
    setIsModalOpen(true);
  };

  const handleDuplicate = (pkg: AffiliationPackage) => {
    const duplicated: AffiliationPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      code: `${pkg.code}-COPIA`,
      name: `${pkg.name} (Copia)`,
      status: 'active'
    };
    onAddPackage(duplicated);
  };

  const handleToggleStatus = (pkg: AffiliationPackage) => {
    onUpdatePackage({
      ...pkg,
      status: pkg.status === 'active' ? 'inactive' : 'active'
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingPkg) {
      onUpdatePackage({
        ...editingPkg,
        name,
        code,
        price: Number(price),
        bv: Number(bv),
        validityDays: Number(validityDays),
        initialRank,
        description,
        featured
      });
    } else {
      const newPkg: AffiliationPackage = {
        id: `pkg-${Date.now()}`,
        code: code || `PACK-${Date.now()}`,
        name,
        price: Number(price),
        bv: Number(bv),
        validityDays: Number(validityDays),
        initialRank,
        description,
        includedProducts: [
          { productId: products[0]?.id || 'prod-1', productName: products[0]?.name || 'Enercell', quantity: 2 }
        ],
        featured,
        status: 'active'
      };
      onAddPackage(newPkg);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Configuración de Paquetes de Afiliación & Membresías</h3>
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Hasta 30 Paquetes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Crea, edita, duplica y administra las membresías oficiales, asignación de puntos BV y rangos iniciales.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-2xl shadow flex items-center space-x-1.5 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo Paquete</span>
        </button>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`bg-slate-900 rounded-3xl p-6 border shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden transition-all ${
              pkg.featured ? 'border-amber-500/50' : 'border-slate-800'
            }`}
          >
            {pkg.featured && (
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Destacado
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {pkg.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  pkg.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {pkg.status === 'active' ? '● Activo' : '● Inactivo'}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                <span className="text-xs text-amber-400 font-semibold block">Rango Inicial: {pkg.initialRank}</span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-emerald-400">${pkg.price.toFixed(2)}</span>
                <span className="text-xs text-cyan-300 font-mono font-bold">({pkg.bv} Puntos BV)</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {pkg.description}
              </p>

              {pkg.includedProducts && pkg.includedProducts.length > 0 && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Productos incluidos:</span>
                  {pkg.includedProducts.map((p, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {p.productName}</span>
                      <span className="font-bold text-white">x{p.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => openEditModal(pkg)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-semibold flex items-center gap-1"
                title="Editar paquete"
              >
                <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Editar</span>
              </button>

              <button
                onClick={() => handleDuplicate(pkg)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-semibold flex items-center gap-1"
                title="Duplicar paquete"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Duplicar</span>
              </button>

              <button
                onClick={() => handleToggleStatus(pkg)}
                className={`px-3 py-1.5 rounded-xl transition font-semibold ${
                  pkg.status === 'active' 
                    ? 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20' 
                    : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                }`}
              >
                {pkg.status === 'active' ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Crear / Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">
                {editingPkg ? 'Editar Paquete de Afiliación' : 'Crear Nuevo Paquete de Afiliación'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Nombre del Paquete</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Membresía 350"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Código Único</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Precio ($ USD)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min="1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Puntos BV</label>
                  <input
                    type="number"
                    value={bv}
                    onChange={(e) => setBv(Number(e.target.value))}
                    min="1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Vigencia (Días)</label>
                  <input
                    type="number"
                    value={validityDays}
                    onChange={(e) => setValidityDays(Number(e.target.value))}
                    min="30"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Rango Inicial Otorgado</label>
                <select
                  value={initialRank}
                  onChange={(e) => setInitialRank(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Bronce">Bronce</option>
                  <option value="Plata">Plata</option>
                  <option value="Oro">Oro</option>
                  <option value="Platino">Platino</option>
                  <option value="Diamante Ejecutivo">Diamante Ejecutivo</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Descripción y Beneficios</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  placeholder="Detalles sobre productos incluidos, margen y acceso a conferencias..."
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="feat"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <label htmlFor="feat" className="text-slate-300 cursor-pointer">
                  Marcar como paquete destacado en la tienda pública
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl"
                >
                  Guardar Paquete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
