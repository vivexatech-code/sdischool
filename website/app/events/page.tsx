import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { EventCard } from '@/components/EventCard';
import { getEvents } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'School Events & Activities | Siddhartha International Schools',
  description: 'Stay updated with annual functions, sports meets, academic olympiads, and cultural celebrations across all 12 Siddhartha International School campuses in Gurugram.',
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="School Events & Celebrations"
        subtitle="Explore our vibrant academic exhibitions, inter-school sports tournaments, cultural celebrations, and student assemblies."
        tag="Campus Life"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
}
