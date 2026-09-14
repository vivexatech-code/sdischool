export interface Branch {
  id: string;
  name: string;
  slug: string;
  sector: string;
  address: string;
  phone: string;
  email: string;
  board: 'CBSE' | 'HBSE' | 'CBSE & HBSE';
  classes: string;
  medium: string;
  description: string;
  principalName?: string;
  principalPhone?: string;
  principalQualification?: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  galleryImages?: string[];
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  facilities: string[];
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  isPlaceholder?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Staff {
  id: string;
  name: string;
  designation: 'Principal' | 'Vice Principal' | 'Coordinator' | 'Teacher' | 'Administrative Staff' | 'Other Staff';
  photoUrl: string;
  cloudinaryPublicId?: string;
  qualification: string;
  experience: string;
  shortBio: string;
  branchId: string;
  branchName?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  branchId?: string; // 'all' or specific branchId
  branchName?: string;
  coverImageUrl: string;
  cloudinaryPublicId?: string;
  photos: string[];
  isPublished: boolean;
  category?: string;
  createdAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  caption?: string;
  branchId?: string;
  branchName?: string;
  eventId?: string;
  eventName?: string;
  category?: string;
  createdAt?: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  buttonText?: string;
  buttonUrl?: string;
  startDate: string;
  endDate: string;
  branchId?: string; // 'all' or specific branchId
  branchName?: string;
  priority: 'Urgent' | 'High' | 'Normal';
  isActive: boolean;
  createdAt?: string;
}

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  parentName: string;
  mobile: string;
  email: string;
  classGrade: string;
  preferredBranchId: string;
  preferredBranchName?: string;
  board: string;
  message?: string;
  status: 'new' | 'contacted' | 'follow_up' | 'converted' | 'closed';
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
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
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalBaseUrl: string;
  ogImageUrl: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'branch_admin';
  assignedBranchId?: string;
  createdAt?: string;
}
