import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Phone, 
  Calendar, 
  MapPin, 
  Shield,
  ShieldCheck, 
  Compass, 
  Users, 
  Laptop, 
  ArrowRight,
  School,
  FileCheck,
  X,
  Star,
  Quote
} from 'lucide-react';
import { useSite } from '../../contexts/SiteContext';
import { BranchCard } from '../../components/common/BranchCard';
import { EventCard } from '../../components/common/EventCard';
import { LeadershipCards } from '../../components/common/LeadershipCards';
import { EnquiryModal } from '../../components/common/EnquiryModal';
import { updateDocumentSeo, getSchoolGroupStructuredData } from '../../lib/seo';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import { formatPhone, isNoticeActive } from '../../lib/utils';

export const HomePage: React.FC = () => {
  const { branches, events, gallery, notices, siteSettings } = useSite();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedBranchIdForModal, setSelectedBranchIdForModal] = useState<string | undefined>(undefined);
  const [selectedBoardFilter, setSelectedBoardFilter] = useState<'All' | 'CBSE' | 'HBSE'>('All');
  const [isNoticeDismissed, setIsNoticeDismissed] = useState(false);

  useEffect(() => {
    updateDocumentSeo({
      title: 'Siddhartha International Group of Schools | 12 Branches in Gurugram (CBSE & HBSE)',
      description: 'Official portal of Siddhartha International Group of Schools across 12 branches in Gurugram, Haryana. Play School to Class 12, CBSE & HBSE curriculum in English Medium. Director Sandeep Kumar (8368268149), Manager Kalpna Kumari (9355135904).',
      canonicalUrl: window.location.origin,
      ogImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
      schema: getSchoolGroupStructuredData(),
    });
  }, []);

  const filteredBranches = selectedBoardFilter === 'All'
    ? branches
    : branches.filter(b => b.board.includes(selectedBoardFilter));

  const activeNotices = notices.filter(isNoticeActive);
  const topNotice = activeNotices.length > 0 ? activeNotices[0] : null;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* =========================================================================
          SECTION 1: HERO SECTION (Cinematic Editorial Design)
          ========================================================================= */}
      <section 
        id="home-hero-section"
        className="relative bg-slate-950 text-white pt-10 pb-16 md:pt-16 md:pb-28 overflow-hidden border-b border-slate-800"
      >
        {/* Visual Background Elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Top Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>12 Premier Campuses Across Gurugram, Haryana</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Confident Minds.</span>
                  <br />
                  Shaping Bright Futures.
                </h1>
                <p className="text-lg sm:text-xl font-medium text-amber-200/90 tracking-wide">
                  Siddhartha International Group of Schools
                </p>
              </div>

              {/* Supporting Educational Scope */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Empowering young minds with holistic, values-driven education from <strong className="text-white font-semibold">Play School to Class 12</strong> under dual <strong className="text-white font-semibold">CBSE & HBSE</strong> curriculum frameworks taught entirely in English Medium.
              </p>

              {/* Hero Badges Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-amber-400">12</div>
                  <div className="text-[11px] font-semibold text-slate-300">Gurugram Branches</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-white">Play – XII</div>
                  <div className="text-[11px] font-semibold text-slate-300">Classes Offered</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-sky-400">CBSE & HBSE</div>
                  <div className="text-[11px] font-semibold text-slate-300">Dual Boards</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xs">
                  <div className="text-xl font-extrabold text-emerald-400">English</div>
                  <div className="text-[11px] font-semibold text-slate-300">Medium of Study</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  to="/branches"
                  className="px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Explore Our Branches (12)</span>
                </Link>

                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-sm border border-slate-700/80 hover:border-amber-400/60 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>Admission Enquiry</span>
                </button>
              </div>

              {/* Direct Leadership Phone Helpline */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Direct Leadership Helplines:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-slate-200">
                  <a href="tel:8368268149" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Director Sandeep Kumar ({formatPhone('8368268149')})</span>
                  </a>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <a href="tel:9355135904" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Manager Kalpna Kumari ({formatPhone('9355135904')})</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-sky-500/20 rounded-3xl blur-2xl transform scale-95 opacity-60" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/90 bg-slate-900/90 group">
                  <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop"
                      alt="Siddhartha International School modern campus and learners"
                      className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Admissions Open 2027–28</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        Gurugram Network
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 space-y-2 text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          12 Branches Across Gurugram
                        </span>
                        <span className="text-[11px] text-slate-300 font-mono">Sector 14 to Sohna Rd</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        Modern infrastructure, smart interactive classrooms, science and robotics laboratories, sports courts, and verified GPS transport.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="text-slate-300 font-medium">
                      Looking for the nearest campus?
                    </div>
                    <Link
                      to="/branches"
                      className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Locate Campus</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FACTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-4 pt-4 sm:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">12</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Gurugram Campuses</div>
              <div className="text-[11px] text-slate-400">Strategically located across city</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200/60 text-sky-600 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">Play – XII</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Academic Classes</div>
              <div className="text-[11px] text-slate-400">Play school to senior secondary</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">2 Boards</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">CBSE & HBSE</div>
              <div className="text-[11px] text-slate-400">Dual academic pathways</div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 text-purple-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">English</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Instruction Medium</div>
              <div className="text-[11px] text-slate-400">Holistic & values-driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 (Placed right below hero for immediate visibility): 
          ACTIVE NOTICE / ANNOUNCEMENT / OFFER
          ========================================================================= */}
      {topNotice && !isNoticeDismissed && (
        <section id="active-notice-banner" className="bg-amber-500/10 border-b border-amber-300/40 py-3.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-extrabold uppercase tracking-wider">
                {topNotice.priority || 'Notice'}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{topNotice.title}</h4>
                {topNotice.description && (
                  <p className="text-xs text-slate-600 line-clamp-1">{topNotice.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-auto">
              {topNotice.buttonText ? (
                <Link
                  to={topNotice.buttonUrl || '/notices'}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  {topNotice.buttonText}
                </Link>
              ) : (
                <Link
                  to="/notices"
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  View Details
                </Link>
              )}
              <Link to="/notices" className="text-xs font-semibold text-amber-900 hover:underline">
                All Notices &rarr;
              </Link>
              <button
                type="button"
                onClick={() => setIsNoticeDismissed(true)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-900 hover:bg-amber-200/50 transition-colors ml-1"
                aria-label="Dismiss notice"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2: ABOUT THE SCHOOL
          ========================================================================= */}
      <section id="home-about-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                <School className="w-3.5 h-3.5 text-amber-600" />
                <span>About Siddhartha International Group</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Shaping Confident, Compassionate Leaders Across Gurugram
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Siddhartha International Group of Schools was established to deliver world-class schooling across Gurugram, Haryana. Rooted in values of discipline, inquiry, and inclusivity, our schools provide a seamless learning journey from early childhood play school up through Class 12 senior secondary graduation.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                With a recognized network of 12 strategically located branches across Gurugram, we make elite academic infrastructure and individual mentorship accessible right in your neighborhood.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-base">English Medium</h4>
                  <p className="text-xs text-slate-500 mt-1">Immersive communication and analytical thinking.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-base">Dual Board Option</h4>
                  <p className="text-xs text-slate-500 mt-1">Structured CBSE and state HBSE tracks.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>Read our full story and mission</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
                alt="Students studying together"
                className="rounded-2xl shadow-md h-64 sm:h-72 w-full object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
                alt="Teacher explaining concepts"
                className="rounded-2xl shadow-md h-64 sm:h-72 w-full object-cover mt-8"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHY CHOOSE US
          ========================================================================= */}
      <section id="home-why-choose-us" className="py-16 md:py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              The Siddhartha Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Why Parents Choose Siddhartha International
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              We combine robust academic preparation with modern facilities, safety protocols, and personalized care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Proven Academic Rigor</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Consistent focus on concept mastery, regular assessments, and dedicated mentor guidance for competitive exams.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">12 Convenient Campuses</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Spread across key Gurugram sectors (Sector 14, 45, 56, 82, 102, Sohna Rd, Palam Vihar, etc.), minimizing commute stress.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Safe Gated Ecosystem</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                24x7 CCTV monitoring, trained security personnel, medical infirmary, and GPS tracking on all bus routes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Direct Leadership Access</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Director Sandeep Kumar (8368268149) and Manager Kalpna Kumari (9355135904) maintain open communication channels with parents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ACADEMIC EXCELLENCE & PEDAGOGY
          ========================================================================= */}
      <section id="home-academic-excellence" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop"
                  alt="Science laboratory experimentation"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Curricular Distinction
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Academic Excellence: Fostering Curiosity & Real-World Skills
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At Siddhartha International, education transcends memorization. Our inquiry-driven curriculum encourages students to hypothesize, test, and articulate concepts across STEM, Humanities, Languages, and Performing Arts.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Experiential STEM Labs</h4>
                    <p className="text-xs text-slate-600">Hands-on physics, chemistry, biology, and robotics setups in all branches.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Bilingual & Language Fluency</h4>
                    <p className="text-xs text-slate-600">English medium instruction supported by creative writing, debates, and public speaking clubs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Continuous Assessment & Remedial Care</h4>
                    <p className="text-xs text-slate-600">Special attention sessions for pupils needing extra mathematical or scientific reinforcement.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/academics"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  <span>Explore Academic Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CBSE & HBSE EDUCATION (DUAL BOARD ADVANTAGE)
          ========================================================================= */}
      <section id="home-boards-section" className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              National & State Accreditations
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              CBSE & HBSE Dual Board System
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              Offering parents and students flexible choice between Central and State boards, aligned to future career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CBSE Card */}
            <div className="p-8 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                  <span>Central Board of Secondary Education</span>
                </div>
                <h3 className="text-2xl font-bold text-white">CBSE Curriculum</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Nationally recognized syllabus patterned after NCERT, ideally suited for competitive pan-India examinations (JEE, NEET, CUET, NDA) and higher education abroad.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Holistic, competency-based learning framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Standardized board examinations in Class 10 & 12</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>English medium instruction with modern electives</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  to="/cbse"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Learn more about CBSE at Siddhartha</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* HBSE Card */}
            <div className="p-8 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold">
                  <span>Haryana Board of School Education</span>
                </div>
                <h3 className="text-2xl font-bold text-white">HBSE Curriculum</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Haryana Board curriculum engineered for deep subject grounding, regional state exam preparedness, government civil services, and technical diploma pathways.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Comprehensive syllabus with strong regional alignment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>High pass rate and dedicated mentor preparation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Full English Medium instruction across high school</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  to="/hbse"
                  className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300"
                >
                  <span>Learn more about HBSE at Siddhartha</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CLASSES PLAY SCHOOL TO 12
          ========================================================================= */}
      <section id="home-classes-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Continuous Educational Spectrum
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              From Play School to Class 12 Senior Secondary
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              A carefully graduated learning path designed to nurture every milestone of your child's developmental life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage 1 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-amber-600 uppercase">Stage 01</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Play School & Kindergarten</h3>
              <p className="text-xs text-slate-500 mb-3">Age 2.5 to 5 Years</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sensory play, foundational motor coordination, phonics, storytelling, music, and nurturing day-care spaces.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-amber-600 uppercase">Stage 02</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Primary Wing (Classes 1 - 5)</h3>
              <p className="text-xs text-slate-500 mb-3">Foundational Literacy & Numeracy</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Core mathematics, environmental studies, bilingual expression, reading habits, sports, and computational thinking.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-amber-600 uppercase">Stage 03</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Middle Wing (Classes 6 - 8)</h3>
              <p className="text-xs text-slate-500 mb-3">Inquiry & Abstract Concepts</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Science laboratory experiments, social sciences, third language, coding basics, and inter-school sports leagues.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
              <span className="text-xs font-extrabold text-amber-600 uppercase">Stage 04</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Secondary & Senior (9 - 12)</h3>
              <p className="text-xs text-slate-500 mb-3">Board Mastery & Specialization</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rigorous preparation for CBSE and HBSE board exams. Science (Non-Med/Med), Commerce, and Arts career streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DIRECTOR / MANAGER LEADERSHIP SECTION
          ========================================================================= */}
      <section id="home-leadership-section" className="py-16 md:py-24 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Guiding Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Visionary Leadership Committed to Every Student
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Meet our Director and Manager who oversee all 12 Gurugram branches with an approachable, student-first philosophy.
            </p>
          </div>

          <LeadershipCards />

          <div className="text-center pt-8">
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>Explore Group Governance & Leadership Vision</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: OUR 12 BRANCHES (INTERACTIVE SHOWCASE)
          ========================================================================= */}
      <section id="home-branches-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                12 Gurugram Campuses
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Explore Our 12 Branches Across Gurugram
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-2xl">
                Each campus features dedicated faculty, modern classrooms, and full alignment with CBSE & HBSE standards.
              </p>
            </div>

            {/* Board Filter Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start md:self-auto">
              {(['All', 'CBSE', 'HBSE'] as const).map(board => (
                <button
                  key={board}
                  onClick={() => setSelectedBoardFilter(board)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedBoardFilter === board
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {board === 'All' ? 'All Boards' : board}
                </button>
              ))}
            </div>
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBranches.slice(0, 6).map(branch => (
              <BranchCard 
                key={branch.id} 
                branch={branch} 
                onEnquire={(b) => {
                  setSelectedBranchIdForModal(b.id);
                  setIsEnquiryModalOpen(true);
                }}
              />
            ))}
          </div>

          {/* View All 12 Branches CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/branches"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>View All 12 Gurugram Branches & Locations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FACILITIES
          ========================================================================= */}
      <section id="home-facilities-section" className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Modern Facilities for Comprehensive Growth
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              Engineered to inspire curiosity, physical fitness, and technological confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <Laptop className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white">Smart Classrooms</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Interactive flat panels, audio-visual lessons, and digital multimedia tools bringing abstract textbook theories to life.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <Award className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white">Composite Science & STEM Labs</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Fully equipped Physics, Chemistry, and Biology laboratories compliant with national board safety benchmarks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <BookOpen className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white">Modern Library & Resource Center</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Curated collection of children's literature, encyclopedias, reference texts, periodicals, and comfortable quiet reading nooks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <Compass className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white">Sports Complex & Martial Arts</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Badminton courts, cricket practice nets, yoga sessions, karate self-defense training, and annual inter-branch tournaments.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <Shield className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white">CCTV & Fire-Safe Campus</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Comprehensive security coverage across corridors, gates, and play zones, verified with mandatory safety certificates.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700">
              <MapPin className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-white">Safe Bus Fleet with GPS</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Extensive Gurugram transport routes operated by verified drivers, female attendants, speed governors, and real-time GPS tracking.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Explore full facilities directory</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: LATEST EVENTS
          ========================================================================= */}
      <section id="home-events-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                School Life & Culture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Latest Events & Celebrations
              </h2>
            </div>
            <Link
              to="/events"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 self-start md:self-auto"
            >
              <span>View All Events Calendar</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: LATEST GALLERY
          ========================================================================= */}
      <section id="home-gallery-section" className="py-16 md:py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Visual Glimpses
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Life at Siddhartha International
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 self-start md:self-auto"
            >
              <span>Open Photo Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
                caption: 'Classroom Activity & Discussions'
              },
              {
                url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
                caption: 'Annual Day Stage Performances'
              },
              {
                url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop',
                caption: 'Chemistry & Science Innovations'
              },
              {
                url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop',
                caption: 'Athletics & Track Championship'
              }
            ].map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden bg-slate-900 h-48 sm:h-56 shadow-sm">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                  <p className="text-white text-xs font-semibold">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: PARENT & STUDENT TESTIMONIALS (TRUST BUILDER)
          ========================================================================= */}
      <section id="home-testimonials-section" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Trusted by Gurugram Families
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              What Parents & Students Say
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Hear directly from families across our 12 Gurugram campuses about academic growth, caring mentors, and safe environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-amber-300/60 mb-2" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "Enrolling our son at Siddhartha International Sector 14 was the best decision. The individual attention from teachers, modern science labs, and strong CBSE curriculum foundation have truly transformed his confidence."
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  AS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Mrs. Ananya Sharma</h4>
                  <p className="text-xs text-slate-500">Parent of Aarav (Class 8) • Sector 14 Campus</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-amber-300/60 mb-2" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "The transition to high school science stream was smooth and well-guided. The faculty is approachable, regular parent-teacher meetings keep us updated, and the campus discipline is exceptional."
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  RV
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Mr. Rajesh Verma</h4>
                  <p className="text-xs text-slate-500">Parent of Diya (Class 11 Science) • Sector 45 Campus</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-amber-300/60 mb-2" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "Safe school transport with GPS tracking and verified attendants gave us complete peace of mind. Moreover, the focus on co-curricular activities, sports, and language expression makes learning joyful."
                </p>
              </div>
              <div className="pt-6 border-t border-slate-200 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  MH
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dr. Meenakshi Hooda</h4>
                  <p className="text-xs text-slate-500">Parent of Kabir (Class 4) • Sector 56 Campus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: ADMISSION ENQUIRY CTA
          ========================================================================= */}
      <section id="home-admission-cta" className="py-16 md:py-24 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-6">
          <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            Academic Year 2027-28 Registrations Open
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Secure Your Child's Future at Siddhartha International
          </h2>

          <p className="text-base sm:text-lg text-amber-100 leading-relaxed max-w-2xl mx-auto">
            Choose from our 12 Gurugram campuses. Simple admission process, personalized counseling, and transparent fee structures.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-xl transition-all"
            >
              Submit Admission Enquiry Online
            </button>

            <a
              href="tel:8368268149"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-amber-50 shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Call Director: 8368268149</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: CONTACT INFORMATION & GURUGRAM HEAD OFFICE
          ========================================================================= */}
      <section id="home-contact-info-section" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Gurugram Head Office</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Sector 14 Central Campus, Gurugram, Haryana, India. Managing 12 branches throughout Gurugram.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Direct Telephones</h3>
              <div className="text-xs sm:text-sm text-slate-600 mt-2 space-y-1.5">
                <p>
                  Director Sandeep Kumar:{' '}
                  <a href="tel:8368268149" className="font-bold text-amber-700">8368268149</a>
                </p>
                <p>
                  Manager Kalpna Kumari:{' '}
                  <a href="tel:9355135904" className="font-bold text-amber-700">9355135904</a>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Admissions & Inquiries</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Email: info@siddharthaschools.edu.in<br />
                Hours: Monday to Saturday: 8:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => {
          setIsEnquiryModalOpen(false);
          setSelectedBranchIdForModal(undefined);
        }}
        defaultBranchId={selectedBranchIdForModal}
      />
    </div>
  );
};
