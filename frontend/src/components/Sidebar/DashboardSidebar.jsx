import React from 'react';
import { 
  Home, 
  ShieldAlert, 
  Building2, 
  BarChart3, 
  History, 
  Bookmark, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ShieldCheck,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePreferences } from '../../context/PreferencesContext';

export default function DashboardSidebar({ 
  activeTab = 'home', 
  setActiveTab, 
  isCollapsed = false, 
  setIsCollapsed,
  isMobileOpen = false,
  onCloseMobile
}) {
  const { user, logout } = useAuth();
  const { t } = usePreferences();

  const navItems = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Home, badge: null },
    { id: 'scanner', label: t('nav.scanner', 'Check a Job'), icon: ShieldAlert, badge: 'Live' },
    { id: 'companies', label: t('nav.companies', 'Verified Companies'), icon: Building2, badge: '50+' },
    { id: 'insights', label: t('nav.insights', 'Safety Insights'), icon: BarChart3, badge: null },
    { id: 'history', label: t('nav.history', 'History'), icon: History, badge: null },
    { id: 'watchlist', label: t('nav.watchlist', 'Saved / Watchlist'), icon: Bookmark, badge: null },
    { id: 'profile', label: t('nav.profile', 'My Profile'), icon: User, badge: null },
    { id: 'settings', label: t('nav.settings', 'Settings'), icon: Settings, badge: null },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay (Visible only on < md when mobile drawer is open) */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Main Responsive Sidebar / Mobile Drawer */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#0a0f1d]/98 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 select-none ${
          // Desktop sizing: collapsed or expanded
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${
          // Mobile sizing & slide-in drawer
          isMobileOpen 
            ? 'translate-x-0 w-72 shadow-2xl shadow-cyan-950/50' 
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className={`p-4 flex items-center justify-between border-b border-slate-800/60`}>
            
            {/* Logo and Brand Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px] flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
                <div className="w-full h-full bg-[#0b101d] rounded-[15px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              
              <div className={isCollapsed ? 'md:hidden' : 'block'}>
                <span className="text-base font-extrabold tracking-tight text-white">
                  Hire<span className="text-cyan-400">Shield</span>
                </span>
                <p className="text-[10px] text-slate-400 font-mono">Defense Console</p>
              </div>
            </div>

            {/* Close Button for Mobile Drawer */}
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors cursor-pointer"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Collapse/Expand Toggle Button for Desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden md:block ${
                isCollapsed ? 'hidden' : 'block'
              }`}
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Un-collapse button for collapsed state */}
          {isCollapsed && (
            <div className="hidden md:flex justify-center pt-2">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 mt-2 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  } ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {/* Active Left Glow Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full" />
                  )}

                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />

                  <span className={`truncate flex-1 text-left ${isCollapsed ? 'md:hidden' : 'block'}`}>
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                      isCollapsed ? 'md:hidden' : 'block'
                    } ${
                      item.badge === 'Live'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-slate-800/80">
          <div className={`p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between gap-2.5 ${
            isCollapsed ? 'md:flex-col md:p-1.5 md:gap-2' : ''
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border border-slate-700 object-cover shrink-0" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {getInitials(user?.name)}
                </div>
              )}
              
              <div className={`min-w-0 flex-1 ${isCollapsed ? 'md:hidden' : 'block'}`}>
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Candidate'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email || 'Authenticated'}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
