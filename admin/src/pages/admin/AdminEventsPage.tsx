import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { SchoolEvent } from '../../types';
import { slugify, formatDate } from '../../lib/utils';
import { Calendar, Plus, Edit, Trash2, Building2, MapPin, X } from 'lucide-react';
import { ImageUpload } from '../../components/admin/ImageUpload';

export const AdminEventsPage: React.FC = () => {
  const { events, branches, saveEvent, removeEvent } = useSite();

  const [editingEvent, setEditingEvent] = useState<Partial<SchoolEvent> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNewModal = () => {
    setEditingEvent({
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      venue: 'Main Auditorium, Sector 14 Campus',
      category: 'Celebration',
      branchId: 'all',
      description: '',
      imageUrl: '',
      cloudinaryPublicId: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ev: SchoolEvent) => {
    setEditingEvent(ev);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title) return;

    try {
      setSaving(true);
      const generatedSlug = editingEvent.slug || slugify(editingEvent.title);
      await saveEvent({
        ...editingEvent,
        slug: generatedSlug,
      } as SchoolEvent);

      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (err) {
      console.error('Error saving event:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete event "${title}"?`)) {
      await removeEvent(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            School Events & Celebrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish school festivals, sports tournaments, and parent workshops.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Event</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            All Events ({events.length})
          </span>
        </div>

        {events.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {events.map(ev => {
              const assignedBranch = branches.find(b => b.id === ev.branchId);

              return (
                <div
                  key={ev.id}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={ev.imageUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop'}
                      alt={ev.title}
                      className="w-20 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">{ev.title}</h3>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">
                          {ev.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {formatDate(ev.date)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-1">{ev.description}</p>

                      <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{ev.venue}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>{assignedBranch ? assignedBranch.name : 'All 12 Branches'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => openEditModal(ev)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id, ev.title)}
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
            No events created yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {editingEvent.id ? 'Edit Event' : 'Create School Event'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="e.g. Annual Sports Meet 2027"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingEvent.category || 'Celebration'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Celebration">Celebration</option>
                    <option value="Sports">Sports</option>
                    <option value="Academics">Academics</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Venue *</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.venue || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    placeholder="e.g. Sector 14 School Grounds"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Campus</label>
                  <select
                    value={editingEvent.branchId || 'all'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, branchId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="all">All 12 Campuses</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
                    ))}
                  </select>
                </div>
              </div>

              <ImageUpload
                label="Event Banner / Cover Image"
                helperText="Upload event photo or promotional creative. JPG, PNG, WEBP (up to 10MB)"
                aspectRatio="video"
                value={editingEvent.imageUrl || ''}
                publicId={editingEvent.cloudinaryPublicId || ''}
                folder="schools/events"
                onChange={({ imageUrl, cloudinaryPublicId }) => {
                  setEditingEvent(prev => prev ? ({
                    ...prev,
                    imageUrl,
                    cloudinaryPublicId: cloudinaryPublicId || prev.cloudinaryPublicId
                  }) : null);
                }}
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  placeholder="Details about program schedule, timings, dress code..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
