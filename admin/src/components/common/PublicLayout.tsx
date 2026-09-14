import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { EnquiryModal } from './EnquiryModal';
import { useSite } from '../../contexts/SiteContext';
import { Phone, MessageCircle, Sparkles, X, ChevronRight, AlertCircle } from 'lucide-react';
import { formatPhone } from '../../lib/utils';

export const PublicLayout: React.FC = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const { notices } = useSite();

  const urgentNotice = notices.find(n => n.isActive && n.priority === 'Urgent');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Notification Bar */}
      {showTopBanner && (
        <div className="bg-slate-950 text-slate-100 px-4 py-2 text-xs border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              {urgentNotice ? (
                <>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Urgent Circular
                  </span>
                  <span className="font-semibold text-slate-200 truncate">{urgentNotice.title}</span>
                </>
              ) : (
                <>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                    Admissions 2027-28
                  </span>
                  <span className="font-medium text-slate-300 truncate">
                    Admissions Open from Play School to Class 12 across all 12 Gurugram branches (CBSE & HBSE).
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                to={urgentNotice ? '/notices' : '/admissions'}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px]"
              >
                <span>{urgentNotice ? 'Read Circular' : 'Apply Online'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setShowTopBanner(false)}
                className="text-slate-400 hover:text-white p-0.5"
                title="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

      {/* Main Page Dynamic Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />

      {/* Floating Action Buttons (Helpline & WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating Quick Enquiry Pill */}
        <button
          onClick={() => setIsEnquiryModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shadow-xl border border-slate-700/80 transition-transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Admission Enquiry 2027</span>
        </button>

        {/* WhatsApp & Call Dialers */}
        <div className="flex items-center gap-2">
          {/* Director Dial */}
          <a
            href="tel:8368268149"
            className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 group relative"
            title="Call Director: 8368268149"
          >
            <Phone className="w-5 h-5" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
              Director: 8368268149
            </span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/918368268149?text=Hello%2C%20I%20am%20inquiring%20about%20admissions%20at%20Siddhartha%20International%20Group%20of%20Schools"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 group relative"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
              WhatsApp Support
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
