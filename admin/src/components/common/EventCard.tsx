import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { SchoolEvent } from '../../types';
import { formatDate } from '../../lib/utils';
import { getOptimizedImageUrl } from '../../lib/cloudinary';

interface EventCardProps {
  event: SchoolEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div 
      id={`event-card-${event.id}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={getOptimizedImageUrl(event.coverImageUrl, { width: 600, height: 360, crop: 'fill' })}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {event.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded bg-slate-900/90 text-amber-300 backdrop-blur-sm">
              {event.category}
            </span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.branchName && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[150px]">{event.branchName}</span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">
          {event.photos?.length || 0} Photos
        </span>
        <Link
          to={`/events/${event.slug}`}
          className="inline-flex items-center text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
        >
          <span>View Event Details</span>
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
};
