import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';
import {
  FaEnvelope, FaMapMarkerAlt, FaCode, FaMoon, FaSun,
  FaLinkedin, FaBars, FaTimes, FaGithub, FaCalendarAlt,
  FaChevronRight, FaChevronLeft, FaStar, FaLaptopCode,
  FaCheck, FaCheckCircle, FaUser, FaLock, FaExternalLinkAlt,
  FaQuoteRight, FaDesktop
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

import project1Image from './Screenshot 2026-01-28 035743.png';
import project2Image from './Screenshot 2026-01-31 091212.png';
import project3Image from './Screenshot 2026-02-27 090848.png';
import project4Image from './startuplab-event-creation.png';
import bigbrewPOSImage from './bigbrew-pos.png';
import artisanoImage from './artisano-pizzeria.png';
import nagcoDashboardImage from './nagco-dashboard.png';
import medflowImage from './medflow_new.png';
import laundrosaasImage from './laundry_new.png';
import dsaImage from './dsa.jpg';
import dormpulseImage from './dormpulse.png';

// ─────────────────────────────────────────────────────────────
// Terminal Typing Shell Mockup
// ─────────────────────────────────────────────────────────────
const TerminalMock = ({ isDark }) => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const script = [
      { type: 'cmd', text: 'ulac@dev:~$ cat info.json' },
      { type: 'out', text: '{\n  "name": "John Carlo Aganan",\n  "role": "Full-Stack Developer",\n  "status": "Available for work"\n}' },
      { type: 'cmd', text: 'ulac@dev:~$ █' }
    ];
    let idx = 0;
    let timer;
    const next = () => {
      if (idx < script.length) {
        setLines(p => [...p, script[idx++]]);
        timer = setTimeout(next, 750);
      }
    };
    next();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      background: isDark ? '#18181b' : '#0a0a0a',
      border: `1px solid ${isDark ? '#2a2a30' : '#1e1e22'}`,
      borderRadius: '8px',
      padding: '1.25rem 1.5rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8125rem',
      lineHeight: 1.7,
      minHeight: '200px'
    }}>
      {/* Terminal bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${isDark ? '#2a2a30' : '#262626'}` }}>
        {['#3a3a42', '#3a3a42', '#3a3a42'].map((c, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: '0.5rem', fontSize: '0.625rem', color: '#525252', letterSpacing: '0.08em' }}>ulac@dev — bash</span>
      </div>
      {/* Lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {lines.map((l, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', color: l.type === 'cmd' ? '#e4e4ec' : '#737373' }}>
            {l.text}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Recommendation Slider
// ─────────────────────────────────────────────────────────────
const RecommendationSlider = ({ testimonials }) => {
  const [idx, setIdx] = useState(0);
  const approved = testimonials.filter(t => t.is_approved);

  useEffect(() => {
    if (approved.length <= 1) return;
    const t = setInterval(() => setIdx(p => (p + 1) % approved.length), 6000);
    return () => clearInterval(t);
  }, [approved.length]);

  if (approved.length === 0) return (
    <div style={{ padding: '3rem 1.5rem', textAlign: 'center', border: '1px solid var(--gray-200)', borderRadius: '8px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>No reviews yet — be the first</p>
    </div>
  );

  const cur = approved[idx];
  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          style={{
            border: '1px solid var(--gray-200)',
            borderRadius: '8px',
            padding: '1.75rem',
            background: 'var(--surface-subtle, var(--gray-50))'
          }}
        >
          <p style={{ fontSize: '0.9375rem', lineHeight: '1.75', color: 'var(--gray-600)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            "{cur.content}"
          </p>
          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>{cur.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{cur.role}</div>
          </div>
        </motion.div>
      </AnimatePresence>
      {approved.length > 1 && (
        <div style={{ display: 'flex', gap: '6px', marginTop: '1rem', justifyContent: 'center' }}>
          {approved.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? '16px' : '6px',
                height: '6px',
                background: i === idx ? 'var(--ink)' : 'var(--gray-300)',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Gallery Component
// ─────────────────────────────────────────────────────────────
const Gallery = () => {
  const images = ['/me.jpg', '/gal2.jpg', '/gal3.jpg', '/gal4.jpg', '/gall.jpg', '/thesis.jpg', '/baby.jpg', '/baby2.jpg', '/bb.jpg'];
  const ref = useRef(null);

  const scroll = dir => {
    if (!ref.current) return;
    const amt = ref.current.clientWidth * 0.75;
    ref.current.scrollTo({ left: ref.current.scrollLeft + (dir === 'left' ? -amt : amt), behavior: 'smooth' });
  };

  return (
    <section id="gallery" style={{ padding: '5rem 0', borderTop: '1px solid var(--gray-200)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <div className="section-label">08 — Gallery</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}>Life & Work</h2>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['left', 'right'].map(d => (
            <button key={d} onClick={() => scroll(d)} style={{
              width: 32, height: 32,
              border: '1px solid var(--gray-300)',
              background: 'transparent',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gray-500)',
              transition: 'border-color 0.2s, color 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.color = 'var(--gray-500)'; }}
            >
              {d === 'left' ? <FaChevronLeft size={11} /> : <FaChevronRight size={11} />}
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="no-scrollbar" style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        {images.map((src, i) => (
          <div key={i} style={{
            flex: '0 0 240px',
            aspectRatio: '4/3',
            borderRadius: '7px',
            border: '1px solid var(--gray-200)',
            overflow: 'hidden',
            scrollSnapAlign: 'start',
            background: 'var(--gray-100)',
            transition: 'border-color 0.25s'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gray-400)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
          >
            <img src={src} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', transition: 'filter 0.3s, transform 0.4s' }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(15%)'; e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// Theme Toggle Capsule Component
// ─────────────────────────────────────────────────────────────
const ThemeToggleCapsule = ({ theme, setTheme }) => {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'var(--gray-100)',
      border: '1px solid var(--gray-200)',
      borderRadius: '9999px',
      padding: '3px',
      gap: '3px',
      width: 'fit-content'
    }}>
      {[
        { value: 'system', icon: <FaDesktop size={11} />, title: 'System preference' },
        { value: 'light', icon: <FaSun size={11} />, title: 'Light theme' },
        { value: 'dark', icon: <FaMoon size={11} />, title: 'Dark theme' }
      ].map(opt => {
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            title={opt.title}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: 'none',
              background: active ? 'var(--bg)' : 'transparent',
              color: active ? 'var(--ink)' : 'var(--gray-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s ease',
              outline: 'none',
              padding: 0
            }}
            onMouseEnter={e => { if(!active) e.currentTarget.style.color = 'var(--ink)'; }}
            onMouseLeave={e => { if(!active) e.currentTarget.style.color = 'var(--gray-400)'; }}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main App Component
// ─────────────────────────────────────────────────────────────
function App() {
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [view, setView] = useState('portfolio');
  const [misView, setMisView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' });
  const [totalViews, setTotalViews] = useState(0);
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [feedbackData, setFeedbackData] = useState({ name: '', email: '', role: '', content: '', rating: 5 });
  const [feedbackStatus, setFeedbackStatus] = useState({ loading: false, success: false });
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return 'system';
  });
  const [resolvedDark, setResolvedDark] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply theme
  useEffect(() => {
    const resolveTheme = () => {
      let active = false;
      if (theme === 'dark') {
        active = true;
      } else if (theme === 'light') {
        active = false;
      } else {
        active = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      document.documentElement.setAttribute('data-theme', active ? 'dark' : 'light');
      setResolvedDark(active);
    };

    resolveTheme();
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => resolveTheme();
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [theme]);

  useEffect(() => {
    const r = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  // Custom cursor
  useEffect(() => {
    const move = e => setMousePos({ x: e.clientX, y: e.clientY });
    const check = e => {
      const t = e.target;
      setIsPointer(!!(t && (
        window.getComputedStyle(t).cursor === 'pointer' ||
        t.tagName === 'BUTTON' || t.tagName === 'A' ||
        t.closest('a') || t.closest('button')
      )));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', check);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', check); };
  }, []);

  useEffect(() => {
    const handleLocation = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (p === '/ulac' || h === '#login') setView('mis');
      else setView('portfolio');
    };
    const master = localStorage.getItem('ulac_session');
    if (master) { const u = JSON.parse(master); setUser(u); setIsLoggedIn(true); }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { setUser(session.user); setIsLoggedIn(true); }
      else if (!master) setIsLoggedIn(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) { setUser(session.user); setIsLoggedIn(true); }
      else if (!localStorage.getItem('ulac_session')) { setIsLoggedIn(false); setUser(null); }
    });

    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    handleLocation();
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    setLoginError('');
    if (loginForm.email === 'ulac' && loginForm.password === 'ulac') {
      const u = { email: 'ulac', id: 'master-admin' };
      setIsLoggedIn(true); setUser(u);
      localStorage.setItem('ulac_session', JSON.stringify(u));
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: loginForm.email, password: loginForm.password });
    if (error) setLoginError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('ulac_session');
    setIsLoggedIn(false); setUser(null); setView('portfolio');
    window.location.hash = '';
    if (window.location.pathname === '/ulac') window.history.pushState({}, '', '/');
  };

  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });
    try {
      const { error } = await supabase.from('inquiries').insert([{
        name: formData.name, email: formData.email,
        subject: currentService?.title || 'General Inquiry',
        message: formData.message, status: 'Pending'
      }]);
      if (error) throw error;
      try {
        const BASE = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
        await fetch(`${BASE}/api/contact`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email, subject: currentService?.title || 'General Inquiry', message: formData.message })
        });
      } catch (_) {}
      setFormStatus({ loading: false, success: true, error: false, message: 'Message sent. Thank you!' });
      setFormData({ name: '', email: '', message: '' });
      if (isLoggedIn) fetchInquiries();
      setTimeout(() => setFormStatus({ ...formStatus, success: false }), 5000);
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: true, message: err.message || 'Something went wrong.' });
    }
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (!error) setInquiries(data);
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (!error) setTestimonials(data);
  };

  const toggleTestimonialApproval = async (id, cur) => {
    const { error } = await supabase.from('testimonials').update({ is_approved: !cur }).eq('id', id);
    if (!error) {
      if (!cur) {
        const t = testimonials.find(t => t.id === id);
        if (t?.email) {
          try {
            const BASE = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
            await fetch(`${BASE}/api/testimonial-approved`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: t.name, email: t.email, frontendUrl: window.location.origin }) });
          } catch (_) {}
        }
      }
      fetchTestimonials();
    }
  };

  const deleteInquiry = async id => {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) fetchInquiries();
  };

  const deleteTestimonial = async id => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) fetchTestimonials();
  };

  const handleFeedbackSubmit = async e => {
    e.preventDefault();
    setFeedbackStatus({ loading: true, success: false });
    try {
      const { error } = await supabase.from('testimonials').insert([{
        name: feedbackData.name, email: feedbackData.email,
        role: feedbackData.role, content: feedbackData.content,
        rating: feedbackData.rating, is_approved: false
      }]);
      if (error) throw error;
      try {
        const BASE = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
        await fetch(`${BASE}/api/testimonial-thanks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: feedbackData.name, email: feedbackData.email, rating: feedbackData.rating, content: feedbackData.content }) });
      } catch (_) {}
      setFeedbackStatus({ loading: false, success: true });
      setFeedbackData({ name: '', email: '', role: '', content: '', rating: 5 });
      setTimeout(() => { setIsFeedbackModalOpen(false); setFeedbackStatus({ loading: false, success: false }); }, 3000);
    } catch (err) {
      alert('Error: ' + err.message);
      setFeedbackStatus({ loading: false, success: false });
    }
  };

  useEffect(() => {
    fetchTestimonials();
    if (isLoggedIn) fetchInquiries();
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setTimeout(() => setPreloaderRemoved(true), 600);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    ['hero', 'about', 'services', 'experience', 'projects', 'credentials', 'gallery', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const { data, error } = await supabase.from('site_stats').select('views_count').eq('id', 1).single();
        if (data && !error) {
          const n = data.views_count + 1;
          setTotalViews(n);
          await supabase.from('site_stats').update({ views_count: n }).eq('id', 1);
        }
      } catch (_) {}
    };
    fetchViews();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div style={{ height: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader" />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // MIS View
  // ─────────────────────────────────────────────────────────
  if (view === 'mis') {
    if (!isLoggedIn) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Management Console</p>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>JC Admin</h1>
          </div>
          <div style={{ width: '100%', maxWidth: '360px', border: '1px solid var(--gray-200)', borderRadius: '10px', padding: '2rem', background: 'var(--gray-50)' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" placeholder="Username or email" value={loginForm.email}
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="form-input" required />
                <input type="password" placeholder="Password" value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="form-input" required />
              </div>
              {loginError && <p style={{ fontSize: '0.8125rem', color: '#dc2626' }}>{loginError}</p>}
              <button type="submit" className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>Sign in</button>
              <button type="button" onClick={() => { setView('portfolio'); window.location.hash = ''; if (window.location.pathname === '/ulac') window.history.pushState({}, '', '/'); }}
                style={{ background: 'none', border: 'none', color: 'var(--gray-500)', fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                ← Back to portfolio
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: 'var(--font-body)' }}>
        <div className="mis-sidebar" style={{ width: isMobile ? '100%' : '220px', padding: '2rem 1.5rem', display: 'flex', flexDirection: isMobile ? 'row' : 'column', justifyContent: 'space-between', alignItems: isMobile ? 'center' : 'stretch', gap: '1.5rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Console</p>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.25rem', letterSpacing: '-0.02em' }}>JC MIS</h2>
          </div>
          {isMobile ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select value={misView} onChange={e => setMisView(e.target.value)} style={{ background: 'var(--gray-100)', color: 'var(--ink)', border: '1px solid var(--gray-200)', padding: '0.35rem 0.6rem', borderRadius: '5px', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                {['dashboard', 'inquiries', 'testimonials'].map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
              </select>
              <button onClick={handleLogout} style={{ border: '1px solid var(--gray-300)', background: 'transparent', color: 'var(--ink)', padding: '0.35rem 0.7rem', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '5px', fontFamily: 'var(--font-mono)' }}>EXIT</button>
            </div>
          ) : (
            <>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '1.5rem' }}>
                {['dashboard', 'inquiries', 'testimonials'].map(m => (
                  <button key={m} onClick={() => setMisView(m)} style={{
                    background: misView === m ? 'var(--ink)' : 'transparent',
                    color: misView === m ? 'var(--bg)' : 'var(--gray-500)',
                    border: 'none', textAlign: 'left', fontSize: '0.75rem', fontWeight: 500,
                    textTransform: 'uppercase', cursor: 'pointer', padding: '0.6rem 0.8rem',
                    borderRadius: '5px', transition: 'all 0.2s', letterSpacing: '0.08em',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {m}
                  </button>
                ))}
              </nav>
              <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid var(--gray-300)', color: 'var(--ink)', padding: '0.6rem', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', borderRadius: '5px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Sign Out
              </button>
            </>
          )}
        </div>

        <div style={{ flex: 1, padding: isMobile ? '1.5rem' : '3rem' }}>
          <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--gray-200)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Management</p>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'capitalize', marginTop: '0.25rem' }}>{misView}</h1>
            </div>

            {misView === 'dashboard' && (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1rem' }}>
                {[
                  { label: 'Total Inquiries', value: inquiries.length },
                  { label: 'Approved Reviews', value: testimonials.filter(t => t.is_approved).length },
                  { label: 'Site Views', value: totalViews }
                ].map((s, i) => (
                  <div key={i} className="card-glass" style={{ padding: '1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '0.4rem', letterSpacing: '-0.03em' }}>{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {misView === 'inquiries' && (
              <div style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', overflowX: 'auto' }}>
                <table className="mis-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--gray-50)' }}>
                      {['Sender', 'Subject', 'Message', 'Action'].map(h => (
                        <th key={h} style={{ padding: '0.9rem 1rem', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length > 0 ? inquiries.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ fontWeight: 600 }}>{row.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{row.email}</div>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', color: 'var(--gray-600)' }}>{row.subject}</td>
                        <td style={{ padding: '0.9rem 1rem', color: 'var(--gray-500)', maxWidth: '280px' }}>{row.message}</td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <button onClick={() => deleteInquiry(row.id)} style={{ background: 'none', border: 'none', color: '#dc2626', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'var(--font-body)' }}>Delete</button>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={4} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--gray-400)' }}>No inquiries yet</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {misView === 'testimonials' && (
              <div style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', overflowX: 'auto' }}>
                <table className="mis-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--gray-50)' }}>
                      {['Client', 'Review', 'Status', 'Action'].map(h => (
                        <th key={h} style={{ padding: '0.9rem 1rem', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.length > 0 ? testimonials.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ fontWeight: 600 }}>{row.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{row.role}</div>
                        </td>
                        <td style={{ padding: '0.9rem 1rem', color: 'var(--gray-500)', maxWidth: '280px' }}>{row.content}</td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: row.is_approved ? '#16a34a' : 'var(--gray-400)', border: `1px solid ${row.is_approved ? '#16a34a' : 'var(--gray-300)'}`, padding: '0.15rem 0.4rem', borderRadius: '3px' }}>
                            {row.is_approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td style={{ padding: '0.9rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => toggleTestimonialApproval(row.id, row.is_approved)} style={{ background: 'none', border: 'none', color: 'var(--ink)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8125rem' }}>{row.is_approved ? 'Reject' : 'Approve'}</button>
                            <button onClick={() => deleteTestimonial(row.id)} style={{ background: 'none', border: 'none', color: '#dc2626', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8125rem' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={4} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--gray-400)' }}>No testimonials yet</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // Portfolio Layout
  // ─────────────────────────────────────────────────────────

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Expertise', id: 'services' },
    { label: 'Experience', id: 'experience' },
    { label: 'Works', id: 'projects' },
    { label: 'Certificates', id: 'credentials' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Gallery', id: 'gallery' },
  ];

  return (
    <div className="app-layout" style={{ position: 'relative', minHeight: '100vh' }}>

      {/* Custom cursor */}
      {!isMobile && (
        <>
          <div className="cursor-dot" style={{ top: mousePos.y, left: mousePos.x }} />
          <div className={`cursor-ring${isPointer ? ' hovered' : ''}`} style={{ top: mousePos.y, left: mousePos.x }} />
        </>
      )}

      {/* Preloader */}
      {!preloaderRemoved && (
        <div id="preloader">
          <div className="loader" />
        </div>
      )}

      {/* ── DESKTOP SIDEBAR ─────────────────────────────────── */}
      <aside className="app-sidebar">
        {/* Top: Logo */}
        <div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)', letterSpacing: '-0.01em', padding: 0 }}>
            ulac.dev
          </button>
        </div>

        {/* Middle: Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '2rem 0' }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollToSection(n.id)} className={`nav-link${activeSection === n.id ? ' active' : ''}`} style={{ textAlign: 'left' }}>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Bottom: Theme toggle & CTA stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', width: '100%' }}>
          <ThemeToggleCapsule theme={theme} setTheme={setTheme} />
          
          <button onClick={() => scrollToSection('contact')} className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
            Let's talk
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER ───────────────────────────────────── */}
      <header className="mobile-header">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)', letterSpacing: '-0.01em', padding: 0 }}>
          ulac.dev
        </button>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggleCapsule theme={theme} setTheme={setTheme} />

          <button onClick={() => setMenuOpen(m => !m)} style={{ background: 'none', border: '1px solid var(--gray-200)', width: 32, height: 32, borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>
            {menuOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ position: 'absolute', top: '56px', left: 0, right: 0, overflow: 'hidden', borderBottom: '1px solid var(--gray-200)', background: 'var(--bg)', zIndex: 999 }}
            >
              <div style={{ padding: '1rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[...navItems, { label: 'Contact', id: 'contact' }].map(n => (
                  <button key={n.id} onClick={() => scrollToSection(n.id)} className="nav-link" style={{ textAlign: 'left', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                    {n.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <main className="app-main" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── 01 ABOUT ───────────────────────────────────────── */}
        <section id="about" style={{ padding: '2rem 0 5rem' }}>
          <div className="about-grid">

            {/* Profile image (not in card) */}
            <div className="about-image-wrapper">
              <div className="about-image-container">
                <img
                  src="/new-pfp.jpg"
                  alt="John Carlo"
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    border: '1px solid var(--gray-200)',
                    filter: 'grayscale(20%)',
                    transition: 'filter 0.3s, border-color 0.3s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.borderColor = 'var(--gray-400)'; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(20%)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                />
                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)' }}>John Carlo Aganan</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>Software Developer</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', marginTop: '2px' }}>Naic, Cavite, PH</div>
                  </div>
                  <span className="chip-inverted">Available</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="section-label">01 — About</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>About Me</h2>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.75', color: 'var(--gray-500)', fontFamily: 'var(--font-serif)' }}>
                I'm a Full-Stack Developer with a deep interest in backend stability, clean frontend rendering, and database efficiency. Over the past few years, I have successfully designed, built, and shipped production platforms for e-commerce, scheduling, point-of-sale, and loan management.
              </p>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.75', color: 'var(--gray-500)', fontFamily: 'var(--font-serif)' }}>
                Currently completing my BSIT degree at Cavite State University. I enjoy building applications that are highly functional and snappy to use. When I'm not writing code, I enjoy working out, listening to music, and studying full stack architectures.
              </p>
              {/* Stats row */}
              <div style={{ display: 'flex', gap: '2.5rem', marginTop: '0.5rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
                {[
                  { num: '10+', label: 'Projects shipped' },
                  { num: '< 1', label: 'Year of experience' },
                  { num: '100%', label: 'Client satisfaction' }
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{s.num}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', background: 'var(--gray-200)' }} />

        {/* ── 02 SKILLS ───────────────────────────────────────── */}
        <section id="skills" style={{ padding: '5rem 0' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="section-label">02 — Skills</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Technical Toolkit</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
            {[
              { category: 'Frontend', skills: ['React', 'Vue.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
              { category: 'Backend', skills: ['Node.js', 'Express.js', 'Python (FastAPI)', 'PHP'] },
              { category: 'Database', skills: ['MySQL', 'PostgreSQL', 'Supabase'] },
              { category: 'Tools & Platform', skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Render'] }
            ].map((cat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem', margin: 0 }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.skills.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 4, height: 4, background: 'var(--gray-400)', borderRadius: '50%' }} />
                      <span style={{ fontSize: '0.9375rem', color: 'var(--gray-600)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', background: 'var(--gray-200)' }} />

        {/* ── 03 EXPERTISE ───────────────────────────────────── */}
        <section id="services" style={{ padding: '5rem 0' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="section-label">03 — Expertise</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>What I Build</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--gray-200)', borderRadius: '9px', overflow: 'hidden' }}>
            {[
              { num: '01', title: 'Full-Stack Systems', desc: 'Complex management systems, POS platforms, and admin dashboards built with React and Node.js.', tag: '99.9% uptime' },
              { num: '02', title: 'Custom Web Apps', desc: 'Scalable web applications tailored to specific business requirements and workflows.', tag: 'Ship-ready' },
              { num: '03', title: 'Database Architecture', desc: 'Robust and optimized database schemas using PostgreSQL and MySQL for high-performance data handling.', tag: 'Sub-ms queries' },
              { num: '04', title: 'E-commerce Solutions', desc: 'End-to-end online store development with secure payment integrations and inventory management.', tag: 'Conversion-tuned' },
              { num: '05', title: 'Responsive UI/UX', desc: 'Modern, mobile-first interfaces focused on user experience and brand identity.', tag: 'Pixel-perfect' },
              { num: '06', title: 'API Development', desc: 'Secure RESTful APIs connecting platforms with mobile apps and third-party services.', tag: 'Documented' }
            ].map((s, i) => (
              <div key={i}
                style={{
                  padding: '2rem',
                  background: 'var(--bg)',
                  borderRight: i % 3 !== 2 && !isMobile ? '1px solid var(--gray-200)' : 'none',
                  borderBottom: i < 3 && !isMobile ? '1px solid var(--gray-200)' : (isMobile && i < 5 ? '1px solid var(--gray-200)' : 'none'),
                  display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', fontWeight: 500 }}>{s.num}</span>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
                <span className="chip-border" style={{ marginTop: '0.5rem', width: 'fit-content' }}>{s.tag}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', background: 'var(--gray-200)' }} />

        {/* ── 04 EXPERIENCE ──────────────────────────────────── */}
        <section id="experience" style={{ padding: '5rem 0' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div className="section-label">04 — Experience</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Professional Path</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '0' }}>
            <div className="timeline-line" />
            {[
              {
                role: 'Full-Stack Developer Intern',
                company: 'StartupLab Business Center & AI Consulting Agency OPC',
                duration: 'Feb 2026 – May 2026',
                desc: 'Worked on loan reminder systems and AI-powered workflows. Handled databases, email queues, and server configurations for production applications.',
                badge: 'Internship'
              },
              {
                role: 'Freelance Software Developer',
                company: 'Self-employed',
                duration: 'Jun 2023 – Present',
                desc: 'Built and shipped 10+ production applications across retail, e-commerce, POS platforms, and academic management systems.',
                badge: 'Freelance'
              }
            ].map((exp, i) => (
              <div key={i} className="timeline-item" style={{ position: 'relative', paddingLeft: '2.5rem', paddingBottom: '2.5rem' }}>
                <div className="timeline-dot" />
                <div style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '1.5rem', background: 'var(--gray-50)', textAlign: 'left', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gray-400)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>{exp.role}</h3>
                        <span className="chip-border">{exp.badge}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '4px' }}>{exp.company}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: '1.65', margin: 0 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', background: 'var(--gray-200)' }} />

        {/* ── 05 PROJECTS ────────────────────────────────────── */}
        <section id="projects" style={{ padding: '5rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-label">05 — Works</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Selected Projects</h2>
            </div>
            <button onClick={() => setShowAllProjects(p => !p)} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', textDecoration: 'underline', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-500)'}
            >
              {showAllProjects ? 'Show less' : 'All projects'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>

            {/* Featured */}
            <div style={{ border: '1px solid var(--gray-200)', borderRadius: '9px', overflow: 'hidden', display: 'flex', flexDirection: isMobile ? 'column' : 'row', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gray-400)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
            >
              <div style={{ flex: 1.2, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', background: 'var(--gray-50)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="chip-inverted">Featured</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Production</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>BBEK Administration System</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--gray-500)', lineHeight: '1.65', margin: 0 }}>Comprehensive administration platform for church operations — member management, event scheduling, and financial reporting.</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Vue.js', 'Node.js', 'MySQL'].map(t => <span key={t} className="skill-tag">{t}</span>)}
                </div>
                <a href="https://biblebaptistekklesiaofkawit.xyz/" target="_blank" rel="noreferrer" className="btn-glow" style={{ width: 'fit-content', marginTop: '0.25rem' }}>
                  Launch Site <FaExternalLinkAlt size={9} />
                </a>
              </div>
              <div style={{ flex: 0.8, minHeight: isMobile ? '200px' : '300px', overflow: 'hidden' }}>
                <img src={project1Image} alt="BBEK Admin" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', transition: 'filter 0.3s, transform 0.4s' }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(15%)'; e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', marginTop: '1px' }}>
              {[
                { title: 'StartupLab Ticketing', img: project4Image, url: 'https://startuplab-event-creation.vercel.app/', desc: 'End-to-end event ticketing and management platform.', tags: ['React', 'Node.js', 'PostgreSQL'] },
                { title: 'DormPulse Student Housing', img: dormpulseImage, url: 'https://studnet-iota.vercel.app/', desc: 'Premium student housing locator with real-time tracking and interactive mapping.', tags: ['React', 'FastAPI', 'Supabase'] },
                { title: 'Baby Bliss Booking', img: project2Image, url: 'https://babyblissbooking.vercel.app/', desc: 'Advanced appointment system for wellness and spa centers.', tags: ['React', 'Tailwind', 'Vercel'] },
                { title: 'LaundroSaaS Management', img: laundrosaasImage, url: 'https://laundro-phi.vercel.app/', desc: 'Comprehensive laundry SaaS with real-time order tracking and revenue reporting.', tags: ['React', 'Vite'] },
                { title: 'MedFlow Healthcare', img: medflowImage, url: 'https://medflow-two.vercel.app/', desc: 'Healthcare management system with real-time analytics and patient tracking.', tags: ['React', 'Vite'] },
                { title: 'NAgCO Loan System', img: nagcoDashboardImage, url: 'https://nagcoloanmanagementsystem.vercel.app/', desc: 'Cooperative loan platform with automated workflows and real-time tracking.', tags: ['Next.js', 'Supabase'] },
                { title: 'Artisano Pizzeria', img: artisanoImage, url: 'https://pizza-theta-inky.vercel.app/', desc: 'Cinematic digital presence for an artisanal pizzeria.', tags: ['Next.js', 'Framer Motion'] },
                { title: 'BigBrew POS System', img: bigbrewPOSImage, url: 'https://brew-sxrs.vercel.app/', desc: 'Coffee shop POS with real-time analytics dashboard.', tags: ['React', 'Node.js'] },
                { title: 'Event Registration System', img: project3Image, url: 'https://startuplab-event-registration.vercel.app/', desc: 'Streamlined registration for university and academic events.', tags: ['Laravel', 'MySQL'] }
              ].slice(0, showAllProjects ? undefined : 3).map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', border: '1px solid var(--gray-200)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'var(--bg)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gray-400)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  <div style={{ height: '160px', overflow: 'hidden', borderBottom: '1px solid var(--gray-200)' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', transition: 'filter 0.3s, transform 0.4s' }}
                      onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                      onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(15%)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', lineHeight: '1.55', margin: 0 }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.75rem' }}>
                      {p.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div style={{ width: '100%', height: '1px', background: 'var(--gray-200)' }} />

        {/* ── 06 CREDENTIALS ─────────────────────────────────── */}
        <section id="credentials" style={{ padding: '5rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr', gap: isMobile ? '3.5rem' : '5rem', alignItems: 'start' }}>

            {/* Certifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div className="section-label">06 — Credentials</div>
                <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Certifications</h2>
              </div>
              {[{
                name: 'Full-Stack Developer Internship',
                issuer: 'StartupLab Business Center & AI Consulting Agency OPC',
                url: 'https://drive.google.com/file/d/1cglPPYuWbCDnZOVmWlq5bx0pZ3keFK1M/view?usp=drive_link'
              }].map((cert, i) => (
                <div key={i} onClick={() => cert.url !== '#' && window.open(cert.url, '_blank')} style={{
                  border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '1.25rem',
                  background: 'var(--gray-50)', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center',
                  transition: 'border-color 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gray-400)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '7px', background: 'var(--gray-100)', border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaLaptopCode size={16} style={{ color: 'var(--gray-500)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{cert.name}</h4>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', marginTop: '3px' }}>{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div id="reviews" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div className="section-label">07 — Reviews</div>
                  <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Client Feedback</h2>
                </div>
                <button onClick={() => setIsFeedbackModalOpen(true)} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', textDecoration: 'underline', transition: 'color 0.2s', padding: 0 }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
                >
                  Write a Review
                </button>
              </div>
              <RecommendationSlider testimonials={testimonials} />
            </div>
          </div>
        </section>

        {/* ── 07 GALLERY ─────────────────────────────────────── */}
        <Gallery />

      {/* ── FOOTER / CONTACT ───────────────────────────────── */}
      <footer id="contact" style={{ borderTop: '1px solid var(--gray-200)', background: 'var(--bg)' }}>
        <div style={{ padding: '5rem 0 3.5rem', maxWidth: '880px', margin: '0 auto' }}>
          <div className="footer-contact-grid">

            {/* Left CTA */}
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
              <div className="section-label">Contact</div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--ink)', lineHeight: 1.1, margin: 0 }}>
                Let's work<br />together.
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--gray-500)', lineHeight: '1.7', margin: 0 }}>
                Have a project, idea, or full-time position to discuss? Drop me a message and I'll get back within 24 hours.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => setIsModalOpen(true)} className="btn-glow">
                  Start a conversation
                </button>
              </div>
            </div>

            {/* Right: contact links */}
            <div className="footer-right-links">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>Email</div>
                <a href="mailto:johncarloaganan.startuplab@gmail.com" style={{ fontSize: '0.9375rem', color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gray-500)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ink)'}
                >
                  johncarloaganan.startuplab@gmail.com
                </a>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>Location</div>
                <span style={{ fontSize: '0.9375rem', color: 'var(--gray-500)' }}>Naic, Cavite, Philippines</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
                >GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--gray-400)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-400)'}
                >LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              © 2026 John Carlo Aganan
            </span>
            <button onClick={() => { setView('mis'); window.location.hash = '#login'; }} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-300)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gray-500)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-300)'}
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      </main>

      {/* ── CHATBOT ─────────────────────────────────────────── */}
      <ChatBot isDark={resolvedDark} />

      {/* ── INQUIRY MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10005, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              style={{ background: 'var(--bg)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '420px', zIndex: 1, position: 'relative' }}
            >
              <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: '1px solid var(--gray-200)', color: 'var(--gray-500)', width: 28, height: 28, borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
              >×</button>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Inquiry</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, marginBottom: '1.5rem', color: 'var(--ink)' }}>
                {currentService ? `Re: ${currentService.title}` : 'Start a conversation'}
              </h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="Your name" className="form-input" />
                <input name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="your@email.com" className="form-input" />
                <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="Tell me about your project..." rows="4" className="form-input" style={{ resize: 'none' }} />
                {formStatus.message && (
                  <p style={{ fontSize: '0.8125rem', color: formStatus.success ? '#16a34a' : '#dc2626', fontWeight: 500 }}>{formStatus.message}</p>
                )}
                <button type="submit" disabled={formStatus.loading} className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                  {formStatus.loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── FEEDBACK MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10006, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFeedbackModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              style={{ background: 'var(--bg)', border: '1px solid var(--gray-200)', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '420px', zIndex: 1, position: 'relative' }}
            >
              <button onClick={() => setIsFeedbackModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: '1px solid var(--gray-200)', color: 'var(--gray-500)', width: 28, height: 28, borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Testimonial</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, marginBottom: '1.5rem', color: 'var(--ink)' }}>Write a Review</h3>
              <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <input name="name" value={feedbackData.name} onChange={e => setFeedbackData({ ...feedbackData, name: e.target.value })} required type="text" placeholder="Your name" className="form-input" />
                <input name="email" value={feedbackData.email} onChange={e => setFeedbackData({ ...feedbackData, email: e.target.value })} required type="email" placeholder="your@email.com" className="form-input" />
                <input name="role" value={feedbackData.role} onChange={e => setFeedbackData({ ...feedbackData, role: e.target.value })} required type="text" placeholder="Role / Company" className="form-input" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Rating</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} type="button" onClick={() => setFeedbackData({ ...feedbackData, rating: n })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: n <= feedbackData.rating ? '#ca8a04' : 'var(--gray-300)', padding: 0, transition: 'color 0.15s' }}>
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea name="content" value={feedbackData.content} onChange={e => setFeedbackData({ ...feedbackData, content: e.target.value })} required placeholder="What was it like working with me?" rows="3" className="form-input" style={{ resize: 'none' }} />
                {feedbackStatus.success && <p style={{ fontSize: '0.8125rem', color: '#16a34a' }}>Review submitted! It will appear once approved.</p>}
                <button type="submit" disabled={feedbackStatus.loading} className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                  {feedbackStatus.loading ? 'Submitting…' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ChatBot Component
// ─────────────────────────────────────────────────────────────
const ChatBot = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm John's AI assistant. Ask me anything about his skills, projects, or background." }
  ]);
  const endRef = useRef(null);

  const SYSTEM_PROMPT = `You are John Carlo Aganan's personal AI assistant.
John Carlo is a Full-Stack Developer specializing in React, Node.js, and Supabase.
He is in his 4th Year of BSIT at Cavite State University. He lives in Naic, Cavite, Philippines.
Key projects: DormPulse (Student locator), LaundroSaaS, MedFlow (Healthcare), NAgCO (Cooperative loan management).
Keep answers brief, professional, and strictly relevant to his portfolio.`;

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSend = async e => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const text = input.trim();
    setMessages(p => [...p, { sender: 'user', text }]);
    setInput('');
    setIsTyping(true);
    try {
      const history = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: text }
      ];
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: history, max_tokens: 250, temperature: 0.7 }) });
      const data = await res.json();
      setMessages(p => [...p, { sender: 'bot', text: data.choices?.[0]?.message?.content || "Sorry, couldn't process that." }]);
    } catch (_) {
      setMessages(p => [...p, { sender: 'bot', text: "Oops! Something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 10003 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="chat-window"
            style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: '0.75rem' }}
          >
            {/* Header */}
            <div style={{ padding: '0.9rem 1rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>Chat with John's AI</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', marginTop: '1px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Online</div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--gray-400)', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '0.9rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem', background: 'var(--gray-50)' }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '0.55rem 0.8rem',
                    borderRadius: m.sender === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                    background: m.sender === 'user' ? 'var(--ink)' : 'var(--bg)',
                    color: m.sender === 'user' ? 'var(--bg)' : 'var(--ink)',
                    border: m.sender === 'user' ? 'none' : '1px solid var(--gray-200)',
                    fontSize: '0.8125rem',
                    lineHeight: '1.5'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '0.5rem 0.7rem', background: 'var(--bg)', border: '1px solid var(--gray-200)', borderRadius: '10px 10px 10px 2px', fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>
                  Thinking…
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '0.75rem', borderTop: '1px solid var(--gray-200)', display: 'flex', gap: '0.5rem', background: 'var(--bg)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask something…"
                style={{ flex: 1, background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: '5px', padding: '0.45rem 0.7rem', fontSize: '0.8125rem', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--gray-400)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="btn-glow" style={{ padding: '0.45rem 0.9rem', borderRadius: '5px', fontSize: '0.75rem' }}>Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="btn-glow"
          style={{ borderRadius: '8px', padding: '0.65rem 1.2rem', gap: '6px' }}
        >
          <FaQuoteRight size={11} />
          Ask AI
        </motion.button>
      )}
    </div>
  );
};

export default App;
