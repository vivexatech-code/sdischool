import React from 'react';
import { Phone, Mail, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatPhone } from '@/lib/utils';

export const LeadershipCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Director Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-black text-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
          SK
        </div>
        <div className="space-y-3 flex-1">
          <div>
            <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
              Executive Leadership
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Sandeep Kumar</h3>
            <p className="text-xs font-semibold text-amber-700">Director, Siddhartha International Group of Schools</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Leading pedagogical vision, CBSE/HBSE compliance, institutional ethics, and modern educational infrastructure development across all 12 Gurugram campuses.
          </p>
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 justify-center sm:justify-start text-xs font-semibold">
            <a
              href="tel:8368268149"
              className="inline-flex items-center gap-1.5 text-slate-900 hover:text-amber-600 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>{formatPhone('8368268149')}</span>
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 text-[11px]">Central Direction Office</span>
          </div>
        </div>
      </div>

      {/* Manager Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white font-black text-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
          KK
        </div>
        <div className="space-y-3 flex-1">
          <div>
            <span className="px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200 text-sky-900 text-[10px] font-extrabold uppercase tracking-wider">
              Administrative Leadership
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Kalpna Kumari</h3>
            <p className="text-xs font-semibold text-sky-700">Manager, Siddhartha International Group of Schools</p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Overseeing parent engagement, admissions administration, inter-branch operations, curriculum distribution, and student welfare across all 12 Gurugram branches.
          </p>
          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 justify-center sm:justify-start text-xs font-semibold">
            <a
              href="tel:9355135904"
              className="inline-flex items-center gap-1.5 text-slate-900 hover:text-sky-600 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>{formatPhone('9355135904')}</span>
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 text-[11px]">Admissions & Administration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
