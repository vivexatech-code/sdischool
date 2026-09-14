import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { getBranches, getEvents, getNotices } from '@/lib/firestore';
import { BranchCard } from '@/components/BranchCard';
import { EventCard } from '@/components/EventCard';
import { LeadershipCards } from '@/components/LeadershipCards';
import { formatPhone } from '@/lib/utils';

export default async function HomePage() {
  const [branches, events, notices] = await Promise.all([
    getBranches(),
    getEvents(),
    getNotices(),
  ]);

  const activeNotices = notices.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white pt-12 pb-24 sm:pb-32 overflow-hidden">
        {/* Background Texture & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>12 Premier Campuses in Gurugram, Haryana</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Empowering Young Minds for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Brighter Future</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Siddhartha International Group of Schools offers holistic, values-driven education from <strong className="text-white">Play School to Class 12th</strong> under dual <strong className="text-white">CBSE & HBSE</strong> curriculum frameworks in English Medium.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/admissions"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply for Admission 2026-27</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/branches"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Browse 12 Campuses</span>
                </Link>
              </div>

              {/* Fast stats row */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">12</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Gurugram Campuses</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Board Results</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">Play - 12th</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Comprehensive Grades</div>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Central Directorate</span>
                    <h2 className="text-lg font-bold text-white mt-0.5">Admissions Helpdesk</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Now Active
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-slate-400 text-[11px]">Direct Line to School Director:</div>
                    <div className="font-bold text-base text-white">Sandeep Kumar</div>
                    <a
                      href="tel:8368268149"
                      className="inline-flex items-center gap-2 text-amber-400 font-mono font-bold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{formatPhone('8368268149')}</span>
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="text-slate-400 text-[11px]">Direct Line to School Manager:</div>
                    <div className="font-bold text-base text-white">Kalpna Kumari</div>
                    <a
                      href="tel:9355135904"
                      className="inline-flex items-center gap-2 text-sky-400 font-mono font-bold hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{formatPhone('9355135904')}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/admissions"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>Request Admission Prospectus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Urgent Circulars Ticker if available */}
      {activeNotices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wider animate-pulse flex-shrink-0">
                Notice
              </span>
              <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                {activeNotices[0].title}: {activeNotices[0].description}
              </p>
            </div>
            <Link
              href="/notices"
              className="flex-shrink-0 text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
            >
              <span>View All Circulars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* 3. 12 Gurugram Campuses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
              12 Strategic Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Explore Our Gurugram Campuses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Equipped with smart classrooms, advanced computer and science laboratories, sports arenas, and CCTV-secured grounds.
            </p>
          </div>
          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors self-start md:self-auto"
          >
            <span>View All 12 Campuses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.slice(0, 6).map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/branches"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>See All 12 Branch Addresses & Contacts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Dual Affiliation: CBSE & HBSE */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Educational Framework
            </span>
            <h2 className="text-3xl font-extrabold">Dual Curriculum Excellence</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We empower parents to choose the academic board that best matches their child's higher education and competitive career aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CBSE Box */}
            <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-amber-400">CBSE</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold">
                  National Benchmark
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Central Board of Secondary Education</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                National standard curriculum geared toward competitive engineering (JEE), medical (NEET), CUET, and premier central university admissions with a continuous comprehensive evaluation model.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Aligned with NCERT and nationwide competitive entrance exams</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Strong foundation in STEM, Coding, and Analytical Problem Solving</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Seamless transferability across all Indian states and abroad</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/cbse" className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1">
                  <span>Explore CBSE Curriculum</span> &rarr;
                </Link>
              </div>
            </div>

            {/* HBSE Box */}
            <div className="bg-slate-800/80 rounded-3xl p-8 border border-slate-700/80 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-sky-400">HBSE</span>
                <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs font-bold">
                  State Board Recognized
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">Haryana Board of School Education</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rigorous state-accredited education delivered entirely in English Medium, ideal for state administrative services, NDA, civil defense, and specialized regional academic programs.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Taught entirely in English Medium by experienced board examiners</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Cost-effective fee structure with outstanding scholarship support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>High scoring track record in state board examinations</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link href="/hbse" className="text-xs font-bold text-sky-400 hover:underline inline-flex items-center gap-1">
                  <span>Explore HBSE Curriculum</span> &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Executive Leadership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Leadership & Vision
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Dedicated School Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Accessible, accountable leadership available for parent consultations and student welfare.
          </p>
        </div>

        <LeadershipCards />
      </section>

      {/* 6. Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                Campus Activities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Upcoming School Events
              </h2>
            </div>
            <Link
              href="/events"
              className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-slate-950 text-white text-[10px] font-extrabold uppercase tracking-wider">
              Admissions 2026-27 Open
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              Begin Your Child's Journey with Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-900 font-medium max-w-xl">
              Limited seats available for Play School through Class 12 across our 12 Gurugram campuses. Contact our leadership desk or submit an enquiry today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/admissions"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-md text-center transition-colors"
            >
              Apply Online Now
            </Link>
            <a
              href="tel:8368268149"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/90 hover:bg-white text-slate-950 font-bold text-xs text-center transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
