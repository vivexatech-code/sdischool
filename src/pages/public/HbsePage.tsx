import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo } from '../../lib/seo';
import { Award, CheckCircle2, BookOpen, GraduationCap, Building2, Sparkles } from 'lucide-react';

export const HbsePage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'HBSE Curriculum | Haryana Board of School Education | Siddhartha International',
      description: 'Haryana Board (HBSE) education at Siddhartha International Group of Schools across 12 branches in Gurugram. English medium instruction, state exams readiness.',
      canonicalUrl: `${window.location.origin}/hbse`,
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="HBSE Board Wing"
        subtitle="Haryana Board of School Education — structured state curriculum delivering academic depth, English medium fluency, and regional career alignment."
        badge="State Board Curriculum"
        breadcrumbs={[{ label: 'Academics', href: '/academics' }, { label: 'HBSE' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              State Board Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why HBSE at Siddhartha International?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Siddhartha International Group of Schools, we conduct HBSE education in English Medium with the exact same high standards of lab infrastructure, smart classrooms, and faculty support that define our CBSE campuses. HBSE offers students a balanced, highly manageable syllabus designed to excel in Haryana state public service examinations, defense recruitments, polytechnic entry, and general degree courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <BookOpen className="w-6 h-6 text-sky-600" />
              <h4 className="font-bold text-slate-900">English Medium Instruction</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete classroom teaching, assignments, and test preparation conducted in English Medium.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-6 h-6 text-sky-600" />
              <h4 className="font-bold text-slate-900">Dedicated Exam Coaching</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Targeted chapterwise problem solving and board paper evaluation conducted by seasoned mentors.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <GraduationCap className="w-6 h-6 text-sky-600" />
              <h4 className="font-bold text-slate-900">State Service Advantage</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ideal syllabus alignment for students pursuing state government opportunities, military academies, and diplomas.
              </p>
            </div>
          </div>
        </div>

        {/* Board Comparison Note */}
        <div className="p-8 rounded-2xl bg-sky-950 text-white space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Uncertain Between CBSE and HBSE?</h3>
          <p className="text-xs sm:text-sm text-sky-200 leading-relaxed max-w-3xl">
            Our academic counselors analyze your child's learning style and future goals to recommend the optimal board pathway. You can discuss options directly with our leadership:
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <a href="tel:8368268149" className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400">
              Call Director Sandeep Kumar: 8368268149
            </a>
            <a href="tel:9355135904" className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 border border-slate-700">
              Call Manager Kalpna Kumari: 9355135904
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
