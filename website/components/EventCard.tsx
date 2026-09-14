import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { SchoolEvent } from '@/types';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: SchoolEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Event Image & Badge */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2 px-3 text-slate-900 border border-slate-100 shadow-md flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold font-mono">{formatDate(event.date)}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 truncate mr-2">
            <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          <Link
            href={`/events/${event.slug}`}
            className="flex-shrink-0 inline-flex items-center gap-1 text-amber-700 font-bold hover:underline"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
