import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { Staff } from '../../types';
import { Users, Plus, Edit, Trash2, Building2, X, Check } from 'lucide-react';
import { ImageUpload } from '../../components/admin/ImageUpload';

export const AdminStaffPage: React.FC = () => {
  const { staff, branches, saveStaff, removeStaff } = useSite();

  const [editingStaff, setEditingStaff] = useState<Partial<Staff> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNewModal = () => {
    setEditingStaff({
      name: '',
      designation: 'Senior Faculty',
      qualification: 'M.Sc., B.Ed.',
      branchId: branches[0]?.id || '',
      email: '',
      phone: '',
      photoUrl: '',
      cloudinaryPublicId: '',
      shortBio: '',
      isActive: true,
      displayOrder: staff.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (st: Staff) => {
    setEditingStaff(st);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff || !editingStaff.name) return;

    try {
      setSaving(true);
      await saveStaff(editingStaff as Staff);
      setIsModalOpen(false);
      setEditingStaff(null);
    } catch (err) {
      console.error('Error saving staff:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete faculty member "${name}"?`)) {
      await removeStaff(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Staff & Faculty Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Assign teachers and administrators to specific Gurugram branches.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Faculty Directory ({staff.length})
          </span>
        </div>

        {staff.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {staff.map(member => {
              const assignedBranch = branches.find(b => b.id === member.branchId);

              return (
                <div
                  key={member.id}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={member.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                          {member.designation}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{member.qualification}</p>
                      <div className="flex items-center gap-2 text-xs text-amber-800">
                        <Building2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Branch: {assignedBranch ? assignedBranch.name : 'Group-Wide'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
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
            No faculty members created yet. Click "Add Faculty Member" to create one.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {editingStaff.id ? `Edit ${editingStaff.name}` : 'Add New Faculty Member'}
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
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingStaff.name || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={editingStaff.designation || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, designation: e.target.value })}
                    placeholder="e.g. Head of Science"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={editingStaff.qualification || ''}
                    onChange={(e) => setEditingStaff({ ...editingStaff, qualification: e.target.value })}
                    placeholder="M.Sc. Physics, B.Ed."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign to Gurugram Branch</label>
                <select
                  value={editingStaff.branchId || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, branchId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
                  ))}
                </select>
              </div>

              <ImageUpload
                label="Staff / Faculty Photo"
                helperText="Upload professional faculty portrait. JPG, PNG, WEBP (up to 10MB)"
                aspectRatio="square"
                value={editingStaff.photoUrl || ''}
                publicId={editingStaff.cloudinaryPublicId || ''}
                folder="schools/staff"
                onChange={({ imageUrl, cloudinaryPublicId }) => {
                  setEditingStaff(prev => prev ? ({
                    ...prev,
                    photoUrl: imageUrl,
                    cloudinaryPublicId: cloudinaryPublicId || prev.cloudinaryPublicId
                  }) : null);
                }}
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={editingStaff.shortBio || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, shortBio: e.target.value })}
                  placeholder="Brief experience or specialized subjects..."
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
                  {saving ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
