import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient';
import { respond } from './bot/respond';
import {
  FaEnvelope, FaMapMarkerAlt, FaCode, FaMoon, FaSun,
  FaLinkedin, FaBars, FaTimes, FaGithub, FaCalendarAlt,
  FaChevronRight, FaChevronLeft, FaStar, FaLaptopCode,
  FaCheck, FaCheckCircle, FaUser, FaLock, FaExternalLinkAlt,
  FaDesktop, FaCoffee
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
import bbekLogo from './bbek-logo.png';
import babyblissLogo from './babybliss-logo.png';
import nagcoLogo from './nagco-logo.png';
import startuplabLogo from './startuplab-logo.webp';
import dormpulseLogo from './dormpulse-logo.png';
import laundrosaasLogo from './laundrosaas-logo.png';
import medflowLogo from './medflow-logo.png';
import artisanoLogo from './artisano-logo.png';
import bigbrewLogo from './bigbrew-logo.png';

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
const Gallery = ({ onImageClick }) => {
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
            <img src={src} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)', transition: 'filter 0.3s, transform 0.4s', cursor: 'pointer' }}
              onClick={() => onImageClick && onImageClick(images, i)}
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
// Project 3D Carousel Component & Data
// ─────────────────────────────────────────────────────────────
const ALL_PROJECTS_DATA = [
  {
    title: 'BBEK Administration System',
    img: project1Image,
    url: 'https://biblebaptistekklesiaofkawit.xyz/',
    desc: 'Comprehensive administration platform for church operations — member management, event scheduling, and financial reporting.',
    tags: ['Vue.js', 'Node.js', 'MySQL'],
    badge: 'CHURCH ADMIN SYSTEM',
    gradient: '#ffffff',
    icon: <img src={bbekLogo} alt="BBEK Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'StartupLab Ticketing',
    img: project4Image,
    url: 'https://startuplab-event-creation.vercel.app/',
    desc: 'End-to-end event ticketing and management platform.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    badge: 'EVENT TICKETING SAAS',
    gradient: '#ffffff',
    icon: <img src={startuplabLogo} alt="StartupLab Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'DormPulse Student Housing',
    img: dormpulseImage,
    url: 'https://studnet-iota.vercel.app/',
    desc: 'Premium student housing locator with real-time tracking, interactive mapping, and an AI recommendation chatbot.',
    tags: ['React', 'FastAPI', 'Supabase Vector', 'OpenAI'],
    badge: 'STUDENT HOUSING LOCATOR',
    gradient: '#ffffff',
    icon: <img src={dormpulseLogo} alt="DormPulse Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'Baby Bliss Booking',
    img: project2Image,
    url: 'https://babyblissbooking.vercel.app/',
    desc: 'Advanced appointment system for wellness and spa centers.',
    tags: ['React', 'Tailwind', 'Vercel'],
    badge: 'WELLNESS BOOKING SYSTEM',
    gradient: 'linear-gradient(135deg, #f472b6, #db2777)',
    icon: <img src={babyblissLogo} alt="Baby Bliss Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
  },
  {
    title: 'LaundroSaaS Management',
    img: laundrosaasImage,
    url: 'https://laundro-phi.vercel.app/',
    desc: 'Comprehensive laundry SaaS with real-time order tracking and revenue reporting.',
    tags: ['React', 'Vite'],
    badge: 'LAUNDRY SAAS PLATFORM',
    gradient: '#ffffff',
    icon: <img src={laundrosaasLogo} alt="LaundroSaaS Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'MedFlow Healthcare',
    img: medflowImage,
    url: 'https://medflow-two.vercel.app/',
    desc: 'Healthcare management system with real-time analytics, patient tracking, and AI-assisted clinical note generation.',
    tags: ['React', 'Vite', 'OpenAI API'],
    badge: 'HEALTHCARE DASHBOARD',
    gradient: '#ffffff',
    icon: <img src={medflowLogo} alt="MedFlow Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'NAgCO Loan System',
    img: nagcoDashboardImage,
    url: 'https://nagcoloanmanagementsystem.vercel.app/',
    desc: 'Cooperative loan platform with automated workflows, real-time tracking, and AI-assisted loan eligibility pre-screening.',
    tags: ['Next.js', 'Supabase', 'Claude API'],
    badge: 'COOPERATIVE LOAN SYSTEM',
    gradient: '#ffffff',
    icon: <img src={nagcoLogo} alt="NAgCO Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'Artisano Pizzeria',
    img: artisanoImage,
    url: 'https://pizza-theta-inky.vercel.app/',
    desc: 'Cinematic digital presence for an artisanal pizzeria.',
    tags: ['Next.js', 'Framer Motion'],
    badge: 'CINEMATIC PIZZA WEBSITE',
    gradient: '#ffffff',
    icon: <img src={artisanoLogo} alt="Artisano Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'BigBrew POS System',
    img: bigbrewPOSImage,
    url: 'https://brew-sxrs.vercel.app/',
    desc: 'Coffee shop POS with real-time analytics dashboard.',
    tags: ['React', 'Node.js'],
    badge: 'COFFEE SHOP POS',
    gradient: '#ffffff',
    icon: <img src={bigbrewLogo} alt="BigBrew Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    title: 'Event Registration System',
    img: project3Image,
    url: 'https://startuplab-event-registration.vercel.app/',
    desc: 'Streamlined registration for university and academic events.',
    tags: ['Laravel', 'MySQL'],
    badge: 'EVENT REGISTRATION APP',
    gradient: '#ffffff',
    icon: <img src={startuplabLogo} alt="StartupLab Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }
];

const Project3DCarousel = ({ projects, isMobile, isDark }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  const total = projects.length;
  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
      <div style={{ position: 'relative', width: '100%', height: '340px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        perspective: '1000px',
        padding: '1rem 0'
      }}>
        {projects.map((project, idx) => {
          let position = 'hidden';
          if (idx === activeIndex) position = 'center';
          else if (idx === leftIndex && !isMobile) position = 'left';
          else if (idx === rightIndex && !isMobile) position = 'right';

          if (position === 'hidden') return null;

          const isCenter = position === 'center';
          const isLeft = position === 'left';
          const isRight = position === 'right';

          let translate = '0px';
          let rotate = '0deg';
          let scale = 1;
          let zIndex = 10;
          let opacity = 1;

          if (isLeft) {
            translate = '-130px';
            rotate = '-6deg';
            scale = 0.92;
            zIndex = 5;
            opacity = 0.85;
          } else if (isRight) {
            translate = '130px';
            rotate = '6deg';
            scale = 0.92;
            zIndex = 5;
            opacity = 0.85;
          }

          return (
            <motion.div
              key={project.title}
              onClick={() => {
                if (isLeft) handlePrev();
                if (isRight) handleNext();
              }}
              style={{
                position: 'absolute',
                width: 'clamp(240px, 32vw, 300px)',
                height: '300px',
                background: isDark ? '#0d0d11' : '#ffffff',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid var(--gray-200)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isCenter ? (isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.08)') : (isDark ? '0 10px 20px -5px rgba(0, 0, 0, 0.3)' : '0 10px 20px -5px rgba(0, 0, 0, 0.05)'),
                cursor: isCenter ? 'default' : 'pointer',
                userSelect: 'none',
                zIndex,
                transformStyle: 'preserve-3d',
                x: translate,
                rotateZ: rotate,
                scale,
                opacity
              }}
              animate={{
                x: translate,
                rotateZ: rotate,
                scale,
                opacity,
                zIndex
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Card Badge */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
                  color: isDark ? '#ffffff' : 'var(--ink)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--gray-200)',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  boxShadow: isDark ? '0 2px 4px rgba(0,0,0,0.15)' : 'none'
                }}>
                  {project.badge}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', flex: 1, justifyContent: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: (project.gradient === '#ffffff') ? (isDark ? '#18181b' : '#ffffff') : project.gradient,
                  border: (project.gradient === '#ffffff' && !isDark) ? '1px solid var(--gray-200)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#ffffff' : 'var(--ink)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  overflow: 'hidden'
                }}>
                  {project.icon}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: isDark ? '#ffffff' : 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.8125rem', color: isDark ? '#a1a1aa' : 'var(--gray-500)', lineHeight: '1.5', margin: '0.5rem 0 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer (Launch Link button) */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#f4f4f5',
                    color: isDark ? '#ffffff' : 'var(--ink)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--gray-200)',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.12)' : '#e4e4e7'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : '#f4f4f5'; }}
                >
                  Launch Project <FaExternalLinkAlt size={10} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={handlePrev} style={{
          width: '36px', height: '36px',
          border: '1px solid var(--gray-300)',
          background: 'var(--bg)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gray-500)',
          transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.color = 'var(--gray-500)'; }}
        >
          <FaChevronLeft size={12} />
        </button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gray-400)' }}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button onClick={handleNext} style={{
          width: '36px', height: '36px',
          border: '1px solid var(--gray-300)',
          background: 'var(--bg)',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gray-500)',
          transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.color = 'var(--ink)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.color = 'var(--gray-500)'; }}
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// GitHub Contributions Halftone Component
// ─────────────────────────────────────────────────────────────
const GithubContributions = () => {
  const cols = 53;
  const rows = 7;
  
  // Real active commits directly verified from https://github.com/Ulacdev
  const defaultCommits = [
    { col: 2, row: 0, level: 1, date: '2025-10-26' },
    { col: 12, row: 0, level: 1, date: '2026-01-04' },
    { col: 28, row: 0, level: 3, date: '2026-04-26' },
    { col: 29, row: 0, level: 1, date: '2026-05-03' },
    { col: 4, row: 1, level: 3, date: '2025-11-10' },
    { col: 25, row: 1, level: 1, date: '2026-04-06' },
    { col: 9, row: 2, level: 4, date: '2025-12-16' },
    { col: 10, row: 2, level: 3, date: '2025-12-23' },
    { col: 15, row: 2, level: 1, date: '2026-01-27' },
    { col: 45, row: 2, level: 1, date: '2026-08-25' },
    { col: 9, row: 3, level: 4, date: '2025-12-17' },
    { col: 39, row: 4, level: 4, date: '2026-07-16' },
    { col: 4, row: 5, level: 2, date: '2025-11-14' },
    { col: 9, row: 5, level: 4, date: '2025-12-19' },
    { col: 27, row: 5, level: 1, date: '2026-04-24' },
    { col: 1, row: 6, level: 1, date: '2025-10-25' },
    { col: 4, row: 6, level: 4, date: '2025-11-15' },
    { col: 20, row: 6, level: 2, date: '2026-03-07' }
  ];

  const [activeCommits, setActiveCommits] = useState(defaultCommits);
  const [totalContributions, setTotalContributions] = useState(112);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const BASE = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;
        const res = await fetch(`${BASE}/api/github-contributions`);
        if (res.ok) {
          const data = await res.json();
          if (data.total) setTotalContributions(data.total);
          if (data.active && data.active.length > 0) setActiveCommits(data.active);
        }
      } catch (_) {}
    };
    fetchContributions();
  }, []);

  const cells = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const active = activeCommits.find(item => item.col === c && item.row === r);
      
      let radius = 1.1;
      let opacity = 0.12;
      
      if (active) {
        if (active.level === 4) {
          radius = 5.8;
          opacity = 0.95;
        } else if (active.level === 3) {
          radius = 4.6;
          opacity = 0.92;
        } else if (active.level === 2) {
          radius = 3.4;
          opacity = 0.85;
        } else if (active.level === 1) {
          radius = 2.4;
          opacity = 0.75;
        }
      }

      cells.push({
        cx: 6.5 + c * 13,
        cy: 6.5 + r * 13,
        r: radius,
        opacity
      });
    }
  }

  return (
    <section id="github" style={{ padding: '5rem 0', borderTop: '1px solid var(--gray-200)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
        <div>
          <div className="section-label">09 — GitHub</div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', margin: 0 }}>Contributions</h2>
        </div>
        <a 
          href="https://github.com/Ulacdev" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--gray-500)',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-500)'}
        >
          @Ulacdev ↗
        </a>
      </div>

      <a 
        href="https://github.com/Ulacdev" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ display: 'block', color: 'var(--ink)', textDecoration: 'none' }}
      >
        <svg 
          viewBox="0 0 689 91" 
          style={{ width: '100%', height: 'auto' }}
          preserveAspectRatio="xMidYMid meet"
          aria-label="GitHub contribution graph, halftone style"
        >
          {cells.map((cell, i) => (
            <circle 
              key={i} 
              cx={cell.cx} 
              cy={cell.cy} 
              r={cell.r} 
              fill="currentColor" 
              opacity={cell.opacity} 
            />
          ))}
        </svg>
      </a>

      <p style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '0.6875rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em', 
        color: 'var(--gray-400)', 
        marginTop: '1rem',
        margin: 0 
      }}>
        {totalContributions} contributions in the last year
      </p>
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
// ─────────────────────────────────────────────────────────────
// Proficiency ratings revealed on hover in the Technical Toolkit
// ─────────────────────────────────────────────────────────────
const SKILL_LEVELS = {
  'React': 92,
  'Vue.js': 84,
  'Next.js': 80,
  'HTML5': 95,
  'CSS3': 93,
  'Tailwind CSS': 88,
  'Node.js': 90,
  'Express.js': 88,
  'Laravel': 76,
  'Python (FastAPI)': 74,
  'PHP': 72,
  'Groq': 78,
  'OpenAI': 86,
  'Claude': 84,
  'Codex': 82,
  'MySQL': 88,
  'PostgreSQL': 82,
  'Supabase': 85,
  'Clever Cloud': 75,
  'Git': 90,
  'GitHub': 90,
  'VS Code': 95,
  'Cursor': 88,
  'Antigravity': 70,
  'Vercel': 85,
  'Render': 80
};

