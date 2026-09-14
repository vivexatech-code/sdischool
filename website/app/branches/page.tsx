import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { BranchCard } from '@/components/BranchCard';
import { getBranches } from '@/lib/firestore';
import { Building2, Phone, MapPin } from 'lucide-react';
import { formatPhone } from '@/lib/utils';

export const metadata: Metadata = {
  title: '12 School Branches in Gurugram | CBSE & HBSE Campuses',
  description: 'Explore all 12 branches of Siddhartha International Group of Schools across Gurugram, Haryana. Sector 14, Sector 45, Sector 56, Sector 4, and more.',
};

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <div className="space-y-12 pb-20">
      <PageHeader
        title="Our 12 Gurugram Campuses"
        subtitle="Conveniently situated across prime sectors of Gurugram, offering world-class infrastructure, dedicated faculty, and secure transport connectivity."
        tag="Campus Directory"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Campuses' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Info banner */}
        <div className="bg-amber-50 rounded-2xl p-4 sm:p-6 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm block">Centralized Admissions & Multi-Branch Transfer</span>
              <p className="text-slate-600 mt-0.5">Parents transferring within Gurugram enjoy hassle-free inter-branch credit transfer across all 12 campuses.</p>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="tel:8368268149" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-colors">
              Call Director: {formatPhone('8368268149')}
            </a>
          </div>
        </div>

        {/* Campuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((b) => (
            <BranchCard key={b.id} branch={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
