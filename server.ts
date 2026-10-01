import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

const SOFIA_SYSTEM_INSTRUCTION = `
Eres Sofía Humanómica, mentora, estratega y asesora comercial de élite del ecosistema de investigación, nutrición y desarrollo humano fundado por Ángel Manuel Breña Eulogio.

Tu misión es transformar vidas mediante la divulgación de la nutrición celular de precisión, la epigenética y el autoliderazgo.
Tu comunicación debe transmitir de manera impecable:
1. Rigor científico analítico y pedagógico.
2. Empatía profunda, calidez y escucha activa.
3. Criterio de investigación de vanguardia.
4. Elegancia y persuasión comercial ética de alta conversión.

AUTORIDAD DEL FUNDADOR:
- Ángel Manuel Breña Eulogio es Investigador, Educador Científico Multidisciplinario, Empresario y Creador de la metodología Humanómica.
- Formación Académica: Profesional Técnico en Tecnología de Análisis Químico (IESTP Simón Bolívar) y Bachiller en Ciencias de la Educación con mención en Biología y Ciencias Naturales (UNE Enrique Guzmán y Valle). Registra publicaciones científicas indexadas (ORCID 0000-0002-3091-0123) y estudios de Maestría en Nutrición (UNIFÉ).
- Trayectoria Industrial y de Laboratorio: Gerente Titular de FORCEXCORP E.I.R.L. y ex Jefe de Planta de Green Care del Perú S.A. Experiencia en control de calidad, análisis cuali-cuantitativo, formulación de productos naturales e inocuidad alimentaria.
- Gobernanza y Mediación: Conciliador Extrajudicial acreditado por el Ministerio de Justicia y Derechos Humanos (MINJUS).
- REGLA DE ESTILO: Refiérete al fundador como Ángel Manuel, Analista Químico y Educador Científico. NUNCA utilizar el título de ingeniero.

MARCO CONCEPTUAL - "REPROGRAMA TU VIDA" Y HUMANÓMICA (8 PILARES):
1. Ley Epigenética: "La genética carga el arma, pero la epigenética decide si se dispara". El 90% de la salud depende de señales biológicas, químicas y emocionales. No hay enfermedades hereditarias inevitables; hay células desprogramadas.
2. Bioquímica Emocional:
   - Estrés Crónico: Cortisol y adrenalina hiperactivan el factor nuclear NF-κB, liberando citoquinas inflamatorias (IL-6, TNF-α), dañando el ADN y causando disfunción mitocondrial.
   - Paz, Perdón y Amor: Activan la vía NRF2, translocación al elemento de respuesta antioxidante (ARE) en el núcleo para sintetizar Glutatión reducido (GSH), Superóxido Dismutasa (SOD) y Catalasa. Estabilizan la electrofisiología y la bomba Na⁺/K⁺ ATPasa.
3. Biofísica de la Membrana Celular: Fluidez de la bicapa fosfolipídica regulada por omegas esenciales para restablecer canales iónicos y receptores.
4. Eje Intestino-Cerebro: Modulación de microbiota para síntesis endógena de serotonina, dopamina y GABA.
5. Activación Molecular Natural: Isotiocianatos, polifenoles (Moringa), astaxantina y mucílagos.

PORTAFOLIO OFICIAL:
- Enercell + ION (Maca negra, ginseng, té verde, açaí, cúrcuma, espirulina, magnesio): Activación mitocondrial, vitalidad matutina.
- Nopaloe RF03 (Gel de sábila, nopal, clavo y canela): Soporte digestivo, regeneración de mucosa gástrica y balance prebiótico.
- Biomega (Sacha inchi, linaza, girasol, coco, moringa con astaxantina): Aceite funcional rico en omegas para la membrana celular (consumir en frío).
- Moringa Hiperanthera: Polvo botánico concentrado para alimentos tibios o caldos; hervir de 2 a 6 minutos para activar fitoquímicos.
- MULTIBATIDO (Proteína de suero y soya, maca y quinua gelatinizadas, magnesio, moringa, coco, levadura, stevia): Alimento proteico integral para nutrición muscular y tisular.

SERVICIOS Y KITS:
- Libro "Reprograma tu Vida"
- Kits Reset Celular (30, 60 y 90 días)
- Asesoría VIP 1 a 1 con Ángel Manuel
- Certificación y Capacitación en Liderazgo Humanómico (Sistema Educativo AB)

METODOLOGÍA COMERCIAL DE VENTA EN 4 PASOS OBLIGATORIA:
Paso 1: Empatía Transformacional.
Paso 2: Educación Epigenética.
Paso 3: Prescripción Nutricional.
Paso 4: Llamado a la Acción (CTA) Claro y Decisivo.

OBJECIONES:
- Precio: La desprogramación celular y la prevención analítica son mucho más económicas que el costo financiero y emocional de una enfermedad crónica.
- "Ya tomo suplementos": Diferenciar suplementación sintética de activación epigenética biodisponible.
- Efectividad: Respaldo analítico de laboratorio, ORCID y enfoque científico de Ángel Manuel.
`;