// Fire-and-forget bridge so sidebar entries can open the fullscreen overlays
const launchOverlay = name => window.dispatchEvent(new CustomEvent('ulac-overlay', { detail: name }));

function App() {
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImages([]);
        setLightboxIndex(-1);
      } else if (e.key === 'ArrowRight' && lightboxImages.length > 1) {
        setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
      } else if (e.key === 'ArrowLeft' && lightboxImages.length > 1) {
        setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImages]);

  const [activeSection, setActiveSection] = useState('hero');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [view, setView] = useState('portfolio');
  const [misView, setMisView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('Oct 1, 2025 – Oct 31, 2025');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return 'system';
  });

  const handleSetTheme = (newTheme) => {
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }
    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  const [resolvedDark, setResolvedDark] = useState(false);
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
    const r = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
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
    setMenuOpen(false);
    window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const headerOffset = isMobile ? 64 : 0;
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerOffset);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const BASE = window.location.origin.includes(':3000') ? window.location.origin.replace(':3000', ':5001') : window.location.origin;

  const handleSubmit = async e => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });
    try {
      const res = await fetch(`${BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: currentService?.title || 'General Inquiry',
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error('Failed to send message.');
      setFormStatus({ loading: false, success: true, error: false, message: 'Message sent. Thank you!' });
      setFormData({ name: '', email: '', message: '' });
      if (isLoggedIn) fetchInquiries();
      setTimeout(() => setFormStatus({ ...formStatus, success: false }), 5000);
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: true, message: err.message || 'Something went wrong.' });
    }
  };

  const fetchInquiries = async () => {
    try {
      const res = await fetch(`${BASE}/api/admin/inquiries`);
      if (!res.ok) throw new Error('Failed to load inquiries');
      const json = await res.json();
      setInquiries(json.data || []);
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
      setInquiries([]);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${BASE}/api/admin/testimonials`);
      if (!res.ok) throw new Error('Failed to load testimonials');
      const json = await res.json();
      setTestimonials(json.data || []);
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      setTestimonials([]);
    }
  };

  const toggleTestimonialApproval = async (id, cur) => {
    try {
      const res = await fetch(`${BASE}/api/admin/testimonials/${id}/approval`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to update testimonial');
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to toggle testimonial approval:', err);
    }
  };

  const deleteInquiry = async id => {
    try {
      const res = await fetch(`${BASE}/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete inquiry');
      fetchInquiries();
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const deleteTestimonial = async id => {
    try {
      const res = await fetch(`${BASE}/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      fetchTestimonials();
    } catch (err) {
      console.error('Failed to delete testimonial:', err);
    }
  };

  const handleFeedbackSubmit = async e => {
    e.preventDefault();
    setFeedbackStatus({ loading: true, success: false });
    try {
      const res = await fetch(`${BASE}/api/testimonial-thanks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedbackData.name,
          email: feedbackData.email,
          role: feedbackData.role,
          rating: feedbackData.rating,
          content: feedbackData.content,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit testimonial.');
      setFeedbackStatus({ loading: false, success: true });
      setFeedbackData({ name: '', email: '', role: '', content: '', rating: 5 });
      fetchTestimonials();
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
    const handleAdminRefresh = () => {
      if (isLoggedIn) fetchInquiries();
      fetchTestimonials();
    };
    window.addEventListener('ulac-admin-refresh', handleAdminRefresh);
    return () => window.removeEventListener('ulac-admin-refresh', handleAdminRefresh);
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setTimeout(() => setPreloaderRemoved(true), 600);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    ['hero', 'about', 'services', 'experience', 'projects', 'credentials', 'gallery', 'github', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, []);

  const fetchViews = async () => {
    try {
      const res = await fetch(`${BASE}/api/admin/views`);
      if (!res.ok) throw new Error('Failed to load views');
      const json = await res.json();
      setTotalViews(json.views || 0);
    } catch (_) {}
  };

  const handleAdminRefreshAll = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchInquiries(),
        fetchTestimonials(),
        fetchViews(),
      ]);
    } finally {
      setTimeout(() => setIsRefreshing(false), 700);
    }
  };

  useEffect(() => {
    fetchViews();
  }, []);

  if (isLoggedIn === null) {
    return (
      <div style={{ height: '100vh', background: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader" />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // MIS View — Dark Obsidian Executive Console (/ulac)
  // ─────────────────────────────────────────────────────────
  if (view === 'mis') {
    if (!isLoggedIn) {
      return (
        <div className="mis-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="2.5" y="4.5" width="7" height="15" rx="3.5" stroke="#f97316" strokeWidth="2.5" />
                <rect x="14.5" y="4.5" width="7" height="15" rx="3.5" stroke="#f97316" strokeWidth="2.5" />
                <line x1="8" y1="12" x2="16" y2="12" stroke="#f97316" strokeWidth="2.5" />
              </svg>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>Ulacdev MIS</h1>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Management Console</p>
          </div>

          <div className="mis-card" style={{ width: '100%', maxWidth: '380px', padding: '2.25rem 2rem' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>USERNAME OR EMAIL</label>
                  <input
                    type="text"
                    placeholder="ulac"
                    value={loginForm.email}
                    onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'rgba(8, 11, 18, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'var(--font-body)'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 2px rgba(249, 115, 22, 0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>PASSWORD</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      background: 'rgba(8, 11, 18, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'var(--font-body)'
                    }}
                    onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 2px rgba(249, 115, 22, 0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.boxShadow = 'none'; }}
                    required
                  />
                </div>
              </div>

              {loginError && <p style={{ fontSize: '0.8125rem', color: '#ef4444', margin: 0 }}>{loginError}</p>}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#f97316',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(249, 115, 22, 0.35)',
                  transition: 'opacity 0.2s',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setView('portfolio'); window.location.hash = ''; if (window.location.pathname === '/ulac') window.history.pushState({}, '', '/'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#cbd5e1'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >
                ← Back to portfolio
              </button>
            </form>
          </div>
        </div>
      );
    }

    const formatActivityDate = (dateStr) => {
      if (!dateStr) return 'Recently';
      try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[d.getMonth()];
        const day = d.getDate();
        const year = d.getFullYear();
        let hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours.toString().padStart(2, '0') : '12';
        return `${month} ${day}, ${year} • ${hours}:${minutes} ${ampm}`;
      } catch (_) {
        return dateStr;
      }
    };

    const fallbackActivities = [
      {
        id: 'mock-1',
        type: 'review',
        title: 'New review approved',
        desc: 'A new testimonial has been approved and is now live on your site.',
        time: 'Oct 25, 2025 • 10:24 AM'
      },
      {
        id: 'mock-2',
        type: 'inquiry',
        title: 'New inquiry received',
        desc: 'You have received a new inquiry from a potential client.',
        time: 'Oct 24, 2025 • 04:17 PM'
      },
      {
        id: 'mock-3',
        type: 'review',
        title: 'New review approved',
        desc: 'A new testimonial has been approved and is now live on your site.',
        time: 'Oct 22, 2025 • 09:36 AM'
      },
      {
        id: 'mock-4',
        type: 'inquiry',
        title: 'New inquiry received',
        desc: 'You have received a new inquiry from a potential client.',
        time: 'Oct 20, 2025 • 02:11 PM'
      }
    ];

    const dynamicActivities = [
      ...testimonials.filter(t => t.is_approved).map(t => ({
        id: `rev-${t.id}`,
        type: 'review',
        title: 'New review approved',
        desc: t.name ? `Review from ${t.name} has been approved and is now live on your site.` : 'A new testimonial has been approved and is now live on your site.',
        time: formatActivityDate(t.created_at),
        rawTime: t.created_at ? new Date(t.created_at).getTime() : 0
      })),
      ...inquiries.map(i => ({
        id: `inq-${i.id}`,
        type: 'inquiry',
        title: 'New inquiry received',
        desc: i.name ? `You have received a new inquiry from ${i.name}.` : 'You have received a new inquiry from a potential client.',
        time: formatActivityDate(i.created_at),
        rawTime: i.created_at ? new Date(i.created_at).getTime() : 0
      }))
    ].sort((a, b) => b.rawTime - a.rawTime);

    const displayActivities = dynamicActivities.length > 0 ? dynamicActivities.slice(0, 6) : fallbackActivities;

    const q = searchQuery.toLowerCase().trim();
    const filteredInquiries = q ? inquiries.filter(r =>
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.subject && r.subject.toLowerCase().includes(q)) ||
      (r.message && r.message.toLowerCase().includes(q))
    ) : inquiries;

    const filteredTestimonials = q ? testimonials.filter(r =>
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.role && r.role.toLowerCase().includes(q)) ||
      (r.content && r.content.toLowerCase().includes(q))
    ) : testimonials;

    const filteredActivities = q ? displayActivities.filter(a =>
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.desc && a.desc.toLowerCase().includes(q))
    ) : displayActivities;

    return (
      <div className="mis-shell" style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        {/* ── Left Sidebar ────────────────────────────── */}
        <div
          className="mis-sidebar"
          style={{
            width: isMobile ? '100%' : (sidebarCollapsed ? '72px' : '240px'),
            minWidth: isMobile ? '100%' : (sidebarCollapsed ? '72px' : '240px'),
            height: isMobile ? 'auto' : '100vh',
            position: isMobile ? 'relative' : 'sticky',
            padding: sidebarCollapsed && !isMobile ? '1.75rem 0.75rem' : '1.75rem 1.25rem',
            transition: 'width 0.25s ease, min-width 0.25s ease, padding 0.25s ease'
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: isMobile ? '1.25rem' : '2.25rem', overflow: 'hidden' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <rect x="2.5" y="4.5" width="7" height="15" rx="3.5" stroke="#f97316" strokeWidth="2.5" />
              <rect x="14.5" y="4.5" width="7" height="15" rx="3.5" stroke="#f97316" strokeWidth="2.5" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="#f97316" strokeWidth="2.5" />
            </svg>
            {(!sidebarCollapsed || isMobile) && (
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                Ulacdev MIS
              </span>
            )}
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '0.35rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <button
              onClick={() => setMisView('dashboard')}
              className={`mis-nav-btn ${misView === 'dashboard' ? 'active' : ''}`}
              style={{ justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start', padding: sidebarCollapsed && !isMobile ? '0.72rem 0' : '0.72rem 0.95rem' }}
              title={sidebarCollapsed && !isMobile ? 'Dashboard' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={misView === 'dashboard' ? '#f97316' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              {(!sidebarCollapsed || isMobile) && <span>Dashboard</span>}
            </button>

            <button
              onClick={() => setMisView('inquiries')}
              className={`mis-nav-btn ${misView === 'inquiries' ? 'active' : ''}`}
              style={{ justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start', padding: sidebarCollapsed && !isMobile ? '0.72rem 0' : '0.72rem 0.95rem' }}
              title={sidebarCollapsed && !isMobile ? 'Inquiries' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={misView === 'inquiries' ? '#f97316' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {(!sidebarCollapsed || isMobile) && <span>Inquiries</span>}
            </button>

            <button
              onClick={() => setMisView('testimonials')}
              className={`mis-nav-btn ${misView === 'testimonials' ? 'active' : ''}`}
              style={{ justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start', padding: sidebarCollapsed && !isMobile ? '0.72rem 0' : '0.72rem 0.95rem' }}
              title={sidebarCollapsed && !isMobile ? 'Testimonials' : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={misView === 'testimonials' ? '#f97316' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {(!sidebarCollapsed || isMobile) && <span>Testimonials</span>}
            </button>
          </nav>

          {/* Sign Out Button */}
          <div style={{ marginTop: isMobile ? '1rem' : 'auto', paddingTop: '1rem' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed && !isMobile ? 'center' : 'flex-start',
                gap: '0.75rem',
                padding: sidebarCollapsed && !isMobile ? '0.75rem 0' : '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: '#cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-body)',
                boxSizing: 'border-box'
              }}
              title={sidebarCollapsed && !isMobile ? 'Sign Out' : undefined}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {(!sidebarCollapsed || isMobile) && <span>Sign Out</span>}
            </button>
          </div>
        </div>

        {/* ── Right Content Wrapper ─────────────────────── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          
          {/* ── Top Header Bar ─────────────────────────── */}
          <header className="mis-topbar">
            {/* Left side: Hamburger collapse button & Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '480px' }}>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title="Toggle sidebar"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#cbd5e1'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              {/* Search bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                <svg
                  style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search inquiries, reviews..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.52rem 0.8rem 0.52rem 2.25rem',
                    background: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.825rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--font-body)',
                    transition: 'border-color 0.2s, background 0.2s'
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)'; e.target.style.background = 'rgba(255, 255, 255, 0.06)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.target.style.background = 'rgba(255, 255, 255, 0.035)'; }}
                />
              </div>
            </div>

            {/* Right side: Notifications & Logged-in User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Notification Bell */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = '#cbd5e1'; }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span style={{
                    position: 'absolute',
                    top: '7px',
                    right: '7px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#f97316',
                    boxShadow: '0 0 6px #f97316'
                  }} />
                </button>

                {showNotifications && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '290px',
                    background: '#0d121d',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '0.85rem',
                    zIndex: 60,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.65)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.04em' }}>NOTIFICATIONS</span>
                      <span style={{ fontSize: '0.68rem', color: '#f97316', background: 'rgba(249, 115, 22, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {inquiries.length + testimonials.filter(t => !t.is_approved).length} new
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                      <div style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', fontSize: '0.78rem' }}>
                        <div style={{ color: '#ffffff', fontWeight: 600 }}>System Online</div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.2rem' }}>All admin and dashboard modules running</div>
                      </div>
                      {inquiries.length > 0 && (
                        <div style={{ padding: '0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', fontSize: '0.78rem' }}>
                          <div style={{ color: '#ffffff', fontWeight: 600 }}>{inquiries.length} New Inquiries</div>
                          <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.2rem' }}>You have received messages from visitors</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Logged-in User Profile on Top Right Corner */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.3rem 0.65rem 0.3rem 0.4rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.035)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.035)'; }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: '#ffffff',
                    position: 'relative',
                    flexShrink: 0
                  }}>
                    U
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      border: '1.5px solid #080b11'
                    }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}>
                      {user?.email || 'Ulacdev'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                      Administrator
                    </div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.15rem' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '180px',
                    background: '#0d121d',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '0.4rem',
                    zIndex: 60,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.65)'
                  }}>
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '0.25rem' }}>
                      <div style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 600 }}>{user?.email || 'Ulacdev'}</div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Active Session</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '0.5rem 0.75rem',
                        color: '#ef4444',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-body)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ── Main View Body ─────────────────────────── */}
          <div style={{ flex: 1, padding: isMobile ? '1.5rem' : '2.5rem 3.5rem', minWidth: 0, boxSizing: 'border-box' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

              {/* Title Section & Date Filter / Refresh */}
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-start', gap: '1.25rem', marginBottom: '2.25rem' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, margin: '0 0 0.4rem 0' }}>MANAGEMENT</p>
                  <h1 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: 0, textTransform: 'capitalize' }}>
                    {misView}
                  </h1>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0.35rem 0 0 0' }}>
                    {misView === 'dashboard' && "Quick overview of your platform's activity and key metrics."}
                    {misView === 'inquiries' && "Manage and review messages sent through your contact form."}
                    {misView === 'testimonials' && "Moderate, approve, and manage client feedback and ratings."}
                  </p>
                </div>

                {/* Top Right Controls (Date Filter & Refresh) */}
                {misView === 'dashboard' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.55rem 0.95rem',
                          borderRadius: '9px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          background: 'rgba(15, 20, 31, 0.85)',
                          color: '#cbd5e1',
                          fontSize: '0.825rem',
                          cursor: 'pointer',
                          backdropFilter: 'blur(8px)',
                          transition: 'border-color 0.2s',
                          fontFamily: 'var(--font-body)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{dateRange}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {isDateDropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          right: 0,
                          background: '#0d121d',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          padding: '0.4rem',
                          minWidth: '210px',
                          zIndex: 50,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
                        }}>
                          {['Oct 1, 2025 – Oct 31, 2025', 'This Month', 'Last 30 Days', 'All Time'].map(opt => (
                            <div
                              key={opt}
                              onClick={() => { setDateRange(opt); setIsDateDropdownOpen(false); }}
                              style={{
                                padding: '0.5rem 0.75rem',
                                fontSize: '0.8rem',
                                color: dateRange === opt ? '#f97316' : '#cbd5e1',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontWeight: dateRange === opt ? 600 : 400
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleAdminRefreshAll}
                      title="Refresh data"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '38px',
                        height: '38px',
                        borderRadius: '9px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(15, 20, 31, 0.85)',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      <svg className={isRefreshing ? 'mis-spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 21h5v-5" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* ── VIEW: DASHBOARD ───────────────────────────── */}
              {misView === 'dashboard' && (
                <div>
                  {/* 3 Metric Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
                    {/* Card 1: Total Inquiries */}
                    <div className="mis-card" style={{ padding: '1.5rem 1.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          <line x1="9" y1="10" x2="9.01" y2="10" />
                          <line x1="12" y1="10" x2="12.01" y2="10" />
                          <line x1="15" y1="10" x2="15.01" y2="10" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8b96a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                          TOTAL INQUIRIES
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <span style={{ fontSize: '2.85rem', fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                          {inquiries.length}
                        </span>
                        <svg width="110" height="34" viewBox="0 0 110 34" fill="none" style={{ opacity: 0.85 }}>
                          <path d="M5 22 Q 25 18, 45 20 T 75 19 T 105 21" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="15" cy="20" r="2.5" fill="#475569" />
                          <circle cx="45" cy="20" r="2.5" fill="#475569" />
                          <circle cx="70" cy="19.5" r="2.5" fill="#475569" />
                          <circle cx="92" cy="20.5" r="2.5" fill="#475569" />
                          <circle cx="105" cy="21" r="2.5" fill="#475569" />
                        </svg>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        No change from last period
                      </div>
                    </div>

                    {/* Card 2: Approved Reviews */}
                    <div className="mis-card" style={{ padding: '1.5rem 1.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8b96a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                          APPROVED REVIEWS
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <span style={{ fontSize: '2.85rem', fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                          {testimonials.filter(t => t.is_approved).length > 0 ? testimonials.filter(t => t.is_approved).length : 2}
                        </span>
                        <svg width="110" height="34" viewBox="0 0 110 34" fill="none">
                          <defs>
                            <linearGradient id="mis-glow-orange-1" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M5 28 L 22 28 L 44 23 L 64 24 L 84 17 L 105 9 L 105 34 L 5 34 Z" fill="url(#mis-glow-orange-1)" />
                          <path d="M5 28 L 22 28 L 44 23 L 64 24 L 84 17 L 105 9" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="22" cy="28" r="2.5" fill="#f97316" />
                          <circle cx="44" cy="23" r="2.5" fill="#f97316" />
                          <circle cx="64" cy="24" r="2.5" fill="#f97316" />
                          <circle cx="84" cy="17" r="2.5" fill="#f97316" />
                          <circle cx="105" cy="9" r="2.5" fill="#f97316" />
                        </svg>
                      </div>

                      <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#22c55e', fontWeight: 600 }}>↑ 100%</span>
                        <span style={{ color: '#64748b' }}>vs. last period</span>
                      </div>
                    </div>

                    {/* Card 3: Site Views */}
                    <div className="mis-card" style={{ padding: '1.5rem 1.6rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8b96a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                          SITE VIEWS
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <span style={{ fontSize: '2.85rem', fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.03em' }}>
                          {totalViews > 0 ? totalViews : 34}
                        </span>
                        <svg width="110" height="34" viewBox="0 0 110 34" fill="none">
                          <defs>
                            <linearGradient id="mis-glow-orange-2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M5 28 L 18 24 L 36 27 L 54 15 L 72 22 L 90 12 L 105 18 L 105 34 L 5 34 Z" fill="url(#mis-glow-orange-2)" />
                          <path d="M5 28 L 18 24 L 36 27 L 54 15 L 72 22 L 90 12 L 105 18" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="18" cy="24" r="2.5" fill="#f97316" />
                          <circle cx="36" cy="27" r="2.5" fill="#f97316" />
                          <circle cx="54" cy="15" r="2.5" fill="#f97316" />
                          <circle cx="72" cy="22" r="2.5" fill="#f97316" />
                          <circle cx="90" cy="12" r="2.5" fill="#f97316" />
                          <circle cx="105" cy="18" r="2.5" fill="#f97316" />
                        </svg>
                      </div>

                      <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ color: '#22c55e', fontWeight: 600 }}>↑ 32%</span>
                        <span style={{ color: '#64748b' }}>vs. last period</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Card */}
                  <div className="mis-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.4rem 1.6rem 1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{ marginTop: '0.15rem' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div>
                          <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, fontFamily: 'var(--font-mono)' }}>
                            RECENT ACTIVITY
                          </h2>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                            Latest updates from your platform.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setMisView('inquiries')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f97316',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-body)',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        View all ›
                      </button>
                    </div>

                    {/* Activity Rows */}
                    <div>
                      {filteredActivities.length > 0 ? filteredActivities.map(item => (
                        <div key={item.id} className="mis-activity-row">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {item.type === 'review' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="2" y="4" width="20" height="16" rx="2" />
                                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                              )}
                            </div>

                            <div>
                              <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.875rem' }}>
                                {item.title}
                              </div>
                              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                                {item.desc}
                              </div>
                            </div>
                          </div>

                          <div style={{ color: '#64748b', fontSize: '0.78rem', whiteSpace: 'nowrap', marginLeft: '1rem', fontFamily: 'var(--font-mono)' }}>
                            {item.time}
                          </div>
                        </div>
                      )) : (
                        <div style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                          No activities match your search
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── VIEW: INQUIRIES ───────────────────────────── */}
              {misView === 'inquiries' && (
                <div className="mis-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          {['SENDER', 'SUBJECT', 'MESSAGE', 'ACTION'].map(h => (
                            <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#8b96a5', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', fontWeight: 600 }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInquiries.length > 0 ? filteredInquiries.map((row, i) => (
                          <tr key={row.id || i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.15s' }}>
                            <td style={{ padding: '1.1rem 1.25rem' }}>
                              <div style={{ fontWeight: 600, color: '#ffffff' }}>{row.name}</div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>{row.email}</div>
                            </td>
                            <td style={{ padding: '1.1rem 1.25rem', color: '#cbd5e1' }}>{row.subject}</td>
                            <td style={{ padding: '1.1rem 1.25rem', color: '#94a3b8', maxWidth: '320px', lineHeight: 1.5 }}>{row.message}</td>
                            <td style={{ padding: '1.1rem 1.25rem' }}>
                              <button
                                onClick={() => deleteInquiry(row.id)}
                                style={{
                                  background: 'transparent',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  color: '#ef4444',
                                  borderRadius: '6px',
                                  padding: '0.35rem 0.75rem',
                                  cursor: 'pointer',
                                  fontSize: '0.78rem',
                                  fontWeight: 500,
                                  transition: 'all 0.2s',
                                  fontFamily: 'var(--font-body)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; e.currentTarget.style.borderColor = '#ef4444'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} style={{ padding: '3.5rem', textAlign: 'center' }}>
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                              </svg>
                              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                                {q ? 'No inquiries matching your search' : 'No inquiries yet'}
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── VIEW: TESTIMONIALS ────────────────────────── */}
              {misView === 'testimonials' && (
                <div className="mis-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          {['CLIENT', 'REVIEW', 'STATUS', 'ACTION'].map(h => (
                            <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#8b96a5', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', fontWeight: 600 }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTestimonials.length > 0 ? filteredTestimonials.map((row, i) => (
                          <tr key={row.id || i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.15s' }}>
                            <td style={{ padding: '1.1rem 1.25rem' }}>
                              <div style={{ fontWeight: 600, color: '#ffffff' }}>{row.name}</div>
                              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>{row.role || 'Client'}</div>
                            </td>
                            <td style={{ padding: '1.1rem 1.25rem', color: '#94a3b8', maxWidth: '320px', lineHeight: 1.5 }}>
                              <div style={{ color: '#cbd5e1' }}>{row.content}</div>
                              {row.rating && (
                                <div style={{ color: '#f97316', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                  {'★'.repeat(row.rating)}{'☆'.repeat(Math.max(0, 5 - row.rating))}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '1.1rem 1.25rem' }}>
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: row.is_approved ? '#22c55e' : '#f97316',
                                background: row.is_approved ? 'rgba(34, 197, 94, 0.12)' : 'rgba(249, 115, 22, 0.12)',
                                border: `1px solid ${row.is_approved ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                                padding: '0.25rem 0.55rem',
                                borderRadius: '4px'
                              }}>
                                {row.is_approved ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td style={{ padding: '1.1rem 1.25rem' }}>
                              <div style={{ display: 'flex', gap: '0.65rem' }}>
                                <button
                                  onClick={() => toggleTestimonialApproval(row.id, row.is_approved)}
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    color: '#cbd5e1',
                                    borderRadius: '6px',
                                    padding: '0.35rem 0.65rem',
                                    cursor: 'pointer',
                                    fontSize: '0.78rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s',
                                    fontFamily: 'var(--font-body)'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#ffffff'; }}
                                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#cbd5e1'; }}
                                >
                                  {row.is_approved ? 'Reject' : 'Approve'}
                                </button>
                                <button
                                  onClick={() => deleteTestimonial(row.id)}
                                  style={{
                                    background: 'transparent',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#ef4444',
                                    borderRadius: '6px',
                                    padding: '0.35rem 0.65rem',
                                    cursor: 'pointer',
                                    fontSize: '0.78rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s',
                                    fontFamily: 'var(--font-body)'
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'; e.currentTarget.style.borderColor = '#ef4444'; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={4} style={{ padding: '3.5rem', textAlign: 'center' }}>
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                                {q ? 'No testimonials matching your search' : 'No testimonials yet'}
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
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
    { label: 'GitHub', id: 'github' },
  ];

  return (
    <div className="app-layout" style={{ position: 'relative', minHeight: '100vh' }}>

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
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Geist Pixel", "Geist Mono", monospace', fontWeight: 500, fontSize: '15px', color: 'var(--ink)', letterSpacing: 'normal', padding: 0 }}>
            Ulacdev
          </button>
        </div>

        {/* Middle: Navigation Links + Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '2rem 0' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollToSection(n.id)} className={`nav-link${activeSection === n.id ? ' active' : ''}`} style={{ textAlign: 'left' }}>
                {n.label}
              </button>
            ))}
          </nav>

          {/* Tools: fullscreen overlays */}
          <div className="sidebar-tools">
            <button type="button" className="tool-link" onClick={() => launchOverlay('ask')}>
              <span>ask anything</span><b>alt k</b>
            </button>
            <button type="button" className="tool-link" onClick={() => launchOverlay('test')}>
              <span>typing test</span><b>alt j</b>
            </button>
          </div>
        </div>

        {/* Bottom: Theme toggle & CTA stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', width: '100%' }}>
          <ThemeToggleCapsule theme={theme} setTheme={handleSetTheme} />
          
          <a href="/resume.html" target="_blank" rel="noreferrer" className="btn-glow" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
            See CV
          </a>
        </div>
      </aside>

      {/* ── MOBILE HEADER ───────────────────────────────────── */}
      <header className="mobile-header">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Geist Pixel", "Geist Mono", monospace', fontWeight: 500, fontSize: '15px', color: 'var(--ink)', letterSpacing: 'normal', padding: 0 }}>
          Ulacdev
        </button>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggleCapsule theme={theme} setTheme={handleSetTheme} />

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(m => !m)}
            style={{ background: 'none', border: '1px solid var(--gray-200)', width: 32, height: 32, borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}
          >
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
              <div id="mobile-navigation" style={{ padding: '1rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[...navItems, { label: 'Contact', id: 'contact' }].map(n => (
                  <button key={n.id} onClick={() => scrollToSection(n.id)} className="nav-link" style={{ textAlign: 'left', padding: '0.5rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                    {n.label}
                  </button>
                ))}
                <button type="button" className="tool-link tool-link--mobile" onClick={() => { setMenuOpen(false); launchOverlay('ask'); }}>
                  <span>ask anything</span><b>alt k</b>
                </button>
                <button type="button" className="tool-link tool-link--mobile" onClick={() => { setMenuOpen(false); launchOverlay('test'); }}>
                  <span>typing test</span><b>alt j</b>
                </button>
                <a href="/resume.html" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="btn-glow" style={{ justifyContent: 'center', marginTop: '0.75rem' }}>
                  See CV
                </a>
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
                    transition: 'filter 0.3s, border-color 0.3s',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setLightboxImages(['/new-pfp.jpg']);
                    setLightboxIndex(0);
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
                I'm a Full-Stack Developer with a deep focus on backend stability, clean frontend rendering, and database efficiency. Over the past few years, I have designed, built, and shipped production platforms for e-commerce, scheduling, point-of-sale, and loan management.
              </p>
              <p style={{ fontSize: '1.0625rem', lineHeight: '1.75', color: 'var(--gray-500)', fontFamily: 'var(--font-serif)' }}>
                A BSIT graduate of Cavite State University, I'm now a Service Level Technician at CXI Services, where I build internal tools that keep operations running — and a freelance developer since 2026. I care about applications that are highly functional and snappy to use. When I'm not writing code, I'm working out, listening to music, or studying full-stack architectures.
              </p>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: isMobile ? '0.5rem' : '2.5rem', marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
                {[
                  { num: '10+', label: 'Projects shipped' },
                  { num: '< 1', label: 'Year of experience' },
                  { num: '100%', label: 'Client satisfaction' }
                ].map((s, i) => (
                  <div key={i} style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{s.num}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.55rem' : '0.625rem', lineHeight: 1.35, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: isMobile ? '0.06em' : '0.1em', marginTop: '2px' }}>{s.label}</div>
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

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, 1fr)', gap: isMobile ? '1.5rem 1rem' : '2rem' }}>
            {[
              { category: 'Frontend', skills: ['React', 'Vue.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
              { category: 'Backend & AI', skills: ['Node.js', 'Express.js', 'Laravel', 'Python (FastAPI)', 'PHP', 'Groq', 'OpenAI', 'Claude', 'Codex'] },
              { category: 'Database', skills: ['MySQL', 'PostgreSQL', 'Supabase', 'Clever Cloud'] },
              { category: 'Tools & Platform', skills: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Antigravity', 'Vercel', 'Render'] }
            ].map((cat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink)', borderBottom: '1px solid var(--gray-200)', paddingBottom: '0.5rem', margin: 0 }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.skills.map(s => (
                    <div key={s} className="skill-row" tabIndex={0} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 4, height: 4, background: 'var(--gray-400)', borderRadius: '50%' }} />
                      <span className="skill-name" style={{ fontSize: '0.9375rem', color: 'var(--gray-600)' }}>{s}</span>
                      <span className="skill-pct">{SKILL_LEVELS[s] != null ? `${SKILL_LEVELS[s]}%` : ''}</span>
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
                role: 'Service Level Technician',
                company: 'CXI Services Inc.',
                duration: 'Sep 2026 – Present',
                desc: 'Manage employee attendance records, conduct scheduled roll calls, and develop internal tools and software solutions as a programmer to streamline operational workflows.',
                badge: 'Active'
              },
              {
                role: 'Freelance Software Developer',
                company: 'Self-employed',
                duration: 'Jun 2026 – Present',
                desc: 'Built and styled responsive web applications, developed clean backend APIs, and integrated MySQL databases for various client systems.',
                badge: 'Freelance'
              },
              {
                role: 'Full-Stack Developer Intern',
                company: 'StartupLab Business Center & AI Consulting Agency OPC',
                duration: 'Feb 2026 – May 2026',
                desc: 'Worked on loan reminder systems and AI-powered workflows. Handled databases, email queues, and server configurations for production applications.',
                badge: 'Internship'
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
              {showAllProjects ? 'Show Interactive' : 'Show All Projects'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {!showAllProjects ? (
              <Project3DCarousel projects={ALL_PROJECTS_DATA} isMobile={isMobile} isDark={resolvedDark} />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px' }}>
                {ALL_PROJECTS_DATA.map((p, i) => (
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
            )}
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
              {[
                {
                  name: 'TESDA Training Program (AI Essentials – Competency Certificate)',
                  issuer: 'CompTIA (2026)',
                  url: '/comptia-ai-essentials.pdf'
                },
                {
                  name: 'Full-Stack Developer Internship',
                  issuer: 'StartupLab Business Center & AI Consulting Agency OPC (2026)',
                  url: 'https://drive.google.com/file/d/1cglPPYuWbCDnZOVmWlq5bx0pZ3keFK1M/view?usp=drive_link'
                }
              ].map((cert, i) => (
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
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, margin: 0, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{cert.name}</h4>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--gray-400)', marginTop: '3px' }}>{cert.issuer}</div>
                  </div>
                  <FaExternalLinkAlt size={11} style={{ color: 'var(--gray-400)' }} />
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

        {/* ── 08 GALLERY ─────────────────────────────────────── */}
        <Gallery onImageClick={(imgs, idx) => {
          setLightboxImages(imgs);
          setLightboxIndex(idx);
        }} />

        {/* ── 09 GITHUB CONTRIBUTIONS ────────────────────────── */}
        <GithubContributions />

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
      <ChatBot />

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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex >= 0 && lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setLightboxImages([]);
              setLightboxIndex(-1);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setLightboxImages([]);
                setLightboxIndex(-1);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                zIndex: 100000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <FaTimes size={20} />
            </button>

            {/* Left navigation arrow */}
            {lightboxImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
                }}
                style={{
                  position: 'absolute',
                  left: '20px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 100000,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <FaChevronLeft size={20} />
              </button>
            )}

            {/* Right navigation arrow */}
            {lightboxImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
                }}
                style={{
                  position: 'absolute',
                  right: '20px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 100000,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                <FaChevronRight size={20} />
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              src={lightboxImages[lightboxIndex]}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                objectFit: 'contain',
                cursor: 'default'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Fullscreen overlays — "ask anything" (alt/⌘ K) & typing test (alt/⌘ J)
// ─────────────────────────────────────────────────────────────
const Overlay = ({ label, open, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fs-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26 }}
        >
          <div className="fs-backdrop" onClick={onClose} />
          <motion.div
            className="fs-inner"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const KeyCaps = ({ items }) => (
  <div className="kbd-hints">
    {items.map(([key, action]) => (
      <span className="kbd-hint" key={key + action}><b>{key}</b>{action}</span>
    ))}
  </div>
);

// ─── ask anything ────────────────────────────────────────────
const ASK_STARTERS = [
  'what are his skills?',
  'what projects has he built?',
  'what is his experience?',
  'how can i contact him?'
];

const AskOverlay = ({ open, onClose }) => {
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [lastIntentId, setLastIntentId] = useState(null);
  const [pairs, setPairs] = useState([]);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const send = raw => {
    const text = String(raw || '').slice(0, 300).trim();
    if (!text || pending) return;
    const result = respond(text, { lastIntentId });
    if (result.intentId) setLastIntentId(result.intentId);
    setInput('');
    setPairs(p => [...p, { q: text.toLowerCase(), a: null, chips: [], links: [] }]);
    setPending(true);
    window.setTimeout(() => {
      setPairs(p => p.map((pair, i) => (i === p.length - 1
        ? { ...pair, a: result.text, chips: result.chips || [], links: result.links || [] }
        : pair)));
      setPending(false);
    }, 350 + Math.round(Math.random() * 450));
  };

  useEffect(() => {
    if (!open) { setInput(''); return; }
    const target = inputRef.current;
    if (!target) return;
    // Mobile virtual keyboards can delay focus; retry so the input is
    // immediately usable on phones and tablets.
    let attempts = 0;
    const tryFocus = () => {
      if (document.activeElement === target || attempts > 8) return;
      attempts++;
      try { target.focus({ preventScroll: true }); } catch (_) {}
      window.setTimeout(tryFocus, 70);
    };
    tryFocus();
    return () => { try { target.blur(); } catch (_) {} };
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [pairs, pending, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const latest = pairs.length - 1;

  return (
    <Overlay label="Ask anything" open={open} onClose={onClose}>
      <div className="ask-eyebrow">ask anything</div>

      {pairs.length === 0 ? (
        <h2 className="ask-headline">what do you want to ask?</h2>
      ) : (
        <div className="ask-transcript">
          {pairs.map((pair, i) => (
            <div key={i} className={'ask-pair' + (i === latest ? ' is-latest' : '')}>
              <div className="ask-q">{pair.q}</div>
              {pair.a === null
                ? <div className="ask-a ask-pending">thinking…</div>
                : <p className="ask-a">{pair.a}</p>}
              {i === latest && pair.a !== null && (pair.links.length > 0 || pair.chips.length > 0) && (
                <div className="ask-followups">
                  {pair.links.map(l => (
                    <a
                      key={l.href}
                      className="ask-link"
                      href={l.href}
                      target={l.href.indexOf('http') === 0 ? '_blank' : undefined}
                      rel="noreferrer"
                    >
                      {l.label}<i>↗</i>
                    </a>
                  ))}
                  {pair.chips.map(c => (
                    <button type="button" key={c} className="ask-chip" onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}

      <form className="ask-form" onSubmit={e => { e.preventDefault(); send(input); }}>
        <span className="ask-caret">›</span>
        <input
          ref={inputRef}
          className="ask-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="type your question"
          aria-label="Type your question"
          autoComplete="off"
          spellCheck="false"
        />
      </form>

      {pairs.length === 0 && (
        <div className="ask-starters">
          {ASK_STARTERS.map(s => (
            <button type="button" key={s} className="ask-chip" onClick={() => send(s)}>{s}</button>
          ))}
        </div>
      )}

      <KeyCaps items={[['enter', 'send'], ['esc', 'close'], ['alt k', 'toggle']]} />
    </Overlay>
  );
};

// ─── typing test ─────────────────────────────────────────────
const TT_WORDS = [
  'react', 'express', 'node', 'mysql', 'postgresql', 'supabase', 'tailwind', 'laravel',
  'fastapi', 'vercel', 'render', 'clever', 'dashboard', 'ecommerce', 'checkout', 'payroll',
  'inventory', 'scheduling', 'loan', 'ledger', 'endpoint', 'schema', 'migration', 'query',
  'index', 'cache', 'deploy', 'commit', 'refactor', 'backend', 'frontend', 'database',
  'responsive', 'accessible', 'component', 'state', 'async', 'await', 'promise', 'request'
];

const TT_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

const shuffleWords = list => {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
};

const TypingOverlay = ({ open, onClose }) => {
  const [words, setWords] = useState(() => shuffleWords(TT_WORDS));
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [hits, setHits] = useState(0);
  const [keys, setKeys] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const inputRef = useRef(null);

  const finished = index >= words.length;

  const resetRun = useCallback(() => {
    setWords(shuffleWords(TT_WORDS));
    setIndex(0);
    setTyped('');
    setHits(0);
    setKeys(0);
    setStartedAt(null);
    setElapsed(0);
    setConfirmRestart(false);
    setActiveKey(null);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    resetRun();
  }, [open, resetRun]);

  useEffect(() => {
    if (!open || !startedAt || finished) return;
    const iv = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 200);
    return () => window.clearInterval(iv);
  }, [open, startedAt, finished]);

  // Keep the hidden text input focused so both physical and mobile virtual
  // keyboards feed characters into the test. Mobile keyboards do not fire
  // keydown for each character, so we read the input's value instead.
  useEffect(() => {
    if (!open) return;
    const el = inputRef.current;
    if (!el) return;
    let stopped = false;
    let frame = 0;
    const drive = () => {
      if (stopped) return;
      if (frame) cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (stopped) return;
        try { el.focus({ preventScroll: true }); } catch (_) {}
      });
    };
    drive();
    const iv = window.setInterval(drive, 250);
    return () => { stopped = true; window.clearInterval(iv); if (frame) cancelAnimationFrame(frame); };
  }, [open]);

  const flash = useCallback(k => {
    setActiveKey(k);
    window.setTimeout(() => setActiveKey(cur => (cur === k ? null : cur)), 130);
  }, []);

  const press = useCallback((ch, fromKeyboard) => {
    if (ch === 'Escape') { onClose(); return; }
    if (confirmRestart) {
      if (ch === 'Enter') { resetRun(); }
      return;
    }
    if (ch === 'Tab') { setConfirmRestart(c => !c); return; }
    if (finished) return;
    if (ch === 'Backspace') {
      flash('backspace');
      setTyped(t => t.slice(0, -1));
      return;
    }
    if (ch === ' ') {
      flash(' ');
      setTyped('');
      setIndex(i => i + 1);
      return;
    }
    if (ch.length !== 1) return;
    const target = (words[index] || '')[typed.length];
    setKeys(k => k + 1);
    if (target === ch) setHits(h => h + 1);
    setTyped(t => t + ch);
    if (!startedAt) setStartedAt(Date.now());
    flash(ch);
  }, [confirmRestart, finished, words, index, typed, startedAt, onClose, resetRun, flash]);

  // Physical-keyboard path: handles Escape / Tab immediately so desktop users
  // can close or restart without the hidden input intercepting those keys. Character
  // keys are intentionally left for the input's input-event path below so that the
  // per-key highlight stays in sync with what the hidden input actually contains.
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault();
        press(e.key);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, press]);

  // Mobile / any-device path: read characters typed into the hidden input.
  // This is what makes the test usable on phones and tablets, where the
  // on-screen keyboard never fires keydown per character.
  const lastRef = useRef('');
  useEffect(() => {
    if (!open) return;
    const el = inputRef.current;
    if (!el) return;
    el.value = '';
    lastRef.current = '';
    const onInput = () => {
      const v = el.value;
      // New characters appended at the end.
      if (v.length > lastRef.current.length) {
        for (let i = lastRef.current.length; i < v.length; i++) {
          press(v[i]);
          if (finished) break;
        }
      } else if (v.length < lastRef.current.length) {
        // Backspace/delete: the keyboard already shortened the input; undo
        // the corresponding number of typed characters in our state.
        const cut = lastRef.current.length - v.length;
        for (let i = 0; i < cut; i++) press('Backspace');
      }
      lastRef.current = v;
    };
    el.addEventListener('input', onInput);
    return () => el.removeEventListener('input', onInput);
  }, [open, finished, press]);

  // Prevent the hidden input fromever gaining visible focus styling and keep
  // the page scroll stable while it stays focused on mobile.
  useEffect(() => {
    if (!open) return;
    const onBlur = () => {
      if (inputRef.current) inputRef.current.focus({ preventScroll: true });
    };
    window.addEventListener('blur', onBlur, true);
    return () => window.removeEventListener('blur', onBlur, true);
  }, [open]);

  const minutes = elapsed / 60;
  const wpm = minutes > 0 ? Math.round((hits / 5) / minutes) : 0;
  const acc = keys > 0 ? Math.round((hits / keys) * 100) : 100;
  const from = Math.max(0, index - 3);
  const visible = words.slice(from, from + 13);
  const current = words[index] || '';

  return (
    <Overlay label="Typing test" open={open} onClose={onClose}>
      <div className="tt-stats">
        <div className="tt-stat">
          <span className="tt-num">{wpm}</span>
          <span className="tt-label">wpm</span>
        </div>
        <div className="tt-stat">
          <span className="tt-num">{acc}<i>%</i></span>
          <span className="tt-label">acc</span>
        </div>
        <div className="tt-stat">
          <span className="tt-num">{elapsed}<i>s</i></span>
          <span className="tt-label">time</span>
        </div>
      </div>

      {/* Hidden focused input: this is what captures characters on mobile
          virtual keyboards, which never fire keydown per character. On desktop
          the keydown listener still drives instant per-key feedback; this input
          is the cross-device source of truth for typed characters. The input is
          left uncontrolled so mobile keyboards can type into it without React
          fighting the DOM value on every keystroke. */}
      <input
        ref={inputRef}
        className="tt-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-hidden="true"
      />

      <div className="tt-words">
        {visible.map((word, i) => {
          const abs = from + i;
          if (abs < index) return <span className="tt-word is-done" key={abs}>{word}</span>;
          if (abs > index) return <span className="tt-word" key={abs}>{word}</span>;
          return (
            <span className="tt-word is-current" key={abs}>
              {word.split('').map((ch, ci) => {
                const t = typed[ci];
                const cls = t == null ? 'todo' : (t === ch ? 'ok' : 'bad');
                return <span className={cls} key={ci}>{ch}</span>;
              })}
            </span>
          );
        })}
      </div>

      {finished && (
        <div className="tt-done">done — {wpm} wpm at {acc}%</div>
      )}

      <div className="tt-keyboard">
        {TT_ROWS.map(row => (
          <div className="tt-krow" key={row}>
            {row.split('').map(k => (
              <span className={'tt-key' + (activeKey === k ? ' is-active' : '')} key={k}>{k}</span>
            ))}
          </div>
        ))}
        <div className="tt-krow">
          <span
            className={'tt-key tt-space' + (activeKey === ' ' ? ' is-active' : '')}
            style={{ width: '11rem' }}
          >
            space
          </span>
        </div>
      </div>

      {confirmRestart
        ? <div className="tt-confirm">restart test? <b>↵</b> to confirm · <b>esc</b> cancel</div>
        : <KeyCaps items={[['tab', 'restart'], ['esc', 'close']]} />}
    </Overlay>
  );
};

// ─── launchers + global shortcuts ────────────────────────────
const ChatBot = () => {
  const [askOpen, setAskOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);

  useEffect(() => {
    const onKey = e => {
      if (!e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.code === 'KeyK') {
        e.preventDefault();
        setTestOpen(false);
        setAskOpen(o => !o);
      }
      if (e.code === 'KeyJ') {
        e.preventDefault();
        setAskOpen(false);
        setTestOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onLaunch = e => {
      if (e.detail === 'ask') { setTestOpen(false); setAskOpen(true); }
      if (e.detail === 'test') { setAskOpen(false); setTestOpen(true); }
    };
    window.addEventListener('ulac-overlay', onLaunch);
    return () => window.removeEventListener('ulac-overlay', onLaunch);
  }, []);

  return (
    <>
      <AskOverlay open={askOpen} onClose={() => setAskOpen(false)} />
      <TypingOverlay open={testOpen} onClose={() => setTestOpen(false)} />
    </>
  );
};

export default App;
