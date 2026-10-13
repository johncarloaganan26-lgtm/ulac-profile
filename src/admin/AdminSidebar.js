import React from 'react';

export default function AdminSidebar({
  currentView,
  onNavigate,
  isMobile,
  collapsed,
  onLogout,
  unreadInquiriesCount = 0,
  pendingReviewsCount = 0
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="9.01" y2="10" />
          <line x1="12" y1="10" x2="12.01" y2="10" />
          <line x1="15" y1="10" x2="15.01" y2="10" />
        </svg>
      )
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      badge: pendingReviewsCount > 0 ? pendingReviewsCount : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    },
    {
      id: 'blogs',
      label: 'Blogs',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      )
    }
  ];

  const sidebarWidth = isMobile ? '100%' : (collapsed ? '72px' : '230px');

  return (
    <aside
      className="ulac-sidebar"
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        padding: collapsed && !isMobile ? '1.5rem 0.65rem' : '1.5rem 1rem',
        height: isMobile ? 'auto' : '100vh',
        position: isMobile ? 'relative' : 'sticky'
      }}
    >
      {/* Brand Header */}
      <div
        className="ulac-brand"
        onClick={() => onNavigate('dashboard')}
        style={{
          marginBottom: isMobile ? '1.25rem' : '2rem',
          justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
          padding: '0 0.25rem'
        }}
      >
        {/* Outline infinity symbol glyph from the reference design */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M18.178 8c5.096 0 5.096 8 0 8-2.67 0-4.655-4.223-6.178-8-1.523 3.777-3.508 8-6.178 8-5.096 0-5.096-8 0-8 2.67 0 4.655 4.223 6.178 8 1.523-3.777 3.508-8 6.178-8z" />
        </svg>
        {(!collapsed || isMobile) && (
          <span style={{ fontWeight: 700, fontSize: '1.18rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Ulacdev
          </span>
        )}
      </div>

      {/* Navigation Items (Exact order: Dashboard, Inquiries, Testimonials, Blogs) */}
      <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '0.3rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        {navItems.map(item => {
          const isActive = currentView === item.id || (item.id === 'blogs' && currentView.startsWith('blog'));
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`ulac-nav-item ${isActive ? 'active' : ''}`}
              title={collapsed && !isMobile ? item.label : undefined}
              style={{
                justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                padding: collapsed && !isMobile ? '0.7rem 0' : '0.65rem 0.85rem'
              }}
            >
              <span style={{ color: isActive ? '#FFFFFF' : '#A1A1AA', display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              {(!collapsed || isMobile) && (
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              )}
              {(!collapsed || isMobile) && item.badge && (
                <span className="chip-inverted" style={{ marginLeft: 'auto', fontSize: '0.625rem', padding: '0.12rem 0.45rem' }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Log Out Action at the Bottom */}
      <div style={{ marginTop: isMobile ? '1rem' : 'auto', paddingTop: '1rem', borderTop: '1px solid #22252B' }}>
        <button
          onClick={onLogout}
          className="ulac-logout-btn"
          title={collapsed && !isMobile ? 'Log Out' : undefined}
          style={{
            justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
            padding: collapsed && !isMobile ? '0.65rem 0' : '0.65rem 0.85rem'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {(!collapsed || isMobile) && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
