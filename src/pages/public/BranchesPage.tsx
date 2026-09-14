import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { BranchCard } from '../../components/common/BranchCard';
import { EnquiryModal } from '../../components/common/EnquiryModal';
import { useSite } from '../../contexts/SiteContext';
import { updateDocumentSeo } from '../../lib/seo';
import { Search, Building2, MapPin, Filter, Sparkles, Phone } from 'lucide-react';
import { formatPhone } from '../../lib/utils';

export const BranchesPage: React.FC = () => {
  const { branches } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [boardFilter, setBoardFilter] = useState<'All' | 'CBSE' | 'HBSE'>('All');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);

  useEffect(() => {
    updateDocumentSeo({
      title: 'Our 12 Branches in Gurugram | Siddhartha International Group of Schools',
      description: 'Discover all 12 branches of Siddhartha International Group of Schools across Gurugram, Haryana. Play School to Class 12, CBSE & HBSE curriculum.',
      canonicalUrl: `${window.location.origin}/branches`,
    });
  }, []);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBoard = 
      boardFilter === 'All' ? true : branch.board.includes(boardFilter);

    return matchesSearch && matchesBoard;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Our 12 Gurugram Branches"
        subtitle="Explore our network of 12 modern campuses located across key Gurugram sectors, offering English Medium education under CBSE and HBSE."
        badge="Multi-Branch School Network"
        breadcrumbs={[{ label: 'Our Branches' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Sector (e.g. Sector 14, 45, Sohna Rd)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Board Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Board:</span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
              {(['All', 'CBSE', 'HBSE'] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setBoardFilter(b)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    boardFilter === b
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b === 'All' ? 'All (12)' : b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing {filteredBranches.length} of {branches.length} Gurugram Branches</span>
          <span className="text-amber-700 font-semibold">Play School to Class 12 in all branches</span>
        </div>

        {/* Branches Grid */}
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBranches.map(branch => (
              <BranchCard 
                key={branch.id} 
                branch={branch} 
                onEnquire={(b) => {
                  setSelectedBranchId(b.id);
                  setIsEnquiryModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Branches Match Your Search</h3>
            <p className="text-xs text-slate-500">Try searching for another sector or resetting the board filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setBoardFilter('All'); }}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Help Banner */}
        <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-amber-950">Need assistance locating your closest branch?</h4>
            <p className="text-xs sm:text-sm text-amber-900 mt-1">
              Speak directly with school leadership. We will guide you to the closest campus and arrange a private school tour.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:8368268149"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-amber-300 text-xs font-bold flex items-center gap-2 hover:bg-slate-800"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Director: 8368268149</span>
            </a>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => {
          setIsEnquiryModalOpen(false);
          setSelectedBranchId(undefined);
        }}
        defaultBranchId={selectedBranchId}
      />
    </div>
  );
};
