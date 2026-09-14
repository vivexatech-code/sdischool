import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo } from '../../lib/seo';
import { BookOpen, CheckCircle2, ChevronRight, Award, Compass, Laptop, Sparkles } from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'Academics | Play School to Class 12 | Siddhartha International Group of Schools Gurugram',
      description: 'Comprehensive academic programs at Siddhartha International Group of Schools across 12 branches in Gurugram. CBSE and HBSE curriculum, English Medium, STEM labs, and sports.',
      canonicalUrl: `${window.location.origin}/academics`,
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Academic Excellence"
        subtitle="Progressive, concept-driven English medium education from Play School to Class 12, offering dual board pathways under CBSE and HBSE."
        badge="Curriculum & Pedagogy"
        breadcrumbs={[{ label: 'Academics' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Foundational Literacy & Phonics</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Early childhood learning centered on sensory exploration, joyful play, phonetic pronunciation, and natural communication confidence in English.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">STEM & Computational Logic</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Equipping middle and senior pupils with lab-based chemistry, physics, biology experiments, robotics principles, and computer coding fundamentals.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Board Exam Mastery</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Structured mock examinations, sample paper drilling, time-management mentoring, and stress counseling for Class 10 & 12 CBSE / HBSE boards.
            </p>
          </div>
        </div>

        {/* Board Options Showcase */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Dual Board Affiliations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Choose the Best Academic Path for Your Child
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2">
              Our 12 Gurugram campuses deliver specialized instruction tailored to both CBSE and HBSE frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs uppercase">
                Central Board
              </span>
              <h3 className="text-xl font-bold text-white">CBSE Curriculum</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                National NCERT framework recognized worldwide. Strong focus on conceptual clarity, continuous evaluation, and national entrance examination synergy (JEE/NEET).
              </p>
              <div className="pt-2">
                <Link to="/cbse" className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1">
                  <span>Explore CBSE details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
              <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold text-xs uppercase">
                Haryana State Board
              </span>
              <h3 className="text-xl font-bold text-white">HBSE Curriculum</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                State board syllabus delivering robust theoretical knowledge, clear exam rubrics, state service orientation, and accessible pathways.
              </p>
              <div className="pt-2">
                <Link to="/hbse" className="text-xs font-bold text-sky-400 hover:underline inline-flex items-center gap-1">
                  <span>Explore HBSE details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stages Detailed List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Grade Distribution
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Class Levels: Play School to Class 12
            </h2>
          </div>

          <div className="space-y-6 divide-y divide-slate-100">
            <div className="pt-4 first:pt-0">
              <h4 className="text-base font-bold text-slate-900">Pre-Primary (Play School, Nursery, LKG, UKG)</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Child-safe classrooms with colorful play equipment, gross and fine motor skill exercises, alphabet recognition, number games, and daily rhymes.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-base font-bold text-slate-900">Primary Section (Classes 1 - 5)</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Integrated English, Hindi, Mathematics, Environmental Sciences, Computer Science, Art, and Physical Education with minimal textbook burden.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-base font-bold text-slate-900">Middle School (Classes 6 - 8)</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Separated Physics, Chemistry, Biology disciplines, Social Sciences (History, Civics, Geography), third language, and interactive science projects.
              </p>
            </div>

            <div className="pt-4">
              <h4 className="text-base font-bold text-slate-900">Secondary & Senior Secondary (Classes 9 - 12)</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Intensive preparation for Class 10 & Class 12 Board examinations. Streams offered in Science (Medical & Non-Medical), Commerce, and Arts with expert faculty counseling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
