import React from 'react';

export default function ProfilePanel({
  user,
  stats = {},
  onEditProfile,
  onNavigate,
  recentActivities = []
}) {
  const blogCount = stats.totalBlogs || 12;
  const viewCountFormatted = stats.totalViews ? (stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews) : '1.2K';
  const bookmarksCount = stats.bookmarks || 24;

  const defaultActivities = [
    {
      id: 'act-1',
      icon: 'blog',
      title: 'New blog published',
      desc: 'Building My Developer Portfolio',
      time: '2h ago',
      action: () => onNavigate('blogs')
    },
    {
      id: 'act-2',
      icon: 'inquiry',
      title: 'New inquiry received',
      desc: 'From maria@gmail.com',
      time: '5h ago',
      action: () => onNavigate('inquiries')
    },
    {
      id: 'act-3',
      icon: 'testimonial',
      title: 'New testimonial',
      desc: 'From Client',
      time: '1d ago',
      action: () => onNavigate('testimonials')
    },
    {
      id: 'act-4',
      icon: 'blog',
      title: 'Blog draft updated',
      desc: 'Exploring AI Tools for Developers',
      time: '1d ago',
      action: () => onNavigate('blogs')
    }
  ];

  const activities = recentActivities.length > 0 ? recentActivities : defaultActivities;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* ── Profile Card ── */}
      <div className="ulac-card" style={{ padding: '1.35rem 1.4rem' }}>
        {/* Top: Avatar, name, chevron */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
            <img
              src="/new-pfp.jpg"
              alt="John Carlo Aganan"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #22252B',
                backgroundColor: '#111418'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/me.jpg';
              }}
            />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', fontFamily: 'var(--font-body)' }}>
                {user?.name || 'John Carlo Aganan'}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>
                @{user?.username || 'ulacdev'}
              </div>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#71717A',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.18s'
            }}
            title="Account details"
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* 3 Compact Statistics with Dividers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: '0.85rem 0',
          borderTop: '1px solid #22252B',
          borderBottom: '1px solid #22252B',
          marginBottom: '1.25rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-body)' }}>
              {blogCount}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.35rem' }}>
              Blogs
            </div>
          </div>

          <div style={{ borderLeft: '1px solid #22252B', borderRight: '1px solid #22252B' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-body)' }}>
              {viewCountFormatted}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.35rem' }}>
              Views
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', fontFamily: 'var(--font-body)' }}>
              {bookmarksCount}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.35rem' }}>
              Bookmarks
            </div>
          </div>
        </div>

        {/* Outlined Edit Profile Button matching landing page button style */}
        <button
          onClick={onEditProfile}
          className="ulac-btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Edit Profile
        </button>
      </div>

      {/* ── Recent Activity Card ── */}
      <div className="ulac-card" style={{ padding: '1.25rem 1.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em', fontFamily: 'var(--font-body)' }}>
            Recent Activity
          </h3>
          <button
            onClick={() => onNavigate('inquiries')}
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

        {/* Compact Activity List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                {/* Landing page style icon container */}
                <div className="ulac-icon-container" style={{ width: '32px', height: '32px', borderRadius: '7px' }}>
                  {act.icon === 'blog' && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  )}
                  {act.icon === 'inquiry' && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                  {act.icon === 'testimonial' && (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  )}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#71717A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '0.1rem' }}>
                    {act.desc}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                <span style={{ fontSize: '0.6875rem', color: '#71717A', fontFamily: 'var(--font-mono)' }}>
                  {act.time}
                </span>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  opacity: 0.7
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
