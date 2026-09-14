import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, GraduationCap, ChevronRight, Check } from 'lucide-react';
import { Branch } from '../../types';
import { getOptimizedImageUrl } from '../../lib/cloudinary';
import { formatPhone } from '../../lib/utils';

interface BranchCardProps {
  branch: Branch;
  onEnquire?: (branch: Branch) => void;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch, onEnquire }) => {
  return (
    <div 
      id={`branch-card-${branch.id}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Branch Image with Overlay */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={getOptimizedImageUrl(branch.imageUrl, { width: 600, height: 360, crop: 'fill' })}
            alt={`${branch.name} Campus in Gurugram`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-900/90 text-amber-300 backdrop-blur-sm border border-slate-700">
              {branch.board}
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded bg-white/90 text-slate-900 backdrop-blur-sm">
              {branch.sector}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="text-lg font-bold leading-tight group-hover:text-amber-300 transition-colors drop-shadow-sm">
              {branch.name}
            </h3>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center text-xs text-slate-600 gap-1.5 font-medium">
            <GraduationCap className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{branch.classes} • {branch.medium}</span>
          </div>

          <div className="flex items-start text-xs text-slate-500 gap-1.5 leading-relaxed">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{branch.address}</span>
          </div>

          {/* Key Facilities highlights */}
          {branch.facilities && branch.facilities.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {branch.facilities.slice(0, 3).map((facility, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                  >
                    <Check className="w-3 h-3 text-emerald-600 mr-1" />
                    {facility}
                  </span>
                ))}
                {branch.facilities.length > 3 && (
                  <span className="text-[11px] font-medium text-slate-400 self-center">
                    +{branch.facilities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2">
        <Link
          to={`/branches/${branch.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-950 transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        {onEnquire ? (
          <button
            type="button"
            onClick={() => onEnquire(branch)}
            className="flex-1 inline-flex items-center justify-center text-xs font-bold py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors"
          >
            Enquire Now
          </button>
        ) : (
          <Link
            to={`/admissions?branch=${branch.id}`}
            className="flex-1 inline-flex items-center justify-center text-xs font-bold py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors"
          >
            Enquire Now
          </Link>
        )}
      </div>
    </div>
  );
};
