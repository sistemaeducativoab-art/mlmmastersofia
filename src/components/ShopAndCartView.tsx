import React, { useState } from 'react';
import { 
  ShoppingCart, Package, CheckCircle2, Plus, Minus, Trash2, 
  Sparkles, DollarSign, X, ShieldCheck, ArrowRight, CreditCard
} from 'lucide-react';
import { Product, AffiliationPackage, CartItem } from '../types';

interface ShopAndCartViewProps {
  products: Product[];
  packages: AffiliationPackage[];
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onUpdateCartQuantity: (id: string, qty: number) => void;
  onClearCart: () => void;
  onConfirmCheckout?: (cart: CartItem[], totalBv: number, totalAmount: number) => void;
}

export const ShopAndCartView: React.FC<ShopAndCartViewProps> = ({
  products,
  packages,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onClearCart,
  onConfirmCheckout
}) => {
  const [filterType, setFilterType] = useState<'all' | 'packages' | 'products'>('all');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Cart totals
  const totalAmount = cart.reduce((acc, c) => acc + c.price * c.quantity, 0);
  const totalBv = cart.reduce((acc, c) => acc + c.bv * c.quantity, 0);
  const totalItemsCount = cart.reduce((acc, c) => acc + c.quantity, 0);

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirmCheckout) {
      onConfirmCheckout(cart, totalBv, totalAmount);
    }
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      setIsCheckoutModalOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner and Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Tienda Virtual Oficial & Paquetes de Membresía</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Precios con descuento exclusivo del 30% para miembros y puntos BV acreditables a tu red.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                filterType === 'all' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('packages')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                filterType === 'packages' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Paquetes ({packages.length})
            </button>
            <button
              onClick={() => setFilterType('products')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                filterType === 'products' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Fórmulas ({products.length})
            </button>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow flex items-center space-x-2 transition shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Carrito ({totalItemsCount})</span>
          </button>
        </div>
      </div>

      {/* Products & Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Packages Display */}
        {(filterType === 'all' || filterType === 'packages') &&
          packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-slate-900 border rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden transition-all ${
                pkg.featured ? 'border-amber-500/50 ring-1 ring-amber-500/30' : 'border-slate-800'
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Membresía Destacada
                </div>
              )}

              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Paquete de Afiliación
                </span>
                <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pkg.description}</p>
                
                <div className="flex items-baseline space-x-2 pt-1">
                  <span className="text-2xl font-black text-emerald-400">${pkg.price.toFixed(2)}</span>
                  <span className="text-xs text-cyan-300 font-mono font-bold">({pkg.bv} Puntos BV)</span>
                </div>
              </div>

              <button
                onClick={() => onAddToCart({ id: pkg.id, name: pkg.name, type: 'package', price: pkg.price, bv: pkg.bv, quantity: 1 })}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl text-xs uppercase shadow transition"
              >
                Añadir al Carrito
              </button>
            </div>
          ))}

        {/* Individual Products Display */}
        {(filterType === 'all' || filterType === 'products') &&
          products.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-cyan-400 font-bold bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                    {prod.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    prod.stock > 50 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    Stock: {prod.stock} u.
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">{prod.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{prod.subtitle}</p>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="text-xl font-black text-emerald-400">${prod.distributorPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-500 line-through ml-2">${prod.publicPrice.toFixed(2)}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">{prod.bv} BV</span>
                </div>
              </div>

              <button
                onClick={() => onAddToCart({ id: prod.id, name: prod.name, type: 'product', price: prod.distributorPrice, bv: prod.bv, quantity: 1 })}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-2xl text-xs transition shadow"
              >
                Añadir al Carrito
              </button>
            </div>
          ))}

      </div>

      {/* Cart & Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Resumen del Carrito & Pedido</h3>
                <p className="text-xs text-slate-400">Puntos BV y comisiones asignadas automáticamente</p>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                <p>Tu carrito de compras está vacío.</p>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* Items List */}
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block">{item.name}</span>
                        <span className="text-[10px] text-cyan-400 font-mono">
                          ${item.price.toFixed(2)} c/u • {item.bv} BV
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Totals */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Puntos BV Generados:</span>
                    <strong className="text-cyan-400 font-mono">{totalBv} BV</strong>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>Total a Pagar:</span>
                    <span className="text-emerald-400 text-lg">${totalAmount.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-200 space-y-1">
                  <strong>Instrucciones de Pago:</strong>
                  <p>
                    Transfiere a las cuentas oficiales de FORCEXCORP / AB Natural Networkers (BCP, BBVA o Interbank). Tu orden quedará pendiente y se activará inmediatamente tras confirmar la liquidación.
                  </p>
                </div>

                {checkoutComplete ? (
                  <div className="p-3 bg-emerald-500/20 text-emerald-300 text-center font-bold rounded-xl animate-in zoom-in">
                    ✓ ¡Pedido registrado con éxito! Código ORD-{Math.floor(1000 + Math.random() * 9000)} generado.
                  </div>
                ) : (
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutModalOpen(false)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                    >
                      Seguir Comprando
                    </button>
                    <button
                      type="button"
                      onClick={handleBuy}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow"
                    >
                      Confirmar Orden de Pedido
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
