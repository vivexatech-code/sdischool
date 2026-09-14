import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SiteProvider } from './contexts/SiteContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/common/ProtectedRoute';

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
            {/* Login Routes */}
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin Dashboard Protected Routes (Root and /admin scope) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="branches" element={<AdminBranchesPage />} />
              <Route path="branches/add" element={<AdminBranchesPage />} />
              <Route path="branches/:id/edit" element={<AdminBranchesPage />} />
              <Route path="staff" element={<AdminStaffPage />} />
              <Route path="staff/add" element={<AdminStaffPage />} />
              <Route path="staff/:id/edit" element={<AdminStaffPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="events/add" element={<AdminEventsPage />} />
              <Route path="events/:id/edit" element={<AdminEventsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="notices" element={<AdminNoticesPage />} />
              <Route path="notices/add" element={<AdminNoticesPage />} />
              <Route path="notices/:id/edit" element={<AdminNoticesPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="seo" element={<AdminSettingsPage />} />
            </Route>

            {/* Also support prefixed /admin/... routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="branches" element={<AdminBranchesPage />} />
              <Route path="branches/add" element={<AdminBranchesPage />} />
              <Route path="branches/:id/edit" element={<AdminBranchesPage />} />
              <Route path="staff" element={<AdminStaffPage />} />
              <Route path="staff/add" element={<AdminStaffPage />} />
              <Route path="staff/:id/edit" element={<AdminStaffPage />} />
              <Route path="events" element={<AdminEventsPage />} />
              <Route path="events/add" element={<AdminEventsPage />} />
              <Route path="events/:id/edit" element={<AdminEventsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="notices" element={<AdminNoticesPage />} />
              <Route path="notices/add" element={<AdminNoticesPage />} />
              <Route path="notices/:id/edit" element={<AdminNoticesPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="seo" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </SiteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
