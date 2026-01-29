

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaStar, FaServicestack, FaEnvelope, FaTwitter, FaFacebook, FaInstagram, FaSkype, FaLinkedin, FaHtml5, FaCss3, FaJs, FaReact, FaVuejs, FaNodeJs, FaPhp, FaGit, FaGithub, FaCode, FaNpm, FaPlug } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiAxios, SiMysql, SiVercel } from 'react-icons/si';
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';
import GLightbox from 'glightbox';
import project1Image from './Screenshot 2026-01-28 035743.png';

// Framer Motion skill icon component with continuous bounce animation
const SkillIcon = ({ icon: Icon, style, delay = 0 }) => (
  <motion.div
    style={{ display: 'inline-block', ...style }}
    initial={{ y: 0 }}
    animate={{ 
      y: [0, -8, 0],
      rotate: [0, 3, -3, 0],
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay,
      ease: "easeInOut"
    }}
    whileHover={{ scale: 1.3, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon />
  </motion.div>
);

function App() {
  const [preloaderRemoved, setPreloaderRemoved] = useState(false);
  const [scrollTopActive, setScrollTopActive] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
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
    <div className="App">
      {/* Preloader */}
      {!preloaderRemoved && <div id="preloader"></div>}

      {/* Scroll Top Button */}
      {scrollTopActive && (
        <button className="scroll-top active" onClick={scrollToTop}>
          <i className="bi bi-arrow-up-short"></i>
        </button>
      )}

      {/* Header Sidebar */}
      <header className={`header dark-background ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <button className="header-toggle d-xl-none" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <i className="bi bi-list"></i>
        </button>
        <motion.button 
          className="sidebar-toggle" 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
          title="Toggle Sidebar"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.i 
            className={`bi ${sidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}
            animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <div className="profile-img">
          <img src={`${process.env.PUBLIC_URL}/5518c04f-68ec-4ae8-9b34-6c02f9ff5102.jpg`} alt="Profile" className="img-fluid rounded-circle" />
        </div>

        <div className="logo d-flex align-items-center justify-content-center">
          <h1 className="sitename">John Carlo Aganan</h1>
        </div>

        <div className="social-links text-center">
          <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}><FaTwitter /></motion.a>
          <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}><FaFacebook /></motion.a>
          <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}><FaInstagram /></motion.a>
          <motion.a href="https://skype.com" target="_blank" rel="noopener noreferrer" className="google-plus" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}><FaSkype /></motion.a>
          <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.95 }}><FaLinkedin /></motion.a>
        </div>

        <nav className="navmenu">
          <ul>
            <motion.li whileHover={{ x: 5 }}>
              <a href="#hero" className="active" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
                <FaHome className="navicon" /> Home
              </a>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                <FaUser className="navicon" /> About
              </a>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>
                <FaStar className="navicon" /> Skills
              </a>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                <FaServicestack className="navicon" /> Projects
              </a>
            </motion.li>
            <motion.li whileHover={{ x: 5 }}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                <FaEnvelope className="navicon" /> Contact
              </a>
            </motion.li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section dark-background">
          <img src={`${process.env.PUBLIC_URL}/5518c04f-68ec-4ae8-9b34-6c02f9ff5102.jpg`} alt="John Carlo Aganan" data-aos="fade-in" />
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <h2>John Carlo Aganan</h2>
            <p>
              I'm <span ref={typedRef}></span>
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section light-mode-section">
          <div className="container section-title" data-aos="fade-up">
            <h2>About Me</h2>
            <p>I'm a passionate BSIT student in my 4th year, driven by a genuine love for building modern, scalable web applications.</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4 justify-content-center">
              <div className="col-lg-4">
                <img src={`${process.env.PUBLIC_URL}/5518c04f-68ec-4ae8-9b34-6c02f9ff5102.jpg`} className="img-fluid" alt="Profile" />
              </div>
              <div className="col-lg-8 content">
                <h2>Full-Stack Web Developer</h2>
                <p className="fst-italic py-3">My journey in web development started with a curiosity about how things work, and it has evolved into a career pursuit filled with continuous learning and growth.</p>
                <p className="py-2">I specialize in creating responsive, user-centered web experiences using modern technologies like React, Vue, and Node.js. Whether it's frontend interfaces or backend systems, I approach every project with attention to detail and a commitment to clean, maintainable code.</p>
                <p className="py-2">Currently seeking opportunities for junior developer roles or internships where I can contribute my skills, collaborate with experienced developers, and continue expanding my expertise in full-stack development.</p>
                <div className="row py-3">
                  <div className="col-lg-6">
                    <ul>
                      <li><i className="bi bi-chevron-right"></i> <strong>Education:</strong> <span>Cavite State University Cavite City Campus - BSIT 4th yr</span></li>
                      <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.yourwebsite.com</span></li>
                      <li><i className="bi bi-chevron-right"></i> <strong>Country:</strong> <span>Philippines</span></li>
                      <li><i className="bi bi-chevron-right"></i> <strong>Status:</strong> <span>Available for hire</span></li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>
                      <li><i className="bi bi-chevron-right"></i> <strong>Focus:</strong> <span>Full-Stack Development</span></li>
                      <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>johncarloaganan26@gmail.com</span></li>
                      <li><i className="bi bi-chevron-right"></i> <strong>Internship:</strong> <span>Open to opportunities</span></li>
                    </ul>
                  </div>
                </div>
                <div className="row py-3">
                  <div className="col-12">
                    <h4 className="py-2">Key Strengths:</h4>
                    <ul className="strengths-list">
                      <li><i className="bi bi-check-circle text-primary"></i> Problem-solving and analytical thinking</li>
                      <li><i className="bi bi-check-circle text-primary"></i> Quick learner with strong fundamentals</li>
                      <li><i className="bi bi-check-circle text-primary"></i> Attention to detail in UI/UX implementation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Skills & Technologies</h2>
            <p>A comprehensive set of technologies and tools I work with to build modern web applications</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <h3 className="pb-4">Frontend</h3>
            <div className="row skills-content">
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaHtml5} style={{fontSize: '3rem', color: '#e34f26'}} delay={0} /> HTML5 <i className="val">60%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaCss3} style={{fontSize: '3rem', color: '#1572b6'}} delay={0.1} /> CSS3 <i className="val">55%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaJs} style={{fontSize: '3rem', color: '#f7df1e'}} delay={0.2} /> JavaScript <i className="val">50%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaReact} style={{fontSize: '3rem', color: '#61dafb'}} delay={0.3} /> React <i className="val">45%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaVuejs} style={{fontSize: '3rem', color: '#42b883'}} delay={0.4} /> Vue.js <i className="val">40%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={SiTailwindcss} style={{fontSize: '3rem', color: '#06b6d4'}} delay={0.5} /> Tailwind CSS <i className="val">45%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="py-4">Backend</h3>
            <div className="row skills-content">
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaNodeJs} style={{fontSize: '3rem', color: '#68a063'}} delay={0.1} /> Node.js <i className="val">40%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={SiExpress} style={{fontSize: '3rem', color: '#000000'}} delay={0.2} /> Express.js <i className="val">35%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={SiMysql} style={{fontSize: '3rem', color: '#4479a1'}} delay={0.3} /> MySQL <i className="val">45%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaPhp} style={{fontSize: '3rem', color: '#777bb4'}} delay={0.4} /> PHP <i className="val">30%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaPlug} style={{fontSize: '3rem', color: '#6c5ce7'}} delay={0.5} /> REST APIs <i className="val">40%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="py-4">Tools & Other</h3>
            <div className="row skills-content">
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaGit} style={{fontSize: '3rem', color: '#f05032'}} delay={0.1} /> Git <i className="val">50%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaGithub} style={{fontSize: '3rem', color: '#181717'}} delay={0.2} /> GitHub <i className="val">55%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={SiVercel} style={{fontSize: '3rem', color: '#000000'}} delay={0.3} /> Vercel <i className="val">50%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaCode} style={{fontSize: '3rem', color: '#007acc'}} delay={0.4} /> VS Code <i className="val">65%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={FaNpm} style={{fontSize: '3rem', color: '#cb3837'}} delay={0.5} /> npm <i className="val">45%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="progress">
                  <span className="skill"><SkillIcon icon={SiAxios} style={{fontSize: '3rem', color: '#5a29ee'}} delay={0.6} /> Axios <i className="val">40%</i></span>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Projects</h2>
            <p>Here are some of the projects I've worked on</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row justify-content-start">
              <div className="col-lg-8 portfolio-item">
                <div className="portfolio-content h-100">
                  <a href={project1Image} data-gallery="portfolio-gallery" className="glightbox" data-glightbox="title: BBEK Church Management System; description: <p>BBEK Church Management System is a comprehensive church administration platform designed to manage church records, events, services, and community engagement. Built with role-based access control (admin, pastor, member), it includes modules for member management, event coordination, service records, donations, announcements, and content management. Optimized for church operations with features like bulk operations, reporting, email notifications, and secure data handling.</p><div class='glightbox-tech'><h4>Technologies</h4><div class='glightbox-tech-icons'><span class='glightbox-tech-item'><SiMysql /> MySQL</span><span class='glightbox-tech-item'><SiVuedotjs /> Vue.js</span><span class='glightbox-tech-item'><SiExpress /> Express</span><span class='glightbox-tech-item'><SiNodedotjs /> Node.js</span><span class='glightbox-tech-item'><SiVuetify /> Vuetify</span><span class='glightbox-tech-item'>📦 Element Plus</span><span class='glightbox-tech-item'><SiPinia /> Pinia</span><span class='glightbox-tech-item'><SiAxios /> Axios</span><span class='glightbox-tech-item'><SiJsonwebtokens /> JWT</span><span class='glightbox-tech-item'><SiSendgrid /> SendGrid</span><span class='glightbox-tech-item'>📊 ExcelJS</span><span class='glightbox-tech-item'>📄 CSV Parser</span><span class='glightbox-tech-item'><SiVite /> Vite</span><span class='glightbox-tech-item'>🪟 Winser</span></div></div>; descPosition: right;">
                    <img src={project1Image} className="img-fluid" style={{ width: '100%', height: '350px', objectFit: 'cover' }} alt="Church Website" />
                  </a>
                  <div className="portfolio-info">
                    <h4>BBEK Church Management System</h4>
                    <p>A comprehensive church administration platform with role-based access control and various modules.</p>
                    <a href="https://biblebaptistekklesiaofkawit.xyz/" target="_blank" rel="noopener noreferrer" className="visit-site-btn">View Project</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <p>Get in touch with me for any inquiries or collaboration opportunities.</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-5">
                <div className="info-wrap">
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23149ddd' d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z'/%3E%3C/svg%3E" alt="Location" style={{width: '28px', height: '28px', marginRight: '15px', flexShrink: 0}} />
                    <div>
                      <h3>Location</h3>
                      <p>Naic Cavite Philippines</p>
                    </div>
                  </div>
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23149ddd' d='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z'/%3E%3C/svg%3E" alt="Email" style={{width: '28px', height: '28px', marginRight: '15px', flexShrink: 0}} />
                    <div>
                      <h3>Email Us</h3>
                      <p>johncarloaganan26@gmail.com</p>
                    </div>
                  </div>
                  <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23149ddd' d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z'/%3E%3C/svg%3E" alt="Phone" style={{width: '28px', height: '28px', marginRight: '15px', flexShrink: 0}} />
                    <div>
                      <h3>Call Us</h3>
                      <p>09543300228</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <form className="php-email-form">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <label htmlFor="name-field" className="pb-2">Name</label>
                      <input type="text" name="name" id="name-field" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email-field" className="pb-2">Your Email</label>
                      <input type="email" className="form-control" name="email" id="email-field" required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="subject-field" className="pb-2">Subject</label>
                      <input type="text" className="form-control" name="subject" id="subject-field" required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="message-field" className="pb-2">Message</label>
                      <textarea className="form-control" name="message" rows="10" id="message-field" required></textarea>
                    </div>
                    <div className="col-md-12 text-center">
                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer dark-background">
        <div className="container">
          <div className="copyright text-center">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">MyPortfolio</strong> <span>All Rights Reserved</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;