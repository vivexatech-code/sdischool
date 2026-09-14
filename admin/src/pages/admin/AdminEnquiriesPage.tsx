import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { AdmissionEnquiry } from '../../types';
import { formatDate, formatPhone } from '../../lib/utils';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Building2, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  MessageSquare,
  Save
} from 'lucide-react';

export const AdminEnquiriesPage: React.FC = () => {
  const { enquiries, branches, updateEnquiryStatus, deleteEnquiry } = useSite();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [branchFilter, setBranchFilter] = useState<string>('All');
  const [boardFilter, setBoardFilter] = useState<string>('All');

  // Selected enquiry for detail & notes modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [selectedStatusInput, setSelectedStatusInput] = useState<AdmissionEnquiry['status']>('new');
  const [savingNotes, setSavingNotes] = useState(false);

  const openDetailModal = (enq: AdmissionEnquiry) => {
    setSelectedEnquiry(enq);
    setAdminNotesInput(enq.adminNotes || '');
    setSelectedStatusInput(enq.status || 'new');
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setSavingNotes(true);
      await updateEnquiryStatus(selectedEnquiry.id, selectedStatusInput, adminNotesInput.trim());
      setSelectedEnquiry({
        ...selectedEnquiry,
        status: selectedStatusInput,
        adminNotes: adminNotesInput.trim(),
      });
    } catch (err) {
      console.error('Error updating enquiry:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete admission enquiry for student "${name}"? This action cannot be undone.`)) {
      await deleteEnquiry(id);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  // Filter Logic
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch =
      enq.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.mobile.includes(searchQuery) ||
      (enq.email && enq.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' ? true : enq.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesBranch = branchFilter === 'All' ? true : enq.preferredBranchId === branchFilter;
    const matchesBoard = boardFilter === 'All' ? true : enq.board.includes(boardFilter);

    return matchesSearch && matchesStatus && matchesBranch && matchesBoard;
  });

  // CSV Export Utility
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) return;

    const headers = [
      'ID',
      'Student Name',
      'Parent Name',
      'Mobile Number',
      'Email',
      'Class Grade',
      'Preferred Branch',
      'Board',
      'Status',
      'Submitted Date',
      'Message'
    ];

    const rows = filteredEnquiries.map(e => [
      `"${e.id}"`,
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${e.parentName.replace(/"/g, '""')}"`,
      `"${e.mobile}"`,
      `"${e.email || ''}"`,
      `"${e.classGrade}"`,
      `"${e.preferredBranchName.replace(/"/g, '""')}"`,
      `"${e.board}"`,
      `"${e.status}"`,
      `"${e.createdAt}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Siddhartha_School_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header & Export Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Admission Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track, filter, and update parent application statuses across 12 Gurugram campuses.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={filteredEnquiries.length === 0}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-sm disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Export to CSV ({filteredEnquiries.length})</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Search Field */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Search Parents or Students</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name or phone..."
                className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Branch Filter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Gurugram Campus</label>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All 12 Campuses</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
              ))}
            </select>
          </div>

          {/* Board Filter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Curriculum Board</label>
            <select
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="All">All Boards</option>
              <option value="CBSE">CBSE</option>
              <option value="HBSE">HBSE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Filtered Submissions ({filteredEnquiries.length})
          </span>
        </div>

        {filteredEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Student & Parent</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Class & Board</th>
                  <th className="p-4">Preferred Campus</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Received</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map(enq => (
                  <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm">{enq.studentName}</div>
                      <div className="text-slate-500">Parent: {enq.parentName}</div>
                      {enq.adminNotes && (
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded">
                          <MessageSquare className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">{enq.adminNotes}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 space-y-0.5">
                      <a href={`tel:${enq.mobile}`} className="font-bold text-slate-800 hover:text-amber-700 block">
                        {formatPhone(enq.mobile)}
                      </a>
                      {enq.email && (
                        <span className="text-[11px] text-slate-400 block">{enq.email}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{enq.classGrade}</span>
                      <span className="text-[10px] font-semibold text-amber-700 uppercase">{enq.board}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800">{enq.preferredBranchName}</span>
                    </td>
                    <td className="p-4">
                      <select
                        value={enq.status || 'new'}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg border focus:outline-none ${
                          enq.status?.toLowerCase() === 'new'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : enq.status?.toLowerCase() === 'contacted'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : enq.status?.toLowerCase() === 'converted'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="follow_up">Follow-up</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(enq.createdAt)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDetailModal(enq)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="View Details & Add Notes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id, enq.studentName)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            No admission enquiries match the current filters.
          </div>
        )}
      </div>

      {/* Detail & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                  Enquiry Details
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedEnquiry.studentName}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-semibold">Parent / Guardian</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEnquiry.parentName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-semibold">Mobile Number</span>
                <a href={`tel:${selectedEnquiry.mobile}`} className="font-bold text-amber-700 text-sm hover:underline">
                  {formatPhone(selectedEnquiry.mobile)}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-semibold">Class Seeking</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEnquiry.classGrade} ({selectedEnquiry.board})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block font-semibold">Preferred Branch</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEnquiry.preferredBranchName}</span>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                <span className="font-bold text-amber-950 block mb-1">Parent Message / Questions:</span>
                <p className="text-slate-700 leading-relaxed italic">"{selectedEnquiry.message}"</p>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Update Status</label>
                <select
                  value={selectedStatusInput}
                  onChange={(e) => setSelectedStatusInput(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="new">New (Uncontacted)</option>
                  <option value="contacted">Contacted / Counseling In Progress</option>
                  <option value="follow_up">Follow-up Needed</option>
                  <option value="converted">Converted / Enrolled</option>
                  <option value="closed">Closed / Not Interested</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Staff / Admission Officer Notes</label>
                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="Record callback summary, campus tour date, fee discussion notes..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.studentName)}
                className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={savingNotes}
                  onClick={handleSaveNotes}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingNotes ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
