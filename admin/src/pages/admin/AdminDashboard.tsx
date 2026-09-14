import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import { 
  Building2, 
  Users, 
  Calendar, 
  Bell, 
  FileText, 
  Plus, 
  ArrowUpRight, 
  Sparkles, 
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { formatDate, formatPhone } from '../../lib/utils';

export const AdminDashboard: React.FC = () => {
  const { branches, staff, events, notices, enquiries, updateEnquiryStatus } = useSite();

  const pendingEnquiries = enquiries.filter(e => e.status?.toLowerCase() === 'new');
  const recentEnquiries = enquiries.slice(0, 5);

  const stats = [
    { label: 'Gurugram Branches', value: branches.length, icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50', link: '/admin/branches' },
    { label: 'Faculty & Staff', value: staff.length, icon: Users, color: 'text-sky-600', bg: 'bg-sky-50', link: '/admin/staff' },
    { label: 'School Events', value: events.length, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/admin/events' },
    { label: 'Active Notices', value: notices.length, icon: Bell, color: 'text-purple-600', bg: 'bg-purple-50', link: '/admin/notices' },
    { label: 'Admission Enquiries', value: enquiries.length, icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', link: '/admin/enquiries' },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Siddhartha International Group of Schools • Multi-Branch Operations
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to="/admin/branches"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Branch</span>
          </Link>

          <Link
            to="/admin/events"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </Link>

          <Link
            to="/admin/notices"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Notice</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              to={s.link}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">{s.value}</span>
                <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">{s.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Leadership Quick Verification Strip */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-950">School Leadership Directory</h3>
            <p className="text-xs text-amber-800">
              Director: Sandeep Kumar ({formatPhone('8368268149')}) • Manager: Kalpna Kumari ({formatPhone('9355135904')})
            </p>
          </div>
        </div>
        <Link
          to="/admin/settings"
          className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex-shrink-0"
        >
          Edit School Settings
        </Link>
      </div>

      {/* Recent Enquiries & Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Enquiries */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recent Admission Enquiries</h3>
              <p className="text-xs text-slate-500">Submissions from prospective parents</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              View All ({enquiries.length}) &rarr;
            </Link>
          </div>

          {recentEnquiries.length > 0 ? (
            <div className="space-y-3">
              {recentEnquiries.map(enq => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{enq.studentName}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{enq.classGrade}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-amber-700 font-semibold">{enq.preferredBranchName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span>Parent: {enq.parentName}</span>
                      <span>•</span>
                      <a href={`tel:${enq.mobile}`} className="text-slate-700 font-bold hover:underline">
                        {formatPhone(enq.mobile)}
                      </a>
                    </div>
                  </div>

                  <select
                    value={enq.status || 'new'}
                    onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                    className="px-2 py-1 text-[11px] font-bold rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="follow_up">Follow-up</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No admission enquiries recorded yet.
            </div>
          )}
        </div>

        {/* Right: Quick Branches Status */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Active Gurugram Branches</h3>
              <p className="text-xs text-slate-500">12 campuses status</p>
            </div>
            <Link
              to="/admin/branches"
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Manage &rarr;
            </Link>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {branches.map(b => (
              <div
                key={b.id}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/50 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{b.sector}</span>
                  <span className="text-[11px] text-slate-500">{b.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                    {b.board}
                  </span>
                  <Link
                    to={`/branches/${b.slug}`}
                    target="_blank"
                    className="p-1 text-slate-400 hover:text-amber-700"
                    title="View live branch page"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
