# MANUAL TÉCNICO, ARQUITECTURA Y GUÍA DE ADMINISTRACIÓN
## MULTINIVEL DIAMANTE AB · ÁNGEL BREÑA
### EMPRESA: AB NATURAL NETWORKERS

---

## 1. INTRODUCCIÓN Y VISIÓN DEL ECOSISTEMA

**Multinivel Diamante AB** es la plataforma tecnológica empresarial y de back office oficial de **AB Natural Networkers**, fundada y dirigida por **Ángel Manuel Breña Eulogio**, Analista Químico y Educador Científico (ORCID: 0000-0002-3091-0123).

La plataforma combina:
1. **Comercio electrónico celular de precisión**: Productos botánicos y adaptógenos de alta biodisponibilidad (*Enercell + ION*, *Nopaloe RF03*, *Biomega 3*, *Moringa Hiperanthera*, *Colágeno Quantum*).
2. **Plan de compensación híbrido de hasta 30 niveles**: Con compresión dinámica, bono de patrocinio del 20%, margen de reventa del 30% y pool global de liderazgo.
3. **Oficina virtual motivacional**: Barra de progreso hacia el siguiente rango, cálculo de volumen faltante y enlaces personales de afiliación con código QR.
4. **Sofía Humanómica (IA)**: Mentora epigenética y estratega de ventas basada en la metodología de 4 pasos (*Empatía Transformacional, Educación Epigenética, Prescripción Nutricional y Llamado a la Acción*).

---

## 2. ARQUITECTURA GENERAL Y ESCALABILIDAD (10,000+ AFILIADOS)

### Componentes de la Arquitectura
```
                      [ CLIENTES / SOCIOS / DISPOSITIVOS MÓVILES ]
                                            │
                                            ▼
                           [ NGINX REVERSE PROXY / CDN ]
                      (HTTPS / TLS 1.3 / Rate Limiting 100 req/s)
                                            │
                                            ▼
                       [ EXPRESS.JS REST API / SERVER.TS ]
                      (Validación RBAC, Idempotencia, Lotes)
                                            │
                      ┌─────────────────────┴─────────────────────┐
                      ▼                                           ▼
          [ POSTGRESQL RELACIONAL ]                   [ GEMINI 3.8 FLASH ]
        (Árbol LTREE, Vales Inmutables,             (Sofía Humanómica IA &
         Particionado por periodos)                  Asesoría Científica)
```

### Estrategias de Escalamiento para 10,000 a 100,000 Afiliados
1. **Modelado Jerárquico con `LTREE`**:
   - En lugar de consultas recursivas lentas (`WITH RECURSIVE`) para calcular volúmenes descendentes, cada afiliado almacena su `tree_path` (ej. `1.104.305`).
   - La consulta de toda la red descendente de un diamante se resuelve en menos de **5 milisegundos**:
     ```sql
     SELECT * FROM affiliates WHERE tree_path <@ '1.104';
     ```
2. **Particionado de Tablas Financieras**:
   - La tabla `commission_transactions` se particiona mensualmente por `period_label` (`commission_transactions_2026_09`, `commission_transactions_2026_10`).
   - Evita la degradación de índices conforme la red genera millones de micropagos por nivel.
3. **Protección contra Doble Acreditación (Idempotencia)**:
   - Todo pedido enviado desde el checkout incluye un `idempotency_key` único en base de datos (`UNIQUE`). Si un usuario presiona dos veces el botón de compra o hay inestabilidad en la conexión móvil, el sistema descarta la duplicación.
4. **Paginación en Cursor y Búsquedas Indexadas**:
   - Los listados de red no cargan 10,000 registros de golpe en el DOM; utilizan scroll infinito o paginación por bloques de 25/50 registros con índices B-Tree en `(sponsor_id, depth_level, current_rank)`.

---

## 3. ROLES DEL SISTEMA (RBAC)

El sistema opera con **6 roles diferenciados** de acceso estricto:

| Rol | Privilegios y Alcance |
| :--- | :--- |
| **1. Administrador Maestro** | Control total. Configuración de paquetes, inventario de planta, simulación y bloqueo de cierres mensuales, planes de compensación y auditoría forense de IPs. |
| **2. Gerente / Supervisor** | Operación diaria, supervisión de inventario de stock, verificación de afiliaciones y resolución de tickets de soporte. No puede alterar fórmulas troncales. |
| **3. Afiliado / Socio** | Oficina virtual personalizada, árbol de su propia red, compras personales con 30% de descuento, generador de códigos QR y enlaces de patrocinio. **Protección:** No puede ver datos bancarios ni comisiones de otros socios. |
| **4. Cliente Preferencial** | Catálogo público, carrito de compras, seguimiento de pedidos personales y opción de afiliarse adquiriendo un paquete. |
| **5. Operador de Pagos** | Aprobación de comprobantes, dispersión de transferencias bancarias masivas, cálculo de retenciones tributarias (10%) y emisión de vales de pago. |
| **6. Auditor o Consulta** | Visualización de bitácoras de auditoría, trazabilidad forense de direcciones IP, padrón de red y descarga de reportes certificados en PDF. |

---

## 4. PLAN DE COMPENSACIÓN & CARRERA DIAMANTE

### 1. Venta Directa (Margen Comercial)
- Descuento del **30% al 40%** sobre precio público para afiliados activos.

### 2. Bono de Patrocinio Directo
- **20%** sobre el volumen BV del paquete de inicio o primer pedido de cada nuevo socio registrado.

