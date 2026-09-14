import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { LeadershipCards } from '@/components/LeadershipCards';
import { AdmissionFormClient } from './AdmissionFormClient';
import { CheckCircle2, FileText, Calendar, Phone, Sparkles, HelpCircle } from 'lucide-react';
import { formatPhone } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Admissions 2026-27 | Play School to Class 12 | Gurugram',
  description: 'Admissions open for session 2026-27 across all 12 campuses of Siddhartha International Group of Schools in Gurugram. Apply online or connect with our directorate.',
};

export default function AdmissionsPage() {
  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Admissions 2026-27 Open"
        subtitle="We invite parents to enroll their children for Play School through Class 12 across our 12 Gurugram campuses under CBSE and HBSE curriculums."
        tag="Enrollment Desk"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admissions' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Admission Process Steps */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Simple & Transparent</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Three-Step Admission Flow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">Online Registration & Enquiry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill out the application form on this page or call our leadership desk. Our team will verify your preferred campus and class slot.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-black flex items-center justify-center text-base">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">Campus Tour & Child Interaction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visit the designated branch to inspect classrooms, labs, and sports arenas, followed by an informal, encouraging interaction with the principal.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-base">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">Document Submission & Seat Allocation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit basic required documentation, finalize transportation routes, and receive your welcome kit and student ID confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* Form and Documents Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                Direct Submission
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                Online Admission Application
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Your application will be instantly routed to the branch administration and school directorate.
              </p>
            </div>

            <AdmissionFormClient />
          </div>

          {/* Documents Checklist & Age Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            {/* Required Documents */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Documents Required for Admission</h3>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Child's Official Birth Certificate (Municipal Corporation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Recent passport-size color photographs (4 of student, 2 of each parent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Aadhar Card copies (Child and Parents/Guardians)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Original Transfer Certificate (TC) from previous school (Class 1 onwards)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Previous academic year report card / marksheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Proof of Residence (Electricity bill, Passport, or Rent agreement)</span>
                </li>
              </ul>
            </div>

            {/* Age Criteria */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Age Guidelines (As of 31st March 2026)</h3>
              </div>

              <div className="divide-y divide-slate-100 text-xs text-slate-700">
                <div className="py-2 flex justify-between">
                  <span className="font-semibold text-slate-900">Play School / Nursery</span>
                  <span className="font-bold text-amber-800">2.5 to 3 Years</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-semibold text-slate-900">LKG (Lower Kindergarten)</span>
                  <span className="font-bold text-amber-800">3.5 to 4 Years</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-semibold text-slate-900">UKG (Upper Kindergarten)</span>
                  <span className="font-bold text-amber-800">4.5 to 5 Years</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="font-semibold text-slate-900">Class 1</span>
                  <span className="font-bold text-amber-800">5.5 to 6 Years</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Helpline */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Speak Directly with School Leadership</h3>
            <p className="text-xs text-slate-600">Immediate telephone guidance for queries and special category admissions.</p>
          </div>
          <LeadershipCards />
        </section>
      </div>
    </div>
  );
}
