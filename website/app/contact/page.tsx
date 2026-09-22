import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { LeadershipCards } from '@/components/LeadershipCards';
import { INITIAL_BRANCHES } from '@/lib/seedData';
import { formatPhone } from '@/lib/utils';
import { Phone, Mail, MapPin, Building2, Clock, ExternalLink, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { ContactFormClient } from './ContactFormClient';

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

        {/* Contact Form & Quick Help Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                Direct Dispatch
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                Send a Message to Directorate
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Your message is immediately logged and routed directly to the principal or directorate inbox.
              </p>
            </div>

            <ContactFormClient />
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Overview */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-lg text-white">Central Secretariat</h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Headquarters Address</strong>
                    <span>Sector 14, Old Judicial Complex Zone, Gurugram, Haryana 122001, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Visiting Timings</strong>
                    <span>Monday to Saturday: 8:00 AM – 3:30 PM<br />Sunday: Closed</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Official Correspondence</strong>
                    <span>info@siddharthaschools.edu.in<br />admissions@siddharthaschools.edu.in</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Urgent enquiry? Call Director Sandeep Kumar directly at <a href="tel:8368268149" className="text-amber-400 font-bold font-mono">8368268149</a>.
              </div>
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
