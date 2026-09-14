import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { Branch } from '../../types';
import { slugify, formatPhone } from '../../lib/utils';
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  ExternalLink, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBranchesPage: React.FC = () => {
  const { branches, saveBranch, removeBranch } = useSite();

  const [editingBranch, setEditingBranch] = useState<Partial<Branch> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [facilitiesInput, setFacilitiesInput] = useState('');

  const openNewBranchModal = () => {
    setEditingBranch({
      name: '',
      slug: '',
      sector: '',
      address: '',
      phone: '8368268149',
      email: 'info@siddharthaschools.edu.in',
      classes: 'Play School to Class 12',
      board: 'CBSE & HBSE',
      medium: 'English',
      description: '',
      principalName: '',
      principalQualification: 'M.Sc., M.Ed.',
      principalPhone: '8368268149',
      facilities: ['Smart Classrooms', 'Composite Science Lab', 'Sports Ground', 'GPS Bus Fleet'],
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
      seoTitle: '',
      seoDescription: '',
    });
    setFacilitiesInput('Smart Classrooms, Composite Science Lab, Sports Ground, GPS Bus Fleet');
    setIsModalOpen(true);
  };

  const openEditBranchModal = (b: Branch) => {
    setEditingBranch(b);
    setFacilitiesInput(b.facilities ? b.facilities.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch || !editingBranch.name || !editingBranch.sector) return;

    try {
      setSaving(true);
      const generatedSlug = editingBranch.slug || slugify(`${editingBranch.name} ${editingBranch.sector}`);
      const facilitiesArray = facilitiesInput
        .split(',')
        .map(f => f.trim())
        .filter(Boolean);

      await saveBranch({
        ...editingBranch,
        slug: generatedSlug,
        facilities: facilitiesArray,
      } as Branch);

      setIsModalOpen(false);
      setEditingBranch(null);
    } catch (err) {
      console.error('Error saving branch:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete branch "${name}"?`)) {
      await removeBranch(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Branch Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage all 12 Gurugram campuses, principal details, facilities, and SEO settings.
          </p>
        </div>

        <button
          onClick={openNewBranchModal}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Campus</span>
        </button>
      </div>

      {/* Branches List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Total Configured Branches ({branches.length})
          </span>
          <span className="text-xs text-slate-500">Play School to Class 12</span>
        </div>

        <div className="divide-y divide-slate-100">
          {branches.map(branch => (
            <div
              key={branch.id}
              className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={branch.imageUrl}
                  alt={branch.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base">{branch.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">
                      {branch.sector}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] uppercase">
                      {branch.board}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1">{branch.address}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 flex-wrap">
                    <span>Principal: <strong className="text-slate-800">{branch.principalName || 'Assigned Principal'}</strong></span>
                    <span>•</span>
                    <span>Helpline: <strong className="text-slate-800">{formatPhone(branch.phone)}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                <Link
                  to={`/branches/${branch.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                  title="View live branch page"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Preview</span>
                </Link>

                <button
                  onClick={() => openEditBranchModal(branch)}
                  className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(branch.id, branch.name)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold"
                  title="Delete Branch"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingBranch && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {editingBranch.id ? `Edit ${editingBranch.name}` : 'Add New Gurugram Branch'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch Name *</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.name || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                    placeholder="e.g. Siddhartha International School"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sector / Locality *</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.sector || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, sector: e.target.value })}
                    placeholder="e.g. Sector 14"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SEO URL Slug</label>
                  <input
                    type="text"
                    value={editingBranch.slug || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, slug: e.target.value })}
                    placeholder="auto-generated if left empty"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Board Affiliation</label>
                  <select
                    value={editingBranch.board || 'CBSE & HBSE'}
                    onChange={(e) => setEditingBranch({ ...editingBranch, board: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="CBSE & HBSE">CBSE & HBSE</option>
                    <option value="CBSE">CBSE</option>
                    <option value="HBSE">HBSE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Classes Offered</label>
                  <input
                    type="text"
                    value={editingBranch.classes || 'Play School to Class 12'}
                    onChange={(e) => setEditingBranch({ ...editingBranch, classes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Campus Address *</label>
                <input
                  type="text"
                  required
                  value={editingBranch.address || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                  placeholder="Street, Sector, Gurugram, Haryana"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch Phone Helpline *</label>
                  <input
                    type="text"
                    required
                    value={editingBranch.phone || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                    placeholder="e.g. 8368268149"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch Email Address</label>
                  <input
                    type="email"
                    value={editingBranch.email || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, email: e.target.value })}
                    placeholder="branch@siddharthaschools.edu.in"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Name</label>
                  <input
                    type="text"
                    value={editingBranch.principalName || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, principalName: e.target.value })}
                    placeholder="Principal's full name"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Qualification</label>
                  <input
                    type="text"
                    value={editingBranch.principalQualification || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, principalQualification: e.target.value })}
                    placeholder="M.Sc., M.Ed., Ph.D."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Phone</label>
                  <input
                    type="text"
                    value={editingBranch.principalPhone || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, principalPhone: e.target.value })}
                    placeholder="Direct mobile"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus Image URL</label>
                <input
                  type="text"
                  value={editingBranch.imageUrl || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Facilities (comma-separated)</label>
                <input
                  type="text"
                  value={facilitiesInput}
                  onChange={(e) => setFacilitiesInput(e.target.value)}
                  placeholder="Smart Classrooms, Composite Science Lab, Sports Arena, GPS Bus Fleet"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">About this Campus</label>
                <textarea
                  rows={3}
                  value={editingBranch.description || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, description: e.target.value })}
                  placeholder="Overview of this branch's academic environment, achievements..."
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
                  className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-xs transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Campus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
