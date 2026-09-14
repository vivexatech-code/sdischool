import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { useSite } from '../../contexts/SiteContext';
import { FileCode, Globe, Building2, Calendar, FileText } from 'lucide-react';

export const SitemapPage: React.FC = () => {
  const { branches, events, notices } = useSite();
  const origin = window.location.origin;

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="XML & HTML Sitemap"
        subtitle="Complete directory of crawlable URLs and dynamic routes across the Siddhartha International website."
        breadcrumbs={[{ label: 'Sitemap' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Core Pages */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Globe className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-lg">Main Institutional Pages</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {[
              { path: '/', label: 'Home Page' },
              { path: '/about', label: 'About Us' },
              { path: '/leadership', label: 'Executive Leadership' },
              { path: '/academics', label: 'Academics Overview' },
              { path: '/cbse', label: 'CBSE Curriculum' },
              { path: '/hbse', label: 'HBSE Curriculum' },
              { path: '/facilities', label: 'Campus Facilities' },
              { path: '/branches', label: 'Our 12 Branches' },
              { path: '/events', label: 'Events Calendar' },
              { path: '/gallery', label: 'Photo Gallery' },
              { path: '/notices', label: 'Notices & Circulars' },
              { path: '/admissions', label: 'Admissions 2027-28' },
              { path: '/contact', label: 'Contact Us' },
              { path: '/privacy-policy', label: 'Privacy Policy' },
              { path: '/terms-conditions', label: 'Terms & Conditions' },
            ].map(p => (
              <Link
                key={p.path}
                to={p.path}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-slate-700 font-semibold border border-slate-100 block transition-colors"
              >
                {p.label} <span className="text-[10px] text-slate-400 block font-mono">{p.path}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 12 Branches Dynamic URLs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Building2 className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-lg">12 Gurugram Branch URLs (SEO Slugs)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {branches.map(b => (
              <Link
                key={b.id}
                to={`/branches/${b.slug}`}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-slate-700 font-semibold border border-slate-100 block transition-colors"
              >
                {b.name}
                <span className="text-[10px] text-slate-400 block font-mono">/branches/{b.slug}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Events URLs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Calendar className="w-5 h-5" />
            <h3 className="font-bold text-slate-900 text-lg">Event Deep Link URLs</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {events.map(e => (
              <Link
                key={e.id}
                to={`/events/${e.slug}`}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-slate-700 font-semibold border border-slate-100 block transition-colors"
              >
                {e.title}
                <span className="text-[10px] text-slate-400 block font-mono">/events/{e.slug}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Raw XML View */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white font-mono text-xs overflow-x-auto space-y-2">
          <span className="text-amber-400 font-bold block">// XML Sitemap Preview (schema: standard sitemaps.org/schemas/sitemap/0.9)</span>
          <pre className="text-slate-300">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${origin}/branches</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${origin}/admissions</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${branches.map(b => `  <url>
    <loc>${origin}/branches/${b.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`}
          </pre>
        </div>
      </div>
    </div>
  );
};
