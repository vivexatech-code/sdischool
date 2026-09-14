import React, { useEffect } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { updateDocumentSeo } from '../../lib/seo';
import { 
  Laptop, 
  FlaskConical, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Bus, 
  HeartPulse, 
  Palette, 
  Music, 
  Sparkles 
} from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  useEffect(() => {
    updateDocumentSeo({
      title: 'School Facilities & Infrastructure | Siddhartha International Group of Schools Gurugram',
      description: 'Modern educational facilities across our 12 Gurugram branches. Smart classrooms, composite science laboratories, computer labs, library, sports complex, GPS buses.',
      canonicalUrl: `${window.location.origin}/facilities`,
    });
  }, []);

  const facilityList = [
    {
      icon: Laptop,
      title: 'Interactive Smart Classrooms',
      desc: 'Equipped with digital touchscreens, high-definition projection, and curated interactive curriculum software that simplifies complex mathematical and scientific ideas.',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: FlaskConical,
      title: 'Composite Science & STEM Labs',
      desc: 'Separate Physics, Chemistry, and Biology workspaces allowing students to conduct experiments safely under certified faculty supervision.',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: BookOpen,
      title: 'Library & Reading Sanctuary',
      desc: 'Thousands of volumes including fiction, reference encyclopedias, national journals, and dedicated quiet study sections.',
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: Compass,
      title: 'Sports Complex & Athletic Grounds',
      desc: 'Cricket nets, badminton courts, basketball zones, football pitches, gymnastics mats, and karate training under professional coaches.',
      img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: Bus,
      title: 'Safe Fleet of Buses with Real-Time GPS',
      desc: 'Covering key residential areas in Gurugram. Every vehicle is fitted with speed governors, CCTV cameras, and female bus marshals.',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: HeartPulse,
      title: 'Medical Infirmary with Trained Nurse',
      desc: 'Dedicated on-campus medical room equipped for immediate first aid, vital signs tracking, emergency care, and annual health checkups.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: Palette,
      title: 'Art, Craft & Creative Studio',
      desc: 'Dedicated studio space for painting, pottery, sculpture, calligraphy, and hands-on creative crafts encouraging aesthetic expression.',
      img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: Music,
      title: 'Music & Performing Arts Wing',
      desc: 'Indian classical and Western instruments including keyboard, guitar, tabla, alongside vocal training and theatrical dramatics.',
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: ShieldCheck,
      title: '24x7 Gated Security & Surveillance',
      desc: 'Controlled visitor entry gates, strict parent pickup authorization cards, and 24x7 security personnel safeguarding every campus perimeter.',
      img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeader
        title="Campus Infrastructure & Facilities"
        subtitle="Designed to support scholastic depth, physical wellness, and creative exploration across all 12 Gurugram branches."
        badge="World-Class Environment"
        breadcrumbs={[{ label: 'Facilities' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilityList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 p-2 rounded-xl bg-slate-900/90 text-amber-300 backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 text-[11px] font-semibold text-slate-400">
                  Standard across all 12 Gurugram Campuses
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
