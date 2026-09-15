import { Branch } from '../types';

export interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, unknown>;
}

export function updateDocumentSeo({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
  ogType = 'website',
  schema,
}: SeoProps) {
  // Update Title
  document.title = title;

  // Helper for meta tags
  const setMeta = (name: string, content: string, isProperty: boolean = false) => {
    const attr = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Standard SEO
  setMeta('description', description);
  
  // Open Graph
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:image', ogImage, true);
  setMeta('og:type', ogType, true);
  if (canonicalUrl) {
    setMeta('og:url', canonicalUrl, true);
    
    // Canonical link tag
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }

  // Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', ogImage);

  // Schema.org Structured Data injection
  const existingScript = document.getElementById('schema-structured-data');
  if (existingScript) {
    existingScript.remove();
  }

  if (schema) {
    const script = document.createElement('script');
    script.id = 'schema-structured-data';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

/**
 * Returns Schema.org JSON-LD for the EducationalOrganization
 */
export function getSchoolGroupStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Siddhartha International Group of Schools',
    alternateName: 'Siddhartha International Schools Gurugram',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://siddharthaschools.edu.in',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop',
    description: 'Premier educational group operating 12 branches across Gurugram, Haryana offering CBSE and HBSE curriculum from Play School to Class 12.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'India',
    },
    founder: [
      {
        '@type': 'Person',
        name: 'Sandeep Kumar',
        jobTitle: 'Director',
        telephone: '+91-8368268149',
      },
      {
        '@type': 'Person',
        name: 'Kalpna Kumari',
        jobTitle: 'Manager',
        telephone: '+91-9355135904',
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8368268149',
        contactType: 'Director Office',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9355135904',
        contactType: 'School Manager',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      }
    ],
    numberOfEmployees: '250+',
    educationalCredentialAwarded: ['CBSE Secondary & Senior Secondary Certificate', 'HBSE Board Certificate'],
  };
}

/**
 * Returns Schema.org JSON-LD for an individual Branch
 */
export function getBranchStructuredData(branch: Branch) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://siddharthaschools.edu.in';
  return {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: branch.name,
    url: `${origin}/branches/${branch.slug}`,
    image: branch.imageUrl,
    telephone: branch.phone ? `+91-${branch.phone}` : '+91-8368268149',
    email: branch.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'India',
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Siddhartha International Group of Schools',
      url: origin,
    },
    ...(branch.latitude && branch.longitude ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: branch.latitude,
        longitude: branch.longitude,
      }
    } : {})
  };
}

/**
 * Returns Schema.org JSON-LD for an individual School Event
 */
export function getEventStructuredData(event: {
  title: string;
  description: string;
  date: string;
  venue?: string;
  imageUrl?: string;
  slug: string;
}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://siddharthaschools.edu.in';
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue || 'Siddhartha International School Campus, Gurugram',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'India',
      },
    },
    image: event.imageUrl,
    organizer: {
      '@type': 'Organization',
      name: 'Siddhartha International Group of Schools',
      url: origin,
    },
  };
}

/**
 * Returns BreadcrumbList structured data
 */
export function getBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

