import React, { useState, useRef } from 'react';
import { 
  Gem, Users, ShoppingCart, Sliders, FileText, CheckCircle2, 
  Printer, ArrowUpRight, TrendingUp, Wallet, Award, Bot, Plus, X, 
  Eye, ExternalLink, Sparkles, Shield, UserPlus, GitBranch, Scale, 
  Lock, Package, AlertTriangle, RotateCcw, ChevronRight, Key, 
  DollarSign, FileCheck, BookOpen, Download, Upload, ShieldCheck, 
  LogOut, Check, Smartphone, Flame, BarChart3, HelpCircle, Layers,
  Menu
} from 'lucide-react';
import { 
  UserRole, ActiveTab, Product, AffiliationPackage, Affiliate, 
  CareerRank, MonthlyEarning, AuditLog, CartItem, LotRecord, 
  SponsorCode, PaymentRecord 
} from './types';
import { 
  initialProducts, initialAffiliationPackages, initialAffiliates, 
  initialCareerRanks, initialMonthlyEarnings, initialAuditLogs,
  initialLots, initialSponsorCodes, initialPaymentRecords
} from './data/mockData';
import { SofiaChat } from './components/SofiaChat';
import { FounderModal } from './components/FounderModal';
import { NetworkTreeView } from './components/NetworkTreeView';
import { AffiliateBackOfficeView } from './components/AffiliateBackOfficeView';
import { PackagesAdminView } from './components/PackagesAdminView';
import { CompensationPlanView } from './components/CompensationPlanView';
import { ShopAndCartView } from './components/ShopAndCartView';
import { ReportsAndAuditView } from './components/ReportsAndAuditView';
import { ComplianceView } from './components/ComplianceView';
import { CodeGeneratorView } from './components/CodeGeneratorView';
import { InventoryView } from './components/InventoryView';
import { RoyaltyPlanView } from './components/RoyaltyPlanView';
import { PaymentsAuditView } from './components/PaymentsAuditView';
import { HumanomicaEcosystemView } from './components/HumanomicaEcosystemView';
import { DashboardView } from './components/DashboardView';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Navigation & Role states
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // App-level state for real-time reactivity
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [packages, setPackages] = useState<AffiliationPackage[]>(initialAffiliationPackages);
  const [affiliates, setAffiliates] = useState<Affiliate[]>(initialAffiliates);
  const [ranks, setRanks] = useState<CareerRank[]>(initialCareerRanks);
  const [earnings, setEarnings] = useState<MonthlyEarning[]>(initialMonthlyEarnings);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lots, setLots] = useState<LotRecord[]>(initialLots);
  const [sponsorCodes, setSponsorCodes] = useState<SponsorCode[]>(initialSponsorCodes);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPaymentRecords);

  // Modals state
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [isNewAffiliateModalOpen, setIsNewAffiliateModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Backup file input ref
  const backupInputRef = useRef<HTMLInputElement>(null);

  // New affiliate form
  const [newAffName, setNewAffName] = useState('');
  const [newAffEmail, setNewAffEmail] = useState('');
  const [newAffPhone, setNewAffPhone] = useState('+51 ');
  const [newAffCountry, setNewAffCountry] = useState('Perú');
  const [newAffCity, setNewAffCity] = useState('Lima');
  const [newAffPackageId, setNewAffPackageId] = useState(packages[0]?.id || '');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add audit log helper with IP and timestamp
  const addAuditLog = (action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: currentRole === 'admin' ? 'usr-admin-01' : currentRole === 'afiliado' ? 'usr-diamond-01' : 'usr-oper-02',
      userName: currentRole === 'admin' ? 'Ángel Manuel Breña (Admin)' : currentRole === 'afiliado' ? 'Ángel Breña (Socio)' : 'Operador de Sistema',
      action,
      module,
      details,
      ipAddress: '190.237.112.45',
      severity: 'info'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Role permissions tab map
  const roleAllowedTabs: Record<UserRole, ActiveTab[]> = {
    admin: [
      'dashboard', 'oficina', 'afiliados', 'arbol', 'tienda', 'paquetes_admin', 
      'inventario', 'codigos', 'plan', 'regalias', 'cierre', 'pagos', 
      'reportes', 'terminos', 'ecosistema', 'sofia'
    ],
    gerente: [
      'dashboard', 'afiliados', 'arbol', 'tienda', 'inventario', 
      'codigos', 'plan', 'reportes', 'terminos', 'ecosistema', 'sofia'
    ],
    afiliado: [
      'oficina', 'arbol', 'tienda', 'codigos', 'regalias', 'plan', 
      'reportes', 'terminos', 'ecosistema', 'sofia'
    ],
    cliente: [
      'tienda', 'terminos', 'ecosistema', 'sofia'
    ],
    pagos: [
      'pagos', 'cierre', 'reportes', 'terminos', 'sofia'
    ],
    auditor: [
      'reportes', 'afiliados', 'arbol', 'plan', 'terminos', 'ecosistema', 'sofia'
    ]
  };

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    const allowed = roleAllowedTabs[newRole];
    if (!allowed.includes(activeTab)) {
      setActiveTab(allowed[0]);
    }
    addAuditLog('Cambio de Rol de Usuario', 'Seguridad', `Sesión conmutada al rol ${newRole.toUpperCase()}.`);
    showToast(`Modo cambiado a: ${newRole.toUpperCase()}`);
  };

  // Handle new affiliate register
  const handleRegisterAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffName.trim()) return;

    const pkg = packages.find(p => p.id === newAffPackageId) || packages[0];
    const randCode = `AB-MEMBER-${Math.floor(100 + Math.random() * 900)}`;

    const newRecord: Affiliate = {
      id: `aff-${Date.now()}`,
      code: randCode,
      name: newAffName,
      email: newAffEmail || `${newAffName.toLowerCase().replace(/\s+/g, '.')}@networkers.com`,
      phone: newAffPhone,
      country: newAffCountry,
      city: newAffCity,
      joinDate: new Date().toISOString().split('T')[0],
      sponsorName: 'Ángel Breña',
      sponsorCode: 'AB-DIAMOND-001',
      level: 1,
      personalBv: pkg ? pkg.bv : 100,
      groupBv: pkg ? pkg.bv : 100,
      rank: pkg ? pkg.initialRank : 'Bronce',
      rankColor: '#cd7f32',
      status: 'active',
      affiliateType: 'socio',
      directReferralsCount: 0,
      activeLegsCount: 0,
      totalTeamCount: 1,
      membershipExpiryDate: '2027-09-30',
      membershipStatus: 'vigente'
    };

    setAffiliates(prev => [newRecord, ...prev]);
    addAuditLog('Registro de Afiliado', 'Afiliados', `Socio ${newAffName} registrado con código ${randCode} y paquete ${pkg?.name || 'Básico'}.`);
    showToast(`¡Socio ${newAffName} registrado exitosamente con código ${randCode}!`);
    setIsNewAffiliateModalOpen(false);
    setNewAffName('');
    setNewAffEmail('');
  };

  // Package admin handlers
  const handleAddPackage = (newPkg: AffiliationPackage) => {
    setPackages(prev => [newPkg, ...prev]);
    addAuditLog('Creación de Paquete', 'Paquetes', `Nuevo paquete ${newPkg.name} (${newPkg.code}) creado con ${newPkg.bv} BV.`);
    showToast(`Paquete ${newPkg.name} creado.`);
  };

  const handleUpdatePackage = (updatedPkg: AffiliationPackage) => {
    setPackages(prev => prev.map(p => p.id === updatedPkg.id ? updatedPkg : p));
    addAuditLog('Actualización de Paquete', 'Paquetes', `Paquete ${updatedPkg.name} actualizado.`);
    showToast(`Paquete ${updatedPkg.name} actualizado.`);
  };

  const handleDeletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
    addAuditLog('Eliminación de Paquete', 'Paquetes', `Paquete ID ${id} eliminado.`);
    showToast('Paquete eliminado del sistema.');
  };

  // Cart & Checkout handlers (with stock decrement and single-attribution BV points)
  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    showToast(`¡${item.name} añadido al carrito!`);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.id !== id));
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleConfirmCheckout = (items: CartItem[], totalBv: number, totalAmount: number) => {
    // 1. Descontar stock de productos reales
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const inCart = items.find(ci => ci.id === p.id && ci.type === 'product');
        if (inCart) {
          const newStock = Math.max(0, p.stock - inCart.quantity);
          const newStatus = newStock <= 0 ? 'critical' : newStock <= p.minThreshold ? 'low' : 'optimal';
          return { ...p, stock: newStock, status: newStatus };
        }
        return p;
      });
    });

    // 2. Acreditar puntos BV una sola vez al usuario activo (Ángel Breña) y actualizar vigencia si compró membresía
    setAffiliates(prevAffs => {
      return prevAffs.map((a, idx) => {
        if (idx === 0) {
          const hasPackage = items.some(ci => ci.type === 'package');
          return {
            ...a,
            personalBv: a.personalBv + totalBv,
            groupBv: a.groupBv + totalBv,
            membershipStatus: hasPackage ? 'vigente' : a.membershipStatus,
            membershipExpiryDate: hasPackage ? '2027-09-30' : a.membershipExpiryDate
          };
        }
        return a;
      });
    });

    addAuditLog(
      'Orden de Compra Confirmada',
      'Tienda & Inventario',
      `Orden de ${items.length} ítems confirmada por $${totalAmount.toFixed(2)} USD. Se acreditaron ${totalBv} BV y se actualizó el stock.`
    );
    showToast(`¡Orden confirmada! Se acreditaron ${totalBv} BV y se actualizó el inventario.`);
  };

  // Inventory handlers
  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStatus = newStock <= 0 ? 'critical' : newStock <= p.minThreshold ? 'low' : 'optimal';
        return { ...p, stock: newStock, status: newStatus };
      }
      return p;
    }));
    addAuditLog('Ajuste de Stock Manual', 'Inventario', `Stock de producto ${productId} ajustado a ${newStock} unidades.`);
    showToast('Stock de producto actualizado.');
  };

  const handleAddLot = (newLot: LotRecord) => {
    setLots(prev => [newLot, ...prev]);
    // Also increase product stock by lot units
    setProducts(prev => prev.map(p => {
      if (p.id === newLot.productId) {
        const newStock = p.stock + newLot.units;
        const newStatus = newStock <= p.minThreshold ? 'low' : 'optimal';
        return { ...p, stock: newStock, status: newStatus, lotCode: newLot.lotCode };
      }
      return p;
    }));
    addAuditLog('Ingreso de Nuevo Lote', 'Inventario & Lotes', `Lote ${newLot.lotCode} de ${newLot.units} uds. ingresado para ${newLot.productName}.`);
    showToast(`Lote ${newLot.lotCode} registrado (+${newLot.units} unidades).`);
  };

  // Sponsor code generator handler
  const handleAddCode = (newCode: SponsorCode) => {
    setSponsorCodes(prev => [newCode, ...prev]);
    addAuditLog('Generación de Código de Patrocinio', 'Códigos', `Código ${newCode.code} generado para prospecto ${newCode.prospectName}.`);
    showToast(`Código de patrocinio ${newCode.code} registrado.`);
  };

  // Payments & Disbursements handlers
  const handleApprovePayment = (paymentId: string) => {
    setPayments(prev => prev.map(p => {
      if (p.id === paymentId) {
        return {
          ...p,
          status: 'Pagado',
          paymentDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
      }
      return p;
    }));
    addAuditLog('Aprobación de Pago Individual', 'Pagos', `Vale de liquidación ID ${paymentId} marcado como pagado.`);
    showToast('Pago aprobado y registrado con fecha de liquidación.');
  };

  const handleDisburseAllPending = () => {
    const pendingCount = payments.filter(p => p.status === 'Pendiente').length;
    setPayments(prev => prev.map(p => ({
      ...p,
      status: 'Pagado',
      paymentDate: p.paymentDate || new Date().toISOString().replace('T', ' ').substring(0, 16)
    })));
    addAuditLog('Dispersión Masiva de Comisiones', 'Pagos', `Dispersión de ${pendingCount} transferencias bancarias completada.`);
    showToast(`¡Dispersión completada! Se liquidaron ${pendingCount} vales bancarios.`);
  };

  // Monthly close execution
  const handleExecuteClose = () => {
    addAuditLog('Cierre Mensual Ejecutado', 'Finanzas', 'Cierre oficial y bloqueo del periodo Septiembre/Octubre 2026.');
    setIsCloseModalOpen(false);
    showToast('¡Cierre mensual ejecutado con éxito! Estados de cuenta y comisiones bloqueados para auditoría.');
  };

  // Backup JSON Export & Import
  const handleExportBackup = () => {
    const backupData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      system: 'Multinivel Diamante AB · Ángel Breña',
      company: 'AB Natural Networkers',
      data: {
        products,
        packages,
        affiliates,
        ranks,
        earnings,
        lots,
        sponsorCodes,
        payments,
        auditLogs
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_multinivel_diamante_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    addAuditLog('Exportación de Base de Datos', 'Copias de Seguridad', 'Descarga de respaldo JSON completo del sistema.');
    showToast('¡Copia de seguridad JSON exportada correctamente!');
  };

  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.data) {
          if (parsed.data.products) setProducts(parsed.data.products);
          if (parsed.data.packages) setPackages(parsed.data.packages);
          if (parsed.data.affiliates) setAffiliates(parsed.data.affiliates);
          if (parsed.data.ranks) setRanks(parsed.data.ranks);
          if (parsed.data.earnings) setEarnings(parsed.data.earnings);
          if (parsed.data.lots) setLots(parsed.data.lots);
          if (parsed.data.sponsorCodes) setSponsorCodes(parsed.data.sponsorCodes);
          if (parsed.data.payments) setPayments(parsed.data.payments);
          if (parsed.data.auditLogs) setAuditLogs(parsed.data.auditLogs);

          addAuditLog('Restauración de Base de Datos', 'Copias de Seguridad', `Restauración exitosa de backup del ${parsed.exportDate || 'archivo'}.`);
          showToast('¡Copia de seguridad restaurada exitosamente!');
        }
      } catch (err) {
        showToast('Error al restaurar: archivo JSON no válido.');
      }
    };
    reader.readAsText(file);
    if (backupInputRef.current) backupInputRef.current.value = '';
  };

  const allowedTabs = roleAllowedTabs[currentRole];

  // Navigation Items Catalog
  const navItems = [
    { id: 'sofia' as ActiveTab, label: 'Sofía Humanómica (IA)', icon: Bot, badge: 'Elite', color: 'text-emerald-400' },
    { id: 'dashboard' as ActiveTab, label: 'Panel Administrador', icon: TrendingUp, color: 'text-cyan-400' },
    { id: 'oficina' as ActiveTab, label: 'Oficina Virtual (Socio)', icon: Award, color: 'text-amber-400' },
    { id: 'afiliados' as ActiveTab, label: `Padrón de Afiliados (${affiliates.length})`, icon: Users, color: 'text-sky-400' },
    { id: 'arbol' as ActiveTab, label: 'Árbol de Red', icon: GitBranch, color: 'text-cyan-400' },
    { id: 'tienda' as ActiveTab, label: `Tienda Virtual ${cart.length > 0 ? `(${cart.length})` : ''}`, icon: ShoppingCart, color: 'text-emerald-400' },
    { id: 'paquetes_admin' as ActiveTab, label: 'Configurar Paquetes', icon: Package, color: 'text-purple-400' },
    { id: 'inventario' as ActiveTab, label: 'Inventario & Lotes', icon: Layers, color: 'text-teal-400' },
    { id: 'codigos' as ActiveTab, label: 'Enlaces & Códigos QR', icon: Key, color: 'text-amber-400' },
    { id: 'plan' as ActiveTab, label: 'Plan & Rangos', icon: Sliders, color: 'text-cyan-400' },
    { id: 'regalias' as ActiveTab, label: 'Regalías & Bonos', icon: DollarSign, color: 'text-emerald-400' },
    { id: 'cierre' as ActiveTab, label: 'Cierre Mensual', icon: FileText, color: 'text-amber-400' },
    { id: 'pagos' as ActiveTab, label: 'Auditoría de Pagos', icon: FileCheck, color: 'text-emerald-400' },
    { id: 'reportes' as ActiveTab, label: 'Reportes PDF & Auditoría', icon: Printer, color: 'text-blue-400' },
    { id: 'ecosistema' as ActiveTab, label: 'Ecosistema & Fundador', icon: BookOpen, color: 'text-cyan-400' },
    { id: 'terminos' as ActiveTab, label: 'Legal & Ética', icon: Scale, color: 'text-slate-400' },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Hidden File Input for Backup Restore */}
      <input
        type="file"
        ref={backupInputRef}
        onChange={handleImportBackup}
        accept=".json"
        className="hidden"
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 text-xs font-bold animate-in fade-in slide-in-from-bottom flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Demo Mode Notice Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-amber-950 border-b border-cyan-800/40 px-4 py-1.5 text-[11px] text-cyan-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.2 rounded-full border border-amber-500/40 uppercase text-[9px]">
              Modo Demostración Activo
            </span>
            <span className="hidden sm:inline">
              Datos simulados de ejemplo para auditoría y evaluación del plan de compensación.
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportBackup}
              className="text-cyan-300 hover:text-white flex items-center gap-1 font-semibold underline text-[10px]"
              title="Descargar copia de seguridad JSON"
            >
              <Download className="w-3 h-3" /> Backup JSON
            </button>
            <button
              onClick={() => backupInputRef.current?.click()}
              className="text-amber-300 hover:text-white flex items-center gap-1 font-semibold underline text-[10px]"
              title="Restaurar base de datos desde JSON"
            >
              <Upload className="w-3 h-3" /> Restaurar
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className="text-slate-400 hover:text-white text-[10px]"
              title="Ocultar aviso de demostración"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header / Navbar Superior */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-3">
          
          {/* Mobile Menu Button & Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              title="Menú desplegable móvil"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-emerald-500 to-amber-400 p-0.5 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                  <Gem className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-extrabold text-base sm:text-lg text-white leading-tight">Multinivel Diamante AB</h1>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-500/30">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-amber-400 font-medium hidden sm:block">AB Natural Networkers · Dirigido por Ángel Breña</p>
              </div>
            </div>
          </div>

          {/* Role Switcher & Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Role Switcher Selector */}
            <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-2xl border border-slate-800 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 hidden sm:inline">Rol:</span>
              <select
                value={currentRole}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-xs font-bold text-amber-400 focus:outline-none cursor-pointer max-w-[150px] sm:max-w-none"
              >
                <option value="admin" className="bg-slate-900 text-white">👑 1. Administrador Maestro</option>
                <option value="gerente" className="bg-slate-900 text-white">💼 2. Gerente / Supervisor</option>
                <option value="afiliado" className="bg-slate-900 text-white">💎 3. Afiliado Diamante (Ángel Breña)</option>
                <option value="cliente" className="bg-slate-900 text-white">🛒 4. Cliente Preferencial</option>
                <option value="pagos" className="bg-slate-900 text-white">💳 5. Operador de Pagos</option>
                <option value="auditor" className="bg-slate-900 text-white">🔍 6. Auditor de Seguridad</option>
              </select>
            </div>

            {/* Security & Auth Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold shadow-sm shrink-0"
              title="Centro de Seguridad & Inicio de Sesión / 2FA"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Seguridad & Cuenta</span>
            </button>

            {/* Founder Profile Button */}
            <button 
              onClick={() => setIsFounderModalOpen(true)}
              className="group flex items-center space-x-2 bg-gradient-to-r from-slate-800 to-slate-800/80 hover:from-slate-700 hover:to-slate-800 border border-slate-700 px-3 py-1.5 rounded-2xl transition shadow-sm shrink-0"
              title="Ver Perfil y Respaldo Científico de Ángel Manuel Breña"
            >
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[9px] font-medium text-emerald-400 flex items-center justify-end gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" /> Analista Químico
                </span>
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Ángel Manuel Breña
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center font-black text-white text-xs shadow-md">
                ÁB
              </div>
            </button>

          </div>
        </div>

        {/* Global Horizontal Quick-Bar (Complementary top navigation) */}
        <nav className="max-w-7xl mx-auto px-4 flex overflow-x-auto space-x-1.5 pb-2 pt-1 scrollbar-none text-xs border-t border-slate-800/60">
          {navItems.filter(item => allowedTabs.includes(item.id)).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1.5 shrink-0 ${
                activeTab === item.id 
                  ? item.id === 'sofia' 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow ring-1 ring-emerald-400/40' 
                    : item.id === 'oficina'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-1 px-1 py-0.2 bg-white/20 text-white text-[9px] rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Mobile Drawer (Desplegable Móvil) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md md:hidden flex flex-col animate-in fade-in">
          <div className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Gem className="w-5 h-5 text-amber-400" />
              <span className="font-extrabold text-white text-base">Menú del Sistema</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-2 flex-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 px-2 py-1">Módulos Disponibles para {currentRole.toUpperCase()}</div>
            {navItems.filter(item => allowedTabs.includes(item.id)).map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full p-3.5 rounded-2xl font-bold text-left flex items-center justify-between transition ${
                  activeTab === item.id 
                    ? 'bg-cyan-600 text-white shadow-lg' 
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : item.color}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/40">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                )}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-900 text-center">
            <span className="text-xs text-slate-400">Multinivel Diamante AB · Ángel Breña</span>
          </div>
        </div>
      )}

      {/* Main Layout Container with Desktop Sidebar & Main Area */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        
        {/* Desktop Sidebar (Menú Lateral en Escritorio) */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-slate-900/90 border-r border-slate-800 p-4 space-y-4 sticky top-[108px] h-[calc(100vh-108px)] overflow-y-auto scrollbar-none">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider px-2">
            Módulos del Sistema
          </div>

          <div className="space-y-1">
            {navItems.filter(item => allowedTabs.includes(item.id)).map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-2xl font-semibold text-xs text-left flex items-center justify-between transition ${
                  activeTab === item.id 
                    ? item.id === 'oficina'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : item.id === 'sofia'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow ring-1 ring-emerald-400/40'
                      : 'bg-cyan-600 text-white font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <item.icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? (item.id === 'oficina' ? 'text-slate-950' : 'text-white') : item.color}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.2 bg-white/20 text-white text-[9px] rounded-full shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Legal & Ethics note in Sidebar */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2 mt-auto">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-amber-400 font-bold block">★ Ética & Cumplimiento</span>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                Comisiones sujetas a ventas reales de producto e inventario.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && allowedTabs.includes('dashboard') && (
            <div className="animate-in fade-in duration-200">
              <DashboardView
                affiliates={affiliates}
                products={products}
                onNavigateToTab={(tab) => setActiveTab(tab)}
                onSelectAffiliate={(aff) => setSelectedAffiliate(aff)}
              />
            </div>
          )}

          {/* TAB 2: PADRÓN DE AFILIADOS */}
          {activeTab === 'afiliados' && allowedTabs.includes('afiliados') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Directorio y Padrón de Afiliados (AB Natural Networkers)</h3>
                    <p className="text-xs text-slate-400">
                      Administra socios, rangos, puntos personales, grupales y enlaces de patrocinio sin ciclos de red.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsNewAffiliateModalOpen(true)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow transition flex items-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Registrar Nuevo Afiliado</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800/60 text-slate-300 uppercase text-xs">
                      <tr>
                        <th className="p-3.5 rounded-l-2xl">Código / Socio</th>
                        <th className="p-3.5">Rango Actual</th>
                        <th className="p-3.5">Puntos (Pers. / Grup.)</th>
                        <th className="p-3.5">Patrocinador</th>
                        <th className="p-3.5">País</th>
                        <th className="p-3.5">Membresía</th>
                        <th className="p-3.5">Estado</th>
                        <th className="p-3.5 rounded-r-2xl text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-xs">
                      {affiliates.map((aff) => (
                        <tr key={aff.id} className="hover:bg-slate-800/50 transition">
                          <td className="p-3.5">
                            <div className="font-bold text-white text-sm">{aff.name}</div>
                            <div className="text-xs text-cyan-400 font-mono">{aff.code}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              ★ {aff.rank}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-300">
                            <span className="font-bold text-white">{aff.personalBv} BV</span> / {aff.groupBv.toLocaleString()} BV
                          </td>
                          <td className="p-3.5 text-slate-400">{aff.sponsorName}</td>
                          <td className="p-3.5 text-slate-300">{aff.country}</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              aff.membershipStatus === 'vigente' 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {aff.membershipStatus.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">
                              ● {aff.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button 
                              onClick={() => setSelectedAffiliate(aff)} 
                              className="text-cyan-400 hover:underline text-xs font-semibold"
                            >
                              Ver Ficha 360°
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ÁRBOL DE RED */}
          {activeTab === 'arbol' && allowedTabs.includes('arbol') && (
            <div className="animate-in fade-in duration-200">
              <NetworkTreeView 
                affiliates={affiliates} 
                onSelectAffiliate={(aff) => setSelectedAffiliate(aff)}
              />
            </div>
          )}

          {/* TAB 4: OFICINA VIRTUAL */}
          {activeTab === 'oficina' && allowedTabs.includes('oficina') && (
            <div className="animate-in fade-in duration-200">
              <AffiliateBackOfficeView earnings={earnings} />
            </div>
          )}

          {/* TAB 5: TIENDA & CARRITO */}
          {activeTab === 'tienda' && allowedTabs.includes('tienda') && (
            <div className="animate-in fade-in duration-200">
              <ShopAndCartView
                products={products}
                packages={packages}
                cart={cart}
                onAddToCart={handleAddToCart}
                onUpdateCartQuantity={handleUpdateCartQty}
                onClearCart={handleClearCart}
                onConfirmCheckout={handleConfirmCheckout}
              />
            </div>
          )}

          {/* TAB 6: CONFIGURAR PAQUETES (ADMIN) */}
          {activeTab === 'paquetes_admin' && allowedTabs.includes('paquetes_admin') && (
            <div className="animate-in fade-in duration-200">
              <PackagesAdminView
                packages={packages}
                products={products}
                onAddPackage={handleAddPackage}
                onUpdatePackage={handleUpdatePackage}
                onDeletePackage={handleDeletePackage}
              />
            </div>
          )}

          {/* TAB 7: INVENTARIO & LOTES */}
          {activeTab === 'inventario' && allowedTabs.includes('inventario') && (
            <div className="animate-in fade-in duration-200">
              <InventoryView
                products={products}
                lots={lots}
                onUpdateProductStock={handleUpdateProductStock}
                onAddLot={handleAddLot}
              />
            </div>
          )}

          {/* TAB 8: GENERADOR DE CÓDIGOS & ENLACES DE PATROCINIO */}
          {activeTab === 'codigos' && allowedTabs.includes('codigos') && (
            <div className="animate-in fade-in duration-200">
              <CodeGeneratorView
                codes={sponsorCodes}
                onAddCode={handleAddCode}
                affiliates={affiliates}
              />
            </div>
          )}

          {/* TAB 9: PLAN & RANGOS */}
          {activeTab === 'plan' && allowedTabs.includes('plan') && (
            <div className="animate-in fade-in duration-200">
              <CompensationPlanView ranks={ranks} />
            </div>
          )}

          {/* TAB 10: REGALÍAS & BONOS */}
          {activeTab === 'regalias' && allowedTabs.includes('regalias') && (
            <div className="animate-in fade-in duration-200">
              <RoyaltyPlanView />
            </div>
          )}

          {/* TAB 11: CIERRE MENSUAL */}
          {activeTab === 'cierre' && allowedTabs.includes('cierre') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Módulo de Cierre Mensual & Procesamiento por Lotes</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Cálculo automatizado de liquidación, regalías uninivel hasta 30 niveles con compresión y emisión de vales inmutables.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCloseModalOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-2xl text-xs shadow transition shrink-0 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ejecutar Simulación de Cierre</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Periodo a Liquidar</span>
                    <span className="text-base font-bold text-white">Septiembre / Octubre 2026</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Puntos Grupales Auditados</span>
                    <span className="text-base font-bold text-cyan-400">124,500 BV</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Comisiones Estimadas</span>
                    <span className="text-base font-bold text-emerald-400">$14,850.00 USD</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 text-xs text-slate-300">
                  <p>
                    <strong>Regla de Cierre Inmutable:</strong> Una vez confirmado el cierre mensual por el Administrador Maestro, el periodo queda bloqueado en la base de datos para garantizar la transparencia legal y evitar modificaciones posteriores.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: AUDITORÍA DE PAGOS */}
          {activeTab === 'pagos' && allowedTabs.includes('pagos') && (
            <div className="animate-in fade-in duration-200">
              <PaymentsAuditView
                payments={payments}
                onApprovePayment={handleApprovePayment}
                onDisburseAllPending={handleDisburseAllPending}
              />
            </div>
          )}

          {/* TAB 13: REPORTES & AUDITORÍA */}
          {activeTab === 'reportes' && allowedTabs.includes('reportes') && (
            <div className="animate-in fade-in duration-200">
              <ReportsAndAuditView
                logs={auditLogs}
                affiliates={affiliates}
                earnings={earnings}
              />
            </div>
          )}

          {/* TAB 14: ECOSISTEMA & FUNDADOR */}
          {activeTab === 'ecosistema' && allowedTabs.includes('ecosistema') && (
            <div className="animate-in fade-in duration-200">
              <HumanomicaEcosystemView />
            </div>
          )}

          {/* TAB 15: LEGAL & ÉTICA */}
          {activeTab === 'terminos' && allowedTabs.includes('terminos') && (
            <div className="animate-in fade-in duration-200">
              <ComplianceView />
            </div>
          )}

          {/* TAB 16: SOFÍA HUMANÓMICA IA */}
          {activeTab === 'sofia' && allowedTabs.includes('sofia') && (
            <div className="animate-in fade-in duration-200">
              <SofiaChat />
            </div>
          )}

        </main>
      </div>

      {/* Modal: Ficha 360° de Socio */}
      {selectedAffiliate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Ficha 360° del Socio Independiente</h3>
              <button onClick={() => setSelectedAffiliate(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Nombre Completo:</span>
                <span className="font-bold text-white">{selectedAffiliate.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Código de Red:</span>
                <span className="font-mono text-cyan-400 font-bold">{selectedAffiliate.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rango:</span>
                <span className="font-bold text-amber-400">★ {selectedAffiliate.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Puntos Personales:</span>
                <span className="font-semibold text-white">{selectedAffiliate.personalBv} BV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Puntos Grupales:</span>
                <span className="font-semibold text-emerald-400">{selectedAffiliate.groupBv.toLocaleString()} BV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Patrocinador Directo:</span>
                <span className="text-slate-300">{selectedAffiliate.sponsorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ubicación:</span>
                <span className="text-slate-300">{selectedAffiliate.city}, {selectedAffiliate.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estado de Membresía:</span>
                <span className="text-emerald-400 font-bold">● {selectedAffiliate.membershipStatus.toUpperCase()} (Vence {selectedAffiliate.membershipExpiryDate})</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setSelectedAffiliate(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Registrar Nuevo Afiliado */}
      {isNewAffiliateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Registrar Nuevo Afiliado en la Red</h3>
              <button onClick={() => setIsNewAffiliateModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterAffiliate} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Nombre Completo del Socio</label>
                <input 
                  type="text"
                  value={newAffName}
                  onChange={(e) => setNewAffName(e.target.value)}
                  placeholder="Ej. Rosaura Gómez Silva"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Correo Electrónico</label>
                  <input 
                    type="email"
                    value={newAffEmail}
                    onChange={(e) => setNewAffEmail(e.target.value)}
                    placeholder="socio@email.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Teléfono / WhatsApp</label>
                  <input 
                    type="text"
                    value={newAffPhone}
                    onChange={(e) => setNewAffPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">País</label>
                  <select 
                    value={newAffCountry} 
                    onChange={(e) => setNewAffCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Perú">Perú</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="EE.UU.">EE.UU.</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Ciudad</label>
                  <input 
                    type="text"
                    value={newAffCity}
                    onChange={(e) => setNewAffCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Paquete de Ingreso</label>
                <select 
                  value={newAffPackageId}
                  onChange={(e) => setNewAffPackageId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.price} - {p.bv} BV)</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsNewAffiliateModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl"
                >
                  Registrar & Activar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Confirmación de Cierre */}
      {isCloseModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-amber-500/40 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Confirmar Simulación de Cierre</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ¿Deseas ejecutar el cálculo de liquidación para el periodo activo? Se auditarán los puntos grupales (124,500 BV) y se generarán los saldos para 2,480 afiliados.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button 
                onClick={() => setIsCloseModalOpen(false)}
                className="px-4 py-2 text-slate-400 hover:text-white text-xs"
              >
                Cancelar
              </button>
              <button 
                onClick={handleExecuteClose}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
              >
                Ejecutar Cierre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Científico del Fundador Ángel Manuel Breña Eulogio */}
      <FounderModal 
        isOpen={isFounderModalOpen} 
        onClose={() => setIsFounderModalOpen(false)} 
      />

      {/* Centro de Seguridad y Autenticación (Login, 2FA, Recuperación de Clave) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onLogAction={addAuditLog}
        onShowToast={showToast}
      />

    </div>
  );
}
