const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.js');
const content = fs.readFileSync(appPath, 'utf8');

const lines = content.split('\n');

// Find line where `if (view === 'mis') {` starts
const startIndex = lines.findIndex(line => line.trim() === "if (view === 'mis') {");
// Find line where `// Portfolio Layout` starts
const portfolioIndex = lines.findIndex(line => line.includes("// Portfolio Layout"));

if (startIndex === -1 || portfolioIndex === -1) {
  console.error("Could not find delimiters", { startIndex, portfolioIndex });
  process.exit(1);
}

// Find the closing brace of the `if (view === 'mis')` right before portfolio layout
let endIndex = -1;
for (let i = portfolioIndex - 1; i >= startIndex; i--) {
  if (lines[i].trim() === '}') {
    endIndex = i;
    break;
  }
}

console.log(`Replacing from line ${startIndex + 1} to line ${endIndex + 1}`);

const replacement = `  // ─────────────────────────────────────────────────────────
  // MIS View — Ulacdev Monochrome Administration Console
  // ─────────────────────────────────────────────────────────
  if (view === 'mis') {
    if (!isLoggedIn) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#050607', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'var(--font-body)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.178 8c5.096 0 5.096 8 0 8-2.67 0-4.655-4.223-6.178-8-1.523 3.777-3.508 8-6.178 8-5.096 0-5.096-8 0-8 2.67 0 4.655 4.223 6.178 8 1.523-3.777 3.508-8 6.178-8z" />
              </svg>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>Ulacdev MIS</h1>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Management Console</p>
          </div>

          <div style={{ width: '100%', maxWidth: '380px', padding: '2.25rem 2rem', backgroundColor: '#0B0D10', border: '1px solid #22252B', borderRadius: '14px', boxSizing: 'border-box' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#A1A1AA', marginBottom: '0.45rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>USERNAME OR EMAIL</label>
                  <input
                    type="text"
                    placeholder="ulac"
                    value={loginForm.email}
                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: '#111418',
                      border: '1px solid #22252B',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'var(--font-body)'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#FFFFFF'; }}
                    onBlur={e => { e.target.style.borderColor = '#22252B'; }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#A1A1AA', marginBottom: '0.45rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>PASSWORD</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: '#111418',
                      border: '1px solid #22252B',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'var(--font-body)'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#FFFFFF'; }}
                    onBlur={e => { e.target.style.borderColor = '#22252B'; }}
                    required
                  />
                </div>
              </div>

              {loginError && <p style={{ fontSize: '0.8125rem', color: '#FFFFFF', opacity: 0.85, margin: 0 }}>{loginError}</p>}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#FFFFFF',
                  color: '#050607',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.18s',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E4E4E7'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setView('portfolio'); window.location.hash = ''; if (window.location.pathname === '/ulac' || window.location.pathname.startsWith('/admin')) window.history.pushState({}, '', '/'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#71717A',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.18s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
              >
                ← Back to portfolio
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
        inquiries={inquiries}
        testimonials={testimonials}
        totalViews={totalViews}
        onDeleteInquiry={deleteInquiry}
        onToggleApproval={toggleTestimonialApproval}
        onDeleteTestimonial={deleteTestimonial}
        onRefreshData={handleAdminRefreshAll}
        isRefreshing={isRefreshing}
      />
    );
  }`;

const updatedLines = [
  ...lines.slice(0, startIndex),
  replacement,
  ...lines.slice(endIndex + 1)
];

fs.writeFileSync(appPath, updatedLines.join('\n'), 'utf8');
console.log("Successfully updated App.js with AdminDashboard!");
