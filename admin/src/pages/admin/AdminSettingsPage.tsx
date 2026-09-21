import React, { useState } from 'react';
import { useSite } from '../../contexts/SiteContext';
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, Globe } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, saveSettings } = useSite();

  const [formState, setFormState] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await saveSettings(formState);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Institutional Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global school identity, executive contact helplines, and SEO defaults.
          </p>
        </div>

        {saved && (
          <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 self-start">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Updated</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core School Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>Core School Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">School Name *</label>
              <input
                type="text"
                required
                value={formState.schoolName}
                onChange={(e) => setFormState({ ...formState, schoolName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Headquarter Location</label>
              <input
                type="text"
                value={formState.headquartersCity}
                onChange={(e) => setFormState({ ...formState, headquartersCity: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Branches</label>
              <input
                type="number"
                value={formState.totalBranches}
                onChange={(e) => setFormState({ ...formState, totalBranches: parseInt(e.target.value) || 12 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Central Admissions Email</label>
              <input
                type="email"
                value={formState.primaryEmail}
                onChange={(e) => setFormState({ ...formState, primaryEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Leadership Contact Phone Numbers */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Executive Leadership Contacts</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 space-y-3">
              <span className="font-bold text-amber-900 block">Director Office</span>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Director Name</label>
                <input
                  type="text"
                  value={formState.directorName}
                  onChange={(e) => setFormState({ ...formState, directorName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Director Mobile Number</label>
                <input
                  type="text"
                  value={formState.directorPhone}
                  onChange={(e) => setFormState({ ...formState, directorPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 space-y-3">
              <span className="font-bold text-sky-900 block">School Manager Office</span>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Manager Name</label>
                <input
                  type="text"
                  value={formState.managerName}
                  onChange={(e) => setFormState({ ...formState, managerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Manager Mobile Number</label>
                <input
                  type="text"
                  value={formState.managerPhone}
                  onChange={(e) => setFormState({ ...formState, managerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global SEO Defaults */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            SEO & Metadata Defaults
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Meta Description</label>
              <textarea
                rows={3}
                value={formState.metaDescription}
                onChange={(e) => setFormState({ ...formState, metaDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media & Image Storage Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-600" />
              <span>Media & Image CDN Delivery (Optional)</span>
            </h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
              Active (In-browser Compression)
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            All images uploaded across the portal are automatically compressed client-side to lightweight, high-performance WebP formats with zero external dependencies. If your school has an existing Cloudinary account, you can optionally configure your Cloud Name and unsigned Upload Preset below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cloudinary Cloud Name</label>
              <input
                type="text"
                placeholder="e.g., your-cloud-name"
                value={formState.cloudinaryCloudName || ''}
                onChange={(e) => setFormState({ ...formState, cloudinaryCloudName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Unsigned Upload Preset</label>
              <input
                type="text"
                placeholder="e.g., ml_default or school_preset"
                value={formState.cloudinaryUploadPreset || ''}
                onChange={(e) => setFormState({ ...formState, cloudinaryUploadPreset: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
