'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { getGallery } from '@/lib/firestore';
import { GalleryItem } from '@/types';
import { Image as ImageIcon, Filter, Sparkles } from 'lucide-react';

const FALLBACK_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Modern Science Laboratory Session',
    category: 'Science & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop',
    uploadedAt: '2026-01-10',
  },
  {
    id: 'g-2',
    title: 'Annual Sports Day Athletics Sprint',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop',
    uploadedAt: '2026-01-12',
  },
  {
    id: 'g-3',
    title: 'Smart Digital Classroom Interactive Learning',
    category: 'Classrooms',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000&auto=format&fit=crop',
    uploadedAt: '2026-01-15',
  },
  {
    id: 'g-4',
    title: 'Sector 14 Main School Building Campus',
    category: 'Campus',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1000&auto=format&fit=crop',
    uploadedAt: '2026-01-18',
  },
  {
    id: 'g-5',
    title: 'Classical Music & Dance Cultural Showcase',
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    uploadedAt: '2026-01-20',
  },
  {
    id: 'g-6',
    title: 'Robotics & STEM Project Display',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    uploadedAt: '2026-01-22',
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getGallery();
      if (data && data.length > 0) {
        setItems(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const categories = ['All', 'Campus', 'Classrooms', 'Science & Labs', 'Sports', 'Events', 'Cultural'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Student Life & Campus Gallery"
        subtitle="Visual moments celebrating academic inquiry, artistic self-expression, athletic tournaments, and joyful camaraderie across our 12 Gurugram campuses."
        tag="Campus Memories"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
