import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaHtml5, FaCss3, FaJs, FaReact, FaVuejs, FaNodeJs, FaPhp, FaGit, FaGithub, FaCode, FaNpm, FaPlug, FaMoon, FaSun, FaLinkedin, FaBars, FaTimes, FaFacebook, FaInstagram, FaTwitter, FaCommentDots } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { SiTailwindcss, SiExpress, SiAxios, SiMysql, SiVercel } from 'react-icons/si';

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
    { icon: FaHtml5, color: 'currentColor', percentage: 60, name: 'HTML5', animationType: 'bounce' },
    { icon: FaCss3, color: 'currentColor', percentage: 55, name: 'CSS3', animationType: 'pulse' },
    { icon: FaJs, color: 'currentColor', percentage: 50, name: 'JavaScript', animationType: 'rotate' },
    { icon: FaReact, color: 'currentColor', percentage: 45, name: 'React', animationType: 'spin' },
    { icon: FaVuejs, color: 'currentColor', percentage: 40, name: 'Vue.js', animationType: 'wobble' },
    { icon: SiTailwindcss, color: 'currentColor', percentage: 45, name: 'Tailwind CSS', animationType: 'float' },
    { icon: FaNodeJs, color: 'currentColor', percentage: 40, name: 'Node.js', animationType: 'swing' },
    { icon: SiExpress, color: 'currentColor', percentage: 35, name: 'Express.js', animationType: 'tilt' },
    { icon: SiMysql, color: 'currentColor', percentage: 45, name: 'MySQL', animationType: 'pulse' },
    { icon: FaPhp, color: 'currentColor', percentage: 30, name: 'PHP', animationType: 'bounce' },
    { icon: FaPlug, color: 'currentColor', percentage: 40, name: 'REST APIs', animationType: 'rotate' },
    { icon: FaGit, color: 'currentColor', percentage: 50, name: 'Git', animationType: 'spin' },
    { icon: FaGithub, color: 'currentColor', percentage: 55, name: 'GitHub', animationType: 'float' },
    { icon: SiVercel, color: 'currentColor', percentage: 50, name: 'Vercel', animationType: 'wobble' },
    { icon: FaCode, color: 'currentColor', percentage: 65, name: 'VS Code', animationType: 'swing' },
    { icon: FaNpm, color: 'currentColor', percentage: 45, name: 'npm', animationType: 'pulse' },
    { icon: SiAxios, color: 'currentColor', percentage: 40, name: 'Axios', animationType: 'tilt' },
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

