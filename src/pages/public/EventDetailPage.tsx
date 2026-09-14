import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSite } from '../../contexts/SiteContext';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo, getEventStructuredData } from '../../lib/seo';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import { formatDate } from '../../lib/utils';
import { Calendar, MapPin, Clock, ArrowLeft, Building2, Share2 } from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { events, branches } = useSite();

  const event = events.find(e => e.slug === slug);

  useEffect(() => {
    if (event) {
      updateDocumentSeo({
        title: `${event.title} | Siddhartha International Group of Schools`,
        description: event.description,
        canonicalUrl: `${window.location.origin}/events/${event.slug}`,
        ogImage: event.imageUrl,
        schema: getEventStructuredData(event),
      });
    }
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md space-y-4">
          <Calendar className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Event Not Found</h2>
          <p className="text-xs text-slate-500">
            The event you are seeking may have passed or been rescheduled.
          </p>
          <Link
            to="/events"
            className="inline-block px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
          >
            Return to Events Directory
          </Link>
        </div>
      </div>
    );
  }

  const branch = branches.find(b => b.id === event.branchId);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title={event.title}
        subtitle={`${formatDate(event.date)} • ${event.venue}`}
        badge={event.category}
        breadcrumbs={[
          { label: 'Events', href: '/events' },
          { label: event.title }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-6">
          <div className="h-80 sm:h-96 w-full bg-slate-900 overflow-hidden">
            <img
              src={getOptimizedImageUrl(event.imageUrl, { width: 1200, height: 600, crop: 'fill' })}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-900">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>{event.venue}</span>
              </div>
              {branch && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <Link to={`/branches/${branch.slug}`} className="text-amber-700 font-bold hover:underline">
                    {branch.name}
                  </Link>
                </div>
              )}
            </div>

            {/* Event Description */}
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{event.description}</p>
            </div>

            {/* Back Button */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all events</span>
              </Link>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.title,
                      text: event.description,
                      url: window.location.href,
                    }).catch(() => {});
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
