import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { GraduationCap, BookOpen, Brain, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Academic Pedagogy & Streams | Siddhartha International Schools',
  description: 'Academic structure from Play School to Class 12 across CBSE and HBSE frameworks. Science, Commerce, and Arts streams with modern experiential teaching.',
};

export default function AcademicsPage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Academic Excellence"
        subtitle="A comprehensive pedagogical model combining conceptual clarity, hands-on scientific experimentation, creative expression, and rigorous board exam readiness."
        tag="Curriculum & Learning"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Tier Stages */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Pedagogical Stages</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Foundations to Higher Secondary</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stage: 'Early Childhood',
                classes: 'Play School, LKG, UKG',
                desc: 'Montessori-aligned tactile play, linguistic phonics, numeracy basics, gross & fine motor development in dedicated child-friendly zones.',
                color: 'from-amber-500 to-amber-600',
              },
              {
                stage: 'Primary Wing',
                classes: 'Classes 1 to 5',
                desc: 'Inquiry-based foundational education emphasizing language proficiency, mathematical logic, environmental science, and basic computing.',
                color: 'from-sky-500 to-sky-600',
              },
              {
                stage: 'Middle School',
                classes: 'Classes 6 to 8',
                desc: 'Transitional conceptual mastery introducing specialized physics, chemistry, biology, social sciences, third languages, and robotics.',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                stage: 'Secondary & Senior Sec',
                classes: 'Classes 9 to 12',
                desc: 'Focused preparation for CBSE / HBSE board certifications alongside competitive guidance for JEE, NEET, CUET, NDA, and commerce careers.',
                color: 'from-emerald-500 to-emerald-600',
              },
            ].map((stg, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stg.color} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                    0{i + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{stg.stage}</h3>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                    {stg.classes}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{stg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Senior Secondary Streams Breakdown */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Class 11 & 12 Options</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Senior Secondary Stream Offerings</h2>
            <p className="text-xs sm:text-sm text-slate-600">Guided by senior faculty examiners with exceptional track records in board and competitive test results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Science */}
            <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                Science Stream
              </span>
              <h4 className="text-lg font-bold text-slate-900">Medical (PCB) & Non-Medical (PCM)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physics, Chemistry, Mathematics, Biology, Computer Science, and Artificial Intelligence with integrated JEE/NEET laboratory practice.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>State-of-the-art Composite Laboratories</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Regular mock test cycles and formula workshops</span>
                </li>
              </ul>
            </div>

            {/* Commerce */}
            <div className="p-6 rounded-2xl bg-sky-50/40 border border-sky-200 space-y-4">
              <span className="px-3 py-1 rounded-full bg-sky-600 text-white font-black text-xs uppercase tracking-wider">
                Commerce Stream
              </span>
              <h4 className="text-lg font-bold text-slate-900">Finance & Corporate Leadership</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accountancy, Business Studies, Economics, Applied Mathematics, and Informatics Practices with financial literacy workshops.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>CA Foundation & CUET oriented mock series</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Real-world case study presentations</span>
                </li>
              </ul>
            </div>

            {/* Arts */}
            <div className="p-6 rounded-2xl bg-purple-50/40 border border-purple-200 space-y-4">
              <span className="px-3 py-1 rounded-full bg-purple-600 text-white font-black text-xs uppercase tracking-wider">
                Humanities Stream
              </span>
              <h4 className="text-lg font-bold text-slate-900">Arts & Social Sciences</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                History, Political Science, Psychology, Sociology, Geography, Economics, and English Core for civil services and creative careers.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Debating societies and model parliamentary sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>UPSC & Law entrance foundation tracks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Board Links */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curriculum 01</span>
              <h3 className="text-2xl font-bold mt-1">Central Board of Secondary Education (CBSE)</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Explore detailed syllabus breakdowns, grading criteria, and branch offerings under the national CBSE board.
              </p>
            </div>
            <Link
              href="/cbse"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
            >
              <span>Read complete CBSE curriculum details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Curriculum 02</span>
              <h3 className="text-2xl font-bold mt-1">Haryana Board of School Education (HBSE)</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Learn about state board credentials, English Medium pedagogy, fee structure, and scholarship offerings.
              </p>
            </div>
            <Link
              href="/hbse"
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 pt-2"
            >
              <span>Read complete HBSE curriculum details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
