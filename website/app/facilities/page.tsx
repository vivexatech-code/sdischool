import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { 
  Building2, 
  FlaskConical, 
  Cpu, 
  Monitor, 
  Trophy, 
  BookOpen, 
  Bus, 
  ShieldCheck, 
  HeartPulse, 
  Palette,
  Music,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Campus Infrastructure & Facilities | Siddhartha International Schools',
  description: 'Smart classrooms, science & robotics laboratories, sports complexes, libraries, and GPS-enabled transport across our 12 Gurugram campuses.',
};

export default function FacilitiesPage() {
  const facilitiesList = [
    {
      title: 'Smart Digital Classrooms',
      desc: 'Interactive touch panels, multimedia content projectors, and high-speed campus Wi-Fi enabling immersive visual pedagogy.',
      icon: Monitor,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      title: 'Advanced Science Laboratories',
      desc: 'Dedicated Physics, Chemistry, and Biology laboratories equipped with modern apparatus adhering to CBSE/HBSE practical norms.',
      icon: FlaskConical,
      color: 'text-sky-500 bg-sky-50',
    },
    {
      title: 'Computer & AI Labs',
      desc: 'Modern desktop terminals, high-speed fiber internet, and specialized software modules for Python programming, Web Development, and AI.',
      icon: Cpu,
      color: 'text-indigo-500 bg-indigo-50',
    },
    {
      title: 'Sports Grounds & Fitness Arena',
      desc: 'Cricket training nets, basketball courts, badminton courts, football turf, martial arts dojo, and athletics tracks.',
      icon: Trophy,
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      title: 'Resourceful Central Library',
      desc: 'Curated collection of over 10,000+ volumes, academic encyclopedias, competitive exam materials, journals, and a quiet reading area.',
      icon: BookOpen,
      color: 'text-rose-500 bg-rose-50',
    },
    {
      title: 'GPS-Secured School Bus Fleet',
      desc: 'Fleet covering all major Gurugram sectors with real-time GPS tracking, speed governors, first aid kits, and verified female attendants.',
      icon: Bus,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: '24x7 CCTV & Safe Campus',
      desc: 'Comprehensive surveillance across entrances, hallways, playgrounds, and perimeter gates with trained security personnel.',
      icon: ShieldCheck,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      title: 'Medical Infirmary & First Aid',
      desc: 'On-campus healthcare room with certified nursing support, emergency medical equipment, and tie-ups with nearby multi-specialty hospitals.',
      icon: HeartPulse,
      color: 'text-red-500 bg-red-50',
    },
    {
      title: 'Performing Arts & Music Studios',
      desc: 'Acoustically treated creative studios for classical & western instruments, vocal training, dance rehearsals, and theatre.',
      icon: Music,
      color: 'text-purple-500 bg-purple-50',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHeader
        title="Campus Facilities & Infrastructure"
        subtitle="Designed to provide a safe, intellectually stimulating, and physically invigorating environment across every one of our 12 Gurugram campuses."
        tag="World-Class Amenities"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Facilities' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitiesList.map((fac, idx) => {
            const IconComponent = fac.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${fac.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">{fac.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transport Safety Section */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Transport Network</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Gurugram-Wide School Bus Connectivity</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Safe, punctual, and reliable student transport connecting residential neighborhoods across Old Gurugram, New Gurugram, DLF, and Sohna Road corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
              <span className="font-bold text-amber-400 block">GPS Vehicle Tracking</span>
              <p className="text-slate-300">Real-time updates and emergency speed monitoring on all fleet buses.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
              <span className="font-bold text-sky-400 block">Verified Attendants</span>
              <p className="text-slate-300">Background-verified drivers and trained female conductors aboard every route.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
              <span className="font-bold text-emerald-400 block">First-Aid Equipped</span>
              <p className="text-slate-300">Emergency medical kits and fire extinguishers inspected and certified monthly.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
