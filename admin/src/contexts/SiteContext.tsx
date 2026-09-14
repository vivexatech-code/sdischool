import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Branch, 
  Staff, 
  SchoolEvent, 
  GalleryItem, 
  Notice, 
  AdmissionEnquiry, 
  SiteSettings, 
  SeoSettings 
} from '../types';
import { 
  INITIAL_BRANCHES, 
  INITIAL_NOTICES, 
  INITIAL_EVENTS, 
  INITIAL_STAFF 
} from '../lib/seedData';

interface SiteContextType {
  branches: Branch[];
  staff: Staff[];
  events: SchoolEvent[];
  gallery: GalleryItem[];
  notices: Notice[];
  enquiries: AdmissionEnquiry[];
  siteSettings: SiteSettings;
  settings: SiteSettings; // Alias for backward compatibility
  seoSettings: SeoSettings;
  loading: boolean;
  error: string | null;
  seedInitialData: () => Promise<void>;
  
  // CRUD operations
  addBranch: (branchData: Omit<Branch, 'id'>) => Promise<string>;
  updateBranch: (id: string, branchData: Partial<Branch>) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
  saveBranch: (branchData: Partial<Branch>) => Promise<string | void>;
  removeBranch: (id: string) => Promise<void>;

  addStaff: (staffData: Omit<Staff, 'id'>) => Promise<string>;
  updateStaff: (id: string, staffData: Partial<Staff>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  saveStaff: (staffData: Partial<Staff>) => Promise<string | void>;
  removeStaff: (id: string) => Promise<void>;

  addEvent: (eventData: Omit<SchoolEvent, 'id'>) => Promise<string>;
  updateEvent: (id: string, eventData: Partial<SchoolEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  saveEvent: (eventData: Partial<SchoolEvent>) => Promise<string | void>;
  removeEvent: (id: string) => Promise<void>;

  addGalleryItem: (galleryData: Omit<GalleryItem, 'id'>) => Promise<string>;
  deleteGalleryItem: (id: string) => Promise<void>;
  saveGalleryItem: (galleryData: Partial<GalleryItem>) => Promise<string | void>;
  removeGalleryItem: (id: string) => Promise<void>;

  addNotice: (noticeData: Omit<Notice, 'id'>) => Promise<string>;
  updateNotice: (id: string, noticeData: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  saveNotice: (noticeData: Partial<Notice>) => Promise<string | void>;
  removeNotice: (id: string) => Promise<void>;

  submitEnquiry: (enquiryData: Omit<AdmissionEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateEnquiryStatus: (id: string, status: AdmissionEnquiry['status'], adminNotes?: string) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;

  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  saveSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateSeoSettings: (settings: Partial<SeoSettings>) => Promise<void>;
}

const DEFAULT_SETTINGS: SiteSettings = {
  schoolName: 'Siddhartha International Group of Schools',
  tagline: 'Empowering Young Minds for a Brighter Future',
  directorName: 'Sandeep Kumar',
  directorPhone: '8368268149',
  managerName: 'Kalpna Kumari',
  managerPhone: '9355135904',
  primaryEmail: 'info@siddharthaschools.edu.in',
  headOfficeAddress: 'Sector 14, Gurugram, Haryana 122001, India',
  cloudinaryCloudName: 'siddhartha-schools',
  cloudinaryUploadPreset: 'school_uploads',
};

const DEFAULT_SEO: SeoSettings = {
  siteTitle: 'Siddhartha International Group of Schools | Gurugram (CBSE & HBSE)',
  metaDescription: '12 Premier Branches across Gurugram, Haryana. Play School to Class 12 offering CBSE and HBSE curriculum in English Medium. Director Sandeep Kumar (8368268149), Manager Kalpna Kumari (9355135904).',
  keywords: 'Siddhartha International School, Best school in Gurugram, CBSE school Gurugram, HBSE school Gurugram, 12 branches Gurugram, admission Play School to 12',
  canonicalBaseUrl: 'https://siddharthaschools.edu.in',
  ogImageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop',
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [events, setEvents] = useState<SchoolEvent[]>(INITIAL_EVENTS);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(DEFAULT_SEO);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to Firestore collections
  useEffect(() => {
    let unsubs: (() => void)[] = [];

    async function initListeners() {
      try {
        // Branches
        const unsubBranches = onSnapshot(collection(db, 'branches'), (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Branch));
            setBranches(list);
          } else {
            setBranches(INITIAL_BRANCHES);
          }
        }, (err) => console.warn('Branches listener error:', err));
        unsubs.push(unsubBranches);

        // Staff
        const unsubStaff = onSnapshot(collection(db, 'staff'), (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Staff));
            setStaff(list);
          }
        }, (err) => console.warn('Staff listener error:', err));
        unsubs.push(unsubStaff);

        // Events
        const unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SchoolEvent));
            setEvents(list);
          }
        }, (err) => console.warn('Events listener error:', err));
        unsubs.push(unsubEvents);

        // Gallery
        const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
            setGallery(list);
          }
        }, (err) => console.warn('Gallery listener error:', err));
        unsubs.push(unsubGallery);

        // Notices
        const unsubNotices = onSnapshot(collection(db, 'notices'), (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
            setNotices(list);
          }
        }, (err) => console.warn('Notices listener error:', err));
        unsubs.push(unsubNotices);

        // Enquiries (Real-time listener for admins)
        const qEnquiries = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
        const unsubEnquiries = onSnapshot(qEnquiries, (snapshot) => {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdmissionEnquiry));
          setEnquiries(list);
        }, (err) => {
          // Public users won't have read access to enquiries, which is normal and secure
          console.log('Enquiries read permission handled gracefully:', err.message);
        });
        unsubs.push(unsubEnquiries);

        // Site Settings
        const unsubSettings = onSnapshot(collection(db, 'siteSettings'), (snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs[0]?.data() as SiteSettings;
            if (data) setSiteSettings(prev => ({ ...prev, ...data }));
          }
        }, (err) => console.warn('Settings listener error:', err));
        unsubs.push(unsubSettings);

      } catch (err) {
        console.error('Error in Firestore initialization:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    initListeners();

    return () => {
      unsubs.forEach(u => u());
    };
  }, []);

  // Seed default 12 Gurugram branches and initial records into Firestore
  const seedInitialData = async () => {
    try {
      setLoading(true);
      // Seed branches
      for (const branch of INITIAL_BRANCHES) {
        await setDoc(doc(db, 'branches', branch.id), branch);
      }
      // Seed notices
      for (const notice of INITIAL_NOTICES) {
        await setDoc(doc(db, 'notices', notice.id), notice);
      }
      // Seed events
      for (const ev of INITIAL_EVENTS) {
        await setDoc(doc(db, 'events', ev.id), ev);
      }
      // Seed staff
      for (const st of INITIAL_STAFF) {
        await setDoc(doc(db, 'staff', st.id), st);
      }
      // Seed settings
      await setDoc(doc(db, 'siteSettings', 'general'), DEFAULT_SETTINGS);
      await setDoc(doc(db, 'seoSettings', 'default'), DEFAULT_SEO);
    } catch (err) {
      console.error('Error seeding data:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Branch CRUD
  const addBranch = async (branchData: Omit<Branch, 'id'>): Promise<string> => {
    const colRef = collection(db, 'branches');
    const docRef = await addDoc(colRef, {
      ...branchData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const updateBranch = async (id: string, branchData: Partial<Branch>) => {
    const docRef = doc(db, 'branches', id);
    await setDoc(docRef, {
      ...branchData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  };

  const deleteBranch = async (id: string) => {
    await deleteDoc(doc(db, 'branches', id));
  };

  const saveBranch = async (branchData: Partial<Branch>): Promise<string | void> => {
    if (branchData.id && !branchData.id.startsWith('temp-')) {
      const id = branchData.id;
      const { id: _, ...rest } = branchData;
      await setDoc(doc(db, 'branches', id), {
        ...rest,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return id;
    } else {
      const { id: _, ...rest } = branchData;
      const docRef = await addDoc(collection(db, 'branches'), {
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    }
  };

  const removeBranch = deleteBranch;

  // Staff CRUD
  const addStaff = async (staffData: Omit<Staff, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'staff'), {
      ...staffData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const updateStaff = async (id: string, staffData: Partial<Staff>) => {
    await setDoc(doc(db, 'staff', id), {
      ...staffData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  };

  const deleteStaff = async (id: string) => {
    await deleteDoc(doc(db, 'staff', id));
  };

  const saveStaff = async (staffData: Partial<Staff>): Promise<string | void> => {
    if (staffData.id && !staffData.id.startsWith('temp-')) {
      const id = staffData.id;
      const { id: _, ...rest } = staffData;
      await setDoc(doc(db, 'staff', id), {
        ...rest,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return id;
    } else {
      const { id: _, ...rest } = staffData;
      const docRef = await addDoc(collection(db, 'staff'), {
        ...rest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    }
  };

  const removeStaff = deleteStaff;

  // Events CRUD
  const addEvent = async (eventData: Omit<SchoolEvent, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const updateEvent = async (id: string, eventData: Partial<SchoolEvent>) => {
    await setDoc(doc(db, 'events', id), {
      ...eventData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
  };

  const saveEvent = async (eventData: Partial<SchoolEvent>): Promise<string | void> => {
    if (eventData.id && !eventData.id.startsWith('temp-')) {
      const id = eventData.id;
      const { id: _, ...rest } = eventData;
      await setDoc(doc(db, 'events', id), {
        ...rest,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return id;
    } else {
      const { id: _, ...rest } = eventData;
      const docRef = await addDoc(collection(db, 'events'), {
        ...rest,
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    }
  };

  const removeEvent = deleteEvent;

  // Gallery CRUD
  const addGalleryItem = async (galleryData: Omit<GalleryItem, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'gallery'), {
      ...galleryData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
  };

  const saveGalleryItem = async (galleryData: Partial<GalleryItem>): Promise<string | void> => {
    if (galleryData.id && !galleryData.id.startsWith('temp-')) {
      const id = galleryData.id;
      const { id: _, ...rest } = galleryData;
      await setDoc(doc(db, 'gallery', id), {
        ...rest,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return id;
    } else {
      const { id: _, ...rest } = galleryData;
      const docRef = await addDoc(collection(db, 'gallery'), {
        ...rest,
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    }
  };

  const removeGalleryItem = deleteGalleryItem;

  // Notice CRUD
  const addNotice = async (noticeData: Omit<Notice, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'notices'), {
      ...noticeData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const updateNotice = async (id: string, noticeData: Partial<Notice>) => {
    await setDoc(doc(db, 'notices', id), {
      ...noticeData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  };

  const deleteNotice = async (id: string) => {
    await deleteDoc(doc(db, 'notices', id));
  };

  const saveNotice = async (noticeData: Partial<Notice>): Promise<string | void> => {
    if (noticeData.id && !noticeData.id.startsWith('temp-')) {
      const id = noticeData.id;
      const { id: _, ...rest } = noticeData;
      await setDoc(doc(db, 'notices', id), {
        ...rest,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return id;
    } else {
      const { id: _, ...rest } = noticeData;
      const docRef = await addDoc(collection(db, 'notices'), {
        ...rest,
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    }
  };

  const removeNotice = deleteNotice;

  // Enquiries
  const submitEnquiry = async (enquiryData: Omit<AdmissionEnquiry, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...enquiryData,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const updateEnquiryStatus = async (id: string, status: AdmissionEnquiry['status'], adminNotes?: string) => {
    const updates: Partial<AdmissionEnquiry> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
    await updateDoc(doc(db, 'enquiries', id), updates);
  };

  const deleteEnquiry = async (id: string) => {
    await deleteDoc(doc(db, 'enquiries', id));
  };

  // Settings
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
    await setDoc(doc(db, 'siteSettings', 'general'), settings, { merge: true });
  };

  const saveSettings = updateSiteSettings;

  const updateSeoSettings = async (settings: Partial<SeoSettings>) => {
    setSeoSettings(prev => ({ ...prev, ...settings }));
    await setDoc(doc(db, 'seoSettings', 'default'), settings, { merge: true });
  };

  return (
    <SiteContext.Provider
      value={{
        branches,
        staff,
        events,
        gallery,
        notices,
        enquiries,
        siteSettings,
        settings: siteSettings,
        seoSettings,
        loading,
        error,
        seedInitialData,
        addBranch,
        updateBranch,
        deleteBranch,
        saveBranch,
        removeBranch,
        addStaff,
        updateStaff,
        deleteStaff,
        saveStaff,
        removeStaff,
        addEvent,
        updateEvent,
        deleteEvent,
        saveEvent,
        removeEvent,
        addGalleryItem,
        deleteGalleryItem,
        saveGalleryItem,
        removeGalleryItem,
        addNotice,
        updateNotice,
        deleteNotice,
        saveNotice,
        removeNotice,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        updateSiteSettings,
        saveSettings,
        updateSeoSettings,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
