import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { Notice } from '../../types';
import { formatDate } from '../../lib/utils';
import { Bell, Plus, Edit, Trash2, Building2, X, AlertCircle } from 'lucide-react';
import { ImageUpload } from '../../components/admin/ImageUpload';

export const AdminNoticesPage: React.FC = () => {
  const { notices, branches, saveNotice, removeNotice } = useSite();

  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNewModal = () => {
    setEditingNotice({
      title: '',
      description: '',
      priority: 'Normal',
      branchId: 'all',
      publishedDate: new Date().toISOString(),
      isActive: true,
      buttonText: 'View Details',
      buttonUrl: '/admissions',
      imageUrl: '',
      cloudinaryPublicId: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (n: Notice) => {
    setEditingNotice(n);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.title) return;

    try {
      setSaving(true);
      await saveNotice(editingNotice as Notice);
      setIsModalOpen(false);
      setEditingNotice(null);
    } catch (err) {
      console.error('Error saving notice:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete notice "${title}"?`)) {
      await removeNotice(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Notices & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Broadcast emergency alerts, holiday advisories, or admission updates across campuses.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notice</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            All Notices ({notices.length})
          </span>
        </div>

        {notices.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {notices.map(notice => {
              const branch = branches.find(b => b.id === notice.branchId);

              return (
                <div
                  key={notice.id}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base">{notice.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        notice.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-700'
                          : notice.priority === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {notice.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                        {notice.isActive ? 'Active' : 'Archived'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl">{notice.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>Posted: {formatDate(notice.publishedDate)}</span>
                      <span>•</span>
                      <span>Target: <strong className="text-slate-700">{branch ? branch.name : 'All 12 Campuses'}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => openEditModal(notice)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id, notice.title)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            No notices posted yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {editingNotice.id ? 'Edit Notice' : 'Broadcast School Notice'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  placeholder="e.g. CBSE Term 2 Pre-Board Timetable Declared"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
                  <select
                    value={editingNotice.priority || 'Normal'}
                    onChange={(e) => setEditingNotice({ ...editingNotice, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent (Shows on Top Ticker)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Campus</label>
                  <select
                    value={editingNotice.branchId || 'all'}
                    onChange={(e) => setEditingNotice({ ...editingNotice, branchId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="all">All 12 Campuses</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Message Body *</label>
                <textarea
                  rows={4}
                  required
                  value={editingNotice.description || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, description: e.target.value })}
                  placeholder="Full circular details, reporting dates, guidelines..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CTA Button Text (Optional)</label>
                  <input
                    type="text"
                    value={editingNotice.buttonText || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, buttonText: e.target.value })}
                    placeholder="e.g. View Timetable"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">CTA Button Link</label>
                  <input
                    type="text"
                    value={editingNotice.buttonUrl || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, buttonUrl: e.target.value })}
                    placeholder="e.g. /admissions"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date (Optional)</label>
                  <input
                    type="date"
                    value={editingNotice.startDate || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={editingNotice.endDate || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <ImageUpload
                label="Circular Attachment / Banner Image (Optional)"
                helperText="Upload official circular scan, poster, or document image. JPG, PNG, WEBP (up to 10MB)"
                aspectRatio="video"
                value={editingNotice.imageUrl || ''}
                publicId={editingNotice.cloudinaryPublicId || ''}
                folder="schools/notices"
                onChange={({ imageUrl, cloudinaryPublicId }) => {
                  setEditingNotice(prev => prev ? ({
                    ...prev,
                    imageUrl,
                    cloudinaryPublicId: cloudinaryPublicId || prev.cloudinaryPublicId
                  }) : null);
                }}
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={editingNotice.isActive ?? true}
                  onChange={(e) => setEditingNotice({ ...editingNotice, isActive: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="isActive" className="font-semibold text-slate-700">
                  Notice is Active (Visible on Public Website)
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-amber-600 text-white rounded-lg font-bold"
                >
                  {saving ? 'Saving...' : 'Save Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
