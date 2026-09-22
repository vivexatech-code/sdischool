import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { Staff } from '../../types';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Building2, 
  X, 
  Check, 
  Award, 
  Phone, 
  Mail, 
  Filter, 
  Search, 
  Eye, 
  EyeOff,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { ImageUpload } from '../../components/admin/ImageUpload';
import { formatPhone } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const AdminStaffPage: React.FC = () => {
  const { staff, branches, saveStaff, removeStaff } = useSite();

  const [editingStaff, setEditingStaff] = useState<Partial<Staff> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'central' | 'branch'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = staff.filter(member => {
    const isCentral = member.staffType === 'central' || (!member.branchId && (member.designation?.toLowerCase().includes('director') || member.designation?.toLowerCase().includes('manager')));
    const memberType = isCentral ? 'central' : 'branch';

    if (selectedTypeFilter !== 'all' && memberType !== selectedTypeFilter) {
      return false;
    }

    if (selectedBranchFilter !== 'all') {
      if (selectedBranchFilter === 'central') {
        if (!isCentral) return false;
      } else {
        if (member.branchId !== selectedBranchFilter) return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = member.name.toLowerCase().includes(q);
      const matchDesig = member.designation?.toLowerCase().includes(q);
      const matchDept = member.department?.toLowerCase().includes(q);
      return matchName || matchDesig || matchDept;
    }

    return true;
  });

  const openNewModal = () => {
    setError(null);
    setEditingStaff({
      name: '',
      designation: 'Senior Faculty',
      qualification: 'M.Sc., B.Ed.',
      staffType: 'branch',
      branchId: branches[0]?.id || '',
      branchName: branches[0]?.name || '',
      department: 'Secondary Academics',
      experience: '5+ Years',
      email: '',
      phone: '',
      photoUrl: '',
      cloudinaryPublicId: '',
      shortBio: '',
      description: '',
      isActive: true,
      displayOrder: staff.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (st: Staff) => {
    setError(null);
    const isCentral = st.staffType === 'central' || (!st.branchId && (st.designation?.toLowerCase().includes('director') || st.designation?.toLowerCase().includes('manager')));
    setEditingStaff({
      ...st,
      staffType: isCentral ? 'central' : 'branch',
      shortBio: st.shortBio || st.description || '',
      description: st.description || st.shortBio || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff || !editingStaff.name?.trim()) {
      setError('Staff Name is required.');
      return;
    }
    if (!editingStaff.designation?.trim()) {
      setError('Designation is required.');
      return;
    }

    const isCentral = editingStaff.staffType === 'central';
    if (!isCentral && !editingStaff.branchId) {
      setError('Please select a Gurugram Branch for this faculty member.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const assignedBranch = !isCentral ? branches.find(b => b.id === editingStaff.branchId) : null;

      const payload: Partial<Staff> = {
        ...editingStaff,
        name: editingStaff.name.trim(),
        designation: editingStaff.designation.trim(),
        staffType: isCentral ? 'central' : 'branch',
        branchId: isCentral ? null : editingStaff.branchId,
        branchName: isCentral ? 'All Gurugram Campuses (Central)' : (assignedBranch?.name || ''),
        shortBio: editingStaff.shortBio || editingStaff.description || '',
        description: editingStaff.description || editingStaff.shortBio || '',
        phone: editingStaff.phone?.trim() || '',
        email: editingStaff.email?.trim() || '',
        department: editingStaff.department?.trim() || '',
        qualification: editingStaff.qualification?.trim() || '',
        experience: String(editingStaff.experience ?? '').trim(),
        displayOrder: Number(editingStaff.displayOrder) || 1,
        isActive: editingStaff.isActive !== false,
      };

      await saveStaff(payload);
      setIsModalOpen(false);
      setEditingStaff(null);
    } catch (err) {
      console.error('Error saving staff:', err);
      setError((err as Error).message || 'Failed to save staff record.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete staff record "${name}"?`)) {
      try {
        await removeStaff(id);
      } catch (err) {
        console.error('Failed to remove staff:', err);
        alert('Failed to delete staff member.');
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

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Academic Faculty & Staff</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Staff & Faculty Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Manage teachers, coordinators, and principals across all 12 Gurugram campuses. Filter by campus or staff category.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/leadership"
            className="px-3.5 py-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Executive Leadership Panel &rarr;</span>
          </Link>

          <button
            onClick={openNewModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty by name, designation, department..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedTypeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedTypeFilter('branch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedTypeFilter === 'branch'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Branch Staff
            </button>
            <button
              onClick={() => setSelectedTypeFilter('central')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedTypeFilter === 'central'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Central Leadership
            </button>
          </div>

          {/* Branch Filter */}
          <div className="min-w-[180px]">
            <select
              value={selectedBranchFilter}
              onChange={e => setSelectedBranchFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Gurugram Branches ({branches.length})</option>
              <option value="central">Central / Group-Wide</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.sector})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium whitespace-nowrap self-end md:self-center">
          Showing <span className="font-bold text-slate-900">{filteredStaff.length}</span> of {staff.length} staff
        </div>
      </div>

      {/* Directory Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Faculty & Staff Directory Roster
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Firestore Database Synchronized
          </span>
        </div>

        {filteredStaff.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredStaff.map(member => {
              const isCentral = member.staffType === 'central' || (!member.branchId && (member.designation?.toLowerCase().includes('director') || member.designation?.toLowerCase().includes('manager')));
              const assignedBranch = !isCentral ? branches.find(b => b.id === member.branchId) : null;

              return (
                <div
                  key={member.id}
                  className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors ${
                    member.isActive === false ? 'bg-slate-50/60 opacity-75' : 'hover:bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200 flex-shrink-0 shadow-xs"
                      />
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 text-amber-400 font-extrabold text-base flex items-center justify-center flex-shrink-0 border border-slate-800 shadow-xs">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'SIS'}
                      </div>
                    )}

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {member.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px] uppercase">
                          {member.designation}
                        </span>

                        {isCentral ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px] flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-600" />
                            <span>Central Leadership</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold text-[10px] flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-blue-600" />
                            <span>{assignedBranch?.sector || assignedBranch?.name || member.branchName || 'Assigned Branch'}</span>
                          </span>
                        )}

                        {member.isActive === false && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                            Inactive
                          </span>
                        )}
                      </div>

                      {member.qualification && (
                        <p className="text-xs text-slate-500 font-medium">
                          {member.qualification} {member.experience ? `• ${member.experience}` : ''}
                        </p>
                      )}

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {member.shortBio || member.description || 'No staff overview provided.'}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-0.5 flex-wrap">
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="flex items-center gap-1 font-mono font-medium text-slate-700 hover:text-amber-600">
                            <Phone className="w-3 h-3 text-amber-600" />
                            <span>{formatPhone(member.phone)}</span>
                          </a>
                        )}
                        {member.email && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{member.email}</span>
                          </span>
                        )}
                        {member.department && (
                          <span className="text-slate-400 font-medium">
                            Dept: {member.department}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(member)}
                      className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                        member.isActive === false
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                      title={member.isActive === false ? 'Show on Website' : 'Hide from Website'}
                    >
                      {member.isActive === false ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="hidden sm:inline">Show</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                          <span className="hidden sm:inline">Hide</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => openEditModal(member)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors"
                      title="Delete Staff Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs space-y-3">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p>No faculty members match your filter criteria.</p>
            <button
              onClick={openNewModal}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Faculty Member</span>
            </button>
          </div>
        )}
      </div>

      {/* Staff Add / Edit Modal */}
      {isModalOpen && editingStaff && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {editingStaff.id ? `Edit ${editingStaff.name}` : 'Add Faculty Member'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Siddhartha International Group of Schools Staff Roster
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {error}
                </div>
              )}

              {/* Staff Type Selector: Central Leadership vs Branch Staff */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                <label className="block font-bold text-amber-950 text-xs">
                  Staff Role & Placement Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingStaff(prev => ({ ...prev, staffType: 'branch' }))}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      editingStaff.staffType !== 'central'
                        ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span>Branch Faculty</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Assigned to a specific campus (Sector 14, Sector 95, etc.)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingStaff(prev => ({ ...prev, staffType: 'central', branchId: null }))}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      editingStaff.staffType === 'central'
                        ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Central Leadership</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Appears on homepage & group-wide leadership page
                    </span>
                  </button>
                </div>
              </div>

              {/* Branch Selector (if branch staff) */}
              {editingStaff.staffType !== 'central' ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Assign to Gurugram Branch Campus <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={editingStaff.branchId || ''}
                    onChange={e => {
                      const sel = branches.find(b => b.id === e.target.value);
                      setEditingStaff(prev => ({
                        ...prev,
                        branchId: e.target.value,
                        branchName: sel?.name || '',
                      }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="" disabled>-- Select Campus --</option>
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.sector})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-[11px] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>This leader represents the entire Siddhartha International Group of Schools across all 12 Gurugram campuses.</span>
                </div>
              )}

              {/* Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStaff.name || ''}
                    onChange={e => setEditingStaff(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Dr. Meenakshi Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Designation / Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStaff.designation || ''}
                    onChange={e => setEditingStaff(prev => ({ ...prev, designation: e.target.value }))}
                    placeholder="e.g. Principal or Academic Coordinator"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <ImageUpload
                label="Staff Portrait Photo"
                helperText="Upload official profile photo or enter direct Cloudinary image link."
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

              {/* Qualification & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={editingStaff.qualification || ''}
                    onChange={e => setEditingStaff(prev => ({ ...prev, qualification: e.target.value }))}
                    placeholder="e.g. M.Sc., M.Ed., Ph.D."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingStaff.experience || ''}
                    onChange={e => setEditingStaff(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g. 15+ Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Phone & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={editingStaff.phone || ''}
                    onChange={e => setEditingStaff(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. 8368268149"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Subject</label>
                  <input
                    type="text"
                    value={editingStaff.department || ''}
                    onChange={e => setEditingStaff(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="e.g. Secondary Science / English"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Short Bio / Overview */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Bio / Pedagogical Vision</label>
                <textarea
                  rows={3}
                  value={editingStaff.shortBio || editingStaff.description || ''}
                  onChange={e => setEditingStaff(prev => ({
                    ...prev,
                    shortBio: e.target.value,
                    description: e.target.value,
                  }))}
                  placeholder="Summary of experience, pedagogical philosophy, and branch role..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden leading-relaxed"
                />
              </div>

              {/* Status & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 items-center">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={editingStaff.displayOrder || 1}
                    onChange={e => setEditingStaff(prev => ({ ...prev, displayOrder: parseInt(e.target.value, 10) || 1 }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-0">
                  <span className="font-bold text-slate-700 text-xs">Public Visibility:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingStaff.isActive !== false}
                      onChange={e => setEditingStaff(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {saving ? 'Saving...' : (editingStaff.id ? 'Update Member' : 'Save Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
