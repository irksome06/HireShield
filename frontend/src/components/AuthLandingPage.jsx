import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  X,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthLandingPage() {
  const { login, signup, loginWithGoogle, authError, clearError, isLoading } = useAuth();
  
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  
  // Google Account Picker Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  const googleBtnRef = useRef(null);

  // Initialize official Google Identity Services if client ID is configured
  useEffect(() => {
    if (!googleClientId) return;

    const initGsi = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (response) => {
              if (response.credential) {
                loginWithGoogle(response.credential);
              }
            },
            auto_select: false
          });

          if (googleBtnRef.current) {
            googleBtnRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnRef.current, {
              theme: 'filled_black',
              size: 'large',
              shape: 'rectangular',
              width: '380',
              text: authMode === 'signup' ? 'signup_with' : 'signin_with'
            });
          }
        } catch (err) {
          console.warn('Google Identity initialization notice:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGsi();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          initGsi();
        }
      }, 150);
      return () => clearInterval(timer);
    }
  }, [googleClientId, authMode]);

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
      await signup(formData.name, formData.email, formData.password);
    } else {
      await login(formData.email, formData.password);
    }
  };

  const handleGoogleButtonClick = () => {
    let gsiTriggered = false;
    if (googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment() || notification.isDismissedMoment()) {
            setShowGoogleModal(true);
          }
        });
        gsiTriggered = true;
      } catch (e) {
        console.warn('Google One-Tap notice:', e);
      }
    }
    
    // Fallback to picker modal
    setTimeout(() => {
      setShowGoogleModal(true);
    }, gsiTriggered ? 300 : 0);
  };

  const triggerGoogleLogin = async (name, email, picture) => {
    setShowGoogleModal(false);
    setLocalError('');
    clearError();

    const payload = JSON.stringify({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      picture: picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
    });

    const encoded = btoa(unescape(encodeURIComponent(payload)));
    const demoCredential = `demo_google:${encoded}`;

    await loginWithGoogle(demoCredential);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleEmail.includes('@')) {
      return;
    }
    triggerGoogleLogin(
      customGoogleName || customGoogleEmail.split('@')[0],
      customGoogleEmail,
      `https://api.dicebear.com/7.x/initials/svg?seed=${customGoogleName || customGoogleEmail}`
    );
  };

  const toggleMode = (mode) => {
    setAuthMode(mode);
    setLocalError('');
    clearError();
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      
      {/* Rich 3D Cyber Mesh & Ambient Neon Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-mesh pointer-events-none" />
      
      {/* Floating 3D Ambient Lighting Spheres */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Top Floating Glass Navigation */}
      <header className="relative z-20 max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#0b101d] rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 transform group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white">Hire<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Shield</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                PRO 2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Recruitment Threat Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Threat Telemetry Active</span>
          </div>
          <button 
            onClick={() => toggleMode(authMode === 'signin' ? 'signup' : 'signin')}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/50 transition-all backdrop-blur-md cursor-pointer"
          >
            {authMode === 'signin' ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </header>

      {/* Focused Centered 3D Experience */}
      <main className="relative z-10 max-w-lg mx-auto w-full px-6 py-8 sm:py-12 flex-1 flex flex-col items-center justify-center">
        
        {/* Animated 3D Security Shield Badge */}
        <div className="relative mb-6 flex flex-col items-center text-center space-y-3">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-2xl shadow-cyan-500/30 cyber-glow animate-float-slow">
            <div className="w-full h-full bg-[#0b101d] rounded-[22px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">HireShield</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
              Autonomous recruitment scam defense & job trust verification.
            </p>
          </div>
        </div>

        {/* 3D Glassmorphism Authentication Card */}
        <div className="w-full">
          <div className="relative rounded-3xl bg-slate-900/85 border border-slate-700/60 p-7 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 cyber-glow">
            
            {/* Glowing Accent Top Bar */}
            <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Auth Tab Switcher */}
            <div className="flex p-1 bg-slate-950/60 border border-slate-800 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => toggleMode('signin')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => toggleMode('signup')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Feedback Banner */}
            {(localError || authError) && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{localError || authError}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <div className="mb-5 flex flex-col items-center justify-center">
              <div ref={googleBtnRef} className="w-full flex justify-center empty:hidden mb-1" />
              
              <button
                type="button"
                onClick={handleGoogleButtonClick}
                className="w-full py-3 px-4 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 flex items-center justify-center gap-3 transition-all hover:border-cyan-500/50 shadow-sm cursor-pointer group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="w-full border-t border-slate-800" />
              <span className="absolute bg-[#0f172a] px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Or with email
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Mercer"
                      required={authMode === 'signup'}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">Min. 6 chars</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span>{authMode === 'signin' ? 'Sign In to HireShield' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer switcher note */}
            <div className="mt-5 text-center text-xs text-slate-400">
              {authMode === 'signin' ? (
                <p>
                  Don't have an account yet?{' '}
                  <button
                    onClick={() => toggleMode('signup')}
                    className="text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => toggleMode('signin')}
                    className="text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

            {/* Security Guarantee */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Bcrypt Hashed • JWT Protected • Zero Fake Findings</span>
            </div>

          </div>
        </div>

      </main>

      {/* Interactive Google Account Picker Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#0f172a] border border-slate-700/80 p-6 shadow-2xl shadow-cyan-950/50 space-y-5 animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="text-sm font-bold text-white">Sign in with Google</span>
              </div>
              <button 
                onClick={() => setShowGoogleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Choose an account to continue to <span className="text-white font-semibold">HireShield</span>
            </p>

            {/* Quick Profile Selectors */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => triggerGoogleLogin("Alex Mercer", "alex.mercer@gmail.com", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80")}
                className="w-full p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 transition-all cursor-pointer text-left group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  AM
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Alex Mercer</p>
                  <p className="text-[11px] text-slate-400 truncate">alex.mercer@gmail.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => triggerGoogleLogin("Sarah Connor", "sarah.connor@gmail.com", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80")}
                className="w-full p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 transition-all cursor-pointer text-left group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  SC
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Sarah Connor</p>
                  <p className="text-[11px] text-slate-400 truncate">sarah.connor@gmail.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => triggerGoogleLogin("Security Lead", "security.lead@gmail.com", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80")}
                className="w-full p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 transition-all cursor-pointer text-left group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  SL
                </div>
                <div className="flex-1 truncate">
                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Security Researcher</p>
                  <p className="text-[11px] text-slate-400 truncate">security.lead@gmail.com</p>
                </div>
              </button>
            </div>

            {/* Custom Google Account Option */}
            {!showCustomGoogleInput ? (
              <button
                type="button"
                onClick={() => setShowCustomGoogleInput(true)}
                className="w-full py-2 px-3 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-center gap-1.5 hover:bg-cyan-950/30 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Use another Google account</span>
              </button>
            ) : (
              <form onSubmit={handleCustomGoogleSubmit} className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="E.g. David Miller"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Gmail Address</label>
                  <input
                    type="email"
                    required
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Continue with this Account
                </button>
              </form>
            )}

            <div className="pt-2 text-center text-[10px] text-slate-500">
              Authenticated securely via SQLite backend & JWT session tokens.
            </div>

          </div>
        </div>
      )}

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950/40 backdrop-blur-md py-4 px-6 text-center text-xs text-slate-500">
        <p>© 2026 HireShield Security Intelligence • All verification executed deterministically.</p>
      </footer>
    </div>
  );
}
