import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { useSite } from '../../contexts/SiteContext';
import { updateDocumentSeo } from '../../lib/seo';
import { formatDate, isNoticeActive } from '../../lib/utils';
import { Bell, AlertCircle, Calendar, Building2, ChevronRight, ExternalLink } from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const { notices, branches } = useSite();
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  useEffect(() => {
    updateDocumentSeo({
      title: 'Notices & Circulars | Siddhartha International Group of Schools Gurugram',
      description: 'Official school circulars, examination timetables, holiday announcements, and admission updates for Siddhartha International Group of Schools.',
      canonicalUrl: `${window.location.origin}/notices`,
    });
  }, []);

  const activeNotices = notices.filter(isNoticeActive);

  const filteredNotices = selectedBranch === 'all'
    ? activeNotices
    : activeNotices.filter(n => n.branchId === selectedBranch || n.branchId === 'all');

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="School Notices & Circulars"
        subtitle="Official updates regarding academic calendars, board examination schedules, parent orientations, and holiday advisories."
        badge="Official Announcements"
        breadcrumbs={[{ label: 'Notices' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Branch Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter by Gurugram Campus:
            </span>
          </div>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
          >
            <option value="all">All Campuses (Group-wide notices)</option>
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
            ))}
          </select>
        </div>

        {/* Notices Stack */}
        {filteredNotices.length > 0 ? (
          <div className="space-y-4">
            {filteredNotices.map(notice => {
              const branch = branches.find(b => b.id === notice.branchId);
              const isUrgent = notice.priority === 'Urgent';

              return (
                <div
                  key={notice.id}
                  className={`bg-white rounded-2xl border p-6 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                    isUrgent ? 'border-amber-400 ring-1 ring-amber-400/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-700'
                          : notice.priority === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {notice.priority}
                      </span>

                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        Posted: {formatDate(notice.publishedDate)}
                      </span>

                      {branch ? (
                        <>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-amber-700 font-semibold">
                            {branch.name} ({branch.sector})
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-600 font-semibold">
                            Applicable to All 12 Branches
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{notice.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {notice.description}
                    </p>
                  </div>

                  {notice.buttonText && (
                    <div className="flex-shrink-0">
                      <Link
                        to={notice.buttonUrl || '/admissions'}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <span>{notice.buttonText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Bell className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Active Notices for Selected Campus</h3>
            <p className="text-xs text-slate-500">All recent circulars have been archived or resolved.</p>
          </div>
        )}
      </div>
    </div>
  );
};
