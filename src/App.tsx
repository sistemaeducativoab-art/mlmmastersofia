'use client';

import React, { useState } from 'react';

export default function MultilevelMasterApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [codigoSocio, setCodigoSocio] = useState('AB-MASTER');
  const [nombreSocio, setNombreSocio] = useState('Ángel Manuel Breña Eulogio');
  
  // Carrito de compras funcional
  const [carrito, setCarrito] = useState([]);
  
  // Catálogo completo de 20 productos de nutrición celular y funcional
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Enercell + ION', precio: 120, stock: 45, puntos: 60 },
    { id: 2, nombre: 'Nopaloe RF03', precio: 95, stock: 30, puntos: 45 },
    { id: 3, nombre: 'Biomega 3', precio: 110, stock: 50, puntos: 55 },
    { id: 4, nombre: 'Moringa Hiperanthera', precio: 85, stock: 20, puntos: 40 },
    { id: 5, nombre: 'Colágeno Hidrolizado Quantum', precio: 140, stock: 15, puntos: 70 },
    { id: 6, nombre: 'Zeolita Activada Detox', precio: 90, stock: 25, puntos: 45 },
    { id: 7, nombre: 'Magnesio Treonato Celular', precio: 125, stock: 40, puntos: 60 },
    { id: 8, nombre: 'Probióticos Eje Gut-Brain', precio: 130, stock: 18, puntos: 65 },
    { id: 9, nombre: 'Immune C+ Zinc', precio: 75, stock: 60, puntos: 35 },
    { id: 10, nombre: 'Glutation Liposomal Puro', precio: 180, stock: 12, puntos: 90 },
    { id: 11, nombre: 'Omega Krill Oil', precio: 150, stock: 22, puntos: 75 },
    { id: 12, nombre: 'Spirulina Organica Max', precio: 65, stock: 55, puntos: 30 },
    { id: 13, nombre: 'Enzimas Digestivas Vivas', precio: 95, stock: 35, puntos: 48 },
    { id: 14, nombre: 'Te Verde Matcha Ceremonial', precio: 88, stock: 28, puntos: 42 },
    { id: 15, nombre: 'Calcio Coral Marino', precio: 105, stock: 30, puntos: 50 },
    { id: 16, nombre: 'Vitamina D3 + K2', precio: 80, stock: 50, puntos: 40 },
    { id: 17, nombre: 'Complejo B Sublingual', precio: 70, stock: 45, puntos: 35 },
    { id: 18, nombre: 'Ashwagandha KSM-66', precio: 115, stock: 25, puntos: 58 },
    { id: 19, nombre: 'Proteína Vegetal Humanómica', precio: 160, stock: 20, puntos: 80 },
    { id: 20, nombre: 'Kit Masterclass & Guías PDF', precio: 50, stock: 100, puntos: 25 }
  ]);

  // Edición de stock (Modo Master)
  const [prodEditando, setProdEditando] = useState(null);
  const [nuevoStock, setNuevoStock] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');

  // Estructura de comisiones de 7 niveles
  const [nivelesRed, setNivelesRed] = useState([
    { nivel: 1, porc: 10, socios: 14, ventas: 4200, comision: 420 },
    { nivel: 2, porc: 7, socios: 42, ventas: 12600, comision: 882 },
    { nivel: 3, porc: 5, socios: 128, ventas: 38400, comision: 1920 },
    { nivel: 4, porc: 4, socios: 310, ventas: 93000, comision: 3720 },
    { nivel: 5, porc: 3, socios: 750, ventas: 225000, comision: 6750 },
    { nivel: 6, porc: 2, socios: 1420, ventas: 426000, comision: 8520 },
    { nivel: 7, porc: 1, socios: 3100, ventas: 930000, comision: 9300 }
  ]);

  // Funciones del carrito
  const agregarAlCarrito = (prod) => {
    if (prod.stock <= 0) {
      alert("Producto sin stock disponible.");
      return;
    }
    const existe = carrito.find(item => item.id === prod.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === prod.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...prod, cantidad: 1 }]);
    }
    alert(`¡${prod.nombre} añadido a la tienda replicada (${codigoSocio})!`);
  };

  const procesarCompra = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    // Descontar stock local
    const nuevosProductos = productos.map(p => {
      const enCarrito = carrito.find(c => c.id === p.id);
      if (enCarrito) {
        return { ...p, stock: p.stock - enCarrito.cantidad };
      }
      return p;
    });
    setProductos(nuevosProductos);
    setCarrito([]);
    alert("¡Compra procesada con éxito a través de la pasarela! Puntos CV sumados al patrocinador: " + codigoSocio);
    setActiveTab('dashboard');
  };

  const guardarCambiosStock = (e) => {
    e.preventDefault();
    if (!prodEditando) return;
    setProductos(productos.map(p => p.id === prodEditando.id ? {
      ...p,
      stock: nuevoStock !== '' ? parseInt(nuevoStock) : p.stock,
      precio: nuevoPrecio !== '' ? parseFloat(nuevoPrecio) : p.precio
    } : p));
    alert("Inventario actualizado correctamente.");
    setProdEditando(null);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalPuntosCarrito = carrito.reduce((acc, item) => acc + (item.puntos * item.cantidad), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex justify-center">
      <div className="w-full max-w-7xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* ENCABEZADO */}
        <header className="bg-slate-950 border-b border-emerald-500/20 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Ecosistema AB • Red Multenivel Activa 👑
            </span>
            <h1 className="text-xl md:text-2xl font-black text-emerald-400 mt-1">
              SOFÍA HUMANÓMICA • BACK OFFICE MASTER
            </h1>
            <p className="text-xs text-slate-400">Usuario: <strong className="text-white">{nombreSocio}</strong> | Código Patrocinador: <span className="text-emerald-300">{codigoSocio}</span></p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-2 rounded-xl text-xs font-bold ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>📊 Dashboard</button>
            <button onClick={() => setActiveTab('backoffice')} className={`px-3 py-2 rounded-xl text-xs font-bold ${activeTab === 'backoffice' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>📱 Back Office</button>
            <button onClick={() => setActiveTab('tienda')} className={`px-3 py-2 rounded-xl text-xs font-bold relative ${activeTab === 'tienda' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
              🛒 Tienda Replicada {carrito.length > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">{carrito.reduce((a,b)=>a+b.cantidad,0)}</span>}
            </button>
            <button onClick={() => setActiveTab('niveles')} className={`px-3 py-2 rounded-xl text-xs font-bold ${activeTab === 'niveles' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>🌐 Red 7 Niveles</button>
            <button onClick={() => setActiveTab('inventario')} className={`px-3 py-2 rounded-xl text-xs font-bold ${activeTab === 'inventario' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>🧪 Stock 20 Productos ⚙️</button>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
        <div className="p-6 space-y-6 flex-1">

          {/* 1. DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">Total Red de Socios</span>
                  <h3 className="text-2xl font-black text-emerald-400">5,734</h3>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">Volumen Grupal (CV)</span>
                  <h3 className="text-2xl font-black text-cyan-400">1,659,200 Pts</h3>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">Comisiones del Mes</span>
                  <h3 className="text-2xl font-black text-amber-400">S/ 31,412.00</h3>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">Rango Calificado</span>
                  <h3 className="text-xl font-black text-purple-400">Diamante Ejecutivo</h3>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/20 space-y-3">
                <h3 className="font-bold text-emerald-300 text-sm">🔗 Tu Enlace de Tienda Replicada con Arrastre de Patrocinador</h3>
                <div className="flex flex-col md:flex-row gap-3">
                  <input 
                    type="text" 
                    readOnly 
                    value={`https://ecosistemaab.com/tienda/${codigoSocio.toLowerCase()}`} 
                    className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-emerald-400 font-mono w-full"
                  />
                  <button onClick={() => alert("Enlace copiado. Toda compra hecha aquí registrará tus comisiones.")} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-black px-6 py-2 rounded-xl uppercase">
                    Copiar Enlace
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. BACK OFFICE */}
          {activeTab === 'backoffice' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-emerald-300">📱 Back Office Personal y Control de Afiliados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400">Ventas Personales (Mes)</span>
                  <div className="text-2xl font-black text-white">S/ 4,850.00</div>
                  <p className="text-[11px] text-slate-400">Genera <strong>2,150 Puntos CV</strong></p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400">Bono de Inicio Rápido</span>
                  <div className="text-2xl font-black text-amber-400">S/ 1,250.00</div>
                  <p className="text-[11px] text-slate-400">Inscripciones de nuevos directos</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400">Red Directa Activa</span>
                  <div className="text-2xl font-black text-cyan-400">14 Directos</div>
                  <button onClick={() => setActiveTab('niveles')} className="w-full mt-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/30">
                    Ver Red de 7 Niveles &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. TIENDA REPLICADA Y CARRITO */}
          {activeTab === 'tienda' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-lg font-bold text-emerald-300">🛒 Tienda Replicada Oficial ({codigoSocio})</h2>
                  <p className="text-xs text-slate-400">Los pedidos realizados aquí calculan comisiones automáticas para la red.</p>
                </div>
                {carrito.length > 0 && (
                  <button onClick={() => setActiveTab('checkout')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase shadow">
                    Ver Carrito ({carrito.reduce((a,b)=>a+b.cantidad,0)} items) - S/ {totalCarrito.toFixed(2)}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {productos.map((prod) => (
                  <div key={prod.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-emerald-400 font-bold">ID: #{prod.id}</span>
                        <span className="text-slate-400">Stock: {prod.stock}</span>
                      </div>
                      <h3 className="font-bold text-sm text-white">{prod.nombre}</h3>
                      <div className="text-lg font-black text-emerald-400">S/ {prod.precio.toFixed(2)}</div>
                      <span className="text-[10px] bg-slate-900 text-cyan-300 px-2 py-0.5 rounded">Otorga {prod.puntos} Pts CV</span>
                    </div>
                    <button 
                      onClick={() => agregarAlCarrito(prod)} 
                      className={`w-full py-2 rounded-xl text-xs font-black uppercase transition-all ${prod.stock > 0 ? 'bg-emerald-600 hover:bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                      {prod.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHECKOUT / PASARELA DE PAGO */}
          {activeTab === 'checkout' && (
            <div className="max-w-2xl mx-auto bg-slate-950 border border-emerald-500/40 p-6 rounded-3xl space-y-6">
              <h2 className="text-lg font-bold text-emerald-300">🛍️ Resumen de Pedido y Pasarela de Pago</h2>
              
              <div className="space-y-3 divide-y divide-slate-800">
                {carrito.map((item) => (
                  <div key={item.id} className="pt-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-white">{item.nombre}</p>
                      <p className="text-slate-400">Cantidad: {item.cantidad} | Puntos CV: {item.puntos * item.cantidad}</p>
                    </div>
                    <span className="font-black text-emerald-400">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Total Puntos CV Generados:</span>
                  <strong className="text-cyan-400">{totalPuntosCarrito} Pts</strong>
                </div>
                <div className="flex justify-between text-base font-black text-white">
                  <span>Total a Pagar:</span>
                  <span className="text-emerald-400">S/ {totalCarrito.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={procesarCompra} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase shadow">
                  💳 Confirmar Pago y Liquidar Pedido
                </button>
                <button onClick={() => setActiveTab('tienda')} className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs">
                  Seguir Comprando
                </button>
              </div>
            </div>
          )}

          {/* 4. RED 7 NIVELES */}
          {activeTab === 'niveles' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-emerald-300">🌐 Comisiones por Niveles (1.° al 7.° Nivel)</h2>
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-emerald-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nivel</th>
                      <th className="p-3">% Comisión</th>
                      <th className="p-3">Socios Activos</th>
                      <th className="p-3">Ventas Red</th>
                      <th className="p-3">Comisión Generada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {nivelesRed.map((n) => (
                      <tr key={n.nivel} className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-emerald-300">Nivel {n.nivel}</td>
                        <td className="p-3 text-cyan-400 font-bold">{n.porc}%</td>
                        <td className="p-3 text-slate-200">{n.socios} socios</td>
                        <td className="p-3 text-slate-200">S/ {n.ventas.toLocaleString()}</td>
                        <td className="p-3 font-bold text-emerald-400">S/ {n.comision.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. CONTROL DE STOCK Y 20 PRODUCTOS (MODO MASTER) */}
          {activeTab === 'inventario' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <h2 className="text-lg font-bold text-emerald-300">🧪 Control de Inventario y 20 Productos</h2>
                <span className="text-xs text-amber-400">👑 Modo Master: Haz clic en cualquier producto para editar stock o precio.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {productos.map((prod) => (
                  <div 
                    key={prod.id} 
                    onClick={() => { setProdEditando(prod); setNuevoStock(prod.stock); setNuevoPrecio(prod.precio); }}
                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer space-y-2 transition-all shadow"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-0.5 rounded font-bold">ID: #{prod.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${prod.stock > 10 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>Stock: {prod.stock}</span>
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm">{prod.nombre}</h3>
                    <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-900">
                      <span className="text-emerald-400 font-black">S/ {prod.precio.toFixed(2)}</span>
                      <span className="text-slate-400">{prod.puntos} Pts CV</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODAL EDITAR */}
              {prodEditando && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-900 border border-emerald-500/50 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
                    <h3 className="text-lg font-bold text-emerald-400">⚙️ Modificar Stock / Precio</h3>
                    <p className="text-xs text-slate-300">Producto: <strong>{prodEditando.nombre}</strong></p>
                    
                    <form onSubmit={guardarCambiosStock} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400">Nuevo Stock:</label>
                        <input type="number" value={nuevoStock} onChange={(e)=>setNuevoStock(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-400">Nuevo Precio (S/):</label>
                        <input type="number" step="0.01" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs"/>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl text-xs uppercase shadow">Guardar Cambios</button>
                        <button type="button" onClick={()=>setProdEditando(null)} className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs">Cancelar</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
