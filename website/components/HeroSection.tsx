'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  ChevronRight,
  BookOpen,
  MapPin
} from 'lucide-react';
import { formatPhone } from '@/lib/utils';
import { EnquiryModal } from './EnquiryModal';

export const HeroSection: React.FC = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <>
      <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-800">
        {/* Ambient Lighting Gradients (Subtle & Elegant) */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>12 Premier Campuses Across Gurugram, Haryana</span>
              </div>

              {/* Main Editorial Display Typography */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Confident Minds.</span>
                  <br />
                  Shaping Bright Futures.
                </h1>
                
                <p className="text-lg sm:text-xl font-medium text-amber-200/90 tracking-wide">
                  Siddhartha International Group of Schools
                </p>
              </div>

              {/* Supporting Educational Scope */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Empowering young minds with holistic, values-driven education from <strong className="text-white font-semibold">Play School to Class 12</strong> under dual <strong className="text-white font-semibold">CBSE & HBSE</strong> curriculum frameworks taught entirely in English Medium.
              </p>

              {/* Hero Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-amber-400">12</div>
                  <div className="text-[11px] font-semibold text-slate-300">Gurugram Branches</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-white">Play – XII</div>
                  <div className="text-[11px] font-semibold text-slate-300">Classes Offered</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-sky-400">CBSE & HBSE</div>
                  <div className="text-[11px] font-semibold text-slate-300">Dual Boards</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-emerald-400">English</div>
                  <div className="text-[11px] font-semibold text-slate-300">Medium of Study</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  href="/branches"
                  className="px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Our Branches</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-sm border border-slate-700/80 hover:border-amber-400/60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>Admission Enquiry</span>
                </button>
              </div>

              {/* Leadership Quick Connect Strip */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Direct Leadership Helplines:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-slate-200">
                  <a
                    href="tel:8368268149"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Director Sandeep Kumar ({formatPhone('8368268149')})</span>
                  </a>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <a
                    href="tel:9355135904"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Manager Kalpna Kumari ({formatPhone('9355135904')})</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Visual Image Column (Dominant, Cinematic Editorial Image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Background Shadow Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-sky-500/20 rounded-3xl blur-2xl transform scale-95 opacity-60" />

                {/* Main Hero Visual Card */}
                <div className="relative rounded-3xl border border-slate-800/90 bg-slate-900/90 overflow-hidden shadow-2xl">
                  {/* Dominant High-Quality School Image */}
                  <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop"
                      alt="Siddhartha International School modern campus and learners"
                      className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    />
                    {/* Dark gradient overlay for typography readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Top Floating Badge on Image */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Admissions Open 2027–28</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        Gurugram Network
                      </span>
                    </div>

                    {/* Bottom Inset Information Panel */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 space-y-2 text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          12 Branches Across Gurugram
                        </span>
                        <span className="text-[11px] text-slate-300 font-mono">Sector 14 to Sohna Rd</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        Modern infrastructure, smart interactive classrooms, science and robotics laboratories, sports courts, and verified GPS transport.
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Strip Below Image */}
                  <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="text-slate-300 font-medium">
                      Looking for the nearest campus?
                    </div>
                    <Link
                      href="/branches"
                      className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Locate Campus</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Floating Accent Badge: Classes */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 p-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-xl items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Play School to Class 12</div>
                    <div className="text-[10px] text-slate-400">Complete Educational Journey</div>
                  </div>
                </div>

                {/* Floating Accent Badge: Boards */}
                <div className="hidden sm:flex absolute -top-5 -right-5 p-3 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-xl items-center gap-2.5 z-10">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">CBSE & HBSE</div>
                    <div className="text-[10px] text-slate-400">Accredited Curricula</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </>
  );
};
