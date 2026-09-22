'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  Building2, 
  Calendar, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatPhone } from '@/lib/utils';
import { EnquiryModal } from './EnquiryModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Leadership & Staff', href: '/leadership' },
    { name: 'Campuses', href: '/branches' },
    { name: 'Academics', href: '/academics' },
    { name: 'CBSE', href: '/cbse' },
    { name: 'HBSE', href: '/hbse' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Events', href: '/events' },
    { name: 'Notices', href: '/notices' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Header Bar with Leadership Helplines */}
      <header className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Admissions Open 2026-27 (Play School to 12th)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-300">
              12 Campuses across Gurugram, Haryana
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href="tel:8368268149" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Director: {formatPhone('8368268149')}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="tel:9355135904" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Manager: {formatPhone('9355135904')}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight group-hover:text-amber-700 transition-colors">
                  SIDDHARTHA
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 tracking-wider uppercase">
                  International Group of Schools
                </span>
                <span className="text-[9px] text-slate-400 font-medium -mt-0.5">
                  12 Premier Campuses • CBSE & HBSE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl transition-all ${
                      isActive
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'hover:bg-slate-50 hover:text-amber-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-sm transition-all hover:shadow-md flex items-center gap-2"
              >
                <span>Quick Enquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                href="/admissions"
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-amber-400 text-slate-800 font-bold text-xs transition-colors"
              >
                Admissions
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-[11px]"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 text-xs font-semibold text-slate-800">
            <div className="grid grid-cols-2 gap-1 py-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl transition-colors ${
                      isActive ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold text-xs text-center shadow-xs"
              >
                Admission Enquiry 2026-27
              </button>
              <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Need Immediate Assistance?</div>
                <div>Director Sandeep Kumar: <a href="tel:8368268149" className="font-bold text-amber-700">8368268149</a></div>
                <div>Manager Kalpna Kumari: <a href="tel:9355135904" className="font-bold text-amber-700">9355135904</a></div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enquiry Modal */}
      {enquiryModalOpen && (
        <EnquiryModal isOpen={enquiryModalOpen} onClose={() => setEnquiryModalOpen(false)} />
      )}
    </>
  );
};
