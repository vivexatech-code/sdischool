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
  AlertCircle,
  GraduationCap,
  Compass,
  FileText,
  Search,
  Globe,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageUpload } from '../../components/admin/ImageUpload';

export const AdminBranchesPage: React.FC = () => {
  const { branches, saveBranch, removeBranch } = useSite();

  const [editingBranch, setEditingBranch] = useState<Partial<Branch> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [facilitiesInput, setFacilitiesInput] = useState('');
  const [urlValidationError, setUrlValidationError] = useState<string | null>(null);

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
      googleMapsUrl: '',
      businessProfileUrl: '',
      principalName: '',
      principalQualification: 'M.Sc., M.Ed.',
      principalPhone: '8368268149',
      branchLeadership: {
        name: '',
        designation: 'Leader',
        description: '',
        phone: '8368268149',
        photoUrl: '',
        cloudinaryPublicId: '',
      },
      facilities: ['Smart Classrooms', 'Composite Science Lab', 'Sports Ground', 'GPS Bus Fleet'],
      imageUrl: '',
      cloudinaryPublicId: '',
      seoTitle: '',
      seoDescription: '',
      seoImage: '',
    });
    setFacilitiesInput('Smart Classrooms, Composite Science Lab, Sports Ground, GPS Bus Fleet');
    setUrlValidationError(null);
    setIsModalOpen(true);
  };

  const openEditBranchModal = (b: Branch) => {
    setEditingBranch({
      ...b,
      businessProfileUrl: b.businessProfileUrl || '',
      googleMapsUrl: b.googleMapsUrl || '',
      cloudinaryPublicId: b.cloudinaryPublicId || '',
      seoTitle: b.seoTitle || '',
      seoDescription: b.seoDescription || '',
      seoImage: b.seoImage || '',
      medium: b.medium || 'English',
      branchLeadership: b.branchLeadership ? {
        name: b.branchLeadership.name || b.principalName || '',
        designation: b.branchLeadership.designation || 'Leader',
        description: b.branchLeadership.description || '',
        phone: b.branchLeadership.phone || b.principalPhone || '8368268149',
        photoUrl: b.branchLeadership.photoUrl || '',
        cloudinaryPublicId: b.branchLeadership.cloudinaryPublicId || '',
      } : {
        name: b.principalName || '',
        designation: 'Leader',
        description: '',
        phone: b.principalPhone || '8368268149',
        photoUrl: '',
        cloudinaryPublicId: '',
      },
    });
    setFacilitiesInput(b.facilities ? b.facilities.join(', ') : '');
    setUrlValidationError(null);
    setIsModalOpen(true);
  };

  const validateUrl = (url?: string): boolean => {
    if (!url || !url.trim()) return true;
    const trimmed = url.trim();
    return (
      trimmed.startsWith('https://') ||
      trimmed.startsWith('http://') ||
      trimmed.startsWith('maps.app.goo.gl') ||
      trimmed.startsWith('g.page')
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch || !editingBranch.name || !editingBranch.sector) return;

    // Validate Business Profile URL format if provided
    if (editingBranch.businessProfileUrl && !validateUrl(editingBranch.businessProfileUrl)) {
      setUrlValidationError('Please enter a valid URL (starting with https:// or http://)');
      return;
    }

    try {
      setSaving(true);
      setUrlValidationError(null);
      const generatedSlug = editingBranch.slug || slugify(`${editingBranch.name} ${editingBranch.sector}`);
      const facilitiesArray = facilitiesInput
        .split(',')
        .map(f => f.trim())
        .filter(Boolean);

      // Ensure full URL formatting if prefix was omitted
      let formattedBusinessUrl = editingBranch.businessProfileUrl?.trim() || '';
      if (formattedBusinessUrl && !/^https?:\/\//i.test(formattedBusinessUrl)) {
        formattedBusinessUrl = `https://${formattedBusinessUrl}`;
      }

      let formattedMapsUrl = editingBranch.googleMapsUrl?.trim() || '';
      if (formattedMapsUrl && !/^https?:\/\//i.test(formattedMapsUrl)) {
        formattedMapsUrl = `https://${formattedMapsUrl}`;
      }

      const leadership = {
        name: editingBranch.branchLeadership?.name || editingBranch.principalName || '',
        designation: (editingBranch.branchLeadership?.designation || 'Leader').trim() || 'Leader',
        description: editingBranch.branchLeadership?.description || '',
        phone: editingBranch.branchLeadership?.phone || editingBranch.principalPhone || '',
        photoUrl: editingBranch.branchLeadership?.photoUrl || '',
        cloudinaryPublicId: editingBranch.branchLeadership?.cloudinaryPublicId || '',
      };

      await saveBranch({
        ...editingBranch,
        slug: generatedSlug,
        businessProfileUrl: formattedBusinessUrl,
        googleMapsUrl: formattedMapsUrl,
        facilities: facilitiesArray,
        branchLeadership: leadership,
        // Backward-compatible fields
        principalName: leadership.name || editingBranch.principalName || '',
        principalPhone: leadership.phone || editingBranch.principalPhone || '',
        principalQualification: editingBranch.principalQualification || leadership.designation || 'M.Sc., M.Ed.',
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
            Manage all Gurugram campuses, direct image uploads, Google Business Profiles, facilities, and SEO.
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
                  src={branch.imageUrl || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop'}
                  alt={branch.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0 bg-slate-100"
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
                    {branch.businessProfileUrl && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px] flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>Google Profile Linked</span>
                      </span>
                    )}
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
                {branch.businessProfileUrl && (
                  <a
                    href={branch.businessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 border border-blue-200"
                    title="View on Google Business Profile"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Google</span>
                  </a>
                )}

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
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingBranch.id ? `Edit ${editingBranch.name}` : 'Add New Gurugram Campus'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete branch identity, direct Cloudinary photo upload, Google links, and curriculum details.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              {/* 1. Basic Information */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Basic Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Branch Name *</label>
                    <input
                      type="text"
                      required
                      value={editingBranch.name || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                      placeholder="e.g. Siddhartha International School"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
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
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Branch Slug (URL)</label>
                    <input
                      type="text"
                      value={editingBranch.slug || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, slug: e.target.value })}
                      placeholder="auto-generated from name"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Helpline Phone *</label>
                    <input
                      type="text"
                      required
                      value={editingBranch.phone || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                      placeholder="e.g. 8368268149"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Branch Email Address</label>
                    <input
                      type="email"
                      value={editingBranch.email || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, email: e.target.value })}
                      placeholder="branch@siddharthaschools.edu.in"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
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
                    placeholder="Sector / Road, Gurugram, Haryana"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* 2. Academic Information */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <GraduationCap className="w-4 h-4 text-amber-600" />
                  <span>Academic Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Board Affiliation</label>
                    <select
                      value={editingBranch.board || 'CBSE & HBSE'}
                      onChange={(e) => setEditingBranch({ ...editingBranch, board: e.target.value as any })}
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
                      placeholder="e.g. Play School to Class 12"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Medium of Instruction</label>
                    <input
                      type="text"
                      value={editingBranch.medium || 'English'}
                      onChange={(e) => setEditingBranch({ ...editingBranch, medium: e.target.value })}
                      placeholder="e.g. English"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Location & Google Business Profile */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Location & Google Profile</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Business Profile Link
                      <span className="font-normal text-slate-500 ml-1">(Google Business Profile / Maps Listing)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={editingBranch.businessProfileUrl || ''}
                        onChange={(e) => {
                          setEditingBranch({ ...editingBranch, businessProfileUrl: e.target.value });
                          if (urlValidationError) setUrlValidationError(null);
                        }}
                        placeholder="https://www.google.com/maps/place/... or https://g.page/..."
                        className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white ${
                          urlValidationError ? 'border-rose-300 ring-rose-200' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      This link enables the &quot;View on Google&quot; button on public campus pages so families can see verified reviews, ratings, and directions.
                    </p>
                    {urlValidationError && (
                      <p className="text-[11px] text-rose-600 font-medium mt-1">{urlValidationError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Google Maps Location URL
                    </label>
                    <input
                      type="url"
                      value={editingBranch.googleMapsUrl || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, googleMapsUrl: e.target.value })}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Branch Image: Direct Image Upload */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Branch Image</span>
                </h3>

                <ImageUpload
                  label="Upload Campus Image"
                  helperText="Drag & drop or click to browse. JPG, PNG, WEBP (up to 10MB)"
                  value={editingBranch.imageUrl || ''}
                  publicId={editingBranch.cloudinaryPublicId || ''}
                  folder="schools/branches"
                  aspectRatio="video"
                  onChange={({ imageUrl, cloudinaryPublicId }) => {
                    setEditingBranch(prev => prev ? ({
                      ...prev,
                      imageUrl,
                      cloudinaryPublicId: cloudinaryPublicId || prev.cloudinaryPublicId
                    }) : null);
                  }}
                />
              </div>

              {/* 5. Description & Facilities */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Campus Facilities & Description</span>
                </h3>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">About this Campus</label>
                  <textarea
                    rows={3}
                    value={editingBranch.description || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, description: e.target.value })}
                    placeholder="Overview of this campus's academic environment, history, and achievements..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus Facilities (comma-separated)</label>
                  <input
                    type="text"
                    value={facilitiesInput}
                    onChange={(e) => setFacilitiesInput(e.target.value)}
                    placeholder="Smart Classrooms, Composite Science Lab, Sports Arena, GPS Bus Fleet"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* 6. Branch Leadership & Profile Photo */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-600" />
                    <span>Branch Leadership</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Leader Profile
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Leadership Title / Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingBranch.branchLeadership?.designation ?? 'Leader'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingBranch(prev => {
                          if (!prev) return null;
                          const currentLeadership = prev.branchLeadership || {
                            name: prev.principalName || '',
                            designation: 'Leader',
                            phone: prev.principalPhone || '8368268149',
                            photoUrl: '',
                            cloudinaryPublicId: '',
                          };
                          return {
                            ...prev,
                            branchLeadership: {
                              ...currentLeadership,
                              designation: val,
                            },
                          };
                        });
                      }}
                      placeholder="e.g. Leader, Principal, Head of School, Branch Director"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Defaults to &ldquo;Leader&rdquo;. Can be Principal, Head of School, Academic Head, Director, etc.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Leader&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      value={editingBranch.branchLeadership?.name ?? editingBranch.principalName ?? ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingBranch(prev => {
                          if (!prev) return null;
                          const currentLeadership = prev.branchLeadership || {
                            name: '',
                            designation: 'Leader',
                            phone: prev.principalPhone || '8368268149',
                            photoUrl: '',
                            cloudinaryPublicId: '',
                          };
                          return {
                            ...prev,
                            principalName: val,
                            branchLeadership: {
                              ...currentLeadership,
                              name: val,
                            },
                          };
                        });
                      }}
                      placeholder="e.g. Mrs. Sunita Sharma"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Leader Direct Contact Phone
                    </label>
                    <input
                      type="text"
                      value={editingBranch.branchLeadership?.phone ?? editingBranch.principalPhone ?? ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingBranch(prev => {
                          if (!prev) return null;
                          const currentLeadership = prev.branchLeadership || {
                            name: prev.principalName || '',
                            designation: 'Leader',
                            phone: '',
                            photoUrl: '',
                            cloudinaryPublicId: '',
                          };
                          return {
                            ...prev,
                            principalPhone: val,
                            branchLeadership: {
                              ...currentLeadership,
                              phone: val,
                            },
                          };
                        });
                      }}
                      placeholder="e.g. 8368268149"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Qualifications / Accreditations
                    </label>
                    <input
                      type="text"
                      value={editingBranch.principalQualification || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, principalQualification: e.target.value })}
                      placeholder="e.g. M.Sc. (Physics), B.Ed., 18+ Yrs Experience"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Leader Biography / Message
                  </label>
                  <textarea
                    rows={2}
                    value={editingBranch.branchLeadership?.description || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingBranch(prev => {
                        if (!prev) return null;
                        const currentLeadership = prev.branchLeadership || {
                          name: prev.principalName || '',
                          designation: 'Leader',
                          phone: prev.principalPhone || '8368268149',
                          photoUrl: '',
                          cloudinaryPublicId: '',
                        };
                        return {
                          ...prev,
                          branchLeadership: {
                            ...currentLeadership,
                            description: val,
                          },
                        };
                      });
                    }}
                    placeholder="Short leadership message, educational philosophy, or background note..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  />
                </div>

                {/* Profile Photo Upload via Cloudinary */}
                <div className="pt-2 border-t border-slate-200">
                  <ImageUpload
                    label="Leader Profile Photo (Cloudinary)"
                    helperText="Upload official portrait of the campus leader. Supports JPG, PNG, WEBP (Square portrait recommended)."
                    value={editingBranch.branchLeadership?.photoUrl || ''}
                    publicId={editingBranch.branchLeadership?.cloudinaryPublicId || ''}
                    folder="schools/leadership"
                    aspectRatio="square"
                    onChange={({ imageUrl, cloudinaryPublicId }) => {
                      setEditingBranch(prev => {
                        if (!prev) return null;
                        const currentLeadership = prev.branchLeadership || {
                          name: prev.principalName || '',
                          designation: 'Leader',
                          phone: prev.principalPhone || '8368268149',
                          photoUrl: '',
                          cloudinaryPublicId: '',
                        };
                        return {
                          ...prev,
                          branchLeadership: {
                            ...currentLeadership,
                            photoUrl: imageUrl,
                            cloudinaryPublicId: cloudinaryPublicId || currentLeadership.cloudinaryPublicId,
                          },
                        };
                      });
                    }}
                  />
                </div>
              </div>

              {/* 6. SEO & Metadata */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Search className="w-4 h-4 text-amber-600" />
                  <span>SEO & Social Share</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">SEO Page Title</label>
                    <input
                      type="text"
                      value={editingBranch.seoTitle || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, seoTitle: e.target.value })}
                      placeholder="e.g. Best CBSE School in Sector 14 Gurugram"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">SEO Description</label>
                    <input
                      type="text"
                      value={editingBranch.seoDescription || ''}
                      onChange={(e) => setEditingBranch({ ...editingBranch, seoDescription: e.target.value })}
                      placeholder="Admissions open for Play School to Class 12..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Form Action Controls */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Campus...</span>
                    </>
                  ) : (
                    <span>Save Campus Changes</span>
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
