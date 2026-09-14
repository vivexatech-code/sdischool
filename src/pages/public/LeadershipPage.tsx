import React, { useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { LeadershipCards } from '../../components/common/LeadershipCards';
import { updateDocumentSeo } from '../../lib/seo';
import { Phone, Mail, Award, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import { formatPhone } from '../../lib/utils';

export const LeadershipPage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'School Leadership | Director Sandeep Kumar & Manager Kalpna Kumari | Siddhartha International',
      description: 'Meet the executive leadership of Siddhartha International Group of Schools. Director Sandeep Kumar (8368268149) and Manager Kalpna Kumari (9355135904). Reach out directly.',
      canonicalUrl: `${window.location.origin}/leadership`,
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Executive Leadership"
        subtitle="Dedicated to pedagogical excellence, student safety, and direct parent engagement across our 12 Gurugram campuses."
        badge="Governance & Vision"
        breadcrumbs={[{ label: 'Leadership' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Leadership Cards */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Meet Our School Leadership
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Our Director and Manager oversee strategic growth, academic rigor, teacher development, and campus operations.
            </p>
          </div>

          <LeadershipCards />
        </div>

        {/* Leadership Philosophy */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Administrative Philosophy
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Accessible Governance with an Open Door Policy
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Unlike monolithic institutions where parents struggle to reach executive authorities, Siddhartha International Group of Schools maintains direct accessibility. Both our Director and Manager are on hand for parent consultations, curriculum evaluations, and student welfare inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Uncompromising Safety</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct oversight on security drills, verified background checks for all staff, and GPS surveillance.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Academic Accountability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular classroom reviews, standardized lesson planning, and continuous teacher training workshops.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Parent-Centric Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quarterly parent-teacher interactions, transparent fee structures, and personalized remedial tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact Strip */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Need to consult school leadership?</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Director Sandeep Kumar: 8368268149 • Manager Kalpna Kumari: 9355135904
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:8368268149"
              className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Director</span>
            </a>
            <a
              href="tel:9355135904"
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Manager</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
