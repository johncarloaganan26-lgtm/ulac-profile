import React from 'react';

export default function BlogPreviewView({
  blog,
  onBack,
  onEdit,
  onTogglePublish
}) {
  if (!blog) {
    return (
      <div className="ulac-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2 style={{ color: '#FFFFFF', margin: 0 }}>Blog Not Found</h2>
        <p style={{ color: '#71717A', margin: '0.5rem 0 1.5rem 0' }}>The requested blog post could not be loaded.</p>
        <button onClick={onBack} className="ulac-btn-primary">
          Back to Blogs
        </button>
      </div>
    );
  }

  const isDraft = blog.status === 'Draft';

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (_) {
      return dateStr;
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* ── Navigation & Actions Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem', borderBottom: '1px solid #22252B', paddingBottom: '1rem' }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#A1A1AA',
            fontSize: '0.825rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: 0,
            fontFamily: 'inherit'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
          onMouseLeave={e => e.currentTarget.style.color = '#A1A1AA'}
        >
          ← Back to Blog Management
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => onTogglePublish(blog.id)}
            className="ulac-btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.9rem' }}
          >
            {isDraft ? 'Publish Post' : 'Unpublish Post'}
          </button>
          <button
            onClick={() => onEdit(blog.id)}
            className="ulac-btn-primary"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
          >
            ✎ Edit Blog
          </button>
        </div>
      </div>

      {/* ── Draft Warning Banner ── */}
      {isDraft && (
        <div style={{
          backgroundColor: '#111418',
          border: '1px solid #22252B',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          color: '#A1A1AA',
          fontSize: '0.825rem'
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 600 }}>[DRAFT PREVIEW]</span>
          <span>This article is currently an unpublished draft and is not visible to public visitors.</span>
        </div>
      )}

      {/* ── Main Article Layout ── */}
      <article className="ulac-card" style={{ padding: '2rem 2.25rem', overflow: 'hidden' }}>
        {/* Cover Image */}
        {blog.coverImage && (
          <div style={{
            width: '100%',
            height: '360px',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#111418',
            marginBottom: '1.75rem'
          }}>
            <img
              src={blog.coverImage}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop';
              }}
            />
          </div>
        )}

        {/* Metadata Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span className={!isDraft ? 'chip-inverted' : 'chip-border'}>
            {blog.status}
          </span>
          <span className="chip-border">
            {blog.category}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#71717A', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
            {formatDate(blog.createdAt)}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          lineHeight: 1.25,
          margin: '0 0 1rem 0'
        }}>
          {blog.title}
        </h1>

        {/* Author info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid #22252B' }}>
          <img
            src="/new-pfp.jpg"
            alt={blog.author}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #22252B' }}
            onError={(e) => { e.target.onerror = null; e.target.src = '/me.jpg'; }}
          />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>
              {blog.author || 'John Carlo Aganan'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)' }}>
              Developer & Creator • {blog.views || 0} views
            </div>
          </div>
        </div>

        {/* Lead Excerpt */}
        <p style={{
          fontSize: '1.05rem',
          lineHeight: 1.6,
          color: '#D4D4D8',
          fontStyle: 'italic',
          borderLeft: '2px solid #52525B',
          paddingLeft: '1rem',
          margin: '0 0 2rem 0'
        }}>
          {blog.excerpt}
        </p>

        {/* Formatted Article Body */}
        <div style={{
          fontSize: '0.95rem',
          lineHeight: 1.75,
          color: '#FFFFFF',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {blog.content}
        </div>

        {/* Tags footer */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid #22252B', display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {blog.tags.map(tag => (
              <span key={tag} className="skill-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
