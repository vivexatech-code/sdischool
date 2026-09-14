import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-2xl">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-500">
          The school webpage or circular you are searching for might have moved or is no longer active.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/branches"
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs inline-flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Explore 12 Branches</span>
        </Link>
      </div>
    </div>
  );
};
