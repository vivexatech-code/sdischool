import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { LeadershipCards } from '@/components/LeadershipCards';
import { INITIAL_BRANCHES } from '@/lib/seedData';
import { formatPhone } from '@/lib/utils';
import { Phone, Mail, MapPin, Building2, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us & Campus Directory | Siddhartha International Schools',
  description: 'Reach out to Siddhartha International Group of Schools. Contact Director Sandeep Kumar (8368268149) or Manager Kalpna Kumari (9355135904), or visit any of our 12 Gurugram branches.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Contact & Helpdesk"
        subtitle="Connect with our centralized admissions office or reach out directly to the principal and administrative desk of any of our 12 Gurugram campuses."
        tag="Reach Our Team"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Executive Directorate Cards */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Direct Lines</span>
            <h2 className="text-2xl font-bold text-slate-900">Executive School Leadership</h2>
            <p className="text-xs text-slate-600">Directly available for parent consultations, admissions queries, and grievances.</p>
          </div>
          <LeadershipCards />
        </section>

        {/* Central Secretariat Info */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Central Secretariat Address</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Siddhartha International Group of Schools, Central Corporate Office, Sector 14, Old Judicial Complex Zone, Gurugram, Haryana 122001, India.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Office & Visitor Timings</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monday to Saturday: 8:00 AM to 3:30 PM<br />
                Sunday: Closed (Helpline available by prior appointment)
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Email & Correspondence</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                General Queries: <a href="mailto:info@siddharthaschools.edu.in" className="text-amber-400 hover:underline">info@siddharthaschools.edu.in</a><br />
                Admissions: <a href="mailto:admissions@siddharthaschools.edu.in" className="text-amber-400 hover:underline">admissions@siddharthaschools.edu.in</a>
              </p>
            </div>
          </div>
        </section>

        {/* 12 Campuses Detailed Contact Directory */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Campus Directory</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">12 Gurugram Branch Contact Details</h2>
            <p className="text-xs text-slate-600 mt-0.5">Contact the campus closest to your residence directly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_BRANCHES.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[10px] font-extrabold uppercase">
                      {b.board}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">{b.sector}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{b.name}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{b.address}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <a href={`tel:${b.phone}`} className="text-amber-700 hover:underline font-mono flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>{formatPhone(b.phone)}</span>
                  </a>
                  <Link href={`/branches/${b.slug}`} className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
                    <span>View Campus</span> &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
