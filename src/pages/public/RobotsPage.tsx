import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';

export const RobotsPage: React.FC = () => {
  const origin = window.location.origin;

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Robots.txt Directive"
        subtitle="Search Engine Crawler Instructions for Googlebot, Bingbot, and other verified crawlers."
        breadcrumbs={[{ label: 'Robots.txt' }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-8 shadow-xs font-mono text-xs sm:text-sm space-y-4">
          <div className="text-amber-400 font-bold"># robots.txt for Siddhartha International Group of Schools</div>
          <pre className="leading-relaxed">
{`User-agent: *
Allow: /
Allow: /about
Allow: /leadership
Allow: /academics
Allow: /cbse
Allow: /hbse
Allow: /facilities
Allow: /branches
Allow: /branches/*
Allow: /events
Allow: /events/*
Allow: /gallery
Allow: /notices
Allow: /admissions
Allow: /contact

# Disallow admin backoffice from search engine index
Disallow: /admin
Disallow: /admin/*

# Sitemap declaration
Sitemap: ${origin}/sitemap.xml
`}
          </pre>
        </div>
      </div>
    </div>
  );
};
