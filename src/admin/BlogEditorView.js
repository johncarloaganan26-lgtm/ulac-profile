import React, { useState, useEffect } from 'react';
import { BLOG_CATEGORIES } from '../data/mockBlogs';
import { blogService } from '../services/blogService';

export default function BlogEditorView({
  initialBlog = null,
  onSave,
  onCancel
}) {
  const isEditing = Boolean(initialBlog);

  const [title, setTitle] = useState(initialBlog?.title || '');
  const [slug, setSlug] = useState(initialBlog?.slug || '');
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialBlog?.slug));
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt || '');
  const [coverImage, setCoverImage] = useState(
    initialBlog?.coverImage || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'
  );
  const [category, setCategory] = useState(initialBlog?.category || 'Web Development');
  const [tags, setTags] = useState(initialBlog?.tags || ['React', 'Frontend']);
  const [tagInput, setTagInput] = useState('');
  const [content, setContent] = useState(initialBlog?.content || '');
  const [status, setStatus] = useState(initialBlog?.status || 'Draft');

  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate slug from title unless manually edited
  useEffect(() => {
    if (!isSlugManual && title) {
      setSlug(blogService.slugify(title));
    }
  }, [title, isSlugManual]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) setErrors(prev => ({ ...prev, title: null }));
  };

  const handleSlugChange = (e) => {
    setIsSlugManual(true);
    setSlug(blogService.slugify(e.target.value));
    if (errors.slug) setErrors(prev => ({ ...prev, slug: null }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^#/, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, coverImage: 'Please select a valid image file.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCoverImage(event.target.result);
      setErrors(prev => ({ ...prev, coverImage: null }));
    };
    reader.readAsDataURL(file);
  };

  // Quick formatting toolbar insert helper
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('blog-content-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || 'text').length);
    }, 10);
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!slug.trim()) errs.slug = 'Slug is required';
    if (!excerpt.trim()) errs.excerpt = 'Excerpt is required';
    if (!content.trim()) errs.content = 'Article content is required';
    if (!coverImage.trim()) errs.coverImage = 'Cover image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (targetStatus) => {
    if (!validate()) return;

    setIsSubmitting(true);
    const blogData = {
      title,
      slug,
      excerpt,
      coverImage,
      category,
      tags,
      content,
      status: targetStatus || status,
      author: initialBlog?.author || 'John Carlo Aganan'
    };

    onSave(blogData);
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* ── Top Bar with Actions ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #22252B', paddingBottom: '1.25rem' }}>
        <div>
          <button
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: 0,
              fontFamily: 'inherit',
              marginBottom: '0.4rem'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#A1A1AA'}
          >
            ← Back to Blog Management
          </button>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={onCancel}
            className="ulac-btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('Draft')}
            className="ulac-btn-secondary"
            disabled={isSubmitting}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('Published')}
            className="ulac-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Publish Blog'}
          </button>
        </div>
      </div>

      {/* ── Editor Form ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Title Field */}
        <div className="ulac-card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label className="ulac-label" style={{ margin: 0 }}>BLOG TITLE *</label>
            <span style={{ fontSize: '0.72rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)' }}>
              {title.length} characters
            </span>
          </div>
          <input
            type="text"
            className="ulac-input"
            placeholder="e.g. Building My Developer Portfolio"
            value={title}
            onChange={handleTitleChange}
            style={{ fontSize: '1.1rem', fontWeight: 600 }}
          />
          {errors.title && <p style={{ fontSize: '0.75rem', color: '#FFFFFF', opacity: 0.8, margin: '0.35rem 0 0 0' }}>{errors.title}</p>}

          {/* Slug */}
          <div style={{ marginTop: '1rem' }}>
            <label className="ulac-label">SLUG (URL KEY) *</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#71717A', fontFamily: 'var(--font-mono, monospace)' }}>
                /blogs/
              </span>
              <input
                type="text"
                className="ulac-input"
                placeholder="building-my-developer-portfolio"
                value={slug}
                onChange={handleSlugChange}
                style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.825rem' }}
              />
            </div>
            {errors.slug && <p style={{ fontSize: '0.75rem', color: '#FFFFFF', opacity: 0.8, margin: '0.35rem 0 0 0' }}>{errors.slug}</p>}
          </div>
        </div>

        {/* Metadata: Category, Tags, Status */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {/* Category */}
          <div className="ulac-card" style={{ padding: '1.4rem' }}>
            <label className="ulac-label">CATEGORY *</label>
            <select
              className="ulac-select"
              style={{ width: '100%', padding: '0.65rem 0.85rem' }}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {BLOG_CATEGORIES.filter(c => c !== 'All Categories').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="ulac-card" style={{ padding: '1.4rem' }}>
            <label className="ulac-label">PUBLICATION STATUS</label>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setStatus('Draft')}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #22252B',
                  backgroundColor: status === 'Draft' ? '#171A1F' : 'transparent',
                  color: status === 'Draft' ? '#FFFFFF' : '#71717A',
                  cursor: 'pointer',
                  fontWeight: status === 'Draft' ? 600 : 400,
                  fontSize: '0.825rem',
                  transition: 'all 0.18s'
                }}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setStatus('Published')}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #22252B',
                  backgroundColor: status === 'Published' ? '#FFFFFF' : 'transparent',
                  color: status === 'Published' ? '#050607' : '#71717A',
                  cursor: 'pointer',
                  fontWeight: status === 'Published' ? 600 : 400,
                  fontSize: '0.825rem',
                  transition: 'all 0.18s'
                }}
              >
                Published
              </button>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div className="ulac-card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label className="ulac-label" style={{ margin: 0 }}>EXCERPT (SHORT SUMMARY) *</label>
            <span style={{ fontSize: '0.72rem', color: excerpt.length > 200 ? '#FFFFFF' : '#71717A', fontFamily: 'var(--font-mono, monospace)' }}>
              {excerpt.length}/200
            </span>
          </div>
          <textarea
            className="ulac-textarea"
            placeholder="A short summary of the article displayed on the blog card..."
            value={excerpt}
            onChange={e => {
              setExcerpt(e.target.value);
              if (errors.excerpt) setErrors(prev => ({ ...prev, excerpt: null }));
            }}
            rows={3}
            style={{ minHeight: '80px' }}
          />
          {errors.excerpt && <p style={{ fontSize: '0.75rem', color: '#FFFFFF', opacity: 0.8, margin: '0.35rem 0 0 0' }}>{errors.excerpt}</p>}
        </div>

        {/* Cover Image */}
        <div className="ulac-card" style={{ padding: '1.4rem' }}>
          <label className="ulac-label">COVER IMAGE *</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Image Preview Box */}
            <div style={{
              width: '180px',
              height: '110px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#111418',
              border: '1px solid #22252B',
              flexShrink: 0,
              position: 'relative'
            }}>
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Cover preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#71717A', fontSize: '0.75rem' }}>
                  No Image
                </div>
              )}
            </div>

            {/* Inputs: URL or File Upload */}
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div>
                <input
                  type="text"
                  className="ulac-input"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={e => {
                    setCoverImage(e.target.value);
                    if (errors.coverImage) setErrors(prev => ({ ...prev, coverImage: null }));
                  }}
                  style={{ fontSize: '0.825rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <label className="ulac-btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', cursor: 'pointer' }}>
                  <span>Upload Local File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {coverImage && (
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#71717A',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      padding: '0.45rem',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
          {errors.coverImage && <p style={{ fontSize: '0.75rem', color: '#FFFFFF', opacity: 0.8, margin: '0.35rem 0 0 0' }}>{errors.coverImage}</p>}
        </div>

        {/* Tags */}
        <div className="ulac-card" style={{ padding: '1.4rem' }}>
          <label className="ulac-label">TAGS (PRESS ENTER TO ADD)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.65rem' }}>
            {tags.map(tag => (
              <span
                key={tag}
                className="skill-tag"
                style={{ gap: '0.35rem' }}
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#71717A',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '0.8rem',
                    lineHeight: 1
                  }}
                  title="Remove tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            className="ulac-input"
            placeholder="Add a tag and press Enter..."
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            style={{ fontSize: '0.825rem' }}
          />
        </div>

        {/* Article Content & Lightweight Editor Toolbar */}
        <div className="ulac-card" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label className="ulac-label" style={{ margin: 0 }}>ARTICLE CONTENT *</label>

            {/* Write / Preview Tabs */}
            <div style={{ display: 'flex', border: '1px solid #22252B', borderRadius: '6px', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                style={{
                  backgroundColor: activeTab === 'write' ? '#171A1F' : 'transparent',
                  color: activeTab === 'write' ? '#FFFFFF' : '#71717A',
                  border: 'none',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                style={{
                  backgroundColor: activeTab === 'preview' ? '#171A1F' : 'transparent',
                  color: activeTab === 'preview' ? '#FFFFFF' : '#71717A',
                  border: 'none',
                  borderLeft: '1px solid #22252B',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                Preview
              </button>
            </div>
          </div>

          {activeTab === 'write' ? (
            <div>
              {/* Lightweight Formatting Toolbar */}
              <div style={{
                display: 'flex',
                gap: '0.35rem',
                flexWrap: 'wrap',
                padding: '0.45rem',
                backgroundColor: '#111418',
                border: '1px solid #22252B',
                borderRadius: '8px 8px 0 0',
                borderBottom: 'none'
              }}>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                  title="Heading 3"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', fontWeight: 700 }}
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', fontStyle: 'italic' }}
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                  title="Bullet List"
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('1. ')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                  title="Numbered List"
                >
                  1. List
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('`', '`')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)' }}
                  title="Inline Code"
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('```javascript\n', '\n```')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)' }}
                  title="Code Block"
                >
                  Block
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                  title="Quote"
                >
                  Quote
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('[Link Text](', ')')}
                  className="ulac-btn-secondary"
                  style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                  title="Link"
                >
                  Link
                </button>
              </div>

              <textarea
                id="blog-content-textarea"
                className="ulac-textarea"
                placeholder="Write your article in markdown or plain text..."
                value={content}
                onChange={e => {
                  setContent(e.target.value);
                  if (errors.content) setErrors(prev => ({ ...prev, content: null }));
                }}
                rows={14}
                style={{
                  borderRadius: '0 0 8px 8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  minHeight: '320px'
                }}
              />
            </div>
          ) : (
            /* Rendered Markdown Preview */
            <div style={{
              padding: '1.25rem',
              backgroundColor: '#111418',
              border: '1px solid #22252B',
              borderRadius: '8px',
              minHeight: '320px',
              color: '#FFFFFF',
              lineHeight: 1.7,
              fontSize: '0.9rem'
            }}>
              {content ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {content}
                </div>
              ) : (
                <p style={{ color: '#71717A', fontStyle: 'italic' }}>
                  No content written yet. Switch to the Write tab to begin drafting.
                </p>
              )}
            </div>
          )}
          {errors.content && <p style={{ fontSize: '0.75rem', color: '#FFFFFF', opacity: 0.8, margin: '0.35rem 0 0 0' }}>{errors.content}</p>}
        </div>

        {/* Bottom Submission Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <button
            type="button"
            onClick={onCancel}
            className="ulac-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('Draft')}
            className="ulac-btn-secondary"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('Published')}
            className="ulac-btn-primary"
          >
            {isEditing ? 'Update & Publish' : 'Publish Blog'}
          </button>
        </div>
      </div>
    </div>
  );
}