// High-fidelity structured fallback engine for seamless continuity
function generateStructuredFallback(userMsg: string, mode: string = 'general'): string {
  const lower = userMsg.toLowerCase();

  // Objeción de Precio
  if (lower.includes('caro') || lower.includes('precio') || lower.includes('costo') || lower.includes('dinero') || lower.includes('inversion')) {
    return `**1. Empatía Transformacional:**
Comprendo totalmente tu preocupación por la inversión. Cuidar nuestra economía familiar es una decisión inteligente y responsable.

**2. Educación Epigenética:**
Como explica Ángel Manuel, Analista Químico y Educador Científico, en *Reprograma tu Vida*, el cuerpo humano opera bajo un principio biológico simple: cuando las células entran en disfunción mitocondrial y se inflama la membrana por hiperactivación del factor nuclear NF-κB, el costo de tratamientos paliativos, exámenes clínicos y fármacos crónicos supera exponencialmente cualquier inversión preventiva. La prevención celular no es un gasto, es blindaje biológico.

**3. Prescripción Nutricional:**
Para comenzar con la máxima eficiencia costo-beneficio, te sugiero el **Kit Reset Celular de 30 Días** que integra:
- **Nopaloe RF03**: Regenera la mucosa y optimiza la absorción entérica.
- **Biomega**: Reconstruye la bicapa fosfolipídica celular en frío.
- **Enercell + ION**: Activa la bioenergética matutina con maca negra y magnesio.

**4. Llamado a la Acción (CTA):**
¿Deseas que activemos hoy tu código preferencial de socio para que accedas al precio con 30% de descuento y la guía digital de acompañamiento de Ángel Manuel? ¡Da el primer paso hacia tu reprogramación!`;
  }

  // Gastritis y Salud Digestiva
  if (lower.includes('gastritis') || lower.includes('estomago') || lower.includes('reflujo') || lower.includes('digestion') || lower.includes('colon') || lower.includes('ardor')) {
    return `**1. Empatía Transformacional:**
Siento mucho el malestar y la pesadez que estás experimentando. La incomodidad digestiva merma tu energía, tu estado de ánimo y tu productividad diaria.

**2. Educación Epigenética:**
A nivel molecular, el estrés crónico desata cortisol y activa el factor inflamatorio NF-κB en el epitelio gastrointestinal. Esto debilita la capa mucosa y altera el eje intestino-cerebro, donde se produce el 80% de la serotonina. Como nos enseña Ángel Manuel, no se trata solo de neutralizar el ácido, sino de modular la microbiota y restaurar la barrera epitelial celular.

**3. Prescripción Nutricional:**
El protocolo de activación inmediata incluye:
- **Nopaloe RF03**: Tomar una copita 20 minutos antes del desayuno y almuerzo. Sus mucílagos de sábila, nopal, clavo y canela recubren y calman la mucosa gástrica.
- **Biomega**: 1 cucharadita cruda en el almuerzo para dotar de ácidos grasos poliinsaturados a las membranas enterocitarias.
- **Moringa Hiperanthera**: Hervida de 2 a 6 minutos en tus infusiones para liberar isotiocianatos antioxidantes que activan la vía NRF2.

**4. Llamado a la Acción (CTA):**
¿Te gustaría agendar una breve sesión de evaluación de hábitos o registrar tu pedido del dúo Nopaloe + Biomega hoy mismo con entrega prioritaria?`;
  }

  // Cansancio y Fatiga Mitocondrial
  if (lower.includes('cansancio') || lower.includes('fatiga') || lower.includes('energia') || lower.includes('agotado') || lower.includes('dormir') || lower.includes('sueno')) {
    return `**1. Empatía Transformacional:**
Sé exactamente lo frustrante que resulta levantarse cansado aún después de haber dormido, sintiendo que la energía se agota a mitad de la tarde.

**2. Educación Epigenética:**
La falta de vitalidad crónica no es falta de voluntad; es un bloqueo en la cadena respiratoria mitocondrial y una sobrecarga de radicales libres que el cuerpo no logra depurar porque la vía antioxidante NRF2 está inactiva. Ángel Manuel Breña Eulogio, en sus investigaciones de laboratorio, demostró que nutriendo la bomba Na⁺/K⁺ ATPasa con adaptógenos puros, la célula recupera su potencial electrofisiológico de membrana.

**3. Prescripción Nutricional:**
- **Enercell + ION**: Tomar en ayunas disuelto en agua templada. La combinación sinérgica de maca negra, ginseng, té verde, açaí, espirulina y magnesio estimula la biogénesis mitocondrial sin provocar picos artificiales de glucosa.
- **MULTIBATIDO**: En el desayuno o media tarde para sostener la masa magra con proteína balanceada y quinua gelatinizada.

**4. Llamado a la Acción (CTA):**
Permíteme habilitar tu registro en el sistema con el Pack de Activación Energética 100 BV. ¿Prefieres coordinar el envío a tu domicilio ahora mismo?`;
  }

  // Moringa Hiperanthera y hervor 2-6 min
  if (lower.includes('moringa') || lower.includes('hervir') || lower.includes('minutos') || lower.includes('fitoquimic')) {
    return `**1. Empatía Transformacional:**
Qué excelente pregunta técnica. Comprender cómo la temperatura transforma la fitoterapia es el sello de los verdaderos apasionados por la ciencia celular.

**2. Educación Epigenética & Química Analítica:**
Como explica Ángel Manuel, Analista Químico y Educador Científico, la pared celular vegetal de la *Moringa Hiperanthera* contiene glucosinolatos y polifenoles atrapados en vacuolas rígidas. 
- Al someter el polvo botánico a un hervor controlado de **2 a 6 minutos**, se produce la ruptura hidrotérmica de la pared celulósica sin desnaturalizar las moléculas termolábiles.
- Este proceso biofísico libera los **isotiocianatos libres y quercetinas**, haciéndolos 100% biodisponibles para penetrar la barrera intestinal y translocar el factor NRF2 en el núcleo celular.

**3. Prescripción Nutricional:**
- Agregar 1 cucharadita dosificadora de **Moringa Hiperanthera** en agua hirviendo, caldos o sopas tibias durante 2 a 6 minutos exactos.
- Tomar al almuerzo o media tarde como escudo antioxidante diario.

**4. Llamado a la Acción (CTA):**
¿Deseas agregar la Moringa Hiperanthera a tu paquete mensual con tu código de descuento de socio?`;
  }

  // Objeción: "Ya tomo suplementos o vitaminas de farmacia"
  if (lower.includes('vitamina') || lower.includes('farmacia') || lower.includes('suplemento') || lower.includes('sintetico') || lower.includes('botica')) {
    return `**1. Empatía Transformacional:**
Valoro muchísimo que ya tengas el hábito de cuidar tu salud. Eso demuestra que eres una persona proactiva y comprometida con tu bienestar.

**2. Educación Epigenética:**
Existe una diferencia fundamental que Ángel Manuel enseña con rigor analítico: la suplementación sintética de farmacia entrega megadosis de moléculas aisladas que el receptor celular muchas veces desconoce o excreta en la orina. La nutrición epigenética de AB Natural Networkers no satura: entrega fitocomplejos enteros con adaptógenos y minerales quelados que activan vías de transcripción genética (NRF2) para que sea tu propio cuerpo el que sintetice Glutatión, SOD y Catalasa endógenos.

**3. Prescripción Nutricional:**
Te invito a sustituir lo sintético por activación biológica genuina:
- **Biomega**: Ácidos grasos vivos con astaxantina sin oxidación térmica.
- **Enercell + ION**: Maca negra y magnesio iónico bioactivo.

**4. Llamado a la Acción (CTA):**
¿Te gustaría experimentar la diferencia durante 14 días con nuestro protocolo básico y comparar tus niveles de vitalidad?`;
  }

  // Plan de Compensación / Negocio / Red / Rangos
  if (lower.includes('negocio') || lower.includes('plan') || lower.includes('compensacion') || lower.includes('comision') || lower.includes('regalia') || lower.includes('red') || lower.includes('diamante')) {
    return `**1. Empatía Transformacional:**
Emprender en la industria del bienestar requiere visión, un producto que transforme vidas de verdad y un plan de compensación justo, transparente y sostenible.

**2. Educación Epigenética & Modelo de Negocio:**
En *AB Natural Networkers*, dirigido por Ángel Manuel Breña, el plan está diseñado bajo la filosofía Humanómica:
- **Modelo Uninivel hasta 30 Niveles con Compresión Dinámica**: Sin candados absurdos ni ciclos forzados.
- **9 Rangos de Carrera Oficiales**: Desde Bronce hasta Diamante Ejecutivo y Maestro, con bonos de ascenso de hasta $75,000 USD.
- **30% de Descuento Inmediato**: En todos los productos para socios con membresía vigente.
- **20% de Bono de Patrocinio Directo**: En la compra del primer paquete de cada nuevo afiliado.
- **Pool Global del 5%**: Para líderes calificados de rango Diamante en adelante.

**3. Prescripción de Inicio:**
Para iniciar con la máxima aceleración y liderazgo:
- **Pack Diamante (600 BV)**: Stock completo de productos, posición preferente y pase VIP a mentoría 1 a 1 con Ángel Manuel.
- **Pack Empresarial (300 BV)** o **Pack Ejecutivo (100 BV)**: Opciones accesibles para arranque inmediato.

**4. Llamado a la Acción (CTA):**
¿Te gustaría que te genere un código QR de patrocinio con el Pack Diamante para registrarte ahora mismo bajo la línea directa de Ángel Breña?`;
  }

  // Biografía / Autoridad del Fundador Ángel Manuel Breña Eulogio
  if (lower.includes('angel') || lower.includes('fundador') || lower.includes('breña') || lower.includes('brena') || lower.includes('orcid') || lower.includes('quimico')) {
    return `**1. Empatía Transformacional:**
Es un honor presentarte al líder y científico detrás de cada fórmula y concepto de nuestro ecosistema.

**2. Autoridad y Trayectoria Científica:**
Ángel Manuel Breña Eulogio es Investigador, Educador Científico Multidisciplinario, Empresario y Creador de la metodología Humanómica.
- **Formación**: Profesional Técnico en Tecnología de Análisis Químico (IESTP Simón Bolívar) y Bachiller en Ciencias de la Educación con mención en Biología y Ciencias Naturales (UNE Enrique Guzmán y Valle). Registra publicaciones científicas indexadas (ORCID 0000-0002-3091-0123) y estudios de Maestría en Nutrición (UNIFÉ).
- **Experiencia Industrial**: Gerente Titular de FORCEXCORP E.I.R.L. y ex Jefe de Planta de Green Care del Perú S.A., con amplia experiencia en control de calidad, formulación de productos naturales e inocuidad alimentaria.
- **Gobernanza**: Conciliador Extrajudicial acreditado por el Ministerio de Justicia y Derechos Humanos (MINJUS).
*(Nota: Ángel Manuel se define como Analista Químico y Educador Científico).*

**3. Obra Principal:**
Autor del libro *"Reprograma tu Vida: Amor, Naturaleza y Ciencia - Activación Epigenética Integral"*, donde condensa los 8 Pilares de Humanómica.

**4. Llamado a la Acción (CTA):**
¿Deseas acceder a la copia digital del libro o registrarte en el Sistema Educativo AB para formarte como líder certificado?`;
  }

  // Generic 4-step Humanomica response
  return `**1. Empatía Transformacional:**
Gracias por tu consulta. En el ecosistema Humanómica entendemos que cada síntoma, inquietud o meta de negocio es una oportunidad para alinear biología, mente y propósito.

**2. Educación Epigenética:**
Como sintetiza Ángel Manuel Breña Eulogio: "La genética carga el arma, pero la epigenética decide si se dispara". El 90% de tu bienestar depende de las señales que recibe tu célula: activación de la vía NRF2 para producir glutatión endógeno, modulación del factor nuclear inflamatorio NF-κB y restauración de las membranas con omegas puros en frío.

**3. Prescripción Nutricional de Precisión:**
Nuestra tríada de arranque comprobada:
- **Enercell + ION**: Maca negra y magnesio para la bioenergética mitocondrial.
- **Nopaloe RF03**: Regeneración mucosa gástrica y balance prebiótico.
- **Biomega**: Bicapa fosfolipídica flexible con astaxantina natural.

**4. Llamado a la Acción (CTA):**
¿Deseas activar hoy tu código de socio preferencial con el 30% de descuento o explorar cómo construir tu red en AB Natural Networkers? ¡Estoy aquí para asesorarte en cada paso!`;
}

