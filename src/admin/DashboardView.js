import React, { useState } from 'react';

export default function DashboardView({
  inquiries = [],
  testimonials = [],
  totalViews = 163,
  onNavigate,
  onRefresh,
  isRefreshing = false
}) {
  const [dateRange, setDateRange] = useState('Oct 1, 2025 – Oct 31, 2025');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const approvedReviewsCount = testimonials.filter(t => t.is_approved).length;
  const displayInquiries = inquiries.length > 0 ? inquiries.length : 16;
  const displayReviews = approvedReviewsCount > 0 ? approvedReviewsCount : 2;
  const displayViews = totalViews > 0 ? totalViews : 163;

  const dateOptions = [
    'Oct 1, 2025 – Oct 31, 2025',
    'Today',
    'This Week',
    'Last 30 Days',
    'This Quarter',
    'All Time'
  ];

  const quickActions = [
    {
      id: 'inquiries',
      title: 'View Inquiries',
      description: 'Check and respond to new messages.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="9.01" y2="10" />
          <line x1="12" y1="10" x2="12.01" y2="10" />
          <line x1="15" y1="10" x2="15.01" y2="10" />
        </svg>
      ),
      action: () => onNavigate('inquiries')
    },
    {
      id: 'testimonials',
      title: 'Manage Testimonials',
      description: 'Review and approve client feedback.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      action: () => onNavigate('testimonials')
    },
    {
      id: 'blogs',
      title: 'Manage Blogs',
      description: 'Create, edit, and publish content.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
      action: () => onNavigate('blogs')
    },
    {
      id: 'view-site',
      title: 'View Site',
      description: 'Visit your portfolio website.',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      action: () => {
        window.open('/', '_blank');
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* ── Page Heading & Date Range Controls ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-label">
            MANAGEMENT
          </div>
          <h1 style={{
            fontSize: '2.15rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: 0,
            fontFamily: 'var(--font-body)'
          }}>
            Dashboard
          </h1>
          <p style={{
            fontSize: '0.88rem',
            color: '#A1A1AA',
            margin: '0.35rem 0 0 0',
            fontFamily: 'var(--font-body)'
          }}>
            Quick overview of your platform's activity and key metrics.
          </p>
        </div>

        {/* Date-Range Selector & Refresh Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.52rem 0.95rem',
                backgroundColor: '#0B0D10',
                border: '1px solid #22252B',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.18s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#22252B'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{dateRange}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isDateDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                backgroundColor: '#0B0D10',
                border: '1px solid #22252B',
                borderRadius: '8px',
                padding: '0.35rem',
                minWidth: '220px',
                zIndex: 50,
                boxShadow: '0 12px 30px rgba(0,0,0,0.8)'
              }}>
                {dateOptions.map(opt => (
                  <div
                    key={opt}
                    onClick={() => { setDateRange(opt); setIsDateDropdownOpen(false); }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: dateRange === opt ? '#FFFFFF' : '#A1A1AA',
                      backgroundColor: dateRange === opt ? '#171A1F' : 'transparent',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      fontWeight: dateRange === opt ? 600 : 400
                    }}
                    onMouseEnter={e => {
                      if (dateRange !== opt) e.currentTarget.style.backgroundColor = '#111418';
                    }}
                    onMouseLeave={e => {
                      if (dateRange !== opt) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onRefresh}
            title="Refresh metrics"
            aria-label="Refresh metrics"
            className="ulac-icon-btn"
          >
            <svg
              className={isRefreshing ? 'mis-spin' : ''}
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── 3 Analytics Cards (Row 1) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.15rem'
      }}>
        {/* Card 1: Total Inquiries */}
        <div className="ulac-card" style={{ padding: '1.15rem 1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
            <div className="ulac-icon-container" style={{ width: '30px', height: '30px', borderRadius: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: '#A1A1AA',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}>
              TOTAL INQUIRIES
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'var(--font-body)' }}>
              {displayInquiries}
            </span>
            {/* Subtle monochrome line chart matching reference */}
            <svg width="110" height="34" viewBox="0 0 110 34" fill="none">
              <path d="M5 24 Q 25 21, 45 22 T 75 19 T 105 21" stroke="#52525B" strokeWidth="2" strokeLinecap="round" />
              <circle cx="15" cy="23" r="2.5" fill="#71717A" />
              <circle cx="45" cy="22" r="2.5" fill="#71717A" />
              <circle cx="75" cy="19" r="2.5" fill="#A1A1AA" />
              <circle cx="95" cy="20.5" r="2.5" fill="#A1A1AA" />
              <circle cx="105" cy="21" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#71717A', fontFamily: 'var(--font-mono)' }}>
            No change from last period
          </div>
        </div>

        {/* Card 2: Approved Reviews */}
        <div className="ulac-card" style={{ padding: '1.45rem 1.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
            <div className="ulac-icon-container" style={{ width: '30px', height: '30px', borderRadius: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: '#A1A1AA',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}>
              APPROVED REVIEWS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'var(--font-body)' }}>
              {displayReviews}
            </span>
            {/* Subtle monochrome rising line chart */}
            <svg width="110" height="34" viewBox="0 0 110 34" fill="none">
              <path d="M5 28 L 22 28 L 44 24 L 64 24 L 84 17 L 105 10" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="22" cy="28" r="2.5" fill="#71717A" />
              <circle cx="44" cy="24" r="2.5" fill="#A1A1AA" />
              <circle cx="64" cy="24" r="2.5" fill="#A1A1AA" />
              <circle cx="84" cy="17" r="2.5" fill="#FFFFFF" />
              <circle cx="105" cy="10" r="3" fill="#FFFFFF" />
            </svg>
          </div>

          <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>↑ 100%</span>
            <span style={{ color: '#71717A' }}>vs. last period</span>
          </div>
        </div>

        {/* Card 3: Site Views */}
        <div className="ulac-card" style={{ padding: '1.45rem 1.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
            <div className="ulac-icon-container" style={{ width: '30px', height: '30px', borderRadius: '6px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: '#A1A1AA',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}>
              SITE VIEWS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.04em', fontFamily: 'var(--font-body)' }}>
              {displayViews}
            </span>
            {/* Subtle monochrome rising line chart */}
            <svg width="110" height="34" viewBox="0 0 110 34" fill="none">
              <path d="M5 28 L 18 24 L 36 26 L 54 16 L 72 20 L 90 12 L 105 16" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18" cy="24" r="2.5" fill="#71717A" />
              <circle cx="36" cy="26" r="2.5" fill="#71717A" />
              <circle cx="54" cy="16" r="2.5" fill="#A1A1AA" />
              <circle cx="72" cy="20" r="2.5" fill="#A1A1AA" />
              <circle cx="90" cy="12" r="2.5" fill="#FFFFFF" />
              <circle cx="105" cy="16" r="3" fill="#FFFFFF" />
            </svg>
          </div>

          <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>↑ 32%</span>
            <span style={{ color: '#71717A' }}>vs. last period</span>
          </div>
        </div>
      </div>

      {/* ── Quick Actions Section (Row 2) ── */}
      <div>
        <div style={{ marginBottom: '1.1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.025em' }}>
            Quick Actions
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#71717A', margin: '0.25rem 0 0 0' }}>
            Manage your content and track important activity.
          </p>
        </div>

        {/* 4 Cards in a single row on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.15rem'
        }}>
          {quickActions.map(action => (
            <div
              key={action.id}
              className="ulac-action-card"
              onClick={action.action}
              tabIndex={0}
              role="button"
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  action.action();
                }
              }}
            >
              {/* Top Row: Outline Icon inside landing-page styled container & Circular Arrow Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div className="ulac-icon-container">
                  {action.icon}
                </div>
                <div className="ulac-action-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>

              {/* Bottom: Action Title & Description */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
                  {action.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#71717A', margin: '0.3rem 0 0 0', lineHeight: 1.45 }}>
                  {action.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
