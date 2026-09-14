import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { LeadershipCards } from '@/components/LeadershipCards';
import { Award, BookOpen, ShieldCheck, Heart, Users, Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Siddhartha International Group of Schools | Gurugram, Haryana',
  description: 'Learn about Siddhartha International Group of Schools, operating 12 campuses in Gurugram. Over 25 years of educational distinction under CBSE and HBSE frameworks.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="About Our Educational Group"
        subtitle="For more than two decades, Siddhartha International Group of Schools has been an enduring pillar of academic rigor, character building, and innovative learning in Gurugram."
        tag="Institutional Legacy"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Values & Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To cultivate intellectually fearless, morally grounded global citizens equipped with modern analytical capabilities, empathetic leadership, and dedication to societal progress.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To provide accessible, highest-caliber schooling across all sectors of Gurugram through integrated CBSE and HBSE frameworks, fostering balanced development in academics, sports, and arts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Heritage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Founded on genuine educational service, expanding from a singular neighborhood center to a trusted network of 12 modern campuses serving thousands of student families across Haryana.
            </p>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Management & Direction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Executive Directorate
            </h2>
            <p className="text-xs text-slate-600">
              Accessible, accountable leadership available for parent consultations and student welfare.
            </p>
          </div>

          <LeadershipCards />
        </section>

        {/* Why Choose Us */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              The Siddhartha Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Why Gurugram Families Choose Siddhartha
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '12 Prime Gurugram Locations',
                desc: 'Located across Sector 14, 45, 56, 4, 10A, Palam Vihar, and more for minimal commute times.',
              },
              {
                title: 'Dual CBSE & HBSE Flexibility',
                desc: 'Choose between national competitive preparation (CBSE) and state board accreditation (HBSE).',
              },
              {
                title: 'Complete Play School to 12th Span',
                desc: 'Seamless educational continuity under one trusted umbrella throughout childhood and adolescence.',
              },
              {
                title: 'Smart Digital Classrooms',
                desc: 'Audio-visual interactive whiteboards, multimedia modules, and digital learning platforms.',
              },
              {
                title: 'Science, Robotics & Computer Labs',
                desc: 'Hands-on practical equipment complying with national secondary and higher secondary standards.',
              },
              {
                title: 'Secure GPS-Enabled Bus Fleet',
                desc: 'Comprehensive route coverage across Gurugram, verified drivers, and safety attendants.',
              },
            ].map((adv, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <h4 className="font-bold text-white text-sm">{adv.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">{adv.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
