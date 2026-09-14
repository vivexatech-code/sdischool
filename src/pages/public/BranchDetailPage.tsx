import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import { PageHeader } from '../../components/common/PageHeader';
import { EnquiryModal } from '../../components/common/EnquiryModal';
import { updateDocumentSeo, getBranchStructuredData } from '../../lib/seo';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import { formatPhone, formatDate, isNoticeActive } from '../../lib/utils';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  GraduationCap, 
  Award, 
  Check, 
  Calendar, 
  User, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const BranchDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { branches, staff, events, notices, gallery } = useSite();

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const branch = branches.find(b => b.slug === slug);

  useEffect(() => {
    if (branch) {
      updateDocumentSeo({
        title: branch.seoTitle || `${branch.name} | CBSE & HBSE School in Gurugram`,
        description: branch.seoDescription || `Admissions open at ${branch.name}, ${branch.sector}, Gurugram. Play School to Class 12, English medium, modern science labs, and sports.`,
        canonicalUrl: `${window.location.origin}/branches/${branch.slug}`,
        ogImage: branch.imageUrl,
        schema: getBranchStructuredData(branch),
      });
    }
  }, [branch]);

  if (!branch) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md space-y-4">
          <Building2 className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Branch Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested branch URL may have been updated or moved.
          </p>
          <Link
            to="/branches"
            className="inline-block px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
          >
            Explore All 12 Branches
          </Link>
        </div>
      </div>
    );
  }

  // Branch-specific staff
  const branchStaff = staff.filter(s => s.branchId === branch.id && s.isActive);
  
  // Branch-specific events or all-school events
  const branchEvents = events.filter(e => e.branchId === branch.id || e.branchId === 'all');

  // Branch-specific notices or all-school notices with active date verification
  const branchNotices = notices.filter(n => (n.branchId === branch.id || n.branchId === 'all') && isNoticeActive(n));

  // Branch gallery items
  const branchGallery = gallery.filter(g => g.branchId === branch.id);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Dynamic SEO Breadcrumbs & Header */}
      <PageHeader
        title={branch.name}
        subtitle={`${branch.sector}, Gurugram • ${branch.board} • ${branch.classes} • English Medium`}
        badge={`Gurugram Campus: ${branch.sector}`}
        breadcrumbs={[
          { label: 'Our Branches', href: '/branches' },
          { label: branch.sector }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Top Hero & Key Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Branch Image Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 h-80 sm:h-96">
              <img
                src={getOptimizedImageUrl(branch.imageUrl, { width: 1000, height: 600, crop: 'fill' })}
                alt={`${branch.name} Campus View`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-950/80 text-amber-300 border border-slate-700 backdrop-blur-sm">
                  {branch.board}
                </span>
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-white/90 text-slate-900 backdrop-blur-sm">
                  {branch.classes}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Info Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Official Campus Details
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{branch.name}</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Campus Address</span>
                  <span>{branch.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Campus Helpline</span>
                  <a href={`tel:${branch.phone}`} className="font-bold text-slate-900 hover:text-amber-600">
                    {formatPhone(branch.phone)}
                  </a>
                  <span className="text-[11px] text-slate-400 block">Direct Admissions Desk</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Official Branch Email</span>
                  <a href={`mailto:${branch.email}`} className="text-amber-700 hover:underline">
                    {branch.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Curriculum & Medium</span>
                  <span>{branch.board} • {branch.medium}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply for Admission at this Branch</span>
              </button>

              <a
                href={`tel:${branch.phone}`}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Campus: {formatPhone(branch.phone)}</span>
              </a>
            </div>
          </div>
        </div>

        {/* About This Branch */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <h3 className="text-xl font-bold text-slate-900">About {branch.name}</h3>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {branch.description}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-600 font-medium">
            <span className="px-3 py-1 rounded bg-slate-100">Play School to Class 12</span>
            <span className="px-3 py-1 rounded bg-slate-100">{branch.board} Board</span>
            <span className="px-3 py-1 rounded bg-slate-100">English Medium</span>
            <span className="px-3 py-1 rounded bg-slate-100">Gurugram, Haryana</span>
          </div>
        </div>

        {/* Facilities at this Branch */}
        {branch.facilities && branch.facilities.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Facilities Available at this Branch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {branch.facilities.map((fac, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Principal & Staff Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Principal & Academic Faculty</h3>
              <p className="text-xs text-slate-500 mt-0.5">Faculty members assigned to {branch.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Principal Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                    Branch Leadership
                  </span>
                  <h4 className="font-bold text-slate-900 text-base mt-1">
                    {branch.principalName || 'Branch Principal'}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{branch.principalQualification || 'M.Sc., M.Ed.'}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Overseeing day-to-day scholastic excellence, discipline, and parent consultations at the {branch.sector} campus.
              </p>
              {branch.principalPhone && (
                <div className="pt-2 border-t border-slate-100 text-xs">
                  <a href={`tel:${branch.principalPhone}`} className="text-amber-700 font-bold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call: {formatPhone(branch.principalPhone)}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Additional Staff if any in Firestore */}
            {branchStaff.map(st => (
              <div key={st.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={getOptimizedImageUrl(st.photoUrl, { width: 120, height: 120, crop: 'thumb' })}
                    alt={st.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                      {st.designation}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1">{st.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{st.qualification}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{st.shortBio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Notices if any */}
        {branchNotices.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Branch Circulars & Announcements</h3>
            <div className="space-y-4">
              {branchNotices.map(notice => (
                <div key={notice.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                      {notice.priority}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{notice.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{notice.description}</p>
                  </div>
                  {notice.buttonText && (
                    <Link
                      to={notice.buttonUrl || '/admissions'}
                      className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex-shrink-0"
                    >
                      {notice.buttonText}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location & Map Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Campus Location & Directions</h3>
              <p className="text-xs text-slate-500 mt-1">{branch.address}</p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + ' ' + branch.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold self-start"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-64 flex items-center justify-center relative">
            <iframe
              title={`Google Map - ${branch.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.address || branch.name + ' Gurugram')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-xl font-bold">Ready to enroll at {branch.name}?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Admissions open for Play School through Class 12. Submit your enquiry online or call us directly.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-400"
            >
              Enquire for this Branch
            </button>
            <a
              href={`tel:${branch.phone}`}
              className="px-5 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs sm:text-sm hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Campus</span>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultBranchId={branch.id}
        defaultBoard={branch.board}
      />
    </div>
  );
};
