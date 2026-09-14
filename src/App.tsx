import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SiteProvider } from './contexts/SiteContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PublicLayout } from './components/common/PublicLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { LeadershipPage } from './pages/public/LeadershipPage';
import { AcademicsPage } from './pages/public/AcademicsPage';
import { CbsePage } from './pages/public/CbsePage';
import { HbsePage } from './pages/public/HbsePage';
import { FacilitiesPage } from './pages/public/FacilitiesPage';
import { BranchesPage } from './pages/public/BranchesPage';
import { BranchDetailPage } from './pages/public/BranchDetailPage';
import { EventsPage } from './pages/public/EventsPage';
import { EventDetailPage } from './pages/public/EventDetailPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { NoticesPage } from './pages/public/NoticesPage';
import { AdmissionsPage } from './pages/public/AdmissionsPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPolicyPage } from './pages/public/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/public/TermsConditionsPage';
import { SitemapPage } from './pages/public/SitemapPage';
import { RobotsPage } from './pages/public/RobotsPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBranchesPage } from './pages/admin/AdminBranchesPage';
import { AdminStaffPage } from './pages/admin/AdminStaffPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminNoticesPage } from './pages/admin/AdminNoticesPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Pages Layout */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="leadership" element={<LeadershipPage />} />
              <Route path="academics" element={<AcademicsPage />} />
              <Route path="cbse" element={<CbsePage />} />
              <Route path="hbse" element={<HbsePage />} />
              <Route path="facilities" element={<FacilitiesPage />} />
              <Route path="branches" element={<BranchesPage />} />
              <Route path="branches/:slug" element={<BranchDetailPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="events/:slug" element={<EventDetailPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="notices" element={<NoticesPage />} />
              <Route path="admissions" element={<AdmissionsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="terms-conditions" element={<TermsConditionsPage />} />
              <Route path="sitemap" element={<SitemapPage />} />
              <Route path="robots" element={<RobotsPage />} />
              <Route path="robots.txt" element={<RobotsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin Dashboard Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="branches" element={<AdminBranchesPage />} />
              <Route path="staff" element={<AdminStaffPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="notices" element={<AdminNoticesPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Routes>
        </SiteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
