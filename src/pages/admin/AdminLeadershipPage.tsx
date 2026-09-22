import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { Staff } from '../../types';
import { 
  Award, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  Check, 
  X, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Building, 
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { formatPhone } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const AdminLeadershipPage: React.FC = () => {
  const { staff, saveStaff, removeStaff } = useSite();

  // Filter only central leadership
  const leadershipList = staff
    .filter(s => s.staffType === 'central' || s.isLeadership || (!s.branchId && (s.designation?.toLowerCase().includes('director') || s.designation?.toLowerCase().includes('manager') || s.name?.toLowerCase().includes('sandeep') || s.name?.toLowerCase().includes('kalpna'))))
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  const [editingItem, setEditingItem] = useState<Partial<Staff> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openNewModal = () => {
    setError(null);
    setEditingItem({
      name: '',
      designation: 'Director, Siddhartha International Group of Schools',
      description: '',
      shortBio: '',
      phone: '',
      email: '',
      department: 'Central Executive Leadership',
      qualification: 'M.A., M.Ed.',
      experience: '15+ Years',
      photoUrl: '',
      cloudinaryPublicId: '',
      staffType: 'central',
      branchId: null,
      branchName: 'All Gurugram Campuses (Central)',
      displayOrder: leadershipList.length + 1,
      isActive: true,
      isLeadership: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (st: Staff) => {
    setError(null);
    setEditingItem({
      ...st,
      staffType: 'central',
      branchId: null,
      branchName: 'All Gurugram Campuses (Central)',
      description: st.description || st.shortBio || '',
      shortBio: st.shortBio || st.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name?.trim()) {
      setError('Full Name is required.');
      return;
    }
    if (!editingItem.designation?.trim()) {
      setError('Designation is required.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const payload: Partial<Staff> = {
        ...editingItem,
        name: editingItem.name.trim(),
        designation: editingItem.designation.trim(),
        description: editingItem.description || editingItem.shortBio || '',
        shortBio: editingItem.description || editingItem.shortBio || '',
        phone: editingItem.phone?.trim() || '',
        email: editingItem.email?.trim() || '',
        department: editingItem.department?.trim() || 'Central Executive Leadership',
        staffType: 'central',
        branchId: null,
        branchName: 'All Gurugram Campuses (Central)',
        isLeadership: true,
        displayOrder: Number(editingItem.displayOrder) || 1,
        isActive: editingItem.isActive !== false,
      };

      await saveStaff(payload);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error saving leadership record:', err);
      setError((err as Error).message || 'Failed to save leadership record.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete executive leadership record "${name}"? This action cannot be undone.`)) {
      try {
        await removeStaff(id);
      } catch (err) {
        console.error('Failed to delete staff:', err);
        alert('Failed to delete staff record.');
      }
    }
  };

  const handleToggleActive = async (st: Staff) => {
    try {
      await saveStaff({
        ...st,
        isActive: !st.isActive,
      });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= leadershipList.length) return;

    const current = leadershipList[index];
    const target = leadershipList[targetIndex];

    const currentOrder = current.displayOrder || index + 1;
    const targetOrder = target.displayOrder || targetIndex + 1;

    try {
      await Promise.all([
        saveStaff({ ...current, displayOrder: targetOrder }),
        saveStaff({ ...target, displayOrder: currentOrder }),
      ]);
    } catch (err) {
      console.error('Failed to swap display orders:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Central Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Executive Leadership Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Manage the central leadership team (Director, Manager, Trustees) displayed on the public Homepage and Executive Leadership page. These records represent the entire school group.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/leadership"
            target="_blank"
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Preview Public Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={openNewModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Leadership Member</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Banner */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <span className="font-extrabold text-amber-950 uppercase tracking-wider text-[11px] block">
            Executive Governance Roster ({leadershipList.length} Active Records)
          </span>
          <p className="text-amber-900">
            Changes made here automatically sync to Firestore and instantly update the <strong>Homepage</strong> leadership cards, direct call buttons, and the dedicated <strong>/leadership</strong> route.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-amber-200/70 text-amber-950 font-bold text-[11px]">
            {leadershipList.filter(l => l.isActive !== false).length} Published
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white text-slate-600 font-semibold text-[11px] border border-amber-200">
            {leadershipList.filter(l => l.isActive === false).length} Hidden
          </span>
        </div>
      </div>

      {/* Leadership Directory List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Executive Leadership Directory
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Sorted by Display Order
          </span>
        </div>

        {leadershipList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {leadershipList.map((member, idx) => (
              <div
                key={member.id}
                className={`p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-colors ${
                  member.isActive === false ? 'bg-slate-50/60 opacity-75' : 'hover:bg-slate-50/40'
                }`}
              >
                {/* Photo & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative flex-shrink-0">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-amber-400 font-extrabold text-xl flex items-center justify-center border-2 border-amber-300 shadow-sm">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'SIS'}
                      </div>
                    )}
                    <span className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center border border-white shadow-xs">
                      #{member.displayOrder || idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                        {member.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                        {member.designation}
                      </span>
                      {member.isActive === false ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                          Inactive (Hidden)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Active (Visible)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-amber-700 font-semibold">
                      {member.department || 'Central Executive Office'}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {member.description || member.shortBio || 'No administrative description provided yet.'}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-1 text-slate-700 font-mono font-bold hover:text-amber-600"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>{formatPhone(member.phone)}</span>
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1 text-slate-600 hover:text-amber-600"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{member.email}</span>
                        </a>
                      )}
                      {member.qualification && (
                        <span className="text-slate-400 font-medium">
                          • {member.qualification}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions & Ordering */}
                <div className="flex items-center gap-2 self-end lg:self-center flex-shrink-0">
                  {/* Reorder Buttons */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      type="button"
                      onClick={() => handleMoveOrder(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveOrder(idx, 'down')}
                      disabled={idx === leadershipList.length - 1}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-transparent border-l border-slate-200"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(member)}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                      member.isActive === false
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                    title={member.isActive === false ? 'Publish on Website' : 'Hide from Website'}
                  >
                    {member.isActive === false ? (
                      <>
                        <Eye className="w-4 h-4 text-emerald-600" />
                        <span className="hidden sm:inline">Show</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4 text-slate-400" />
                        <span className="hidden sm:inline">Hide</span>
                      </>
                    )}
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(member)}
                    className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleDelete(member.id, member.name)}
                    className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-lg">No Executive Leadership Added Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Add Director Sandeep Kumar and Manager Kalpna Kumari to display them dynamically on the public site.
              </p>
            </div>
            <button
              onClick={openNewModal}
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Leader</span>
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Leadership Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {editingItem.id ? 'Edit Executive Leader' : 'Add Executive Leader'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Central authority record for Siddhartha International Group of Schools
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingItem(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Profile Photo via Cloudinary / URL */}
              <div>
                <ImageUpload
                  label="Leader Portrait Photo"
                  helperText="Upload official profile photo or enter direct Cloudinary image link."
                  value={editingItem.photoUrl || ''}
                  publicId={editingItem.cloudinaryPublicId || ''}
                  onChange={({ imageUrl, cloudinaryPublicId }) => {
                    setEditingItem(prev => ({
                      ...prev,
                      photoUrl: imageUrl,
                      cloudinaryPublicId: cloudinaryPublicId || prev?.cloudinaryPublicId || '',
                    }));
                  }}
                  folder="schools/leadership"
                  aspectRatio="square"
                />
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandeep Kumar"
                    value={editingItem.name || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Director, Siddhartha International Group of Schools"
                    value={editingItem.designation || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, designation: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Department & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department / Office
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Executive Governance or Administration & Operations"
                    value={editingItem.department || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingItem.displayOrder || 1}
                    onChange={e => setEditingItem(prev => ({ ...prev, displayOrder: parseInt(e.target.value, 10) || 1 }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 8368268149 or 9355135904"
                    value={editingItem.phone || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Enables 1-click calling & WhatsApp from public cards</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. director@siddharthaschools.edu.in"
                    value={editingItem.email || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Qualifications & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Qualifications / Credentials
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M.A., M.Ed., Ph.D."
                    value={editingItem.qualification || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, qualification: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 20+ Years in Pedagogical Leadership"
                    value={editingItem.experience || ''}
                    onChange={e => setEditingItem(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Description / Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Leadership Statement / Message / Bio
                </label>
                <textarea
                  rows={4}
                  placeholder="Official message or administrative overview displayed on the leadership card..."
                  value={editingItem.description || editingItem.shortBio || ''}
                  onChange={e => setEditingItem(prev => ({
                    ...prev,
                    description: e.target.value,
                    shortBio: e.target.value,
                  }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Status Switch */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-900 block">
                    Public Website Visibility
                  </label>
                  <span className="text-[11px] text-slate-500">
                    If active, this leader appears on the homepage and leadership page.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.isActive !== false}
                    onChange={e => setEditingItem(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs disabled:opacity-50 transition-colors inline-flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingItem.id ? 'Update Leader' : 'Save Leader'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
