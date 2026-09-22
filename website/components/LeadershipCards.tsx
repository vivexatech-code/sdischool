import React from 'react';
import { Phone, Mail, Award, CheckCircle2, MessageSquare } from 'lucide-react';
import { Staff } from '@/types';
import { formatPhone } from '@/lib/utils';
import { INITIAL_STAFF } from '@/lib/seedData';

export interface LeadershipCardsProps {
  staff?: Staff[];
  compact?: boolean;
}

export const LeadershipCards: React.FC<LeadershipCardsProps> = ({ staff: propStaff, compact = false }) => {
  // Filter central executive leadership
  const leadershipList = (propStaff && propStaff.length > 0)
    ? propStaff
        .filter(s => (s.staffType === 'central' || s.isLeadership || (!s.branchId && (s.designation?.toLowerCase().includes('director') || s.designation?.toLowerCase().includes('manager') || s.name?.toLowerCase().includes('sandeep') || s.name?.toLowerCase().includes('kalpna')))) && s.isActive !== false)
        .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99))
    : INITIAL_STAFF.filter(s => s.staffType === 'central');

  // Fallback if empty
  const displayLeaders = leadershipList.length > 0
    ? leadershipList
    : INITIAL_STAFF.filter(s => s.staffType === 'central');

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${compact ? 'max-w-4xl mx-auto' : ''}`}>
      {displayLeaders.map((member, index) => {
        const initials = member.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase() || 'SIS';

        const cleanPhone = (member.phone || '').replace(/\D/g, '');
        const isDirector = member.designation?.toLowerCase().includes('director') || index === 0;

        return (
          <div
            key={member.id || `leader-${index}`}
            id={`leadership-card-${member.id || index}`}
            className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${isDirector ? 'bg-amber-600' : 'bg-sky-600'}`} />

            <div>
              {/* Member Header */}
              <div className="flex items-start gap-4 sm:gap-5 mb-5">
                <div className="relative flex-shrink-0">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-sm group-hover:scale-102 transition-transform"
                    />
                  ) : (
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl font-extrabold text-2xl sm:text-3xl flex items-center justify-center border-2 shadow-sm ${
                        isDirector
                          ? 'bg-slate-900 text-amber-400 border-amber-300 ring-2 ring-amber-100'
                          : 'bg-slate-900 text-sky-400 border-sky-300 ring-2 ring-sky-100'
                      }`}
                    >
                      {initials}
                    </div>
                  )}

                  <span
                    className={`absolute -bottom-2 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider text-white shadow-xs ${
                      isDirector ? 'bg-amber-600' : 'bg-sky-600'
                    }`}
                  >
                    Leader
                  </span>
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-slate-100 text-slate-800 border border-slate-200">
                    <Award className={`w-3 h-3 ${isDirector ? 'text-amber-600' : 'text-sky-600'}`} />
                    <span>{member.department || 'Executive Leadership'}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-amber-700 leading-tight">
                    {member.designation}
                  </p>

                  <p className="text-[11px] text-slate-500 font-medium">
                    Siddhartha International Group of Schools
                  </p>
                </div>
              </div>

              {/* Bio / Philosophy Message */}
              <div className="relative pl-3.5 my-5 border-l-2 border-amber-300/80">
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{member.description || member.shortBio || 'Dedicated to educational governance, pedagogical advancement, and community care across all 12 Gurugram campuses.'}"
                </p>
              </div>

              {/* Credentials / Experience */}
              {(member.qualification || member.experience) && (
                <div className="flex flex-wrap items-center gap-2 pb-4 text-[11px] text-slate-500">
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
              )}
            </div>

            {/* Bottom Contact Strip */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Direct Line
                </span>
                {member.phone ? (
                  <a
                    href={`tel:${member.phone}`}
                    className="inline-flex items-center text-slate-900 font-extrabold text-sm sm:text-base hover:text-amber-600 transition-colors font-mono"
                    title={`Call ${member.name}`}
                  >
                    <Phone className={`w-3.5 h-3.5 mr-1.5 ${isDirector ? 'text-amber-600' : 'text-sky-600'}`} />
                    <span>{formatPhone(member.phone)}</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">Central Office Reception</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {member.phone && (
                  <>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                      title={`Call ${member.name}`}
                    >
                      <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/91${cleanPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 text-emerald-700 hover:bg-emerald-50 transition-colors bg-white shadow-xs"
                      title={`WhatsApp ${member.name}`}
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                    </a>
                  </>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors bg-white shadow-xs"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4 text-slate-500" />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
