'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, GraduationCap, ChevronRight, CheckCircle2, Building2 } from 'lucide-react';
import { Branch } from '@/types';
import { formatPhone } from '@/lib/utils';
import { EnquiryModal } from './EnquiryModal';

interface BranchCardProps {
  branch: Branch;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/80 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
        {/* Branch Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={branch.imageUrl || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop'}
            alt={`${branch.name} campus building`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              {branch.board}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold border border-white/20">
              {branch.sector}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-base font-bold leading-tight group-hover:text-amber-300 transition-colors line-clamp-1">
              {branch.name}
            </h3>
            <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>{branch.classesOffered || 'Play School to Class 12'}</span>
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Address */}
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-2 leading-relaxed">{branch.address}</p>
            </div>

            {/* Direct Phone */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <a href={`tel:${branch.phone}`} className="hover:text-amber-700 transition-colors font-mono">
                {formatPhone(branch.phone)}
              </a>
            </div>

            {/* Facilities Tags */}
            <div className="flex flex-wrap gap-1 pt-1">
              {(branch.facilities || []).slice(0, 3).map((f, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-medium"
                >
                  {f}
                </span>
              ))}
              {(branch.facilities || []).length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-[10px] text-amber-800 font-bold">
                  +{(branch.facilities || []).length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              href={`/branches/${branch.slug}`}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:border-amber-400 text-slate-800 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1 group/btn"
            >
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs text-center shadow-xs transition-colors"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          preselectedBranchId={branch.id}
        />
      )}
    </>
  );
};
