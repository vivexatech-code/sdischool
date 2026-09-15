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
  MapPin,
  Laptop,
  Compass,
  HeartHandshake,
  Microscope,
  Palette,
  Bus,
  Camera,
  ChevronRight,
  Bell,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';
import { getBranches, getEvents, getNotices, getGallery } from '@/lib/firestore';
import { BranchCard } from '@/components/BranchCard';
import { EventCard } from '@/components/EventCard';
import { LeadershipCards } from '@/components/LeadershipCards';
import { HeroSection } from '@/components/HeroSection';
import { BranchDiscovery } from '@/components/BranchDiscovery';
import { formatPhone, isNoticeActive } from '@/lib/utils';

export default async function HomePage() {
  const [branches, events, notices, gallery] = await Promise.all([
    getBranches(),
    getEvents(),
    getNotices(),
    getGallery(),
  ]);

  // Filter active notices
  const activeNotices = notices.filter(n => isNoticeActive(n));
  const primaryNotice = activeNotices.length > 0 ? activeNotices[0] : null;

  // Upcoming published events (max 3 for home display)
  const upcomingEvents = events.slice(0, 3);

  // Fallback curated gallery photos if none uploaded yet
  const galleryPhotos = gallery.length > 0 ? gallery.slice(0, 5) : [
    {
      id: 'g-1',
      title: 'Modern Science & Innovation Laboratory',
      category: 'Science & Labs',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'g-2',
      title: 'Collaborative Library & Resource Centre',
      category: 'Campus',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'g-3',
      title: 'Sports & Athletic Training Grounds',
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'g-4',
      title: 'Digital Smart Classrooms in Action',
      category: 'Classrooms',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'g-5',
      title: 'Annual Cultural Festival Performances',
      category: 'Cultural',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50">
      
      {/* 1. HERO SECTION (Highest Priority - Cinematic, Editorial, Informative) */}
      <HeroSection />

      {/* 2. TRUST & QUICK FACTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
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

      {/* 13. ACTIVE NOTICE / ANNOUNCEMENT (Cleanly rendered only if active) */}
      {primaryNotice && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/5 rounded-3xl p-5 sm:p-6 border border-amber-300/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                    {primaryNotice.priority || 'Notice'}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">Official Circular</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {primaryNotice.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
                  {primaryNotice.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 self-end md:self-center">
              <Link
                href={primaryNotice.buttonUrl || '/admissions'}
                className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <span>{primaryNotice.buttonText || 'Enquire Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3. ABOUT THE SCHOOL GROUP ("Where Learning Meets Purpose") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
                Educational Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Where Learning Meets Purpose
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              At <strong className="text-slate-900 font-semibold">Siddhartha International Group of Schools</strong>, education is conceived as a transformative journey that shapes confident character, intellectual curiosity, and grounded social values.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Spanning 12 prominent branches in Gurugram, we provide children with a joyful, disciplined, and nurturing environment from early childhood play school through senior secondary graduation. We blend rigorous academic standards under CBSE and HBSE frameworks with sports, arts, and moral grounding.
            </p>

            {/* Core Values / Growth Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Holistic Child Development</h4>
                  <p className="text-xs text-slate-500">Balancing academics with athletics, public speaking, and arts.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Solid Academic Foundation</h4>
                  <p className="text-xs text-slate-500">Conceptual mastery in STEM, languages, and social disciplines.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Confidence & Discipline</h4>
                  <p className="text-xs text-slate-500">Instilling leadership qualities, respect, and emotional resilience.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Future-Ready Skills</h4>
                  <p className="text-xs text-slate-500">Digital literacy, analytical reasoning, and competitive exam readiness.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>

              <Link
                href="/academics"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Academic Vision</span>
              </Link>
            </div>
          </div>

          {/* Right Image & Inset Editorial Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                  alt="Students engaged in purposeful learning at Siddhartha International"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Inset Quote */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-white space-y-2">
                  <div className="text-amber-400 font-serif text-3xl leading-none">“</div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    Education is not merely filling a bucket, but lighting a fire. We believe every child who walks into our campuses carries unlimited potential to shape tomorrow.
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">Sandeep Kumar</span>
                    <span className="text-amber-400 font-medium">Director</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY FAMILIES CHOOSE SIDDHARTHA (Asymmetric Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
            Distinction in Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Families Choose Siddhartha
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Six foundational pillars that make Siddhartha International Group of Schools a trusted choice for parents across Gurugram.
          </p>
        </div>

        {/* Asymmetric Bento-Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Holistic Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Beyond textbook learning: we cultivate emotional intelligence, communicative fluency, athletic fitness, and moral consciousness.
              </p>
            </div>
            <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <span>Mind, Heart & Body</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-700 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Strong Academic Foundation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured pedagogical syllabus aligned with NCERT standards, continuous diagnostic evaluation, and personal faculty mentorship.
              </p>
            </div>
            <div className="text-[11px] font-bold text-sky-700 flex items-center gap-1">
              <span>Conceptual Rigor</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">CBSE & HBSE Curricula</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dual recognized board options offering families complete academic flexibility for national entrance exams or state civil pathways.
              </p>
            </div>
            <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <span>Dual Board Excellence</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">English Medium Instruction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immersive English medium classroom instruction ensuring students build articulate oral, written, and expressive proficiency.
              </p>
            </div>
            <div className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
              <span>Global Competence</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Play School to Class 12</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A seamless, unified 14-year educational journey from kindergarten discovery to senior secondary board success.
              </p>
            </div>
            <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
              <span>Continuous Growth</span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">12 Gurugram Locations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Campuses positioned strategically across key sectors, giving families neighborhood access with shorter commutes and safer journeys.
              </p>
            </div>
            <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <span>Convenient & Accessible</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. OUR ACADEMIC JOURNEY (Editorial Progressive Pathway) */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
              14 Years of Progressive Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Siddhartha Academic Journey
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              From curious early learners to ambitious senior secondary graduates, our curriculum unfolds across five carefully designed pedagogical stages.
            </p>
          </div>

          {/* Horizontal Pathway / Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* Stage 1 */}
            <div className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase tracking-wider inline-block">
                  Stage 01
                </span>
                <h3 className="text-base font-bold text-white">Early Childhood</h3>
                <p className="text-xs text-amber-400 font-semibold">Play School & Nursery</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Experiential, play-based learning, sensory motor refinement, phonics, and socialization in cheerful classrooms.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Foundational Years</div>
            </div>

            {/* Stage 2 */}
            <div className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 uppercase tracking-wider inline-block">
                  Stage 02
                </span>
                <h3 className="text-base font-bold text-white">Primary Wing</h3>
                <p className="text-xs text-sky-400 font-semibold">Classes I to V</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Literacy, numeracy, environmental sciences, creative arts, and building self-confidence through active participation.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Core Discovery</div>
            </div>

            {/* Stage 3 */}
            <div className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase tracking-wider inline-block">
                  Stage 03
                </span>
                <h3 className="text-base font-bold text-white">Middle Wing</h3>
                <p className="text-xs text-emerald-400 font-semibold">Classes VI to VIII</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Analytical inquiry, STEM labs, conceptual mastery, competitive math, and introductory computing instruction.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Analytical Thinking</div>
            </div>

            {/* Stage 4 */}
            <div className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 uppercase tracking-wider inline-block">
                  Stage 04
                </span>
                <h3 className="text-base font-bold text-white">Secondary Wing</h3>
                <p className="text-xs text-purple-400 font-semibold">Classes IX & X</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thorough preparation for CBSE & HBSE board examinations, science laboratory practicals, and structured mock testing.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Board Preparation</div>
            </div>

            {/* Stage 5 */}
            <div className="bg-slate-800/80 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase tracking-wider inline-block">
                  Stage 05
                </span>
                <h3 className="text-base font-bold text-white">Senior Secondary</h3>
                <p className="text-xs text-amber-400 font-semibold">Classes XI & XII</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Stream specialization: Science (Med/Non-Med), Commerce, and Arts with expert mentorship for JEE, NEET, and CUET.
                </p>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Career Horizons</div>
            </div>

          </div>

          <div className="text-center pt-2">
            <Link
              href="/academics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              <span>Explore Curriculum & Grade Structures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. CBSE & HBSE BOARDS COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
            Dual Board Accreditation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            CBSE & HBSE: Empowering Educational Choice
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We provide parents and students with the flexibility to choose the academic board that best aligns with their higher education and competitive career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CBSE Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-2xl font-black text-amber-600">CBSE</span>
                <h3 className="text-base font-bold text-slate-900">Central Board of Secondary Education</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                National Standard
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The CBSE curriculum follows a nationwide benchmark syllabus aligned with NCERT. It is widely recognized across India and abroad, offering seamless transferability and direct foundation for competitive entrance exams.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Direct alignment with JEE (Engineering), NEET (Medical), and CUET exams</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Continuous Comprehensive Evaluation (CCE) assessing scholastic & co-scholastic growth</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Pan-India recognized certificates with smooth interstate relocation</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/cbse"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
              >
                <span>Read Full CBSE Curriculum Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* HBSE Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-2xl font-black text-sky-600">HBSE</span>
                <h3 className="text-base font-bold text-slate-900">Haryana Board of School Education</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
                State Board Excellence
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Delivered entirely in English Medium, our HBSE framework provides rigorous state-accredited academic training. It is ideal for students targeting regional higher education, state civil services, police recruitment, and national defense.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>100% English Medium instruction delivered by experienced state board educators</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Cost-effective fee structure coupled with robust academic rigor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Favorable scoring pattern for state civil exams, NDA, and regional university quotas</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/hbse"
                className="text-xs font-bold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1"
              >
                <span>Read Full HBSE Curriculum Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. OUR 12 GURUGRAM BRANCHES */}
      <section id="branches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
              12 Campuses Across Gurugram
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
              12 Schools. One Shared Vision.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Find a Siddhartha campus near you across Gurugram. Every campus is equipped with smart classrooms, laboratories, sports facilities, and dedicated leadership.
            </p>
          </div>
          <Link
            href="/branches"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors self-start md:self-auto shadow-sm"
          >
            <span>View All {branches.length || 12} Campuses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Firestore Branch Cards (Display first 6 on homepage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.slice(0, 6).map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/branches"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-colors"
          >
            <span>Explore All 12 Gurugram Campus Locations & Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. FIND YOUR SCHOOL (Interactive Campus Discovery Component) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BranchDiscovery branches={branches} />
      </section>

      {/* 9. EXECUTIVE LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
            Leadership & Stewardship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dedicated School Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Accessible, accountable leadership available for parent consultations, admissions queries, and continuous student welfare.
          </p>
        </div>

        <LeadershipCards />
      </section>

      {/* 10. CAMPUS FACILITIES & INFRASTRUCTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
            Campus Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Modern Facilities for Complete Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Safe, technologically advanced, and inspiring learning environments built to encourage student exploration, creativity, and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Digital Smart Classrooms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive display panels, multimedia visual content, and audio-visual pedagogical teaching aids.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center font-bold">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Science & STEM Labs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hands-on composite Physics, Chemistry, and Biology workbenches adhering to high safety benchmarks.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Libraries & Reading Rooms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curated collections of literature, periodicals, encyclopedias, and quiet study zones.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Sports & Athletics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Courts and spaces for cricket, badminton, basketball, yoga, and guided physical education.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">GPS Safe Transport</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modern school bus fleet equipped with real-time GPS tracking and trained female attendants.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">24/7 CCTV & Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Campus surveillance with gated perimeter control, visitor sign-in, and fire safety systems.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Creative Arts & Dance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated performing art halls for classical dance, vocal music, drama, and fine painting.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Medical Infirmary</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Well-equipped first aid room and health wellness records maintained by trained attendants.
            </p>
          </div>

        </div>

        <div className="text-center pt-2">
          <Link
            href="/facilities"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1.5"
          >
            <span>Learn More About Campus Infrastructure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 11. EVENTS: LIFE BEYOND THE CLASSROOM */}
      {upcomingEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
                Campus Activities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
                Life Beyond the Classroom
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Upcoming school functions, competitions, cultural galas, and athletic championships across our campuses.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors self-start md:self-auto"
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

      {/* 12. SCHOOL MOMENTS / GALLERY (Editorial Masonry Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
              Visual Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
              School Moments & Campus Life
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Glimpses of daily discovery, scientific experiments, sports tournaments, and student milestones across our branches.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors self-start md:self-auto shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore Full Gallery</span>
          </Link>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Large Featured Photo */}
          <div className="md:col-span-7 relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md group">
            <img
              src={galleryPhotos[0].imageUrl}
              alt={galleryPhotos[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                {galleryPhotos[0].category}
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1.5">{galleryPhotos[0].title}</h3>
            </div>
          </div>

          {/* Two Stacked Photos */}
          <div className="md:col-span-5 grid grid-rows-2 gap-4 h-72 sm:h-96">
            <div className="relative rounded-3xl overflow-hidden shadow-md group">
              <img
                src={galleryPhotos[1].imageUrl}
                alt={galleryPhotos[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{galleryPhotos[1].category}</span>
                <h4 className="text-xs sm:text-sm font-bold truncate">{galleryPhotos[1].title}</h4>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-md group">
              <img
                src={galleryPhotos[2].imageUrl}
                alt={galleryPhotos[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{galleryPhotos[2].category}</span>
                <h4 className="text-xs sm:text-sm font-bold truncate">{galleryPhotos[2].title}</h4>
              </div>
            </div>
          </div>

          {/* Bottom Dual Photos */}
          <div className="md:col-span-6 relative h-60 rounded-3xl overflow-hidden shadow-md group">
            <img
              src={galleryPhotos[3].imageUrl}
              alt={galleryPhotos[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{galleryPhotos[3].category}</span>
              <h4 className="text-sm font-bold">{galleryPhotos[3].title}</h4>
            </div>
          </div>

          <div className="md:col-span-6 relative h-60 rounded-3xl overflow-hidden shadow-md group">
            <img
              src={galleryPhotos[4].imageUrl}
              alt={galleryPhotos[4].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{galleryPhotos[4].category}</span>
              <h4 className="text-sm font-bold">{galleryPhotos[4].title}</h4>
            </div>
          </div>

        </div>
      </section>

      {/* 14. POWERFUL ADMISSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden border border-amber-500/30">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-extrabold uppercase tracking-wider inline-block">
              Admissions Open 2027–28
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Your Child's Journey Begins Here
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Explore our 12 Gurugram campuses and take the first step towards your child's educational journey. Limited seats per section ensure dedicated teacher attention and personal mentorship.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/branches"
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Find a Branch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admissions"
                className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Admission Enquiry</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 15. CONTACT & CENTRAL HELPLINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider block">
                Central Directorate
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Siddhartha International Group of Schools
              </h3>
              <p className="text-xs text-slate-500">
                Gurugram, Haryana, India
              </p>
            </div>

            <div className="space-y-3 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0 md:px-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Direct Contact Lines
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block">Director: Sandeep Kumar</span>
                  <a href="tel:8368268149" className="font-mono font-bold text-amber-700 hover:underline flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{formatPhone('8368268149')}</span>
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">Manager: Kalpna Kumari</span>
                  <a href="tel:9355135904" className="font-mono font-bold text-amber-700 hover:underline flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{formatPhone('9355135904')}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-center md:text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                Parents are warmly invited to schedule a campus walk-through or speak directly with our admissions desk.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  Contact Form
                </Link>
                <Link
                  href="/branches"
                  className="px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-colors"
                >
                  Campus Directory
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
