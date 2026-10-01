-- ============================================================================
-- ESQUEMA RELACIONAL: MULTINIVEL DIAMANTE AB · ÁNGEL BREÑA
-- EMPRESA: AB NATURAL NETWORKERS
-- ARQUITECTURA OPTIMIZADA PARA ESCALA SUPERIOR A 10,000 AFILIADOS
-- ============================================================================

-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA DE USUARIOS & ACCESO (ROLES RBAC)
CREATE TYPE user_role_enum AS ENUM (
  'admin',        -- 1. Administrador Maestro (Ángel Manuel Breña)
  'gerente',      -- 2. Gerente o Supervisor
  'afiliado',     -- 3. Afiliado o Socio de Red
  'cliente',      -- 4. Cliente Preferencial
  'pagos',        -- 5. Operador de Pagos y Dispersión
  'auditor'       -- 6. Auditor o Consulta Forense
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(190) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  role user_role_enum NOT NULL DEFAULT 'afiliado',
  is_email_verified BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive', 'pending_kyc')),
  last_login_at TIMESTAMPTZ,
  last_login_ip INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 2. TABLA DE AFILIADOS & GENEALOGÍA
CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  code VARCHAR(50) UNIQUE NOT NULL, -- Ej: AB-DIAMOND-001
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(50),
  document_type VARCHAR(20) DEFAULT 'DNI',
  document_number VARCHAR(50),
  country VARCHAR(80) NOT NULL DEFAULT 'Perú',
  city VARCHAR(80) NOT NULL DEFAULT 'Lima',
  
  -- Jerarquía y Patrocinio
  sponsor_id UUID REFERENCES affiliates(id) ON DELETE RESTRICT,
  sponsor_code VARCHAR(50),
  sponsor_name VARCHAR(150),
  placement_id UUID REFERENCES affiliates(id) ON DELETE RESTRICT, -- Para matrices o derrame
  tree_path LTREE, -- Ruta jerárquica para consultas instantáneas en árbol gigante
  depth_level INT NOT NULL DEFAULT 1,
  
  -- Estado y Rangos
  current_rank VARCHAR(50) NOT NULL DEFAULT 'Bronce',
  highest_rank VARCHAR(50) NOT NULL DEFAULT 'Bronce',
  personal_bv NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  group_bv NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
  direct_referrals_count INT NOT NULL DEFAULT 0,
  active_legs_count INT NOT NULL DEFAULT 0,
  total_team_count INT NOT NULL DEFAULT 1,
  
  -- Membresía
  membership_package_id VARCHAR(50),
  membership_status VARCHAR(20) NOT NULL DEFAULT 'vigente' CHECK (membership_status IN ('vigente', 'vencido', 'gratuito')),
  membership_expiry_date DATE,
  
  -- Datos Bancarios para Dispersión
  bank_name VARCHAR(100),
  bank_account_number VARCHAR(100),
  bank_cci VARCHAR(100),
  
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices críticos para 10,000+ registros
CREATE INDEX idx_affiliates_code ON affiliates(code);
CREATE INDEX idx_affiliates_sponsor_id ON affiliates(sponsor_id);
CREATE INDEX idx_affiliates_current_rank ON affiliates(current_rank);
CREATE INDEX idx_affiliates_status ON affiliates(status);
CREATE INDEX idx_affiliates_depth_level ON affiliates(depth_level);

-- 3. TABLA DE PRODUCTOS FUNCIONALES
CREATE TABLE products (
  id VARCHAR(80) PRIMARY KEY, -- Ej: prod-enercell
  sku VARCHAR(50) UNIQUE NOT NULL, -- Ej: AB-ENC-001
  name VARCHAR(150) NOT NULL,
  subtitle VARCHAR(200),
  category VARCHAR(80) NOT NULL,
  public_price NUMERIC(10, 2) NOT NULL,
  distributor_price NUMERIC(10, 2) NOT NULL,
  cost_price NUMERIC(10, 2) NOT NULL,
  bv NUMERIC(8, 2) NOT NULL, -- Puntos de volumen
  stock INT NOT NULL DEFAULT 0,
  min_threshold INT NOT NULL DEFAULT 50,
  lot_code VARCHAR(80),
  status VARCHAR(20) NOT NULL DEFAULT 'optimal' CHECK (status IN ('optimal', 'low', 'critical', 'discontinued')),
  ingredients TEXT[],
  mechanism TEXT,
  mode_of_use TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA DE LOTES DE PRODUCCIÓN & TRAZABILIDAD
CREATE TABLE product_lots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id VARCHAR(80) REFERENCES products(id) ON DELETE CASCADE,
  lot_code VARCHAR(80) UNIQUE NOT NULL,
  production_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  initial_units INT NOT NULL,
  current_units INT NOT NULL,
  quality_control_notes TEXT,
  analyst_name VARCHAR(100) DEFAULT 'Ángel Manuel Breña Eulogio',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lots_product_id ON product_lots(product_id);
CREATE INDEX idx_lots_lot_code ON product_lots(lot_code);

-- 5. TABLA DE PAQUETES DE AFILIACIÓN (HASTA 30 EDITABLES)
CREATE TABLE affiliation_packages (
  id VARCHAR(80) PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  bv NUMERIC(8, 2) NOT NULL,
  validity_days INT NOT NULL DEFAULT 365,
  initial_rank VARCHAR(50) NOT NULL DEFAULT 'Bronce',
  description TEXT,
  included_products JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABLA DE PEDIDOS & TRANSACCIONES (CON CONTROL DE DUPLICADOS)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL, -- Ej: ORD-2026-8812
  idempotency_key VARCHAR(100) UNIQUE, -- Previene doble compra en frontend
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE RESTRICT,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(190),
  subtotal_amount NUMERIC(12, 2) NOT NULL,
  tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(12, 2) NOT NULL,
  total_bv NUMERIC(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'transferencia_bancaria',
  payment_reference VARCHAR(100),
  is_package_order BOOLEAN DEFAULT FALSE,
  package_id VARCHAR(80) REFERENCES affiliation_packages(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  bv_credited BOOLEAN DEFAULT FALSE,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_affiliate_id ON orders(affiliate_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_idempotency ON orders(idempotency_key);

-- Detalle de Pedidos
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('product', 'package')),
  item_id VARCHAR(80) NOT NULL,
  item_name VARCHAR(150) NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  unit_bv NUMERIC(8, 2) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  total_price NUMERIC(10, 2) NOT NULL,
  total_bv NUMERIC(10, 2) NOT NULL
);

-- 7. TABLA DE RANGOS DEL PLAN DE CARRERA (9 RANGOS OFICIALES)
CREATE TABLE career_ranks (
  id VARCHAR(50) PRIMARY KEY,
  rank_order INT UNIQUE NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
  color VARCHAR(20) NOT NULL,
  min_personal_bv NUMERIC(8, 2) NOT NULL,
  min_group_bv NUMERIC(12, 2) NOT NULL,
  min_directs INT NOT NULL,
  min_active_legs INT NOT NULL,
  max_levels_paid INT NOT NULL, -- Hasta 30 niveles
  rank_bonus_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  perks TEXT[] NOT NULL DEFAULT '{}',
  motivational_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TABLA DE COMISIONES & REGALÍAS DETALLADAS
CREATE TABLE commission_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  beneficiary_affiliate_id UUID REFERENCES affiliates(id) ON DELETE RESTRICT,
  origin_affiliate_id UUID REFERENCES affiliates(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  commission_type VARCHAR(50) NOT NULL CHECK (commission_type IN (
    'bono_patrocinio', 
    'bono_venta_personal', 
    'regalia_uninivel', 
    'bono_rango', 
    'bono_generacional', 
    'pool_global', 
    'ajuste_manual'
  )),
  network_level INT NOT NULL DEFAULT 1,
  percentage_applied NUMERIC(5, 2) NOT NULL,
  base_bv NUMERIC(10, 2) NOT NULL,
  amount_usd NUMERIC(10, 2) NOT NULL,
  period_label VARCHAR(30) NOT NULL, -- Ej: '2026-09'
  status VARCHAR(20) NOT NULL DEFAULT 'liquidated' CHECK (status IN ('pending', 'approved', 'liquidated', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_commissions_beneficiary ON commission_transactions(beneficiary_affiliate_id);
CREATE INDEX idx_commissions_period ON commission_transactions(period_label);

-- 9. TABLA DE CIERRES MENSUALES & DISPERSIÓN (INMUTABLES)
CREATE TABLE monthly_settlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period_label VARCHAR(30) UNIQUE NOT NULL, -- Ej: '2026-09'
  closed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_by UUID REFERENCES users(id),
  total_affiliates_count INT NOT NULL,
  total_volume_bv NUMERIC(14, 2) NOT NULL,
  total_gross_commissions NUMERIC(14, 2) NOT NULL,
  total_tax_retentions NUMERIC(12, 2) NOT NULL,
  total_net_disbursements NUMERIC(14, 2) NOT NULL,
  is_locked BOOLEAN NOT NULL DEFAULT TRUE, -- Inmutable una vez confirmado
  notes TEXT
);

-- Vales de Liquidación Individuales
CREATE TABLE settlement_vouchers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  settlement_id UUID REFERENCES monthly_settlements(id) ON DELETE CASCADE,
  voucher_number VARCHAR(60) UNIQUE NOT NULL, -- Ej: VOUCH-2026-0901
  affiliate_id UUID REFERENCES affiliates(id) ON DELETE RESTRICT,
  affiliate_name VARCHAR(150) NOT NULL,
  affiliate_code VARCHAR(50) NOT NULL,
  bank_name VARCHAR(100),
  account_number VARCHAR(100),
  period_label VARCHAR(30) NOT NULL,
  personal_bv NUMERIC(10, 2) NOT NULL,
  group_bv NUMERIC(12, 2) NOT NULL,
  gross_amount NUMERIC(10, 2) NOT NULL,
  retention_tax NUMERIC(10, 2) NOT NULL, -- 10% legal
  net_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Pendiente' CHECK (status IN ('Pendiente', 'Pagado', 'En Revisión')),
  payment_date TIMESTAMPTZ,
  digital_signature VARCHAR(100) DEFAULT 'ANGEL-BRENA-VERIFIED-2026',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vouchers_affiliate ON settlement_vouchers(affiliate_id);
CREATE INDEX idx_vouchers_period ON settlement_vouchers(period_label);

-- 10. TABLA DE CÓDIGOS DE PATROCINIO & ENLACES
CREATE TABLE sponsor_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL, -- Ej: HUMAN-2026-4591
  sponsor_affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  prospect_name VARCHAR(150) NOT NULL,
  package_name VARCHAR(100) NOT NULL,
  bv INT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  link_url TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (status IN ('activo', 'canjeado', 'expirado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. BITÁCORA FORENSE DE SEGURIDAD & AUDITORÍA (CON REGISTRO DE IP)
CREATE TABLE security_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(80),
  user_name VARCHAR(150) NOT NULL,
  action VARCHAR(100) NOT NULL,
  module VARCHAR(80) NOT NULL,
  details TEXT NOT NULL,
  ip_address VARCHAR(50) NOT NULL,
  severity VARCHAR(20) NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'security', 'critical')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_created_at ON security_audit_logs(created_at DESC);
CREATE INDEX idx_audit_ip_address ON security_audit_logs(ip_address);