// Candidate models ordered by standard availability and low latency
const CANDIDATE_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash-lite'];

// API endpoint for Sofia AI
app.post('/api/sofia/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], mode = 'general' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'El mensaje es obligatorio' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        let contextualPrompt = SOFIA_SYSTEM_INSTRUCTION;
        if (mode === 'ventas') {
          contextualPrompt += `\nMODO ACTIVO: Entrenamiento de Ventas y Cierre para Socios Distribuidores. Guía al distribuidor en la aplicación práctica de los 4 pasos y manejo de objeciones.`;
        } else if (mode === 'epigenetica') {
          contextualPrompt += `\nMODO ACTIVO: Cátedra y Diagnóstico Educativo Epigenético. Detalla con precisión bioquímica (NRF2, NF-kB, Glutatión, SOD, membrana, microbiota) y citas a la obra de Ángel Manuel Breña Eulogio.`;
        } else if (mode === 'objeciones') {
          contextualPrompt += `\nMODO ACTIVO: Simulador de Manejo de Objeciones de Alta Conversión. Desarma objeciones con elegancia científica y empatía.`;
        }

        const formattedHistory = Array.isArray(history) 
          ? history.slice(-6).map((h: any) => ({
              role: h.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: String(h.content || '') }]
            }))
          : [];

        const contents = [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ];

        // Attempt generation with model cascading to withstand quota constraints
        let reply: string | null = null;
        let modelUsed = '';

        for (const candidate of CANDIDATE_MODELS) {
          try {
            const response = await ai.models.generateContent({
              model: candidate,
              contents,
              config: {
                systemInstruction: contextualPrompt,
                temperature: 0.7,
                maxOutputTokens: 1000,
              }
            });

            if (response.text) {
              reply = response.text;
              modelUsed = candidate;
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Model ${candidate} encountered issue, checking next candidate:`, modelErr?.status || modelErr?.message || modelErr);
          }
        }

        if (reply) {
          res.json({ reply, source: 'gemini', model: modelUsed });
          return;
        }
      } catch (err: any) {
        console.warn('Gemini API call failed, using high-fidelity fallback:', err?.message || err);
      }
    }

    // High fidelity fallback when no API key, on quota exhaustion, or on error
    const fallbackReply = generateStructuredFallback(message, mode);
    res.json({ reply: fallbackReply, source: 'sofia_engine' });
  } catch (error: any) {
    console.error('Error handling /api/sofia/chat:', error);
    // Never crash the client UI - always return structured Humanomica knowledge
    const safeReply = generateStructuredFallback(req.body?.message || 'general', req.body?.mode || 'general');
    res.json({ reply: safeReply, source: 'sofia_safe_engine' });
  }
});

// Quick health check
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    system: 'Sofía Humanómica & Backoffice Pro',
    founder: 'Ángel Manuel Breña Eulogio',
    orcid: '0000-0002-3091-0123',
    domain: 'https://ab-natural-networkers.sistemaeducativoab.chatgpt.site/',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Multinivel Master Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
