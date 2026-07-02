import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';
import { FaEnvelope, FaMapMarkerAlt, FaCode, FaMoon, FaSun, FaLinkedin, FaBars, FaTimes, FaGithub, FaCalendarAlt, FaChevronRight, FaChevronLeft, FaStar, FaLaptopCode, FaCheck, FaCheckCircle, FaUser, FaLock, FaExternalLinkAlt, FaQuoteRight } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { SiTailwindcss, SiExpress, SiAxios, SiMysql, SiVercel, SiSupabase, SiPostgresql, SiVite, SiLaravel, SiPython, SiNextdotjs, SiFramer, SiTypescript } from 'react-icons/si';

import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';
import GLightbox from 'glightbox';

import project1Image from './Screenshot 2026-01-28 035743.png';
import project2Image from './Screenshot 2026-01-31 091212.png';
import project3Image from './Screenshot 2026-02-27 090848.png';
import project4Image from './startuplab-event-creation.png';
import bigbrewPOSImage from './bigbrew-pos.png';
import artisanoImage from './artisano-pizzeria.png';
import nagcoDashboardImage from './nagco-dashboard.png';
import medflowImage from './medflow_new.png';
import laundrosaasImage from './laundry_new.png';
import logoImage from './logo.png';
import dsaImage from './dsa.jpg';
import dormpulseImage from './dormpulse.png';

