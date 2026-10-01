export type UserRole = 'admin' | 'gerente' | 'afiliado' | 'cliente' | 'pagos' | 'auditor';

export type ActiveTab = 
  | 'dashboard' 
  | 'afiliados' 
  | 'arbol' 
  | 'oficina' 
  | 'tienda' 
  | 'paquetes_admin' 
  | 'plan' 
  | 'cierre' 
  | 'reportes' 
  | 'terminos' 
  | 'sofia'
  | 'inventario'
  | 'codigos'
  | 'regalias'
  | 'pagos'
  | 'ecosistema';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface SponsorCode {
  id: string;
  code: string;
  prospectName: string;
  packageName: string;
  bv: number;
  price: number;
  sponsor: string;
  link: string;
  createdAt: string;
  status: 'activo' | 'canjeado' | 'expirado';
}

export interface LotRecord {
  id: string;
  productId: string;
  productName: string;
  lotCode: string;
  productionDate: string;
  expiryDate: string;
  units: number;
  initialUnits: number;
  notes: string;
}

export interface PaymentRecord {
  id: string;
  voucherNumber: string;
  affiliateId: string;
  affiliateName: string;
  affiliateCode: string;
  bankName: string;
  accountNumber: string;
  period: string;
  personalBv: number;
  groupBv: number;
  grossAmount: number;
  retentionTax: number;
  netAmount: number;
  date: string;
  paymentDate?: string;
  status: 'Pagado' | 'Pendiente' | 'En Revisión';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: string;
  lotCode: string;
  stock: number;
  minThreshold: number;
  bv: number;
  publicPrice: number;
  distributorPrice: number;
  costPrice: number;
  ingredients: string[];
  mechanism: string;
  modeOfUse: string;
  status: 'optimal' | 'low' | 'critical';
}

export interface AffiliationPackage {
  id: string;
  code: string;
  name: string;
  price: number;
  bv: number;
  validityDays: number;
  initialRank: string;
  description: string;
  includedProducts: { productId: string; productName: string; quantity: number }[];
  featured?: boolean;
  status: 'active' | 'inactive';
}

export interface Affiliate {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  documentId?: string;
  joinDate: string;
  sponsorName: string;
  sponsorCode: string;
  level: number;
  personalBv: number;
  groupBv: number;
  rank: string;
  rankColor?: string;
  status: 'active' | 'inactive' | 'suspended';
  affiliateType: 'socio' | 'emprendedor' | 'vip' | 'gratuito';
  directReferralsCount: number;
  activeLegsCount: number;
  totalTeamCount: number;
  membershipExpiryDate: string;
  membershipStatus: 'vigente' | 'vencida' | 'pendiente';
}

export interface CareerRank {
  id: string;
  name: string;
  color: string;
  iconName: string;
  minPersonalBv: number;
  minGroupBv: number;
  minDirects: number;
  minActiveLegs: number;
  maxLevelsPaid: number;
  rankBonusUsd: number;
  perks: string[];
  motivationalMessage: string;
}

export interface MonthlyEarning {
  month: string;
  personalSales: number;
  royalties: number;
  bonuses: number;
  total: number;
  status: 'Liquidado' | 'Pendiente' | 'En Proceso';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'security';
}

export interface CartItem {
  id: string;
  name: string;
  type: 'product' | 'package';
  price: number;
  bv: number;
  quantity: number;
}
