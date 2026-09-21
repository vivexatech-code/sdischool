export interface Branch {
  id: string;
  name: string;
  slug: string;
  sector: string;
  address: string;
  phone: string;
  email: string;
  board: 'CBSE' | 'HBSE' | 'CBSE & HBSE';
  classesOffered?: string; // e.g. "Play School to 12th"
  classes?: string;
  medium?: string;
  description?: string;
  streams?: string[]; // e.g. ["Science (Medical & Non-Medical)", "Commerce", "Arts/Humanities"]
  facilities: string[];
  imageUrl: string;
  cloudinaryPublicId?: string;
  principalName?: string;
  principalPhone?: string;
  principalQualification?: string;
  principalMessage?: string;
  googleMapsUrl?: string;
  businessProfileUrl?: string;
  latitude?: number;
  longitude?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  active?: boolean;
  isActive?: boolean;
  isPlaceholder?: boolean;
  timing?: string;
}

export interface Staff {
  id: string;
  name: string;
  role?: string;
  designation: string;
  branchId: string;
  branchName?: string;
  qualification: string;
  experienceYears?: number;
  experience?: string | number;
  shortBio?: string;
  photoUrl: string;
  isLeadership?: boolean;
  phone?: string;
  email?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  date: string;
  endDate?: string;
  venue?: string;
  branchId?: string;
  branchName?: string;
  imageUrl?: string;
  coverImageUrl?: string;
  photos?: string[];
  category: 'Sports' | 'Academic' | 'Cultural' | 'Celebration' | 'Workshop' | 'Competition';
  isUpcoming?: boolean;
  published?: boolean;
  isPublished?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Events' | 'Sports' | 'Classrooms' | 'Science & Labs' | 'Cultural';
  imageUrl: string;
  branchId?: string;
  eventId?: string;
  uploadedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  date?: string;
  category?: 'Academic' | 'Administrative' | 'Admission' | 'Holiday' | 'Examination' | 'General' | string;
  description: string;
  downloadUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  imageUrl?: string;
  branchId?: string;
  branchName?: string;
  priority?: 'low' | 'normal' | 'urgent' | 'High' | 'Urgent' | 'Normal' | string;
  targetBranchId?: string; // empty means all branches
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  parentName: string;
  mobile: string;
  email?: string;
  classGrade: string;
  preferredBranchId: string;
  preferredBranchName: string;
  board: 'CBSE' | 'HBSE' | 'Either';
  message?: string;
  status: 'new' | 'contacted' | 'follow_up' | 'converted' | 'closed';
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string;
}

export interface SiteSettings {
  schoolName: string;
  tagline: string;
  directorName: string;
  directorPhone: string;
  managerName: string;
  managerPhone: string;
  primaryEmail: string;
  headOfficeAddress: string;
  headquartersCity?: string;
  totalBranches?: number;
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
  metaDescription?: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalBaseUrl: string;
  ogImageUrl: string;
}
