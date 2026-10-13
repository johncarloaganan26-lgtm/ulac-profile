import React, { useState, useMemo } from 'react';
import { BLOG_CATEGORIES } from '../data/mockBlogs';

export default function BlogManagementView({
  blogs = [],
  onAddNew,
  onEditBlog,
  onPreviewBlog,
  onTogglePublish,
  onDeleteBlog,
  onResetBlogs
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [deleteModalBlog, setDeleteModalBlog] = useState(null);

  // Dynamic summary stats
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter(b => b.status === 'Published').length;
    const drafts = blogs.filter(b => b.status === 'Draft').length;
    const totalViews = blogs.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0);
    return { total, published, drafts, totalViews };
  }, [blogs]);

  // Combined Filtering & Sorting
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      // Search title, excerpt, tags
      const q = search.toLowerCase().trim();
      const matchSearch = !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        (blog.tags && blog.tags.some(t => t.toLowerCase().includes(q)));

      // Status filter
      const matchStatus = statusFilter === 'All' || blog.status === statusFilter;

      // Category filter
      const matchCategory = categoryFilter === 'All Categories' || blog.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'views') {
        return (Number(b.views) || 0) - (Number(a.views) || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [blogs, search, statusFilter, categoryFilter, sortBy]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (_) {
      return dateStr;
    }
  };

  const confirmDelete = () => {
    if (deleteModalBlog) {
      onDeleteBlog(deleteModalBlog.id);
      setDeleteModalBlog(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-label">
            CONTENT
          </div>
          <h1 style={{
            fontSize: '2.15rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            margin: 0
          }}>
            Blog Management
          </h1>
          <p style={{
            fontSize: '0.88rem',
            color: '#A1A1AA',
            margin: '0.35rem 0 0 0'
          }}>
            Create, organize, and manage your published content.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onAddNew}
            className="ulac-btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Blog
          </button>
        </div>
      </div>

      {/* ── Blog Summary Cards (4 Metrics) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.15rem'
      }}>
        {/* Total Blogs */}
        <div className="ulac-card" style={{ padding: '1.25rem 1.4rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Total Blogs
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.35rem', lineHeight: 1 }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#A1A1AA', marginTop: '0.4rem' }}>
            In your library
          </div>
        </div>

        {/* Published */}
        <div className="ulac-card" style={{ padding: '1.25rem 1.4rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Published
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.35rem', lineHeight: 1 }}>
            {stats.published}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#A1A1AA', marginTop: '0.4rem' }}>
            Live on site
          </div>
        </div>

        {/* Drafts */}
        <div className="ulac-card" style={{ padding: '1.25rem 1.4rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Drafts
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.35rem', lineHeight: 1 }}>
            {stats.drafts}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#A1A1AA', marginTop: '0.4rem' }}>
            Work in progress
          </div>
        </div>

        {/* Total Views */}
        <div className="ulac-card" style={{ padding: '1.25rem 1.4rem' }}>
          <div style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Total Views
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.35rem', lineHeight: 1 }}>
            {stats.totalViews >= 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#A1A1AA', marginTop: '0.4rem' }}>
            Article readers
          </div>
        </div>
      </div>

      {/* ── Search and Filters Toolbar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
        padding: '0.85rem 1rem',
        backgroundColor: '#0B0D10',
        border: '1px solid #22252B',
        borderRadius: '12px'
      }}>
        {/* Left: Search input */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '340px' }}>
          <svg
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="ulac-search-input"
            style={{ borderRadius: '8px', padding: '0.5rem 0.8rem 0.5rem 2.2rem', backgroundColor: '#111418' }}
            placeholder="Search titles, tags, excerpts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Right: Status filter, Category filter, Sorting, View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* Status Filter */}
          <select
            className="ulac-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Drafts</option>
          </select>

          {/* Category Filter */}
          <select
            className="ulac-select"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            {BLOG_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Sorting */}
          <select
            className="ulac-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="views">Most viewed</option>
            <option value="title">Title A–Z</option>
          </select>

          {/* View Toggle (Grid / List) */}
          <div style={{ display: 'flex', border: '1px solid #22252B', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? '#171A1F' : 'transparent',
                color: viewMode === 'grid' ? '#FFFFFF' : '#71717A',
                border: 'none',
                padding: '0.45rem 0.65rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? '#171A1F' : 'transparent',
                color: viewMode === 'list' ? '#FFFFFF' : '#71717A',
                border: 'none',
                borderLeft: '1px solid #22252B',
                padding: '0.45rem 0.65rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="List View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Content View: Grid or List ── */}
      {filteredBlogs.length === 0 ? (
        <div className="ulac-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
            No blogs found
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#71717A', margin: '0.45rem 0 1.25rem 0' }}>
            {search || statusFilter !== 'All' || categoryFilter !== 'All Categories'
              ? 'Try adjusting your search criteria or resetting the filters.'
              : 'You have not created any blog posts yet.'}
          </p>
          {(search || statusFilter !== 'All' || categoryFilter !== 'All Categories') && (
            <button
              onClick={() => { setSearch(''); setStatusFilter('All'); setCategoryFilter('All Categories'); }}
              className="ulac-btn-secondary"
              style={{ fontSize: '0.8rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        /* ── Instagram-Inspired Grid View (3 columns desktop, 2 tablets, 1 mobile) ── */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredBlogs.map(blog => {
            const isMenuOpen = activeMenuId === blog.id;
            return (
              <div
                key={blog.id}
                className="ulac-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Cover Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 Aspect Ratio
                  backgroundColor: '#111418',
                  overflow: 'hidden'
                }}>
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />

                  {/* Status Badge in Upper-Left */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className={`ulac-badge ${blog.status === 'Published' ? 'ulac-badge-published' : 'ulac-badge-draft'}`}>
                      {blog.status}
                    </span>
                  </div>

                  {/* Actions Menu in Upper-Right */}
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(isMenuOpen ? null : blog.id);
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(5, 6, 7, 0.75)',
                        border: '1px solid #22252B',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)',
                        transition: 'background-color 0.18s'
                      }}
                      title="More actions"
                      aria-label="More actions"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          right: 0,
                          backgroundColor: '#0B0D10',
                          border: '1px solid #22252B',
                          borderRadius: '8px',
                          padding: '0.35rem',
                          minWidth: '150px',
                          zIndex: 30,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.85)'
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => { setActiveMenuId(null); onPreviewBlog(blog.id); }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '0.45rem 0.65rem',
                            fontSize: '0.78rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#171A1F'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          👁 View / Preview
                        </button>
                        <button
                          onClick={() => { setActiveMenuId(null); onEditBlog(blog.id); }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '0.45rem 0.65rem',
                            fontSize: '0.78rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#171A1F'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          ✎ Edit
                        </button>
                        <button
                          onClick={() => { setActiveMenuId(null); onTogglePublish(blog.id); }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            color: '#A1A1AA',
                            padding: '0.45rem 0.65rem',
                            fontSize: '0.78rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#171A1F'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {blog.status === 'Published' ? '○ Unpublish' : '● Publish'}
                        </button>
                        <button
                          onClick={() => { setActiveMenuId(null); setDeleteModalBlog(blog); }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            color: '#A1A1AA',
                            padding: '0.45rem 0.65rem',
                            fontSize: '0.78rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            borderTop: '1px solid #22252B',
                            marginTop: '0.2rem'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#171A1F';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#A1A1AA';
                          }}
                        >
                          ✕ Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    {/* Category & Tags Chips */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                      <span className="chip-border">
                        {blog.category}
                      </span>
                      {blog.tags && blog.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="skill-tag"
                          style={{ padding: '0.15rem 0.45rem', fontSize: '0.625rem' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onPreviewBlog(blog.id)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        margin: '0 0 0.5rem 0',
                        lineHeight: 1.35,
                        cursor: 'pointer',
                        transition: 'opacity 0.18s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      {blog.title}
                    </h3>

                    {/* Short Excerpt */}
                    <p style={{
                      fontSize: '0.825rem',
                      color: '#A1A1AA',
                      lineHeight: 1.5,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author, Date, Views count */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    marginTop: '1.1rem',
                    borderTop: '1px solid #22252B',
                    fontSize: '0.75rem',
                    color: '#71717A'
                  }}>
                    <div>
                      {formatDate(blog.createdAt)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>{blog.views || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Blog List / Table View ── */
        <div className="ulac-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px', fontSize: '0.835rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#111418', borderBottom: '1px solid #22252B' }}>
                  {['BLOG TITLE', 'CATEGORY', 'STATUS', 'AUTHOR', 'UPDATED', 'VIEWS', 'ACTIONS'].map(h => (
                    <th key={h} style={{
                      padding: '0.85rem 1.1rem',
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
                {filteredBlogs.map(blog => (
                  <tr
                    key={blog.id}
                    style={{ borderBottom: '1px solid #22252B', transition: 'background-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#111418'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '0.95rem 1.1rem', maxWidth: '300px' }}>
                      <div
                        onClick={() => onPreviewBlog(blog.id)}
                        style={{ fontWeight: 600, color: '#FFFFFF', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {blog.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#71717A', marginTop: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {blog.excerpt}
                      </div>
                    </td>
                    <td style={{ padding: '0.95rem 1.1rem', color: '#A1A1AA' }}>
                      {blog.category}
                    </td>
                    <td style={{ padding: '0.95rem 1.1rem' }}>
                      <span className={`ulac-badge ${blog.status === 'Published' ? 'ulac-badge-published' : 'ulac-badge-draft'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.95rem 1.1rem', color: '#71717A' }}>
                      {blog.author}
                    </td>
                    <td style={{ padding: '0.95rem 1.1rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
                      {formatDate(blog.updatedAt || blog.createdAt)}
                    </td>
                    <td style={{ padding: '0.95rem 1.1rem', color: '#FFFFFF', fontWeight: 600 }}>
                      {blog.views || 0}
                    </td>
                    <td style={{ padding: '0.95rem 1.1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          onClick={() => onPreviewBlog(blog.id)}
                          className="ulac-btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          title="Preview"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onEditBlog(blog.id)}
                          className="ulac-btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onTogglePublish(blog.id)}
                          className="ulac-btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          title={blog.status === 'Published' ? 'Unpublish' : 'Publish'}
                        >
                          {blog.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => setDeleteModalBlog(blog)}
                          className="ulac-btn-danger"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteModalBlog && (
        <div className="ulac-modal-backdrop" onClick={() => setDeleteModalBlog(null)}>
          <div className="ulac-modal" onClick={e => e.stopPropagation()} style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Confirm Deletion
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#A1A1AA', margin: '0.75rem 0 1.25rem 0', lineHeight: 1.5 }}>
              Are you sure you want to delete <strong style={{ color: '#FFFFFF' }}>"{deleteModalBlog.title}"</strong>?
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setDeleteModalBlog(null)}
                className="ulac-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="ulac-btn-primary"
                style={{ backgroundColor: '#FFFFFF', color: '#050607' }}
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
