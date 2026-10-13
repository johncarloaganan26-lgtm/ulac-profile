import React, { useState, useRef, useEffect } from 'react';

export default function AdminTopbar({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  inquiries = [],
  testimonials = [],
  onNavigate,
  user,
  stats = {},
  onEditProfile,
  onLogout,
  recentActivities = []
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const pendingTestimonials = testimonials.filter(t => !t.is_approved);
  const totalNotifications = inquiries.length + pendingTestimonials.length;

  // Stats with fallbacks matching user specification (7 Blogs, 1.7K Views, 24 Bookmarks)
  const blogCount = stats.totalBlogs != null ? stats.totalBlogs : 7;
  const viewCountFormatted = stats.totalViews ? (stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews) : '1.7K';
  const bookmarksCount = stats.bookmarks || 24;

  const defaultActivities = [
    {
      id: 'act-1',
      icon: 'blog',
      title: 'New blog published',
      desc: 'Building My Developer Portfolio',
      time: '2h ago',
      action: () => { setShowProfile(false); onNavigate('blogs'); }
    },
    {
      id: 'act-2',
      icon: 'inquiry',
      title: 'New inquiry received',
      desc: 'From maria@gmail.com',
      time: '5h ago',
      action: () => { setShowProfile(false); onNavigate('inquiries'); }
    },
    {
      id: 'act-3',
      icon: 'testimonial',
      title: 'New testimonial',
      desc: 'From Client',
      time: '1d ago',
      action: () => { setShowProfile(false); onNavigate('testimonials'); }
    },
    {
      id: 'act-4',
      icon: 'blog',
      title: 'Blog draft updated',
      desc: 'Exploring AI Tools for Developers',
      time: '1d ago',
      action: () => { setShowProfile(false); onNavigate('blogs'); }
    }
  ];

  const activities = recentActivities.length > 0 ? recentActivities : defaultActivities;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="ulac-topbar">
      {/* Left side: Sidebar Toggle & Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, maxWidth: '520px' }}>
        <button
          onClick={onToggleSidebar}
          className="ulac-icon-btn"
          title="Toggle sidebar"
          aria-label="Toggle navigation sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Search Input matching landing page design */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
          <svg
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="ulac-search-input"
            placeholder="Search blogs, topics, or anything..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Right side: Notification Icon (left to profile) & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* 1. Notification Bell - strictly located left of user profile */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="ulac-icon-btn"
            title="Notifications"
            aria-label="View notifications"
            style={{ position: 'relative' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>

            {/* Notification Indicator Dot */}
            {totalNotifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
              }} />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '320px',
              backgroundColor: '#0B0D10',
              border: '1px solid #22252B',
              borderRadius: '12px',
              padding: '0.85rem',
              zIndex: 60,
              boxShadow: '0 16px 36px rgba(0,0,0,0.85)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #22252B' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Notifications
                </span>
                <span className="chip-inverted" style={{ fontSize: '0.625rem' }}>
                  {totalNotifications} updates
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '280px', overflowY: 'auto' }} className="ulac-custom-scroll">
                {pendingTestimonials.length > 0 && (
                  <div
                    onClick={() => { onNavigate('testimonials'); setShowNotifications(false); }}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '8px',
                      background: '#111418',
                      border: '1px solid #22252B',
                      cursor: 'pointer',
                      transition: 'border-color 0.18s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#22252B'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.75rem' }}>★ Pending Reviews</span>
                      <span style={{ fontSize: '0.6875rem', color: '#A1A1AA', fontFamily: 'var(--font-mono)' }}>Review →</span>
                    </div>
                    <div style={{ color: '#71717A', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                      {pendingTestimonials.length} client review(s) waiting for approval
                    </div>
                  </div>
                )}

                {inquiries.length > 0 ? (
                  inquiries.slice(0, 4).map((inq, idx) => (
                    <div
                      key={inq.id || idx}
                      onClick={() => { onNavigate('inquiries'); setShowNotifications(false); }}
                      style={{
                        padding: '0.6rem 0.75rem',
                        borderRadius: '8px',
                        background: '#111418',
                        border: '1px solid #22252B',
                        cursor: 'pointer',
                        transition: 'border-color 0.18s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#22252B'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.78rem' }}>{inq.name}</span>
                        <span style={{ color: '#71717A', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
                          {inq.created_at ? new Date(inq.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Recent'}
                        </span>
                      </div>
                      <div style={{ color: '#A1A1AA', fontSize: '0.72rem', marginTop: '0.15rem' }}>{inq.subject}</div>
                      <div style={{ color: '#71717A', fontSize: '0.7rem', marginTop: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {inq.message}
                      </div>
                    </div>
                  ))
                ) : null}

                {totalNotifications === 0 && (
                  <div style={{ padding: '1.5rem 1rem', textAlign: 'center', color: '#71717A', fontSize: '0.78rem' }}>
                    No new notifications. Everything is up to date!
                  </div>
                )}
              </div>

              <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #22252B' }}>
                <button
                  onClick={() => { onNavigate('inquiries'); setShowNotifications(false); }}
                  className="ulac-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  View Inquiries ({inquiries.length}) →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. User Profile Trigger with Popover containing Profile & Recent Activity */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.3rem 0.65rem 0.3rem 0.4rem',
              backgroundColor: '#111418',
              border: '1px solid #22252B',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'border-color 0.18s, background-color 0.18s',
              fontFamily: 'var(--font-body)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.backgroundColor = '#171A1F';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#22252B';
              e.currentTarget.style.backgroundColor = '#111418';
            }}
            title="John Carlo Aganan Profile"
            aria-label="Admin Profile and Recent Activity"
          >
            <img
              src="/new-pfp.jpg"
              alt="John Carlo Aganan"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #22252B',
                flexShrink: 0
              }}
              onError={e => { e.target.onerror = null; e.target.src = '/me.jpg'; }}
            />
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                {user?.name || 'John Carlo Aganan'}
              </span>
              <span style={{ fontSize: '0.625rem', color: '#71717A', fontFamily: 'var(--font-mono)', lineHeight: 1.15 }}>
                @{user?.username || 'ulacdev'}
              </span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.15rem' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Profile & Recent Activity Popover */}
          {showProfile && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '340px',
              backgroundColor: '#0B0D10',
              border: '1px solid #22252B',
              borderRadius: '12px',
              padding: '1.25rem',
              zIndex: 65,
              boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
              animation: 'ulac-scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {/* Profile Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src="/new-pfp.jpg"
                    alt="John Carlo Aganan"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid #22252B',
                      backgroundColor: '#111418'
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = '/me.jpg'; }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', fontFamily: 'var(--font-body)' }}>
                      {user?.name || 'John Carlo Aganan'}
                    </h4>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>
                      @{user?.username || 'ulacdev'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Stats (7 Blogs, 1.7K Views, 24 Bookmarks) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '0.75rem 0',
                borderTop: '1px solid #22252B',
                borderBottom: '1px solid #22252B',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-body)' }}>
                    {blogCount}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                    Blogs
                  </div>
                </div>

                <div style={{ borderLeft: '1px solid #22252B', borderRight: '1px solid #22252B' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-body)' }}>
                    {viewCountFormatted}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                    Views
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-body)' }}>
                    {bookmarksCount}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                    Bookmarks
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => { setShowProfile(false); onEditProfile(); }}
                className="ulac-btn-secondary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '1.25rem' }}
              >
                Edit Profile
              </button>

              {/* Recent Activity Section */}
              <div style={{ borderTop: '1px solid #22252B', paddingTop: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', fontFamily: 'var(--font-body)' }}>
                    Recent Activity
                  </span>
                  <button
                    onClick={() => { setShowProfile(false); onNavigate('inquiries'); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#71717A',
                      fontSize: '0.625rem',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'color 0.18s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
                  >
                    View all
                  </button>
                </div>

                {/* Activity Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {activities.map(act => (
                    <div
                      key={act.id}
                      onClick={act.action}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.35rem 0',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        transition: 'opacity 0.18s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
                        <div className="ulac-icon-container" style={{ width: '28px', height: '28px', borderRadius: '6px' }}>
                          {act.icon === 'blog' && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          )}
                          {act.icon === 'inquiry' && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                          )}
                          {act.icon === 'testimonial' && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          )}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
                            {act.title}
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: '#71717A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {act.desc}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                        <span style={{ fontSize: '0.65rem', color: '#71717A', fontFamily: 'var(--font-mono)' }}>
                          {act.time}
                        </span>
                        <span style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          opacity: 0.7
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign Out at bottom of menu */}
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #22252B' }}>
                <button
                  onClick={() => { setShowProfile(false); onLogout(); }}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: '#71717A',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    padding: '0.4rem',
                    transition: 'color 0.18s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
