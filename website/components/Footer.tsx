import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { formatPhone } from '@/lib/utils';
import { INITIAL_BRANCHES } from '@/lib/seedData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Executive Admissions Helpline</span>
                <p className="text-slate-400 mt-0.5">Direct guidance for play school through senior secondary admissions.</p>
                <div className="mt-2 space-y-0.5 font-mono text-slate-200">
                  <div>Director Sandeep Kumar: <a href="tel:8368268149" className="text-amber-400 hover:underline">{formatPhone('8368268149')}</a></div>
                  <div>Manager Kalpna Kumari: <a href="tel:9355135904" className="text-amber-400 hover:underline">{formatPhone('9355135904')}</a></div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Central Admissions Office</span>
                <p className="text-slate-400 mt-0.5">Official communications, document queries & transfer requests.</p>
                <a href="mailto:info@siddharthaschools.edu.in" className="mt-2 block font-medium text-slate-200 hover:text-amber-400">
                  info@siddharthaschools.edu.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Gurugram Network</span>
                <p className="text-slate-400 mt-0.5">12 strategically situated campuses across Old Gurugram, New Gurugram & Sohna Road corridor.</p>
                <Link href="/branches" className="mt-2 inline-flex items-center gap-1 text-amber-400 font-bold hover:underline">
                  <span>Browse all 12 campuses</span> &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg">
                S
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  SIDDHARTHA
                </span>
                <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase block">
                  International Group of Schools
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs pr-4">
              Nurturing academic excellence, moral integrity, and progressive leadership across 12 premier Gurugram campuses. Offering CBSE and HBSE curriculum from Play School to Class 12 in English Medium.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-bold text-amber-400">
                CBSE Affiliated
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-bold text-amber-400">
                HBSE Recognized
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-bold text-emerald-400">
                English Medium
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Academics & Life</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About the Group</Link></li>
              <li><Link href="/leadership" className="hover:text-amber-400 transition-colors">Executive Leadership</Link></li>
              <li><Link href="/academics" className="hover:text-amber-400 transition-colors">Academic Pedagogy</Link></li>
              <li><Link href="/cbse" className="hover:text-amber-400 transition-colors">CBSE Curriculum</Link></li>
              <li><Link href="/hbse" className="hover:text-amber-400 transition-colors">HBSE Curriculum</Link></li>
              <li><Link href="/facilities" className="hover:text-amber-400 transition-colors">Campus Facilities</Link></li>
              <li><Link href="/admissions" className="hover:text-amber-400 transition-colors">Admissions 2026-27</Link></li>
            </ul>
          </div>

          {/* Col 3: Media & Updates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/notices" className="hover:text-amber-400 transition-colors">Circulars & Notices</Link></li>
              <li><Link href="/events" className="hover:text-amber-400 transition-colors">Upcoming Events</Link></li>
              <li><Link href="/gallery" className="hover:text-amber-400 transition-colors">Student Life Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Help Desk & Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="hover:text-amber-400 transition-colors">School Sitemap</Link></li>
            </ul>
          </div>

          {/* Col 4: 12 Branches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">12 Gurugram Branches</h4>
            <ul className="space-y-1.5 text-[11px] max-h-48 overflow-y-auto pr-1">
              {INITIAL_BRANCHES.map(b => (
                <li key={b.id}>
                  <Link href={`/branches/${b.slug}`} className="hover:text-amber-400 transition-colors block truncate">
                    {b.sector} Campus ({b.board})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Siddhartha International Group of Schools. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sitemap" className="hover:text-slate-400">Sitemap</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-400">Terms</Link>
            <span>•</span>
            <a href="/admin-login" className="text-slate-400 hover:text-amber-400 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Staff Login</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
