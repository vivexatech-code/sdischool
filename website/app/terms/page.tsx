import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Terms of Service | Siddhartha International Group of Schools',
  description: 'Terms and conditions governing admissions, code of conduct, fee regulations, and campus usage at Siddhartha International Group of Schools.',
};

export default function TermsPage() {
  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Terms & Institutional Regulations"
        subtitle="General guidelines, admissions regulations, and campus decorum standards across our 12 Gurugram campuses."
        tag="Institutional Guidelines"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Admissions & Enrollment Acceptance</h2>
            <p>
              Admission to Siddhartha International Group of Schools is subject to seat availability, document verification, and adherence to age eligibility norms mandated by CBSE and the Directorate of School Education, Haryana. Submission of an enquiry does not guarantee confirmed admission until official fee deposit and documentation are completed.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Fee Regulations & Schedules</h2>
            <p>
              Tuition, transport, and examination fees must be deposited within stipulated due dates published in the academic calendar. Any late fees or adjustments are handled as per standard institutional policy approved by the school management.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Student Code of Conduct & Campus Decorum</h2>
            <p>
              Students and guardians are expected to maintain the highest standards of respect, punctuality, and mutual decency toward faculty, fellow students, and campus property. Bullying, ragging, or disruptive conduct carries zero tolerance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Inter-Branch Transfer Protocol</h2>
            <p>
              Enrolled students may apply for transfer between any of our 12 Gurugram branches subject to seat vacancy in the requested branch and clearance of dues from the transferring branch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
