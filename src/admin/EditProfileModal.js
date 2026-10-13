import React, { useState } from 'react';

export default function EditProfileModal({
  user,
  onSave,
  onClose
}) {
  const [name, setName] = useState(user?.name || 'John Carlo Aganan');
  const [username, setUsername] = useState(user?.username || 'ulacdev');
  const [email, setEmail] = useState(user?.email || 'johncarloaganan26@gmail.com');
  const [bio, setBio] = useState(user?.bio || 'Full-Stack Developer, UI/UX Designer & System Architect.');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      name,
      username,
      email,
      bio
    });
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="ulac-modal-backdrop" onClick={onClose}>
      <div className="ulac-modal" onClick={e => e.stopPropagation()} style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Edit Admin Profile
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#71717A', margin: '0.2rem 0 0 0' }}>
              Update your account details and portfolio persona.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#71717A',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: 0
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Avatar Preview */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', padding: '0.85rem', backgroundColor: '#111418', borderRadius: '8px', border: '1px solid #22252B' }}>
            <img
              src="/new-pfp.jpg"
              alt="Avatar"
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => { e.target.onerror = null; e.target.src = '/me.jpg'; }}
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF' }}>Profile Picture</div>
              <div style={{ fontSize: '0.72rem', color: '#71717A' }}>Synced with /new-pfp.jpg asset</div>
            </div>
          </div>

          <div className="ulac-form-group">
            <label className="ulac-label">FULL NAME</label>
            <input
              type="text"
              className="ulac-input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="ulac-form-group">
            <label className="ulac-label">USERNAME</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#71717A', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>@</span>
              <input
                type="text"
                className="ulac-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="ulac-form-group">
            <label className="ulac-label">CONTACT EMAIL</label>
            <input
              type="email"
              className="ulac-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="ulac-form-group">
            <label className="ulac-label">SHORT BIO</label>
            <textarea
              className="ulac-textarea"
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{ minHeight: '75px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="ulac-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ulac-btn-primary"
            >
              {isSaved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
