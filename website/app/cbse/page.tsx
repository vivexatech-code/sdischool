import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CheckCircle2, ArrowRight, BookOpen, Award, FileCheck, Phone } from 'lucide-react';
import Link from 'next/link';
import { formatPhone } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'CBSE Curriculum & Affiliation | Siddhartha International Schools Gurugram',
  description: 'CBSE affiliation details, continuous comprehensive evaluation (CCE), NCERT curriculum, and competitive JEE/NEET preparation across Siddhartha International School campuses.',
};

export default function CbsePage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="CBSE Affiliation & Curriculum"
        subtitle="Delivering the premier Central Board of Secondary Education framework across our Gurugram campuses, preparing students for national excellence and competitive university admissions."
        tag="National Academic Framework"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics', href: '/academics' }, { label: 'CBSE' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Overview Card */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider">
              CBSE Affiliated
            </span>
            <span className="text-xs font-bold text-slate-400">English Medium Instruction</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            National Standard for Holistic Education
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            The Central Board of Secondary Education (CBSE) is India's most recognized national school education board. At Siddhartha International Group of Schools, our CBSE curriculum follows the latest National Education Policy (NEP) guidelines, integrating multidisciplinary thinking, vocational skilling, coding, sports, and continuous comprehensive evaluation (CCE).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {[
              'NCERT Based Academic Framework',
              'Internal Assessments & Laboratory Practicals',
              'Pre-Board Diagnostic Testing Series',
              'Coding & Artificial Intelligence Electives',
              'Olympiad & NTSE Coaching Support',
              'All-India Relocation & Transferability',
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/60 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Campuses Offering CBSE */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Campuses</span>
              <h3 className="text-2xl font-bold mt-1">Siddhartha CBSE Campuses in Gurugram</h3>
              <p className="text-xs text-slate-300 mt-1">Offering full CBSE certification from Play School through Class 12.</p>
            </div>
            <Link
              href="/branches"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs self-start sm:self-auto transition-colors"
            >
              Browse All CBSE Branches
            </Link>
          </div>
        </section>

        {/* Admission CTA */}
        <section className="bg-amber-50 rounded-3xl p-8 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Enquire for CBSE Admissions 2026-27</h3>
            <p className="text-xs text-slate-600 mt-1">Prospectus and fee structures available across all Gurugram branches.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
            >
              Submit Application
            </Link>
            <a
              href="tel:8368268149"
              className="px-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 font-bold text-xs flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>{formatPhone('8368268149')}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