function App() {
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);
  const [scrollTopActive, setScrollTopActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ show: false, name: '', percentage: '', x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' });
  const typedRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false, message: '' });
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`} style={{ paddingTop: '0px' }}>
      {!preloaderRemoved && (
        <div id="preloader">
          <div className="logo-container"><img src={logoImage} alt="Logo" /></div>
        </div>
      )}


      <AnimatePresence>
        {toast.show && (
          <motion.div className="skill-toast-container" style={{ left: toast.x, top: toast.y }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
            <div className="skill-toast-percentage">{toast.percentage}%</div>
            <div className="skill-toast-name">{toast.name}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main" style={{ padding: '30px 4rem 0px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '4rem', flexWrap: 'wrap', paddingRight: '2rem' }}>
          <img src={`${process.env.PUBLIC_URL}/dsa.jpg`} alt="Profile" style={{ width: '180px', height: '180px', objectFit: 'cover', border: '1px solid var(--border-primary)' }} />
          <div style={{ flex: '1 1 0%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>John Carlo Aganan</h1>
              <MdVerified style={{ color: '#0ea5e9', fontSize: '1.5rem' }} title="Verified Full Stack Developer" />
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
              <FaMapMarkerAlt /> Naic, Cavite, Philippines
            </p>
            <div style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Student striving to become a Software Engineer
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => scrollToSection('contact')}
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '0.8rem 1.5rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Schedule a Call →
              </button>
              <button style={{ background: 'transparent', border: '1.5px solid var(--text-primary)', padding: '0.8rem 1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Send Email</button>
              <button style={{ background: 'transparent', border: '1.5px solid var(--text-primary)', padding: '0.8rem 1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Read my blog</button>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '0px' }}>
              <div 
                onClick={() => setDarkMode(!darkMode)} 
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  background: '#e5e7eb', 
                  width: '60px',
                  height: '30px',
                  position: 'relative'
                }}
              >
                <motion.div
                   animate={{ x: darkMode ? 30 : 0 }}
                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
                   style={{
                     width: '30px',
                     height: '30px',
                     background: '#fff',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     color: '#6b7280',
                     zIndex: 2,
                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                   }}
                >
                   {darkMode ? <FaMoon size={14} /> : <FaSun size={14} />}
                </motion.div>
              </div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <section id="about" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>About</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: '500' }}>
                I'm a full-stack software engineer specializing in developing solutions with JavaScript, React, and Node.js. 
                I work on projects including building modern web applications, management systems, and academic platforms.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)', marginTop: '1.5rem', fontWeight: '500' }}>
                I'm a 4th year BSIT student at Cavite State University, focusing on creating efficient and impactful digital solutions. 
                My work includes developing complex systems that solve real-world problems.
              </p>
            </section>

            <section id="skills" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginWeight: '2rem', marginBottom: '1.5rem' }}>
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
                      <span key={s} style={{ background: 'transparent', border: '1.5px solid var(--text-primary)', padding: '0.4rem 1rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)' }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '0.8rem', color: 'var(--text-primary)', opacity: 0.8 }}>Backend</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Node.js', 'Express.js', 'PHP', 'MySQL'].map(s => (
                      <span key={s} style={{ background: 'transparent', border: '1.5px solid var(--text-primary)', padding: '0.4rem 1rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)' }}>{s}</span>
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
                          <span key={s} style={{ background: 'transparent', border: '1.5px solid var(--text-primary)', padding: '0.4rem 1rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <section id="projects" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
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
                  { title: 'BigBrew POS System', img: bigbrewPOSImage, url: 'https://brew-sxrs.vercel.app/', desc: 'Coffee Shop Point of Sale System with Real-Time Analytics Dashboard.', tags: ['React', 'Vite', 'Tailwind', 'Node.js'] },
                  { title: 'StartupLab Ticketing System', img: project4Image, url: 'https://startuplab-event-creation.vercel.app/', desc: 'Previous System: End-to-end event ticketing and management platform.', tags: ['React', 'Node.js', 'PostgreSQL'] },
                  { title: 'BBEK Administration System', img: project1Image, url: 'https://biblebaptistekklesiaofkawit.xyz/', desc: 'Previous System: Comprehensive administration platform for church operations.', tags: ['Vue.js', 'Node.js', 'MySQL'] },
                  { title: 'Baby Bliss Booking', img: project2Image, url: 'https://babyblissbooking.vercel.app/', desc: 'Advanced appointment system for wellness and spa centers.', tags: ['React', 'Tailwind', 'Vercel'] },
                  { title: 'Event Registration System', img: project3Image, url: 'https://startuplab-event-registration.vercel.app/', desc: 'Streamlined registration platform for university and academic events.', tags: ['Laravel', 'PHP', 'MySQL'] }
                ].slice(0, showAllProjects ? 5 : 2).map((p, i) => (
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
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        {p.tags.map(t => <span key={t} style={{ fontSize: '0.7rem', fontWeight: '800', background: 'transparent', border: '1px solid var(--text-primary)', padding: '0.2rem 0.6rem', color: 'var(--text-primary)' }}>{t}</span>)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { role: 'Full Stack Engineer', company: 'BBEK Projects', year: '2025' },
                  { role: 'Software Developer', company: 'Academic Clients', year: '2024' },
                  { role: 'Student Developer', company: 'CvSU Main', year: '2023 - Present' }
                ].map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--text-primary)', marginTop: '6px' }}></div>
                    <div style={{ flex: '1 1 0%' }}>
                      <h4 style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>{exp.role}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}>{exp.company}</p>
                    </div>
                    <div style={{ fontHeight: '0.8rem', fontWeight: '800', color: 'var(--text-primary)', fontSize: '0.8rem' }}>{exp.year}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section id="contact" style={{ marginTop: '4rem', padding: '4rem 0', borderTop: '2px solid var(--border-primary)' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Let's work together</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '3rem', fontWeight: '500' }}>
              I'm always looking for new opportunities and collaborations. 
              Feel free to reach out if you have a project in mind or just want to say hi.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input type="text" placeholder="Name" style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--border-primary)', padding: '1rem 0', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }} />
              <input type="email" placeholder="Email" style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--border-primary)', padding: '1rem 0', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none' }} />
              <textarea placeholder="Message" rows="4" style={{ background: 'transparent', border: 'none', borderBottom: '2px solid var(--border-primary)', padding: '1rem 0', fontSize: '1rem', color: 'var(--text-primary)', outline: 'none', resize: 'none' }}></textarea>
              <button style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '1rem 2rem', fontWeight: '800', marginTop: '1rem', width: 'fit-content', cursor: 'pointer' }}>Send Message</button>
            </form>
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
                  Soon, you'll be able to ask me about his work on <strong>BBEK</strong>, <strong>StartupLab</strong>, or his expertise in <strong>React & Node.js</strong>.
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

