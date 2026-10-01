import React, { useState } from 'react';
import { 
  BookOpen, Dna, Heart, Brain, Sun, Users, Award, Shield, Sparkles, 
  Flame, CheckCircle2, ChevronRight, ExternalLink, Activity, ArrowRight
} from 'lucide-react';

export const HumanomicaEcosystemView: React.FC = () => {
  const [activeBiochemTab, setActiveBiochemTab] = useState<'nrf2' | 'nfkb' | 'membrane' | 'microbiota'>('nrf2');

  const pillars = [
    { num: '01', title: 'Biología Celular', desc: 'Nutrición molecular de precisión, activación de NRF2 y respiración mitocondrial.', icon: Dna, color: 'text-emerald-400' },
    { num: '02', title: 'Mente & Epigenética', desc: 'Reprogramación de creencias, neuroplasticidad y superación de límites biológicos.', icon: Brain, color: 'text-blue-400' },
    { num: '03', title: 'Emociones & Coherencia', desc: 'Bioquímica del perdón y el amor frente a la inflamación inducida por cortisol.', icon: Heart, color: 'text-rose-400' },
    { num: '04', title: 'Hábitos Circadianos', desc: 'Sincronización con la luz natural, descanso profundo y ayuno biológico.', icon: Sun, color: 'text-amber-400' },
    { num: '05', title: 'Relaciones & Entorno', desc: 'Campos electromagnéticos humanos, resonancia social y comunidades sanadoras.', icon: Users, color: 'text-purple-400' },
    { num: '06', title: 'Autoliderazgo', desc: 'Coherencia ética, disciplina consciente y gobierno de uno mismo.', icon: Award, color: 'text-indigo-400' },
    { num: '07', title: 'Economía Consciente', desc: 'Prosperidad a través del servicio, red multinivel y libertad financiera legítima.', icon: Sparkles, color: 'text-teal-400' },
    { num: '08', title: 'Propósito Trascendente', desc: 'Alineación de la vida individual con la evolución armónica de la humanidad.', icon: Shield, color: 'text-cyan-400' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Hero: Reprograma tu Vida */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Libro & Metodología Central
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Reprograma tu Vida: Amor, Naturaleza y Ciencia
            </h2>
            <p className="text-sm font-semibold text-emerald-300">
              Activación Epigenética Integral • Por Ángel Manuel Breña Eulogio
            </p>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              "La genética carga el arma, pero la epigenética decide si se dispara". El 90% de nuestra salud y longevidad depende de las señales biológicas, químicas y emocionales que recibe la célula a través de su membrana. No hay enfermedades hereditarias inevitables; hay células desprogramadas.
            </p>
          </div>

          <div className="shrink-0 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center space-y-2">
            <div className="w-16 h-20 mx-auto rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex flex-col items-center justify-center shadow-lg text-white font-black text-xs p-1">
              <span>REPROGRAMA</span>
              <span className="text-[9px] font-normal">TU VIDA</span>
            </div>
            <span className="text-xs font-bold text-white block">Guía Master Digital & Física</span>
            <span className="text-[11px] text-emerald-400 font-semibold block">Protocolo de 8 Pilares</span>
          </div>
        </div>
      </div>

      {/* The 8 Pillars of Humanomica Grid */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
        <div>
          <h3 className="text-lg font-bold text-white">Los 8 Pilares de Humanómica</h3>
          <p className="text-xs text-slate-400">Arquitectura integral de desarrollo del potencial humano y salud celular</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pil) => {
            const Icon = pil.icon;
            return (
              <div key={pil.num} className="bg-slate-950 border border-slate-800/80 hover:border-emerald-500/40 p-4 rounded-2xl transition-all space-y-2 group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-emerald-400 transition-colors">
                    {pil.num}
                  </span>
                  <div className={`p-2 rounded-xl bg-slate-900 ${pil.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {pil.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Epigenetic Biochemistry Lab: NRF2 vs NF-kB */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">Bioquímica Celular Comparada: Salud vs Inflamación</h3>
            <p className="text-xs text-slate-400">Fundamento científico de las formulaciones de Ángel Manuel Breña Eulogio</p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveBiochemTab('nrf2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeBiochemTab === 'nrf2' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vía NRF2 (Regeneración)
            </button>
            <button
              onClick={() => setActiveBiochemTab('nfkb')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeBiochemTab === 'nfkb' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vía NF-κB (Inflamación)
            </button>
            <button
              onClick={() => setActiveBiochemTab('membrane')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeBiochemTab === 'membrane' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bicapa Fosfolipídica
            </button>
            <button
              onClick={() => setActiveBiochemTab('microbiota')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeBiochemTab === 'microbiota' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Eje Intestino-Cerebro
            </button>
          </div>
        </div>

        {/* Biochem Detail Box */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {activeBiochemTab === 'nrf2' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Dna className="w-4 h-4" />
                <span>Vía NRF2 y el Elemento de Respuesta Antioxidante (ARE)</span>
              </div>
              <p>
                La paz interior, el amor, la gratitud y los fitoquímicos naturales específicos (como los isotiocianatos de la <strong>Moringa Hiperanthera</strong> y los adaptógenos del <strong>Enercell + ION</strong>) activan el factor de transcripción <strong>NRF2</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <strong className="text-white block mb-1">Glutatión Reducido (GSH)</strong>
                  <span>El antioxidante maestro endógeno que neutraliza radicales libres intracelulares.</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <strong className="text-white block mb-1">Superóxido Dismutasa (SOD)</strong>
                  <span>Convierte el anión superóxido citotóxico en peróxido de hidrógeno menos reactivo.</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <strong className="text-white block mb-1">Catalasa</strong>
                  <span>Degrada el peróxido en agua pura y oxígeno, protegiendo la electrofisiología de la membrana.</span>
                </div>
              </div>
            </div>
          )}

          {activeBiochemTab === 'nfkb' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>Hiperactivación de NF-κB por Estrés y Tóxicos</span>
              </div>
              <p>
                El estrés sostenido, el rencor y la comida ultraprocesada elevan cortisol y catecolaminas, induciendo la fosforilación de IκB y liberando al factor nuclear <strong>NF-κB</strong> para translocarse al ADN, produciendo citoquinas proinflamatorias como <strong>Interleucina-6 (IL-6)</strong> y <strong>Factor de Necrosis Tumoral alfa (TNF-α)</strong>.
              </p>
              <p className="text-rose-300 font-medium">
                * Consecuencia: Disfunción mitocondrial, permeabilidad de la membrana y fatiga crónica. El protocolo Humanómica desactiva esta cascada molecular.
              </p>
            </div>
          )}

          {activeBiochemTab === 'membrane' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Biofísica de la Bicapa Fosfolipídica & Omegas en Frío</span>
              </div>
              <p>
                La membrana celular no es una pared estática; es un cristal líquido inteligente. La proporción de ácidos grasos poliinsaturados (Omega 3, 6, 9) y astaxantina presentes en <strong>Biomega</strong> restaura la fluidez de membrana y normaliza la bomba Na⁺/K⁺ ATPasa.
              </p>
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-200">
                <strong>Regla de Oro Analítica:</strong> El Biomega debe ser consumido estrictamente en frío. Someterlo a calentamiento oxida los dobles enlaces de los ácidos grasos transformándolos en peróxidos tóxicos.
              </div>
            </div>
          )}

          {activeBiochemTab === 'microbiota' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>Eje Intestino-Cerebro & Regeneración de la Mucosa</span>
              </div>
              <p>
                El 80% de la serotonina y gran parte del GABA se originan en el tracto entérico. El <strong>Nopaloe RF03</strong> recubre la pared gástrica con mucílagos calmantes de nopal y sábila, restableciendo el bioma simbiótico que comunica directamente con el nervio vago.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cellular Reset Protocols (30, 60, 90 Days) */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">Kits de Reset Celular Epigenético</h3>
          <p className="text-xs text-slate-400">Protocolos intensivos para clientes y distribuidores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400">Kit 30 Días</span>
              <span className="text-xs font-mono text-slate-400 font-bold">150 BV</span>
            </div>
            <h4 className="text-base font-bold text-white">Desintoxicación & Arranque</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Depuración entérica, rehidratación de mucosa con Nopaloe RF03 y activación mitocondrial con Enercell + ION.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold pt-1">
              ✓ Incluye Guía Digital de Reprogramación
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-blue-400">Kit 60 Días</span>
              <span className="text-xs font-mono text-slate-400 font-bold">300 BV</span>
            </div>
            <h4 className="text-base font-bold text-white">Reconstrucción de Membrana</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Incorporación intensiva de Biomega en frío y Moringa Hiperanthera para restablecer canales iónicos y síntesis de SOD.
            </p>
            <div className="text-[11px] text-blue-400 font-semibold pt-1">
              ✓ Seguimiento quincenal de hábitos
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400">Kit 90 Días (Master)</span>
              <span className="text-xs font-mono text-slate-400 font-bold">500 BV</span>
            </div>
            <h4 className="text-base font-bold text-white">Consolidación Epigenética</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              El ciclo completo de recambio celular tisular. Integra Multibatido diario para masa magra y longevidad celular profunda.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold pt-1">
              ✓ Pase VIP a Asesoría 1 a 1 con Ángel Manuel
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
