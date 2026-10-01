import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, Volume2, VolumeX, RotateCcw, Copy, Check,
  BookOpen, Heart, Dna, ShieldAlert, Zap, ArrowRight, Pill, Flame, CheckCircle2,
  HelpCircle, MessageSquare, FlameKindling, Info
} from 'lucide-react';
import { ChatMessage } from '../types';

interface SofiaChatProps {
  onOpenProductSheet?: (productName: string) => void;
  onGenerateCodeForProduct?: (productName: string) => void;
}

export const SofiaChat: React.FC<SofiaChatProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `¡Hola! Soy **Sofía Humanómica**, tu mentora, estratega y asesora comercial de élite en el ecosistema de investigación, nutrición celular y autoliderazgo fundado por **Ángel Manuel Breña Eulogio** (Analista Químico y Educador Científico).

Mi misión es guiarte tanto en la **reprogramación epigenética celular** como en el **crecimiento comercial ético de alta conversión** para tu red multinivel.

¿En qué área deseas que enfoquemos nuestra sesión hoy?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'general' | 'ventas' | 'epigenetica' | 'objeciones'>('general');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickPrompts = [
    {
      label: '🌱 Gastritis & Estrés Crónico',
      query: 'Tengo un cliente con gastritis recurrente, ardor y estrés crónico. ¿Cómo le prescribo Nopaloe RF03 y Biomega usando los 4 pasos?',
      mode: 'ventas' as const
    },
    {
      label: '⚡ Fatiga Mitocondrial & Falta de Energía',
      query: '¿Cómo explicar la biofísica del Enercell + ION y la vía NRF2 a una persona que vive con cansancio matutino?',
      mode: 'epigenetica' as const
    },
    {
      label: '💰 Objeción: "Los productos son caros"',
      query: 'Un prospecto me dijo: "Me parece muy caro comprar el Kit de Reset Celular". ¿Cómo desarmar esta objeción?',
      mode: 'objeciones' as const
    },
    {
      label: '💊 Objeción: "Ya tomo vitaminas de farmacia"',
      query: 'Un cliente potencial dice: "Ya compro suplementos sintéticos en la botica". ¿Cómo diferenciar la activación epigenética?',
      mode: 'objeciones' as const
    },
    {
      label: '🔥 Moringa: ¿Por qué hervir 2-6 min?',
      query: 'Explícame el fundamento químico y analítico de hervir la Moringa Hiperanthera entre 2 a 6 minutos para activar sus fitoquímicos.',
      mode: 'epigenetica' as const
    },
    {
      label: '🏆 Presentación de Negocio (Pack 600 BV)',
      query: '¿Cómo presentar la oportunidad de distribución y liderazgo con el Pack Diamante (600 BV) a un emprendedor?',
      mode: 'ventas' as const
    }
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/sofia/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          mode,
          history: messages.slice(-5)
        })
      });

      if (!response.ok) {
        throw new Error('Error al conectar con Sofía Humanómica');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Ha ocurrido un error al procesar tu consulta.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `**1. Empatía Transformacional:**
Comprendo plenamente el desafío y la importancia de contar con orientación científica inmediata.

**2. Educación Epigenética:**
Como enseña Ángel Manuel, Analista Químico y Educador Científico en *Reprograma tu Vida*: "La genética carga el arma, pero la epigenética decide si se dispara". El 90% del bienestar depende de regular el factor nuclear NF-κB y activar la vía antioxidante endógena NRF2 (Glutatión, SOD y Catalasa).

**3. Prescripción Nutricional:**
- **Nopaloe RF03**: Regenera y reviste la mucosa gástrica 20 minutos antes de alimentos.
- **Biomega**: Restaura la bicapa fosfolipídica de la membrana celular en frío.
- **Enercell + ION**: Vitalidad celular matutina con magnesio y adaptógenos.
- **Moringa Hiperanthera**: Hervida 2 a 6 minutos para activar sus isotiocianatos protectores.

