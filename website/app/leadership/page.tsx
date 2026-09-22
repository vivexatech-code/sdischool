import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { LeadershipCards } from '@/components/LeadershipCards';
import { Phone, Mail, Award, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { formatPhone } from '@/lib/utils';
import { getStaff, getBranches } from '@/lib/firestore';
import Link from 'next/link';
import { Building2, Users, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Executive Leadership | Siddhartha International Group of Schools',
  description: 'Meet the executive administration of Siddhartha International Group of Schools. Director Sandeep Kumar and Manager Kalpna Kumari.',
};

export default async function LeadershipPage() {
  const [staff, branches] = await Promise.all([
    getStaff(),
    getBranches(),
  ]);
  const director = staff.find(s => s.designation?.toLowerCase().includes('director') || s.name?.toLowerCase().includes('sandeep'));
  const manager = staff.find(s => s.designation?.toLowerCase().includes('manager') || s.name?.toLowerCase().includes('kalpna'));

  // Faculty and branch staff (excluding executive leadership displayed above)
  const branchFaculty = staff.filter(s => {
    if (s.isActive === false) return false;
    const isCentral = s.staffType === 'central' || (!s.branchId && (s.designation?.toLowerCase().includes('director') || s.designation?.toLowerCase().includes('manager') || s.name?.toLowerCase().includes('sandeep') || s.name?.toLowerCase().includes('kalpna')));
    return !isCentral;
  }).sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Institutional Leadership"
        subtitle="Our institutional directors and administrators bring hands-on dedication, ethical stewardship, and progressive vision to our 12 Gurugram campuses."
        tag="Governance & Administration"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Leadership' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Leadership Cards */}
        <section className="space-y-4">
          <LeadershipCards staff={staff} />
        </section>

        {/* Message from the Director */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            {director?.photoUrl ? (
              <img
                src={director.photoUrl}
                alt={director.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-amber-300 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xl">
                SK
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Message from the Director</h2>
              <span className="text-xs font-semibold text-amber-700">
                {director?.name || 'Sandeep Kumar'} • {director?.designation || 'Director'}
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              "Dear Parents and Students,
              Education is far more than rote memorization or exam percentages. At Siddhartha International Group of Schools, we understand that every child entrusted to us carries immense boundless potential. Our mission is to provide an environment that fosters intellectual curiosity, resilience, moral integrity, and modern competence."
            </p>
            <p>
              "{director?.description || 'Across our 12 campuses in Gurugram, we have invested meticulously in modern classrooms, laboratory infrastructure, certified educator training, and safety protocols. Whether your family chooses the national CBSE curriculum or the state HBSE framework, our promise remains unwavering: your child will receive individual attention, mentorship, and opportunities to shine.'}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Direct Phone Helpline:{' '}
              <a href={`tel:${director?.phone || '8368268149'}`} className="font-bold text-slate-900 font-mono">
                {formatPhone(director?.phone || '8368268149')}
              </a>
            </div>
            <Link
              href="/admissions"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Schedule an In-Person Consultation
            </Link>
          </div>
        </section>

        {/* Message from the Manager */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            {manager?.photoUrl ? (
              <img
                src={manager.photoUrl}
                alt={manager.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-sky-300 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl">
                KK
              </div>
            )}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Administrative Address</h2>
              <span className="text-xs font-semibold text-sky-700">
                {manager?.name || 'Kalpna Kumari'} • {manager?.designation || 'Manager'}
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              "To our prospective and current families,
              Managing an educational institution with 12 thriving branches requires unwavering commitment to transparent administration, parent-school collaboration, and prompt responsiveness. My office ensures that administrative procedures — from admission documentation and bus route coordination to scholarship dispensations and branch transfers — run smoothly and respectfully."
            </p>
            <p>
              "{manager?.description || 'We welcome parents to visit our campuses, inspect our facilities, and interact directly with our teachers and principals. We look forward to welcoming you into the Siddhartha family.'}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Administrative Desk:{' '}
              <a href={`tel:${manager?.phone || '9355135904'}`} className="font-bold text-slate-900 font-mono">
                {formatPhone(manager?.phone || '9355135904')}
              </a>
            </div>
            <a
              href="mailto:info@siddharthaschools.edu.in"
              className="text-xs font-bold text-sky-700 hover:underline"
            >
              info@siddharthaschools.edu.in
            </a>
          </div>
        </section>

        {/* Campus Principals & Faculty Directory */}
        {branchFaculty.length > 0 && (
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  Pedagogical Team
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Campus Principals & Teaching Faculty
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  Dedicated mentors, departmental heads, and qualified educators driving scholastic growth across our 12 Gurugram campuses.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
                <Users className="w-4 h-4 text-amber-600" />
                <span>{branchFaculty.length} Academic Faculty Members</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchFaculty.map(member => {
                const memberBranch = branches.find(b => b.id === member.branchId);
                const initials = member.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase() || 'SIS';
                const cleanPhone = (member.phone || '').replace(/\D/g, '');

                return (
                  <div
                    key={member.id}
                    id={`faculty-card-${member.id}`}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo & Role Header */}
                      <div className="flex items-start gap-4 mb-4">
                        {member.photoUrl ? (
                          <img
                            src={member.photoUrl}
                            alt={member.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center flex-shrink-0 border border-slate-800 shadow-xs">
                            {initials}
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-1">
                          {memberBranch ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                              <Building2 className="w-3 h-3 text-amber-600" />
                              <span className="truncate">{memberBranch.sector} Campus</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                              Central Faculty
                            </span>
                          )}

                          <h3 className="font-bold text-slate-900 text-base leading-snug truncate">
                            {member.name}
                          </h3>
                          <p className="text-xs font-semibold text-amber-700 leading-tight">
                            {member.designation}
                          </p>
                          {member.department && (
                            <p className="text-[11px] text-slate-500">
                              {member.department}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bio / Description */}
                      {(member.description || member.shortBio) && (
                        <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3 mb-4">
                          "{member.description || member.shortBio}"
                        </p>
                      )}

                      {/* Badges: Qualification & Experience */}
                      <div className="flex flex-wrap gap-1.5 mb-4 text-[11px]">
                        {member.qualification && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                            🎓 {member.qualification}
                          </span>
                        )}
                        {member.experience && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                            ⭐ {member.experience}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action / Contact Strip */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      {member.phone ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${member.phone}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors font-mono"
                            title={`Call ${member.name}`}
                          >
                            <Phone className="w-3 h-3 text-amber-400" />
                            <span>{formatPhone(member.phone)}</span>
                          </a>

                          <a
                            href={`https://wa.me/91${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-slate-200 text-emerald-700 hover:bg-emerald-50 transition-colors"
                            title={`WhatsApp ${member.name}`}
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : memberBranch ? (
                        <Link
                          href={`/branches/${memberBranch.slug}`}
                          className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
                        >
                          <span>Visit Campus Page</span>
                          <span>&rarr;</span>
                        </Link>
                      ) : (
                        <span className="text-[11px] text-slate-400">Campus Faculty</span>
                      )}

                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                          title={`Email ${member.name}`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
