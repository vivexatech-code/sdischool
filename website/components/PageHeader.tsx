import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  tag?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  tag = 'Siddhartha International Schools',
  breadcrumbs = [{ label: 'Home', href: '/' }],
}) => {
  return (
    <div className="relative bg-slate-950 text-white py-16 sm:py-20 overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {b.href ? (
                <Link href={b.href} className="hover:text-amber-400 transition-colors">
                  {b.label}
                </Link>
              ) : (
                <span className="text-amber-400 font-semibold">{b.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-semibold">{title}</span>
        </nav>

        {/* Tag Pill */}
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            {tag}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
