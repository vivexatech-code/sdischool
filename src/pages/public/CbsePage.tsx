import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo } from '../../lib/seo';
import { Award, CheckCircle2, BookOpen, GraduationCap, Building2, Sparkles } from 'lucide-react';

export const CbsePage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'CBSE Curriculum | Siddhartha International Group of Schools Gurugram',
      description: 'CBSE Board education from Play School to Class 12 at Siddhartha International Group of Schools, Gurugram. National syllabus, STEM focus, board exam excellence.',
      canonicalUrl: `${window.location.origin}/cbse`,
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="CBSE Board Wing"
        subtitle="Central Board of Secondary Education — nationally benchmarked curriculum fostering inquiry, critical thinking, and competitive exam readiness."
        badge="National Curriculum"
        breadcrumbs={[{ label: 'Academics', href: '/academics' }, { label: 'CBSE' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              National Recognition
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why CBSE at Siddhartha International?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The CBSE curriculum follows NCERT guidelines, forming the definitive foundation for major pan-India entrance examinations including JEE (Main & Advanced), NEET, CUET, NDA, and CLAT. Our curriculum delivery emphasizes deep conceptual clarity rather than rote memorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <h4 className="font-bold text-slate-900">NCERT Aligned</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized books and learning materials ensuring seamless interstate relocation and national exam synergy.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-6 h-6 text-amber-600" />
              <h4 className="font-bold text-slate-900">Continuous Assessment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Periodic evaluations, project work, speaking-listening assessments, and laboratory practicals.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <GraduationCap className="w-6 h-6 text-amber-600" />
              <h4 className="font-bold text-slate-900">Global Acceptance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Globally recognized board certification valued by top Indian and international universities.
              </p>
            </div>
          </div>
        </div>

        {/* Classes Under CBSE */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 space-y-6">
          <h3 className="text-2xl font-bold">CBSE Stream Options for Class 11 & 12</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
              <h4 className="text-lg font-bold text-amber-300">Science Stream</h4>
              <p className="text-xs text-slate-300">
                Physics, Chemistry, Mathematics / Biology, Computer Science / Physical Education, English Core. Dedicated laboratory sessions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
              <h4 className="text-lg font-bold text-amber-300">Commerce Stream</h4>
              <p className="text-xs text-slate-300">
                Accountancy, Business Studies, Economics, Applied Mathematics, Informatics Practices, English Core.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
              <h4 className="text-lg font-bold text-amber-300">Humanities / Arts</h4>
              <p className="text-xs text-slate-300">
                History, Political Science, Economics, Psychology, Geography, English Core.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/branches"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-bold text-sm hover:bg-amber-700 shadow-md"
          >
            <Building2 className="w-4 h-4" />
            <span>Find CBSE Branches in Gurugram</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
