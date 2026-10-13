import React from 'react';

export default function TestimonialsView({
  testimonials = [],
  onToggleApproval,
  onDeleteTestimonial,
  searchQuery = ''
}) {
  const q = searchQuery.toLowerCase().trim();
  const filtered = q ? testimonials.filter(r =>
    (r.name && r.name.toLowerCase().includes(q)) ||
    (r.role && r.role.toLowerCase().includes(q)) ||
    (r.content && r.content.toLowerCase().includes(q))
  ) : testimonials;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div className="section-label">
          TESTIMONIALS
        </div>
        <h1 style={{
          fontSize: '2.15rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          margin: 0
        }}>
          Testimonials
        </h1>
        <p style={{
          fontSize: '0.88rem',
          color: '#A1A1AA',
          margin: '0.35rem 0 0 0'
        }}>
          Review, approve, and manage client feedback and ratings for your portfolio.
        </p>
      </div>

      <div className="ulac-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', fontSize: '0.835rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#111418', borderBottom: '1px solid #22252B' }}>
                {['CLIENT', 'FEEDBACK', 'STATUS', 'ACTION'].map(h => (
                  <th key={h} style={{
                    padding: '0.85rem 1.15rem',
                    textAlign: 'left',
                    color: '#71717A',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    fontWeight: 600
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((row, i) => (
                <tr
                  key={row.id || i}
                  style={{ borderBottom: '1px solid #22252B', transition: 'background-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111418'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '1rem 1.15rem' }}>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{row.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#71717A', marginTop: '0.15rem' }}>{row.role || 'Client'}</div>
                  </td>
                  <td style={{ padding: '1rem 1.15rem', maxWidth: '340px' }}>
                    <div style={{ color: '#FFFFFF', lineHeight: 1.5 }}>{row.content}</div>
                    {row.rating && (
                      <div style={{ color: '#FFFFFF', fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.9 }}>
                        {'★'.repeat(row.rating)}{'☆'.repeat(Math.max(0, 5 - row.rating))}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.15rem' }}>
                    <span className={`ulac-badge ${row.is_approved ? 'ulac-badge-published' : 'ulac-badge-draft'}`}>
                      {row.is_approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.15rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button
                        onClick={() => onToggleApproval(row.id, row.is_approved)}
                        className="ulac-btn-secondary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        {row.is_approved ? 'Reject' : 'Approve'}
                      </button>
                      <button
                        onClick={() => onDeleteTestimonial(row.id)}
                        className="ulac-btn-danger"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <p style={{ color: '#71717A', fontSize: '0.875rem', margin: 0 }}>
                      {q ? 'No testimonials matching your search' : 'No testimonials received yet'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
