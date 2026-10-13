import React from 'react';

export default function InquiriesView({
  inquiries = [],
  onDeleteInquiry,
  searchQuery = ''
}) {
  const q = searchQuery.toLowerCase().trim();
  const filtered = q ? inquiries.filter(r =>
    (r.name && r.name.toLowerCase().includes(q)) ||
    (r.email && r.email.toLowerCase().includes(q)) ||
    (r.subject && r.subject.toLowerCase().includes(q)) ||
    (r.message && r.message.toLowerCase().includes(q))
  ) : inquiries;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (_) {
      return dateStr;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div className="section-label">
          INQUIRIES
        </div>
        <h1 style={{
          fontSize: '2.15rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: '#FFFFFF',
          margin: 0
        }}>
          Inquiries
        </h1>
        <p style={{
          fontSize: '0.88rem',
          color: '#A1A1AA',
          margin: '0.35rem 0 0 0'
        }}>
          Review and respond to inquiries submitted through your portfolio contact form.
        </p>
      </div>

      <div className="ulac-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', fontSize: '0.835rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#111418', borderBottom: '1px solid #22252B' }}>
                {['SENDER', 'SUBJECT', 'MESSAGE', 'DATE', 'ACTION'].map(h => (
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
                    <div style={{ fontSize: '0.75rem', color: '#71717A', marginTop: '0.15rem' }}>{row.email}</div>
                  </td>
                  <td style={{ padding: '1rem 1.15rem', color: '#FFFFFF', fontWeight: 500 }}>
                    {row.subject}
                  </td>
                  <td style={{ padding: '1rem 1.15rem', color: '#A1A1AA', maxWidth: '340px', lineHeight: 1.5 }}>
                    {row.message}
                  </td>
                  <td style={{ padding: '1rem 1.15rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                    {formatDate(row.created_at)}
                  </td>
                  <td style={{ padding: '1rem 1.15rem' }}>
                    <button
                      onClick={() => onDeleteInquiry(row.id)}
                      className="ulac-btn-danger"
                      title="Delete inquiry"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <p style={{ color: '#71717A', fontSize: '0.875rem', margin: 0 }}>
                      {q ? 'No inquiries matching your search' : 'No inquiries received yet'}
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
