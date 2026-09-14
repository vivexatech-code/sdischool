import React, { useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo } from '../../lib/seo';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'Privacy Policy | Siddhartha International Group of Schools Gurugram',
      description: 'Privacy policy for Siddhartha International Group of Schools covering student data privacy, enquiry submissions, and confidentiality.',
      canonicalUrl: `${window.location.origin}/privacy-policy`,
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Privacy Policy"
        subtitle="How Siddhartha International Group of Schools protects and respects student and parent information."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you interact with our website or submit an admission enquiry for any of our 12 Gurugram branches, we collect essential contact details such as the student’s name, parent/guardian name, mobile number, email address, preferred grade, and preferred campus.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>
            The information collected is used exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Connecting you with our admission counselors and branch principals.</li>
            <li>Sharing circulars, fee breakdowns, and school calendar events.</li>
            <li>Scheduling campus tours across our Gurugram locations.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">3. Data Confidentiality & Protection</h2>
          <p>
            We adhere strictly to data privacy norms. We do not sell, lease, or rent your personal contact information to third-party telemarketers or external commercial agencies.
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. Contacting Us Regarding Your Data</h2>
          <p>
            If you have questions regarding data privacy, you may contact our head office at Sector 14, Gurugram, or call Director Sandeep Kumar at 8368268149.
          </p>
        </div>
      </div>
    </div>
  );
};
