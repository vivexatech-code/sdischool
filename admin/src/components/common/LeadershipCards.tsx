import React from 'react';
import { Phone, MessageSquare, Award, CheckCircle2 } from 'lucide-react';
import { formatPhone } from '../../lib/utils';

export const LeadershipCards: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${compact ? 'max-w-4xl mx-auto' : ''}`}>
      {/* Director Card */}
      <div 
        id="leadership-director-card"
        className="relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900 text-amber-400 font-bold text-xl sm:text-2xl flex items-center justify-center ring-4 ring-amber-100 flex-shrink-0">
              SK
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                <Award className="w-3 h-3" />
                <span>Executive Leadership</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Sandeep Kumar</h3>
              <p className="text-sm font-medium text-slate-600">Director</p>
              <p className="text-xs text-slate-500">Siddhartha International Group of Schools</p>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          "Our vision is to build an inspiring educational ecosystem across Gurugram where every child from Play School to Class 12 acquires academic excellence, ethical integrity, and 21st-century problem-solving capabilities."
        </p>

        <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Direct Contact</span>
            <a 
              href="tel:8368268149"
              className="inline-flex items-center text-slate-900 font-bold text-base hover:text-amber-600 transition-colors"
              title="Call Sandeep Kumar, Director"
            >
              <Phone className="w-4 h-4 mr-2 text-amber-600" />
              <span>{formatPhone('8368268149')}</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:8368268149"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span>Call Director</span>
            </a>
            <a
              href="https://wa.me/918368268149"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-lg border border-slate-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="WhatsApp Director"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Manager Card */}
      <div 
        id="leadership-manager-card"
        className="relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col justify-between"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900 text-amber-400 font-bold text-xl sm:text-2xl flex items-center justify-center ring-4 ring-amber-100 flex-shrink-0">
              KK
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 mb-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Administration & Operations</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Kalpna Kumari</h3>
              <p className="text-sm font-medium text-slate-600">Manager</p>
              <p className="text-xs text-slate-500">Siddhartha International Group of Schools</p>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          "Ensuring safe, supportive, and well-managed environments across all our 12 Gurugram campuses. We partner closely with parents to provide seamless administration, safety, and enriching student life."
        </p>

        <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">Direct Contact</span>
            <a 
              href="tel:9355135904"
              className="inline-flex items-center text-slate-900 font-bold text-base hover:text-amber-600 transition-colors"
              title="Call Kalpna Kumari, Manager"
            >
              <Phone className="w-4 h-4 mr-2 text-amber-600" />
              <span>{formatPhone('9355135904')}</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:9355135904"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span>Call Manager</span>
            </a>
            <a
              href="https://wa.me/919355135904"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-lg border border-slate-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="WhatsApp Manager"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
