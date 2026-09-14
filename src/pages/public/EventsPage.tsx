import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { EventCard } from '../../components/common/EventCard';
import { useSite } from '../../contexts/SiteContext';
import { updateDocumentSeo } from '../../lib/seo';
import { Calendar, Filter, Sparkles } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events, branches } = useSite();
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  useEffect(() => {
    updateDocumentSeo({
      title: 'School Events & Celebrations | Siddhartha International Group of Schools Gurugram',
      description: 'Explore upcoming and past school events, annual day, sports meets, science exhibitions, and cultural functions across our 12 Gurugram campuses.',
      canonicalUrl: `${window.location.origin}/events`,
    });
  }, []);

  const filteredEvents = selectedBranch === 'all'
    ? events
    : events.filter(e => e.branchId === selectedBranch || e.branchId === 'all');

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="School Events & Celebrations"
        subtitle="Annual functions, athletic tournaments, science fairs, and festive celebrations across our 12 Gurugram branches."
        badge="Co-Curricular Life"
        breadcrumbs={[{ label: 'Events' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Branch Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Filter by Gurugram Campus:
            </span>
          </div>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
          >
            <option value="all">All Campuses (Group-wide)</option>
            {branches.map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.sector})</option>
            ))}
          </select>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Events Scheduled for this Campus</h3>
            <p className="text-xs text-slate-500">Check back soon for upcoming calendar notices.</p>
            <button
              onClick={() => setSelectedBranch('all')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
            >
              View All Campuses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
