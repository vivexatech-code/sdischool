import React, { useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo } from '../../lib/seo';

export const TermsConditionsPage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'Terms & Conditions | Siddhartha International Group of Schools Gurugram',
      description: 'Terms and conditions governing the use of Siddhartha International Group of Schools website and admission submissions.',
      canonicalUrl: `${window.location.origin}/terms-conditions`,
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Terms & Conditions"
        subtitle="Guidelines and institutional policies for students, parents, and visitors."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Siddhartha International Group of Schools portal, you agree to comply with all guidelines, codes of conduct, and regulations established by the school governance.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. Admissions & Submissions</h2>
          <p>
            Submitting an online admission enquiry form does not guarantee automatic admission. Final admissions are subject to document verification, seat availability across the specific Gurugram branch, and compliance with CBSE or HBSE age criteria.
          </p>

          <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            All content on this website, including campus photographs, logos, event documentation, curriculum outlines, and text, is the property of Siddhartha International Group of Schools and protected by copyright laws.
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. School Leadership Oversight</h2>
          <p>
            Institutional policies are directed by Director Sandeep Kumar (8368268149) and Manager Kalpna Kumari (9355135904).
          </p>
        </div>
      </div>
    </div>
  );
};
