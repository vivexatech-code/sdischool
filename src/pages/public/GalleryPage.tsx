import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { useSite } from '../../contexts/SiteContext';
import { updateDocumentSeo } from '../../lib/seo';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import { ImageIcon, X } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { gallery, branches } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    updateDocumentSeo({
      title: 'Photo Gallery | Campus Life & Celebrations | Siddhartha International',
      description: 'Glimpses of daily school life, science exhibitions, sports tournaments, dance festivals, and annual functions across our 12 Gurugram campuses.',
      canonicalUrl: `${window.location.origin}/gallery`,
    });
  }, []);

  const categories = ['All', 'Events', 'Campus', 'Sports', 'Classrooms', 'Science & Labs'];

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Campus Photo Gallery"
        subtitle="Vibrant moments of academic discovery, stage performances, athletics, and everyday joy across our 12 Gurugram branches."
        badge="Memories & Celebrations"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item.imageUrl)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 h-64 cursor-pointer shadow-xs hover:shadow-md transition-all"
              >
                <img
                  src={getOptimizedImageUrl(item.imageUrl, { width: 600, height: 450, crop: 'fill' })}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold leading-tight mt-1">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Photos in this Category</h3>
            <p className="text-xs text-slate-500">Select another category or view all gallery photos.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
            >
              Show All Photos
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {activePhoto && (
          <div 
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-amber-400 p-2"
                aria-label="Close photo preview"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={activePhoto}
                alt="Enlarged view"
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-slate-800"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