// ----------------------------------------------------------------------
// Interactive Particle Connection Canvas (Glow & Connection Lines)
// ----------------------------------------------------------------------
const ParticleCanvas = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const connectionDistance = 120;
    
    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const colorString = isDarkMode ? '0, 240, 255' : '2, 132, 199';
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorString}, 0.25)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance * 1.6) {
            const alpha = (1 - dist / (connectionDistance * 1.6)) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${colorString}, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${colorString}, 0.8)`;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            let isNearMouse = false;
            if (mouse.x !== null && mouse.y !== null) {
              const m1Dist = Math.sqrt((p1.x - mouse.x) ** 2 + (p1.y - mouse.y) ** 2);
              const m2Dist = Math.sqrt((p2.x - mouse.x) ** 2 + (p2.y - mouse.y) ** 2);
              if (m1Dist < connectionDistance * 1.3 || m2Dist < connectionDistance * 1.3) {
                isNearMouse = true;
              }
            }

            if (isNearMouse) {
              ctx.strokeStyle = `rgba(${colorString}, ${alpha * 2.2})`;
              ctx.shadowBlur = 6;
              ctx.shadowColor = `rgba(${colorString}, 0.7)`;
              ctx.lineWidth = 1.0;
            } else {
              ctx.strokeStyle = `rgba(${colorString}, ${alpha})`;
              ctx.lineWidth = 0.8;
            }
            
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

// ----------------------------------------------------------------------
// Skill Tag Icon Resolver Component
// ----------------------------------------------------------------------
const SkillTag = ({ name }) => {
  const iconMap = {
    'JavaScript': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'HTML5': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'CSS3': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'React': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Vue.js': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Tailwind CSS': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Tailwind': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Node.js': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Express.js': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'PHP': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'MySQL': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'PostgreSQL': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Supabase': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'REST APIs': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Git': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'GitHub': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Vercel': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Vite': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Next.js': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Framer Motion': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'TypeScript': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'FastAPI': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' },
    'Laravel': { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' }
  };
  
  const tag = iconMap[name] || { color: '#ffffff', bg: 'rgba(255,255,255,0.04)' };
  
  return (
    <span style={{
      fontSize: '0.7rem',
      fontWeight: '600',
      fontFamily: 'var(--mono-font)',
      background: tag.bg,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.3rem 0.7rem',
      borderRadius: '6px',
      color: tag.color,
      whiteSpace: 'nowrap'
    }}>
      {name}
    </span>
  );
};

// ----------------------------------------------------------------------
// Terminal Typing Shell Mockup Component
// ----------------------------------------------------------------------
const TerminalMock = () => {
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    const fullScript = [
      { type: 'cmd', text: 'ulac@dev ~ % cat info.json' },
      { type: 'out', text: '{\n  "name": "John Carlo Aganan",\n  "role": "Full-Stack Developer",\n  "status": "Available"\n}' },
      { type: 'cmd', text: 'ulac@dev ~ %' }
    ];

    let timer;
    let idx = 0;
    const addNextLine = () => {
      if (idx < fullScript.length) {
        const lineToAdd = fullScript[idx];
        setLines(prev => [...prev, lineToAdd]);
        idx++;
        timer = setTimeout(addNextLine, 800);
      }
    };
    addNextLine();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '320px',
      background: '#040408',
      border: '1.5px solid rgba(0, 240, 255, 0.15)',
      borderRadius: '16px',
      padding: '1.5rem',
      fontFamily: 'var(--mono-font)',
      fontSize: '0.8rem',
      color: '#e5e7eb',
      textAlign: 'left',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginLeft: '1rem', fontFamily: 'var(--mono-font)' }}>ulac@dev ~ bash</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {lines.filter(Boolean).map((line, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', color: line.type === 'cmd' ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
            {line.type === 'cmd' ? (
              <span>{line.text}</span>
            ) : (
              <span style={{ color: 'var(--accent-color)' }}>{line.text}</span>
            )}
          </div>
        ))}
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '14px',
          background: 'var(--accent-color)',
          marginLeft: '4px',
          animation: 'blink 1.2s step-end infinite'
        }} />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Recommendation Slider Component
// ----------------------------------------------------------------------
const RecommendationSlider = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const filtered = testimonials.filter(t => t.is_approved);

  useEffect(() => {
    if (filtered.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [filtered.length]);

  if (filtered.length === 0) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1.5px solid var(--border-primary)', borderRadius: '12px', opacity: 0.4 }}>
        <FaStar style={{ fontSize: '1.8rem', marginBottom: '1rem', opacity: 0.5 }} />
        <p style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Awaiting first recommendation...</p>
      </div>
    );
  }

  const current = filtered[activeIndex];
  
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div className="card-glass" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-secondary)' }}>
            <FaQuoteRight size={32} style={{ color: 'var(--accent-color)', opacity: 0.2, alignSelf: 'flex-end', marginBottom: '-1rem' }} />
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
              "{current.content}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1.5px solid var(--border-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FaUser size={18} style={{ color: 'var(--accent-color)' }} />
              </div>
              <div>
                <div style={{ fontWeight: '750', fontSize: '1rem', color: 'var(--text-primary)' }}>{current.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>{current.role}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '6px', marginTop: '1.5rem', justifyContent: 'center' }}>
        {filtered.map((_, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: '8px',
              height: '8px',
              background: i === activeIndex ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Gallery Image Slider / Grid Component
// ----------------------------------------------------------------------
const Gallery = () => {
  const images = ['/me.jpg', '/gal2.jpg', '/gal3.jpg', '/gal4.jpg', '/gall.jpg', '/thesis.jpg', '/baby.jpg', '/baby2.jpg', '/bb.jpg'];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" style={{ marginTop: '5rem', marginBottom: '2rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Life & Work</p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>Gallery</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => scroll('left')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%', color: '#fff' }}><FaChevronLeft size={14} /></button>
          <button onClick={() => scroll('right')} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%', color: '#fff' }}><FaChevronRight size={14} /></button>
        </div>
      </div>

      <div ref={scrollRef} className="no-scrollbar" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', scrollSnapType: 'x mandatory', width: '100%' }}>
        {images.map((src, i) => (
          <motion.a
            key={i}
            href={src}
            className="glightbox"
            data-gallery="gallery"
            whileHover={{ scale: 1.02 }}
            style={{
              flex: '0 0 auto',
              width: '280px',
              aspectRatio: '1 / 1',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              scrollSnapAlign: 'start',
              background: '#0a0a14',
              cursor: 'zoom-in'
            }}
          >
            <img src={src} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------
// Main Application Component
// ----------------------------------------------------------------------
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
  
  const headingRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const checkPointer = (e) => {
      const target = e.target;
      if (!target) return;
      
      const style = window.getComputedStyle(target);
      const isClickable = 
        style.cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.card-glass') || 
        target.closest('.btn-glow') || 
        target.closest('.nav-link') ||
        target.onclick;
        
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', checkPointer);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, []);

  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/ulac' || hash === '#login') {
        setView('mis');
      } else {
        setView('portfolio');
      }
    };

    const masterSession = localStorage.getItem('ulac_session');
    if (masterSession) {
      const parsedUser = JSON.parse(masterSession);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
      } else if (!masterSession) {
        setIsLoggedIn(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsLoggedIn(true);
      } else if (!localStorage.getItem('ulac_session')) {
        setIsLoggedIn(false);
        setUser(null);
      }
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginForm.email === 'ulac' && loginForm.password === 'ulac') {
      const masterUser = { email: 'ulac', id: 'master-admin' };
      setIsLoggedIn(true);
      setUser(masterUser);
      localStorage.setItem('ulac_session', JSON.stringify(masterUser));
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (error) setLoginError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('ulac_session');
    setIsLoggedIn(false);
    setUser(null);
    setView('portfolio');
    window.location.hash = '';
    if (window.location.pathname === '/ulac') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleInquiryClick = (service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: currentService?.title || 'General Inquiry',
          message: formData.message,
          status: 'Pending'
        }
      ]);

      if (error) throw error;

      try {
        const API_BASE_URL = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
        await fetch(`${API_BASE_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: currentService?.title || 'General Inquiry',
            message: formData.message
          })
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }

      setFormStatus({ loading: false, success: true, error: false, message: 'Your message has been sent. Thank you!' });
      setFormData({ name: '', email: '', message: '' });

      if (isLoggedIn) fetchInquiries();
      setTimeout(() => setFormStatus({ ...formStatus, success: false }), 5000);
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: true, message: err.message || 'Something went wrong. Please try again.' });
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

  const toggleTestimonialApproval = async (id, currentStatus) => {
    const { error } = await supabase.from('testimonials').update({ is_approved: !currentStatus }).eq('id', id);
    if (!error) {
      if (!currentStatus) {
        const testimonial = testimonials.find(t => t.id === id);
        if (testimonial && testimonial.email) {
          try {
            const API_BASE_URL = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
            await fetch(`${API_BASE_URL}/api/testimonial-approved`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: testimonial.name,
                email: testimonial.email,
                frontendUrl: window.location.origin
              })
            });
          } catch (e) { console.error("Failed to send approval email:", e); }
        }
      }
      fetchTestimonials();
    }
  };

  const deleteInquiry = async (id) => {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) fetchInquiries();
  };

  const deleteTestimonial = async (id) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) fetchTestimonials();
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackStatus({ loading: true, success: false });

    try {
      const { error } = await supabase.from('testimonials').insert([
        {
          name: feedbackData.name,
          email: feedbackData.email,
          role: feedbackData.role,
          content: feedbackData.content,
          rating: feedbackData.rating,
          is_approved: false
        }
      ]);

      if (error) throw error;

      try {
        const API_BASE_URL = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
        await fetch(`${API_BASE_URL}/api/testimonial-thanks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: feedbackData.name,
            email: feedbackData.email,
            rating: feedbackData.rating,
            content: feedbackData.content
          })
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }

      setFeedbackStatus({ loading: false, success: true });
      setFeedbackData({ name: '', email: '', role: '', content: '', rating: 5 });
      setTimeout(() => {
        setIsFeedbackModalOpen(false);
        setFeedbackStatus({ loading: false, success: false });
      }, 3000);
    } catch (err) {
      alert("Error submitting feedback: " + err.message);
      setFeedbackStatus({ loading: false, success: false });
    }
  };

  useEffect(() => {
    fetchTestimonials();
    if (isLoggedIn) {
      fetchInquiries();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 600, easing: 'ease-in-out', once: true });

    let typedInstance = null;
    if (headingRef.current) {
      typedInstance = new Typed(headingRef.current, {
        strings: ['systems', 'applications', 'web apps'],
        typeSpeed: 90,
        backSpeed: 50,
        loop: true,
        backDelay: 2200,
        showCursor: false
      });
    }

    const timer = setTimeout(() => setPreloaderRemoved(true), 800);

    const fetchViews = async () => {
      try {
        const { data, error } = await supabase.from('site_stats').select('views_count').eq('id', 1).single();
        if (data && !error) {
          const newCount = data.views_count + 1;
          setTotalViews(newCount);
          await supabase.from('site_stats').update({ views_count: newCount }).eq('id', 1);
        }
      } catch (error) { console.error('Error with views:', error); }
    };
    fetchViews();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });

    ['hero', 'services', 'experience', 'projects', 'about', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (typedInstance) typedInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) return;
    const lightboxTimer = setTimeout(() => {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        keyboardNavigation: true,
        closeButton: true,
        closeOnOutsideClick: true,
        zoomable: true
      });
    }, 200);

    return () => clearTimeout(lightboxTimer);
  }, [isLoggedIn, view]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoggedIn === null) {
    return (
      <div style={{ height: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
        <div className="loader" />
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // MIS View Template
  // ----------------------------------------------------------------------
  if (view === 'mis') {
    if (!isLoggedIn) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--default-font)',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1.5px', marginBottom: '0.8rem' }}>
              JC Management Console
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Enter admin credentials to continue</p>
          </div>

          <div style={{ width: '100%', maxWidth: '380px' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <input
                type="text"
                placeholder="Username or Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1.5px solid var(--border-primary)',
                  padding: '1rem 1.2rem',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontWeight: '500'
                }}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1.5px solid var(--border-primary)',
                  padding: '1rem 1.2rem',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontWeight: '500'
                }}
                required
              />

              {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' }}>{loginError}</p>}

              <button
                type="submit"
                style={{
                  background: 'var(--accent-color)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  padding: '1rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                Log in
              </button>

              <button
                type="button"
                onClick={() => {
                  setView('portfolio');
                  window.location.hash = '';
                  if (window.location.pathname === '/ulac') window.history.pushState({}, '', '/');
                }}
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Return to Portfolio
              </button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: 'var(--default-font)' }}>
        {/* Sidebar */}
        <div className="mis-sidebar" style={{
          width: isMobile ? '100%' : '260px',
          padding: '2.5rem 1.5rem',
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'stretch',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px', margin: 0 }}>JC. MIS</h2>
              <MdVerified style={{ color: 'var(--accent-color)', fontSize: '1.1rem' }} />
            </div>
            <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Admin Panel</p>
          </div>

          {isMobile ? (
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <select
                value={misView}
                onChange={(e) => setMisView(e.target.value)}
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)', padding: '0.4rem', borderRadius: '6px', fontSize: '0.8rem' }}
              >
                {['dashboard', 'inquiries', 'testimonials'].map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
              </select>
              <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>EXIT</button>
            </div>
          ) : (
            <>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
                {['dashboard', 'inquiries', 'testimonials'].map(m => (
                  <button
                    key={m}
                    onClick={() => setMisView(m)}
                    style={{
                      background: misView === m ? 'var(--accent-color)' : 'transparent',
                      border: 'none',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: '0.8rem 1rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      letterSpacing: '1px'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </nav>
              <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1.5px solid var(--border-primary)', color: 'var(--text-primary)', padding: '0.8rem', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '8px' }}>SIGN OUT</button>
            </>
          )}
        </div>

        {/* Content Panel */}
        <div style={{ flex: 1, padding: isMobile ? '1.5rem' : '3.5rem' }}>
          <div style={{ maxWidth: '1000px' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', textTransform: 'capitalize', letterSpacing: '-1px' }}>{misView}</h1>
              <div style={{ width: '30px', height: '3px', background: 'var(--accent-color)', marginTop: '0.5rem' }} />
            </div>

            {misView === 'dashboard' && (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[
                  { label: 'Total Inquiries', value: inquiries.length },
                  { label: 'Approved Reviews', value: testimonials.filter(t => t.is_approved).length },
                  { label: 'Total Website Views', value: totalViews }
                ].map((stat, i) => (
                  <div key={i} className="card-glass" style={{ background: 'var(--bg-secondary)', padding: '1.8rem' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                    <p style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem', color: 'var(--text-primary)' }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            )}

            {misView === 'inquiries' && (
              <div style={{ border: '1px solid var(--border-primary)', borderRadius: '12px', overflowX: 'auto', background: 'var(--bg-secondary)' }}>
                <table className="mis-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>SENDER</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>SUBJECT</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>MESSAGE</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.length > 0 ? inquiries.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '700' }}>{row.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.email}</div>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: '600' }}>{row.subject}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>{row.message}</td>
                        <td style={{ padding: '1rem' }}>
                          <button onClick={() => deleteInquiry(row.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>Delete</button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No inquiries found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {misView === 'testimonials' && (
              <div style={{ border: '1px solid var(--border-primary)', borderRadius: '12px', overflowX: 'auto', background: 'var(--bg-secondary)' }}>
                <table className="mis-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>CLIENT</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>REVIEW</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>STATUS</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.length > 0 ? testimonials.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '700' }}>{row.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.role}</div>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>{row.content}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            background: row.is_approved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            borderRadius: '4px',
                            color: row.is_approved ? '#10b981' : 'var(--text-secondary)'
                          }}>
                            {row.is_approved ? 'APPROVED' : 'PENDING'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.8rem' }}>
                            <button onClick={() => toggleTestimonialApproval(row.id, row.is_approved)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-color)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>
                              {row.is_approved ? 'Reject' : 'Approve'}
                            </button>
                            <button onClick={() => deleteTestimonial(row.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No testimonials found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Portfolio Layout View
  // ----------------------------------------------------------------------
  return (
    <div className="portfolio-theme" style={{ position: 'relative' }}>
      {/* Background Particle Canvas */}
      <ParticleCanvas isDarkMode={true} />

      {/* Mouse Glowing Aura Spotlight */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          top: mousePos.y - 300,
          left: mousePos.x - 300,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.055) 0%, rgba(0, 240, 255, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'top 0.15s cubic-bezier(0.1, 0.8, 0.2, 1), left 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)',
          filter: 'blur(40px)'
        }} />
      )}

      {/* Custom Glowing Cursor Follower Ring */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          top: mousePos.y,
          left: mousePos.x,
          width: isPointer ? '44px' : '18px',
          height: isPointer ? '44px' : '18px',
          border: '1.5px solid var(--accent-color)',
          background: isPointer ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 999999,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, top 0.08s ease-out, left 0.08s ease-out',
          boxShadow: isPointer ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
        }} />
      )}
      
      {/* Custom Cursor Dot */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          top: mousePos.y,
          left: mousePos.x,
          width: '6px',
          height: '6px',
          background: 'var(--accent-color)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 999999,
          boxShadow: '0 0 8px var(--accent-color)'
        }} />
      )}

      {/* Preloader */}
      {!preloaderRemoved && (
        <div id="preloader">
          <div className="loader" />
        </div>
      )}

      {/* Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        background: 'rgba(6, 6, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 1000,
        transition: 'all 0.3s'
      }}>
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
          {/* Logo */}
          <span style={{ fontFamily: 'var(--mono-font)', fontWeight: '800', fontSize: '1.25rem', color: '#fff', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span style={{ color: 'var(--accent-color)' }}>&lt;</span>ulac.dev<span style={{ color: 'var(--accent-color)' }}>/&gt;</span>
          </span>

          {/* Navigation links (Desktop) */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '2rem' }}>
              <button onClick={() => scrollToSection('about')} className="nav-link">ABOUT</button>
              <button onClick={() => scrollToSection('services')} className="nav-link">EXPERTISE</button>
              <button onClick={() => scrollToSection('experience')} className="nav-link">EXPERIENCE</button>
              <button onClick={() => scrollToSection('projects')} className="nav-link">WORKS</button>
            </div>
          )}

          {/* Let's Talk CTA button */}
          <div>
            <button onClick={() => scrollToSection('contact')} className="btn-glow">
              Let's talk
            </button>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section 1: Hero */}
        <section id="hero" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', padding: isMobile ? '3rem 0' : '5rem 0' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '3rem', width: '100%', alignItems: 'center' }}>
            {/* Left text */}
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                color: 'var(--accent-color)',
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1.5px solid rgba(139, 92, 246, 0.25)',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                width: 'fit-content',
                fontWeight: '600'
              }}>
                <span style={{ width: '6px', height: '6px', background: 'var(--accent-color)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--accent-color)' }} />
                Available for freelance projects & opportunities
              </div>

              <h1 style={{ fontSize: isMobile ? '2.5rem' : '3.6rem', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-2px', margin: 0 }}>
                I build <span ref={headingRef} style={{ color: 'var(--accent-color)' }}>systems</span><br />
                that scale, ship fast,<br />
                and stay reliable.
              </h1>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '480px', margin: 0 }}>
                Software Developer based in <span style={{ color: '#fff', fontWeight: '600' }}>Naic, Cavite, Philippines</span>. Building web applications, point of sale architectures, and scalable business systems.
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => scrollToSection('projects')} className="btn-glow" style={{ borderRadius: '10px' }}>
                  View Projects
                </button>
                <button onClick={() => scrollToSection('contact')} style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-secondary)',
                  borderRadius: '10px',
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  Let's Talk
                </button>
              </div>
            </div>

            {/* Right code mockup */}
            <div style={{ flex: 0.8, width: '100%' }}>
              <TerminalMock />
            </div>
          </div>
        </section>

        {/* Section 2: About */}
        <section id="about" style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', gap: '4rem', alignItems: 'center' }}>
            
            {/* Left text */}
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>01 / ABOUT</p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>About Me</h2>
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                I'm a Full-Stack Developer with a deep interest in backend stability, clean frontend rendering, and database efficiency. Over the past few years, I have successfully designed, built, and shipped production platforms for e-commerce, scheduling, point-of-sale, and loan management.
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                Currently completing my BSIT degree at Cavite State University, I focus on turning complex challenges into streamlined, user-friendly solutions. I enjoy building applications that are highly functional and snappy to use.
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                When I'm not writing code, I enjoy working out, listening to music, and studying full stack architectures.
              </p>
            </div>

            {/* Right Profile Card (3D Dan Pirante Style) */}
            <div style={{ flex: 0.8, width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '320px',
                aspectRatio: '1 / 1',
                background: '#0d0d14',
                border: '1.5px solid var(--border-primary)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                cursor: 'default'
              }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'rgba(139,92,246,0.1)',
                  border: '1.5px solid var(--accent-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src="/new-pfp.jpg" alt="John" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Monospace Metadata Tags */}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--mono-font)' }}>01 / ABOUT</div>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', textAlign: 'left', fontFamily: 'var(--mono-font)' }}>
                  <div style={{ fontSize: '1.05rem', color: '#fff', fontWeight: '800', marginBottom: '0.2rem' }}>John</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--accent-color)', fontWeight: '700' }}>Software Developer</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Naic, Cavite, PH</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Expertise & Services */}
        <section id="services" style={{ padding: '5rem 0' }}>
          <div style={{ marginBottom: '3.5rem', textAlign: 'left' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>What I Build</p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1.5px', margin: 0 }}>Expertise & Solutions</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Full-Stack Systems', desc: 'Building complex management systems, POS platforms, and admin dashboards with React and Node.js.', tag: '99.9% uptime' },
              { title: 'Custom Web Apps', desc: 'Development of scalable web applications tailored to specific business requirements and workflows.', tag: '0 reconciliation errors' },
              { title: 'Database Architecture', desc: 'Designing robust and optimized database schemas using PostgreSQL and MySQL for high-performance data handling.', tag: 'hours saved daily' },
              { title: 'E-commerce Solutions', desc: 'End-to-end online store development including secure payment integrations and inventory management.', tag: 'sub-second load' },
              { title: 'Responsive UI/UX', desc: 'Creating modern, mobile-first interfaces focused on user experience and brand identity.', tag: 'fully responsive' },
              { title: 'API Development', desc: 'Developing secure RESTful APIs to connect your platform with mobile apps and third-party services.', tag: 'fully owned' }
            ].map((service, i) => (
              <div key={i} className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.08)',
                    border: '1.5px solid rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-color)'
                  }}>
                    <FaCode size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '750', margin: 0 }}>{service.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>{service.desc}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: 'var(--accent-color)',
                    background: 'rgba(139, 92, 246, 0.08)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '9999px'
                  }}>{service.tag}</span>
                  <button onClick={() => handleInquiryClick(service)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Inquire</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Experience */}
        <section id="experience" style={{ padding: '5rem 0' }}>
          <div style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Professional Path</p>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1.5px', margin: 0 }}>Experience</h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--mono-font)', margin: 0 }}>
              Frontend, backend, mobile, and AI integrations — delivered by one developer.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', gap: '2.5rem' }}>
            <div className="timeline-line" />

            {[
              {
                role: 'Full-Stack Developer Intern',
                company: 'StartupLab Business Center & AI Consulting Agency OPC',
                duration: 'Feb 2026 - May 2026',
                desc: 'Worked on loan reminder systems and AI-powered workflows. Handled databases, email queues, and server configurations for production applications.',
                badge: 'Internship'
              },
              {
                role: 'Freelance Software Developer',
                company: 'Self-employed',
                duration: 'Jun 2023 - Present',
                desc: 'Built and shipped 10+ production applications across retail, e-commerce, POS platforms, and academic management systems.',
                badge: 'Freelance'
              }
            ].map((exp, i) => (
              <div key={i} className="timeline-item" style={{ position: 'relative', paddingLeft: '2.5rem', textAlign: 'left' }}>
                <div className="timeline-dot" />
                <div className="card-glass" style={{ background: 'var(--bg-secondary)', padding: '1.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        {exp.role}
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          color: 'var(--text-secondary)'
                        }}>{exp.badge}</span>
                      </h3>
                      <span style={{ fontSize: '0.95rem', color: 'var(--accent-color)', fontWeight: '600', display: 'block', marginTop: '0.2rem' }}>{exp.company}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--mono-font)' }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Works (Projects) */}
        <section id="projects" style={{ padding: '5rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Works</p>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1.5px', margin: 0 }}>Selected Projects</h2>
            </div>
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--accent-color)',
                fontSize: '0.85rem',
                fontWeight: '700',
                textDecoration: 'underline'
              }}
            >
              {showAllProjects ? 'Show Less' : 'View All Projects'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Featured Project (Large layout) */}
            <div className="card-glass" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '2rem', padding: '2.5rem' }}>
              <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'center', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', color: 'var(--accent-color)', padding: '0.2rem 0.6rem', borderRadius: '4px', textTransform: 'uppercase' }}>Featured Project</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--mono-font)' }}>Previous System</span>
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>BBEK Administration System</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Previous System: Comprehensive administration platform for church operations.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {['Vue.js', 'Node.js', 'MySQL'].map(t => <SkillTag key={t} name={t} />)}
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a href="https://biblebaptistekklesiaofkawit.xyz/" target="_blank" rel="noreferrer" className="btn-glow" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>
                    Launch Site <FaExternalLinkAlt size={11} />
                  </a>
                </div>
              </div>

              <div style={{ flex: 0.8, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', minHeight: '260px', position: 'relative' }}>
                <img src={project1Image} alt="BBEK Administration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Grid of Other Projects */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                { title: 'StartupLab Ticketing System', img: project4Image, url: 'https://startuplab-event-creation.vercel.app/', desc: 'Previous System: End-to-end event ticketing and management platform.', tags: ['React', 'Node.js', 'PostgreSQL'] },
                { title: 'DormPulse Student Housing', img: dormpulseImage, url: 'https://studnet-iota.vercel.app/', desc: 'A premium student housing locator platform designed to help students find, review, and track housing units with ease. Features real-time tracking, interactive mapping, and comprehensive listings management.', tags: ['React', 'FastAPI', 'Supabase', 'Tailwind CSS'] },
                { title: 'Baby Bliss Booking', img: project2Image, url: 'https://babyblissbooking.vercel.app/', desc: 'Advanced appointment system for wellness and spa centers.', tags: ['React', 'Tailwind', 'Vercel'] },
                { title: 'LaundroSaaS Management', img: laundrosaasImage, url: 'https://laundro-phi.vercel.app/', desc: 'A comprehensive laundry management SaaS platform featuring real-time order tracking, customer management, and automated revenue reporting.', tags: ['React', 'Tailwind', 'Vite'] },
                { title: 'MedFlow Healthcare Management', img: medflowImage, url: 'https://medflow-two.vercel.app/', desc: 'A modern healthcare management system for hospitals and clinics, featuring real-time analytics, patient tracking, and appointment scheduling.', tags: ['React', 'Vite', 'Tailwind'] },
                { title: 'NAgCO Loan Management System', img: nagcoDashboardImage, url: 'https://nagcoloanmanagementsystem.vercel.app/', desc: 'A comprehensive loan management platform for the Napilihan Agriculture Cooperative, featuring automated workflows and real-time tracking.', tags: ['Next.js', 'Tailwind', 'Supabase'] },
                { title: 'Artisano & Co. Pizzeria', img: artisanoImage, url: 'https://pizza-theta-inky.vercel.app/', desc: 'A premium digital presence for an artisanal pizzeria, featuring a cinematic design and Next.js performance.', tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
                { title: 'BigBrew POS System', img: bigbrewPOSImage, url: 'https://brew-sxrs.vercel.app/', desc: 'Coffee Shop Point of Sale System with Real-Time Analytics Dashboard.', tags: ['React', 'Vite', 'Tailwind', 'Node.js'] },
                { title: 'Event Registration System', img: project3Image, url: 'https://startuplab-event-registration.vercel.app/', desc: 'Streamlined registration platform for university and academic events.', tags: ['Laravel', 'PHP', 'MySQL'] }
              ].slice(0, showAllProjects ? undefined : 3).map((p, i) => (
                <div key={i} className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: 0, background: 'var(--bg-secondary)' }}>
                  <a href={p.url} target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', height: '180px', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                  </a>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'space-between', textAlign: 'left' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>{p.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '0.5rem', margin: 0 }}>{p.desc}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                      {p.tags.map(t => <SkillTag key={t} name={t} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Certifications & Recommendations */}
        <section id="credentials" style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: '4rem', alignItems: 'start' }}>
            
            {/* Left: Certifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Certifications</p>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>Credentials</h2>
              </div>

              {[
                {
                  name: 'Full-Stack Developer Internship',
                  issuer: 'StartupLab Business Center & AI Consulting Agency OPC',
                  url: 'https://drive.google.com/file/d/1cglPPYuWbCDnZOVmWlq5bx0pZ3keFK1M/view?usp=drive_link'
                }
              ].map((cert, i) => (
                <div
                  key={i}
                  onClick={() => cert.url !== '#' && window.open(cert.url, '_blank')}
                  className="card-glass"
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '1.5rem',
                    cursor: cert.url !== '#' ? 'pointer' : 'default',
                    display: 'flex',
                    gap: '1.2rem',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'rgba(139, 92, 246, 0.08)',
                    border: '1.5px solid var(--border-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FaLaptopCode size={20} style={{ color: 'var(--accent-color)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '750', margin: 0 }}>{cert.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.2rem' }}>{cert.issuer}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Recommendations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.4rem' }}>Colleagues & Clients</p>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>Reviews</h2>
                </div>
                <button
                  onClick={() => setIsFeedbackModalOpen(true)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--accent-color)',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textDecoration: 'underline'
                  }}
                >
                  Write a Review
                </button>
              </div>

              <RecommendationSlider testimonials={testimonials} />
            </div>

          </div>
        </section>



        {/* Section 7: Gallery */}
        <Gallery />

      </main>

      {/* Footer */}
      <footer id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0 3rem 0', background: 'var(--bg-primary)' }}>
        <div className="container-custom" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Top Contact Details Row */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2.5rem', textAlign: 'left' }}>
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontFamily: 'var(--mono-font)', textTransform: 'uppercase', letterSpacing: '2px' }}>Connection</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', margin: 0, color: '#fff' }}>Let's work together</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, maxWidth: '480px' }}>
                Have an idea, project, or full-time position you'd like to discuss? Drop me a message and I'll get back to you as soon as possible.
              </p>
            </div>
            
            <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: isMobile ? 'flex-start' : 'center', fontFamily: 'var(--mono-font)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                <FaEnvelope style={{ color: 'var(--accent-color)' }} />
                <a href="mailto:johncarloaganan.startuplab@gmail.com" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>
                  johncarloaganan.startuplab@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                <FaMapMarkerAlt style={{ color: 'var(--accent-color)' }} />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Naic, Cavite, Philippines</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />

          {/* Bottom Copyright & Socials */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
              © 2026 John Carlo Aganan. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><FaGithub size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}><FaLinkedin size={18} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Dynamic ChatBot Panel */}
      <ChatBot />

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10005, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-glass"
              style={{ width: '100%', maxWidth: '440px', background: 'var(--bg-secondary)', zIndex: 1, padding: '2.5rem' }}
            >
              <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1.2rem', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-primary)' }}>×</button>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>Service Inquiry</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Interested in <strong>{currentService?.title}</strong>? Let me know your requirements below.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
                <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="Your Name" className="form-input" />
                <input name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="Your Email" className="form-input" />
                <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="Tell me about your project..." rows="3" className="form-input" style={{ resize: 'none' }}></textarea>

                {formStatus.message && (
                  <div style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontWeight: '600', color: formStatus.success ? '#10b981' : '#ef4444' }}>
                    {formStatus.message}
                  </div>
                )}

                <button type="submit" disabled={formStatus.loading} className="btn-glow" style={{ width: '100%', borderRadius: '10px' }}>
                  {formStatus.loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10006, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFeedbackModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-glass"
              style={{ width: '100%', maxWidth: '440px', background: 'var(--bg-secondary)', zIndex: 1, padding: '2.5rem' }}
            >
              <button onClick={() => setIsFeedbackModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1.2rem', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-primary)' }}>×</button>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>Write a Review</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Your feedback is highly valued.</p>

              <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
                <input name="name" value={feedbackData.name} onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })} required type="text" placeholder="Your Name" className="form-input" />
                <input name="email" value={feedbackData.email} onChange={(e) => setFeedbackData({ ...feedbackData, email: e.target.value })} required type="email" placeholder="Your Email" className="form-input" />
                <input name="role" value={feedbackData.role} onChange={(e) => setFeedbackData({ ...feedbackData, role: e.target.value })} required type="text" placeholder="Role / Company (e.g. Developer @ CvSU)" className="form-input" />
                
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Rating</label>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '0.2rem' }}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button key={num} type="button" onClick={() => setFeedbackData({ ...feedbackData, rating: num })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: num <= feedbackData.rating ? '#fbbf24' : '#444' }}>
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea name="content" value={feedbackData.content} onChange={(e) => setFeedbackData({ ...feedbackData, content: e.target.value })} required placeholder="What was it like working with me?" rows="3" className="form-input" style={{ resize: 'none' }}></textarea>

                {feedbackStatus.success && (
                  <div style={{ padding: '0.6rem 0.8rem', fontSize: '0.8rem', fontWeight: '600', color: '#10b981', textAlign: 'center' }}>
                    Review submitted! It will appear once approved.
                  </div>
                )}

                <button type="submit" disabled={feedbackStatus.loading} className="btn-glow" style={{ width: '100%', borderRadius: '10px' }}>
                  {feedbackStatus.loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ----------------------------------------------------------------------
// AI chatbot Component (Interacts with local secure groq endpoint)
// ----------------------------------------------------------------------
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "👋 Hi there! I'm John's AI assistant. Ask me anything about his skills, projects, or background!" }
  ]);
  
  const messagesEndRef = useRef(null);

  const SYSTEM_PROMPT = `You are John Carlo Aganan's (often called 'Ulac') personal AI assistant.
  John Carlo is a Full-Stack Developer specializing in React, Node.js, and Supabase.
  He is in his 4th Year of BSIT at Cavite State University. He lives in Naic, Cavite, Philippines.
  Key projects include DormPulse (Student locator), LaundroSaaS, MedFlow (Healthcare), and NAgCO (Cooperative loan management).
  Keep answers brief, highly professional, and strictly relevant to his portfolio. Refuse unrelated requests.`;

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const chatHistory = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: userText }
      ];

      const response = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: chatHistory,
          max_tokens: 250,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'bot', text: "Oops! Something went wrong. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 10003, pointerEvents: 'auto' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="chat-window"
            style={{
              width: '360px',
              height: '480px',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              marginBottom: '1rem',
              textAlign: 'left'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', margin: 0 }}>Chat with John's AI</h3>
                <span style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span style={{ width: '5px', height: '5px', background: '#10b981', borderRadius: '50%' }} /> Active
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
            </div>

            {/* Message Body */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: '#08080f' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    padding: '0.6rem 0.9rem',
                    borderRadius: m.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    background: m.sender === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.85rem',
                    lineHeight: '1.4'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '0.5rem 0.8rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px 12px 12px 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Assistant is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} style={{ padding: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '0.5rem' }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.8rem',
                  fontSize: '0.85rem',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="btn-glow" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="btn-glow"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '12px',
            padding: '0.8rem 1.4rem',
            boxShadow: '0 10px 25px rgba(139,92,246,0.3)'
          }}
        >
          <FaQuoteRight size={14} />
          <span>Ask AI Assistant</span>
        </motion.button>
      )}
    </div>
  );
};

export default App;
