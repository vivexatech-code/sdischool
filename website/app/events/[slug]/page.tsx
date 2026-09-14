import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Tag, ChevronRight, Share2, ArrowLeft } from 'lucide-react';
import { getEvents, getEventBySlug } from '@/lib/firestore';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} | Siddhartha International School Events`,
    description: event.description || `Read details regarding ${event.title} organized by Siddhartha International Group of Schools.`,
    openGraph: {
      title: `${event.title} - Siddhartha International Group of Schools`,
      description: event.description,
      images: [
        {
          url: event.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Top Hero Banner */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/events" className="hover:text-amber-400">Events</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold truncate max-w-xs">{event.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider">
              {event.category}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatDate(event.date)}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {event.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Venue: {event.venue}</span>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden h-72 sm:h-96 w-full bg-slate-100">
            <img
              src={event.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop'}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900">Event Overview</h2>
            <p>{event.description}</p>
            {event.fullDescription && (
              <p className="whitespace-pre-line text-slate-600">{event.fullDescription}</p>
            )}
          </div>

          {/* Event Details Footer Bar */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all school events</span>
            </Link>

            <Link
              href="/admissions"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
