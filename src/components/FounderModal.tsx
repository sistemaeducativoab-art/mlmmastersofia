import React from 'react';
import { X, Award, ExternalLink, FlaskConical, GraduationCap, Building2, Scale, BookOpen, CheckCircle2, ShieldCheck, Dna } from 'lucide-react';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderModal: React.FC<FounderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-1 shadow-xl shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-center p-2">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                    ÁB
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fundador</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Ángel Manuel Breña Eulogio
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Verificado
                </span>
              </div>
              <p className="text-sm font-semibold text-emerald-400">
                Analista Químico & Educador Científico Multidisciplinario
              </p>
              <p className="text-xs text-slate-400 max-w-xl">
                Investigador, Empresario, Autor y Creador de la metodología Humanómica y la activación celular de precisión.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* ORCID & Scientific Verification */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold border border-emerald-500/20">
                ID
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Registro Científico Internacional (ORCID)</span>
                <span className="text-sm font-mono font-bold text-white tracking-wide">
                  0000-0002-3091-0123
                </span>
              </div>
            </div>
            <a
              href="https://orcid.org/0000-0002-3091-0123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
            >
              <span>Ver Perfil ORCID</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Academic & Industrial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Formación Académica */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>Formación Académica</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Profesional Técnico en Tecnología de Análisis Químico</strong> — IESTP Simón Bolívar.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Bachiller en Ciencias de la Educación</strong> con mención en Biología y Ciencias Naturales — UNE Enrique Guzmán y Valle.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Estudios de Maestría en Nutrición</strong> — Universidad Femenina del Sagrado Corazón (UNIFÉ).</span>
                </li>
              </ul>
            </div>

            {/* Trayectoria Industrial */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <FlaskConical className="w-4 h-4" />
                <span>Industria & Laboratorio</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Gerente Titular</strong> en FORCEXCORP E.I.R.L.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>Ex Jefe de Planta</strong> en Green Care del Perú S.A.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Especialista en control cuali-cuantitativo, formulación de fitocéuticos e inocuidad alimentaria.</span>
                </li>
              </ul>
            </div>

            {/* Gobernanza & Conciliación */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <Scale className="w-4 h-4" />
                <span>Gobernanza & Mediación</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Conciliador Extrajudicial acreditado</strong> por el Ministerio de Justicia y Derechos Humanos (MINJUS), impulsando una cultura de integridad, acuerdos justos y liderazgo transformacional.
              </p>
            </div>

            {/* Obra y Metodología */}
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Obra & Humanómica</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Autor de <em>"Reprograma tu Vida: Amor, Naturaleza y Ciencia - Activación Epigenética Integral"</em> y creador del Sistema de los 8 Pilares de Humanómica y la metodología de 4 pasos de venta ética.
              </p>
            </div>

          </div>

          {/* Nota de Estilo y Rigor Científico */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Criterio Oficial del Ecosistema:</strong> Refiérete siempre al fundador como <em>Ángel Manuel, Analista Químico y Educador Científico</em>. Toda formulación botánica cuenta con respaldo analítico de laboratorio y estricto control fisicoquímico.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Cerrar Credenciales
          </button>
        </div>

      </div>
    </div>
  );
};
