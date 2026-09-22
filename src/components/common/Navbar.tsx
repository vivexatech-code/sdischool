import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ChevronDown, 
  GraduationCap, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  Image as ImageIcon, 
  Bell, 
  Sparkles,
  Lock
} from 'lucide-react';
import { useSite } from '../../contexts/SiteContext';
import { EnquiryModal } from './EnquiryModal';
import { formatPhone } from '../../lib/utils';

export interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const { branches, notices, siteSettings } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const location = useLocation();

  const handleOpenEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else {
      setIsEnquiryOpen(true);
    }
  };

  const activeNotice = notices.find(n => n.isActive && n.priority === 'Urgent') || notices.find(n => n.isActive);

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        {/* Top Emergency / Urgent Notice Ticker if present */}
        {activeNotice && (
          <div className="bg-amber-600 text-amber-50 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-2">
            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {activeNotice.priority} Notice
            </span>
            <span className="truncate max-w-2xl">{activeNotice.title}</span>
            {activeNotice.buttonText && (
              <Link
                to={activeNotice.buttonUrl || '/notices'}
                className="underline font-semibold ml-1 hover:text-white"
              >
                {activeNotice.buttonText} &rarr;
              </Link>
            )}
          </div>
        )}

        {/* Top Contact Strip */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Gurugram, Haryana • 12 Branches</span>
              </div>
              <span className="hidden sm:inline text-slate-700">|</span>
              <div className="hidden md:flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold text-[11px]">
                  CBSE & HBSE
                </span>
                <span>Play School to Class 12</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Director:</span>
                <a
                  href={`tel:${siteSettings.directorPhone || '8368268149'}`}
                  className="font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1"
                  title="Call Director Sandeep Kumar"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{formatPhone(siteSettings.directorPhone || '8368268149')}</span>
                </a>
              </div>

              <div className="hidden lg:flex items-center gap-2">
                <span className="text-slate-400">Manager:</span>
                <a
                  href={`tel:${siteSettings.managerPhone || '9355135904'}`}
                  className="font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1"
                  title="Call Manager Kalpna Kumari"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{formatPhone(siteSettings.managerPhone || '9355135904')}</span>
                </a>
              </div>

              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700 transition-colors"
                title="School Staff / Admin Login"
              >
                <Lock className="w-2.5 h-2.5 text-amber-400" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* School Logo & Brand */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl shadow-md ring-2 ring-amber-400/30 group-hover:scale-105 transition-transform flex-shrink-0">
                SIS
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-amber-700 transition-colors">
                  SIDDHARTHA
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600">
                  International Group of Schools
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                  Gurugram • English Medium • CBSE & HBSE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/') && location.pathname === '/'
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/about')
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/leadership"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/leadership')
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                Leadership & Staff
              </Link>

              {/* Academics Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAcademicsDropdownOpen(true)}
                onMouseLeave={() => setAcademicsDropdownOpen(false)}
              >
                <button
                  onClick={() => setAcademicsDropdownOpen(!academicsDropdownOpen)}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActiveRoute('/academics') || isActiveRoute('/cbse') || isActiveRoute('/hbse') || isActiveRoute('/facilities')
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                  }`}
                >
                  <span>Academics</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {academicsDropdownOpen && (
                  <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/academics"
                      className="block px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                    >
                      Academic Overview (Play School to 12)
                    </Link>
                    <Link
                      to="/cbse"
                      className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                    >
                      CBSE Board Wing
                    </Link>
                    <Link
                      to="/hbse"
                      className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                    >
                      HBSE Board Wing
                    </Link>
                    <Link
                      to="/facilities"
                      className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                    >
                      Campus Facilities & Labs
                    </Link>
                  </div>
                )}
              </div>

              {/* Branches Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setBranchesDropdownOpen(true)}
                onMouseLeave={() => setBranchesDropdownOpen(false)}
              >
                <Link
                  to="/branches"
                  className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActiveRoute('/branches')
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-amber-600 mr-0.5" />
                  <span>Our 12 Branches</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {branchesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50 max-h-96 overflow-y-auto">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Gurugram Campuses</span>
                      <Link to="/branches" className="text-[11px] font-semibold text-amber-600 hover:underline">
                        View All (12)
                      </Link>
                    </div>
                    <div className="py-1 space-y-0.5">
                      {branches.map(b => (
                        <Link
                          key={b.id}
                          to={`/branches/${b.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        >
                          <span className="font-semibold text-slate-800 truncate">{b.sector}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">{b.board}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/events"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/events')
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                Events
              </Link>

              <Link
                to="/gallery"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/gallery')
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                Gallery
              </Link>

              <Link
                to="/notices"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/notices')
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                Notices
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isActiveRoute('/contact')
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                id="header-admission-enquiry-btn"
                onClick={handleOpenEnquiry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Admission Enquiry</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={handleOpenEnquiry}
                className="sm:hidden px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-600 text-white"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
            <div className="p-3 bg-slate-50 rounded-xl mb-3 flex items-center justify-between border border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-900">Direct Call Helpline</p>
                <p className="text-[11px] text-slate-500">Director Sandeep Kumar: 8368268149</p>
              </div>
              <a
                href="tel:8368268149"
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-amber-300 text-xs font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>

            <div className="space-y-1 text-sm font-semibold">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
              >
                About Us
              </Link>
              <Link
                to="/leadership"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50 font-semibold"
              >
                Leadership & Staff
              </Link>
              
              <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
                Academics
              </div>
              <Link
                to="/academics"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 pl-6 text-xs"
              >
                Academics Overview (Play School - 12)
              </Link>
              <Link
                to="/cbse"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 pl-6 text-xs"
              >
                CBSE Board Curriculum
              </Link>
              <Link
                to="/hbse"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 pl-6 text-xs"
              >
                HBSE Board Curriculum
              </Link>
              <Link
                to="/facilities"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 pl-6 text-xs"
              >
                Campus Facilities
              </Link>

              <div className="pt-2 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider px-3 flex items-center justify-between">
                <span>Our 12 Gurugram Branches</span>
                <Link to="/branches" onClick={() => setMobileMenuOpen(false)} className="text-amber-600 lowercase font-medium text-xs">
                  view all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {branches.slice(0, 8).map(b => (
                  <Link
                    key={b.id}
                    to={`/branches/${b.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded bg-slate-50 text-[11px] font-medium text-slate-800 hover:bg-amber-50 truncate"
                  >
                    {b.sector}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  Events
                </Link>
                <Link
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  Gallery
                </Link>
                <Link
                  to="/notices"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  Notices & Circulars
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-slate-800 hover:bg-slate-50"
                >
                  Contact Us
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-amber-700 font-bold bg-amber-50"
                >
                  Admin Panel Login
                </Link>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsEnquiryOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md"
              >
                Submit Admission Enquiry
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
};
