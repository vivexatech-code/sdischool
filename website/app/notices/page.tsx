import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { getNotices } from '@/lib/firestore';
import { formatDate, isNoticeActive } from '@/lib/utils';
import { Bell, Download, Calendar, Tag, AlertCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Circulars & Notices | Siddhartha International Schools',
  description: 'View the latest official notifications, academic schedules, holiday calendars, and administrative circulars for students and parents across our 12 Gurugram campuses.',
};

export default async function NoticesPage() {
  const notices = await getNotices();
  // Filter active notices
  const activeNotices = notices.filter(isNoticeActive);

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Circulars & Notice Board"
        subtitle="Stay fully updated on academic schedules, parent-teacher meetings, board registration deadlines, and administrative notifications."
        tag="Official Information Desk"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Notices' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {activeNotices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
            <Bell className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No Active Circulars</h3>
            <p className="text-xs">There are currently no new circulars published. Please check back shortly.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                      notice.priority === 'urgent'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                        : notice.priority === 'normal'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {notice.priority.toUpperCase()}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {notice.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Published: {formatDate(notice.date)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{notice.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                    {notice.description}
                  </p>
                </div>

                {notice.downloadUrl && (
                  <div className="pt-2 border-t border-slate-100">
                    <a
                      href={notice.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Attachment (PDF/Document)</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
