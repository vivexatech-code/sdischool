import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  orderBy, 
  where,
  limit 
} from 'firebase/firestore';
import { db } from './firebase';
import { Branch, SchoolEvent, Notice, GalleryItem, Staff, AdmissionEnquiry, SiteSettings } from '@/types';
import { INITIAL_BRANCHES, INITIAL_EVENTS, INITIAL_NOTICES, INITIAL_STAFF } from './seedData';

// Fallback site settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  schoolName: 'Siddhartha International Group of Schools',
  tagline: 'Empowering Young Minds for a Brighter Future',
  directorName: 'Sandeep Kumar',
  directorPhone: '8368268149',
  managerName: 'Kalpna Kumari',
  managerPhone: '9355135904',
  primaryEmail: 'info@siddharthaschools.edu.in',
  headOfficeAddress: 'Sector 14, Gurugram, Haryana 122001, India',
  headquartersCity: 'Gurugram, Haryana',
  totalBranches: 12,
  cloudinaryCloudName: 'siddhartha-schools',
  cloudinaryUploadPreset: 'school_uploads',
  metaDescription: '12 Premier Branches across Gurugram, Haryana. Play School to Class 12 offering CBSE and HBSE curriculum in English Medium.',
};

/**
 * Fetch all branches from Firestore with fallback to initial 12 Gurugram campuses
 */
export async function getBranches(): Promise<Branch[]> {
  try {
    const colRef = collection(db, 'branches');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Branch));
    }
  } catch (error) {
    console.warn('Firestore getBranches fallback to INITIAL_BRANCHES:', error);
  }
  return INITIAL_BRANCHES;
}

/**
 * Fetch a single branch by slug
 */
export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  const branches = await getBranches();
  return branches.find(b => b.slug === slug || b.id === slug) || null;
}

/**
 * Fetch events from Firestore with fallback
 */
export async function getEvents(): Promise<SchoolEvent[]> {
  try {
    const colRef = collection(db, 'events');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as SchoolEvent));
    }
  } catch (error) {
    console.warn('Firestore getEvents fallback to INITIAL_EVENTS:', error);
  }
  return INITIAL_EVENTS;
}

/**
 * Fetch single event by slug
 */
export async function getEventBySlug(slug: string): Promise<SchoolEvent | null> {
  const events = await getEvents();
  return events.find(e => e.slug === slug || e.id === slug) || null;
}

/**
 * Fetch notices and circulars
 */
export async function getNotices(): Promise<Notice[]> {
  try {
    const colRef = collection(db, 'notices');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Notice));
    }
  } catch (error) {
    console.warn('Firestore getNotices fallback to INITIAL_NOTICES:', error);
  }
  return INITIAL_NOTICES;
}

/**
 * Fetch gallery items
 */
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const colRef = collection(db, 'gallery');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem));
    }
  } catch (error) {
    console.warn('Firestore getGallery fallback:', error);
  }
  return [];
}

/**
 * Fetch staff directory
 */
export async function getStaff(): Promise<Staff[]> {
  try {
    const colRef = collection(db, 'staff');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Staff));
      const hasCentral = list.some(s => s.staffType === 'central' || s.isLeadership || (!s.branchId && (s.designation?.toLowerCase().includes('director') || s.name?.toLowerCase().includes('sandeep'))));
      if (!hasCentral) {
        const centralDefaults = INITIAL_STAFF.filter(s => s.staffType === 'central');
        return [...centralDefaults, ...list];
      }
      return list;
    }
  } catch (error) {
    console.warn('Firestore getStaff fallback:', error);
  }
  return INITIAL_STAFF;
}

/**
 * Fetch site settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'siteSettings', 'general');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SITE_SETTINGS, ...snap.data() } as SiteSettings;
    }
  } catch (error) {
    console.warn('Firestore getSiteSettings fallback:', error);
  }
  return DEFAULT_SITE_SETTINGS;
}

/**
 * Submit admission or contact enquiry via secure Next.js server API endpoint
 * with fallback to direct Firestore save if API route is unavailable.
 */
export async function submitAdmissionEnquiry(
  data: Omit<AdmissionEnquiry, 'id' | 'createdAt' | 'status'> & {
    formType?: 'admission' | 'quick_enquiry' | 'branch_enquiry' | 'contact' | string;
    subject?: string;
    name?: string;
  }
): Promise<string> {
  // First attempt: call secure Next.js server API route to validate, save to Firestore, and trigger Resend email
  try {
    const response = await fetch('/api/send-form-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: data.formType || 'admission',
        studentName: data.studentName,
        parentName: data.parentName,
        name: data.name || data.studentName || data.parentName,
        mobile: data.mobile,
        email: data.email,
        classGrade: data.classGrade,
        preferredBranchId: data.preferredBranchId,
        preferredBranchName: data.preferredBranchName,
        board: data.board,
        subject: data.subject,
        message: data.message,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        return result.firestoreId || 'success';
      } else {
        throw new Error(result.message || 'Submission failed on server');
      }
    } else {
      const errJson = await response.json().catch(() => null);
      if (errJson?.message) {
        throw new Error(errJson.message);
      }
    }
  } catch (apiErr: any) {
    // If it's a specific validation error from the API, rethrow so user sees it
    if (apiErr?.message && !apiErr.message.includes('fetch') && !apiErr.message.includes('network')) {
      throw apiErr;
    }
    console.warn('API route call failed, falling back to direct Firestore save:', apiErr);
  }

  // Fallback: Direct Firestore save if API route is unreachable
  const colRef = collection(db, 'enquiries');
  const docRef = await addDoc(colRef, {
    ...data,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return docRef.id;
}
