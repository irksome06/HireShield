import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';
import { API_BASE } from '../../api/config';
import { useAuth } from '../../context/AuthContext';

const AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/bottts/svg?seed=cyber-shield",
  "https://api.dicebear.com/7.x/bottts/svg?seed=alex-mercer",
  "https://api.dicebear.com/7.x/bottts/svg?seed=sarah-connor",
  "https://api.dicebear.com/7.x/bottts/svg?seed=security-lead",
  "https://api.dicebear.com/7.x/bottts/svg?seed=phoenix-ops",
  "https://api.dicebear.com/7.x/bottts/svg?seed=quantum-dev"
];

export default function ProfileView() {
  const { user, token, logout, updateUser, refreshUser } = useAuth();

  // Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || ''
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Status & Feedback State
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Sync initial user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        avatar_url: user.avatar_url || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (profileError) setProfileError('');
  };

  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setProfileError('');
    setProfileSuccess('');

    const activeToken = token || localStorage.getItem('hireshield_token');

    if (!activeToken) {
      setProfileError('You are not logged in. Please sign in again.');
      setIsSaving(false);
      return;
    }

    const payload = {
      name: (formData.name || user?.name || '').trim(),
      phone: (formData.phone || '').trim(),
      location: (formData.location || '').trim(),
      bio: (formData.bio || '').trim(),
      avatar_url: (formData.avatar_url || user?.avatar_url || '').trim()
    };

    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        // Update global user in AuthContext
        if (updateUser) {
          updateUser(updatedUser);
        }
        setFormData({
          name: updatedUser.name || '',
          phone: updatedUser.phone || '',
          location: updatedUser.location || '',
          bio: updatedUser.bio || '',
          avatar_url: updatedUser.avatar_url || ''
        });
        setProfileSuccess('Profile successfully updated and saved to database.');
        setIsEditing(false);
        setTimeout(() => setProfileSuccess(''), 4000);
      } else {
        const errJson = await res.json().catch(() => ({}));
        setProfileError(errJson.detail || `Failed to update profile (Status ${res.status}).`);
      }
    } catch (err) {
      console.error('Save profile error:', err);
      setProfileError('Cannot connect to backend server at ' + API_BASE + '. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarSelect = async (url) => {
    const newFormData = { ...formData, avatar_url: url };
    setFormData(newFormData);
    setShowPhotoModal(false);

    // Immediately save new avatar to backend
    const activeToken = token || localStorage.getItem('hireshield_token');
    if (activeToken) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeToken}`
          },
          body: JSON.stringify({
            avatar_url: url
          })
        });
        if (res.ok) {
          const updatedUser = await res.json();
          if (updateUser) updateUser(updatedUser);
          setProfileSuccess('Avatar photo updated successfully.');
          setTimeout(() => setProfileSuccess(''), 3000);
        }
      } catch (e) {
        console.warn('Avatar auto-save notice:', e);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsSavingPassword(true);
    setPasswordError('');
    setPasswordSuccess('');

    const activeToken = token || localStorage.getItem('hireshield_token');

    if (!activeToken) {
      setPasswordError('Please sign in to change your password.');
      setIsSavingPassword(false);
      return;
    }

    if (!passwordData.currentPassword) {
      setPasswordError('Please enter your current password.');
      setIsSavingPassword(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      setIsSavingPassword(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      setIsSavingPassword(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${activeToken}`
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword
        })
      });

      if (res.ok) {
        setPasswordSuccess('Password successfully changed!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          setPasswordSuccess('');
          setShowPasswordSection(false);
        }, 3000);
      } else {
        const errJson = await res.json().catch(() => ({}));
        setPasswordError(errJson.detail || 'Current password entered is incorrect.');
      }
    } catch (err) {
      setPasswordError('Network error while communicating with backend.');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setProfileError('Profile photo must be less than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleAvatarSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Candidate Identity & Security Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Profile & Account Security</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Edit your personal details, manage login credentials, and inspect security parameters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: user?.name || '',
                  phone: user?.phone || '',
                  location: user?.location || '',
                  bio: user?.bio || '',
                  avatar_url: user?.avatar_url || ''
                });
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Global Success / Error Alerts */}
      {profileSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{profileSuccess}</span>
        </div>
      )}
      {profileError && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in shadow-lg">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-semibold">{profileError}</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl space-y-8">
        
        {/* Top Avatar & Summary Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-800">
          
          {/* Avatar with Camera Trigger */}
          <div className="relative group">
            {formData.avatar_url ? (
              <img 
                src={formData.avatar_url} 
                alt={formData.name || 'User'} 
                className="w-20 h-20 rounded-3xl border-2 border-cyan-500/40 object-cover shadow-xl shadow-cyan-950/50" 
              />
            ) : (
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-cyan-950/50">
                {getInitials(formData.name || user?.name)}
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPhotoModal(true)}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-400 shadow-md transition-all cursor-pointer group-hover:scale-105"
              title="Update Profile Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User Bio Header */}
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-white">{formData.name || user?.name || 'Candidate Account'}</h2>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                Shield Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user?.email}</p>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {formData.bio || 'Candidate and security analyst monitoring verified recruitment opportunities.'}
            </p>
          </div>

        </div>

        {/* Profile Information Form */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={handleProfileChange}
                  placeholder="E.g. Alex Mercer"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 border transition-all ${
                    isEditing 
                      ? 'bg-slate-950/80 border-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Email Address (Account Identifier)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/40 border border-slate-800 rounded-xl text-xs text-slate-400 cursor-not-allowed font-mono"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="phone"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={handleProfileChange}
                  placeholder="E.g. +91 98765 43210 or +1 (555) 019-2834"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 border transition-all ${
                    isEditing 
                      ? 'bg-slate-950/80 border-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Location / City
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="location"
                  disabled={!isEditing}
                  value={formData.location}
                  onChange={handleProfileChange}
                  placeholder="E.g. Bengaluru, India / San Francisco, CA"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 border transition-all ${
                    isEditing 
                      ? 'bg-slate-950/80 border-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40' 
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

          </div>

          {/* Bio / Candidate Headline */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Bio / Candidate Headline
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <textarea
                name="bio"
                rows={3}
                disabled={!isEditing}
                value={formData.bio}
                onChange={handleProfileChange}
                placeholder="Brief summary of your background, experience, or role interests..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 border transition-all ${
                  isEditing 
                    ? 'bg-slate-950/80 border-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40' 
                    : 'bg-slate-950/40 border-slate-800 text-slate-300 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Save Button (when editing) */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving to Database...' : 'Save Profile Details'}</span>
              </button>
            </div>
          )}
        </form>

        {/* Security & Authentication Credentials */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Account & Security Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Google OAuth Status */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Google OAuth Authentication</p>
                  <p className="text-[10px] text-slate-400">
                    {user?.auth_provider === 'google' ? 'Connected & Verified via Google' : 'Standard Email & Password'}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                user?.auth_provider === 'google' 
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {user?.auth_provider === 'google' ? 'Connected' : 'Email Mode'}
              </span>
            </div>

            {/* Account Identifier Status */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-xs font-bold text-white">HireShield Defense Network</p>
                  <p className="text-[10px] text-slate-400 font-mono">Real-time candidate telemetry active</p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Active & Protected
              </span>
            </div>

          </div>

        </div>

        {/* Bottom Sign Out Bar */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Active session: <span className="text-slate-400 font-semibold">{user?.email}</span>
          </span>

          <button
            onClick={logout}
            className="py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

      {/* Photo Selection Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-slate-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Choose Profile Photo</span>
              </h3>
              <button 
                onClick={() => setShowPhotoModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Click a cyberpunk avatar preset to apply immediately, or upload an image file.
            </p>

            {/* Avatar Presets Grid */}
            <div className="grid grid-cols-3 gap-3 py-2">
              {AVATAR_PRESETS.map((presetUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAvatarSelect(presetUrl)}
                  className="p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center transition-all cursor-pointer group"
                >
                  <img src={presetUrl} alt="Avatar Preset" className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                </button>
              ))}
            </div>

            {/* Custom Upload */}
            <div className="pt-2 border-t border-slate-800">
              <label className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 cursor-pointer">
                <Camera className="w-4 h-4" />
                <span>Upload Custom Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
