import React, { useState } from 'react';
import { 
  Lock, Mail, Key, Shield, CheckCircle2, AlertCircle, X, 
  Smartphone, Eye, EyeOff, RotateCcw, ArrowRight, ShieldCheck, UserCheck
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onLogAction: (action: string, module: string, details: string) => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
  onLogAction,
  onShowToast
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'recovery' | '2fa' | 'profile'>('login');
  const [email, setEmail] = useState('angel.brena@abnetworkers.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  
  // 2FA state
  const [is2FaEnabled, setIs2FaEnabled] = useState(true);
  const [otpCode, setOtpCode] = useState('');
  const [is2FaVerified, setIs2FaVerified] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (is2FaEnabled && !is2FaVerified && otpCode.length < 6) {
      setAuthMode('2fa');
      return;
    }

    onLogAction('Inicio de Sesión Exitoso', 'Seguridad & Acceso', `Usuario ${email} autenticado mediante contraseña segura y 2FA.`);
    onShowToast(`¡Sesión iniciada correctamente como ${currentRole.toUpperCase()}!`);
    onClose();
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) return;

    setRecoverySent(true);
    onLogAction('Solicitud de Recuperación de Clave', 'Seguridad & Acceso', `Enlace de restablecimiento enviado a ${recoveryEmail}.`);
    onShowToast('Enlace de recuperación enviado a tu bandeja.');
    setTimeout(() => {
      setRecoverySent(false);
      setAuthMode('login');
    }, 3000);
  };

  const handleVerify2Fa = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      setIs2FaVerified(true);
      onLogAction('Verificación 2FA Exitosa', 'Seguridad & Acceso', 'Segundo factor verificado con código temporal de un solo uso.');
      onShowToast('Segundo factor de autenticación verificado.');
      onClose();
    }
  };

  const handleLogout = () => {
    onRoleChange('cliente');
    onLogAction('Cierre de Sesión', 'Seguridad & Acceso', 'Sesión cerrada por el usuario. Rol cambiado a Cliente.');
    onShowToast('Sesión cerrada. Ahora navegas como Cliente Preferencial.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-amber-400 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">Centro de Acceso & Seguridad</h3>
            <p className="text-xs text-slate-400">Autenticación cifrada, segundo factor (2FA) y roles</p>
          </div>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition text-center ${
              authMode === 'login' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setAuthMode('recovery')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition text-center ${
              authMode === 'recovery' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Recuperar
          </button>
          <button
            onClick={() => setAuthMode('profile')}
            className={`flex-1 py-1.5 rounded-xl font-bold transition text-center ${
              authMode === 'profile' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Mi Cuenta
          </button>
        </div>

        {/* TAB 1: LOGIN */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@abnetworkers.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Contraseña Segura</label>
                <button
                  type="button"
                  onClick={() => setAuthMode('recovery')}
                  className="text-cyan-400 hover:underline text-[11px]"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-10 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-white font-bold block text-[11px]">Segundo Factor Opcional (2FA)</span>
                  <span className="text-slate-400 text-[10px]">Código temporal TOTP mediante aplicación</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={is2FaEnabled}
                onChange={(e) => setIs2FaEnabled(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold py-3 rounded-2xl shadow-lg transition text-xs flex items-center justify-center space-x-2"
            >
              <Key className="w-4 h-4" />
              <span>Autenticar & Acceder</span>
            </button>
          </form>
        )}

        {/* TAB 2: RECOVERY */}
        {authMode === 'recovery' && (
          <form onSubmit={handleRecoverySubmit} className="space-y-4 text-xs">
            <p className="text-slate-400 text-[11px]">
              Ingresa tu correo registrado para enviarte un enlace de restablecimiento cifrado de un solo uso.
            </p>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Correo Electrónico Registrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="angel.brena@abnetworkers.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            {recoverySent ? (
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-2xl border border-emerald-500/30 text-center font-bold">
                ✓ ¡Enlace de recuperación enviado! Revisa tu bandeja de entrada o spam.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-2xl shadow transition text-xs flex items-center justify-center space-x-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Enviar Enlace de Restablecimiento</span>
              </button>
            )}
          </form>
        )}

        {/* TAB 3: 2FA VERIFICATION CODE */}
        {authMode === '2fa' && (
          <form onSubmit={handleVerify2Fa} className="space-y-4 text-xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-bold text-white text-sm">Verificación de Dos Factores</h4>
              <p className="text-slate-400 text-[11px] mt-1">
                Ingresa el código de 6 dígitos generado por tu app de autenticación (Google Authenticator / Authy).
              </p>
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-44 text-center bg-slate-950 border-2 border-cyan-500 rounded-2xl py-2 text-2xl font-mono tracking-widest text-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={otpCode.length < 6}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-2xl shadow transition text-xs"
            >
              Confirmar Código 2FA
            </button>
          </form>
        )}

        {/* TAB 4: PROFILE & LOGOUT */}
        {authMode === 'profile' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Usuario Activo:</span>
                <strong className="text-white font-bold">Ángel Manuel Breña</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rol Activo:</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {currentRole.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Estado de Cuenta:</span>
                <span className="text-emerald-400 font-bold">● Verificada & Activa</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">2FA Estado:</span>
                <span className={is2FaEnabled ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {is2FaEnabled ? 'Activado (Protegido)' : 'Desactivado'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400">
              🛡️ <strong>Aislamiento de Privacidad:</strong> Cada afiliado tiene acceso restringido a sus propios datos, puntos y red. Nunca se exponen contraseñas ni datos bancarios ajenos.
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold py-3 rounded-2xl transition text-xs flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Cerrar Sesión Segura</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
