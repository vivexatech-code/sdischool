import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Building2, Shield, Heart } from 'lucide-react';
import { useSite } from '../../contexts/SiteContext';
import { formatPhone } from '../../lib/utils';

export interface FooterProps {
  onOpenEnquiry?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  const { branches, siteSettings } = useSite();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Key Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-xl">
                SIS
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  SIDDHARTHA
                </h3>
                <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  International Group of Schools
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering young minds for a brighter future across 12 premier branches in Gurugram, Haryana. Quality English Medium education from Play School to Class 12 affiliated with CBSE & HBSE.
            </p>

            {/* Leadership Contacts */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                School Leadership Contacts
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400 font-medium">Director: Sandeep Kumar</span>
                <a 
                  href="tel:8368268149" 
                  className="font-bold text-amber-300 hover:text-white flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>8368268149</span>
                </a>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400 font-medium">Manager: Kalpna Kumari</span>
                <a 
                  href="tel:9355135904" 
                  className="font-bold text-amber-300 hover:text-white flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>9355135904</span>
                </a>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
                <span className="text-slate-400">Head Office:</span>
                <span className="text-slate-200">Gurugram, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-300 transition-colors">
                  About the School Group
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Director & Manager Leadership
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Academics (Play School - 12)
                </Link>
              </li>
              <li>
                <Link to="/cbse" className="text-slate-400 hover:text-amber-300 transition-colors">
                  CBSE Curriculum
                </Link>
              </li>
              <li>
                <Link to="/hbse" className="text-slate-400 hover:text-amber-300 transition-colors">
                  HBSE Curriculum
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Campus Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Parent Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Admissions & Events
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admissions" className="text-slate-400 hover:text-amber-300 transition-colors font-medium">
                  Admissions & Enquiry
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Events & Functions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Photo & Event Gallery
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Notices & Circulars
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-slate-400 hover:text-amber-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: 12 Gurugram Branches Quick Access */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                12 Gurugram Branches
              </h4>
              <Link to="/branches" className="text-[10px] text-amber-500 hover:underline">
                View all
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-1 text-[11px]">
              {branches.slice(0, 10).map((b) => (
                <li key={b.id}>
                  <Link
                    to={`/branches/${b.slug}`}
                    className="text-slate-400 hover:text-amber-300 transition-colors block truncate"
                  >
                    • {b.sector} Campus
                  </Link>
                </li>
              ))}
              {branches.length > 10 && (
                <li>
                  <Link to="/branches" className="text-amber-400 text-[10px] hover:underline">
                    + more branches &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Siddhartha International Group of Schools. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap.xml
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/robots" className="hover:text-slate-300 transition-colors">
              robots.txt
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/terms-conditions" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/admin/login" className="text-slate-400 hover:text-amber-400 font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