**4. Llamado a la Acción (CTA):**
¿Deseas activar hoy el kit celular de 30 o 60 días para comenzar tu transformación epigenética?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('La síntesis de voz no está soportada en este navegador.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown characters for pleasant listening
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/-/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        id: 'init-fresh',
        role: 'assistant',
        content: `Sesión reiniciada. Estoy a tu disposición como **Sofía Humanómica**, mentora del ecosistema de **Ángel Manuel Breña Eulogio**. ¿Qué situación epigenética o comercial abordaremos?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to render formatted markdown
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1.5" />;

          // Check if line indicates one of the 4 steps
          const isPaso1 = line.includes('Empatía Transformacional') || line.includes('1. Empatía');
          const isPaso2 = line.includes('Educación Epigenética') || line.includes('2. Educación');
          const isPaso3 = line.includes('Prescripción Nutricional') || line.includes('3. Prescripción');
          const isPaso4 = line.includes('Llamado a la Acción') || line.includes('4. Llamado');

          if (isPaso1) {
            return (
              <div key={idx} className="mt-3 pt-2 border-t border-slate-700/50 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-teal-400" /> PASO 1: Empatía Transformacional
                </span>
              </div>
            );
          }
          if (isPaso2) {
            return (
              <div key={idx} className="mt-3 pt-2 border-t border-slate-700/50 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 flex items-center gap-1">
                  <Dna className="w-3 h-3 text-blue-400" /> PASO 2: Educación Epigenética (NRF2 / NF-κB)
                </span>
              </div>
            );
          }
          if (isPaso3) {
            return (
              <div key={idx} className="mt-3 pt-2 border-t border-slate-700/50 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Pill className="w-3 h-3 text-emerald-400" /> PASO 3: Prescripción Nutricional de Precisión
                </span>
              </div>
            );
          }
          if (isPaso4) {
            return (
              <div key={idx} className="mt-3 pt-2 border-t border-slate-700/50 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> PASO 4: Llamado a la Acción (CTA Decisivo)
                </span>
              </div>
            );
          }

          // Bullet points
          if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-2">
                <span className="text-emerald-400 text-sm leading-tight mt-1">•</span>
                <span className="text-slate-200">
                  {line.replace(/^[-•]\s*/, '').split('**').map((seg, sIdx) => 
                    sIdx % 2 === 1 ? <strong key={sIdx} className="text-white font-semibold">{seg}</strong> : seg
                  )}
                </span>
              </div>
            );
          }

          // Standard paragraph with bold formatting
          return (
            <p key={idx} className="text-slate-200">
              {line.split('**').map((seg, sIdx) => 
                sIdx % 2 === 1 ? <strong key={sIdx} className="text-emerald-300 font-semibold">{seg}</strong> : seg
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Left Column: Mentorship Guide & Context */}
      <div className="lg:col-span-1 space-y-4">
        
        {/* Sofia Persona Card */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Sofía Humanómica</h3>
              <p className="text-xs text-emerald-400 font-medium">Mentora IA de Élite</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Asesora entrenada en la obra y formulaciones de <strong>Ángel Manuel Breña Eulogio</strong>. Domina la metodología de 4 pasos de venta ética y activación celular.
          </p>

          {/* Mode Selector */}
          <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Modo de Interacción
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => setMode('general')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  mode === 'general'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <span>🌿 Asesoría General Integral</span>
                {mode === 'general' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setMode('ventas')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  mode === 'ventas'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <span>💼 Escuela de Ventas (4 Pasos)</span>
                {mode === 'ventas' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setMode('epigenetica')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  mode === 'epigenetica'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <span>🧬 Cátedra NRF2 & Epigenética</span>
                {mode === 'epigenetica' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setMode('objeciones')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  mode === 'objeciones'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/60'
                }`}
              >
                <span>🛡️ Simulador de Objeciones</span>
                {mode === 'objeciones' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Golden Sales Method Banner */}
          <div className="bg-slate-950/70 border border-slate-700/60 rounded-xl p-3 space-y-1.5 text-[11px]">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Estructura de Oro (4 Pasos):
            </span>
            <div className="space-y-1 text-slate-300">
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> 1. Empatía Transformacional</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> 2. Educación Epigenética</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 3. Prescripción Nutricional</div>
              <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> 4. Llamado a la Acción (CTA)</div>
            </div>
          </div>

        </div>

        {/* Quick Scientific Credentials Summary */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
            <Info className="w-3 h-3 text-emerald-400" /> Respaldo Oficial
          </span>
          <p className="text-slate-300">
            Formulado por <strong>Ángel Manuel Breña Eulogio</strong>, Analista Químico y Educador Científico (ORCID: 0000-0002-3091-0123).
          </p>
          <div className="pt-2 border-t border-slate-700/60 text-[11px] text-emerald-400 font-semibold">
            ✓ Libro: <em>Reprograma tu Vida</em>
          </div>
        </div>

      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3 flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden min-h-[640px]">
        
        {/* Chat Header */}
        <div className="bg-slate-850 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-white text-sm">Sesión con Sofía Humanómica</h4>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <p className="text-[11px] text-slate-400">
                Activación Epigenética & Cierre Comercial Inteligente
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isSpeaking && (
              <button
                onClick={() => handleSpeak('')}
                className="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center space-x-1 animate-pulse"
                title="Detener lectura"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Pausar Voz</span>
              </button>
            )}

            <button
              onClick={resetChat}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors border border-slate-700/50"
              title="Reiniciar conversación"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prompt Chips Bar */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0">
            Casos Rápidos:
          </span>
          {quickPrompts.map((qp, index) => (
            <button
              key={index}
              onClick={() => {
                setMode(qp.mode);
                handleSend(qp.query);
              }}
              className="text-xs shrink-0 px-3 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/20 border border-slate-700/70 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all font-medium"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[500px]">
          {messages.map((msg) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-md ${
                    isBot
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : 'Tú'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 shadow-md relative group ${
                    isBot
                      ? 'bg-slate-800/90 border border-slate-700 text-slate-100'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isBot ? renderMessageContent(msg.content) : <p className="text-sm">{msg.content}</p>}

                  {/* Message Tools (Bot only) */}
                  {isBot && (
                    <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-[10px]">{msg.timestamp}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSpeak(msg.content)}
                          className="hover:text-emerald-400 p-1 transition-colors"
                          title="Escuchar a Sofía"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="hover:text-emerald-400 p-1 transition-colors"
                          title="Copiar respuesta"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Sofía Humanómica sintetizando con rigor epigenético...</span>
                </div>
                <div className="flex space-x-1.5 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="bg-slate-850 p-3 sm:p-4 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntale a Sofía sobre síntomas celulares, productos, objeciones o plan de red..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-semibold p-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Metodología oficial del Sistema Educativo AB</span>
            <span className="text-emerald-400 font-medium">Activación NRF2 & Biología Celular</span>
          </div>
        </div>

      </div>

    </div>
  );
};
