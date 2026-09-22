export interface BranchLeadership {
  name: string;
  designation?: string; // Default: 'Leader'
  description?: string;
  phone?: string;
  photoUrl?: string;
  cloudinaryPublicId?: string;
}

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
  branchLeadership?: BranchLeadership;
  principalName?: string;
  principalPhone?: string;
  principalQualification?: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  galleryImages?: string[];
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
  businessProfileUrl?: string;
  facilities: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  isActive: boolean;
  isPlaceholder?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Staff {
  id: string;
  name: string;
  role?: string;
  designation: 'Principal' | 'Vice Principal' | 'Coordinator' | 'Teacher' | 'Administrative Staff' | 'Other Staff' | string;
  description?: string;
  shortBio?: string;
  phone?: string;
  email?: string;
  department?: string;
  photoUrl: string;
  cloudinaryPublicId?: string;
  staffType?: 'central' | 'branch';
  branchId?: string | null;
  branchName?: string;
  qualification?: string;
  experienceYears?: number;
  experience?: string | number;
  displayOrder?: number;
  isActive?: boolean;
  isLeadership?: boolean;
  createdAt?: string;
  updatedAt?: string;
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
  branchId?: string; // 'all' or specific branchId
  branchName?: string;
  coverImageUrl?: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  photos?: string[];
  isPublished?: boolean;
  category?: 'Sports' | 'Academic' | 'Cultural' | 'Celebration' | 'Workshop' | 'Competition' | string;
  isUpcoming?: boolean;
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
  uploadedAt?: string;
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
  priority: 'Urgent' | 'High' | 'Normal' | 'low' | 'normal' | 'urgent' | string;
  isActive: boolean;
  publishedDate?: string;
  date?: string;
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
  subject?: string;
  formType?: 'admission' | 'quick_enquiry' | 'branch_enquiry' | 'contact' | string;
  status: 'new' | 'contacted' | 'follow_up' | 'converted' | 'closed' | 'New' | 'Contacted' | 'Closed' | string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
  emailNotificationStatus?: 'sent' | 'failed' | 'not_configured';
  emailNotificationError?: string;
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
  metaDescription?: string;
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
