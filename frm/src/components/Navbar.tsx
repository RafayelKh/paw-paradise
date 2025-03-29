import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Breeds', href: '#features' },
  { name: 'Gallery', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setHidden(latest > previous && latest > 100);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const scrollY = window.scrollY;
        
        if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <motion.header
      variants={navbarVariants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="navbar"
    >
      <div className="navbar-container">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Paw<span>Paradise</span></h3>
        </motion.div>
        <nav>
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className={activeSection === item.href.substring(1) ? 'active' : ''}
              >
                <a href={item.href}>{item.name}</a>
                {activeSection === item.href.substring(1) && (
                  <motion.div 
                    className="nav-indicator"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>
        <motion.div
          className="navbar-cta"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="#contact" className="btn">Adopt a Dog</a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar; 