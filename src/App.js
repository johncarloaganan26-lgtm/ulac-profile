import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaHtml5, FaCss3, FaJs, FaReact, FaVuejs, FaNodeJs, FaPhp, FaGit, FaGithub, FaCode, FaNpm, FaPlug, FaMoon, FaSun, FaLinkedin, FaBars, FaTimes, FaFacebook, FaInstagram, FaTwitter, FaCommentDots, FaPython, FaCalendarAlt, FaChevronRight, FaChevronDown, FaEye } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { SiTailwindcss, SiExpress, SiAxios, SiMysql, SiVercel, SiSupabase, SiPostgresql, SiVite, SiLaravel, SiPython, SiNextdotjs, SiFramer } from 'react-icons/si';

// Original icons and imports ... (keep existing)

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
import logoImage from './logo.png';

// Unique Animation Skill Icon Component
const AnimatedSkillIcon = ({ icon: Icon, delay, color, percentage, name, animationType = 'rotate', size = '2.5rem', setToast }) => {
  const getAnimationConfig = (type) => {
    switch (type) {
      case 'bounce':
        return { y: [0, -10, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay } };
      case 'pulse':
        return { scale: [1, 1.15, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay } };
      case 'rotate':
        return { rotate: [0, 10, -10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay } };
      case 'spin':
        return { rotate: [0, 360], transition: { duration: 8, repeat: Infinity, ease: "linear", delay } };
      case 'wobble':
        return { rotate: [0, -15, 15, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay } };
      case 'float':
        return { y: [0, -8, 0], rotate: [0, 3, -3, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay } };
      case 'swing':
        return { rotate: [0, 20, -20, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay } };
      case 'tilt':
        return { rotate: [0, -10, 10, 0, -5, 5, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay } };
      default:
        return { rotate: [0, 360], transition: { duration: 8, repeat: Infinity, ease: "linear", delay } };
    }
  };

  const animationConfig = getAnimationConfig(animationType);

  const handleMouseEnter = (e) => {
    if (setToast) {
      const rect = e.currentTarget.getBoundingClientRect();
      setToast({ show: true, name, percentage, x: rect.left + rect.width / 2, y: rect.top - 15 });
    }
  };

  const handleMouseLeave = () => {
    if (setToast) setToast({ show: false, name: '', percentage: '', x: 0, y: 0 });
  };

  return (
    <motion.div
      className="skill-card"
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      animate={animationConfig}
      whileHover={{ scale: 1.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon style={{ fontSize: size, color: color }} />
    </motion.div>
  );
};

const SkillsAnimation = ({ setToast }) => {
  const skills = [
    { icon: FaHtml5, color: '#E34F26', percentage: 95, name: 'HTML5', animationType: 'bounce' },
    { icon: FaCss3, color: '#1572B6', percentage: 90, name: 'CSS3', animationType: 'pulse' },
    { icon: FaJs, color: '#F7DF1E', percentage: 92, name: 'JavaScript', animationType: 'rotate' },
    { icon: FaReact, color: '#61DAFB', percentage: 90, name: 'React', animationType: 'spin' },
    { icon: FaVuejs, color: '#4FC08D', percentage: 85, name: 'Vue.js', animationType: 'wobble' },
    { icon: SiTailwindcss, color: '#06B6D4', percentage: 88, name: 'Tailwind CSS', animationType: 'float' },
    { icon: FaNodeJs, color: '#339933', percentage: 90, name: 'Node.js', animationType: 'swing' },
    { icon: SiExpress, color: 'var(--text-primary)', percentage: 85, name: 'Express.js', animationType: 'tilt' },
    { icon: SiMysql, color: '#4479A1', percentage: 88, name: 'MySQL', animationType: 'pulse' },
    { icon: FaPhp, color: '#777BB4', percentage: 85, name: 'PHP', animationType: 'bounce' },
    { icon: FaPlug, color: '#00A3E0', percentage: 86, name: 'REST APIs', animationType: 'rotate' },
    { icon: FaGit, color: '#F05032', percentage: 94, name: 'Git', animationType: 'spin' },
    { icon: FaGithub, color: 'var(--text-primary)', percentage: 95, name: 'GitHub', animationType: 'float' },
    { icon: SiVercel, color: 'var(--text-primary)', percentage: 90, name: 'Vercel', animationType: 'wobble' },
    { icon: FaCode, color: '#007ACC', percentage: 98, name: 'VS Code', animationType: 'swing' },
    { icon: FaNpm, color: '#CB3837', percentage: 92, name: 'npm', animationType: 'pulse' },
    { icon: SiAxios, color: '#5A29E4', percentage: 88, name: 'Axios', animationType: 'tilt' },
    { icon: SiSupabase, color: '#3ECF8E', percentage: 85, name: 'Supabase', animationType: 'bounce' },
    { icon: SiPostgresql, color: '#4169E1', percentage: 88, name: 'PostgreSQL', animationType: 'pulse' },
  ];

  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="skills-scroller">
      <div className="scroller-track scroller-skill-cards">
        {duplicatedSkills.map((skill, index) => (
          <AnimatedSkillIcon key={`${skill.name}-${index}`} icon={skill.icon} delay={0} color={skill.color} percentage={skill.percentage} name={skill.name} animationType={skill.animationType} setToast={setToast} />
        ))}
      </div>
    </div>
  );
};

const BentoCard = ({ children, className = '', delay = 0, style = {} }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty('--x', `${x}px`);
      cardRef.current.style.setProperty('--y', `${y}px`);
    };

    const card = cardRef.current;
    if (card) card.addEventListener('mousemove', handleMouseMove);
    return () => { if (card) card.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`bento-card ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="glow-effect" />
      {children}
    </motion.div>
  );
};

const SkillTag = ({ name, size = 'large' }) => {
  const iconMap = {
    'JavaScript': { icon: FaJs, color: '#F7DF1E' },
    'HTML5': { icon: FaHtml5, color: '#E34F26' },
    'CSS3': { icon: FaCss3, color: '#1572B6' },
    'React': { icon: FaReact, color: '#61DAFB' },
    'ReactNative': { icon: FaReact, color: '#61DAFB' },
    'Vue.js': { icon: FaVuejs, color: '#4FC08D' },
    'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
    'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    'Node.js': { icon: FaNodeJs, color: '#339933' },
    'Express.js': { icon: SiExpress, color: 'var(--text-primary)' },
    'PHP': { icon: FaPhp, color: '#777BB4' },
    'Laravel': { icon: SiLaravel, color: '#FF2D20' },
    'Vite': { icon: SiVite, color: '#646CFF' },
    'Python': { icon: SiPython, color: '#3776AB' },
    'MySQL': { icon: SiMysql, color: '#4479A1' },
    'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
    'Supabase': { icon: SiSupabase, color: '#3ECF8E' },
    'REST APIs': { icon: FaPlug, color: '#00A3E0' },
    'Git': { icon: FaGit, color: '#F05032' },
    'GitHub': { icon: FaGithub, color: 'var(--text-primary)' },
    'Vercel': { icon: SiVercel, color: 'var(--text-primary)' },
    'VS Code': { icon: FaCode, color: '#007ACC' },
    'npm': { icon: FaNpm, color: '#CB3837' },
    'Axios': { icon: SiAxios, color: '#5A29E4' },
    'Next.js': { icon: SiNextdotjs, color: 'var(--text-primary)' },
    'Framer Motion': { icon: SiFramer, color: '#0055FF' },
  };
  const skill = iconMap[name];
  if (!skill) return <span style={{ fontSize: '0.7rem', fontWeight: '800', border: '1px solid var(--border-primary)', padding: '0.2rem 0.6rem', color: 'var(--text-primary)', opacity: 0.6 }}>{name}</span>;
  const Icon = skill.icon;

  return (
    <div key={name} title={name} style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'transparent', 
      border: size === 'small' ? 'none' : '1.5px solid var(--border-primary)', 
      padding: size === 'small' ? '0' : '0.8rem', 
      fontSize: size === 'small' ? '1.4rem' : '1.8rem', 
      color: skill.color,
      transition: 'all 0.3s ease'
    }}>
      {Icon && <Icon />}
    </div>
  );
};

function App() {
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);
  const [scrollTopActive, setScrollTopActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ show: false, name: '', percentage: '', x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [view, setView] = useState('portfolio'); // 'portfolio' or 'mis'
  const [misView, setMisView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' });
  const [totalViews, setTotalViews] = useState(0);
  const typedRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#login') {
        setView('mis');
      } else {
        setView('portfolio');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleInquiryClick = (service) => {
    setCurrentService(service);
    setFormData(prev => ({ ...prev, subject: `Inquiry: ${service.title}` }));
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false, message: '' });
    const submissionData = {
      ...formData,
      subject: formData.subject || `New message from ${formData.name}`
    };
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const data = await response.json();
      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: false, message: 'Message sent! Check your inbox.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({ loading: false, success: false, error: true, message: data.message || 'Error sending message.' });
      }
    } catch (error) {
      setFormStatus({ loading: false, success: false, error: true, message: 'Something went wrong.' });
    }
  };

  useEffect(() => {
    if (typeof AOS !== 'undefined') AOS.init({ duration: 600, easing: 'ease-in-out', once: true });
    const lightbox = GLightbox({ touchNavigation: true, loop: true });
    
    let typedInstance = null;
    if (typedRef.current) {
      typedInstance = new Typed(typedRef.current, {
        strings: ['Student', 'Aspiring Full Stack Developer'],
        typeSpeed: 80, backSpeed: 50, loop: true, backDelay: 2000, showCursor: true, cursorChar: '|'
      });
    }

    const timer = setTimeout(() => setPreloaderRemoved(true), 1000);
    const handleScroll = () => setScrollTopActive(window.scrollY > 100);

    const fetchViews = async () => {
      try {
        const response = await fetch('/api/views');
        const data = await response.json();
        setTotalViews(data.views);
      } catch (error) { console.error('Error fetching views:', error); }
    };
    fetchViews();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });

    ['hero', 'about', 'skills', 'projects', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      lightbox.destroy();
      if (typedInstance) typedInstance.destroy();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (view === 'mis') {
    if (!isLoggedIn) {
      return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: '400px', padding: '3rem', border: '1.5px solid #333' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem', letterSpacing: '4px' }}>MIS LOGIN</h1>
            <input type="password" placeholder="Access Key" onKeyDown={(e) => e.key === 'Enter' && setIsLoggedIn(true)} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #fff', padding: '1rem 0', color: '#fff', fontSize: '1.2rem', outline: 'none' }} />
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.5 }}>Press Enter to access management console</p>
          </motion.div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Sidebar */}
        <div style={{ 
          width: isMobile ? '100%' : '280px', 
          borderRight: isMobile ? 'none' : '1px solid #222', 
          borderBottom: isMobile ? '1px solid #222' : 'none',
          padding: isMobile ? '1.5rem' : '3rem 2rem', 
          display: 'flex', 
          flexDirection: isMobile ? 'row' : 'column', 
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'stretch',
          gap: '2rem' 
        }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '2px', margin: 0 }}>JC. MIS</h2>
          {isMobile ? (
            <div style={{ display: 'flex', gap: '1rem' }}>
               <select 
                 value={misView} 
                 onChange={(e) => setMisView(e.target.value)} 
                 style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '0.4rem', borderRadius: '4px' }}
               >
                 {['dashboard', 'inquiries', 'projects', 'settings'].map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
               </select>
               <button onClick={() => window.location.hash = ''} style={{ background: 'transparent', border: '1px solid #ed4245', color: '#ed4245', padding: '0.4rem 0.8rem', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer' }}>EXIT</button>
            </div>
          ) : (
            <>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['dashboard', 'inquiries', 'projects', 'settings'].map(m => (
                  <button 
                    key={m} 
                    onClick={() => setMisView(m)}
                    style={{ background: 'transparent', border: 'none', color: misView === m ? '#fff' : '#555', textAlign: 'left', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', cursor: 'pointer', padding: '0.5rem 0' }}
                  >
                    {m}
                  </button>
                ))}
              </nav>
              <button onClick={() => window.location.hash = ''} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #333', color: '#fff', padding: '0.8rem', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}>EXIT MIS</button>
            </>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: isMobile ? '2rem 1rem' : '4rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: '900', marginBottom: isMobile ? '1.5rem' : '3rem', textTransform: 'uppercase' }}>{misView}</h1>
            
            {misView === 'dashboard' && (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1rem' : '2rem' }}>
                {[
                  { label: 'Total Inquiries', value: '12' },
                  { label: 'Active Projects', value: '4' },
                  { label: 'Total Views', value: totalViews }
                ].map((stat, i) => (
                  <div key={i} style={{ padding: '1.5rem', border: '1px solid #222' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>{stat.label}</p>
                    <p style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: '900', marginTop: '0.5rem' }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            )}

            {misView === 'inquiries' && (
              <div style={{ border: '1px solid #222', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ background: '#111' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '800' }}>SENDER</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '800' }}>SERVICE</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '800' }}>STATUS</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '800' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Alice Tan', service: 'Full-Stack System', status: 'Pending' },
                      { name: 'Mark Wilson', service: 'E-commerce', status: 'In Review' },
                      { name: 'Sarah Lee', service: 'API Development', status: 'Completed' }
                    ].map((row, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #222' }}>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}>{row.name}</td>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}>{row.service}</td>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}><span style={{ background: '#222', padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>{row.status}</span></td>
                        <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}><button style={{ background: 'transparent', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer' }}>View Details</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {(misView === 'projects' || misView === 'settings') && (
              <div style={{ padding: '4rem', border: '2px dashed #222', textAlign: 'center', opacity: 0.5 }}>
                <p style={{ fontWeight: '800', letterSpacing: '2px' }}>MODULE UNDER CONSTRUCTION</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`} style={{ paddingTop: '0px' }}>
      {!preloaderRemoved && (
        <div id="preloader" style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loader"></div>
        </div>
      )}

      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ 
              position: 'fixed', 
              left: toast.x, 
              top: toast.y, 
              transform: 'translate(-50%, -100%)',
              background: 'var(--bg-card)', 
              border: '1.5px solid var(--border-primary)',
              padding: '0.5rem 1rem',
              zIndex: 10000,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)' }}>{toast.percentage}%</div>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-primary)', opacity: 0.7, textTransform: 'uppercase' }}>{toast.name}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main" style={{ padding: isMobile ? '1.5rem 1rem' : '2rem 4rem 0px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <header style={{ 
          position: 'relative', 
          display: 'flex', 
          gap: isMobile ? '1.5rem' : '2.5rem', 
          alignItems: 'flex-start', 
          marginBottom: '2rem', 
          flexDirection: isMobile ? 'row' : 'row',
          flexWrap: 'nowrap',
          paddingRight: '0'
        }}>
          {/* Theme Toggle Wrapper */}
          <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
            <div 
              onClick={() => setDarkMode(!darkMode)} 
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                background: darkMode ? '#333' : '#e5e7eb', 
                width: '64px', 
                borderRadius: '0px',
                padding: '2px',
                border: '1px solid var(--border-primary)'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                background: darkMode ? '#1a1a1a' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: darkMode ? '#fff' : '#6b7280',
                order: darkMode ? 2 : 1
              }}>
                {darkMode ? <FaMoon size={14} /> : <FaSun size={14} />}
              </div>
              <div style={{ flex: 1, order: darkMode ? 1 : 2 }} />
            </div>
          </div>

          <img 
            src={`${process.env.PUBLIC_URL}/dsa.jpg`} 
            alt="Profile" 
            style={{ 
              width: isMobile ? '120px' : '220px', 
              height: isMobile ? '120px' : '220px', 
              objectFit: 'cover', 
              borderRadius: '4px',
              flexShrink: 0
            }} 
          />
          
          <div style={{ flex: 1, minWidth: 0, paddingTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: isMobile ? '1.8rem' : '3rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
                John Carlo Aganan
              </h1>
              <MdVerified style={{ color: '#0ea5e9', fontSize: isMobile ? '1.2rem' : '1.8rem' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontSize: isMobile ? '0.9rem' : '1.1rem', opacity: 0.9 }}>
                <FaMapMarkerAlt size={14} />
                <span style={{ fontWeight: '600' }}>Naic, Cavite, Philippines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)', fontSize: '0.8rem', opacity: 0.5, borderLeft: '1.5px solid var(--border-primary)', paddingLeft: '1.2rem' }}>
                <FaEye size={12} />
                <span style={{ fontWeight: '800' }}>{totalViews}</span>
                <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Views</span>
              </div>
            </div>

            <div style={{ 
              fontSize: isMobile ? '0.9rem' : '1.1rem', 
              marginBottom: '1.5rem', 
              color: 'var(--text-primary)', 
              fontWeight: '600',
              opacity: 0.8,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span>Junior Software Engineer</span> 
              <span style={{ opacity: 0.3 }}>\</span>
              <span>Aspiring Full Stack Developer</span>
              <span style={{ opacity: 0.3 }}>\</span>
              <span>Inquisitive Learner</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Schedule Button */}
              <button 
                onClick={() => scrollToSection('contact')}
                style={{ 
                  background: '#000', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '0.8rem 1.4rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.8rem', 
                  fontWeight: '700', 
                  fontSize: '0.95rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <FaCalendarAlt />
                <span>Schedule a Call</span>
                <FaChevronRight size={12} style={{ opacity: 0.6 }} />
              </button>

              <a 
                href="#blog" 
                style={{ 
                  color: 'var(--text-primary)', 
                  fontWeight: '700', 
                  textDecoration: 'none', 
                  fontSize: '0.95rem',
                  marginLeft: '0.5rem'
                }}
              >
                My blog
              </a>
            </div>
          </div>
        </header>
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: isMobile ? '2rem' : '4rem' }}>
          <div style={{ gridColumn: isMobile ? 'span 1' : 'span 8' }}>
            <section id="about" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>About</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: '500' }}>
                I'm a Full-Stack Engineer with a strong focus on building scalable systems and impact-driven digital solutions. 
                My expertise lies in developing complex architectures using React, Node.js, and Modern Databases.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', marginTop: '1.5rem', fontWeight: '500' }}>
                Currently in my final year of BSIT at Cavite State University, I have spent my academic years leading the development of real-world management systems,
                including the **BBEK** and **StartupLab** platforms. I specialize in turning complex requirements into efficient, user-centric software.
              </p>
            </section>

            <section id="skills" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginWeight: '2rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Tech Stack</h2>
                <button onClick={() => setShowAllSkills(!showAllSkills)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', color: 'var(--text-primary)' }}>
                  {showAllSkills ? '← Show Less' : 'View All →'}
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '0.8rem', color: 'var(--text-primary)', opacity: 0.8 }}>Frontend</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['JavaScript', 'HTML5', 'CSS3', 'React', 'Vue.js', 'Tailwind CSS'].map(s => (
                      <SkillTag key={s} name={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '0.8rem', color: 'var(--text-primary)', opacity: 0.8 }}>Backend</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Node.js', 'Express.js', 'PHP', 'MySQL', 'PostgreSQL'].map(s => (
                      <SkillTag key={s} name={s} />
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {showAllSkills && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }} 
                    style={{ overflow: 'hidden', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '0.8rem', color: 'var(--text-primary)', opacity: 0.8 }}>Tools</h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {['Supabase', 'REST APIs', 'Git', 'GitHub', 'Vercel', 'VS Code', 'npm', 'Axios'].map(s => (
                          <SkillTag key={s} name={s} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <section id="projects" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Recent Projects</h2>
                <button 
                  onClick={() => setShowAllProjects(!showAllProjects)} 
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', color: 'var(--text-primary)' }}
                >
                  {showAllProjects ? '← Show Less' : 'View All →'}
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {[ 
                  { title: 'Artisano & Co. Pizzeria', img: artisanoImage, url: 'https://pizza-theta-inky.vercel.app/', desc: 'A premium digital presence for an artisanal pizzeria, featuring a cinematic design and Next.js performance.', tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
                  { title: 'BigBrew POS System', img: bigbrewPOSImage, url: 'https://brew-sxrs.vercel.app/', desc: 'Coffee Shop Point of Sale System with Real-Time Analytics Dashboard.', tags: ['React', 'Vite', 'Tailwind', 'Node.js'] },
                  { title: 'StartupLab Ticketing System', img: project4Image, url: 'https://startuplab-event-creation.vercel.app/', desc: 'Previous System: End-to-end event ticketing and management platform.', tags: ['React', 'Node.js', 'PostgreSQL'] },
                  { title: 'BBEK Administration System', img: project1Image, url: 'https://biblebaptistekklesiaofkawit.xyz/', desc: 'Previous System: Comprehensive administration platform for church operations.', tags: ['Vue.js', 'Node.js', 'MySQL'] },
                  { title: 'Baby Bliss Booking', img: project2Image, url: 'https://babyblissbooking.vercel.app/', desc: 'Advanced appointment system for wellness and spa centers.', tags: ['React', 'Tailwind', 'Vercel'] },
                  { title: 'Event Registration System', img: project3Image, url: 'https://startuplab-event-registration.vercel.app/', desc: 'Streamlined registration platform for university and academic events.', tags: ['Laravel', 'PHP', 'MySQL'] }
                ].slice(0, showAllProjects ? 6 : 3).map((p, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    style={{ border: '1.5px solid var(--border-primary)', display: 'flex', overflow: 'hidden' }}
                  >
                    <a 
                      href={p.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ cursor: 'pointer', flexShrink: 0, display: 'block', width: '250px', height: '150px' }}
                    >
                      <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.title} />
                    </a>
                    <div style={{ padding: '1.5rem', flex: '1 1 0%' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{p.title}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '0.5rem', fontWeight: '500' }}>{p.desc}</p>
                      <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
                        {p.tags.map(t => <SkillTag key={t} name={t} size="small" />)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div style={{ gridColumn: isMobile ? 'span 1' : 'span 4', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'rgb(26, 26, 26)', padding: '2rem', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '3rem', opacity: 0.8 }}><FaCode /></div>
              <div>
                <div style={{ textTransform: 'uppercase', fontSize: '1.2rem', fontWeight: '900', letterSpacing: '4px' }}>JOHN CARLO</div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.6 }}>SOFTWARE ENGINEER</div>
              </div>
              <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', opacity: 0.3, fontHeight: '4rem', fontSize: '4rem' }}>
                <FaReact />
              </div>
            </div>

            <section id="experience">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--text-primary)' }}>Experience</h2>
              <div style={{ padding: '2rem', border: '1.5px dashed var(--border-primary)', textAlign: 'center', opacity: 0.6 }}>
                <p style={{ fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>N/A FOR NOW</p>
              </div>
            </section>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Expertise & Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { 
                title: 'Full-Stack Systems', 
                icon: FaCode, 
                desc: 'Building complex management systems, POS platforms, and admin dashboards with React and Node.js.',
                color: '#61DAFB'
              },
              { 
                title: 'Custom Web Apps', 
                icon: FaPlug, 
                desc: 'Development of scalable web applications tailored to specific business requirements and workflows.',
                color: '#10b981'
              },
              { 
                title: 'Database Architecture', 
                icon: SiPostgresql, 
                desc: 'Designing robust and optimized database schemas using PostgreSQL and MySQL for high-performance data handling.',
                color: '#4169E1'
              },
              { 
                title: 'E-commerce Solutions', 
                icon: FaNpm, 
                desc: 'End-to-end online store development including secure payment integrations and inventory management.',
                color: '#cb3837'
              },
              { 
                title: 'Responsive UI/UX', 
                icon: SiTailwindcss, 
                desc: 'Creating modern, mobile-first interfaces focused on user experience and brand identity.',
                color: '#06B6D4'
              },
              { 
                title: 'API Development', 
                icon: FaJs, 
                desc: 'Developing secure RESTful APIs to connect your platform with mobile apps and third-party services.',
                color: '#F7DF1E'
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ 
                  padding: '1.5rem', 
                  border: '1.5px solid var(--border-primary)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ fontSize: '2.5rem', color: service.color }}><service.icon /></div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{service.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '500', opacity: 0.8, lineHeight: '1.6' }}>{service.desc}</p>
                <button 
                  onClick={() => handleInquiryClick(service)}
                  style={{ 
                    marginTop: '1rem', 
                    background: 'transparent', 
                    border: '1.5px solid var(--text-primary)', 
                    padding: '0.6rem 1rem', 
                    fontWeight: '800', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-primary)', 
                    cursor: 'pointer',
                    width: 'fit-content',
                    zIndex: 2
                  }}
                >
                  Inquire Now →
                </button>
                <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', fontSize: '5rem', opacity: 0.05, transform: 'rotate(-15deg)', color: 'var(--text-primary)' }}>
                  <service.icon />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" style={{ marginTop: '3rem', padding: isMobile ? '2.5rem 1rem' : '4rem 0', borderTop: '1.5px solid var(--border-primary)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'flex-start' }}>
            <div style={{ gridColumn: isMobile ? 'span 1' : 'span 5' }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Let's work together</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', opacity: 0.8, lineHeight: '1.8', marginBottom: '2.5rem', fontWeight: '500' }}>
                I'm always looking for new opportunities and collaborations. <br /><br />
                Whether you have a specific project in mind or just want to discuss the latest in software engineering, 
                my inbox is always open.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)' }}>
                  <div style={{ width: '40px', height: '40px', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaEnvelope /></div>
                  <span style={{ fontWeight: '700' }}>johncarloaganan.startuplab@gmail.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)' }}>
                  <div style={{ width: '40px', height: '40px', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaMapMarkerAlt /></div>
                  <span style={{ fontWeight: '700' }}>Naic, Cavite, Philippines</span>
                </div>
              </div>
            </div>

            <div style={{ gridColumn: isMobile ? 'span 1' : 'span 7' }}>
              <motion.div 
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ background: '#000000', color: '#ffffff', padding: isMobile ? '1.5rem' : '3rem', border: '1px solid var(--border-primary)', position: 'relative' }}
              >
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1.5rem' : '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#ffffff', opacity: 0.6 }}>Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe" 
                        style={{ background: 'transparent', border: 'none', borderBottom: '2.5px solid #ffffff', padding: '0.8rem 0', fontSize: '1.1rem', color: '#ffffff', outline: 'none' }} 
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#ffffff', opacity: 0.6 }}>Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com" 
                        style={{ background: 'transparent', border: 'none', borderBottom: '2.5px solid #ffffff', padding: '0.8rem 0', fontSize: '1.1rem', color: '#ffffff', outline: 'none' }} 
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: '#ffffff', opacity: 0.6 }}>Your Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Hi John, I'd like to talk about..." 
                      rows="4" 
                      style={{ background: 'transparent', border: 'none', borderBottom: '2.5px solid #ffffff', padding: '0.8rem 0', fontSize: '1.1rem', color: '#ffffff', outline: 'none', resize: 'none' }}
                    ></textarea>
                  </div>
                  
                  {formStatus.message && (
                    <div style={{ 
                      padding: '1.2rem', 
                      fontSize: '0.9rem', 
                      fontWeight: '800',
                      background: formStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: formStatus.success ? '#10b981' : '#ef4444',
                      border: `1.5px solid ${formStatus.success ? '#10b981' : '#ef4444'}`,
                    }}>
                      {formStatus.message}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={formStatus.loading}
                    style={{ 
                      background: '#ffffff', 
                      color: '#000000', 
                      border: 'none', 
                      padding: '1.2rem 2.5rem', 
                      fontWeight: '900', 
                      fontSize: '1rem',
                      width: 'fit-content', 
                      cursor: formStatus.loading ? 'not-allowed' : 'pointer',
                      opacity: formStatus.loading ? 0.7 : 1,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem'
                    }}
                  >
                    {formStatus.loading ? 'SENDING...' : 'SEND MESSAGE →'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--text-primary)', fontWeight: '800' }}>© 2026 John Carlo Aganan</div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--text-primary)' }}><FaLinkedin size={22} /></a>
            <a href="#" style={{ color: 'var(--text-primary)' }}><FaGithub size={22} /></a>
            <a href="#" style={{ color: 'var(--text-primary)' }}><FaTwitter size={22} /></a>
            <a href="#" style={{ color: 'var(--text-primary)' }}><FaFacebook size={22} /></a>
            <a href="#" style={{ color: 'var(--text-primary)' }}><FaInstagram size={22} /></a>
          </div>
        </footer>

        {/* Chatbot System */}
        <ChatBot />

        {/* Inquiry Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10005, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }} 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                style={{ 
                  width: '100%', 
                  maxWidth: '500px', 
                  background: 'var(--bg-primary)', 
                  border: '1.5px solid var(--text-primary)', 
                  padding: '2.5rem', 
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.8rem', background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-primary)' }}>×</button>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Service Inquiry</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', opacity: 0.7, marginBottom: '2rem', fontWeight: '500' }}>
                  Interested in <strong>{currentService?.title}</strong>? Let me know your requirements below.
                </p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input name="name" value={formData.name} onChange={handleInputChange} required type="text" placeholder="Your Name" style={{ background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--border-primary)', padding: '0.8rem 0', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }} />
                  <input name="email" value={formData.email} onChange={handleInputChange} required type="email" placeholder="Your Email" style={{ background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--border-primary)', padding: '0.8rem 0', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }} />
                  <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="Tell me about your project..." rows="4" style={{ background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--border-primary)', padding: '0.8rem 0', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none', resize: 'none' }}></textarea>
                  
                  {formStatus.message && (
                    <div style={{ padding: '0.8rem', fontSize: '0.85rem', fontWeight: '700', color: formStatus.success ? '#10b981' : '#ef4444', border: `1px solid ${formStatus.success ? '#10b981' : '#ef4444'}` }}>
                      {formStatus.message}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={formStatus.loading}
                    style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '1rem', fontWeight: '800', cursor: formStatus.loading ? 'not-allowed' : 'pointer', opacity: formStatus.loading ? 0.7 : 1 }}
                  >
                    {formStatus.loading ? 'Sending Request...' : 'Send Inquiry →'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast.show && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} style={{ position: 'fixed', bottom: '2rem', left: '2rem', background: 'white', color: 'black', padding: '1rem 1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 10001, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>{toast.percentage}%</div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{toast.name} Mastery</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Performance Benchmark reached</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Compact ChatBot Component
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 10003, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{ 
              width: '420px', 
              minHeight: '550px',
              background: 'var(--bg-primary)', 
              border: '1.5px solid var(--text-primary)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.8rem', borderBottom: '1px solid var(--border-primary)' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0 }}>Chat with John</h3>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', opacity: 0.6, color: 'var(--text-primary)', marginTop: '4px' }}>AI Assistant v1.0</div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-primary)' }}>×</button>
            </div>
            
            <div style={{ flex: '1 1 0%', padding: '1.8rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', border: '1px solid var(--border-primary)' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: '1.7', margin: 0 }}>
                  👋 Hi there! I'm John's digital assistant. 
                  <br /><br />
                  I'm currently <strong>Under Development</strong> as I'm being trained on John's specific projects and tech stack. 
                  <br /><br />
                  Soon, you'll be able to ask me about his work on <strong>BBEK</strong>, <strong>StartupLab</strong>, or his expertise in <strong>React, Node.js, Supabase, and PostgreSQL</strong>.
                </p>
              </div>
              
              <div style={{ padding: '1rem', border: '1px dashed var(--border-primary)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', opacity: 0.6, color: 'var(--text-primary)' }}>
                  Coming soon - 2026
                </div>
              </div>
            </div>

            <div style={{ padding: '1.8rem', borderTop: '1px solid var(--border-primary)', display: 'flex', gap: '0.8rem' }}>
              <input 
                disabled 
                placeholder="Coming soon..." 
                style={{ flex: '1 1 0%', background: 'transparent', border: '1px solid var(--border-primary)', padding: '1rem', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }} 
              />
              <button disabled style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '1rem 1.5rem', fontWeight: '800', opacity: 0.5 }}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: '0.8rem 1.5rem',
              height: '45px',
              fontWeight: '800',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
          >
            <style>{`
              .chat-icon-svg {
                width: 1.2rem;
                height: 1.2rem;
                fill: currentColor;
              }
            `}</style>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="chat-icon-svg" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>
            </svg> 
            Chat with John
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

