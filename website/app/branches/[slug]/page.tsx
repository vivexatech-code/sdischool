import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  Calendar, 
  Award,
  Sparkles,
  ExternalLink,
  Globe,
  User,
  MessageSquare
} from 'lucide-react';
import { getBranches, getBranchBySlug, getStaff } from '@/lib/firestore';
import { formatPhone } from '@/lib/utils';
import { LeadershipCards } from '@/components/LeadershipCards';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const branches = await getBranches();
  return branches.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const branch = await getBranchBySlug(slug);

  if (!branch) {
    return {
      title: 'Branch Not Found',
    };
  }

  return {
    title: `${branch.name} | CBSE & HBSE School in Gurugram`,
    description: `Official branch of Siddhartha International Group of Schools located at ${branch.address}. Offering ${branch.classesOffered} under ${branch.board} curriculum. Direct Admissions Open.`,
    openGraph: {
      title: `${branch.name} - Siddhartha International Group of Schools`,
      description: `Explore campus facilities, curriculum, and admissions for Siddhartha International School, ${branch.sector}, Gurugram.`,
      images: [
        {
          url: branch.imageUrl || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: `${branch.name} Campus`,
        },
      ],
    },
  };
}

export default async function BranchDetailPage({ params }: Props) {
  const { slug } = await params;
  const [branch, allStaff] = await Promise.all([
    getBranchBySlug(slug),
    getStaff(),
  ]);

  if (!branch) {
    notFound();
  }

  const branchStaff = allStaff.filter(s => s.branchId === branch.id && s.isActive !== false);

  return (
    <div className="space-y-12 pb-20">
      {/* Top Banner */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/branches" className="hover:text-amber-400">Campuses</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">{branch.sector}</span>
          </nav>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
              {branch.board} Curriculum
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700">
              {branch.sector} Campus
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              Admissions 2026-27 Open
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            {branch.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
            <span>{branch.address}</span>
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left / Main Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Campus Image Showcase */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 relative h-72 sm:h-96">
              <img
                src={branch.imageUrl || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop'}
                alt={`${branch.name} campus building`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Board Affiliation</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">{branch.board}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Classes Offered</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">{branch.classesOffered || 'Play School to 12th'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Medium of Instruction</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">English Medium</span>
              </div>
            </div>

            {/* Overview & Streams */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Campus Overview & Senior Secondary Streams</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The {branch.sector} branch of Siddhartha International Group of Schools provides an empowering educational setting designed to foster intellectual curiosity, physical fitness, and civic responsibility.
              </p>

              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Senior Secondary Streams Available:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-xs">
                    <span className="font-bold text-amber-950 block">Science Stream</span>
                    <span className="text-[11px] text-amber-800">Medical (PCB) & Non-Medical (PCM) with Computer Science & AI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-200 text-xs">
                    <span className="font-bold text-sky-950 block">Commerce Stream</span>
                    <span className="text-[11px] text-sky-800">Accountancy, Business Studies, Economics & Applied Mathematics</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200 text-xs">
                    <span className="font-bold text-purple-950 block">Arts & Humanities</span>
                    <span className="text-[11px] text-purple-800">History, Political Science, Psychology, Sociology & English Core</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Leadership & Faculty Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider border border-amber-200">
                  Campus Administration & Faculty
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">Leadership & Faculty at {branch.sector} Campus</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Experienced educational leaders and subject mentors dedicated to students at this campus.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch Leadership Card */}
                {(() => {
                  const leadership = branch.branchLeadership;
                  const leaderName = leadership?.name || branch.principalName || 'Campus Leader';
                  const designationTitle = leadership?.designation?.trim() || 'Leader';
                  const leaderPhone = leadership?.phone || branch.principalPhone || branch.phone;
                  const leaderPhoto = leadership?.photoUrl;
                  const leaderDesc = leadership?.description || `Overseeing academic delivery, CBSE & HBSE adherence, student discipline, and parent consultations at ${branch.sector} campus.`;

                  return (
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-slate-50 border border-amber-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-950 uppercase tracking-wider border border-amber-300">
                            Branch Leadership
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {branch.sector}
                          </span>
                        </div>

                        <div className="flex items-start gap-4">
                          {leaderPhoto ? (
                            <img
                              src={leaderPhoto}
                              alt={leaderName}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-md flex-shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-amber-400 font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-md border border-slate-700">
                              <User className="w-8 h-8" />
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                              {leaderName}
                            </h3>
                            <div className="inline-block px-2.5 py-0.5 mt-1 rounded-md bg-amber-500/10 text-amber-800 text-xs font-bold border border-amber-500/20">
                              {designationTitle}
                            </div>
                            {branch.principalQualification && (
                              <p className="text-[11px] text-slate-500 font-medium mt-1">
                                {branch.principalQualification}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/60">
                          {leaderDesc}
                        </p>
                      </div>

                      {leaderPhone && (
                        <div className="pt-3 border-t border-amber-200/60 text-xs flex items-center justify-between">
                          <a
                            href={`tel:${leaderPhone}`}
                            className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1.5 font-mono"
                          >
                            <Phone className="w-3.5 h-3.5 text-amber-600" />
                            <span>Direct Line: {formatPhone(leaderPhone)}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Additional Dynamic Branch Staff from Firestore */}
                {branchStaff.map(st => {
                  const initials = st.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase() || 'SIS';
                  const cleanPhone = (st.phone || '').replace(/\D/g, '');

                  return (
                    <div
                      key={st.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {st.photoUrl ? (
                            <img
                              src={st.photoUrl}
                              alt={st.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 font-bold text-base flex items-center justify-center flex-shrink-0 shadow-xs">
                              {initials}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-200 text-slate-700 uppercase">
                              {st.designation}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm mt-0.5 truncate">{st.name}</h3>
                            {st.department && (
                              <p className="text-[11px] text-amber-700 font-semibold">{st.department}</p>
                            )}
                            {st.qualification && (
                              <p className="text-[11px] text-slate-500 font-medium truncate">{st.qualification}</p>
                            )}
                          </div>
                        </div>
                        {(st.description || st.shortBio) && (
                          <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
                            "{st.description || st.shortBio}"
                          </p>
                        )}
                      </div>

                      {st.phone && (
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <a
                            href={`tel:${st.phone}`}
                            className="text-amber-700 font-bold flex items-center gap-1.5 font-mono"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{formatPhone(st.phone)}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-md border border-slate-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title={`WhatsApp ${st.name}`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Campus Facilities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Facilities at {branch.sector} Campus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(branch.facilities || []).map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Map Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-xl font-bold text-slate-900">Campus Location & Route</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {branch.businessProfileUrl && (
                    <a
                      href={branch.businessProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>View on Google</span>
                    </a>
                  )}
                  <a
                    href={branch.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-slate-600">{branch.address}</p>

              {/* Map embed / visual container */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 h-64 flex items-center justify-center relative">
                <iframe
                  title={`Map of ${branch.name}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Branch Enquiries & Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-300 shadow-md space-y-6 sticky top-24">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider border border-amber-200">
                  Admissions Helpline
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">
                  Apply for {branch.sector} Campus
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our campus counselor or call directly for prospectus.
                </p>
              </div>

              {/* Phone Contacts */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Branch Direct Line</span>
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors font-mono flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{formatPhone(branch.phone)}</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Director Sandeep Kumar</span>
                  <a
                    href="tel:8368268149"
                    className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors font-mono flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>{formatPhone('8368268149')}</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Manager Kalpna Kumari</span>
                  <a
                    href="tel:9355135904"
                    className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors font-mono flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-sky-600" />
                    <span>{formatPhone('9355135904')}</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Official Email</span>
                  <a
                    href={`mailto:${branch.email || 'info@siddharthaschools.edu.in'}`}
                    className="text-xs font-semibold text-slate-800 hover:text-amber-600 transition-colors flex items-center gap-2 truncate"
                  >
                    <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{branch.email || 'info@siddharthaschools.edu.in'}</span>
                  </a>
                </div>
              </div>

              {/* Action */}
              <Link
                href={`/admissions?branch=${encodeURIComponent(branch.id)}`}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs text-center block shadow-md transition-all"
              >
                Submit Admission Form Online
              </Link>

              {branch.businessProfileUrl && (
                <a
                  href={branch.businessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-900 font-bold text-xs text-center flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>View on Google (Reviews & Map)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Footer in branch */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-slate-900">Group Executive Leadership</h2>
          <p className="text-xs text-slate-500">Accessible leadership guiding all 12 Gurugram campuses.</p>
        </div>
        <LeadershipCards />
      </section>
    </div>
  );
}
