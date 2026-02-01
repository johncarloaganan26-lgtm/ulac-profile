import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHtml5, FaCss3, FaJs, FaReact, FaVuejs, FaNodeJs, FaPhp, FaGit, FaGithub, FaCode, FaNpm, FaPlug, FaMoon, FaSun, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiAxios, SiMysql, SiVercel } from 'react-icons/si';
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';
import GLightbox from 'glightbox';
import project1Image from './Screenshot 2026-01-28 035743.png';

// For build folder images, we'll reference them via PUBLIC_URL in the component

// Unique Animation Skill Icon Component
const AnimatedSkillIcon = ({ icon: Icon, delay, color, percentage, name, animationType = 'rotate', size = '2.5rem', setToast }) => {
  // Define different animation configurations based on animationType
  const getAnimationConfig = (type) => {
    switch (type) {
      case 'bounce':
        return {
          y: [0, -10, 0],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'pulse':
        return {
          scale: [1, 1.15, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'rotate':
        return {
          rotate: [0, 10, -10, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'spin':
        return {
          rotate: [0, 360],
          transition: { duration: 8, repeat: Infinity, ease: "linear", delay }
        };
      case 'wobble':
        return {
          rotate: [0, -15, 15, 0],
          transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'float':
        return {
          y: [0, -8, 0],
          rotate: [0, 3, -3, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'swing':
        return {
          rotate: [0, 20, -20, 0],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay }
        };
      case 'tilt':
        return {
          rotate: [0, -10, 10, 0, -5, 5, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay }
        };
      default:
        return {
          rotate: [0, 360],
          transition: { duration: 8, repeat: Infinity, ease: "linear", delay }
        };
    }
  };

  const animationConfig = getAnimationConfig(animationType);

  const handleMouseEnter = (e) => {
    if (setToast) {
      const rect = e.currentTarget.getBoundingClientRect();
      setToast({ 
        show: true, 
        name, 
        percentage,
        x: rect.left + rect.width / 2,
        y: rect.top - 15 // Position above the logo
      });
    }
  };

  const handleMouseLeave = () => {
    if (setToast) {
      setToast({ show: false, name: '', percentage: '', x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      className="skill-card"
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0',
        cursor: 'pointer'
      }}
      initial={{ rotate: 0 }}
      animate={animationConfig}
      whileHover={{ scale: 1.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon style={{
        fontSize: size,
        color: color
      }} />
    </motion.div>
  );
};

// Skills Animation Container Component
const SkillsAnimation = ({ setToast }) => {
  const skills = [
    { icon: FaHtml5, color: '#e34f26', percentage: 60, name: 'HTML5', animationType: 'bounce' },
    { icon: FaCss3, color: '#1572b6', percentage: 55, name: 'CSS3', animationType: 'pulse' },
    { icon: FaJs, color: '#f7df1e', percentage: 50, name: 'JavaScript', animationType: 'rotate' },
    { icon: FaReact, color: '#61dafb', percentage: 45, name: 'React', animationType: 'spin' },
    { icon: FaVuejs, color: '#42b883', percentage: 40, name: 'Vue.js', animationType: 'wobble' },
    { icon: SiTailwindcss, color: '#06b6d4', percentage: 45, name: 'Tailwind CSS', animationType: 'float' },
    { icon: FaNodeJs, color: '#68a063', percentage: 40, name: 'Node.js', animationType: 'swing' },
    { icon: SiExpress, color: '#000000', percentage: 35, name: 'Express.js', animationType: 'tilt' },
    { icon: SiMysql, color: '#4479a1', percentage: 45, name: 'MySQL', animationType: 'pulse' },
    { icon: FaPhp, color: '#777bb4', percentage: 30, name: 'PHP', animationType: 'bounce' },
    { icon: FaPlug, color: '#6c5ce7', percentage: 40, name: 'REST APIs', animationType: 'rotate' },
    { icon: FaGit, color: '#f05032', percentage: 50, name: 'Git', animationType: 'spin' },
    { icon: FaGithub, color: '#181717', percentage: 55, name: 'GitHub', animationType: 'float' },
    { icon: SiVercel, color: '#000000', percentage: 50, name: 'Vercel', animationType: 'wobble' },
    { icon: FaCode, color: '#007acc', percentage: 65, name: 'VS Code', animationType: 'swing' },
    { icon: FaNpm, color: '#cb3837', percentage: 45, name: 'npm', animationType: 'pulse' },
    { icon: SiAxios, color: '#5a29ee', percentage: 40, name: 'Axios', animationType: 'tilt' },
  ];

  // Duplicate skills list 3 times to ensure smooth infinite scrolling for all screen sizes
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="skills-scroller">
      <div className="scroller-track scroller-skill-cards">
        {duplicatedSkills.map((skill, index) => (
          <AnimatedSkillIcon
            key={`${skill.name}-${index}`}
            icon={skill.icon}
            delay={0}
            color={skill.color}
            percentage={skill.percentage}
            name={skill.name}
            animationType={skill.animationType}
            setToast={setToast}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);
  const [scrollTopActive, setScrollTopActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ show: false, name: '', percentage: '', x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Initialize GLightbox for image zoom
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideosOnScroll: true
    });

    // Initialize Typed.js for text animation
    let typedInstance = null;
    if (typedRef.current) {
      typedInstance = new Typed(typedRef.current, {
        strings: ['Student', 'Aspiring Full Stack Developer'],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        backDelay: 2000,
        showCursor: true,
        cursorChar: '|'
      });
    }

    // Remove preloader after page loads
    const timer = setTimeout(() => {
      setPreloaderRemoved(true);
    }, 1000);

    // Scroll top button logic
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollTopActive(true);
      } else {
        setScrollTopActive(false);
      }
    };

    // Active section tracking with IntersectionObserver
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      lightbox.destroy();
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {/* Background Effects */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="geometric-bg"></div>

      {/* Preloader */}
      {!preloaderRemoved && <div id="preloader"></div>}

      {/* Scroll Top Button */}
      {scrollTopActive && (
        <button className="scroll-top active" onClick={scrollToTop}>
          <i className="bi bi-arrow-up-short"></i>
        </button>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className="skill-toast-container"
            style={{ left: toast.x, top: toast.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="skill-toast-percentage">{toast.percentage}%</div>
            <div className="skill-toast-name">{toast.name}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Header */}
      <motion.header
        className={`nav-header ${darkMode ? 'dark-background' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="nav-container">
          {/* Logo - Left side */}
          <div className="nav-logo">
            <img src={`${process.env.PUBLIC_URL}/ChatGPT Image Feb 1, 2026, 05_43_42 PM.png`} alt="Logo" className="nav-logo-img" />
          </div>
          
          {/* Center Menu */}
          <ul className="nav-menu-center">
            <motion.li>
              <a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
                Home
              </a>
            </motion.li>
            <motion.li>
              <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                About
              </a>
            </motion.li>
            <motion.li>
              <a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>
                Skills
              </a>
            </motion.li>
            <motion.li>
              <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                Projects
              </a>
            </motion.li>
            <motion.li>
              <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                Contact
              </a>
            </motion.li>
          </ul>
          
          {/* Right Side: Dark Mode Toggle Switch */}
          <div className="nav-right">
            <label className="dark-mode-toggle">
              <input 
                type="checkbox" 
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="switch-slider">
                <span className="switch-icon moon"><FaMoon /></span>
                <span className="switch-icon sun"><FaSun /></span>
              </span>
            </label>
          </div>
        </nav>
      </motion.header>

      {/* Social Icons - Right Side of Page */}
      <div className="page-social">
        <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}><FaTwitter /></motion.a>
        <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}><FaFacebook /></motion.a>
        <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}><FaInstagram /></motion.a>
        <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}><FaLinkedin /></motion.a>
      </div>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="hero-container">
            {/* Left side: Content */}
            <div className="hero-left" data-aos="fade-up" data-aos-delay="100">
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', color: '#333' }}>Aspiring Full Stack Developer</h2>
              <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '30px', fontStyle: 'italic' }}>
                Extreme passion for building and designing web applications
              </p>
            </div>
            {/* Right side: Image */}
            <div className="hero-right" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="hero-image">
                <img 
                  src={`${process.env.PUBLIC_URL}/ChatGPT Image Feb 1, 2026, 05_43_42 PM.png`} 
                  alt="Full Stack Developer" 
                  data-aos="fade-in"
                  style={{ maxWidth: '800px', width: '100%', borderRadius: '20px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: '600', textAlign: 'center' }}>About Me</h2>
            <div className="about-container" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* Left side: Image */}
              <div className="about-image" style={{ flex: '0 0 350px', maxWidth: '350px' }} data-aos="fade-right">
                <img 
                  src={`${process.env.PUBLIC_URL}/dsa.jpg`} 
                  alt="About Me" 
                  style={{ width: '100%', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
                />
              </div>
              {/* Right side: Content */}
              <div className="about-content" style={{ flex: '1', maxWidth: '600px', minWidth: '300px' }} data-aos="fade-left">
                <p className="py-3" style={{ color: '#555', lineHeight: '1.8', fontSize: '1.05rem' }}>
                  I'm a <strong>4th year BSIT student</strong> at Cavite State University with a passion for building modern, scalable web applications. I specialize in creating responsive, user-centered experiences using technologies like React, Vue, and Node.js.
                </p>
                <p className="py-2" style={{ color: '#555', lineHeight: '1.8', fontSize: '1.05rem' }}>
                  Currently seeking <strong>junior developer roles or internships</strong> where I can contribute my skills, collaborate with experienced developers, and continue expanding my expertise in full-stack development.
                </p>
                <div className="about-details" style={{ marginTop: '30px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '12px' }}><span className="about-label">Education:</span> <span style={{ marginLeft: '10px', color: '#555' }}>Cavite State University - BSIT 4th yr (Cavite City Campus)</span></li>
                        <li style={{ marginBottom: '12px' }}><span className="about-label">Email:</span> <span style={{ marginLeft: '10px', color: '#555' }}>johncarloaganan26@gmail.com</span></li>
                        <li style={{ marginBottom: '12px' }}><span className="about-label">Country:</span> <span style={{ marginLeft: '10px', color: '#555' }}>Philippines</span></li>
                      </ul>
                    </div>
                    <div>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '12px' }}><span className="about-label">Focus:</span> <span style={{ marginLeft: '10px', color: '#555' }}>Full-Stack Development</span></li>
                        <li style={{ marginBottom: '12px' }}><span className="about-label">Status:</span> <span style={{ marginLeft: '10px', color: '#28a745', fontWeight: '500' }}>Available for hire</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills section">
          <div className="container section-title text-center" data-aos="fade-up">
            <h2>Skills & Technologies</h2>
            <p>A comprehensive set of technologies and tools I work with to build modern web applications</p>
          </div>

          {/* Skills Animation - Unique Animations for Each Icon */}
          <SkillsAnimation setToast={setToast} />
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects section">
          <div className="container section-title text-center" data-aos="fade-up">
            <h2>Projects</h2>
            <p>Here are some of the projects I've worked on</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row justify-content-center">
              <div className="col-lg-10 portfolio-item">
                <div className="portfolio-content h-100">
                  <a href={project1Image} data-gallery="portfolio-gallery" className="glightbox d-flex justify-content-center align-items-center" style={{ minHeight: '450px' }} data-glightbox="title: BBEK Church Management System; description: <p>BBEK Church Management System is a comprehensive church administration platform designed to manage church records, events, services, and community engagement. Built with role-based access control (admin, pastor, member), it includes modules for member management, event coordination, service records, donations, announcements, and content management. Optimized for church operations with features like bulk operations, reporting, email notifications, and secure data handling.</p><div class='glightbox-tech'><h4>Technologies</h4><div class='glightbox-tech-icons'><span class='glightbox-tech-item'><SiMysql /> MySQL</span><span class='glightbox-tech-item'><SiVuedotjs /> Vue.js</span><span class='glightbox-tech-item'><SiExpress /> Express</span><span class='glightbox-tech-item'><SiNodedotjs /> Node.js</span><span class='glightbox-tech-item'><SiVuetify /> Vuetify</span><span class='glightbox-tech-item'>📦 Element Plus</span><span class='glightbox-tech-item'><SiPinia /> Pinia</span><span class='glightbox-tech-item'><SiAxios /> Axios</span><span class='glightbox-tech-item'><SiJsonwebtokens /> JWT</span><span class='glightbox-tech-item'><SiSendgrid /> SendGrid</span><span class='glightbox-tech-item'>📊 ExcelJS</span><span class='glightbox-tech-item'>📄 CSV Parser</span><span class='glightbox-tech-item'><SiVite /> Vite</span><span class='glightbox-tech-item'>🪟 Winser</span></div></div>; descPosition: right;">
                    <img src={project1Image} className="img-fluid rounded shadow" style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto', objectFit: 'contain' }} alt="Church Website" />
                  </a>
                  <div className="portfolio-info">
                    <h4>BBEK Church Management System</h4>
                    <p>A comprehensive church administration platform with role-based access control and various modules.</p>
                    <a href="https://biblebaptistekklesiaofkawit.xyz/" target="_blank" rel="noopener noreferrer" className="visit-site-btn btn-lg px-4 py-2 rounded-pill shadow-sm">View Project <i className="bi bi-arrow-right ms-2"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-10 portfolio-item mt-4">
                <div className="portfolio-content h-100">
                  <a href={`${process.env.PUBLIC_URL}/Screenshot 2026-01-31 091212.png`} data-gallery="portfolio-gallery" className="glightbox d-flex justify-content-center align-items-center" style={{ minHeight: '450px' }} data-glightbox="title: Baby Bliss Booking; description: <p>Baby Bliss Booking is an online appointment scheduling system for a baby spa and wellness center. It allows customers to book appointments for baby massage, spa treatments, and wellness services. Features include service selection, time slot availability, booking confirmation, and admin management for appointments.</p><div class='glightbox-tech'><h4>Technologies</h4><div class='glightbox-tech-icons'><span class='glightbox-tech-item'><FaReact /> React</span><span class='glightbox-tech-item'><SiTailwindcss /> Tailwind CSS</span><span class='glightbox-tech-item'><SiVercel /> Vercel</span></div></div>; descPosition: right;">
                    <img src={`${process.env.PUBLIC_URL}/Screenshot 2026-01-31 091212.png`} className="img-fluid rounded shadow" style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto', objectFit: 'contain' }} alt="Baby Bliss Booking" />
                  </a>
                  <div className="portfolio-info">
                    <h4>Baby Bliss Booking</h4>
                    <p>An online appointment scheduling system for a baby spa and wellness center.</p>
                    <a href="https://babyblissbooking.vercel.app/" target="_blank" rel="noopener noreferrer" className="visit-site-btn btn-lg px-4 py-2 rounded-pill shadow-sm">View Project <i className="bi bi-arrow-right ms-2"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title text-center" data-aos="fade-up">
            <h2>Contact</h2>
            <p>Get in touch with me for any inquiries or collaboration opportunities.</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="contact-cards">
              <motion.div
                className="contact-card"
                whileHover={{ scale: 1.02, y: -5 }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Location</h3>
                <p>Naic Cavite Philippines</p>
              </motion.div>

              <motion.div
                className="contact-card"
                whileHover={{ scale: 1.02, y: -5 }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <h3>Email</h3>
                <p>johncarloaganan26@gmail.com</p>
              </motion.div>

              <motion.div
                className="contact-card"
                whileHover={{ scale: 1.02, y: -5 }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <h3>Phone</h3>
                <p>09543300228</p>
              </motion.div>
            </div>

            <motion.div
              className="contact-form-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <form className="php-email-form">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label htmlFor="name-field" className="pb-2">Name</label>
                    <input type="text" name="name" id="name-field" className="form-control" required placeholder="Your Name" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email-field" className="pb-2">Email</label>
                    <input type="email" className="form-control" name="email" id="email-field" required placeholder="your@email.com" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="subject-field" className="pb-2">Subject</label>
                    <input type="text" className="form-control" name="subject" id="subject-field" required placeholder="What's this about?" />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="message-field" className="pb-2">Message</label>
                    <textarea className="form-control" name="message" rows="8" id="message-field" required placeholder="Your message..."></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Minimalist Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} John Carlo Aganan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;