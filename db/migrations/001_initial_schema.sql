-- ============================================================================
-- MIGRACIÓN 001: INICIALIZACIÓN DE ESQUEMA, DISPARADORES Y REGLAS DE RED
-- AB NATURAL NETWORKERS · MULTINIVEL DIAMANTE AB
-- ============================================================================

-- Disparador para actualizar 'updated_at' automáticamente
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_affiliates_updated_at
BEFORE UPDATE ON affiliates
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_packages_updated_at
BEFORE UPDATE ON affiliation_packages
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

-- ============================================================================
-- FUNCIÓN FORENSE: PREVENCIÓN ESTRICTA DE CICLOS DE PATROCINIO
-- Garantiza que ningún afiliado pueda tener como patrocinador a uno de sus propios descendientes
-- ============================================================================
CREATE OR REPLACE FUNCTION prevent_sponsor_cycle()
RETURNS TRIGGER AS $$
DECLARE
  current_sponsor_id UUID;
  visited_count INT := 0;
  max_allowed_depth INT := 100;
BEGIN
  IF NEW.sponsor_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Un afiliado no puede patrocinarse a sí mismo
  IF NEW.id = NEW.sponsor_id THEN
    RAISE EXCEPTION 'Violación de genealogía: Un afiliado no puede patrocinarse a sí mismo (ID: %)', NEW.id;
  END IF;

  current_sponsor_id := NEW.sponsor_id;

  WHILE current_sponsor_id IS NOT NULL LOOP
    IF current_sponsor_id = NEW.id THEN
      RAISE EXCEPTION 'Ciclo de patrocinio detectado: El patrocinador propuesto % desciende del afiliado %', NEW.sponsor_id, NEW.id;
    END IF;

    visited_count := visited_count + 1;
    IF visited_count > max_allowed_depth THEN
      RAISE EXCEPTION 'Profundidad de árbol excedida o bucle infinito detectado en árbol descendente.';
    END IF;

    SELECT sponsor_id INTO current_sponsor_id FROM affiliates WHERE id = current_sponsor_id;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_sponsor_cycle
BEFORE INSERT OR UPDATE OF sponsor_id ON affiliates
FOR EACH ROW
EXECUTE FUNCTION prevent_sponsor_cycle();

-- ============================================================================
-- FUNCIÓN: BLOQUEO INMUTABLE DE CIERRES MENSUALES
-- Ninguna comisión perteneciente a un periodo con is_locked = true puede ser modificada
-- ============================================================================
CREATE OR REPLACE FUNCTION protect_locked_settlement()
RETURNS TRIGGER AS $$
DECLARE
  period_is_locked BOOLEAN;
BEGIN
  SELECT is_locked INTO period_is_locked 
  FROM monthly_settlements 
  WHERE period_label = OLD.period_label;

  IF period_is_locked IS TRUE THEN
    RAISE EXCEPTION 'Operación rechazada: El periodo % está oficialmente cerrado y bloqueado para auditoría legal.', OLD.period_label;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_protect_commission_edits
BEFORE UPDATE OR DELETE ON commission_transactions
FOR EACH ROW
EXECUTE FUNCTION protect_locked_settlement();

-- ============================================================================
-- CARGA DE DATOS SEMILLA BÁSICOS (9 RANGOS DE CARRERA)
-- ============================================================================
INSERT INTO career_ranks (id, rank_order, name, color, min_personal_bv, min_group_bv, min_directs, min_active_legs, max_levels_paid, rank_bonus_usd, perks, motivational_message)
VALUES 
('rank-bronce', 1, 'Bronce', '#cd7f32', 100, 1000, 2, 2, 3, 100.00, ARRAY['Descuento 30% en compras', 'Comisión directa 20%'], '¡Bienvenido a la carrera del bienestar y autoliderazgo!'),
('rank-plata', 2, 'Plata', '#94a3b8', 100, 3000, 3, 2, 4, 250.00, ARRAY['Acceso a masterclass exclusivas', 'Bono patrocinio reforzado'], 'Estás construyendo cimientos sólidos en tu red.'),
('rank-oro', 3, 'Oro', '#eab308', 150, 8000, 4, 3, 6, 600.00, ARRAY['Participación en seminarios regionales', 'Regalías hasta nivel 6'], '¡Tu liderazgo inspira a decenas de familias!'),
('rank-platino', 4, 'Platino', '#38bdf8', 200, 20000, 5, 4, 8, 1500.00, ARRAY['Pase a la Convención Anual de Liderazgo', 'Bono viaje calificado'], 'Rango de alta rentabilidad y consolidación grupal.'),
('rank-esmeralda', 5, 'Esmeralda', '#10b981', 250, 45000, 6, 4, 12, 3500.00, ARRAY['Participación en Pool Global 2%', 'Asesoría 1 a 1 de estrategia'], 'Impacto multiplicador en múltiples ciudades.'),
('rank-diamante', 6, 'Diamante', '#0284c7', 300, 100000, 8, 5, 18, 8000.00, ARRAY['Bono Auto de Lujo mensual', 'Pool Global 3%', 'Pase VIP vitalicio'], 'Eres un faro de transformación para la red.'),
('rank-doble-diamante', 7, 'Doble Diamante', '#6366f1', 400, 250000, 10, 6, 24, 18000.00, ARRAY['Bono Residencia / Mansión', 'Pool Global 4%'], 'Libertad financiera y legado familiar consolidado.'),
('rank-diamante-ejecutivo', 8, 'Diamante Ejecutivo', '#fbbf24', 500, 500000, 12, 6, 30, 35000.00, ARRAY['Compresión dinámica total hasta 30 niveles', 'Socio del Consejo Consultivo'], '¡Rango de Ángel Breña! Máxima autoridad y maestría de red.'),
('rank-maestro', 9, 'Maestro', '#f43f5e', 600, 1000000, 14, 8, 30, 75000.00, ARRAY['Participación accionaria y regalías perpetuas de holding'], 'La cumbre del bienestar humano integral.')
ON CONFLICT (id) DO NOTHING;
