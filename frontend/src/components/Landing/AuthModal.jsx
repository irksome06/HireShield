import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { triggerGoogleOAuth, renderOfficialGoogleButton } from '../../utils/googleAuth';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }) {
  const { login, signup, loginWithGoogle, authError, clearError, isLoading } = useAuth();
  
  const [authMode, setAuthMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const googleBtnRef = useRef(null);

  useEffect(() => {
    setAuthMode(initialMode);
    setLocalError('');
    if (clearError) clearError();
  }, [initialMode, isOpen]);

  // Render official Google button when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const container = googleBtnRef.current;
    if (container) {
      renderOfficialGoogleButton(container, {
        authMode,
        onCredential: async (credential) => {
          setIsGoogleLoading(true);
          setLocalError('');
          const res = await loginWithGoogle(credential);
          setIsGoogleLoading(false);
          if (res.success) {
            onClose();
          } else if (res.error) {
            setLocalError(res.error);
          }
        }
      });
    }
  }, [isOpen, authMode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (localError) setLocalError('');
    if (authError) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setLocalError('Please provide a valid email address.');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }

    if (authMode === 'signup') {
      if (!formData.name.trim()) {
        setLocalError('Please enter your full name.');
        return;
      }
      const res = await signup(formData.name, formData.email, formData.password);
      if (res.success) onClose();
    } else {
      const res = await login(formData.email, formData.password);
      if (res.success) onClose();
    }
  };

  // Interactive Google Sign-In Popup
  const handleGoogleClick = () => {
    setLocalError('');
    clearError();

    triggerGoogleOAuth({
      onStart: () => setIsGoogleLoading(true),
      onToken: async (token) => {
        const res = await loginWithGoogle(token);
        setIsGoogleLoading(false);
        if (res.success) {
          onClose();
        } else if (res.error) {
          setLocalError(res.error);
        }
      },
      onError: (errorMessage) => {
        setIsGoogleLoading(false);
        setLocalError(errorMessage);
      }
    });
  };

  const toggleMode = (mode) => {
    setAuthMode(mode);
    setLocalError('');
    clearError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Main Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#0d1322]/95 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 cyber-glow animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] flex items-center justify-center shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b101d] rounded-[15px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">HireShield Security</h3>
            <p className="text-xs text-slate-400">Recruitment Scam Defense</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-950/70 border border-slate-800 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => toggleMode('signin')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              authMode === 'signin'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => toggleMode('signup')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Feedback */}
        {(localError || authError) && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{localError || authError}</span>
          </div>
        )}

        {/* Official Google Sign In Container */}
        <div className="mb-4 flex flex-col items-center justify-center gap-2">
          {/* Official GSI Rendered Button */}
          <div ref={googleBtnRef} className="w-full flex justify-center empty:hidden" />
          
          {/* Direct Interactive Popup Fallback Button */}
          <button
            type="button"
            disabled={isGoogleLoading || isLoading}
            onClick={handleGoogleClick}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition-all hover:border-cyan-500/50 cursor-pointer disabled:opacity-60 group shadow-sm"
          >
            {isGoogleLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                <span>Connecting to Google...</span>
              </div>
            ) : (
              <>
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google (Popup)</span>
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-full border-t border-slate-800" />
          <span className="absolute bg-[#0d1322] px-2.5 text-[10px] font-medium text-slate-500 uppercase tracking-wider">
            or email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Mercer"
                  required={authMode === 'signup'}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                required
                className="w-full pl-9 pr-3.5 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <span className="text-[10px] text-slate-500">Min. 6 chars</span>
            </div>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
                className="w-full pl-9 pr-9 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <>
                <span>{authMode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Modal Footer Note */}
        <div className="mt-4 text-center text-xs text-slate-400">
          {authMode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => toggleMode('signup')}
                className="text-cyan-400 font-semibold hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                onClick={() => toggleMode('signin')}
                className="text-cyan-400 font-semibold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>

    </div>
  );
}
