import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  Key, Copy, Check, Share2, QrCode, Sparkles, UserPlus, CheckCircle2, 
  ExternalLink, Smartphone, Clock, Award, Download, Users, RefreshCw, 
  X, Eye, FileText, ArrowRight, ShieldCheck, Gem
} from 'lucide-react';
import { SponsorCode, Affiliate } from '../types';

interface CodeGeneratorViewProps {
  codes: SponsorCode[];
  onAddCode: (code: SponsorCode) => void;
  affiliates?: Affiliate[];
}

export const CodeGeneratorView: React.FC<CodeGeneratorViewProps> = ({ 
  codes, 
  onAddCode,
  affiliates = []
}) => {
  // Navigation between Personal Affiliate QR vs Prospect Code Generator
  const [activeTab, setActiveTab] = useState<'personal' | 'prospecto'>('personal');

  // Personal QR state
  const defaultAffiliate = affiliates[0] || {
    id: 'aff-1',
    code: 'AB-DIAMOND-001',
    name: 'Ángel Breña',
    rank: 'Diamante Ejecutivo'
  };
  const [selectedAffiliateId, setSelectedAffiliateId] = useState<string>(defaultAffiliate.id);
  const [selectedLinkType, setSelectedLinkType] = useState<'paquete' | 'gratis' | 'tienda' | 'membresia' | 'pre'>('paquete');

  // Prospect generator form state
  const [prospectName, setProspectName] = useState('');
  const [selectedPack, setSelectedPack] = useState<'ejecutivo' | 'empresarial' | 'diamante' | 'reset90'>('ejecutivo');
  const [generatedCode, setGeneratedCode] = useState<string>('HUMAN-2026-4591');
  const [generatedLink, setGeneratedLink] = useState<string>(
    'https://ab-natural-networkers.sistemaeducativoab.chatgpt.site/afiliar?ref=AB-DIAMOND-001&code=HUMAN-2026-4591&pack=ejecutivo'
  );

  // QR preview states
  const [personalQrSvg, setPersonalQrSvg] = useState<string>('');
  const [personalQrDataUrl, setPersonalQrDataUrl] = useState<string>('');
  const [prospectQrSvg, setProspectQrSvg] = useState<string>('');
  const [prospectQrDataUrl, setProspectQrDataUrl] = useState<string>('');

  // Modal for viewing/downloading QR of any past code
  const [viewingCodeModal, setViewingCodeModal] = useState<SponsorCode | null>(null);
  const [modalQrSvg, setModalQrSvg] = useState<string>('');
  const [modalQrDataUrl, setModalQrDataUrl] = useState<string>('');

  // Feedbacks
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [copiedProspect, setCopiedProspect] = useState(false);
  const [copiedModal, setCopiedModal] = useState(false);

  // Available packages config
  const packsConfig = {
    ejecutivo: { name: 'Pack Ejecutivo (100 BV)', bv: 100, price: 150, description: '1 Enercell + 1 Nopaloe + 1 Biomega' },
    empresarial: { name: 'Pack Empresarial (300 BV)', bv: 300, price: 400, description: 'Surtido completo con 20% de descuento adicional' },
    diamante: { name: 'Pack Diamante (600 BV)', bv: 600, price: 750, description: 'Stock completo para líderes con pase VIP a Asesoría 1 a 1' },
    reset90: { name: 'Pack Reset Celular 90 Días (500 BV)', bv: 500, price: 650, description: 'Protocolo trimestral completo con libro incluido' },
  };

  // Find active affiliate
  const currentAffiliate = affiliates.find(a => a.id === selectedAffiliateId) || defaultAffiliate;
  const baseDomain = 'https://ab-natural-networkers.sistemaeducativoab.chatgpt.site';

  // Referral link options for personal affiliate
  const linkTypeDefinitions = {
    paquete: {
      label: 'Afiliación con Paquete',
      url: `${baseDomain}/afiliar?ref=${currentAffiliate.code}&tipo=paquete`,
      description: 'Invita a nuevos socios con kits de inicio y activación inmediata de puntos BV.'
    },
    gratis: {
      label: 'Registro Gratuito (Cliente)',
      url: `${baseDomain}/registro-libre?ref=${currentAffiliate.code}`,
      description: 'Acceso para clientes o usuarios que desean conocer el catálogo sin costo inicial.'
    },
    tienda: {
      label: 'Tienda Virtual Replicada',
      url: `${baseDomain}/tienda?sponsor=${currentAffiliate.code}`,
      description: 'Enlace para ventas por catálogo. Las comisiones por ventas se acreditan a tu cuenta.'
    },
    membresia: {
      label: 'Invitación a Membresía',
      url: `${baseDomain}/membresias?ref=${currentAffiliate.code}`,
      description: 'Enfocado en membresías anuales con 30% de descuento directo en todos los productos.'
    },
    pre: {
      label: 'Preafiliación (Reserva)',
      url: `${baseDomain}/preafiliacion?ref=${currentAffiliate.code}`,
      description: 'Permite al prospecto reservar su posición en el derrame antes de realizar el pago.'
    }
  };

  const personalLink = linkTypeDefinitions[selectedLinkType].url;

  // Generate QR for Personal Affiliate Link
  useEffect(() => {
    let isMounted = true;
    QRCode.toString(personalLink, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#020617',
        light: '#ffffff'
      }
    }).then(svg => {
      if (isMounted) setPersonalQrSvg(svg);
    }).catch(err => console.error('Error generating personal SVG QR:', err));

    QRCode.toDataURL(personalLink, {
      width: 600,
      margin: 2,
      color: {
        dark: '#020617',
        light: '#ffffff'
      }
    }).then(dataUrl => {
      if (isMounted) setPersonalQrDataUrl(dataUrl);
    }).catch(err => console.error('Error generating personal DataURL QR:', err));

    return () => { isMounted = false; };
  }, [personalLink]);

  // Generate QR for Prospect Generated Link
  useEffect(() => {
    let isMounted = true;
    QRCode.toString(generatedLink, {
      type: 'svg',
      margin: 2,
      color: {
        dark: '#020617',
        light: '#ffffff'
      }
    }).then(svg => {
      if (isMounted) setProspectQrSvg(svg);
    }).catch(err => console.error('Error generating prospect SVG QR:', err));

    QRCode.toDataURL(generatedLink, {
      width: 600,
      margin: 2,
      color: {
        dark: '#020617',
        light: '#ffffff'
      }
    }).then(dataUrl => {
      if (isMounted) setProspectQrDataUrl(dataUrl);
    }).catch(err => console.error('Error generating prospect DataURL QR:', err));

    return () => { isMounted = false; };
  }, [generatedLink]);

  // Generate QR when viewing a code in modal
  useEffect(() => {
    if (!viewingCodeModal) return;
    let isMounted = true;
    QRCode.toString(viewingCodeModal.link, {
      type: 'svg',
      margin: 2,
      color: { dark: '#020617', light: '#ffffff' }
    }).then(svg => {
      if (isMounted) setModalQrSvg(svg);
    });

    QRCode.toDataURL(viewingCodeModal.link, {
      width: 600,
      margin: 2,
      color: { dark: '#020617', light: '#ffffff' }
    }).then(dataUrl => {
      if (isMounted) setModalQrDataUrl(dataUrl);
    });

    return () => { isMounted = false; };
  }, [viewingCodeModal]);

  // Download Helpers
  const downloadPng = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSvg = (svgContent: string, fileName: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyPersonal = () => {
    navigator.clipboard.writeText(personalLink);
    setCopiedPersonal(true);
    setTimeout(() => setCopiedPersonal(false), 2500);
  };

  const handleCopyProspect = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedProspect(true);
    setTimeout(() => setCopiedProspect(false), 2500);
  };

  const handleCopyModal = () => {
    if (viewingCodeModal) {
      navigator.clipboard.writeText(viewingCodeModal.link);
      setCopiedModal(true);
      setTimeout(() => setCopiedModal(false), 2500);
    }
  };

  const handleShareWhatsAppPersonal = () => {
    const text = `¡Hola! 🌱 Te comparto mi enlace oficial de *AB Natural Networkers* bajo la dirección de Ángel Breña.\n\n🔗 ${linkTypeDefinitions[selectedLinkType].label}:\n${personalLink}\n\n¡Comencemos juntos tu transformación biológica y financiera! ✨`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareWhatsAppProspect = () => {
    const pack = packsConfig[selectedPack];
    const text = `¡Hola ${prospectName || 'amigo/a'}! 🌱 Te comparto tu enlace exclusivo de afiliación a *AB Natural Networkers*:\n\n📦 Paquete: *${pack.name}* ($${pack.price})\n🔑 Código: *${generatedCode}*\n🔗 Registro directo: ${generatedLink}\n\n¡Bienvenido a tu transformación biológica y financiera! ✨`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Form handle for generating a prospect code
  const handleGenerateProspectCode = (e: React.FormEvent) => {
    e.preventDefault();
    const name = prospectName.trim() || 'Nuevo Socio';
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const newCode = `HUMAN-2026-${randDigits}`;
    const pack = packsConfig[selectedPack];
    const newLink = `${baseDomain}/afiliar?ref=${currentAffiliate.code}&code=${newCode}&pack=${selectedPack}`;

    setGeneratedCode(newCode);
    setGeneratedLink(newLink);

    const newSponsorCode: SponsorCode = {
      id: `code-${Date.now()}`,
      code: newCode,
      prospectName: name,
      packageName: pack.name,
      bv: pack.bv,
      price: pack.price,
      sponsor: currentAffiliate.name,
      link: newLink,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'activo'
    };

    onAddCode(newSponsorCode);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Generador de Enlaces & Códigos QR Únicos</span>
                <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/20">
                  SVG & PNG HD
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Genera, visualiza y descarga códigos QR vectoriales y de alta resolución para patrocinio inmediato.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switch between Personal QR & Prospect Generator */}
        <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center text-xs">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'personal'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Código QR del Afiliado</span>
          </button>
          <button
            onClick={() => setActiveTab('prospecto')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'prospecto'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Generar para Prospecto</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PERSONAL AFFILIATE QR CODE GENERATOR & VIEWER */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
          {/* Controls & Affiliate Selector */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
            <div>
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Configurar Código QR de Patrocinio</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Selecciona al afiliado y el tipo de enlace para generar automáticamente el código QR listo para compartir.
              </p>
            </div>

            {/* Affiliate Dropdown Selector (Supports all affiliates in network) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Afiliado Titular de la Red:
              </label>
              <select
                value={selectedAffiliateId}
                onChange={(e) => setSelectedAffiliateId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
              >
                {affiliates.map((aff) => (
                  <option key={aff.id} value={aff.id}>
                    {aff.name} ({aff.code}) — Rango: {aff.rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Link Type Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Tipo de Enlace Personal a Vincular:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(linkTypeDefinitions) as Array<keyof typeof linkTypeDefinitions>).map((key) => {
                  const item = linkTypeDefinitions[key];
                  const isSelected = selectedLinkType === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setSelectedLinkType(key)}
                      className={`text-left p-3.5 rounded-2xl border transition-all text-xs ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-md ring-1 ring-amber-500/30'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-amber-300 font-bold">{item.label}</strong>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Link URL Bar */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">
                URL Personal de Patrocinio Enlazada:
              </span>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 break-all select-all flex items-center justify-between">
                <span>{personalLink}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleCopyPersonal}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-2xl transition text-xs flex items-center justify-center space-x-2 border border-slate-700 shadow"
              >
                {copiedPersonal ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPersonal ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
              </button>

              <button
                onClick={handleShareWhatsAppPersonal}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-2xl transition text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
              >
                <Smartphone className="w-4 h-4" />
                <span>Enviar por WhatsApp</span>
              </button>
            </div>
          </div>

          {/* QR Display Card with Download Options */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col justify-between items-center text-center space-y-5">
            <div className="w-full space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 inline-flex items-center gap-1.5 uppercase">
                <Gem className="w-3 h-3 text-amber-400" /> Código QR Oficial
              </span>
              <h4 className="font-extrabold text-white text-lg">{currentAffiliate.name}</h4>
              <p className="text-xs font-mono text-cyan-400">{currentAffiliate.code}</p>
            </div>

            {/* Rendered SVG QR Canvas */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl border-4 border-amber-400/80 max-w-[260px] w-full aspect-square flex items-center justify-center relative group">
              {personalQrSvg ? (
                <div 
                  className="w-full h-full flex items-center justify-center text-slate-950 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: personalQrSvg }} 
                />
              ) : (
                <div className="text-slate-400 text-xs animate-pulse">Generando QR...</div>
              )}
            </div>

            {/* Info Badge */}
            <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-2xl border border-slate-800 w-full space-y-0.5">
              <span className="text-white font-bold block">{linkTypeDefinitions[selectedLinkType].label}</span>
              <span className="text-[11px] text-slate-400">Escaneable desde cualquier smartphone con cámara o app de QR.</span>
            </div>

            {/* Download Buttons: PNG and SVG */}
            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => downloadPng(personalQrDataUrl, `QR_${currentAffiliate.name.replace(/\s+/g, '_')}_${selectedLinkType}`)}
                className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold py-3 rounded-2xl shadow-lg transition text-xs flex items-center justify-center space-x-2"
                title="Descargar imagen PNG de alta resolución"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Código QR (PNG Alta Calidad)</span>
              </button>

              <button
                onClick={() => downloadSvg(personalQrSvg, `QR_${currentAffiliate.name.replace(/\s+/g, '_')}_${selectedLinkType}`)}
                className="w-full bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold py-2.5 rounded-2xl border border-slate-700 transition text-xs flex items-center justify-center space-x-2"
                title="Descargar vector SVG para diseñadores o imprenta"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Descargar Vectorial (SVG)</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: PROSPECT CODE GENERATOR (With Package BV and Instant QR) */}
      {activeTab === 'prospecto' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
          {/* Generator Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Generar Código Específico para Prospecto</h3>
                <p className="text-xs text-slate-400">Personaliza el kit de ingreso para un prospecto y genera su QR individual</p>
              </div>
            </div>

            <form onSubmit={handleGenerateProspectCode} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 mb-1.5">
                  Nombre Completo del Socio Prospecto
                </label>
                <input
                  type="text"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder="Ej. Rosaura Gómez Silva (Medellín)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1.5">
                  Seleccionar Paquete de Activación de Ingreso
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(packsConfig) as Array<keyof typeof packsConfig>).map((key) => {
                    const p = packsConfig[key];
                    const isSelected = selectedPack === key;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setSelectedPack(key)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500/30'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white text-xs">{p.name}</span>
                          <span className="font-extrabold text-emerald-400">${p.price}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">{p.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all text-xs flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Código Único y Código QR</span>
                </button>
              </div>
            </form>
          </div>

          {/* Generated Prospect Card with Real QR */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col justify-between items-center text-center space-y-5">
            <div className="w-full space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Código para Prospecto
              </span>
              <h4 className="font-black text-xl font-mono text-emerald-400 mt-1">{generatedCode}</h4>
              <p className="text-xs text-slate-400">{packsConfig[selectedPack].name}</p>
            </div>

            {/* Prospect QR Preview */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl border-4 border-cyan-500/80 max-w-[240px] w-full aspect-square flex items-center justify-center">
              {prospectQrSvg ? (
                <div 
                  className="w-full h-full flex items-center justify-center text-slate-950 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: prospectQrSvg }} 
                />
              ) : (
                <div className="text-slate-400 text-xs animate-pulse">Generando QR...</div>
              )}
            </div>

            {/* Direct Link Box */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 w-full text-left space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Enlace con Token y Paquete:</span>
              <p className="font-mono text-[11px] text-slate-300 break-all select-all">
                {generatedLink}
              </p>
            </div>

            {/* Actions for prospect */}
            <div className="w-full space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyProspect}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl transition text-xs flex items-center justify-center space-x-1.5 border border-slate-700"
                >
                  {copiedProspect ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedProspect ? 'Copiado' : 'Copiar'}</span>
                </button>

                <button
                  onClick={handleShareWhatsAppProspect}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition text-xs flex items-center justify-center space-x-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => downloadPng(prospectQrDataUrl, `QR_Prospecto_${generatedCode}`)}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold py-2.5 rounded-xl border border-slate-700 transition text-xs flex items-center justify-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar PNG</span>
                </button>
                <button
                  onClick={() => downloadSvg(prospectQrSvg, `QR_Prospecto_${generatedCode}`)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-2.5 rounded-xl border border-slate-700 transition text-xs flex items-center justify-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Descargar SVG</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: GENERATED CODES HISTORY TABLE (WITH QR VIEW MODAL ACTION) */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h4 className="font-bold text-white text-base">Historial de Códigos Generados & Descarga de QR</h4>
            <p className="text-xs text-slate-400">Haz clic en "Ver & Descargar QR" en cualquier registro para obtener su imagen</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
            {codes.length} Códigos Registrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5 rounded-l-2xl">Código Único</th>
                <th className="p-3.5">Prospecto</th>
                <th className="p-3.5">Paquete & Puntos</th>
                <th className="p-3.5">Precio</th>
                <th className="p-3.5">Fecha</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 rounded-r-2xl text-right">Código QR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {codes.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-cyan-400">{c.code}</td>
                  <td className="p-3.5 font-medium text-white">{c.prospectName}</td>
                  <td className="p-3.5 text-slate-300">
                    {c.packageName} <span className="text-slate-500 font-bold">({c.bv} BV)</span>
                  </td>
                  <td className="p-3.5 font-bold text-white">${c.price}</td>
                  <td className="p-3.5 text-slate-400">{c.createdAt}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      c.status === 'activo'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {c.status === 'activo' ? '⏳ Pendiente Registro' : '✓ Canjeado & Activo'}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setViewingCodeModal(c)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white border border-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition shadow-sm"
                      title="Ver y descargar código QR de este prospecto"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Ver & Descargar QR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: VIEW & DOWNLOAD QR FOR A PAST CODE */}
      {viewingCodeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setViewingCodeModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase">
                Código QR de Afiliación
              </span>
              <h3 className="text-lg font-black text-white">{viewingCodeModal.prospectName}</h3>
              <p className="text-xs font-mono text-cyan-400 font-bold">{viewingCodeModal.code}</p>
            </div>

            {/* QR Render */}
            <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-cyan-500 max-w-[220px] mx-auto aspect-square flex items-center justify-center">
              {modalQrSvg ? (
                <div 
                  className="w-full h-full flex items-center justify-center text-slate-950 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: modalQrSvg }} 
                />
              ) : (
                <div className="text-slate-400 text-xs">Cargando QR...</div>
              )}
            </div>

            {/* Link Details */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs text-left">
              <div className="flex justify-between text-slate-400">
                <span>Paquete asignado:</span>
                <strong className="text-white">{viewingCodeModal.packageName}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Puntos de volumen:</span>
                <strong className="text-cyan-400">{viewingCodeModal.bv} BV</strong>
              </div>
              <div className="pt-1.5 border-t border-slate-800 text-[11px] font-mono text-slate-300 break-all select-all">
                {viewingCodeModal.link}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => downloadPng(modalQrDataUrl, `QR_${viewingCodeModal.code}`)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar PNG</span>
                </button>
                <button
                  onClick={() => downloadSvg(modalQrSvg, `QR_${viewingCodeModal.code}`)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Descargar SVG</span>
                </button>
              </div>

              <button
                onClick={handleCopyModal}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2"
              >
                {copiedModal ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedModal ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
