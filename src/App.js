

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaStar, FaServicestack, FaEnvelope, FaTwitter, FaFacebook, FaInstagram, FaSkype, FaLinkedin, FaHtml5, FaCss3, FaJs, FaReact, FaVuejs, FaNodeJs, FaPhp, FaGit, FaGithub, FaCode, FaNpm, FaPlug, FaMoon, FaSun, FaBars, FaTimes, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
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
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
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

      {/* Dark Mode Toggle */}
      <motion.button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)} 
        title="Toggle Dark Mode"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </motion.button>

      {/* Mobile Menu Burger Button */}
      <motion.button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        title="Toggle Menu"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Header Sidebar */}
      <AnimatePresence mode="wait">
        <motion.header
          className={`header ${darkMode ? 'dark-background' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >

        <div className="profile-img">
          <img src={`${process.env.PUBLIC_URL}/5518c04f-68ec-4ae8-9b34-6c02f9ff5102.jpg`} alt="Profile" className="img-fluid rounded-circle" style={{width: '120px', height: '120px', objectFit: 'cover'}} />
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
      </motion.header>
      </AnimatePresence>

      {/* Main Content */}
      <main className="main sidebar-open">
        {/* Hero Section */}
        <section id="hero" className="hero section dark-background">
          <img src={`${process.env.PUBLIC_URL}/5518c04f-68ec-4ae8-9b34-6c02f9ff5102.jpg`} alt="John Carlo Aganan" data-aos="fade-in" />
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px'}}>
              <img src={`${process.env.PUBLIC_URL}/ChatGPT Image Jan 30, 2026, 02_34_49 AM.png`} alt="Logo" style={{width: '50px', height: '50px', marginRight: '15px', borderRadius: '10px'}} />
              <h2>John Carlo Aganan</h2>
            </div>
            <p>
              I'm <span ref={typedRef}></span>
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section light-mode-section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4 align-items-center">
              <div className="col-lg-4 text-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/5518c04f-68ec-4ae8-9b34-6c02f9ff5102.jpg`} 
                  className="img-fluid shadow-lg" 
                  alt="Profile" 
                  style={{maxWidth: '100%', maxHeight: '350px', height: 'auto', borderRadius: '12px'}} 
                />
              </div>
              <div className="col-lg-8 content">
                <h2 style={{fontSize: '2rem', marginBottom: '15px', fontWeight: '600'}}>About Me</h2>
                <p className="py-3" style={{color: '#555', lineHeight: '1.8', fontSize: '1.05rem'}}>
                  I'm a <strong>4th year BSIT student</strong> at Cavite State University with a passion for building modern, scalable web applications. I specialize in creating responsive, user-centered experiences using technologies like React, Vue, and Node.js.
                </p>
                <p className="py-2" style={{color: '#555', lineHeight: '1.8', fontSize: '1.05rem'}}>
                  Currently seeking <strong>junior developer roles or internships</strong> where I can contribute my skills, collaborate with experienced developers, and continue expanding my expertise in full-stack development.
                </p>
                <div className="row py-4">
                  <div className="col-md-6">
                    <ul style={{listStyle: 'none', padding: 0}}>
                      <li style={{marginBottom: '12px'}}><span style={{fontWeight: '600', color: '#149ddd'}}>Education:</span> <span style={{marginLeft: '10px'}}>Cavite State University - BSIT 4th yr</span></li>
                      <li style={{marginBottom: '12px'}}><span style={{fontWeight: '600', color: '#149ddd'}}>Email:</span> <span style={{marginLeft: '10px'}}>johncarloaganan26@gmail.com</span></li>
                      <li style={{marginBottom: '12px'}}><span style={{fontWeight: '600', color: '#149ddd'}}>Country:</span> <span style={{marginLeft: '10px'}}>Philippines</span></li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul style={{listStyle: 'none', padding: 0}}>
                      <li style={{marginBottom: '12px'}}><span style={{fontWeight: '600', color: '#149ddd'}}>Focus:</span> <span style={{marginLeft: '10px'}}>Full-Stack Development</span></li>
                      <li style={{marginBottom: '12px'}}><span style={{fontWeight: '600', color: '#149ddd'}}>Website:</span> <span style={{marginLeft: '10px'}}>biblebaptistekklesiaofkawit.xyz</span></li>
                      <li style={{marginBottom: '12px'}}><span style={{fontWeight: '600', color: '#149ddd'}}>Status:</span> <span style={{marginLeft: '10px'}}><span style={{color: '#28a745', fontWeight: '500'}}>Available for hire</span></span></li>
                    </ul>
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
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <h3 className="pb-4 text-center">Frontend</h3>
            <div className="skills-grid">
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaHtml5} style={{fontSize: '3rem', color: '#e34f26'}} delay={0} />
                </div>
                <h4>HTML5</h4>
                <div className="skill-badge">60%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaCss3} style={{fontSize: '3rem', color: '#1572b6'}} delay={0.1} />
                </div>
                <h4>CSS3</h4>
                <div className="skill-badge">55%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaJs} style={{fontSize: '3rem', color: '#f7df1e'}} delay={0.2} />
                </div>
                <h4>JavaScript</h4>
                <div className="skill-badge">50%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaReact} style={{fontSize: '3rem', color: '#61dafb'}} delay={0.3} />
                </div>
                <h4>React</h4>
                <div className="skill-badge">45%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaVuejs} style={{fontSize: '3rem', color: '#42b883'}} delay={0.4} />
                </div>
                <h4>Vue.js</h4>
                <div className="skill-badge">40%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={SiTailwindcss} style={{fontSize: '3rem', color: '#06b6d4'}} delay={0.5} />
                </div>
                <h4>Tailwind CSS</h4>
                <div className="skill-badge">45%</div>
              </motion.div>
            </div>
            
            <h3 className="py-4 text-center">Backend</h3>
            <div className="skills-grid">
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaNodeJs} style={{fontSize: '3rem', color: '#68a063'}} delay={0.1} />
                </div>
                <h4>Node.js</h4>
                <div className="skill-badge">40%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={SiExpress} style={{fontSize: '3rem', color: '#000000'}} delay={0.2} />
                </div>
                <h4>Express.js</h4>
                <div className="skill-badge">35%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={SiMysql} style={{fontSize: '3rem', color: '#4479a1'}} delay={0.3} />
                </div>
                <h4>MySQL</h4>
                <div className="skill-badge">45%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaPhp} style={{fontSize: '3rem', color: '#777bb4'}} delay={0.4} />
                </div>
                <h4>PHP</h4>
                <div className="skill-badge">30%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaPlug} style={{fontSize: '3rem', color: '#6c5ce7'}} delay={0.5} />
                </div>
                <h4>REST APIs</h4>
                <div className="skill-badge">40%</div>
              </motion.div>
            </div>
            
            <h3 className="py-4 text-center">Tools & Other</h3>
            <div className="skills-grid">
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaGit} style={{fontSize: '3rem', color: '#f05032'}} delay={0.1} />
                </div>
                <h4>Git</h4>
                <div className="skill-badge">50%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaGithub} style={{fontSize: '3rem', color: '#181717'}} delay={0.2} />
                </div>
                <h4>GitHub</h4>
                <div className="skill-badge">55%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={SiVercel} style={{fontSize: '3rem', color: '#000000'}} delay={0.3} />
                </div>
                <h4>Vercel</h4>
                <div className="skill-badge">50%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaCode} style={{fontSize: '3rem', color: '#007acc'}} delay={0.4} />
                </div>
                <h4>VS Code</h4>
                <div className="skill-badge">65%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={FaNpm} style={{fontSize: '3rem', color: '#cb3837'}} delay={0.5} />
                </div>
                <h4>npm</h4>
                <div className="skill-badge">45%</div>
              </motion.div>
              <motion.div className="skill-card" whileHover={{ scale: 1.05, y: -5 }}>
                <div className="skill-icon-wrapper">
                  <SkillIcon icon={SiAxios} style={{fontSize: '3rem', color: '#5a29ee'}} delay={0.6} />
                </div>
                <h4>Axios</h4>
                <div className="skill-badge">40%</div>
              </motion.div>
            </div>
          </div>
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
                  <a href={project1Image} data-gallery="portfolio-gallery" className="glightbox d-flex justify-content-center align-items-center" style={{minHeight: '450px', padding: '20px'}} data-glightbox="title: BBEK Church Management System; description: <p>BBEK Church Management System is a comprehensive church administration platform designed to manage church records, events, services, and community engagement. Built with role-based access control (admin, pastor, member), it includes modules for member management, event coordination, service records, donations, announcements, and content management. Optimized for church operations with features like bulk operations, reporting, email notifications, and secure data handling.</p><div class='glightbox-tech'><h4>Technologies</h4><div class='glightbox-tech-icons'><span class='glightbox-tech-item'><SiMysql /> MySQL</span><span class='glightbox-tech-item'><SiVuedotjs /> Vue.js</span><span class='glightbox-tech-item'><SiExpress /> Express</span><span class='glightbox-tech-item'><SiNodedotjs /> Node.js</span><span class='glightbox-tech-item'><SiVuetify /> Vuetify</span><span class='glightbox-tech-item'>📦 Element Plus</span><span class='glightbox-tech-item'><SiPinia /> Pinia</span><span class='glightbox-tech-item'><SiAxios /> Axios</span><span class='glightbox-tech-item'><SiJsonwebtokens /> JWT</span><span class='glightbox-tech-item'><SiSendgrid /> SendGrid</span><span class='glightbox-tech-item'>📊 ExcelJS</span><span class='glightbox-tech-item'>📄 CSV Parser</span><span class='glightbox-tech-item'><SiVite /> Vite</span><span class='glightbox-tech-item'>🪟 Winser</span></div></div>; descPosition: right;">
                    <img src={project1Image} className="img-fluid rounded shadow" style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto', objectFit: 'contain' }} alt="Church Website" />
                  </a>
                  <div className="portfolio-info">
                    <h4>BBEK Church Management System</h4>
                    <p>A comprehensive church administration platform with role-based access control and various modules.</p>
                    <a href="https://biblebaptistekklesiaofkawit.xyz/" target="_blank" rel="noopener noreferrer" className="visit-site-btn btn-lg px-4 py-2 rounded-pill shadow-sm">View Project <i className="bi bi-arrow-right ms-2"></i></a>
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
    </div>
  );
}

export default App;