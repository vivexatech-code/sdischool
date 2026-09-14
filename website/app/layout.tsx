import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Siddhartha International Group of Schools | 12 Campuses in Gurugram',
    template: '%s | Siddhartha International Group of Schools',
  },
  description:
    'Siddhartha International Group of Schools operates 12 premier campuses across Gurugram, Haryana. Offering CBSE and HBSE curriculum from Play School to Class 12 in English Medium.',
  keywords: [
    'Siddhartha International School',
    'Schools in Gurugram',
    'CBSE Schools Gurugram',
    'HBSE Schools Gurugram',
    'Siddhartha School Sector 14',
    'Siddhartha School Sector 45',
    'Siddhartha School Sector 56',
    'Best School in Gurugram',
    'Play School to 12th Admission',
    'Sandeep Kumar Director',
    'Kalpna Kumari Manager',
  ],
  authors: [{ name: 'Siddhartha International Group of Schools' }],
  openGraph: {
    title: 'Siddhartha International Group of Schools | 12 Campuses in Gurugram',
    description:
      'Premier educational institution with 12 branches across Gurugram, Haryana. CBSE & HBSE affiliated curriculum.',
    url: 'https://siddharthaschools.edu.in',
    siteName: 'Siddhartha International Group of Schools',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Siddhartha International School Gurugram Campus',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
