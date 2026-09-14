import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { LeadershipCards } from '@/components/LeadershipCards';
import { Phone, Mail, Award, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { formatPhone } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Executive Leadership | Director Sandeep Kumar & Manager Kalpna Kumari',
  description: 'Meet the executive administration of Siddhartha International Group of Schools. Director Sandeep Kumar (8368268149) and Manager Kalpna Kumari (9355135904).',
};

export default function LeadershipPage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Institutional Leadership"
        subtitle="Our institutional directors and administrators bring hands-on dedication, ethical stewardship, and progressive vision to our 12 Gurugram campuses."
        tag="Governance & Administration"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Leadership' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Leadership Cards */}
        <section className="space-y-4">
          <LeadershipCards />
        </section>

        {/* Message from the Director */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              SK
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Message from the Director</h2>
              <span className="text-xs font-semibold text-amber-700">Sandeep Kumar • Director</span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              "Dear Parents and Students,
              Education is far more than rote memorization or exam percentages. At Siddhartha International Group of Schools, we understand that every child entrusted to us carries immense boundless potential. Our mission is to provide an environment that fosters intellectual curiosity, resilience, moral integrity, and modern competence.
            </p>
            <p>
              Across our 12 campuses in Gurugram, we have invested meticulously in modern classrooms, laboratory infrastructure, certified educator training, and safety protocols. Whether your family chooses the national CBSE curriculum or the state HBSE framework, our promise remains unwavering: your child will receive individual attention, mentorship, and opportunities to shine."
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Direct Phone Helpline: <a href="tel:8368268149" className="font-bold text-slate-900 font-mono">{formatPhone('8368268149')}</a>
            </div>
            <Link
              href="/admissions"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Schedule an In-Person Consultation
            </Link>
          </div>
        </section>

        {/* Message from the Manager */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
              KK
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Administrative Address</h2>
              <span className="text-xs font-semibold text-sky-700">Kalpna Kumari • Manager</span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              "To our prospective and current families,
              Managing an educational institution with 12 thriving branches requires unwavering commitment to transparent administration, parent-school collaboration, and prompt responsiveness. My office ensures that administrative procedures — from admission documentation and bus route coordination to scholarship dispensations and branch transfers — run smoothly and respectfully.
            </p>
            <p>
              We welcome parents to visit our campuses, inspect our facilities, and interact directly with our teachers and principals. We look forward to welcoming you into the Siddhartha family."
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Administrative Desk: <a href="tel:9355135904" className="font-bold text-slate-900 font-mono">{formatPhone('9355135904')}</a>
            </div>
            <a
              href="mailto:info@siddharthaschools.edu.in"
              className="text-xs font-bold text-sky-700 hover:underline"
            >
              info@siddharthaschools.edu.in
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
