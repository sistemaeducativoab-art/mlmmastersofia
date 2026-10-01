import React from 'react';
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const ComplianceView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center space-x-2.5">
          <Scale className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Transparencia, Marco Legal & Código de Ética MLM</h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          AB Natural Networkers opera bajo los más altos estándares internacionales de venta directa, comercio electrónico legítimo y protección al consumidor.
        </p>
      </div>

      {/* Disclaimers & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Basado en Ventas Reales de Productos</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Las comisiones, regalías y bonos provienen exclusivamente de la comercialización y consumo efectivo de productos naturales y de precisión celular. No se paga por el mero hecho de incorporar personas.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Descargo de Ingresos (Income Disclaimer)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Los ingresos mostrados en simuladores y ejemplos son proyecciones matemáticas ilustrativas. Los resultados individuales dependen estrictamente de la dedicación, habilidad comercial y esfuerzo de cada socio independiente.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Protección de Datos & Privacidad</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Cumplimiento riguroso de la Ley de Protección de Datos Personales. La información de los socios se utiliza únicamente para fines de facturación, entrega de pedidos y cálculo de comisiones.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-sky-400 font-bold">
            <FileText className="w-4 h-4" />
            <span>Política de Garantía & Devoluciones</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Los clientes y nuevos afiliados cuentan con derecho de desistimiento de 14 días para productos en su embalaje original cerrado y no manipulado, según la normativa de defensa del consumidor.
          </p>
        </div>
      </div>

      {/* Accordion / Terms Summary */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-xs text-slate-300">
        <h3 className="font-bold text-white text-sm">Compromiso con el Modelo de Negocio Sostenible</h3>
        <p className="leading-relaxed">
          En <strong>AB Natural Networkers</strong>, bajo el liderazgo de <strong>Ángel Manuel Breña Eulogio</strong>, creemos firmemente que la verdadera abundancia nace de mejorar la salud celular de las personas con fórmulas estandarizadas de alta biodisponibilidad.
        </p>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
          * Para consultas legales o de cumplimiento normativo, escribe a: <code>cumplimiento@abnetworkers.com</code>
        </div>
      </div>
    </div>
  );
};
