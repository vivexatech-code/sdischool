'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, GraduationCap, Phone, ArrowRight, CheckCircle2, Filter, Building2, Sparkles } from 'lucide-react';
import { Branch } from '@/types';
import { formatPhone } from '@/lib/utils';
import { EnquiryModal } from './EnquiryModal';

interface BranchDiscoveryProps {
  branches: Branch[];
}

export const BranchDiscovery: React.FC<BranchDiscoveryProps> = ({ branches }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<'All' | 'CBSE' | 'HBSE' | 'CBSE & HBSE'>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Extract unique sectors
  const sectors = useMemo(() => {
    const list = Array.from(new Set(branches.map(b => b.sector).filter(Boolean)));
    return ['All', ...list.sort()];
  }, [branches]);

  // Filtered branches
  const filteredBranches = useMemo(() => {
    return branches.filter(b => {
      const matchesSearch = 
        !searchTerm.trim() ||
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBoard = 
        selectedBoard === 'All' ||
        b.board === selectedBoard ||
        (b.board === 'CBSE & HBSE');

      const matchesSector = 
        selectedSector === 'All' || 
        b.sector === selectedSector;

      return matchesSearch && matchesBoard && matchesSector;
    });
  }, [branches, searchTerm, selectedBoard, selectedSector]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Decorative background ambient light */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Campus Finder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Find the Right Siddhartha Campus for Your Child
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Filter by your residential sector or preferred board to discover nearby classrooms, labs, and contact our branch office directly.
          </p>
        </div>

        <div className="flex-shrink-0 text-slate-400 text-xs font-semibold">
          Showing <span className="text-amber-400 font-bold">{filteredBranches.length}</span> of {branches.length} campuses
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 backdrop-blur-sm">
        {/* Keyword Search */}
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by sector, locality, or campus name..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Board Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value as any)}
            className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 transition-colors cursor-pointer"
          >
            <option value="All">All Board Affiliations</option>
            <option value="CBSE">CBSE Board</option>
            <option value="HBSE">HBSE Board</option>
            <option value="CBSE & HBSE">Dual (CBSE & HBSE)</option>
          </select>
        </div>

        {/* Sector Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 transition-colors cursor-pointer"
          >
            <option value="All">All Gurugram Sectors</option>
            {sectors.filter(s => s !== 'All').map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="relative z-10">
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className="bg-slate-950 rounded-2xl border border-slate-800/90 hover:border-amber-500/50 p-5 transition-all duration-300 flex flex-col justify-between group hover:bg-slate-950/90"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                      {branch.board}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      {branch.sector}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5 leading-relaxed line-clamp-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{branch.classesOffered || branch.classes || 'Play School to Class 12'}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-900 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${branch.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-mono text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{formatPhone(branch.phone)}</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedBranchId(branch.id);
                        setIsEnquiryOpen(true);
                      }}
                      className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                    >
                      Enquire
                    </button>
                    <Link
                      href={`/branches/${branch.slug}`}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title="View campus details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3 bg-slate-950/50 rounded-2xl border border-slate-800">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-base font-bold text-slate-300">No campuses match your filter criteria</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing your search term or setting the board and sector filters to "All".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBoard('All');
                setSelectedSector('All');
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors inline-flex items-center gap-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        preselectedBranchId={selectedBranchId}
      />
    </div>
  );
};
