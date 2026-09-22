import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSite } from '../../contexts/SiteContext';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Bell, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink,
  Shield,
  Sparkles,
  Award
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { enquiries } = useSite();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'New' || e.status === 'new').length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Leadership', path: '/admin/leadership', icon: Award },
    { label: 'Staff Management', path: '/admin/staff', icon: Users },
    { label: 'Branches (12)', path: '/admin/branches', icon: Building2 },
    { label: 'Events', path: '/admin/events', icon: Calendar },
    { label: 'Gallery Media', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Notices & Circulars', path: '/admin/notices', icon: Bell },
    { 
      label: 'Admission Enquiries', 
      path: '/admin/enquiries', 
      icon: FileText,
      badge: pendingEnquiriesCount > 0 ? pendingEnquiriesCount : undefined
    },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm">
            SIS
          </div>
          <span className="font-bold text-sm">Admin Backoffice</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 space-y-6">
          {/* Logo & Identity */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base">
                SIS
              </div>
              <div>
                <h1 className="font-extrabold text-white text-sm tracking-tight leading-tight">
                  SIDDHARTHA
                </h1>
                <p className="text-[10px] text-amber-400 uppercase font-semibold">
                  Multi-Branch Admin
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Badge */}
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold flex-shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white truncate text-[11px]" title={currentUser?.email || 'Administrator'}>
                  {currentUser?.email || 'Administrator'}
                </p>
                <p className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Super Admin
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-slate-500">Public</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Backoffice Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};