### 3. Regalías Uninivel con Compresión Dinámica (Hasta 30 Niveles)
- Nivel 1 (Directos): **8%**
- Nivel 2: **7%**
- Nivel 3: **6%**
- Nivel 4: **5%**
- Nivel 5: **4%**
- Nivel 6: **3%**
- Nivel 7: **2%**
- Nivel 8: **2%**
- Nivel 9: **1%**
- Niveles 10 al 30: **1%** con compresión de líneas inactivas (requiere al menos 100 BV personales mensuales).

### 4. Plan de Carrera Oficial (9 Rangos)
1. **Bronce**: 100 BV personal, 1,000 BV grupal, 2 líneas activas. Bono ascenso: $100 USD.
2. **Plata**: 100 BV personal, 3,000 BV grupal, 2 líneas activas. Bono ascenso: $250 USD.
3. **Oro**: 150 BV personal, 8,000 BV grupal, 3 líneas activas. Bono ascenso: $600 USD.
4. **Platino**: 200 BV personal, 20,000 BV grupal, 4 líneas activas. Bono ascenso: $1,500 USD.
5. **Esmeralda**: 250 BV personal, 45,000 BV grupal, 4 líneas activas. Bono ascenso: $3,500 USD + Pool Global 2%.
6. **Diamante**: 300 BV personal, 100,000 BV grupal, 5 líneas activas. Bono ascenso: $8,000 USD + Bono Auto.
7. **Doble Diamante**: 400 BV personal, 250,000 BV grupal, 6 líneas activas. Bono ascenso: $18,000 USD + Bono Residencia.
8. **Diamante Ejecutivo (Rango de Ángel Breña)**: 500 BV personal, 500,000 BV grupal, 6 líneas activas. Bono ascenso: $35,000 USD + Consejo Consultivo.
9. **Maestro**: 600 BV personal, 1,000,000 BV grupal, 8 líneas activas. Bono ascenso: $75,000 USD + Participación de holding.

---

## 5. GUÍA DE INSTALACIÓN Y CONFIGURACIÓN LOCAL

### Requisitos Previos
- Node.js versión 20.x o superior.
- PostgreSQL 15+ (opcional para desarrollo local con mocks en memoria).
- npm o bun.

### Pasos de Instalación
1. Clonar el repositorio o descargar el paquete del proyecto.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   Editar `.env` e ingresar:
   ```env
   PORT=3000
   NODE_ENV=production
   GEMINI_API_KEY="AIzaSy..." # Clave de API de Google AI Studio para Sofía Humanómica
   APP_URL="https://tu-dominio.com"
   ```
4. Iniciar en modo desarrollo con recarga en caliente:
   ```bash
   npm run dev
   ```
5. Acceder a la plataforma en el navegador web:
   ```
   http://localhost:3000
   ```

---

## 6. COPIAS DE SEGURIDAD (BACKUP) Y RESTAURACIÓN

### A. Copia de Seguridad JSON desde la Interfaz Web (1 Clic)
1. Iniciar sesión como **Administrador Maestro** o en cualquier rol con permisos.
2. En la barra superior, hacer clic en el botón **"Backup JSON"**.
3. El sistema descargará un archivo estructurado con formato:
   `backup_multinivel_diamante_YYYY-MM-DD.json`
4. Contiene todos los registros íntegros: productos, paquetes, afiliados, rangos, lotes de laboratorio, historial de pagos y bitácora de auditoría con IPs.

### B. Restauración de Versiones desde la Interfaz Web
1. En la barra superior, hacer clic en el botón **"Restaurar"**.
2. Seleccionar el archivo `.json` de respaldo previamente guardado.
3. El motor validará la estructura, restaurará el estado y creará una entrada inmutable en la bitácora de auditoría con la hora y fecha del evento.

### C. Copia de Seguridad a Nivel de Base de Datos PostgreSQL (Línea de Comandos)
```bash
# Exportar volcado completo de la base de datos
pg_dump -U postgres -h localhost -d ab_networkers_db -F c -b -v -f "backup_ab_$(date +%Y%m%d).dump"

# Restaurar volcado en caso de contingencia
pg_restore -U postgres -h localhost -d ab_networkers_db -v -c "backup_ab_20260929.dump"
```

---

## 7. CUMPLIMIENTO ÉTICO, TRANSPARENCIA Y POLÍTICAS LEGALES

La plataforma está diseñada bajo los más rigurosos estándares de cumplimiento internacional (Directiva Europea de Comercio Electrónico, Ley de Protección al Consumidor y Normas del MINJUS / SUNAT):
1. **Antipirámide Estricta**: No se pagan comisiones por el mero acto de reclutar personas. Todo centavo distribuido proviene de ventas reales de productos funcionales o paquetes de membresía con inventario entregado.
2. **Claridad de Ingresos**: Se muestra explícitamente el descargo de responsabilidad: *"Los ingresos y ascensos de rango dependen del esfuerzo personal, las ventas reales del equipo y las reglas del plan; no constituyen garantías fijas ni esquemas pasivos"*.
3. **Retención Tributaria Automatizada**: Todo vale de pago emitido retiene el 10% legal para efectos fiscales, emitiendo una constancia con firma digital.
4. **Respaldo Científico**: La formulación de los productos y la metodología epigenética están respaldadas por la trayectoria del fundador **Ángel Manuel Breña Eulogio** (ORCID: 0000-0002-3091-0123).
