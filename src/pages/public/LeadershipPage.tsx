import React, { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { LeadershipCards } from '../../components/common/LeadershipCards';
import { updateDocumentSeo } from '../../lib/seo';
import { useSite } from '../../contexts/SiteContext';
import { 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  Shield, 
  HeartHandshake, 
  GraduationCap, 
  Building2, 
  Search, 
  Filter,
  MessageSquare,
  Users
} from 'lucide-react';
import { formatPhone } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const LeadershipPage: React.FC = () => {
  const { staff, branches } = useSite();
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updateDocumentSeo({
      title: 'Our Leadership & Staff | Siddhartha International Group of Schools',
      description: 'Meet our school leadership and qualified faculty across all 12 Gurugram campuses. Director Sandeep Kumar (8368268149), Manager Kalpna Kumari (9355135904), campus principals, and subject teachers.',
      canonicalUrl: `${window.location.origin}/leadership`,
    });
  }, []);

  // Filter branch faculty & staff (exclude central leaders which are shown in top section)
  const branchFaculty = useMemo(() => {
    return staff.filter(s => {
      // Must be active
      if (s.isActive === false) return false;
      // Filter out central leaders shown in top card
      const isCentralLeader = s.staffType === 'central' || (!s.branchId && (s.designation?.toLowerCase().includes('director') || s.designation?.toLowerCase().includes('manager') || s.name?.toLowerCase().includes('sandeep') || s.name?.toLowerCase().includes('kalpna')));
      if (isCentralLeader) return false;

      // Filter by branch
      if (selectedBranchId !== 'all' && s.branchId !== selectedBranchId) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = s.name.toLowerCase().includes(query);
        const desigMatch = s.designation.toLowerCase().includes(query);
        const deptMatch = s.department?.toLowerCase().includes(query);
        const qualMatch = s.qualification?.toLowerCase().includes(query);
        return nameMatch || desigMatch || deptMatch || qualMatch;
      }

      return true;
    }).sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
  }, [staff, selectedBranchId, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Our Leadership & Faculty"
        subtitle="Dedicated administrators and certified educators fostering academic rigor, moral character, and holistic growth across 12 Gurugram campuses."
        badge="Governance & Faculty Directory"
        breadcrumbs={[{ label: 'Leadership & Staff' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* =========================================================================
            SECTION 1: EXECUTIVE CENTRAL LEADERSHIP
            ========================================================================= */}
        <section id="executive-leadership-section" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Central Administration
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Executive School Leadership
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Our central executive leadership oversees institutional vision, CBSE & HBSE accreditation, curriculum policy, and student welfare.
            </p>
          </div>

          <LeadershipCards />
        </section>

        {/* =========================================================================
            SECTION 2: CAMPUS PRINCIPALS & FACULTY DIRECTORY
            ========================================================================= */}
        <section id="faculty-directory-section" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                Academic Excellence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Campus Principals & Teaching Faculty
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                Certified, experienced subject experts and mentors guiding students from Kindergarten to Senior Secondary.
              </p>
            </div>

            {/* Total staff count chip */}
            <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Showing {branchFaculty.length} Faculty Members</span>
            </div>
          </div>

          {/* Filtering & Search Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, subject, or role..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
              />
            </div>

            {/* Branch Selector Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <label htmlFor="branch-filter" className="text-xs font-medium text-slate-600 whitespace-nowrap">
                Filter by Campus:
              </label>
              <select
                id="branch-filter"
                value={selectedBranchId}
                onChange={e => setSelectedBranchId(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All 12 Campuses</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.sector})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Staff Grid */}
          {branchFaculty.length > 0 ? (
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
                    id={`staff-card-${member.id}`}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between"
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
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
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
                          to={`/branches/${memberBranch.slug}`}
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
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-base">No Faculty Found</h3>
              <p className="text-xs text-slate-500">
                {searchQuery
                  ? `No faculty member matched "${searchQuery}". Try a different keyword.`
                  : 'No faculty members are currently listed for the selected campus.'}
              </p>
              {(searchQuery || selectedBranchId !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedBranchId('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 3: ADMINISTRATIVE PHILOSOPHY & COMMITMENT
            ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Institutional Governance
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              Accessible Leadership with an Open Door Policy
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Unlike monolithic institutions where parents struggle to reach executive authorities, Siddhartha International Group of Schools maintains direct accessibility. Both our Director and Manager are actively available for parent consultations, curriculum evaluations, and student welfare inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Uncompromising Safety</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct oversight on security drills, verified background checks for all staff, and GPS surveillance across all campuses.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Academic Accountability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular classroom reviews, standardized lesson planning, and continuous teacher training workshops.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Parent-Centric Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quarterly parent-teacher interactions, transparent fee structures, and personalized remedial tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact Strip */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Need to consult school leadership?</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Director Sandeep Kumar: 8368268149 • Manager Kalpna Kumari: 9355135904
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:8368268149"
              className="px-5 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Director</span>
            </a>
            <a
              href="tel:9355135904"
              className="px-5 py-2.5 rounded-lg bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Manager</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
