import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { LeadershipCards } from '../../components/common/LeadershipCards';
import { updateDocumentSeo, getSchoolGroupStructuredData } from '../../lib/seo';
import { Shield, Target, Eye, Award, CheckCircle2, Building2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'About Us | Siddhartha International Group of Schools Gurugram',
      description: 'Learn about Siddhartha International Group of Schools, operating 12 branches across Gurugram, Haryana. Play School to Class 12 English medium education under CBSE and HBSE.',
      canonicalUrl: `${window.location.origin}/about`,
      schema: getSchoolGroupStructuredData(),
    });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="About Siddhartha International"
        subtitle="Empowering young minds through 12 branches across Gurugram with CBSE & HBSE curriculum from Play School to Class 12."
        badge="Our Heritage & Philosophy"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Our Journey & Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              A Trusted Educational Network Built on Character, Intellect & Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Siddhartha International Group of Schools was created with a profound belief: every child possesses latent genius that flourishes when given structured academic discipline, modern scientific inquiry, and empathetic encouragement.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From our flagship initiatives to expanding across 12 prominent localities in Gurugram, Haryana, our goal has remained steady: ensuring parents do not have to compromise between quality infrastructure and proximity to their home.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                • 12 Gurugram Campuses
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                • CBSE & HBSE Boards
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                • Play School to Class 12
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                • English Medium
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop"
              alt="School campus"
              className="rounded-2xl shadow-lg object-cover w-full h-80"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To cultivate inquisitive, resilient, and socially responsible individuals who achieve academic mastery in national and state examinations while embracing sports, creative arts, and humanitarian values.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Student-centered teaching pedagogy in English medium</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Integrated digital tools and experimental science laboratories</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Strong partnership with parents and community</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To be Gurugram’s benchmark educational institution, recognized for pedagogical innovation, ethical student conduct, accessible neighborhood campuses, and outstanding board results.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Equal emphasis on scholastic depth and physical fitness</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Nurturing leadership and communication from early childhood</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Safe and modern campus environment across all 12 branches</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Leadership Cards Inclusion */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Executive Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Director & Manager
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Accessible leadership reachable directly via phone for any parent consultation.
            </p>
          </div>
          <LeadershipCards />
        </div>
      </div>
    </div>
  );
};
