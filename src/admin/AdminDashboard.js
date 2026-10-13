import React, { useState, useEffect, useCallback } from 'react';
import './admin.css';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import DashboardView from './DashboardView';
import ProfilePanel from './ProfilePanel';
import BlogManagementView from './BlogManagementView';
import BlogEditorView from './BlogEditorView';
import BlogPreviewView from './BlogPreviewView';
import InquiriesView from './InquiriesView';
import TestimonialsView from './TestimonialsView';
import EditProfileModal from './EditProfileModal';
import { blogService } from '../services/blogService';

export default function AdminDashboard({
  user,
  onLogout,
  inquiries = [],
  testimonials = [],
  totalViews = 163,
  onDeleteInquiry,
  onToggleApproval,
  onDeleteTestimonial,
  onRefreshData,
  isRefreshing = false
}) {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/admin/blogs' || hash === '#blogs') return 'blogs';
    if (path === '/admin/blogs/new' || hash === '#blogs-new') return 'blogs-new';
    if (path === '/admin/inquiries' || hash === '#inquiries') return 'inquiries';
    if (path === '/admin/testimonials' || hash === '#testimonials') return 'testimonials';
    return 'dashboard';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState(() => blogService.getAll());
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [previewBlogId, setPreviewBlogId] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('ulac_admin_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    return {
      name: 'John Carlo Aganan',
      username: 'ulacdev',
      email: user?.email || 'johncarloaganan26@gmail.com',
      bio: 'Full-Stack Developer, UI/UX Designer & System Architect.',
      bookmarks: 24
    };
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  // Sync blogs list on changes
  const reloadBlogs = useCallback(() => {
    setBlogs(blogService.getAll());
  }, []);

  useEffect(() => {
    window.addEventListener('ulac-blogs-changed', reloadBlogs);
    return () => window.removeEventListener('ulac-blogs-changed', reloadBlogs);
  }, [reloadBlogs]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update URL history when navigating
  const navigateTo = (view, extraId = null) => {
    setCurrentView(view);
    if (extraId) {
      if (view === 'blogs-edit') setEditingBlogId(extraId);
      if (view === 'blogs-preview') setPreviewBlogId(extraId);
    }

    let newPath = '/admin';
    if (view === 'inquiries') newPath = '/admin/inquiries';
    else if (view === 'testimonials') newPath = '/admin/testimonials';
    else if (view === 'blogs') newPath = '/admin/blogs';
    else if (view === 'blogs-new') newPath = '/admin/blogs/new';
    else if (view === 'blogs-edit') newPath = `/admin/blogs/edit/${extraId}`;
    else if (view === 'blogs-preview') newPath = `/admin/blogs/preview/${extraId}`;

    if (window.history && window.history.pushState) {
      window.history.pushState({}, '', newPath);
    }
  };

  // Blog CRUD handlers
  const handleSaveBlog = (blogData) => {
    if (editingBlogId) {
      blogService.update(editingBlogId, blogData);
      showToast(`Updated blog "${blogData.title}"`);
    } else {
      blogService.create(blogData);
      showToast(`Created blog "${blogData.title}" (${blogData.status})`);
    }
    setEditingBlogId(null);
    navigateTo('blogs');
  };

  const handleTogglePublishBlog = (id) => {
    const updated = blogService.togglePublish(id);
    if (updated) {
      showToast(`Blog is now ${updated.status.toLowerCase()}`);
    }
  };

  const handleDeleteBlog = (id) => {
    const blog = blogService.getById(id);
    const title = blog?.title || 'Blog';
    blogService.delete(id);
    showToast(`Deleted "${title}"`);
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
    localStorage.setItem('ulac_admin_profile', JSON.stringify(updatedProfile));
    showToast('Profile updated successfully');
  };

  // Dynamic blog statistics
  const blogStats = blogService.getStats();

  return (
    <div className="ulac-shell" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
      {/* ── Left Sidebar ── */}
      <AdminSidebar
        currentView={currentView}
        onNavigate={navigateTo}
        isMobile={isMobile}
        collapsed={sidebarCollapsed}
        onLogout={onLogout}
        unreadInquiriesCount={inquiries.length}
        pendingReviewsCount={testimonials.filter(t => !t.is_approved).length}
      />

      {/* ── Right Content Area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navigation Bar */}
        <AdminTopbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          inquiries={inquiries}
          testimonials={testimonials}
          onNavigate={navigateTo}
          user={profileData}
          stats={{
            totalBlogs: blogStats.total,
            totalViews: blogStats.totalViews,
            bookmarks: profileData.bookmarks || 24
          }}
          onEditProfile={() => setIsEditProfileOpen(true)}
          onLogout={onLogout}
        />

        {/* ── Main View Body ── */}
        <main style={{ flex: 1, padding: isMobile ? '1.25rem' : '2.25rem 3rem', boxSizing: 'border-box', minWidth: 0 }}>
          {/* Main Dashboard Layout */}
          {currentView === 'dashboard' && (
            <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
              <DashboardView
                inquiries={inquiries}
                testimonials={testimonials}
                totalViews={totalViews}
                onNavigate={navigateTo}
                onRefresh={onRefreshData}
                isRefreshing={isRefreshing}
              />
            </div>
          )}

          {/* Inquiries View */}
          {currentView === 'inquiries' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <InquiriesView
                inquiries={inquiries}
                onDeleteInquiry={onDeleteInquiry}
                searchQuery={searchQuery}
              />
            </div>
          )}

          {/* Testimonials View */}
          {currentView === 'testimonials' && (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <TestimonialsView
                testimonials={testimonials}
                onToggleApproval={onToggleApproval}
                onDeleteTestimonial={onDeleteTestimonial}
                searchQuery={searchQuery}
              />
            </div>
          )}

          {/* Blog Management View */}
          {currentView === 'blogs' && (
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <BlogManagementView
                blogs={blogs}
                onAddNew={() => { setEditingBlogId(null); navigateTo('blogs-new'); }}
                onEditBlog={(id) => navigateTo('blogs-edit', id)}
                onPreviewBlog={(id) => navigateTo('blogs-preview', id)}
                onTogglePublish={handleTogglePublishBlog}
                onDeleteBlog={handleDeleteBlog}
                onResetBlogs={() => { blogService.reset(); reloadBlogs(); }}
              />
            </div>
          )}

          {/* Blog Editor: New */}
          {currentView === 'blogs-new' && (
            <BlogEditorView
              initialBlog={null}
              onSave={handleSaveBlog}
              onCancel={() => navigateTo('blogs')}
            />
          )}

          {/* Blog Editor: Edit */}
          {currentView === 'blogs-edit' && (
            <BlogEditorView
              initialBlog={blogService.getById(editingBlogId)}
              onSave={handleSaveBlog}
              onCancel={() => navigateTo('blogs')}
            />
          )}

          {/* Blog Preview */}
          {currentView === 'blogs-preview' && (
            <BlogPreviewView
              blog={blogService.getById(previewBlogId)}
              onBack={() => navigateTo('blogs')}
              onEdit={(id) => navigateTo('blogs-edit', id)}
              onTogglePublish={handleTogglePublishBlog}
            />
          )}
        </main>
      </div>

      {/* ── Edit Profile Modal ── */}
      {isEditProfileOpen && (
        <EditProfileModal
          user={profileData}
          onSave={handleSaveProfile}
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0B0D10',
          color: '#FFFFFF',
          border: '1px solid #22252B',
          borderRadius: '6px',
          padding: '0.65rem 1.15rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
          fontWeight: 500,
          boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'ulac-fade-in 0.2s ease'
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
