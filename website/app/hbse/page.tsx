import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CheckCircle2, ArrowRight, BookOpen, Award, FileCheck, Phone } from 'lucide-react';
import Link from 'next/link';
import { formatPhone } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'HBSE Curriculum & Affiliation | Siddhartha International Schools Gurugram',
  description: 'Haryana Board of School Education (HBSE) affiliated education delivered in English Medium across Siddhartha International School campuses in Gurugram.',
};

export default function HbsePage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="HBSE Affiliation & Curriculum"
        subtitle="Accredited under the Haryana Board of School Education, offering rigorous, affordable, and English Medium education with stellar state board pass percentages."
        tag="State Board Recognition"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics', href: '/academics' }, { label: 'HBSE' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Overview Card */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-sky-600 text-white font-black text-sm uppercase tracking-wider">
              HBSE Recognized
            </span>
            <span className="text-xs font-bold text-slate-400">English Medium Instruction</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            State Accredited Excellence with Modern English Pedagogy
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            Siddhartha International Group of Schools is proud to offer Haryana Board of School Education (HBSE) accredited tracks. While following state curricular norms, our campuses conduct all lectures, assessments, laboratory practicals, and activities entirely in English Medium, guaranteeing high proficiency alongside regional academic benefits.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {[
              '100% English Medium Teaching & Study Material',
              'Consistent Top Merit Scores in Haryana Board Exams',
              'Subsidized and Accessible Fee Structure',
              'Merit-Based Scholarships for Deserving Scholars',
              'Ideal Alignment for State Services & Defense Wings',
              'Dedicated Faculty with Decade-Long Board Experience',
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-sky-50/40 border border-sky-200/60 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Admission CTA */}
        <section className="bg-sky-50 rounded-3xl p-8 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Enquire for HBSE English Medium Admissions</h3>
            <p className="text-xs text-slate-600 mt-1">Play School to Class 12 admissions open across Gurugram branches.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
            >
              Apply Online
            </Link>
            <a
              href="tel:9355135904"
              className="px-4 py-3 rounded-xl bg-white text-slate-900 border border-slate-300 font-bold text-xs flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>{formatPhone('9355135904')}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
