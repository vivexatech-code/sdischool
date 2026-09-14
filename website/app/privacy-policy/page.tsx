import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Privacy Policy | Siddhartha International Group of Schools',
  description: 'Privacy policy and student data protection standards of Siddhartha International Group of Schools, Gurugram, Haryana.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Privacy Policy & Student Data Protection"
        subtitle="Our commitment to safeguarding student, parent, and institutional data across our 12 Gurugram campuses."
        tag="Legal & Compliance"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              Siddhartha International Group of Schools collects personal information submitted during admission inquiries, registrations, school portal logins, and fee payments. This includes student names, dates of birth, parent/guardian contact details, home addresses, previous educational records, and medical emergency information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Purpose and Usage of Data</h2>
            <p>
              Collected information is exclusively utilized for academic administration, board registration (CBSE / HBSE), communication of circulars, attendance logging, transport coordination, emergency healthcare response, and student achievement records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Non-Disclosure & Security</h2>
            <p>
              We do not sell, rent, or trade student or family personal information to third-party commercial marketers. Data is protected with encrypted database protocols, authorized role-based access control, and strict confidentiality compliance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Contact the Data Protection Officer</h2>
            <p>
              For inquiries regarding student records or data modifications, please contact the Central Admissions Office at info@siddharthaschools.edu.in or call 8368268149.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
